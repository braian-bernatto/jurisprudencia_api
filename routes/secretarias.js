const apiRouter = require('express').Router()
const { check } = require('express-validator')
const {
  apiGetSecretarias,
  apiGetSecretariaById,
  apiAddSecretaria,
  apiUpdateSecretaria,
  apiDeleteSecretaria
} = require('../controllers/secretariaController')
const auth = require('../middlewares/auth')

apiRouter.get('/', apiGetSecretarias)
apiRouter.get('/:entidad/:secretaria', apiGetSecretariaById)
apiRouter.post(
  '/',
  auth,
  [
    check('entidad_id', 'La entidad es obligatoria')
      .not()
      .isEmpty()
      .isInt()
      .withMessage('La entidad debe ser un integer')
      .toInt(),

    check('secretaria_nro', 'El número de secretaria es obligatorio')
      .not()
      .isEmpty()
      .isInt()
      .withMessage('El número de secretaria debe ser un integer')
      .toInt(),

    check('materia_id', 'La materia es obligatoria')
      .not()
      .isEmpty()
      .isInt()
      .withMessage('La materia debe ser un integer')
      .toInt(),

    check('secretaria_telefono')
      .isString()
      .withMessage('La cédula debe ser un string')
      .toUpperCase()
      .optional({ nullable: true, checkFalsy: true }),

    check('secretaria_horario_inicio')
      .isString()
      .withMessage('La hora de inicio debe ser un string')
      .optional({ nullable: true, checkFalsy: true }),

    check('secretaria_horario_fin')
      .isString()
      .withMessage('La hora de cierre debe ser un string')
      .toUpperCase()
      .optional({ nullable: true, checkFalsy: true })
  ],
  apiAddSecretaria
)
apiRouter.put(
  '/:entidad/:secretaria',
  auth,
  [
    check('materia_id', 'La materia es obligatoria')
      .not()
      .isEmpty()
      .isInt()
      .withMessage('La materia debe ser un integer')
      .toInt(),

    check('secretaria_telefono')
      .isString()
      .withMessage('La cédula debe ser un string')
      .toUpperCase()
      .optional({ nullable: true, checkFalsy: true }),

    check('secretaria_horario_inicio')
      .isString()
      .withMessage('La hora de inicio debe ser un string')
      .optional({ nullable: true, checkFalsy: true }),

    check('secretaria_horario_fin')
      .isString()
      .withMessage('La hora de cierre debe ser un string')
      .toUpperCase()
      .optional({ nullable: true, checkFalsy: true })
  ],
  apiUpdateSecretaria
)

apiRouter.delete('/:entidad/:secretaria', auth, apiDeleteSecretaria)

module.exports = apiRouter
