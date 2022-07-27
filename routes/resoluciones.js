const apiRouter = require('express').Router()
const { check } = require('express-validator')
const {
  apiGetResoluciones,
  apiGetResolucionById,
  apiAddResolucion,
  apiUpdateResolucion,
  apiDeleteResolucion
} = require('../controllers/resolucionController')
const auth = require('../middlewares/auth')

apiRouter.get('/', apiGetResoluciones)
apiRouter.get(
  '/:nro/:year/:tipo/:expediente_nro/:expediente_year/:tomo/:entidad',
  apiGetResolucionById
)
apiRouter.post(
  '/',
  auth,
  [
    check('resolucion_nro', 'El número de resolución es obligatorio')
      .not()
      .isEmpty()
      .isInt()
      .withMessage('El número de resolución debe ser un integer')
      .toInt(),

    check('resolucion_year', 'El año de resolución es obligatorio')
      .not()
      .isEmpty()
      .isInt()
      .withMessage('El año de resolución debe ser un integer')
      .toInt(),

    check('tipo_resolucion_id', 'El tipo de resolución es obligatorio')
      .not()
      .isEmpty()
      .isInt()
      .withMessage('El tipo de resolución debe ser un integer')
      .toInt(),

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

    check('resolucion_fecha')
      .isDate()
      .withMessage('La fecha debe ser un string')
      .optional({ nullable: true, checkFalsy: true }),

    check('resolucion_accion_resuelta')
      .isString()
      .withMessage('La acción debe ser un string')
      .toUpperCase()
      .optional({ nullable: true, checkFalsy: true }),

    check('resolucion_folio_nro')
      .isString()
      .withMessage('El número de folio debe ser un string')
      .toUpperCase()
      .optional({ nullable: true, checkFalsy: true }),

    check('resolucion_url')
      .isString()
      .withMessage('La URL debe ser un string')
      .toUpperCase()
      .optional({ nullable: true, checkFalsy: true })
  ],
  apiAddResolucion
)

apiRouter.put(
  '/:nro/:year/:tipo/:expediente_nro/:expediente_year/:tomo/:entidad',
  auth,
  [
    check('resolucion_fecha')
      .isDate()
      .withMessage('La fecha debe ser un string')
      .optional({ nullable: true, checkFalsy: true }),

    check('resolucion_accion_resuelta')
      .isString()
      .withMessage('La acción debe ser un string')
      .toUpperCase()
      .optional({ nullable: true, checkFalsy: true }),

    check('resolucion_folio_nro')
      .isString()
      .withMessage('El número de folio debe ser un string')
      .toUpperCase()
      .optional({ nullable: true, checkFalsy: true }),

    check('resolucion_url')
      .isString()
      .withMessage('La URL debe ser un string')
      .toUpperCase()
      .optional({ nullable: true, checkFalsy: true })
  ],
  apiUpdateResolucion
)

apiRouter.delete(
  '/:nro/:year/:tipo/:expediente_nro/:expediente_year/:tomo/:entidad',
  auth,
  apiDeleteResolucion
)

module.exports = apiRouter
