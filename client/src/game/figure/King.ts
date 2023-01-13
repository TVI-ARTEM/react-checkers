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

    public getAvailableCells(): Array<{ prevCells: Cell[], cell: Cell }> {
        const availableCells: { prevCells: Cell[], cell: Cell }[] = []
        this.getAvailableCellsInternal(this.cell, {prevCells: [], cell: this.cell}, availableCells, this.direction())
        return availableCells;
    }

    private direction(): { x: number, y: number }[] {
        switch (this.color) {
            case Colors.WHITE:
                return [{x: 1, y: 0}, {x: 0, y: 1}]
            case Colors.BLACK:
                return [{x: 1, y: 0}, {x: 0, y: -1}]
            case Colors.RED:
                return [{x: -1, y: 0}, {x: 0, y: 1}]
            case Colors.GREEN:
                return [{x: -1, y: 0}, {x: 0, y: -1}]
        }
    }

    protected getAvailableCellsInternal(origin: Cell, prev: { prevCells: Cell[], cell: Cell }, availableCells: { prevCells: Cell[], cell: Cell }[], directions: { x: number, y: number }[]) {

        for (const direction of directions) {
            const possibleCell = origin.board.getCell(prev.cell.x + direction.x, prev.cell.y + direction.y)
            if (possibleCell === null) {
                continue
            }

            const possiblePrevCells = [...prev.prevCells]
            possiblePrevCells.push(prev.cell)

            const possiblePath = {prevCells: possiblePrevCells, cell: possibleCell}

            if (possibleCell.figure !== null) {

                if (origin.figure !== null && origin.figure.color === possibleCell.figure.color) {
                    continue
                }

                const nextPossibleCell = origin.board.getCell(possiblePath.cell.x + direction.x, possiblePath.cell.y + direction.y)

                if (nextPossibleCell === null || nextPossibleCell.figure !== null) {
                    continue
                }
                console.log(direction)
                const newDirections: {x:number, y: number}[] =  []

                for (const el of Figure.getDirections()) {
                    if (el.x === -direction.x && el.y === -direction.y) {
                        console.log(el)
                        continue
                    }

                    newDirections.push(el)
                }

                const possibleNextPrevCells = [...possiblePath.prevCells]
                possibleNextPrevCells.push(possiblePath.cell)

                const possibleNextPath = {prevCells: possibleNextPrevCells, cell: nextPossibleCell}
                const prevAvailable = [...availableCells]
                console.log(newDirections)
                this.getAvailableCellsInternal(origin, possibleNextPath, availableCells, newDirections)
                console.log('RECURSION')
                if (prevAvailable.length === availableCells.length) {
                    availableCells.push(possibleNextPath)
                }
            } else if (prev.cell.x == origin.x && prev.cell.y == origin.y) {
                availableCells.push(possiblePath)
            }
        }
    }


}