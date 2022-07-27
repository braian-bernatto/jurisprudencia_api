const Cargo = require('../models/Cargo')
const { validationResult } = require('express-validator')

exports.apiGetCargos = async function (req, res) {
  try {
    let respuesta = await Cargo.allCargos()
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiGetCargoById = async function (req, res) {
  try {
    let respuesta = await Cargo.CargoById(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiAddCargo = async function (req, res) {
  // revisar si hay errores
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }
  try {
    let respuesta = await new Cargo(req.body).addCargo()
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiUpdateCargo = async function (req, res) {
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({
      errores: errores.array()
    })
  }
  try {
    let respuesta = await new Cargo(req.body).updateCargo(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiDeleteCargo = async function (req, res) {
  try {
    let respuesta = await Cargo.deleteCargo(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}
