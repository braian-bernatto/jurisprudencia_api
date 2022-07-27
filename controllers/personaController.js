const Persona = require('../models/Persona')
const { validationResult } = require('express-validator')

exports.apiGetPersonas = async function (req, res) {
  try {
    let respuesta = await Persona.allPersonas()
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiGetPersonaById = async function (req, res) {
  try {
    let respuesta = await Persona.PersonaById(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiAddPersona = async function (req, res) {
  // revisar si hay errores
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }
  try {
    let respuesta = await new Persona(req.body).addPersona()
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiUpdatePersona = async function (req, res) {
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({
      errores: errores.array()
    })
  }
  try {
    let respuesta = await new Persona(req.body).updatePersona(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiDeletePersona = async function (req, res) {
  try {
    let respuesta = await Persona.deletePersona(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}
