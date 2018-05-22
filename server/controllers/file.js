const fileDao = require('../proxy/fileDao');
const { ResData, createRandomId, mkdirsSync } = require('../util')
const fs = require('fs');
const path = require('path');

async function uploadFiles(ctx) {
  const userId = ctx.session.user.userId
  const albumId = ctx.request.body.fields.albumId;
  const relateURL = '../public' + '/' + userId;
  const uploadURL = path.join(__dirname, relateURL)

  function uploadFile(file) {
    let fileName = createRandomId() + '.' + file.name.split('.')[1]
    try {
      let reader = fs.createReadStream(file.path);
      if (!fs.existsSync(uploadURL)) {
        mkdirsSync(uploadURL)
      }
      let stream = fs.createWriteStream(path.join(uploadURL , fileName));
      reader.pipe(stream);
      fs.unlink(file.path);
    }catch(err) {
      ctx.send(500, err)
    }
    return {
      albumId: albumId, 
      fileName: fileName.split('.')[0], 
      fileType: fileName.split('.')[1], 
      fileSize: file.size, 
      url: '/' + userId + '/' + fileName
    }
  }

  let resDate = [];
  
  if(Object.prototype.toString.call(ctx.request.body.files.file) === "[object Object]") {
    let data = uploadFile(ctx.request.body.files.file);
    let [result] = await fileDao.addFile(data);
    data.fileId = result.insertId;
    resDate.push(data)
  }else {
    let files = ctx.request.body.files.file
    for(let i=0, len=files.length; i<len; i++) {
      let data = uploadFile(files[i]);
      let [result] = await fileDao.addFile(data);
      data.fileId = result.insertId;
      resDate.push(data)
    }
  }
  ctx.ok(new ResData(1, '上传成功', resDate))
}

async function deleteFile(ctx) {
  const data = ctx.request.body;
  const userId = ctx.session.user.userId
  const relateURL = '../public' + '/' + userId;
  const deleteURL = path.join(__dirname, relateURL)
  let [rows] = await fileDao.deleteFile(data)
  if (!rows || rows.length <= 0) {
    ctx.ok(new ResData(0, '删除失败', null))
  } else {
    let fileURL = path.join(deleteURL, rows.fileName + '.' +rows.fileType);
    console.log(fileURL)
    fs.unlinkSync(fileURL)
    ctx.ok(new ResData(1, '删除成功', ctx.request.body))
  }
}

async function allFiles(ctx) {
  var data = Object.assign({}, ctx.session.user, ctx.request.body);
  let [rows] = await fileDao.getAllFile(data);
  if (!rows) {
    ctx.ok(new ResData(0, '获取失败', null))
  } else {
    ctx.ok(new ResData(1, '获取成功', rows))
  }
}

module.exports = {
  uploadFiles,
  deleteFile,
  allFiles
}