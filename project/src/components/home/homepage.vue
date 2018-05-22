<template>
  <div class="wrap">
    <div class="upload-box" :class="{ dragenter: dragState==='dragenter'}"
      ref="uploadBox"
      @dragenter.prevent="dragenterHandel"
      @dragleave.prevent="dragleaveHandel"
      @dragover.prevent="dragoverHandel"
      @drop.prevent="dropHandel"
      @paste="pasteHandel"
    >
      <div class="video-box" v-show="showVideo">
        <Button class="camera-bt" size="large" shape="circle" icon="ios-camera-outline" @click="cameraHandel"></Button>
        <Icon class="close-bt" type="close-round" size="20" @click="closeVideo"></Icon>
        <video ref="video"></video>
      </div>
      <div class="canvas-box" v-show="showCanvas">
        <canvas ref="canvas"></canvas>
        <Button class="user-bt" type="success" @click="userCameraHandel">使用</Button>
        <Button class="reset-bt" type="success" @click="resetVideoHandel">重拍</Button>
      </div>
      <div class="album-select">
        <span>上传到相册：</span>
        <Select v-model="selectAlbumId" @on-change="albumSelectHandel" style="width: 200px" >
          <Option v-for="item in albumList" :value="item.albumId" :key="item.albumId">{{ item.albumName }}</Option>
        </Select>
      </div>
      <p class="info-1">{{tipInfo}}</p>
      <p class="info-2">或者</p>
      <Button class="button" type="success" @click="uploadFileByInput">选择文件</Button>
      <Button class="button" type="success" @click="uploadFileByVideo">直接拍照</Button>
      <Progress v-show="showProgress" :percent="progressNum" class="progress"></Progress>
    </div>
    <br/>
    <ul class="upload-file-warp">
      <li v-for="item in fileList" :key="item.fileId">
        <photo-item :fileInfo="item"/>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { host } from '@/utils/interaction'
import photoItem from './photoItem'
const tipInfos = ['截图后粘贴、拖拽图片到这里上传', '鼠标松开即开始上传']
export default {
  data () {
    return {
      tipInfo: tipInfos[0],
      dragState: 'dragleave',
      host: host,
      selectAlbumId: undefined,
      showProgress: false,
      showVideo: false,
      showCanvas: false,
      progressNum: 0,
      video: null,
      videoStream: null
    }
  },
  computed: {
    ...mapState({
      albumList: state => {
        return state.album.albumList
      },
      fileList: state => {
        return state.album.fileList
      }
    })
  },
  components: {
    photoItem
  },
  methods: {
    ...mapActions({
      getAllAlbum: 'album/getAllAlbum',
      addFiles: 'album/addFiles',
      setState: 'album/setState'
    }),
    albumSelectHandel (id) {
      this.selectAlbumId = id
      this.setState({
        fileList: []
      })
    },
    dragenterHandel (event) {
      this.dragState = 'dragenter'
      this.tipInfo = tipInfos[1]
    },
    dragleaveHandel (event) {
      this.dragState = 'dragleave'
      this.tipInfo = tipInfos[0]
    },
    dragoverHandel (event) {
    },
    dropHandel (event) {
      event.preventDefault()
      this.dragState = 'dragleave'
      this.tipInfo = tipInfos[0]
      this.uploadHandel(event.dataTransfer.files)
    },
    pasteHandel () {
      alert('aaa')
    },
    uploadFileByInput () {
      if (document.getElementById('$$$$$$$$')) {
        let input = document.getElementById('$$$$$$$$')
        input.parentNode.removeChild(input)
      }
      let inputFile = document.createElement('input')
      inputFile.setAttribute('type', 'file')
      inputFile.setAttribute('multiple', 'multiple')
      inputFile.setAttribute('id', '$$$$$$$$')
      inputFile.style.display = 'none'
      inputFile.style.position = 'absolute'
      inputFile.onchange = (event) => {
        inputFile.parentNode.removeChild(inputFile)
        let fileList = event.target.files
        this.uploadHandel(fileList)
      }
      // 需要先将其插入到文档中，否则 IE10- 不能触发点击事件
      document.body.appendChild(inputFile)
      inputFile.click()
    },
    uploadFileByVideo () {
      this.showVideo = true
      const video = this.$refs.video
      const vendorUrl = window.URL || window.webkitURL
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
      if (navigator.getUserMedia) {
        navigator.getUserMedia({
          video: true
        }, (stream) => {
          this.videoStream = stream
          video.src = vendorUrl.createObjectURL(stream)
          this.video = video
          video.play()
        }, (err) => {
          console.log(err)
        })
      }
    },
    uploadHandel (fileList) {
      if (fileList.length > 0) {
        this.showProgress = true
        let intervalId = setInterval(() => {
          if (this.progressNum < 60) {
            this.progressNum += 10
          } else {
            clearInterval(intervalId)
          }
        }, 10)
        let formData = new FormData()
        formData.append('albumId', this.selectAlbumId)
        for (var i = 0; i < fileList.length; i++) {
          if (fileList[i].type.indexOf('image') === -1) {
            this.$Message.error('文件: 【' + fileList[i].name + '】 不是图片文件！')
            continue
          }
          formData.append('file', fileList[i])
        }
        this.addFiles(formData).then(data => {
          if (data.state) {
            this.progressNum = 100
            this.$Message.success(data.info)
            setTimeout(() => {
              this.showProgress = false
            }, 500)
          } else {
            this.$$Message.error(data.info)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    closeVideo () {
      this.showVideo = false
      this.videoStream.getTracks()[0].stop()
    },
    cameraHandel () {
      this.showCanvas = true
      const canvas = this.$refs.canvas
      const context = canvas.getContext('2d')
      const width = this.video.clientWidth
      const height = this.video.clientHeight
      canvas.width = width
      canvas.height = height
      context.drawImage(this.video, 0, 0, width, height)
    },
    resetVideoHandel () {
      this.showCanvas = false
      this.showVideo = true
    },
    userCameraHandel () {
      const canvas = this.$refs.canvas
      const dataurl = canvas.toDataURL('image/png')
      let file = this.dataURLtoFile(dataurl, 'file.jpg')
      this.uploadHandel([file])
      this.showCanvas = false
      this.closeVideo()
    },
    dataURLtoFile (dataurl, filename) {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, {type: mime})
    },
    parseHandel (event) {
      let clipboardData = event.clipboardData
      let items, item, types
      if (clipboardData) {
        items = clipboardData.items
        if (!items) {
          return
        }
        item = items[0]
        types = clipboardData.types || []
        for (let i = 0; i < types.length; i++) {
          if (types[i] === 'Files') {
            item = items[i]
            break
          }
        }
        if (item && item.kind === 'file' && item.type.match(/^image\//i)) {
          this.uploadHandel([item.getAsFile()])
        }
      }
    }
  },
  mounted () {
    this.setState({
      fileList: []
    })
    this.getAllAlbum().then(data => {
      if (!data.state) {
        this.$Message.error(data.info)
        this.$router.push({
          name: 'login'
        })
      } else {
        this.selectAlbumId = this.albumList[0].albumId
      }
    }).catch(err => {
      console.log(err)
    })
  },
  destroyed () {
    document.removeEventListener('paste', this.parseHandel)
  },
  created () {
    this.$nextTick(() => {
      document.addEventListener('paste', this.parseHandel)
    })
  }
}
</script>

<style scoped>
.wrap {
  text-align: center;
  background-color: white;
}
.upload-box {
  position: relative;
  display: inline-block;
  width: 600px;
  margin-top: 100px;
  padding: 80px 0 80px;
  text-align: center;
  background-color: #f9f9f9;
  border: 2px solid rgba(0, 0, 0, 0);
  border-radius: 5px;
  user-select: none;
}
.upload-box.dragenter {
  border: 2px dashed #dbdbdb;
}
.upload-box .info-1 {
  color: #777777;
  font-size: 28px;
}
.upload-box .info-2 {
  color: #c3c3c3;
  margin: 10px 0;
}
.upload-box .button {
  font-size: 14px;
}
.album-select {
  position: absolute;
  top: -38px;
  right: 0;
}
.progress {
  position: absolute;
  left: 0;
  bottom: -30px;
}
.upload-file-warp li {
  margin-top: 10px;
}
.video-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #00000059;
}
.video-box video {
  margin-bottom: -5px;
  padding: 0;
  width: 100%;
}
.camera-bt {
  position: absolute;
  right: 10px;
  top: 50%;
  z-index: 2;
}
.close-bt {
  position: absolute;
  right: 10px;
  top: 10px;
  color: white;
  cursor: pointer;
  z-index: 2;
}
.canvas-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
}
.canvas-box button {
  margin: 0 20px;
}
</style>
