import Board from "../Board";
import ApiError from "../../error/ApiError";
import {Colors} from "../Colors";
import Player from "../Player";
import Settings from "./Settings";
import {COOP_STYLE_COOP_VALUE, DIFFICULT_EASY_VALUE} from "../../utils/consts";
import {Figure} from "../figure/Figure";
import Cell from "../Cell";
import {King} from "../figure/King";


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


    private static getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    startGame() {
        const colors = [Colors.WHITE, Colors.RED, Colors.GREEN, Colors.BLACK]

        if (!this.is_playing && this.queue.length >= 4 - this.room_settings.pc_players) {
            for (let i = 0; i < 4 - this.room_settings.pc_players; i++) {
                this.current_players.push(new Player(
                    this.queue.shift(),
                    colors.at(this.current_players.length),
                    this.room_settings.coop_style === COOP_STYLE_COOP_VALUE ? (this.current_players.length % 2 == 0 ? "1 union" : "2 union") : ""
                ))
            }
            for (let i = 0; i < this.room_settings.pc_players; i++) {
                this.current_players.push(new Player(
                    `PC_PLAYER ${this.current_players.length}`,
                    colors.at(this.current_players.length),
                    this.room_settings.coop_style === COOP_STYLE_COOP_VALUE ? (this.current_players.length % 2 == 0 ? "1 union" : "2 union") : ""
                ))
            }


            this.is_playing = true
            this.current_player_index = Room.getRandomInt(this.current_players.length)
        }
    }

    removeUser(email: string) {
        if (this.containsPlayers(email)) {
            this.is_playing = false
            this.current_player_index = 0
            this.current_players = []
            this.board.initCells()
            this.board.initFigures()
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

    private aiEasy() {
        const current_player = this.currentPlayer()

        const figures: Figure[] = []

        for (const row of this.board.cells) {
            for (const cell of row) {
                if (cell.figure && cell.figure.color === current_player.color) {
                    figures.push(cell.figure)
                }
            }
        }
        let iteration = -1
        if (figures.length > 0) {
            while (true) {
                iteration += 1
                if (iteration > 100) {
                    this.aiPro()
                    return
                }
                const figure = figures.at(Room.getRandomInt(figures.length))
                const availablePaths = figure.getAvailableCells()
                if (availablePaths.length === 0) {
                    continue
                }
                const path = availablePaths.at(Room.getRandomInt(availablePaths.length))

                if (Room.isKing(path.cell, figure.color)) {
                    new King(figure.color, path.cell)
                } else {
                    path.cell.figure = figure
                    figure.cell = path.cell
                }

                for (const prevCell of path.prevCells) {
                    prevCell.figure = null
                }

                break
            }

        }
    }

    private aiPro() {
        const current_player = this.currentPlayer()

        const figures: Figure[] = []

        for (const row of this.board.cells) {
            for (const cell of row) {
                if (cell.figure && cell.figure.color === current_player.color) {
                    figures.push(cell.figure)
                }
            }
        }
        let bestPath: { prevCells: Cell[], cell: Cell } = null
        let bestFigure: Figure = null
        for (const figure of figures) {
            for (const availableCell of figure.getAvailableCells()) {
                if (bestPath === null || bestPath.prevCells.length < availableCell.prevCells.length) {
                    bestPath = availableCell
                    bestFigure = figure
                }
            }
        }

        if (bestPath !== null) {
            if (Room.isKing(bestPath.cell, bestFigure.color)) {
                new King(bestFigure.color, bestPath.cell)
            } else {
                bestPath.cell.figure = bestFigure
                bestFigure.cell = bestPath.cell
            }

            for (const prevCell of bestPath.prevCells) {
                prevCell.figure = null
            }
        }
    }

    private static isKing(cell: Cell, color: Colors): boolean {
        switch (color) {
            case Colors.WHITE:
                return cell.x === 5 && cell.y === 5 || cell.x === 0 && cell.y === 5 || cell.x === 5 && cell.y === 0;
            case Colors.BLACK:
                return cell.x === 5 && cell.y === 5 || cell.x === 0 && cell.y === 0 || cell.x === 5 && cell.y === 0;
            case Colors.RED:
                return cell.x === 5 && cell.y === 5 || cell.x === 0 && cell.y === 5 || cell.x === 0 && cell.y === 0;
            case Colors.GREEN:
                return cell.x === 0 && cell.y === 0 || cell.x === 0 && cell.y === 5 || cell.x === 5 && cell.y === 0;
        }
        return true
    }

    public aiStep() {
        if (this.room_settings.difficult === DIFFICULT_EASY_VALUE) {
            this.aiEasy()
        } else {
            this.aiPro()
        }
    }
}
