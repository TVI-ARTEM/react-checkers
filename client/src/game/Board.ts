import Cell from "./Cell";
import Settings from "./room/Settings";

class Board {
    cells: Cell[][] = []

    settings: Settings

    constructor(settings: Settings) {
        this.settings = settings
    }
    
    public initCells() {
        for (let i = 0; i < 6; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 6; j++) {
                row.push(new Cell(this, i, j))
            }
            this.cells.push(row);
        }
    }
}

export default Board;