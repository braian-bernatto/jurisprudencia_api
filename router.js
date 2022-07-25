const apiRouter = require('express').Router()
const cors = require('cors')

// habilitando cors
const opcionesCors = {
  origin: process.env.FRONTEND_URL
}
apiRouter.use(cors(opcionesCors))

apiRouter.get('/', (req, res) =>
  res.json('Your backend API is running successfully!')
)

module.exports = apiRouter
