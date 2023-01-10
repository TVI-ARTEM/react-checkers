const Router = require('express')
const router = new Router()

const roomController = require('../controller/roomController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/create', authMiddleware, )

module.exports = router
