require 'redis'
REDIS_URL = 'redis://:beacon@lotus.snax.io:6379/0'.freeze
CHAT_BOT_CHANNEL = 'game'.freeze
PHASER_CHANNEL = 'phaser'.freeze
trap(:INT) { puts; exit }

class Orchestrator
  def initialize
    puts 'Starting up orchestraor'
    @game_round = 1
    @redis = Redis.new(url: REDIS_URL)
    @round_start_time = Time.now
    @standby_time = Time.now
    @redis.set('game_round', @game_round)
    @game_state = :standby
  end

  def run
    @game_state = :playing
    new_game_round

    while true
      # check if game round timer is over
      # If it is over, calculate player levels and gold
      # Update boss health

      puts "Processing game round - #{@game_round} - Game state - #{@game_state}"

      if @game_state.eql? :standby
        progress_standby
        next
      end

      # Create new game round once we leave standby
      new_game_round if @game_state.eql? :new_game

      if round_over?
        puts 'Round is over!'
        @redis.publish(CHAT_BOT_CHANNEL, "say:Round #{@game_round} is now over!")
        @redis.publish(CHAT_BOT_CHANNEL, "say:Please queue up again if you want to participate in the next round!")
        calculate_earnings unless @game_state.eql? :standby
        @redis.publish(PHASER_CHANNEL, 'game_state:end')
      else
        progress_game_round
        end_game_round
      end

      # Sleep for 5 seconds then check again
      sleep 2
      puts "========================\n\n"
    end
  end

  # Is the round over
  def round_over?
    return true if boss_health <= 0
    return true if (Time.now - @round_start_time) > 60
    false
  end

  # Calculate round over rewards
  def calculate_earnings
    puts 'Calculating player earnings'
    @redis.publish(CHAT_BOT_CHANNEL, "say:Calculating player earnings")
    # get list of players in current game
    @redis.publish(PHASER_CHANNEL, 'game_state:end')
    list_of_players.each do |player|
      gold = Random.rand(10..500)
      @redis.hincrby("player:#{player}", 'gold', gold)
      @redis.publish(CHAT_BOT_CHANNEL, "whisper:#{player}:You earn #{gold} gold that round")
    end

    # calculate player gold and level

    @game_state = :standby
    @standby_time = Time.now
  end

  # Do calculations that need to be done this game round
  def progress_game_round
    puts 'Progressing game round'
    # randomly kill boss to simulate
    # @redis.hincrby 'game:boss', 'health', (-1 * (Random.rand(5..20)))
    @redis.publish PHASER_CHANNEL, "boss:#{boss_health}"
  end

  # do some stuff while we are in standby mode
  def progress_standby
    sleep 5
    if (Time.now - @standby_time) > 10
      puts 'Setting game state to playing'
      @game_state = :new_game
    end
  end

  # Setup a new game round
  def new_game_round
    puts 'Setting boss health to 100'
    @redis.hset 'game:boss', 'health', 5000
    @game_state = :playing
    @round_start_time = Time.now
    @game_round += 1
    @redis.publish(CHAT_BOT_CHANNEL, "say:Starting new game round!")
    @redis.publish(PHASER_CHANNEL, 'game_state:start')
    waiting_players = @redis.smembers('waitlist')
    @redis.del('players')
    waiting_players.each do |player|
      @redis.sadd('players', player)
      @redis.srem('waitlist', player)
    end
  end

  # End the game round
  def end_game_round
  end

  def list_of_players
    puts 'Retrieving list of players'
    players = @redis.smembers('players')
    puts "These are the players: #{players}"
    players
  end

  def boss_health
    puts 'Retrieving boss health'
    boss = @redis.hgetall('game:boss')
    puts "Here is the boss: #{boss}"
    raise 'Boss does not have health key' unless boss.include? 'health'
    boss['health'].to_i
  end
end

orchestrator = Orchestrator.new
orchestrator.run
