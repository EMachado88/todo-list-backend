const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    description: {
      type: String,
      required: true
    },
    projectId: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true
    },
    finishedAt: {
      type: Date
    }
})

module.exports = mongoose.model('Task', TaskSchema);
