require 'redis'
require_relative 'worker/utilities'
require_relative 'roles/archer'
require_relative 'roles/mage'
require_relative 'roles/rogue'
require_relative 'roles/warrior'

REDIS_URL = 'redis://:beacon@lotus.snax.io:6379/0'
trap(:INT) { puts; exit }

# Main method
def main(redis_sub, redis_pub)
  redis_sub.subscribe(:worker) do |on|
    on.subscribe do |channel, subscriptions|
      puts "Subscribed to ##{channel} (#{subscriptions} subscriptions)"
    end

    on.message do |channel, message|
      puts "##{channel}: #{message}"
      split = message.split ':'
      if split[0].eql? 'say'
        Worker::Utilities.say(redis_pub, split[1])
      elsif split[0].eql? 'whisper'
        Worker::Utilities.whisper(redis_pub, split[1], split[2])
      elsif split[0].eql? 'queue'
        Worker::Utilities.queue(redis_pub, split[1])
      elsif split[0].eql? 'leave'
        Worker::Utilities.leave(redis_pub, split[1])
      elsif split[0].eql? 'role'
        Worker::Utilities.role(redis_pub, split[1], split[2])
      elsif split[0].eql? 'gold'
        Worker::Utilities.gold(redis_pub, split[1])
      elsif split[0].eql? 'attack'
        Worker::Utilities.attack(redis_pub, split[1], split[2])
      elsif split[0].eql? 'move'
        Worker::Utilities.move(redis_pub, split[1], split[2])
      else
        puts 'Do not understand this message'
      end
    end
  end

rescue Redis::BaseConnectionError => error
  puts "#{error}, retrying in 1s"
  sleep 1
  retry
end

# Run main method
main(Redis.new(url: REDIS_URL), Redis.new(url: REDIS_URL))
