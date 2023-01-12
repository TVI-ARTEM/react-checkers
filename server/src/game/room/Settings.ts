export default class Settings {
    pc_players: number;
    coop_style: string;
    game_mode: string;
    difficult: string;

    constructor(pc_players: string,
                coop_style: string, game_mode: string, difficult: string) {
        this.pc_players = +pc_players
        this.coop_style = coop_style
        this.game_mode = game_mode
        this.difficult = difficult
    }
}