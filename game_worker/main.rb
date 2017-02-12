require 'redis'
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
      redis_pub.publish 'game', message
    end
  end

rescue Redis::BaseConnectionError => error
  puts "#{error}, retrying in 1s"
  sleep 1
  retry
end

# Run main method
main(Redis.new(url: REDIS_URL), Redis.new(url: REDIS_URL))
