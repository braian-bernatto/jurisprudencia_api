const pool = require('../db')

const Resolucion = function (data) {
  this.data = data
  this.errors = []
}

Resolucion.allResoluciones = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      let resultado = await pool.query(
        `SELECT * FROM RESOLUCION
        NATURAL JOIN ENTIDAD
        NATURAL JOIN RESULTADO
        NATURAL JOIN TIPO_RESOLUCION
        NATURAL JOIN EXPEDIENTE ORDER BY 1 DESC`
      )

      if (resultado.length) {
        let datos = new Resolucion(resultado)
        resolve(datos)
      } else {
        reject()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

Resolucion.resolucionById = async function ({
  nro,
  year,
  tipo,
  expediente_nro,
  expediente_year,
  tomo,
  entidad
}) {
  return new Promise(async (resolve, reject) => {
    try {
      let resultado = await pool.query(
        `SELECT * FROM RESOLUCION
        NATURAL JOIN ENTIDAD
        NATURAL JOIN RESULTADO
        NATURAL JOIN TIPO_RESOLUCION
        NATURAL JOIN EXPEDIENTE
        WHERE         
        tipo_resolucion_id = ${tipo} AND resolucion_year = ${year} AND
        resolucion_nro = '${nro}' AND 
        entidad_id = ${entidad} AND 
        expediente_nro = ${expediente_nro} AND expediente_year = ${expediente_year} AND expediente_tomo = ${tomo}`
      )

      if (resultado.length) {
        let datos = new Resolucion(resultado)
        resolve(datos)
      } else {
        reject()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

Resolucion.prototype.addResolucion = async function () {
  const {
    resolucion_nro,
    resolucion_year,
    tipo_resolucion_id,
    expediente_nro,
    expediente_year,
    expediente_tomo,
    entidad_id,
    resolucion_fecha,
    resolucion_accion_resuelta,
    resolucion_folio_nro,
    resolucion_url
  } = this.data

  // only if there are no errors proceedo to save into the database
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        let resultado = await pool.query(
          `INSERT INTO Resolucion(
            resolucion_nro,
            resolucion_year,
            tipo_resolucion_id,
            expediente_nro,
            expediente_year,
            expediente_tomo,
            entidad_id,
            resolucion_fecha,
            resolucion_accion_resuelta,
            resolucion_folio_nro,
            resolucion_url
            )
          VALUES (
            ${resolucion_nro}, 
            ${resolucion_year}, 
            ${tipo_resolucion_id}, 
            ${expediente_nro},  
            ${expediente_year}, 
            ${expediente_tomo}, 
            ${entidad_id}, 
            ${resolucion_fecha ? "'" + resolucion_fecha + "'" : null}, 
            ${
              resolucion_accion_resuelta
                ? "'" + resolucion_accion_resuelta + "'"
                : null
            }, 
            ${resolucion_folio_nro ? "'" + resolucion_folio_nro + "'" : null}, 
            ${resolucion_url ? "'" + resolucion_url + "'" : null}
          ) returning resolucion_nro`
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

Resolucion.prototype.updateResolucion = async function ({
  nro,
  year,
  tipo,
  expediente_nro,
  expediente_year,
  tomo,
  entidad
}) {
  const {
    resolucion_fecha,
    resolucion_accion_resuelta,
    resolucion_folio_nro,
    resolucion_url
  } = this.data
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        let resultado = await pool.query(`
        UPDATE Resolucion
        SET 
        resolucion_fecha=${
          resolucion_fecha ? "'" + resolucion_fecha + "'" : null
        }, 
        resolucion_accion_resuelta=${
          resolucion_accion_resuelta
            ? "'" + resolucion_accion_resuelta + "'"
            : null
        },
        resolucion_folio_nro=${
          resolucion_folio_nro ? "'" + resolucion_folio_nro + "'" : null
        },
        resolucion_url=${resolucion_url ? "'" + resolucion_url + "'" : null}

        WHERE         
        tipo_resolucion_id = ${tipo} AND resolucion_year = ${year} AND
        resolucion_nro = '${nro}' AND 
        entidad_id = ${entidad} AND 
        expediente_nro = ${expediente_nro} AND expediente_year = ${expediente_year} AND expediente_tomo = ${tomo} 
        returning resolucion_nro`)

        resolve(resultado)
      } catch (error) {
        console.log(error)
      }
    } else {
      reject(this.errors)
    }
  })
}

Resolucion.deleteResolucion = function ({
  nro,
  year,
  tipo,
  expediente_nro,
  expediente_year,
  tomo,
  entidad
}) {
  return new Promise(async (resolve, reject) => {
    try {
      let respuesta = await pool.query(
        `DELETE FROM Resolucion 
          WHERE         
          tipo_resolucion_id = ${tipo} AND resolucion_year = ${year} AND
          resolucion_nro = '${nro}' AND 
          entidad_id = ${entidad} AND 
          expediente_nro = ${expediente_nro} AND expediente_year = ${expediente_year} AND expediente_tomo = ${tomo} 
          returning resolucion_nro`
      )
      resolve(respuesta)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = Resolucion
