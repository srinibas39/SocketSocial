import { WebSocketServer , WebSocket } from "ws"

const wss = new WebSocketServer({port:5000});

let userCount = 0;

wss.on("connection",(ws)=>{
    userCount+=1;
    console.log("userCount ",userCount)
    ws.on("error",(err)=>{
        console.log("err")
    })

    ws.on("message",(msg)=>{
        setTimeout(()=>{
            ws.send("Send From server "+msg.toString())
        },1000)
    })

})
