const express = require('express')
const router = express.Router()

const taskController = require('../controllers/task')

const authMiddleware = require('../middleware/isAuth')

router.get('/:projectId/tasks/', authMiddleware.verifyJWT, taskController.list)

router.post('/:projectId/tasks/', authMiddleware.verifyJWT, taskController.create)

router.patch('/:projectId/tasks/:id', authMiddleware.verifyJWT, taskController.update)

router.delete('/:projectId/tasks/:id', authMiddleware.verifyJWT, taskController.delete)

module.exports = router
