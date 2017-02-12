import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPubSub;

public class TestJedis {

public static void main(String[] args) {
  //Connecting to Redis on localhost
  Jedis jedis = new Jedis("redis://:beacon@lotus.snax.io:6379/0");
  Jedis JSubscriber = new Jedis();
  System.out.println("Before subscrbing");
    JSubscriber.subscribe(new JedisPubSub() {

      public void onMessage(String channel, String message) {
        System.out.println("Inside");
        System.out.println(channel);
        System.out.println(message);
      }

      @Override
      public void onPMessage(String pattern, String channel, String message) {
        System.out.println(message);
      }
    }, "foo");
    System.out.println("After subscrbing");
  //adding a new key
  jedis.set("key", "value");
  //getting the key value
  System.out.println(jedis.get("key"));

 }

}
