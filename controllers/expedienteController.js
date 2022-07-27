const Expediente = require('../models/Expediente')
const { validationResult } = require('express-validator')

exports.apiGetExpedientes = async function (req, res) {
  try {
    let respuesta = await Expediente.allExpedientes()
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiGetExpedienteById = async function (req, res) {
  try {
    let respuesta = await Expediente.ExpedienteById(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiAddExpediente = async function (req, res) {
  // revisar si hay errores
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }
  try {
    let respuesta = await new Expediente(req.body).addExpediente()
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiUpdateExpediente = async function (req, res) {
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({
      errores: errores.array()
    })
  }
  try {
    let respuesta = await new Expediente(req.body).updateExpediente(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiDeleteExpediente = async function (req, res) {
  try {
    let respuesta = await Expediente.deleteExpediente(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}
