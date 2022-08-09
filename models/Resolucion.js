const pool = require('../db')
const pgp = require('pg-promise')({ capSQL: true })
const Resolucion = function (data) {
  this.data = data
  this.errors = []
}

Resolucion.allResoluciones = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      pool.task(async t => {
        let resultado = await t.query(
          `SELECT * FROM RESOLUCION
        NATURAL JOIN ENTIDAD
        NATURAL JOIN RESULTADO
        NATURAL JOIN TIPO_RESOLUCION
        NATURAL JOIN SECRETARIA
        NATURAL JOIN MATERIA
        NATURAL JOIN EXPEDIENTE ORDER BY 1 DESC`
        )

        if (resultado.length) {
          let resultadoV2 = await Promise.all(
            resultado.map(async res => {
              let personas = await t.query(
                `SELECT 
                PERSONA_ID,
                PERSONA_CI,
                PERSONA_NOMBRE,
                PERSONA_APELLIDO,
                PERSONA_TELEFONO,
                PERSONA_CORREO,
                CARGO_ID,
                RESOLUCION_DETALLE_PREOPINANTE,
                RESOLUCION_DETALLE_OBSERVACION
                FROM RESOLUCION
                NATURAL JOIN RESOLUCION_DETALLE
                NATURAL JOIN PERSONA
                WHERE 
                tipo_resolucion_id = ${res.tipo_resolucion_id} AND 
                resolucion_year = ${res.resolucion_year} AND 
                resolucion_nro = '${res.resolucion_nro}' AND 
                entidad_id = ${res.entidad_id} AND 
                expediente_nro = ${res.expediente_nro} AND 
                expediente_year = ${res.expediente_year} AND 
                expediente_tomo = ${res.expediente_tomo}`
              )

              res.personas = personas

              let obj = personas.find(
                item => item.resolucion_detalle_preopinante === true
              )
              let index = personas.indexOf(obj)

              res.preopinante = `${personas[index].persona_nombre} ${personas[index].persona_apellido}`

              return await res
            })
          )

          let datos = new Resolucion(resultadoV2)
          resolve(datos)
        } else {
          reject()
        }
      })
    } catch (error) {
      console.log(error)
    }
  })
}

Resolucion.resolucionBySearch = async function ({
  text,
  resNro,
  resYear,
  resTipo
}) {
  return new Promise(async (resolve, reject) => {
    try {
      pool.task(async t => {
        let resultado = await t.query(
          `SELECT * FROM RESOLUCION
        NATURAL JOIN ENTIDAD
        NATURAL JOIN RESULTADO
        NATURAL JOIN TIPO_RESOLUCION
        NATURAL JOIN SECRETARIA
        NATURAL JOIN MATERIA
        NATURAL JOIN EXPEDIENTE
        WHERE

        expediente_nro::text || ' ' || 
        expediente_year::text || ' ' || 
        resolucion_accion_resuelta || ' ' || 
        entidad_nombre || ' ' || 
        resultado_descri || ' ' || 
        expediente_caratula || ' ' || 
        expediente_observacion

        ilike '%${text ? text : ''}%' 
        
        ${resNro ? `AND resolucion_nro = '${resNro}'` : ''} 
        ${resYear ? `AND resolucion_year = ${resYear}` : ''} 
        ${resTipo ? `AND tipo_resolucion_id = ${resTipo}` : ''} 

        ORDER BY 1 DESC`
        )

        if (resultado.length) {
          let resultadoV2 = await Promise.all(
            resultado.map(async res => {
              let personas = await t.query(
                `SELECT 
                PERSONA_ID,
                PERSONA_CI,
                PERSONA_NOMBRE,
                PERSONA_APELLIDO,
                PERSONA_TELEFONO,
                PERSONA_CORREO,
                CARGO_ID,
                RESOLUCION_DETALLE_PREOPINANTE,
                RESOLUCION_DETALLE_OBSERVACION
                FROM RESOLUCION
                NATURAL JOIN RESOLUCION_DETALLE
                NATURAL JOIN PERSONA
                WHERE 
                tipo_resolucion_id = ${res.tipo_resolucion_id} AND 
                resolucion_year = ${res.resolucion_year} AND 
                resolucion_nro = '${res.resolucion_nro}' AND 
                entidad_id = ${res.entidad_id} AND 
                expediente_nro = ${res.expediente_nro} AND 
                expediente_year = ${res.expediente_year} AND 
                expediente_tomo = ${res.expediente_tomo}`
              )

              res.personas = personas

              let obj = personas.find(
                item => item.resolucion_detalle_preopinante === true
              )
              let index = personas.indexOf(obj)

              res.preopinante = `${personas[index].persona_nombre} ${personas[index].persona_apellido}`

              return await res
            })
          )

          let datos = new Resolucion(resultadoV2)
          resolve(datos)
        } else {
          reject()
        }
      })
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
      pool.task(async t => {
        let resultado = await t.query(
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

        let personas = await t.query(
          `SELECT 
          PERSONA_ID,
          PERSONA_CI,
          PERSONA_NOMBRE,
          PERSONA_APELLIDO,
          PERSONA_TELEFONO,
          PERSONA_CORREO,
          CARGO_ID,
          RESOLUCION_DETALLE_PREOPINANTE,
          RESOLUCION_DETALLE_OBSERVACION
          FROM RESOLUCION
          NATURAL JOIN RESOLUCION_DETALLE
          NATURAL JOIN PERSONA
          WHERE         
          tipo_resolucion_id = ${tipo} AND 
          resolucion_year = ${year} AND
          resolucion_nro = '${nro}' AND 
          entidad_id = ${entidad} AND 
          expediente_nro = ${expediente_nro} AND 
          expediente_year = ${expediente_year} AND 
          expediente_tomo = ${tomo}`
        )

        resultado[0].personas = personas

        if (resultado.length) {
          let datos = new Resolucion(resultado)
          resolve(datos)
        } else {
          reject()
        }
      })
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
    resolucion_url,
    personas
  } = this.data

  // only if there are no errors proceedo to save into the database
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        pool.task(async t => {
          let resultado = await t.query(
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

          if (Array.isArray(personas)) {
            const cs = new pgp.helpers.ColumnSet(
              [
                'resolucion_nro',
                'resolucion_year',
                'tipo_resolucion_id',
                'expediente_nro',
                'expediente_year',
                'expediente_tomo',
                'entidad_id',
                'persona_id',
                'cargo_id',
                'resolucion_detalle_preopinante',
                'resolucion_detalle_observacion'
              ],
              {
                table: 'resolucion_detalle'
              }
            )

            // data input values:
            const values = personas.map(persona => {
              const personaObj = {
                resolucion_nro: resolucion_nro,
                resolucion_year: resolucion_year,
                tipo_resolucion_id: tipo_resolucion_id,
                expediente_nro: expediente_nro,
                expediente_year: expediente_year,
                expediente_tomo: expediente_tomo,
                entidad_id: entidad_id,
                persona_id: persona.persona_id,
                cargo_id: persona.cargo_id,
                resolucion_detalle_preopinante: persona.preopinante,
                resolucion_detalle_observacion: persona.observacion
              }
              return personaObj
            })

            // generating a multi-row insert query:
            const query = pgp.helpers.insert(values, cs)

            // executing the query:
            await t.none(query)
          }
          resolve(resultado)
        })
      } catch (error) {
        this.errors.push('Please try again later...')
        console.log(error.message)
        reject(this.errors)
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
    resolucion_url,
    personas,
    eliminadosArray
  } = this.data
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        pool.task(async t => {
          let resultado = await t.query(`
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

          if (Array.isArray(personas)) {
            const csUpdate = new pgp.helpers.ColumnSet(
              [
                'persona_id',
                'cargo_id',
                'resolucion_detalle_preopinante',
                'resolucion_detalle_observacion'
              ],
              {
                table: 'resolucion_detalle'
              }
            )

            // si se agregan nuevos lotes al contrato se insertan
            const csInsert = new pgp.helpers.ColumnSet(
              [
                'resolucion_nro',
                'resolucion_year',
                'tipo_resolucion_id',
                'expediente_nro',
                'expediente_year',
                'expediente_tomo',
                'entidad_id',
                'persona_id',
                'cargo_id',
                'resolucion_detalle_preopinante',
                'resolucion_detalle_observacion'
              ],
              {
                table: 'resolucion_detalle'
              }
            )

            // data input values:
            let personaObj
            const values = personas.map(persona => {
              personaObj = {
                resolucion_nro: nro,
                resolucion_year: year,
                tipo_resolucion_id: tipo,
                expediente_nro: expediente_nro,
                expediente_year: expediente_year,
                expediente_tomo: tomo,
                entidad_id: entidad,
                persona_id: persona.persona_id,
                cargo_id: persona.cargo_id,
                resolucion_detalle_preopinante: persona.preopinante,
                resolucion_detalle_observacion: persona.observacion
              }
              persona.hasOwnProperty('new')
                ? (personaObj.new = true)
                : personaObj
              return personaObj
            })

            const newPersonas = values.filter(persona =>
              persona.hasOwnProperty('new')
            )
            const resolucionActualizar = values.filter(
              lote => !lote.hasOwnProperty('new')
            )

            const condition = pgp.as.format(
              `WHERE         
              t.tipo_resolucion_id = ${tipo} AND 
              t.resolucion_year = ${year} AND
              t.resolucion_nro = '${nro}' AND 
              t.entidad_id = ${entidad} AND 
              t.expediente_nro = ${expediente_nro} AND t.expediente_year = ${expediente_year}AND 
              t.expediente_tomo = ${tomo} AND 
              t.persona_id = v.persona_id`,
              personaObj
            )

            // si se agregaron nuevos datos se insertan en la bd
            if (newPersonas.length > 0) {
              // generating a multi-row insert query:
              const queryInsert = pgp.helpers.insert(newPersonas, csInsert)
              // executing the query:
              await t.none(queryInsert)
            }

            // generating a multi-row insert query:
            if (resolucionActualizar.length > 0) {
              const queryUpdate =
                pgp.helpers.update(resolucionActualizar, csUpdate) + condition
              // executing the query:
              await t.none(queryUpdate)
            }

            //si se eliminan datos
            if (eliminadosArray.length > 0) {
              const ids = eliminadosArray.map(persona => {
                return persona.persona_id
              })
              await t.none(
                `delete from resolucion_detalle 
                where
                tipo_resolucion_id = ${tipo} AND 
                resolucion_year = ${year} AND
                resolucion_nro = '${nro}' AND 
                entidad_id = ${entidad} AND 
                expediente_nro = ${expediente_nro} AND expediente_year = ${expediente_year}AND 
                expediente_tomo = ${tomo} AND 
                persona_id in ($1:list)`,
                [ids]
              )
            }
          }

          resolve(resultado)
        })
      } catch (error) {
        this.errors.push('Please try again later...')
        console.log(error.message)
        reject(this.errors)
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
      pool.task(async t => {
        await t.query(
          `DELETE FROM resolucion_detalle 
                  WHERE         
                  tipo_resolucion_id = ${tipo} AND resolucion_year = ${year} AND
                  resolucion_nro = '${nro}' AND 
                  entidad_id = ${entidad} AND 
                  expediente_nro = ${expediente_nro} AND expediente_year = ${expediente_year} AND expediente_tomo = ${tomo}`
        )

        await t.query(
          `DELETE FROM Resolucion 
          WHERE         
          tipo_resolucion_id = ${tipo} AND resolucion_year = ${year} AND
          resolucion_nro = '${nro}' AND 
          entidad_id = ${entidad} AND 
          expediente_nro = ${expediente_nro} AND expediente_year = ${expediente_year} AND expediente_tomo = ${tomo}`
        )

        resolve({ success: true })
      })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = Resolucion
