import express from 'express';
import cors from 'cors';
import {Sequelize} from "sequelize";
import Game from './game/Game';
import Room from "./game/room/Room";
import jsonToClass from "./utils/jsonToClass";
import {Colors} from "./game/Colors";
import {COOP_STYLE_COOP_VALUE} from "./utils/consts";

require('dotenv').config()
const game: Game = require('./game/Game')

const sequelize: Sequelize = require('./db')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const errorHandlerSocket = require('./middleware/ErrorHandlingSocket')
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
    socket.emit('update-login')

    socket.on('login', (message) => {
        try {
            const msg = JSON.parse(message) as { email: string }
            game.updateUser(msg.email, socket.id)
            console.log(`socket_id: ${game.getUser(msg.email)} <-> email: ${msg.email}`)
        } catch (error) {
            errorHandlerSocket(error, socket)
        }
    })

    socket.on('logout', (message) => {
        try {
            const msg = JSON.parse(message) as { email: string }
            game.removeUser(msg.email)
            console.log(`socket_id: ${socket.id}, email: ${msg.email} logout`)
        } catch (error) {
            errorHandlerSocket(error, socket)
        }
    })


    socket.on('disconnect', () => {
        try {
            console.log(`user: ${socket.id} disconnected`)
            game.removeUserID(socket.id)
        } catch (error) {
            errorHandlerSocket(error, socket)
        }
    })

    socket.on('get-game', (message) => {
        try {
            const roomLogin = JSON.parse(message) as { id: string, password: string }
            console.log(message)
            const room = game.getRoom(roomLogin.id, roomLogin.password)
            game.startGame(room)
        } catch (error) {
            errorHandlerSocket(error, socket)
        }
    })

    socket.on('leave-room', (message) => {
        try {
            console.log('LEAVE_ROOM')
            const msg = JSON.parse(message) as { email: string, id: string, password: string }
            const room = game.getRoom(msg.id, msg.password)
            const players = room.current_players
            const isIncluded = room.containsPlayers(msg.email);

            room.removeUser(msg.email)

            if (isIncluded) {
                console.log("STOP_GAME")
                game.stopGame(players.filter(value => {return value.email !== msg.email}))
            }
            game.startGame(room)
        } catch (error) {
            errorHandlerSocket(error, socket)
        }
    })

    socket.on('next-step', (message) => {
        try {
            console.log('NEXT_STEP')
            const parsed_room = jsonToClass(message)
            const room = game.getRoom(parsed_room.room_id, parsed_room.room_password)
            room.board = parsed_room.board


            const colors:Colors[] = []

            for (const row of room.board.cells) {
                for (const cell of row) {
                    if(cell.figure && !colors.includes(cell.figure.color)){
                        colors.push(cell.figure.color)
                    }
                }
            }

            //TODO:ДВА ПОБЕДИТЕЛЯ
            if (colors.length === 1) {
                const player = room.current_players.find(value => value.color === colors.at(0))
                const players = room.current_players
                socket.to(game.getUser(player.email)).emit('winner')
                room.removeUser(player.email)
                game.stopGame(players.filter(value => {
                    return value.email !== player.email
                }))
            } else if (colors.length === 2 && room.room_settings.coop_style === COOP_STYLE_COOP_VALUE) {

            } else {
                while (true) {
                    room.nextPlayer()
                    if (!colors.includes(room.currentPlayer().color)) {
                        continue
                    }

                    if (room.currentPlayer().email.includes("PC_PLAYER")) {
                        room.aiStep()
                        continue
                    }

                    break
                }
            }

            game.startGame(room)
        } catch (error) {
            console.log(error)
            errorHandlerSocket(error, socket)
        }
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
