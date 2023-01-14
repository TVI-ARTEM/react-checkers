import Board from "../Board";
import Player from "../Player";
import Settings from "./Settings";
import {Colors} from "../Colors";
import Cell from "../Cell";


export default interface IRoom {
    room_id: string;
    room_password: string;
    room_settings: Settings
    queue: string[]
    current_players: Player[]
    current_player_index: number
    board: Board
    is_playing: boolean
}

export const get_current_player = (room: IRoom) => {
    return room.current_players.at(room.current_player_index)
}

export const get_player = (room: IRoom, email: String) => {
    for (const player of room.current_players) {
        if (player.email === email) {
            return player
        }
    }

    return null
}

export const isKing = (cell: Cell, color: Colors) => {
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
