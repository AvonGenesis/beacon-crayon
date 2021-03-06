module Worker
  class Utilities
    CHAT_BOT_CHANNEL = 'game'.freeze
    PHASER_CHANNEL = 'phaser'.freeze
    PLAYER_LIMIT = 10
    VALID_ROLES = ['warrior', 'archer', 'mage', 'rogue']
    VALID_SPELLS = ['spell1', 'spell2', 'spell3', 'spell4']

    # Return true or false if player was able to register
    def self.queue(redis, user)
      user_exist = redis.exists "player:#{user}"
      # Create player data if it doesnt exist
      unless user_exist
        redis.hmset "player:#{user}", 'level', 1, 'class', 'warrior', 'gold', 0
      end
      players = redis.smembers 'players'
      if players.length < PLAYER_LIMIT
        puts "Adding #{user} to players"
        player_class = redis.hget "player:#{user}", 'class'
        redis.sadd 'players', user
        redis.publish PHASER_CHANNEL, "render:#{user}:#{player_class}" unless players.include? user
        whisper(redis, user, "You are now playing")
      else
        puts "Adding #{user} to waitlist"
        redis.sadd 'waitlist', user
        whisper(redis, user, "You are now on the waitlist for next round.")
      end
    end

    # User leaves
    def self.leave(redis, user)
      puts "Removing #{user} from players"
      redis.srem 'players', user
    end

    def self.role(redis, user, role)
      # have user change role
      return unless VALID_ROLES.include? role.downcase
      user_exist = redis.exists "player:#{user}"
      unless user_exist
        redis.hmset "player:#{user}", 'level', 1, 'class', role, 'gold', 0
        whisper(redis, user, "Your role has been set to #{role}")
        puts "Setting #{user} role to #{role}"
        return
      end
      puts "Setting #{user} role to #{role}"
      redis.hset "player:#{user}", 'class', role
      whisper(redis, user, "Your role has been set to #{role}, it will change next round")
    end

    # move user
    def self.move(redis, user, location)
      players = redis.smembers 'players'
      return unless players.include? user
      puts "Moving #{user} to #{location}"
      redis.publish(PHASER_CHANNEL, "move:#{user}:#{location}")
    end

    def self.buy(redis, user, item_id);end

    # Get the user's gold amount
    def self.gold(redis, user)
      return unless redis.exists "player:#{user}"
      gold = redis.hget "player:#{user}", 'gold'
      whisper(redis, user, "You currently have #{gold} gold pieces")
    end

    # Attack command
    def self.attack(redis, user, spell_id)
      players = redis.smembers 'players'
      return unless players.include? user
      # return unless VALID_SPELLS.include? spell_id.downcase
      damage = Random.rand(20..50)
      puts "Player #{user} is casting spell #{spell_id} for damage #{damage}"
      redis.publish PHASER_CHANNEL, "attack:#{user}:#{spell_id}:#{damage}"
      redis.hincrby 'game:boss', 'health', (-1 * damage)

      boss = redis.hgetall('game:boss')
      puts "Here is the boss: #{boss}"
      raise 'Boss does not have health key' unless boss.include? 'health'
      health = boss['health'].to_i
      redis.publish PHASER_CHANNEL, "boss:#{health}"
    end

    def self.say(redis, message)
      puts "Telling all: #{message}"
      redis.publish(CHAT_BOT_CHANNEL, "say:#{message}")
    end

    def self.whisper(redis, user, message)
      puts "Whispering #{user}: #{message}"
      redis.publish(CHAT_BOT_CHANNEL, "whisper:#{user}:#{message}")
    end
  end
end
