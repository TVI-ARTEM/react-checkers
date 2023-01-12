import IRoom from "../game/room/Room";
import Board from "../game/Board";
import {Figure, FigureNames} from "../game/figure/Figure";
import {Colors} from "../game/Colors";
import Cell from "../game/Cell";
import {Checker} from "../game/figure/Checker";
import {King} from "../game/figure/King";
import {Empty} from "../game/figure/Empty";

export default function jsonToClass(json: string) {
    const json_parsed = JSON.parse(json) as IRoom
    const new_board = new Board(json_parsed.room_settings)
    new_board.initCells()
    for (let row = 0; row < new_board.cells.length; row++) {
        for (let column = 0; column < new_board.cells.length; column++) {
            // @ts-ignore
            const figure = json_parsed.board.cells.at(row).at(column).figure
            if (!figure){
                continue
            }
            // @ts-ignore
            const cell = new_board.cells.at(row).at(column)
            // @ts-ignore
            cell.figure = createFigure(figure.color, figure.name, cell)
            // @ts-ignore
            cell.figure.setLogo()
        }
    }
    json_parsed.board = new_board
    return json_parsed
}


function createFigure(color: Colors, name: FigureNames, cell: Cell): Figure {
    switch (name) {
        case FigureNames.CHECKER:
            return new Checker(color, cell)
        case FigureNames.KING:
            return new King(color, cell)
        default:
            return new Empty(color, cell)
    }
}