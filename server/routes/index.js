const { ResData } = require('../util')

module.exports = (router, app) => {
  // 检测登录
  app.use(async function(ctx, next) {
    if (ctx.path.indexOf('login')==-1 || ctx.path.indexOf('register')==-1) {
      await next();
    }else {
      if(!ctx.session.user) {
        ctx.ok(new ResData(0, '未登录', null))
      }
    }
  })

  // router.prefix('/czs')
  router.use('/user', require('./user'));
  router.use('/album', require('./album'))
  router.use('/file', require('./file'))
}
