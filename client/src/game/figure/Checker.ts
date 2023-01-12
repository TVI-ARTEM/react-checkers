import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import Cell from "../Cell";

import whiteLogo from '../images/white.png';
import blackLogo from '../images/black.png';
import redLogo from '../images/red.png';
import greenLogo from '../images/green.png';

export class Checker extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.name = FigureNames.CHECKER;
    }

    public canMove(target: Cell): boolean {
        return super.canMove(target);
    }

    protected getLogo(): string {
        switch (this.color) {
            case Colors.WHITE:
                return whiteLogo
            case Colors.BLACK:
                return blackLogo
            case Colors.RED:
                return redLogo
            case Colors.GREEN:
                return greenLogo
        }
        return super.getLogo();
    }

}