const Miembro = require('../models/Miembro')
const { validationResult } = require('express-validator')

exports.apiGetMiembros = async function (req, res) {
  try {
    let respuesta = await Miembro.allMiembros()
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiGetMiembroById = async function (req, res) {
  try {
    let respuesta = await Miembro.MiembroById(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiAddMiembro = async function (req, res) {
  // revisar si hay errores
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }
  try {
    let respuesta = await new Miembro(req.body).addMiembro()
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiDeleteMiembro = async function (req, res) {
  try {
    let respuesta = await Miembro.deleteMiembro(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}
