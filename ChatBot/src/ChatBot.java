import java.io.*;
import java.net.*;
import java.lang.String;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPubSub;
public class ChatBot {
    public static void main(String[] args) throws Exception {
      // The server to connect to and our details.
      String server = "irc.chat.twitch.tv";
      String nick = "persou";
      String login = "persou";
      // The channel which the bot will join.
      String channel = "#avongenesis";
      
      Socket socket = new Socket(server, 6667);
      BufferedWriter writer = new BufferedWriter(
              new OutputStreamWriter(socket.getOutputStream( )));
      BufferedReader reader = new BufferedReader(
              new InputStreamReader(socket.getInputStream( )));
      // Join the channel.
      writer.write("JOIN " + channel + "\r\n");
      writer.flush( );
        // Create pubsub object
        JedisPubSub pubsub = new JedisPubSub() {
          @Override
          // Fired off when receiving a message from redis
          public void onMessage(String redisChannel, String message) {
            System.out.println("Received Message from Redis Channel: " + redisChannel + " - " + message);
            String[] botMsg = message.split(":");
            if (botMsg[0].equals("say")){
                String msg = "PRIVMSG " + channel + " :" + botMsg[1] + "\r\n";
                System.out.println(msg);
                try {
                  writer.write(msg);
                  writer.flush();
                } catch(IOException ioe){
                  System.out.println("We got exception");
                    //Handle exception here, most of the time you will just log it.
                }
            } else if (botMsg[0].equals("whisper")){
                String msg = "PRIVMSG " + channel + " :/w " + botMsg[1] + " " + botMsg[2] + "\r\n";
                System.out.println(msg);
                try {
                  writer.write(msg);
                  writer.flush();
                } catch(IOException ioe){
                  System.out.println("We got exception");
                    //Handle exception here, most of the time you will just log it.
                }
            }
          }
        };
        // Run new thread to connect to redis server
        new Thread(new Runnable() {
          @Override
          public void run() {
            try {
              // log("Connecting");
              Jedis jedis = new Jedis("redis://:beacon@lotus.snax.io:6379/0");
              // log("subscribing");
              jedis.subscribe(pubsub, "game");
              // log("subscribe returned, closing down");
              jedis.quit();
            } catch (Exception e) {
              System.out.println("Exception thread");
              // log(">>> OH NOES Sub - " + e.getMessage());
              // e.printStackTrace();
            }
          }
        }, "game").start();
        // Connect directly to the IRC server.
        System.out.println("Reading from server");
        // Log on to the server.
        writer.write("PASS oauth:ky2j5q58ray9p3eau92q08d5snqzkz\r\n");
        writer.write("NICK " + nick + "\r\n");
        writer.write("CAP REQ :twitch.tv/commands\r\n");
        // writer.write("USER " + login + " 8 * : Java IRC Hacks Bot\r\n");
        writer.flush( );
        // Read lines from the server until it tells us we have connected.
        String line = line = reader.readLine();
        System.out.println("Waiting for response now");
        while ((line = reader.readLine( )) != null) {
          System.out.println(line);
          break;
            // if (line.indexOf("004") >= 0) {
            //     // We are now logged in.
            //     break;
            // }
            // else if (line.indexOf("433") >= 0) {
            //     System.out.println("Nickname is already in use.");
            //     return;
            // }
        }
        System.out.println("We are done");
        // Join the channel.
        //writer.write("JOIN " + channel + "\r\n");
        //writer.flush( );
        // Keep reading lines from the server.
        while ((line = reader.readLine( )) != null) {
             if (line.toLowerCase( ).startsWith("PING ")) {
                 // We must respond to PINGs to avoid being disconnected.
                 writer.write("PONG " + line.substring(5) + "\r\n");
                 writer.write("PRIVMSG " + channel + " :I got pinged!\r\n");
                 writer.flush();
             }
             else {
                 // Print the raw line received by the bot.
                 //TODO DM
                 //writer.write("PRIVMSG #2ggaming :/w vikas3321 aaaaaaaaaaaaaaa\r\n");
                 //writer.flush();
                 System.out.println(line);
                 String[] msg = line.split(":",3);
                 String[] user = msg[1].split("!", 2);
                 try{
                     System.out.println("USER: " + user[0]);
                     System.out.println("MSG: " + msg[2]);
                     if (msg[2].charAt(0) == '!'){
                        Commands.checkCommands(msg[2], user[0]);
                     }
                 } catch (ArrayIndexOutOfBoundsException e){
                 }
             }
         }
    }
}