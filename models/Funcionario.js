const pool = require('../db')

const Funcionario = function (data) {
  this.data = data
  this.errors = []
}

Funcionario.allFuncionarios = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      let resultado = await pool.query(
        `SELECT * FROM Funcionario NATURAL JOIN PERSONA NATURAL JOIN CARGO ORDER BY 1 DESC`
      )

      if (resultado.length) {
        let datos = new Funcionario(resultado)
        resolve(datos)
      } else {
        reject()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

Funcionario.FuncionarioById = async function ({ cargo, persona }) {
  return new Promise(async (resolve, reject) => {
    try {
      let resultado = await pool.query(
        `SELECT * FROM Funcionario NATURAL JOIN PERSONA NATURAL JOIN CARGO WHERE cargo_id=${cargo} and persona_id=${persona} `
      )

      if (resultado.length) {
        let datos = new Funcionario(resultado)
        resolve(datos)
      } else {
        reject()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

Funcionario.prototype.addFuncionario = async function () {
  const { cargo_id, persona_id, funcionario_activo } = this.data

  // only if there are no errors proceedo to save into the database
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        let resultado = await pool.query(
          `INSERT INTO Funcionario(cargo_id, persona_id, funcionario_activo) VALUES (${cargo_id},${persona_id},${funcionario_activo}) returning persona_id`
        )
        resolve(resultado)
      } catch (error) {
        console.log(error)
      }
    } else {
      reject(this.errors)
    }
  })
}

Funcionario.prototype.updateFuncionario = async function ({ persona, cargo }) {
  const { funcionario_activo } = this.data
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        let resultado = await pool.query(`
          UPDATE Funcionario SET funcionario_activo=${funcionario_activo} WHERE cargo_id=${cargo} and persona_id=${persona} returning persona_id
        `)
        resolve(resultado)
      } catch (error) {
        console.log(error)
      }
    } else {
      reject(this.errors)
    }
  })
}

Funcionario.deleteFuncionario = function ({ persona, cargo }) {
  return new Promise(async (resolve, reject) => {
    try {
      let respuesta = await pool.query(
        `DELETE FROM Funcionario WHERE cargo_id=${cargo} and persona_id=${persona} returning persona_id`
      )
      resolve(respuesta)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = Funcionario
