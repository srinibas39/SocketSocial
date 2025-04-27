import { WebSocketServer , WebSocket } from "ws"

const wss = new WebSocketServer({port:5000});

let userCount = 0;

let webSockets:WebSocket[] = []

wss.on("connection",(ws)=>{
    webSockets.push(ws)
    userCount+=1;
    console.log("userCount ",userCount)
    ws.on("error",(err)=>{
        console.log("err")
    })

    ws.on("message",(msg)=>{
        setTimeout(()=>{
            // ws.send("Send From server "+msg.toString())
            webSockets.forEach(socket=>{
                setTimeout(()=>{
                    socket.send("FROM SERVER "+msg.toString().toUpperCase())
                },1000)
            })
        },1000)
    })

    ws.on("close",()=>{
        webSockets.filter(sock => sock !=ws)
        userCount--;
        console.log("userCOunt",userCount)
    })

})
