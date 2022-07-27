const apiRouter = require('express').Router()
const { check } = require('express-validator')
const {
  apiGetFuncionarios,
  apiGetFuncionarioById,
  apiAddFuncionario,
  apiUpdateFuncionario,
  apiDeleteFuncionario
} = require('../controllers/funcionarioController')
const auth = require('../middlewares/auth')

apiRouter.get('/', apiGetFuncionarios)
apiRouter.get('/:persona/:cargo', apiGetFuncionarioById)
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
    check('persona_id', 'Seleccione un funcionario')
      .not()
      .isEmpty()
      .isInt()
      .withMessage('El funcionario debe ser un integer')
      .toInt(),
    check('funcionario_activo', 'El estado es obligatorio')
      .not()
      .isEmpty()
      .isBoolean()
      .toBoolean()
  ],
  apiAddFuncionario
)
apiRouter.put(
  '/:persona/:cargo',
  auth,
  [
    check('funcionario_activo', 'El estado es obligatorio')
      .not()
      .isEmpty()
      .isBoolean()
      .toBoolean()
  ],
  apiUpdateFuncionario
)

apiRouter.delete('/:persona/:cargo', auth, apiDeleteFuncionario)

module.exports = apiRouter
