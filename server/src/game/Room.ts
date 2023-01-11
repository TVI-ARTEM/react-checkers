import Cell from "./Cell";
import {
    COOP_STYLE_SOLO_VALUE,
    DIFFICULT_EASY_VALUE,
    GAME_MODE_STANDARD_VALUE,
    PC_PLAYERS_0_VALUE
} from "../utils/consts";
import Board from "./Board";
import ApiError from "../error/ApiError";

class Room {
    room_id: string;
    room_password: string;
    pc_players: number;
    coop_style: string;
    game_mode: string;
    difficult: string;
    queue: Array<string>
    current_players: Array<string>
    current_player_index: number
    board: Board
    is_playing: boolean

    constructor(room_id: string, room_password: string) {
        this.room_id = room_id;
        this.room_password = room_password;

        this.pc_players = +PC_PLAYERS_0_VALUE
        this.coop_style = COOP_STYLE_SOLO_VALUE
        this.game_mode = GAME_MODE_STANDARD_VALUE
        this.difficult = DIFFICULT_EASY_VALUE

        this.queue = new Array<string>()
        this.current_players = new Array<string>()

        this.is_playing = false;
        this.current_player_index = 0

        this.board = new Board()
    }

    static createRoom(room_id: string, room_password: string, pc_players: string,
                      coop_style: string, game_mode: string, difficult: string): Room {
        const room = new Room(room_id, room_password)
        room.pc_players = +pc_players
        room.coop_style = coop_style
        room.game_mode = game_mode
        room.difficult = difficult
        room.board.initCells()
        return room
    }

    addUser(email: string) {
        if (this.current_players.includes(email) || this.queue.includes(email)) {
            throw ApiError.badRequest('You are already in game!')
        }
        this.queue.push(email)
    }

    startGame() {
        if (!this.is_playing && this.queue.length >= 4 - this.pc_players) {
            for (let i = 0; i < 4 - this.pc_players; i++) {
                this.current_players.push(this.queue.shift())
            }
            for (let i = 0; i < this.pc_players; i++) {
                this.current_players.push(`PC_PLAYER ${i + 1}`)
            }

            this.is_playing = true
            this.current_player_index = 0
        }
    }

    removeUser(email: string) {
        if (this.current_players.includes(email)) {
            this.is_playing = false
            this.current_player_index = 0
            this.current_players = []
        }

        else if (this.queue.includes(email)) {
            this.queue = this.queue.filter((value) => {return value !== email})
        }
    }

    currentPlayer(): string {
        return this.current_players.at(this.current_player_index)
    }

    nextPlayer(): string {
        this.current_player_index = (this.current_player_index + 1) % 4
        return this.currentPlayer()
    }
}

export default Room;