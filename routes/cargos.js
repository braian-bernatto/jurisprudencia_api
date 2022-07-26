const apiRouter = require('express').Router()
const { check } = require('express-validator')
const {
  apiGetCargos,
  apiGetCargoById,
  apiAddCargo,
  apiUpdateCargo,
  apiDeleteCargo
} = require('../controllers/cargoController')
const auth = require('../middlewares/auth')

apiRouter.get('/', apiGetCargos)
apiRouter.get('/:id', apiGetCargoById)
apiRouter.post(
  '/',
  auth,
  [
    check('cargo_descri', 'El nombre es obligatorio')
      .not()
      .isEmpty()
      .isString()
      .withMessage('El nombre del Cargo debe ser un string')
      .toUpperCase()
  ],
  apiAddCargo
)
apiRouter.put(
  '/:id',
  auth,
  [
    check('cargo_descri', 'El nombre es obligatorio')
      .not()
      .isEmpty()
      .isString()
      .withMessage('El nombre del Cargo debe ser un string')
      .toUpperCase()
  ],
  apiUpdateCargo
)

apiRouter.delete('/:id', auth, apiDeleteCargo)

module.exports = apiRouter
