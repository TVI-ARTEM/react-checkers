import Board from "./Board";
import {Figure} from "./figure/Figure";

class Cell {
    board: Board
    readonly x: number
    readonly y: number
    figure: Figure | null

    constructor(board: Board, x: number, y: number) {
        this.board = board
        this.x = x
        this.y = y
        this.figure = null
    }
}
export default Cell;