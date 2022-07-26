const TipoResolucion = require('../models/TipoResolucion')
const { validationResult } = require('express-validator')

exports.apiGetTipoResoluciones = async function (req, res) {
  try {
    let respuesta = await TipoResolucion.allTipoResoluciones()
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error.detail)
    console.log(error)
  }
}

exports.apiGetTipoResolucionById = async function (req, res) {
  try {
    let respuesta = await TipoResolucion.TipoResolucionById(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error.detail)
    console.log(error)
  }
}

exports.apiAddTipoResolucion = async function (req, res) {
  // revisar si hay errores
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }
  try {
    let respuesta = await new TipoResolucion(req.body).addTipoResolucion()
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error.detail)
    console.log(error)
  }
}

exports.apiUpdateTipoResolucion = async function (req, res) {
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({
      errores: errores.array()
    })
  }
  try {
    let respuesta = await new TipoResolucion(req.body).updateTipoResolucion(
      req.params
    )
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error.detail)
    console.log(error)
  }
}

exports.apiDeleteTipoResolucion = async function (req, res) {
  try {
    let respuesta = await TipoResolucion.deleteTipoResolucion(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error.detail)
    console.log(error)
  }
}
