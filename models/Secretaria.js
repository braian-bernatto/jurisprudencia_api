const pool = require('../db')

const Secretaria = function (data) {
  this.data = data
  this.errors = []
}

Secretaria.allSecretarias = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      let resultado = await pool.query(
        `SELECT * FROM Secretaria NATURAL JOIN ENTIDAD NATURAL JOIN MATERIA ORDER BY 1 DESC`
      )

      if (resultado.length) {
        let datos = new Secretaria(resultado)
        resolve(datos)
      } else {
        reject()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

Secretaria.SecretariaById = async function ({ entidad, secretaria }) {
  return new Promise(async (resolve, reject) => {
    try {
      let resultado = await pool.query(
        `SELECT * FROM Secretaria NATURAL JOIN ENTIDAD NATURAL JOIN MATERIA WHERE entidad_id = ${entidad} AND secretaria_nro = ${secretaria}`
      )

      if (resultado.length) {
        let datos = new Secretaria(resultado)
        resolve(datos)
      } else {
        reject()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

Secretaria.prototype.addSecretaria = async function () {
  const {
    entidad_id,
    secretaria_nro,
    materia_id,
    secretaria_telefono,
    secretaria_horario_inicio,
    secretaria_horario_fin
  } = this.data

  // only if there are no errors proceedo to save into the database
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        let resultado = await pool.query(
          `INSERT INTO Secretaria(
            entidad_id, 
            secretaria_nro, 
            materia_id, 
            secretaria_telefono, secretaria_horario_inicio, secretaria_horario_fin)
          VALUES (${entidad_id}, ${secretaria_nro},  ${materia_id}, ${
            secretaria_telefono ? "'" + secretaria_telefono + "'" : null
          }, ${
            secretaria_horario_inicio
              ? "'" + secretaria_horario_inicio + "'"
              : null
          }, ${
            secretaria_horario_fin ? "'" + secretaria_horario_fin + "'" : null
          }) returning secretaria_nro`
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

Secretaria.prototype.updateSecretaria = async function ({
  entidad,
  secretaria
}) {
  const {
    materia_id,
    secretaria_telefono,
    secretaria_horario_inicio,
    secretaria_horario_fin
  } = this.data
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        let resultado = await pool.query(`
        UPDATE Secretaria
        SET secretaria_telefono=${
          secretaria_telefono ? "'" + secretaria_telefono + "'" : null
        },
        materia_id = ${materia_id},
        secretaria_horario_inicio=${
          secretaria_horario_inicio
            ? "'" + secretaria_horario_inicio + "'"
            : null
        },
        secretaria_horario_fin=${
          secretaria_horario_fin ? "'" + secretaria_horario_fin + "'" : null
        }
          WHERE entidad_id = ${entidad} AND secretaria_nro = ${secretaria}
          returning secretaria_nro`)
        resolve(resultado)
      } catch (error) {
        console.log(error)
      }
    } else {
      reject(this.errors)
    }
  })
}

Secretaria.deleteSecretaria = function ({ entidad, secretaria }) {
  return new Promise(async (resolve, reject) => {
    try {
      let respuesta = await pool.query(
        `DELETE FROM Secretaria WHERE entidad_id = ${entidad} AND secretaria_nro = ${secretaria} returning secretaria_nro`
      )
      resolve(respuesta)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = Secretaria
