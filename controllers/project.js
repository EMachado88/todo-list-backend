const Project = require('../models/project')

exports.list = async (req, res, next) => {
  const projects = await Project.find({ userId: req.user })

  res.json(projects)
}

exports.create = async (req, res, next) => {
  const { name } = req.body.project

  const project = new Project(
    {
      name,
      userId: req.user
    }
  );

  project.save((err) => {
    if (err) {
      return next(err)
    }

    res.json(project)
  })
}

exports.update = async (req, res, next) => {
  const projectId = req.params.id

  const { name } = req.body.project

  const project = await Project.findOne({ _id: projectId })

  project.name = name

  try {
    await project.save()

    /** @todo delete orphaned tasks */

    res.json(project)
  } catch (error) {
    return next(error)
  }
}

exports.delete = async (req, res, next) => {
  const result = await Project.deleteOne({ _id: req.params.id })

  res.json(result)
}
