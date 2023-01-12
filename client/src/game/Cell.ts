import Board from "./Board";
import {Figure} from "./figure/Figure";
import {Empty} from "./figure/Empty";
import {Colors} from "./Colors";

class Cell {
    board: Board
    readonly x: number
    readonly y: number
    figure: Figure

    constructor(board: Board, x: number, y: number) {
        this.board = board
        this.x = x
        this.y = y
        this.figure = new Empty(Colors.WHITE, this)
    }
}
export default Cell;