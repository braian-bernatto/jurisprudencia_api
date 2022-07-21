const pool = require('../db')
const pgp = require('pg-promise')({ capSQL: true })

const Entidad = function (data) {
  this.data = data
  this.errors = []
}

Entidad.allEntidades = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      let resultado = await pool.query(`SELECT * FROM ENTIDAD ORDER BY 1 DESC`)

      if (resultado.length) {
        let datos = new Entidad(resultado)
        resolve(datos)
      } else {
        reject()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

Entidad.entidadById = async function ({ id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let resultado = await pool.query(
        `SELECT * FROM ENTIDAD WHERE ENTIDAD_ID = ${id}`
      )

      if (resultado.length) {
        let datos = new Entidad(resultado)
        resolve(datos)
      } else {
        reject()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

Entidad.prototype.addEntidad = async function () {
  const { entidad_nombre, tipo_entidad } = this.data

  // only if there are no errors proceedo to save into the database
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        let resultado = await pool.query(
          `INSERT INTO entidad(entidad_nombre, tipo_entidad_id) VALUES ('${entidad_nombre}', ${tipo_entidad}) returning entidad_id`
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

Entidad.prototype.updateEntidad = async function ({ id }) {
  const { entidad_nombre, tipo_entidad } = this.data
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        let resultado = await pool.query(`
          UPDATE entidad SET entidad_nombre='${entidad_nombre}', tipo_entidad_id=${tipo_entidad} WHERE entidad_id=${id} returning entidad_id
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

Entidad.deleteEntidad = function ({ id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let respuesta = await pool.query(
        `DELETE FROM entidad where entidad_id=${id} returning entidad_id`
      )
      resolve(respuesta)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = Entidad
