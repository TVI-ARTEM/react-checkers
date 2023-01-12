import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import Cell from "../Cell";

export class Empty extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.name = FigureNames.EMPTY;
    }

    canMove(target: Cell): boolean {
        return false
    }
}