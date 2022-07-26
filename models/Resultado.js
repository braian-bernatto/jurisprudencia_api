const pool = require('../db')

const Resultado = function (data) {
  this.data = data
  this.errors = []
}

Resultado.allResultados = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      let resultado = await pool.query(
        `SELECT * FROM Resultado ORDER BY 1 DESC`
      )

      if (resultado.length) {
        let datos = new Resultado(resultado)
        resolve(datos)
      } else {
        reject()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

Resultado.ResultadoById = async function ({ id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let resultado = await pool.query(
        `SELECT * FROM Resultado WHERE Resultado_ID = ${id}`
      )

      if (resultado.length) {
        let datos = new Resultado(resultado)
        resolve(datos)
      } else {
        reject()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

Resultado.prototype.addResultado = async function () {
  const { resultado_descri } = this.data

  // only if there are no errors proceedo to save into the database
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        let resultado = await pool.query(
          `INSERT INTO Resultado(resultado_descri) VALUES ('${resultado_descri}') returning Resultado_id`
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

Resultado.prototype.updateResultado = async function ({ id }) {
  const { resultado_descri } = this.data
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        let resultado = await pool.query(`
          UPDATE Resultado SET resultado_descri='${resultado_descri}' WHERE resultado_id=${id} returning resultado_id
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

Resultado.deleteResultado = function ({ id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let respuesta = await pool.query(
        `DELETE FROM Resultado where Resultado_id=${id} returning Resultado_id`
      )
      resolve(respuesta)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = Resultado
