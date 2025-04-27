import { WebSocketServer , WebSocket } from "ws"

const wss = new WebSocketServer({port:5000});

let userCount = 0;

// let webSockets:WebSocket[] = []

interface User {
    socket:WebSocket,
    roomId:string
}



let users:User[] = []

wss.on("connection",(ws)=>{
    // webSockets.push(ws)
    userCount++;
    ws.on("error",(err)=>{
        console.log("err")
    })

    ws.on("message",(payload:string)=>{
        const parseData = JSON.parse(payload);
        if(parseData.type === "join"){
            const roomId = parseData.payload.roomId;
            users.push({
                socket:ws,
                roomId
            })
        }
        else{
            //chat
            //check if sokcet exist or not
            const user = users.find(user => user.socket === ws)

            if(!user){
                return;
            }

            //broadcast the message to all the scokets which have same roo id
            const scoketUsers = users.filter(u => u.roomId === user.roomId && u.socket!=user.socket);
            scoketUsers.forEach(user =>{
                user.socket.send(JSON.stringify({
                    type:"chat",
                    payload:{
                        message :parseData.payload.message
                    }
                }))
            })

        }
    })

    ws.on("close",()=>{
        users = users.filter(user=>user.socket !== ws);
        userCount--;
        console.log("userCOunt",userCount)
    })

})
