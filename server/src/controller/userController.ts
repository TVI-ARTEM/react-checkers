import {Request, Response, NextFunction} from 'express';
import {User} from '../models/models';
import ApiError from "../error/ApiError";


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateToken = (id: number, email: string) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

const checkEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return email.match(emailRegex)
}

const checkPassword = (password: string) => {
    return password.length >= 3 && password.length <= 20;
}

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body

            if (!email || !password) {
                return next(ApiError.badRequest('Incorrect e-mail or password!'))
            }

            if (!checkEmail(email)) {
                console.log('as')

                return next(ApiError.badRequest('Incorrect e-mail!'))
            }

            if (!checkPassword(password)) {
                return next(ApiError.badRequest('Incorrect password!\n' +
                    'Password length must be more than 2 and less than 21.'))
            }

            const sameEmail = await User.findOne({where: {email}})
            if (sameEmail) {
                return next(ApiError.badRequest('User with this e-mail already exists!'))
            }

            const hashPassword = await bcrypt.hash(password, 8)
            const user = await User.create({email: email, password: hashPassword})
            const token = generateToken(user.id, user.email)
            return res.json({token})
        } catch (e) {
            return next(e)
        }

    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({where: {email}})

            if (!user) {
                return next(ApiError.internalError("User is not found!"))
            }
            console.log('comparing...')
            console.log(user.password)
            console.log(password)
            bcrypt.compare(password, user.password, (err, res) => {
                if (err) {
                    console.log(err)
                    return next(ApiError.internalError(err.message))
                }
                if (!res) {
                    return next(ApiError.badRequest('Incorrect password!'))

                }
            })
            console.log('comparing ok...')

            const token = generateToken(user.id, user.email)
            return res.json({token})
        } catch (e) {
            return next(e)
        }

    }

    async auth(req: Request, res: Response, next: NextFunction) {
        try {
            const token = generateToken(req.user.id, req.user.email)
            return res.json({token})
        } catch (e) {
            return next(e)
        }
    }
}

module.exports = new UserController()