import Room from "./Room";
import ApiError from "../error/ApiError";
import {io} from "../index";

class Game {
    rooms: Room[] = []
    users: Map<string, string> = new Map<string, string>()

    addRoom(room: Room) {
        for (const el of this.rooms) {
            if (el.room_id === room.room_id) {
                throw ApiError.badRequest('A room with the same name already exists!')
            }
        }
        this.rooms.push(room)
    }

    getRoom(id: string, password: string): Room {
        let room: Room = null;
        for (const element of this.rooms) {
            if (element.room_id === id) {
                room = element
            }
        }
        if (room === null) {
            throw ApiError.badRequest('Incorrect room ID!')
        } else if (room.room_password !== password) {
            throw ApiError.badRequest('Incorrect room Password!')
        }

        return room
    }

    updateUser(email: string, socket_id: string) {
        this.users.set(email, socket_id)
    }

    startGame(room: Room) {
        room.startGame()
        if (!room.is_playing) {
            return
        }
        for (const currentPlayer of room.current_players) {
            if (this.users.has(currentPlayer)) {
                io.to(this.users.get(currentPlayer)).emit('start-game', JSON.stringify({room: room}))
            }
        }

    }

    stopGame(players: string[]) {
        for (const currentPlayer of players) {
            if (this.users.has(currentPlayer)) {
                io.to(this.users.get(currentPlayer)).emit('stop-game')
            }
        }
    }


    removeUser(email: string) {
        for (const room of this.rooms) {
            const prev_playing = room.is_playing
            const prev_players = room.current_players
            room.removeUser(email)
            if (prev_playing !== room.is_playing && prev_playing === true) {
                this.stopGame(prev_players.filter((value) => {return value !== email}))
            }
            if (prev_playing !== room.is_playing && room.is_playing === true) {
                this.startGame(room)
            }
        }
        this.users.delete(email)
    }

    removeUserID(socket_id: string) {
        let user_email = ''
        for (const [email, id] of this.users) {
            if (id === socket_id) {
                user_email = email
                break
            }
        }
        if (user_email !== '') {
            this.removeUser(user_email)
        }
    }

    getUser(email: string): string {
        if (!this.users.has(email)) {
            throw new Error('incorrect email')
        }

        return this.users.get(email)
    }

}

const game = new Game()

export default Game;

module.exports = game