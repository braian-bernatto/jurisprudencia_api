const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', require('./router'))
app.use('/auth', require('./routes/auth'))
app.use('/upload', require('./routes/upload'))
app.use('/entidades', require('./routes/entidades'))
app.use('/materias', require('./routes/materias'))
app.use('/resultados', require('./routes/resultados'))
app.use('/cargos', require('./routes/cargos'))
app.use('/personas', require('./routes/personas'))
app.use('/tipo-entidad', require('./routes/tipo-entidad'))
app.use('/tipo-resolucion', require('./routes/tipo-resolucion'))

const server = require('http').createServer(app)

app.listen(process.env.PORT, function () {
  console.log(`Server is running on port ${process.env.PORT}`)
})

module.exports = server
