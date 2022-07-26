const Materia = require('../models/Materia')
const { validationResult } = require('express-validator')

exports.apiGetMaterias = async function (req, res) {
  try {
    let respuesta = await Materia.allMaterias()
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error.detail)
    console.log(error)
  }
}

exports.apiGetMateriaById = async function (req, res) {
  try {
    let respuesta = await Materia.MateriaById(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error.detail)
    console.log(error)
  }
}

exports.apiAddMateria = async function (req, res) {
  // revisar si hay errores
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }
  try {
    let respuesta = await new Materia(req.body).addMateria()
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error.detail)
    console.log(error)
  }
}

exports.apiUpdateMateria = async function (req, res) {
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({
      errores: errores.array()
    })
  }
  try {
    let respuesta = await new Materia(req.body).updateMateria(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error.detail)
    console.log(error)
  }
}

exports.apiDeleteMateria = async function (req, res) {
  try {
    let respuesta = await Materia.deleteMateria(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error.detail)
    console.log(error)
  }
}
