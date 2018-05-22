const Router = require('koa-router')
const router = new Router()
const file = require('../controllers/file')

router.post('/upload', file.uploadFiles)
router.post('/delete', file.deleteFile)
router.post('/all', file.allFiles)

module.exports = router.routes()
