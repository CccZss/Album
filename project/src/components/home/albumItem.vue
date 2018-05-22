<template>
  <div class="wrap" v-if="!isRemove">
    <img :src="url" alt="" @click="openAlbumHendel"><br/>
    <span>{{albumInfo.albumName}}</span>
    <span>({{albumInfo.photoNumber}})</span>
    <Icon class="icon" type="gear-a" size="20" @click="showMenuHandel"></Icon>
    <ul class="menu" v-show="showMenu">
      <!-- <li>重命名</li> -->
      <li @click="deleteHandel">删除</li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { host } from '@/utils/interaction'

export default {
  data () {
    return {
      isRemove: false,
      showMenu: false
    }
  },
  computed: {
    url: (state) => {
      if (state.albumInfo.file) {
        return host + state.albumInfo.file.url
      } else {
        return host + '/album-default.png'
      }
    }
  },
  props: {
    albumInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions({
      deleteAlbum: 'album/deleteAlbum',
      setState: 'album/setState'
    }),
    showMenuHandel () {
      this.showMenu = !this.showMenu
    },
    deleteHandel () {
      this.deleteAlbum({
        albumId: this.albumInfo.albumId
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
    renameHandel () {
    },
    openAlbumHendel () {
      this.setState({
        currentAlbumId: this.albumInfo.albumId
      }).then(() => {
        this.$router.push({
          name: 'albumpage'
        })
      })
    }
  }
}
</script>

<style scoped>
.wrap {
  position: relative;
  display: inline-block;
  margin: 10px 20px;
  padding: 10px;
  background-color: white;
  font-size: 16px;
}
.wrap img {
  width: 200px;
  height: 150px;
  cursor: pointer;
}
.menu {
  position: absolute;
  right: 11px;
  bottom: 32px;
  display: inline-block;
  border: 1px solid #afa9a9;
  border-radius: 3px;
  background-color: white;
  padding: 2px 0;
}
.menu li {
  list-style: none;
  width: 100px;
  text-align: center;
  line-height: 25px;
  cursor: pointer;
  font-size: 14px;
}
.menu li:hover {
  background-color: #f5f5f5;
}
.icon {
  float: right;
  cursor: pointer;
  position: relative;
  top: 3px;
}
</style>
