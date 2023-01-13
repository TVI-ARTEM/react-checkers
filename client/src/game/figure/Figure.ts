import Cell from "../Cell";
import {Colors} from "../Colors";
import logo from '../images/black.png';

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
    logo: string


    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.name = FigureNames.FIGURE
        this.id = Math.random()
        this.logo = ''
    }

    public getAvailableCells(): Array<{ prevCells: Cell[], cell: Cell }> {
        return []
    }

    protected getLogo(): string {
        return logo;
    }


    public setLogo() {
        this.logo = this.getLogo()
    }

    static getDirections(): { x: number, y: number }[] {
        return [
            {x: 1, y: 0}, {x: 0, y: 1},
            {x: -1, y: 0}, {x: 0, y: -1}
        ]
    }

}