const apiRouter = require('express').Router()
const { check } = require('express-validator')
const {
  apiGetResultados,
  apiGetResultadoById,
  apiAddResultado,
  apiUpdateResultado,
  apiDeleteResultado
} = require('../controllers/resultadoController')
const auth = require('../middlewares/auth')

apiRouter.get('/', apiGetResultados)
apiRouter.get('/:id', apiGetResultadoById)
apiRouter.post(
  '/',
  auth,
  [
    check('resultado_descri', 'El nombre es obligatorio')
      .not()
      .isEmpty()
      .isString()
      .withMessage('El nombre del Resultado debe ser un string')
      .toUpperCase()
  ],
  apiAddResultado
)
apiRouter.put(
  '/:id',
  auth,
  [
    check('resultado_descri', 'El nombre es obligatorio')
      .not()
      .isEmpty()
      .isString()
      .withMessage('El nombre del Resultado debe ser un string')
      .toUpperCase()
  ],
  apiUpdateResultado
)

apiRouter.delete('/:id', auth, apiDeleteResultado)

module.exports = apiRouter
