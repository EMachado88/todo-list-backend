const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

const authMiddleware = require('../middleware/isAuth')

router.post('/signup', userController.create)

router.post('/login', userController.login)

router.get('/', authMiddleware.verifyJWT, userController.list)

module.exports = router
