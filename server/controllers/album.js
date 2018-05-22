const albumDao = require('../proxy/albumDao');
const { ResData } = require('../util')

async function addAlbum (ctx) {
	var data = Object.assign(ctx.request.body, ctx.session.user)
	let isExist = await albumDao.hasAlbum(data);
	if(isExist) {
		ctx.ok(new ResData(0, '相册名已被使用', null))
	}else {
		let [rows] = await albumDao.addAlbum(data);
		if(!rows) {
			ctx.ok(new ResData(0, '添加失败', null))
		}else {
			ctx.ok(new ResData(1, '添加成功', {
				albumId: rows.insertId,
				albumName: ctx.request.body.albumName,
				photoNumber: 0
			}))
		}
	}
}

async function updateAlbum (ctx) {
	var data = ctx.request.body;
	Object.assign(data, ctx.session.user)
	let isExist = await albumDao.hasAlbum(data);
	if(isExist) {
		ctx.ok(new ResData(0, '相册名已被使用', null))
	}else {
		let [rows] = await albumDao.updateAlbum(data);
		if(!rows || rows.changedRows === 0) {
			ctx.ok(new ResData(0, '更新失败', null))
		}else {
			ctx.ok(new ResData(1, '更新成功', ctx.request.body))
		}
	}
}

async function deleteAlbum(ctx) {
	var data = ctx.request.body;
	let [rows] = await albumDao.deleteAlbum(data);
	if(!rows || rows.affectedRows === 0) {
		ctx.ok(new ResData(0, '删除失败', null))
	}else {
		ctx.ok(new ResData(1, '删除成功', ctx.request.body))
	}
}

async function allAlbums(ctx) {
	var data = ctx.session.user;
	let rows = await albumDao.getAllAlbum(data);
	if(!rows) {
		ctx.ok(new ResData(0, '获取失败', null))
	}else {
		ctx.ok(new ResData(1, '获取成功', rows))
	}
}


module.exports = {
    addAlbum,
    updateAlbum,
    deleteAlbum,
    allAlbums
}