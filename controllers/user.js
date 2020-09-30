require('dotenv').config()
const secret = process.env.MONGODB_PASSWORD || 'randomPasswordNeeded'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.create = async (req, res, next) => {
  const { name, email, password } = req.body.user

  const hash = await bcrypt.hash(password, 10)

  const user = new User(
    {
      name,
      email,
      password: hash
    }
  );

  user.save((err) => {
    if (err) {
      return next(err)
    }

    res.json('User created successfully')
  })
}

exports.login = async (req, res) => {
  const { email, password } = req.body.user

  try {
    const user = await User.findOne({ email })

    const isValid = await bcrypt.compare(password, user.password)
    
    if (isValid) {
      const token = jwt.sign({ 
        _id: user._id,
        name: user.name,
        email: user.email
      }, secret, { expiresIn: '6h' })
      
      res.json({
        user: {
          name: user.name,
          email: user.email
        },
        token
      })
    } else {
      res.status(403).json('Password is invalid').end()
    }
  } catch (error) {
    res.status(500).json('User does not exist').end()
  }
}

exports.list = async (req, res, next) => {
  const users = await User.find({})
  console.log(users)
  res.json(users)
}
