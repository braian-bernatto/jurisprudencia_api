const pool = require('../db')

const Miembro = function (data) {
  this.data = data
  this.errors = []
}

Miembro.allMiembros = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      let resultado = await pool.query(
        `SELECT * FROM Miembro NATURAL JOIN ENTIDAD NATURAL JOIN PERSONA NATURAL JOIN CARGO ORDER BY 1 DESC`
      )

      if (resultado.length) {
        let datos = new Miembro(resultado)
        resolve(datos)
      } else {
        reject()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

Miembro.MiembroById = async function ({ cargo, persona, entidad }) {
  return new Promise(async (resolve, reject) => {
    try {
      let resultado = await pool.query(
        `SELECT * FROM Miembro NATURAL JOIN ENTIDAD NATURAL JOIN PERSONA NATURAL JOIN CARGO WHERE cargo_id=${cargo} and persona_id=${persona} and entidad_id=${entidad}`
      )

      if (resultado.length) {
        let datos = new Miembro(resultado)
        resolve(datos)
      } else {
        reject()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

Miembro.prototype.addMiembro = async function () {
  const { cargo_id, persona_id, entidad_id } = this.data

  // only if there are no errors proceedo to save into the database
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        let resultado = await pool.query(
          `INSERT INTO Miembro(cargo_id, persona_id, entidad_id) VALUES (${cargo_id},${persona_id},${entidad_id}) returning persona_id`
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

Miembro.deleteMiembro = function ({ persona, cargo, entidad }) {
  return new Promise(async (resolve, reject) => {
    try {
      let respuesta = await pool.query(
        `DELETE FROM Miembro WHERE cargo_id=${cargo} and persona_id=${persona} and entidad_id=${entidad} returning persona_id`
      )
      resolve(respuesta)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = Miembro
