const { validationResult } = require('express-validator')
const Usuario = require('../models/Usuario')

exports.autenticarUsuario = async (req, res) => {
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }

  const { user, password } = req.body

  try {
    let respuesta = await Usuario.verficarUsuario(user, password)
    if (respuesta.token) {
      return res.send(respuesta)
    } else {
      return res.status(400).send(respuesta)
    }
  } catch (error) {
    console.log(error)
  }
}

exports.usuarioAutenticado = async (req, res) => {
  res.send(req.usuario)
}
