const Resolucion = require('../models/Resolucion')
const { validationResult } = require('express-validator')

exports.apiGetResoluciones = async function (req, res) {
  try {
    let respuesta = await Resolucion.allResoluciones()
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiGetResolucionById = async function (req, res) {
  try {
    let respuesta = await Resolucion.resolucionById(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiAddResolucion = async function (req, res) {
  // revisar si hay errores
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }
  try {
    let respuesta = await new Resolucion(req.body).addResolucion()
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiUpdateResolucion = async function (req, res) {
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({
      errores: errores.array()
    })
  }
  try {
    let respuesta = await new Resolucion(req.body).updateResolucion(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiDeleteResolucion = async function (req, res) {
  try {
    let respuesta = await Resolucion.deleteResolucion(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}
