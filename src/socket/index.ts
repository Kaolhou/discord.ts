import { Server } from "socket.io";
import {Server as HTTPServer} from 'http'
import express from 'express';

function createSocket(http:HTTPServer){
    return new Server(http,{
        cors:{
            origin:'*',

        },
        
    })
}

const app = express();
const expServer = app.listen(3000,()=>{
    console.log('[event] websocket server open at ws://localhost:3000')
})


const io = createSocket(expServer);
io.use((socket,next)=>{

})
io.on('connection',(socket)=>{

})