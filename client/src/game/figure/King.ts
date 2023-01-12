import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import Cell from "../Cell";

import whiteLogo from '../images/white_king.png';
import blackLogo from '../images/black_king.png';
import redLogo from '../images/red_king.png';
import greenLogo from '../images/green_king.png';

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.name = FigureNames.KING;
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