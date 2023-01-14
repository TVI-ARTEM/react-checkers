import Cell from "./Cell";
import Settings from "./room/Settings";
import {Checker} from "./figure/Checker";
import {Colors} from "./Colors";
import {King} from "./figure/King";
import {
    GAME_MODE_1_KINGS_VALUE,
    GAME_MODE_3_CHECKERS_VALUE,
    GAME_MODE_3_KINGS_VALUE,
    GAME_MODE_STANDARD_VALUE
} from "../utils/consts";

class Board {
    cells: Cell[][] = []
    settings: Settings

    constructor(settings: Settings) {
        this.settings = settings
    }

    public initCells() {
        this.cells = []
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

    public addCheckersStandard() {
        {
            new Checker(Colors.WHITE, this.getCell(0, 0))
            new Checker(Colors.WHITE, this.getCell(0, 1))
            new Checker(Colors.WHITE, this.getCell(0, 2))
            new Checker(Colors.WHITE, this.getCell(1, 0))
            new Checker(Colors.WHITE, this.getCell(1, 1))
            new Checker(Colors.WHITE, this.getCell(2, 0))
        }

        {
            new Checker(Colors.BLACK, this.getCell(0, 3))
            new Checker(Colors.BLACK, this.getCell(0, 4))
            new Checker(Colors.BLACK, this.getCell(0, 5))
            new Checker(Colors.BLACK, this.getCell(1, 4))
            new Checker(Colors.BLACK, this.getCell(1, 5))
            new Checker(Colors.BLACK, this.getCell(2, 5))
        }

        {
            new Checker(Colors.RED, this.getCell(5, 0))
            new Checker(Colors.RED, this.getCell(5, 1))
            new Checker(Colors.RED, this.getCell(5, 2))
            new Checker(Colors.RED, this.getCell(4, 0))
            new Checker(Colors.RED, this.getCell(4, 1))
            new Checker(Colors.RED, this.getCell(3, 0))
        }

        {
            new Checker(Colors.GREEN, this.getCell(5, 3))
            new Checker(Colors.GREEN, this.getCell(5, 4))
            new Checker(Colors.GREEN, this.getCell(5, 5))
            new Checker(Colors.GREEN, this.getCell(4, 4))
            new Checker(Colors.GREEN, this.getCell(4, 5))
            new Checker(Colors.GREEN, this.getCell(3, 5))
        }
    }
    public addCheckerThree() {
        {
            new Checker(Colors.WHITE, this.getCell(0, 1))
            new Checker(Colors.WHITE, this.getCell(0, 0))
            new Checker(Colors.WHITE, this.getCell(1, 0))

        }

        {
            new Checker(Colors.BLACK, this.getCell(0, 4))
            new Checker(Colors.BLACK, this.getCell(0, 5))
            new Checker(Colors.BLACK, this.getCell(1, 5))

        }

        {
            new Checker(Colors.RED, this.getCell(5, 1))
            new Checker(Colors.RED, this.getCell(5, 0))
            new Checker(Colors.RED, this.getCell(4, 0))

        }

        {
            new Checker(Colors.GREEN, this.getCell(5, 4))
            new Checker(Colors.GREEN, this.getCell(5, 5))
            new Checker(Colors.GREEN, this.getCell(4, 5))

        }
    }

    public addKingOne() {
        new King(Colors.WHITE, this.getCell(0, 0))
        new King(Colors.BLACK, this.getCell(0, 5))
        new King(Colors.RED, this.getCell(5, 0))
        new King(Colors.GREEN, this.getCell(5, 5))
    }

    public addKingThree() {
        {
            new King(Colors.WHITE, this.getCell(0, 1))
            new King(Colors.WHITE, this.getCell(0, 0))
            new King(Colors.WHITE, this.getCell(1, 0))

        }

        {
            new King(Colors.BLACK, this.getCell(0, 4))
            new King(Colors.BLACK, this.getCell(0, 5))
            new King(Colors.BLACK, this.getCell(1, 5))

        }

        {
            new King(Colors.RED, this.getCell(5, 1))
            new King(Colors.RED, this.getCell(5, 0))
            new King(Colors.RED, this.getCell(4, 0))

        }

        {
            new King(Colors.GREEN, this.getCell(5, 4))
            new King(Colors.GREEN, this.getCell(5, 5))
            new King(Colors.GREEN, this.getCell(4, 5))

        }
    }

    public initFigures() {
        switch (this.settings.game_mode) {
            case GAME_MODE_STANDARD_VALUE:
                this.addCheckersStandard()
                break
            case GAME_MODE_3_CHECKERS_VALUE:
                this.addCheckerThree()
                break
            case GAME_MODE_1_KINGS_VALUE:
                this.addKingOne()
                break
            case GAME_MODE_3_KINGS_VALUE:
                this.addKingThree()
                break
        }
    }
}

export default Board;