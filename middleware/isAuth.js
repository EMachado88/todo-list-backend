require('dotenv').config()
const secret = process.env.MONGODB_PASSWORD || 'randomPasswordNeeded'

const jwt = require('jsonwebtoken')

function verifyJWT(req, res, next){
  var token = req.headers['authorization'].replace('Bearer ', '')
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided' })

  jwt.verify(token, secret, function(err, decoded) {
    if (err) return res.status(403).json({ auth: false, message: 'Failed to authenticate token' })

    req.user = decoded._id

    next()
  })
}

exports.verifyJWT = verifyJWT
