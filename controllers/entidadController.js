const Entidad = require('../models/Entidad')
const { validationResult } = require('express-validator')

exports.apiGetEntidades = async function (req, res) {
  try {
    let respuesta = await Entidad.allEntidades()
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiGetEntidadById = async function (req, res) {
  try {
    let respuesta = await Entidad.entidadById(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiAddEntidad = async function (req, res) {
  // revisar si hay errores
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }
  try {
    let respuesta = await new Entidad(req.body).addEntidad()
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiUpdateEntidad = async function (req, res) {
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({
      errores: errores.array()
    })
  }
  try {
    let respuesta = await new Entidad(req.body).updateEntidad(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiDeleteEntidad = async function (req, res) {
  try {
    let respuesta = await Entidad.deleteEntidad(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}
