const pool = require('../db')

const TipoEntidad = function (data) {
  this.data = data
  this.errors = []
}

TipoEntidad.allTipoEntidades = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      let tipo = await pool.query(`SELECT * FROM tipo_entidad ORDER BY 1`)

      if (tipo.length) {
        let datos = new TipoEntidad(tipo)
        resolve(datos)
      } else {
        reject()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

TipoEntidad.TipoEntidadById = async function ({ id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let tipo = await pool.query(
        `SELECT * FROM tipo_entidad WHERE tipo_entidad_id = ${id}`
      )

      if (tipo.length) {
        let datos = new TipoEntidad(tipo)
        resolve(datos)
      } else {
        reject()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

TipoEntidad.prototype.addTipoEntidad = async function () {
  const { tipo_entidad_descri } = this.data

  // only if there are no errors proceedo to save into the database
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        let tipo = await pool.query(
          `INSERT INTO tipo_entidad(tipo_entidad_descri) VALUES ('${tipo_entidad_descri}') returning tipo_entidad_id`
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

TipoEntidad.prototype.updateTipoEntidad = async function ({ id }) {
  const { tipo_entidad_descri } = this.data
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        let tipo = await pool.query(`
          UPDATE tipo_entidad SET tipo_entidad_descri='${tipo_entidad_descri}' WHERE tipo_entidad_id=${id} returning tipo_entidad_id
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

TipoEntidad.deleteTipoEntidad = function ({ id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let respuesta = await pool.query(
        `DELETE FROM tipo_entidad where tipo_entidad_id=${id} returning tipo_entidad_id`
      )
      resolve(respuesta)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = TipoEntidad
