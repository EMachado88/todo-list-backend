require('dotenv').config()
const PORT = process.env.PORT || 9000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todos'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const userRoutes = require('./routes/user')

// MongoDB connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log(`we're connected to mongo`)
})

const app = express()
app.use(bodyParser.json())

app.use('/api/users', userRoutes)

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) })
