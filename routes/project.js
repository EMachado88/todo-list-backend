const express = require('express')
const router = express.Router()

const projectController = require('../controllers/project')

const authMiddleware = require('../middleware/isAuth')

router.get('/', authMiddleware.verifyJWT, projectController.list)

router.post('/', authMiddleware.verifyJWT, projectController.create)

router.patch('/:id', authMiddleware.verifyJWT, projectController.update)

router.delete('/:id', authMiddleware.verifyJWT, projectController.delete)

module.exports = router
