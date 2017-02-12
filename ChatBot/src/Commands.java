import redis.clients.jedis.Jedis;

import java.util.ArrayList;

/**
 * Created by jason on 2/11/17.
 */
public class Commands {

    private static ArrayList<String> cmds = new ArrayList<String>() {{
        add("!help");
    }};

    public static void checkCommands(String msg){
        //System.out.print("---------------------------------------------");
        if (cmds.contains(msg)){
            Jedis jedis = new Jedis("redis://:beacon@lotus.snax.io:6379/0");
            Long value = jedis.publish("worker", msg);
            System.out.println(value);
        }

    }

}
