require('dotenv').config()
const secret = process.env.MONGODB_PASSWORD || 'randomPasswordNeeded'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const generateJWT = (_id, name, email) => {
  return jwt.sign({ 
    _id,
    name,
    email
  }, secret, { expiresIn: '6h' })
}

exports.create = async (req, res, next) => {
  const { name, email, password } = req.body.user

  const hash = await bcrypt.hash(password, 10)

  const user = new User(
    {
      name,
      email,
      password: hash
    }
  )

  user.save((err) => {
    if (err) {
      return next(err)
    }

    const token = generateJWT(user._id, user.name, user.email)
    
    res.json({
      user: {
        name: user.name,
        email: user.email
      },
      token
    })
  })
}

exports.login = async (req, res) => {
  const { email, password } = req.body.user

  try {
    const user = await User.findOne({ email })

    const isValid = await bcrypt.compare(password, user.password)
    
    if (isValid) {
      const token = generateJWT(user._id, user.name, user.email)
      
      res.json({
        user: {
          name: user.name,
          email: user.email
        },
        token
      })
    } else {
      return res.status(403).json('Password is invalid').end()
    }
  } catch (error) {
    return res.status(500).json('User does not exist').end()
  }
}

exports.list = async (req, res, next) => {
  const users = await User.find({})
  
  res.json(users)
}

exports.delete = async (req, res, next) => {
  const result = await User.deleteOne({ _id: req.params.id })

  res.json(result)
}
