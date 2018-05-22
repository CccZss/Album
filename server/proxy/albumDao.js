// 查看是否该用户已有改相册存在
exports.hasAlbum = async function(data) {
	const conn = await require('./conn');
	const [rows] = await conn.execute(`
			SELECT * FROM album WHERE albumName=? and userId=?
	`, [data.albumName, data.userId]);
	return rows.length > 0 ? true : false;
}

exports.addAlbum = async function(data) {
	const conn = await require('./conn');
	return conn.execute(`
		INSERT INTO album (albumName, userId) VALUES (?, ?);
	`, [data.albumName, data.userId]);
}

exports.updateAlbum = async function(data) {
	const conn = await require('./conn');
	return conn.execute(`
		UPDATE album SET albumName=?, photoNumber=? WHERE albumId= ?
	`, [data.albumName, data.photoNumber, data.albumId]);
}

exports.deleteAlbum = async function(data) {
	const conn = await require('./conn');
	return conn.execute(`
		DELETE FROM album WHERE albumId=?
	`, [data.albumId]);
}

async function getAlubmPhotoNum (albumId) {
	const conn = await require('./conn');
	return conn.execute(`
		SELECT count(*) FROM file WHERE albumId=?
	`, [albumId]);
}
async function getAlbumFirstPhoto (albumId) {
	const conn = await require('./conn');
	return conn.execute(`
		SELECT * FROM file WHERE albumId=? limit 0, 1;
	`, [albumId]);
}

exports.getAllAlbum = async function(data) {
	const conn = await require('./conn');
	let result = []
	let obj = null
	let [albums] = await conn.execute(`
		SELECT * FROM album WHERE userId=?
	`, [data.userId]);
	for(let i=0; i<albums.length; i++) {
		let [row1] = await getAlubmPhotoNum(albums[i].albumId)
		let num = row1[0]['count(*)']
		let [row2] = await getAlbumFirstPhoto(albums[i].albumId)
		let fileInfo = row2[0]
		obj = {
			photoNumber: num,
			file: fileInfo
		}
		result.push(Object.assign(obj, albums[i], ))
	}
	return result
}
