const pool = require('../db')

const Persona = function (data) {
  this.data = data
  this.errors = []
}

Persona.allPersonas = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      let resultado = await pool.query(`SELECT * FROM Persona ORDER BY 1 DESC`)

      if (resultado.length) {
        let datos = new Persona(resultado)
        resolve(datos)
      } else {
        reject()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

Persona.PersonaById = async function ({ id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let resultado = await pool.query(
        `SELECT * FROM Persona WHERE Persona_ID = ${id}`
      )

      if (resultado.length) {
        let datos = new Persona(resultado)
        resolve(datos)
      } else {
        reject()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

Persona.prototype.addPersona = async function () {
  const {
    persona_ci,
    persona_nombre,
    persona_apellido,
    persona_telefono,
    persona_correo
  } = this.data

  // only if there are no errors proceedo to save into the database
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        let resultado = await pool.query(
          `INSERT INTO PERSONA(
            PERSONA_CI,
            PERSONA_NOMBRE,
            PERSONA_APELLIDO,
            PERSONA_TELEFONO,
            PERSONA_CORREO)
          VALUES (${
            persona_ci ? "'" + persona_ci + "'" : null
          }, '${persona_nombre}', '${persona_apellido}', ${
            persona_telefono ? "'" + persona_telefono + "'" : null
          }, ${
            persona_correo ? "'" + persona_correo + "'" : null
          }) returning Persona_id`
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

Persona.prototype.updatePersona = async function ({ id }) {
  const {
    persona_ci,
    persona_nombre,
    persona_apellido,
    persona_telefono,
    persona_correo
  } = this.data
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        let resultado = await pool.query(`
        UPDATE PERSONA
        SET PERSONA_CI=${persona_ci ? "'" + persona_ci + "'" : null},
          PERSONA_NOMBRE = '${persona_nombre}',
          PERSONA_APELLIDO = '${persona_apellido}',
          PERSONA_TELEFONO=${
            persona_telefono ? "'" + persona_telefono + "'" : null
          },
          PERSONA_CORREO=${persona_correo ? "'" + persona_correo + "'" : null}
        WHERE Persona_id=${id} returning Persona_id
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

Persona.deletePersona = function ({ id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let respuesta = await pool.query(
        `DELETE FROM persona where persona_id=${id} returning persona_id`
      )
      resolve(respuesta)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = Persona
