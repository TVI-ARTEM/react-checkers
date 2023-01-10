import Cell from "./Cell";

class Room {
    room_id: string;
    room_password: string;
    pc_players: number;
    coop_style: string;
    game_mode: string;
    users: Array<String>
    table: Array<Array<Cell>>

    constructor(room_id: string, room_password: string) {
        this.room_id = room_id;
        this.room_password = room_password;

        this.pc_players = 0;
        this.coop_style = 'solo'
        this.game_mode = 'easy'
        this.users = new Array<String>()

        this.table = new Array<Array<Cell>>()
        for (let i = 0; i < 6; i++) {
            const row = new Array<Cell>()
            for (let j = 0; j < 6; j++) {
                row.push(new Cell())
            }
        }
    }

    static createRoom(room_id: string, room_password: string, pc_players: number,
               coop_style: string, game_mode: string): Room {

        return null
    }
}

export default Room;