import ApiError from "../error/ApiError";
import {GameWinner, User} from "../models/models";
import {Request, Response, NextFunction} from 'express';


class WinnerController {
    async updateWinner(req: Request, res: Response, next: NextFunction) {
        try {
            const {email} = req.body

            if (!email) {
                return next(ApiError.badRequest('Incorrect e-mail!'))
            }

            await User.findOne({where: {email}}).then(user => {
                if (!user) {
                    return next(ApiError.badRequest('User is not found!'))
                }
                const userId = user.id
                GameWinner.findOne({where: {userId: userId}}).then(
                    winner => {
                        if (winner) {
                            winner.update({count: winner.count + 1}).catch(error => next(error))
                        } else {
                            GameWinner.create({userId: userId}).catch(error => next(error))
                        }
                    }
                )

            }).catch(error => next(error))

            return res.status(200).json({message: "OK"})


        } catch (e) {
            return next(e)
        }
    }

    async getWinners(req: Request, res: Response, next: NextFunction) {
        try {
            const winners = (await GameWinner.findAll({order: [['count', 'DESC']], limit: 10, include: User})).map((winner) => {
                return {email: winner.user.email, count: winner.count}
            })
            return res.json({winners: winners})
        } catch (e) {
            return next(e)
        }
    }
}

module.exports = new WinnerController()