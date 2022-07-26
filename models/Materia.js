const pool = require('../db')

const Materia = function (data) {
  this.data = data
  this.errors = []
}

Materia.allMaterias = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      let resultado = await pool.query(`SELECT * FROM Materia ORDER BY 1 DESC`)

      if (resultado.length) {
        let datos = new Materia(resultado)
        resolve(datos)
      } else {
        reject()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

Materia.MateriaById = async function ({ id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let resultado = await pool.query(
        `SELECT * FROM MATERIA WHERE MATERIA_ID = ${id}`
      )

      if (resultado.length) {
        let datos = new Materia(resultado)
        resolve(datos)
      } else {
        reject()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

Materia.prototype.addMateria = async function () {
  const { materia_nombre } = this.data

  // only if there are no errors proceedo to save into the database
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        let resultado = await pool.query(
          `INSERT INTO Materia(Materia_nombre) VALUES ('${materia_nombre}') returning Materia_id`
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

Materia.prototype.updateMateria = async function ({ id }) {
  const { materia_nombre } = this.data
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        let resultado = await pool.query(`
          UPDATE Materia SET materia_nombre='${materia_nombre}' WHERE materia_id=${id} returning returning materia_id
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

Materia.deleteMateria = function ({ id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let respuesta = await pool.query(
        `DELETE FROM Materia where Materia_id=${id} returning Materia_id`
      )
      resolve(respuesta)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = Materia
