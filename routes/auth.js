const apiRouter = require('express').Router()
const {
  usuarioAutenticado,
  autenticarUsuario
} = require('../controllers/authController')
const auth = require('../middlewares/auth')
const { check } = require('express-validator')

apiRouter.post(
  '/',
  [
    check('user', 'El usuario es obligatorio')
      .not()
      .isEmpty()
      .isString()
      .withMessage('El nombre de usuario debe ser un string'),
    check('password', 'El password es obligatorio').not().isEmpty()
  ],
  autenticarUsuario
)

apiRouter.get('/', auth, usuarioAutenticado)

module.exports = apiRouter
