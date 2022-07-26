const pool = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

let Usuario = function (data) {
  this.data = data
}

Usuario.verficarUsuario = async function (user, password) {
  return new Promise(async (resolve, reject) => {
    try {
      let usuario = await pool.query(`
      select * from usuario natural join rol where usuario_user ilike '${user}'
      `)

      if (!usuario.length) {
        resolve({ msg: 'El usuario no existe' })
        return null
      } else {
        if (bcrypt.compareSync(password, usuario[0].usuario_password)) {
          const token = jwt.sign(
            {
              usuario: usuario[0].usuario_user,
              rol: usuario[0].rol_descri
            },
            process.env.SECRETA,
            {
              expiresIn: '48h'
            }
          )
          resolve({ token })
        } else {
          resolve({ msg: 'Password Incorrecto' })
          return null
        }
      }
    } catch (error) {
      console.log(error)
    }
  })
}

module.exports = Usuario
