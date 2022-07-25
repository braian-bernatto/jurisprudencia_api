const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', require('./router'))
app.use('/entidades', require('./routes/entidades'))
app.use('/upload', require('./routes/upload'))

const server = require('http').createServer(app)

app.listen(process.env.PORT, function () {
  console.log(`Server is running on port ${process.env.PORT}`)
})

module.exports = server
