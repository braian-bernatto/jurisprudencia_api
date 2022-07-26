const pool = require('../db')

const TipoResolucion = function (data) {
  this.data = data
  this.errors = []
}

TipoResolucion.allTipoResoluciones = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      let tipo = await pool.query(
        `SELECT * FROM tipo_resolucion ORDER BY 1 DESC`
      )

      if (tipo.length) {
        let datos = new TipoResolucion(tipo)
        resolve(datos)
      } else {
        reject()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

TipoResolucion.TipoResolucionById = async function ({ id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let tipo = await pool.query(
        `SELECT * FROM tipo_resolucion WHERE tipo_resolucion_id = ${id}`
      )

      if (tipo.length) {
        let datos = new TipoResolucion(tipo)
        resolve(datos)
      } else {
        reject()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

TipoResolucion.prototype.addTipoResolucion = async function () {
  const { tipo_resolucion_descri } = this.data

  // only if there are no errors proceedo to save into the database
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        let tipo = await pool.query(
          `INSERT INTO tipo_resolucion(tipo_resolucion_descri) VALUES ('${tipo_resolucion_descri}') returning tipo_resolucion_id`
        )
        resolve(tipo)
      } catch (error) {
        console.log(error)
      }
    } else {
      reject(this.errors)
    }
  })
}

TipoResolucion.prototype.updateTipoResolucion = async function ({ id }) {
  const { tipo_resolucion_descri } = this.data
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        let tipo = await pool.query(`
          UPDATE tipo_resolucion SET tipo_resolucion_descri='${tipo_resolucion_descri}' WHERE tipo_resolucion_id=${id} returning tipo_resolucion_id
        `)
        resolve(tipo)
      } catch (error) {
        console.log(error)
      }
    } else {
      reject(this.errors)
    }
  })
}

TipoResolucion.deleteTipoResolucion = function ({ id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let respuesta = await pool.query(
        `DELETE FROM tipo_resolucion where tipo_resolucion_id=${id} returning tipo_resolucion_id`
      )
      resolve(respuesta)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = TipoResolucion
