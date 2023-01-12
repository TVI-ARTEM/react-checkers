import Cell from "../Cell";
import {Colors} from "../Colors";
import logo from '../images/black.png';
import {Checker} from "./Checker";
import {Empty} from "./Empty";
import {King} from "./King";

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
        this.id = Math.random()
        this.logo = ''
    }

    public canMove(target: Cell): boolean {
        return false
    }

    public moveFigure(target: Cell) {
    }

    protected getLogo(): string {
        return logo;
    }

    public setLogo() {
        this.logo = this.getLogo()
    }

}