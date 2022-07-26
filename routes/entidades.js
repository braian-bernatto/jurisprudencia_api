const apiRouter = require('express').Router()
const { check } = require('express-validator')
const {
  apiGetEntidades,
  apiGetEntidadById,
  apiAddEntidad,
  apiUpdateEntidad,
  apiDeleteEntidad
} = require('../controllers/entidadController')
const auth = require('../middlewares/auth')

apiRouter.get('/', apiGetEntidades)
apiRouter.get('/:id', apiGetEntidadById)
apiRouter.post(
  '/',
  auth,
  [
    check('entidad_nombre', 'El nombre es obligatorio')
      .not()
      .isEmpty()
      .isString()
      .withMessage('El nombre de la entidad debe ser un string')
      .toUpperCase(),
    check('tipo_entidad', 'El tipo de entidad es obligatorio')
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage('El tipo de entidad debe ser numérico')
      .toInt()
  ],
  apiAddEntidad
)
apiRouter.put(
  '/:id',
  auth,
  [
    check('entidad_nombre', 'El nombre es obligatorio')
      .not()
      .isEmpty()
      .isString()
      .withMessage('El nombre de la entidad debe ser un string')
      .toUpperCase(),
    check('tipo_entidad', 'El tipo de entidad es obligatorio')
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage('El tipo de entidad debe ser numérico')
      .toInt()
  ],
  apiUpdateEntidad
)

apiRouter.delete('/:id', auth, apiDeleteEntidad)

module.exports = apiRouter
