const Koa = require('koa')
const Router = require('koa-router')
const Logger = require('koa-logger')
const Cors = require('@koa/cors')
const BodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')
const Helmet = require('koa-helmet')
const respond = require('koa-respond')
const session = require('koa-session')
const serve = require('koa-static');
const path = require('path');

const app = new Koa()
const router = new Router()

// 使用 session
app.keys = ['some secret hurr']
app.use(session({}, app))

app.use(Helmet())
app.use(koaBody({ multipart: true }));
app.use(serve(path.join(__dirname, '/public')));
app.use(serve(path.join(__dirname, '/html')));

if (process.env.NODE_ENV === 'development') {
  app.use(Logger())
}

app.use(Cors())
app.use(BodyParser({
  jsonLimit: '5mb',
  strict: true,
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422)
  }
}))

app.use(respond())

// API routes
require('./routes')(router, app)

app.use(router.routes())
app.use(router.allowedMethods())

// 404 处理
app.use(async function pageNotFound(ctx) {
  // we need to explicitly set 404 here
  // so that koa doesn't assign 200 on body=
  ctx.status = 404;

  switch (ctx.accepts('html', 'json')) {
    case 'html':
      ctx.type = 'html';
      ctx.body = '<p>Page Not Found</p>';
      break;
    case 'json':
      ctx.body = {
        message: 'Page Not Found'
      };
      break;
    default:
      ctx.type = 'text';
      ctx.body = 'Page Not Found';
  }
});

module.exports = app
