const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization')

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    try {
      const usuario = jwt.verify(token, process.env.SECRETA)
      req.usuario = usuario
      return next()
    } catch (error) {
      console.log('Token no válido')
      res.status(400).json({ msg: 'Sesión expirada, vuelva a ingresar' })
    }
  } else {
    res.status(400).json({ msg: 'No hay header' })
  }
}
