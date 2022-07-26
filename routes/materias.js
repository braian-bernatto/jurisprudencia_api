const apiRouter = require('express').Router()
const { check } = require('express-validator')
const {
  apiGetMaterias,
  apiGetMateriaById,
  apiAddMateria,
  apiUpdateMateria,
  apiDeleteMateria
} = require('../controllers/materiaController')
const auth = require('../middlewares/auth')

apiRouter.get('/', apiGetMaterias)
apiRouter.get('/:id', apiGetMateriaById)
apiRouter.post(
  '/',
  auth,
  [
    check('materia_nombre', 'El nombre es obligatorio')
      .not()
      .isEmpty()
      .isString()
      .withMessage('El nombre de la Materia debe ser un string')
      .toUpperCase()
  ],
  apiAddMateria
)
apiRouter.put(
  '/:id',
  auth,
  [
    check('materia_nombre', 'El nombre es obligatorio')
      .not()
      .isEmpty()
      .isString()
      .withMessage('El nombre de la Materia debe ser un string')
      .toUpperCase()
  ],
  apiUpdateMateria
)

apiRouter.delete('/:id', auth, apiDeleteMateria)

module.exports = apiRouter
