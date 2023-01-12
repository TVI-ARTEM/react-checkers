import Board from "../Board";
import ApiError from "../../error/ApiError";
import {Colors} from "../Colors";
import Player from "../Player";
import Settings from "./Settings";


export default class Room {
    room_id: string;
    room_password: string;
    room_settings: Settings
    queue: string[]
    current_players: Player[]
    current_player_index: number
    board: Board
    is_playing: boolean

    constructor(room_id: string, room_password: string, room_settings: Settings) {
        this.room_id = room_id;
        this.room_password = room_password;
        this.room_settings = room_settings;

        this.queue = []
        this.current_players = []

        this.is_playing = false;
        this.current_player_index = 0

        this.board = new Board(room_settings)
    }

    static createRoom(room_id: string, room_password: string, pc_players: string,
                      coop_style: string, game_mode: string, difficult: string): Room {
        const settings = new Settings(pc_players, coop_style, game_mode, difficult)
        const room = new Room(room_id, room_password, settings)
        room.board.initCells()
        room.board.initFigures()
        return room
    }

    addUser(email: string) {
        if (this.containsPlayers(email) || this.queue.includes(email)) {
            throw ApiError.badRequest('You are already in game!')
        }
        this.queue.push(email)
    }

    startGame() {
        const colors = [Colors.WHITE, Colors.RED, Colors.GREEN, Colors.BLACK]
        if (!this.is_playing && this.queue.length >= 4 - this.room_settings.pc_players) {
            for (let i = 0; i < 4 - this.room_settings.pc_players; i++) {
                this.current_players.push(new Player(
                    this.queue.shift(),
                    colors.at(this.current_players.length - 1)
                ))
            }
            for (let i = 0; i < this.room_settings.pc_players; i++) {
                this.current_players.push(new Player(
                    `PC_PLAYER ${this.current_players.length}`,
                    colors.at(this.current_players.length - 1)
                ))
            }

            this.is_playing = true
            this.current_player_index = 0
        }
    }

    removeUser(email: string) {
        if (this.containsPlayers(email)) {
            this.is_playing = false
            this.current_player_index = 0
            this.current_players = []
        } else if (this.queue.includes(email)) {
            this.queue = this.queue.filter((value) => {
                return value !== email
            })
        }
    }

    currentPlayer(): Player {
        return this.current_players.at(this.current_player_index)
    }

    nextPlayer(): Player {
        this.current_player_index = (this.current_player_index + 1) % 4
        return this.currentPlayer()
    }

    containsPlayers(email: string) {
        for (const player of this.current_players) {
            if (player.email === email) {
                return true
            }
        }

        return false
    }
}
