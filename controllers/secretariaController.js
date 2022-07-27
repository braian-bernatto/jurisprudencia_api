const Secretaria = require('../models/Secretaria')
const { validationResult } = require('express-validator')

exports.apiGetSecretarias = async function (req, res) {
  try {
    let respuesta = await Secretaria.allSecretarias()
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiGetSecretariaById = async function (req, res) {
  try {
    let respuesta = await Secretaria.SecretariaById(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiAddSecretaria = async function (req, res) {
  // revisar si hay errores
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }
  try {
    let respuesta = await new Secretaria(req.body).addSecretaria()
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiUpdateSecretaria = async function (req, res) {
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({
      errores: errores.array()
    })
  }
  try {
    let respuesta = await new Secretaria(req.body).updateSecretaria(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiDeleteSecretaria = async function (req, res) {
  try {
    let respuesta = await Secretaria.deleteSecretaria(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}
