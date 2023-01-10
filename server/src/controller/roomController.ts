import ApiError from "../error/ApiError";
import {User} from "../models/models";
import {Request, Response, NextFunction} from 'express';

class RoomController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e) {
            return next(e)
        }

    }

}

module.exports = new RoomController()