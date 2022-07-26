const pool = require('../db')

const Cargo = function (data) {
  this.data = data
  this.errors = []
}

Cargo.allCargos = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      let respuesta = await pool.query(`SELECT * FROM Cargo ORDER BY 1 DESC`)

      if (respuesta.length) {
        let datos = new Cargo(respuesta)
        resolve(datos)
      } else {
        reject()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

Cargo.CargoById = async function ({ id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let respuesta = await pool.query(
        `SELECT * FROM Cargo WHERE Cargo_ID = ${id}`
      )

      if (respuesta.length) {
        let datos = new Cargo(respuesta)
        resolve(datos)
      } else {
        reject()
      }
    } catch (error) {
      console.log(error)
    }
  })
}

Cargo.prototype.addCargo = async function () {
  const { cargo_descri } = this.data

  // only if there are no errors proceedo to save into the database
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        let respuesta = await pool.query(
          `INSERT INTO Cargo(Cargo_descri) VALUES ('${cargo_descri}') returning Cargo_id`
        )
        resolve(respuesta)
      } catch (error) {
        console.log(error)
      }
    } else {
      reject(this.errors)
    }
  })
}

Cargo.prototype.updateCargo = async function ({ id }) {
  const { cargo_descri } = this.data
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      try {
        let respuesta = await pool.query(`
          UPDATE Cargo SET Cargo_descri='${cargo_descri}' WHERE Cargo_id=${id} returning Cargo_id
        `)
        resolve(respuesta)
      } catch (error) {
        console.log(error)
      }
    } else {
      reject(this.errors)
    }
  })
}

Cargo.deleteCargo = function ({ id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let respuesta = await pool.query(
        `DELETE FROM Cargo where Cargo_id=${id} returning Cargo_id`
      )
      resolve(respuesta)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = Cargo
