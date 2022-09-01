const axios = require('axios')
class Quiz {
    constructor(){
        this.roomHash = undefined;
    }
    setPin = async(pin) => {
        this.pin = String(pin);
        let room = await this.getRoom();
        this.roomHash = room.hash;
        this.hostId = room.hostId;
    };

    getRoom = async() => {
        const room = await axios.post('https://game.quizizz.com/play-api/v5/checkRoom',{
            "roomCode": this.pin
        }).catch(error =>{
            return false;
        });
        return await room.data.room;
    }
    react = async(name,size,type)=>{
        if(this.roomHash == undefined){
            await this.getRoom();
        }
        const payload = {
            "playerId": name,
            "roomHash": this.roomHash,
            "hostId": this.hostId,
            "questionId": "",
            "triggerType": "live-reaction",
            "reactionDetail": {
            "id": type,
            "intensity": size
            }
        };
        const res = axios.post('https://quizizz.com/play-api/reactionUpdate', payload)
        .catch(error=>{
            console.log(error);
        })
        .then(()=>{
            console.log('Reaction Sent...')
        });
    }
}

//Usage
const quiz = new Quiz();

quiz.setPin(960942);

quiz.react('Sean V',3,num)

