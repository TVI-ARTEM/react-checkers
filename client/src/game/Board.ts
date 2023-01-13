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
                row.push(new Cell(this, j, i))
            }
            this.cells.push(row);
        }
    }

    public getCell(x: number, y: number) {
        if (x < 0 || x > 5 || y < 0 || y > 5) {
            return null
        }

        return this.cells.at(y)?.at(x) || null
    }
}

export default Board;