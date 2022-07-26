const apiRouter = require('express').Router()
const { check } = require('express-validator')
const {
  apiGetTipoResoluciones,
  apiGetTipoResolucionById,
  apiAddTipoResolucion,
  apiUpdateTipoResolucion,
  apiDeleteTipoResolucion
} = require('../controllers/tipoResolucionController')
const auth = require('../middlewares/auth')

apiRouter.get('/', apiGetTipoResoluciones)
apiRouter.get('/:id', apiGetTipoResolucionById)
apiRouter.post(
  '/',
  auth,
  [
    check('tipo_resolucion_descri', 'El nombre es obligatorio')
      .not()
      .isEmpty()
      .isString()
      .withMessage('El nombre del Tipo Resolución debe ser un string')
      .toUpperCase()
  ],
  apiAddTipoResolucion
)
apiRouter.put(
  '/:id',
  auth,
  [
    check('tipo_resolucion_descri', 'El nombre es obligatorio')
      .not()
      .isEmpty()
      .isString()
      .withMessage('El nombre del Tipo Resolución debe ser un string')
      .toUpperCase()
  ],
  apiUpdateTipoResolucion
)

apiRouter.delete('/:id', auth, apiDeleteTipoResolucion)

module.exports = apiRouter
