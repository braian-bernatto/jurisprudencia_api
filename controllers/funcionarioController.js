const Funcionario = require('../models/Funcionario')
const { validationResult } = require('express-validator')

exports.apiGetFuncionarios = async function (req, res) {
  try {
    let respuesta = await Funcionario.allFuncionarios()
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiGetFuncionarioById = async function (req, res) {
  try {
    let respuesta = await Funcionario.FuncionarioById(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiAddFuncionario = async function (req, res) {
  // revisar si hay errores
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() })
  }
  try {
    let respuesta = await new Funcionario(req.body).addFuncionario()
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiUpdateFuncionario = async function (req, res) {
  const errores = validationResult(req)
  if (!errores.isEmpty()) {
    return res.status(400).json({
      errores: errores.array()
    })
  }
  try {
    let respuesta = await new Funcionario(req.body).updateFuncionario(
      req.params
    )
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}

exports.apiDeleteFuncionario = async function (req, res) {
  try {
    let respuesta = await Funcionario.deleteFuncionario(req.params)
    res.json(respuesta)
  } catch (error) {
    res.status(500).send(error)
    console.log(error)
  }
}
