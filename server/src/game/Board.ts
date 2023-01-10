import Cell from "./Cell";
import cell from "./Cell";

class Board {
    cells: Cell[][] = []
    
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