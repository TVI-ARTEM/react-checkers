import Cell from "../Cell";
import {Colors} from "../Colors";

export enum FigureNames {
    FIGURE = "FIGURE",
    CHECKER = "CHECKER",
    KING = "KING",
    EMPTY = 'EMPTY'
}

export class Figure {
    color: Colors;
    cell: Cell;
    name: FigureNames;
    id: number;
    logo: string


    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.name = FigureNames.FIGURE
        this.logo = ''
        this.id = Math.random()
    }

    canMove(target: Cell) : boolean {
        return false
    }

    moveFigure(target: Cell) {}
}