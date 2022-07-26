const apiRouter = require('express').Router()
const { check } = require('express-validator')
const {
  apiGetPersonas,
  apiGetPersonaById,
  apiAddPersona,
  apiUpdatePersona,
  apiDeletePersona
} = require('../controllers/personaController')
const auth = require('../middlewares/auth')

apiRouter.get('/', apiGetPersonas)
apiRouter.get('/:id', apiGetPersonaById)
apiRouter.post(
  '/',
  auth,
  [
    check('persona_ci', 'La cédula es obligatoria')
      .isString()
      .withMessage('La cédula debe ser un string')
      .toUpperCase()
      .optional({ nullable: true, checkFalsy: true }),
    check('persona_nombre', 'El nombre es obligatorio')
      .not()
      .isEmpty()
      .isString()
      .withMessage('El nombre debe ser un string')
      .toUpperCase(),
    check('persona_apellido', 'El apellido es obligatorio')
      .not()
      .isEmpty()
      .isString()
      .withMessage('El apellido debe ser un string')
      .toUpperCase(),
    check('persona_telefono')
      .isString()
      .withMessage('El teléfono debe ser un string')
      .toUpperCase()
      .optional({ nullable: true, checkFalsy: true }),
    check('persona_correo')
      .isEmail()
      .withMessage('Ingresa un correo válido')
      .toLowerCase()
      .optional({ nullable: true, checkFalsy: true })
  ],
  apiAddPersona
)
apiRouter.put(
  '/:id',
  auth,
  [
    check('persona_ci', 'La cédula es obligatoria')
      .isString()
      .withMessage('La cédula debe ser un string')
      .toUpperCase()
      .optional({ nullable: true, checkFalsy: true }),
    check('persona_nombre', 'El nombre es obligatorio')
      .not()
      .isEmpty()
      .isString()
      .withMessage('El nombre debe ser un string')
      .toUpperCase(),
    check('persona_apellido', 'El apellido es obligatorio')
      .not()
      .isEmpty()
      .isString()
      .withMessage('El apellido debe ser un string')
      .toUpperCase(),
    check('persona_telefono')
      .isString()
      .withMessage('El teléfono debe ser un string')
      .toUpperCase()
      .optional({ nullable: true, checkFalsy: true }),
    check('persona_correo')
      .isEmail()
      .withMessage('Ingresa un correo válido')
      .toLowerCase()
      .optional({ nullable: true, checkFalsy: true })
  ],
  apiUpdatePersona
)

apiRouter.delete('/:id', auth, apiDeletePersona)

module.exports = apiRouter
