exports.addFile = async function(data) {
	const conn = await require('./conn');
	return conn.execute(`
        INSERT INTO file (file.albumId, file.fileName, file.fileType, file.fileSize, file.url) VALUES (?, ?, ?, ?, ?)
	`, [data.albumId, data.fileName, data.fileType, data.fileSize, data.url]);
}

exports.deleteFile = async function(data) {
	const conn = await require('./conn');
	const [result] = await conn.execute(`
		SELECT * FROM file WHERE fileId=?
	`, [data.fileId]);
	await conn.execute(`
		DELETE FROM file WHERE fileId=?
	`, [data.fileId]);

	return result;
}

exports.getAllFile = async function(data) {
	const conn = await require('./conn');
	return conn.execute(`
		SELECT * FROM file WHERE albumId=?
	`, [data.albumId]);
}

exports.getFileById = async function(data) {
	const conn = await require('./conn');
	return conn.execute(`
		SELECT * FROM file WHERE fileId=?
	`, [data.fileId]);
}