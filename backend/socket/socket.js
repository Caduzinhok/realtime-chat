import express from "express"
import http from "http"
import cors from "cors"
import { Server } from "socket.io"

const app = express()

// Configurando CORS para permitir a origem 'http://localhost:3000'
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
}))

app.use(express.json()); 

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['POST', 'GET']
    }
})


io.on('connection', socket => {
    socket.on('send-message', (message, dateMessage, user, room) => {
        if(room){
            socket.to(room).emit('receive-message', message, dateMessage, user)
        }
    })

    socket.on('join-room', room => {
        socket.join(room)
        console.log(`Joined in Room ${room}`)
    })
})

export {io, server, app}