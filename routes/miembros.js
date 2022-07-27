const apiRouter = require('express').Router()
const { check } = require('express-validator')
const {
  apiGetMiembros,
  apiGetMiembroById,
  apiAddMiembro,
  apiDeleteMiembro
} = require('../controllers/miembroController')
const auth = require('../middlewares/auth')

apiRouter.get('/', apiGetMiembros)
apiRouter.get('/:persona/:cargo/:entidad', apiGetMiembroById)
apiRouter.post(
  '/',
  auth,
  [
    check('cargo_id', 'El cargo es obligatorio')
      .not()
      .isEmpty()
      .isInt()
      .withMessage('El cargo debe ser un integer')
      .toInt(),
    check('persona_id', 'Seleccione un Miembro')
      .not()
      .isEmpty()
      .isInt()
      .withMessage('El Miembro debe ser un integer')
      .toInt(),
    check('entidad_id', 'Seleccione una entidad')
      .not()
      .isEmpty()
      .isInt()
      .withMessage('La entidad debe ser un integer')
      .toInt()
  ],
  apiAddMiembro
)

apiRouter.delete('/:persona/:cargo/:entidad', auth, apiDeleteMiembro)

module.exports = apiRouter
