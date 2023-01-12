import Board from "../Board";
import Player from "../Player";
import Settings from "./Settings";


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
