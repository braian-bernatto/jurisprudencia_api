const apiRouter = require('express').Router()
const cors = require('cors')
const { check } = require('express-validator')
const {
  apiGetEntidades,
  apiGetEntidadById,
  apiAddEntidad,
  apiUpdateEntidad,
  apiDeleteEntidad
} = require('./controllers/entidadController')

// habilitando cors
const opcionesCors = {
  origin: process.env.FRONTEND_URL
}
apiRouter.use(cors(opcionesCors))

apiRouter.get('/', (req, res) =>
  res.json('Your backend API is running successfully!')
)

// entidades
apiRouter.get('/entidades', apiGetEntidades)
apiRouter.get('/entidades/:id', apiGetEntidadById)
apiRouter.post(
  '/entidades',
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
  '/entidades/:id',
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

apiRouter.delete('/entidades/:id', apiDeleteEntidad)

module.exports = apiRouter
