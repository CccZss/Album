const Router = require('koa-router')
const router = new Router()
const album = require('../controllers/album')

router.post('/add', album.addAlbum)
router.post('/update', album.updateAlbum)
router.post('/delete', album.deleteAlbum)
router.get('/all', album.allAlbums)

module.exports = router.routes()
