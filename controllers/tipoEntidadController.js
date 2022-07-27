const TipoEntidad = require('../models/TipoEntidad')
const { validationResult } = require('express-validator')

exports.apiGetTipoEntidades = async function (req, res) {
  try {
    let respuesta = await TipoEntidad.allTipoEntidades()
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiGetTipoEntidadById = async function (req, res) {
  try {
    let respuesta = await TipoEntidad.TipoEntidadById(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiAddTipoEntidad = async function (req, res) {
  // revisar si hay errores
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }
  try {
    let respuesta = await new TipoEntidad(req.body).addTipoEntidad()
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiUpdateTipoEntidad = async function (req, res) {
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({
      errores: errores.array()
    })
  }
  try {
    let respuesta = await new TipoEntidad(req.body).updateTipoEntidad(
      req.params
    )
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiDeleteTipoEntidad = async function (req, res) {
  try {
    let respuesta = await TipoEntidad.deleteTipoEntidad(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}
