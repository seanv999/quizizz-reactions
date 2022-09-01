# Reverse engineering quizizz reactions
In order to successfully send a reaction we will need 2 pieces of data
```roomHash```
```hostID```
using this api ```https://game.quizizz.com/play-api```

we can get these by posting ```{"roomCode": xxxx}``` to the endpoint ```/v5/checkRoom```

# Sending the reaction
using the endpoint ```/reactionUpdate``` we can send our payload
The payload is as follows
```js
 const payload = {
  "playerId": name, //Anything including swears
  "roomHash": this.roomHash, //REQUIRED
  "hostId": this.hostId,  //REQUIRED
  "questionId": "", //not required
  "triggerType": "live-reaction",
  "reactionDetail": {
    "id": type //1-7 changes the style of the reaction,
    "intensity": size, //[int] this will scale the reaction(big flaw)
  }
};
```
If you don't understand this, it wasn't for you...
