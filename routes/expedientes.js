const apiRouter = require('express').Router()
const { check } = require('express-validator')
const {
  apiGetExpedientes,
  apiGetExpedienteById,
  apiAddExpediente,
  apiUpdateExpediente,
  apiDeleteExpediente
} = require('../controllers/expedienteController')
const auth = require('../middlewares/auth')

apiRouter.get('/', apiGetExpedientes)
apiRouter.get('/:nro/:year/:tomo/:entidad', apiGetExpedienteById)
apiRouter.post(
  '/',
  auth,
  [
    check('expediente_nro', 'El número de expediente es obligatorio')
      .not()
      .isEmpty()
      .isInt()
      .withMessage('El número de expediente debe ser un integer')
      .toInt(),

    check('expediente_year', 'El año de expediente es obligatorio')
      .not()
      .isEmpty()
      .isInt()
      .withMessage('El año de expediente debe ser un integer')
      .toInt(),

    check('expediente_tomo', 'El número de tomo es obligatorio')
      .not()
      .isEmpty()
      .isInt()
      .withMessage('El número de expediente debe ser un integer')
      .toInt(),

    check('entidad_id', 'La entidad es obligatoria')
      .not()
      .isEmpty()
      .isInt()
      .withMessage('La entidad debe ser un integer')
      .toInt(),

    check('resultado_id', 'El resultado es obligatorio')
      .not()
      .isEmpty()
      .isInt()
      .withMessage('El resultado debe ser un integer')
      .toInt(),

    check('expediente_caratula', 'La carátula es obligatoria')
      .not()
      .isEmpty()
      .isString()
      .withMessage('La carátula debe ser un string')
      .toUpperCase(),

    check('expediente_fecha_entrada')
      .isDate()
      .withMessage('La fecha debe ser un string')
      .optional({ nullable: true, checkFalsy: true }),

    check('expediente_observacion')
      .isString()
      .withMessage('La observación debe ser un string')
      .toUpperCase()
      .optional({ nullable: true, checkFalsy: true })
  ],
  apiAddExpediente
)
apiRouter.put(
  '/:nro/:year/:tomo/:entidad',
  auth,
  [
    check('resultado_id', 'El resultado es obligatorio')
      .not()
      .isEmpty()
      .isInt()
      .withMessage('El resultado debe ser un integer')
      .toInt(),

    check('expediente_caratula', 'La carátula es obligatoria')
      .not()
      .isEmpty()
      .isString()
      .withMessage('La carátula debe ser un string')
      .toUpperCase(),

    check('expediente_fecha_entrada')
      .isDate()
      .withMessage('La fecha debe ser un string')
      .optional({ nullable: true, checkFalsy: true }),

    check('expediente_observacion')
      .isString()
      .withMessage('La observación debe ser un string')
      .toUpperCase()
      .optional({ nullable: true, checkFalsy: true })
  ],
  apiUpdateExpediente
)

apiRouter.delete('/:nro/:year/:tomo/:entidad', auth, apiDeleteExpediente)

module.exports = apiRouter
