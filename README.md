beacon-crayon

# Chat commands
!queue = Queue user to play in this game round
!leave = User leaves queue/game round
!role [mage, warrior, etc] = User picks a class
!shop = User votes to go to shop
!keepfighting = User votes to keep fighting
!move [a,b,c,d, etc] = Move user to location
!attack [attackName] = Perform attack name pertaining to class
!buy [item id] = buy item
!gold = Tells user gold

# Redis keys
key - type - notes
players - list - List of users in this round, limit to 10 players
waitlist - list - List of users in queue
player:<playername> - hash - player data info
game:<entity> - hash - Game entity data, could be boss health/minion
location:<name> - list - List of players in this location

# Redis Messages
## Publish
queue:<playername>
leave:<playername>
role:<playername>:<role>
move:<playername>:<location>
buy:<playername>:<item id>
gold:<playername>
attack:<playername>:<spell>

## Subscribe
say:<message>
whisper:<playername>:<message>
