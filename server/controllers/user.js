const userDao = require('../proxy/userDao')
const { ResData } = require('../util')
const albumDao = require('../proxy/albumDao')

async function register (ctx) {
  let isExist = await userDao.hasUserExist(ctx.request.body);
  if(isExist) {
    ctx.ok(new ResData(0, "Email 已注册过", null))
  }else{
    let [result] = await userDao.register(ctx.request.body);
    await albumDao.addAlbum({
      userId: result.insertId,
      albumName: '默认相册'
    })
    ctx.ok(new ResData(1, '注册成功', {
      userId: result.insertId,
      userName: ctx.request.body.userName,
      email: ctx.request.body.email
    }))
  }
}

async function login (ctx) {
  let [rows, fields] = await userDao.login(ctx.request.body);
  if(rows.length === 0) {
    ctx.ok(new ResData(0, '账号或密码错误', null))
  }else {
    ctx.session.user = {
      userId: rows[0].userId,
      userName: rows[0].userName,
      email: rows[0].email
    }
    ctx.ok(new ResData(1, '登录成功', ctx.session.user))
  }
}

function exit(ctx) {
  ctx.session.user = null;
  ctx.ok(new ResData(1, '登出成功', null))
}

async function getInfo(ctx) {
  try {
    var [rows, fields] = await userDao.getUesrInfo(ctx.session.user);
  }catch(err){
    ctx.send(500)
  }
  ctx.ok(new ResData(1, '成功', {
    userId: rows[0].userId,
    email: rows[0].email,
    userName: rows[0].userName
  }))
}

module.exports = {
  register,
  login,
  exit,
  getInfo
}
