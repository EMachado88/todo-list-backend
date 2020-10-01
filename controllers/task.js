const Task = require('../models/task')

exports.list = async (req, res, next) => {
  const tasks = await Task.find({ projectId: req.params.projectId })

  res.json(tasks)
}

exports.create = async (req, res, next) => {
  const { description } = req.body.task

  const task = new Task(
    {
      description,
      projectId: req.params.projectId
    }
  )

  try {
   await task.save()
   res.json(task)
  } catch (error) {
    return next(error)
  }
}

exports.update = async (req, res, next) => {
  const taskId = req.params.id

  const { description, finishedAt } = req.body.task

  const task = await Task.findOne({ _id: taskId })

  if (task.finishedAt) {
    return res.status(403).json('Task already finished.')
  }

  if (description) task.description = description
  if (finishedAt) task.finishedAt = finishedAt

  try {
    await task.save()

    res.json(task)
  } catch (error) {
    return next(error)
  }
}

exports.delete = async (req, res, next) => {
  const result = await Task.deleteOne({ _id: req.params.id })

  res.json(result)
}
