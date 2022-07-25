const apiRouter = require('express').Router()
const fs = require('fs')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const uploadStorage = multer({ storage: storage })

apiRouter.get('/:pdf', function (req, res) {
  let tempFile = `./uploads/${req.params.pdf}.pdf`
  fs.readFile(tempFile, function (err, data) {
    res.contentType('application/pdf')
    res.send(data)
  })
})

apiRouter.post('/', uploadStorage.array('file', 10), (req, res) => {
  return res.send({ success: true })
})

module.exports = apiRouter
