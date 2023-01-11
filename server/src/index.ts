import express from 'express';
import cors from 'cors';
import {Sequelize} from "sequelize";
import Game from './game/Game';
import {Json} from "sequelize/lib/utils";

require('dotenv').config()
const game: Game = require('./game/Game')

const sequelize: Sequelize = require('./db')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const PORT = process.env.PORT || 5000

const app = express()
const server = require('http').createServer(app)
const {Server} = require('socket.io')
export const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
})

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)

io.on("connection", (socket) => {
    console.log(`user: ${socket.id} connected`)

    socket.on('login', (message) => {
        const msg = JSON.parse(message) as { email: string }
        game.updateUser(msg.email, socket.id)
    })

    socket.on('disconnect', () => {
        console.log(`user: ${socket.id} disconnected`)
        game.removeUserID(socket.id)
    })

    socket.on('get-board', (message) => {
        const room = JSON.parse(message) as { id: string, password: string }
        console.log(message)
        const board = JSON.stringify(game.getRoom(room.id, room.password).board)
        socket.emit('send-board', board)
    })
})

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        server.listen(
            PORT, () => console.log(`Server is working on port: ${PORT}`)
        )
    } catch (e) {
        console.log(e)
    }
}

start().then(r => console.log(r)).catch(r => console.log(r))
