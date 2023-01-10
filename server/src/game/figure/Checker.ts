import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import Cell from "../Cell";

export class Checker extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.name = FigureNames.CHECKER;
    }

    canMove(target: Cell): boolean {
        return super.canMove(target);
    }
}