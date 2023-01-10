import Room from "./Room";
import ApiError from "../error/ApiError";

class Game {
    rooms: Room[] = []
    users: Map<string, string> = new Map<string, string>()

    addRoom(room: Room) {
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

    removeUser(email: string) {
        this.users.delete(email)
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