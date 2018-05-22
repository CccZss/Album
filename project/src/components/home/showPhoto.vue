<template>
  <div class="wrap1">
    <img class="img-item" :src="url" alt="">
    <span class="tip">{{index+1}} / {{fileList.length}}</span>
    <Icon class="close-bt" type="close-round" size="20" @click="closeHandel"></Icon>
    <Icon class="download-bt" type="android-download" size="25" @click="downloadHandel"></Icon>
    <Icon class="left-bt" type="arrow-left-c" size="30" @click="leftHandel"></Icon>
    <Icon class="right-bt" type="arrow-right-c" size="30" @click="rightHandel"></Icon>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { host } from '@/utils/interaction'

export default {
  data () {
    return {
      index: 0
    }
  },
  computed: {
    ...mapState({
      fileList: state => {
        return state.album.fileList
      }
    }),
    file (state) {
      if (state.fileList[state.index]) {
        return state.fileList[state.index]
      }
    },
    url (state) {
      if (state.file) {
        return host + state.file.url
      } else {
        return ''
      }
    }
  },
  methods: {
    closeHandel () {
      this.$router.push({
        name: 'albumpage',
        params: {
          from: 'showphoto'
        }
      })
    },
    leftHandel () {
      if (this.index > 0) {
        this.index = this.index - 1
      }
    },
    rightHandel () {
      if (this.index < this.fileList.length - 1) {
        this.index = this.index + 1
      }
    },
    downloadHandel () {
      if (document.getElementById('aaaaaa')) {
        let a = document.getElementById('aaaaaa')
        a.parentNode.removeChild(a)
      }
      let aEle = document.createElement('a')
      aEle.setAttribute('download', this.file.fileName)
      aEle.setAttribute('href', this.url)
      aEle.setAttribute('id', 'aaaaaa')
      aEle.style.display = 'none'
      aEle.style.position = 'absolute'
      aEle.onclick = (event) => {
        aEle.parentNode.removeChild(aEle)
      }
      // 需要先将其插入到文档中，否则 IE10- 不能触发点击事件
      document.body.appendChild(aEle)
      aEle.click()
    }
  },
  mounted () {
    this.index = this.$route.params.index
    if (this.fileList.length === 0) {
      this.$router.push({
        name: 'albumpage',
        params: {
          from: 'showphoto'
        }
      })
    }
  }
}
</script>

<style scoped>
.wrap1 {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: black;
  color: white;
}
.tip {
  display: inline-block;
  margin: 10px;
  font-size: 16px;
}
.img-item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  user-select: none;
}
.close-bt {
  position: absolute;
  right: 20px;
  top: 20px;
  color: white;
  cursor: pointer;
  z-index: 2;
}
.download-bt {
  position: absolute;
  right: 70px;
  top: 18px;
  color: white;
  cursor: pointer;
  z-index: 2;
}
.left-bt {
  position: absolute;
  left: 20px;
  top: 50%;
  color: white;
  cursor: pointer;
  z-index: 2;
}
.right-bt {
  position: absolute;
  right: 20px;
  top: 50%;
  color: white;
  cursor: pointer;
  z-index: 2;
}
</style>
