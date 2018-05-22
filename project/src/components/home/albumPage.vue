<template>
  <div class="wrap">
    <ul class="menu">
      <li @click="goBackHandel"><Icon type="chevron-left"></Icon> 返回</li>
      <li @click="uploadFileByInput"><Icon type="android-upload"></Icon> 上传</li>
      <!-- <li><Icon type="trash-a"></Icon> 批量删除</li> -->
    </ul>
    <div class="photo-wrap">
      <photo-item class="photo-item" v-for="(item, index) in fileList" :key="item.fileId"
        type="smail"
        :index=index
        :url="item.url"
        :fileInfo="item"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import photoItem from './photoItem'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      fileList: state => {
        return state.album.fileList
      },
      currentAlbumId: state => {
        return state.album.currentAlbumId
      }
    })
  },
  components: {
    photoItem
  },
  methods: {
    ...mapActions({
      getAllFile: 'album/getAllFile',
      addFiles: 'album/addFiles',
      setState: 'album/setState'
    }),
    goBackHandel () {
      this.$router.push({
        name: 'myupload'
      })
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
        formData.append('albumId', this.currentAlbumId)
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
    }
  },
  mounted () {
    if (this.$route.params.from !== 'showphoto') {
      this.setState({
        fileList: []
      })
      this.getAllFile({
        albumId: this.currentAlbumId
      }).then(data => {
        if (!data.state) {
          this.$Message.error(data.info)
          this.$router.push({
            name: 'login'
          })
        }
      }).catch(err => {
        console.log(err)
        this.$router.push({
          name: 'myupload'
        })
      })
    }
  }
}
</script>

<style scoped>
.wrap {
  background-color: #f4f4f4;
}
.menu {
  background-color: #fbfbfb;
  padding-left: 100px;
}
.menu li {
  margin: 0 30px 0 0;
  color: #777;
  font-size: 13px;
  cursor: pointer;
  line-height: 50px;
  display: inline-block;
}
.photo-wrap {
  padding: 40px 80px;
}
.photo-item {
  margin: 10px 10px;
}
</style>
