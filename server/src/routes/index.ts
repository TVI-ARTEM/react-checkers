const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const roomRouter = require('./roomRouter')
const winnerRouter = require('./winnerRouter')

router.use('/user', userRouter)
router.use('/room', roomRouter)
router.use('/winner', winnerRouter)

module.exports = router