const Router = require('koa-router')
const router = new Router()
const user = require('../controllers/user')

router.post('/login', user.login)
router.post('/register', user.register)
router.get('/exit', user.exit)
router.get('/info', user.getInfo)

module.exports = router.routes()
