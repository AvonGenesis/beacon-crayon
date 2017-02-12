import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPubSub;
import java.util.ArrayList;
/**
 * Created by jason on 2/11/17.
 */
public class Commands {
    public static void checkCommands(String msg, String user){
        //System.out.print("---------------------------------------------");
        /*if (cmds.contains(msg)){
            Jedis jedis = new Jedis("redis://:beacon@lotus.snax.io:6379/0");
            Long value = jedis.publish("worker", msg);
            System.out.println(value);
        }*/
        String toSend = "";
        String [] cmdMsg = msg.split(" ");
        cmdMsg[0] = cmdMsg[0].substring(1);
        Jedis jedis = new Jedis("redis://:beacon@lotus.snax.io:6379/0");
        if(cmdMsg[0].contains("queue") || cmdMsg[0].contains("leave") || cmdMsg[0].contains("gold")){
            toSend = cmdMsg[0] + ":" + user;
            long value = jedis.publish("worker", toSend);
        } else if (cmdMsg[0].contains("role") || cmdMsg[0].contains("move") || cmdMsg[0].contains("buy")|| cmdMsg[0].contains("attack")){
            toSend = cmdMsg[0] + ":" + user + ":" + cmdMsg[1];
            long value = jedis.publish("worker", toSend);
        }
    }
}