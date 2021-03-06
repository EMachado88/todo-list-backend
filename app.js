require('dotenv').config()
const PORT = process.env.PORT || 9000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todos'

const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

const userRoutes = require('./routes/user')
const projectRoutes = require('./routes/project')
const taskRoutes = require('./routes/task')

// MongoDB connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log(`we're connected to mongo`)
})

// Express app
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/projects', taskRoutes)

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) })
