const apiRouter = require('express').Router()
const { check } = require('express-validator')
const {
  apiGetTipoEntidades,
  apiGetTipoEntidadById,
  apiAddTipoEntidad,
  apiUpdateTipoEntidad,
  apiDeleteTipoEntidad
} = require('../controllers/tipoEntidadController')
const auth = require('../middlewares/auth')

apiRouter.get('/', apiGetTipoEntidades)
apiRouter.get('/:id', apiGetTipoEntidadById)
apiRouter.post(
  '/',
  auth,
  [
    check('tipo_entidad_descri', 'El nombre es obligatorio')
      .not()
      .isEmpty()
      .isString()
      .withMessage('El nombre del Tipo Entidad debe ser un string')
      .toUpperCase()
  ],
  apiAddTipoEntidad
)
apiRouter.put(
  '/:id',
  auth,
  [
    check('tipo_entidad_descri', 'El nombre es obligatorio')
      .not()
      .isEmpty()
      .isString()
      .withMessage('El nombre del Tipo Entidad debe ser un string')
      .toUpperCase()
  ],
  apiUpdateTipoEntidad
)

apiRouter.delete('/:id', auth, apiDeleteTipoEntidad)

module.exports = apiRouter
