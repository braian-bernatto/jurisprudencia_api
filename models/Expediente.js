const pool = require('../db')

const Expediente = function (data) {
  this.data = data
  this.errors = []
}

Expediente.allExpedientes = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      let resultado = await pool.query(
        `SELECT * FROM Expediente NATURAL JOIN ENTIDAD NATURAL JOIN RESULTADO ORDER BY 1 DESC`
      )

      if (resultado.length) {
        let datos = new Expediente(resultado)
        resolve(datos)
      } else {
        reject()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

Expediente.ExpedienteById = async function ({ nro, year, tomo, entidad }) {
  return new Promise(async (resolve, reject) => {
    try {
      let resultado = await pool.query(
        `SELECT * FROM Expediente NATURAL JOIN ENTIDAD NATURAL JOIN RESULTADO WHERE entidad_id = ${entidad} AND expediente_nro = ${nro} AND expediente_year = ${year} AND expediente_tomo = ${tomo}`
      )

      if (resultado.length) {
        let datos = new Expediente(resultado)
        resolve(datos)
      } else {
        reject()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

Expediente.prototype.addExpediente = async function () {
  const {
    expediente_nro,
    expediente_year,
    expediente_tomo,
    entidad_id,
    expediente_caratula,
    expediente_fecha_entrada,
    expediente_observacion,
    resultado_id
  } = this.data

  // only if there are no errors proceedo to save into the database
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        let resultado = await pool.query(
          `INSERT INTO Expediente(
            expediente_nro, 
            expediente_year, 
            expediente_tomo, 
            entidad_id, 
            resultado_id,
            expediente_caratula, expediente_fecha_entrada, expediente_observacion)
          VALUES (${expediente_nro}, ${expediente_year},  ${expediente_tomo}, ${entidad_id},  ${resultado_id}, '${expediente_caratula}', ${
            expediente_fecha_entrada
              ? "'" + expediente_fecha_entrada + "'"
              : null
          }, ${
            expediente_observacion ? "'" + expediente_observacion + "'" : null
          }) returning Expediente_nro`
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

Expediente.prototype.updateExpediente = async function ({
  nro,
  year,
  tomo,
  entidad
}) {
  const {
    expediente_caratula,
    expediente_fecha_entrada,
    expediente_observacion,
    resultado_id
  } = this.data
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        let resultado = await pool.query(`
        UPDATE Expediente
        SET expediente_caratula = '${expediente_caratula}',
        resultado_id = ${resultado_id},
        expediente_fecha_entrada=${
          expediente_fecha_entrada ? "'" + expediente_fecha_entrada + "'" : null
        }, expediente_observacion=${
          expediente_observacion ? "'" + expediente_observacion + "'" : null
        }
        WHERE entidad_id = ${entidad} AND expediente_nro = ${nro} AND expediente_year = ${year} AND expediente_tomo = ${tomo} returning Expediente_nro`)
        resolve(resultado)
      } catch (error) {
        console.log(error)
      }
    } else {
      reject(this.errors)
    }
  })
}

Expediente.deleteExpediente = function ({ nro, year, tomo, entidad }) {
  return new Promise(async (resolve, reject) => {
    try {
      let respuesta = await pool.query(
        `DELETE FROM Expediente WHERE entidad_id = ${entidad} AND expediente_nro = ${nro} AND expediente_year = ${year} AND expediente_tomo = ${tomo} returning Expediente_nro`
      )
      resolve(respuesta)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = Expediente
