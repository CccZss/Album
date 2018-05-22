exports.login = async function(data) {
    const conn = await require('./conn');
    return conn.execute(`
        SELECT * FROM user WHERE email=? AND password=?
    `, [data.email, data.password]);
}

exports.hasUserExist = async function(data) {
    const conn = await require('./conn');
    const [rows] = await conn.execute(`
        SELECT * FROM user WHERE email=?
    `, [data.email]);
    return rows.length > 0 ? true : false;
}

exports.register = async function(data) {
    const conn = await require('./conn');
    return conn.execute(`
        INSERT INTO user (email, userName, password) VALUES (?, ?, ?);
    `, [data.email, data.userName, data.password]);
}

exports.getUesrInfo = async function(data) {
    const conn = await require('./conn');
    return conn.execute(`
        SELECT * FROM user WHERE userId=?
    `, [data.userId]);
}

