import Cell from "../Cell";
import {Colors} from "../Colors";

export enum FigureNames {
    FIGURE = "FIGURE",
    CHECKER = "CHECKER",
    KING = "KING",
}

export class Figure {
    color: Colors;
    cell: Cell;
    name: FigureNames;
    id: number;


    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.name = FigureNames.FIGURE
        this.id = Math.random()
    }

    canMove(target: Cell) : boolean {
        return false
    }

    moveFigure(target: Cell) {}
}