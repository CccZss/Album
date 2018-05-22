<template>
  <div class="wrap" :class="type" v-if="!isRemove">
    <div class="img-box" @click="showImgHandel">
      <img :src="imgUrl" alt="">
    </div>
    <div>
      <input class="input" type="text" :value="imgUrl" ref="inputEle" @mouseover="overHandel"/>
      <span v-if="type==='big'">
        <Button class="copy-bt" @click="copyHandel">复制</Button>
        <Button class="open-bt" @click="openHandel">打开</Button>
        <Button class="delete-bt" icon="android-delete" @click="deleteHandel"></Button>
      </span>
      <span class="smail" v-else>
        <Button class="copy-bt" icon="ios-copy-outline" @click="copyHandel"></Button>
        <Button class="open-bt" icon="ios-redo-outline" @click="openHandel"></Button>
        <Button class="delete-bt" icon="android-delete" @click="deleteHandel"></Button>
      </span>
    </div>
  </div>
</template>

<script>
import { host } from '@/utils/interaction'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      isRemove: false
    }
  },
  props: {
    type: {
      type: String,
      default: 'big'
    },
    index: {
      type: Number,
      default: 0
    },
    fileInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    imgUrl (state) {
      return host + state.fileInfo.url
    }
  },
  methods: {
    ...mapActions({
      deleteFile: 'album/deleteFile'
    }),
    overHandel () {
      let inputEle = this.$refs.inputEle
      inputEle.select()
    },
    copyHandel () {
      let inputEle = this.$refs.inputEle
      inputEle.select()
      document.execCommand('Copy')
      this.$Message.success('已复制')
    },
    openHandel () {
      window.open(host + this.fileInfo.url)
    },
    deleteHandel () {
      this.deleteFile({
        fileId: this.fileInfo.fileId
      }).then(data => {
        if (data.state) {
          this.isRemove = true
          this.$Message.success(data.info)
        } else {
          this.$Message.error(data.info)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    showImgHandel () {
      if (this.type === 'smail') {
        this.$router.push({
          name: 'showphoto',
          params: {
            index: this.index
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.wrap {
  display: inline-block;
  text-align: center;
  padding: 5px 0;
}
.wrap.smail {
  width: 220px;
}
.img-box {
  margin: auto;
  overflow: hidden;
  margin-bottom: 10px;
  box-shadow: 0 0 2px 1px #e4e4e4;
  cursor: pointer;
}
.wrap.big .img-box{
  width: 600px;
  max-height: 250px;
  overflow: hidden;
}
.wrap.smail .img-box {
  width: 96%;
  height: 150px;
  background-color: white;
}
img {
  width: 100%;
}
.input {
  height: 32px;
  vertical-align: middle;
  border-radius: 4px;
  border: 1px solid #c7c4c4;
}
.wrap.big .input {
  width: 60%;
}
.wrap.smail .input {
  width: 45%;
}
.copy-bt {
  margin-left: -5px;
}
.smail button{
  margin-left: -5px;
}
</style>
