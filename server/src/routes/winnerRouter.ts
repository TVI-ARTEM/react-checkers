const Router = require('express')
const router = new Router()

const winnerController = require('../controller/winnerController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/update-winner', authMiddleware, winnerController.updateWinner)

router.get('/get-winners', authMiddleware, winnerController.getWinners)

module.exports = router
