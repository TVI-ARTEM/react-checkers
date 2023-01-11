import ApiError from "../error/ApiError";
import {Request, Response, NextFunction} from 'express';
import Game from "../game/Game";
import jwt_decode from 'jwt-decode'

require("json-circular-stringify");

import {
    COOP_STYLE_COOP_VALUE,
    COOP_STYLE_SOLO_VALUE, DIFFICULT_EASY_VALUE, DIFFICULT_PRO_VALUE,
    GAME_MODE_1_KINGS_VALUE,
    GAME_MODE_2_KINGS_VALUE,
    GAME_MODE_3_CHECKERS_VALUE, GAME_MODE_3_KINGS_VALUE,
    GAME_MODE_STANDARD_VALUE,
    PC_PLAYERS_0_VALUE,
    PC_PLAYERS_1_VALUE,
    PC_PLAYERS_2_VALUE,
    PC_PLAYERS_3_VALUE
} from "../utils/consts";
import Room from "../game/Room";

const game: Game = require('../game/Game')

const check_id = function (id: string) {
    return id && id.length == 8
}

const check_password = function (password: string) {
    return password
}

const check_pc_players = function (pc_players: string) {
    return pc_players === PC_PLAYERS_0_VALUE || pc_players === PC_PLAYERS_1_VALUE ||
        pc_players === PC_PLAYERS_2_VALUE || pc_players === PC_PLAYERS_3_VALUE
}

const check_coop_style = function (coop_style: string) {
    return coop_style === COOP_STYLE_SOLO_VALUE || coop_style === COOP_STYLE_COOP_VALUE
}

const check_game_mode = function (game_mode: string) {
    return game_mode === GAME_MODE_STANDARD_VALUE || game_mode === GAME_MODE_3_CHECKERS_VALUE ||
        game_mode === GAME_MODE_1_KINGS_VALUE || game_mode === GAME_MODE_2_KINGS_VALUE ||
        game_mode === GAME_MODE_3_KINGS_VALUE
}

const check_difficult = function (difficult: string) {
    return difficult === DIFFICULT_EASY_VALUE || difficult === DIFFICULT_PRO_VALUE
}

const decodeToken = function (token: string) {
    return jwt_decode(token) as IUser
}

interface IUser {
    id: number,
    email: string,
}


class RoomController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {id, password, pc_players, coop_style, game_mode, difficult} = req.body

            if (!check_id(id)) {
                return ApiError.badRequest('Incorrect id! ID length must be equal 8')
            }

            if (!check_password(password)) {
                return ApiError.badRequest('Incorrect password!')
            }

            if (!check_pc_players(pc_players)) {
                return ApiError.badRequest('Incorrect pc players number!')
            }

            if (!check_coop_style(coop_style)) {
                return ApiError.badRequest('Incorrect coop style!')
            }

            if (!check_game_mode(game_mode)) {
                return ApiError.badRequest('Incorrect game mode!')
            }

            if (!check_difficult(difficult)) {
                return ApiError.badRequest('Incorrect difficult!')
            }

            const user = decodeToken(req.headers.authorization.split(' ')[1])

            const room = Room.createRoom(id, password, pc_players, coop_style, game_mode, difficult)

            room.addUser(user.email)

            game.addRoom(room)

            const room_json = JSON.stringify({room_id: room.room_id, room_password: room.room_password})
            return res.status(200).json({room: room_json})
        } catch (e) {
            return next(e)
        }

    }

    async join(req: Request, res: Response, next: NextFunction) {
        try {

            const {id, password} = req.body

            const user = decodeToken(req.headers.authorization.split(' ')[1])


            const room = game.getRoom(id, password)
            room.addUser(user.email)
            const room_json = JSON.stringify({room_id: room.room_id, room_password: room.room_password})


            return res.status(200).json({room: room_json})

        } catch (e) {
            return next(e)
        }

    }

}

module.exports = new RoomController()