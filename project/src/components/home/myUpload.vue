<template>
  <div class="wrap">
    <ul class="menu">
      <li @click="addAlbumHandel"><Icon type="ios-folder"></Icon> 新建相册</li>
    </ul>
    <div class="album-wrap">
      <albumItem v-for="item in albumList"
        :key="item.albumId"
        :albumInfo="item"
      ></albumItem>
    </div>
    <Modal
        v-model="showAddAlbumModel"
        title="请输入相册名"
        @on-ok="ok">
        <Input v-model="albumName"/>
    </Modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import albumItem from './albumItem'

export default {
  data () {
    return {
      showAddAlbumModel: false,
      albumName: ''
    }
  },
  computed: {
    ...mapState({
      albumList: state => {
        return state.album.albumList
      }
    })
  },
  components: {
    albumItem
  },
  methods: {
    ...mapActions({
      getAllAlbum: 'album/getAllAlbum',
      addAlbum: 'album/addAlbum'
    }),
    addAlbumHandel () {
      this.showAddAlbumModel = true
    },
    ok () {
      this.addAlbum({
        albumName: this.albumName
      }).then(data => {
        if (data.state) {
          this.albumName = ''
          this.$Message.success(data.info)
        } else {
          this.$Message.error(data.info)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getAllAlbum().then(data => {
      if (!data.state) {
        this.$Message.error(data.info)
        this.$router.push({
          name: 'login'
        })
      }
    }).catch(err => {
      console.log(err)
    })
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
  color: #777;
  font-size: 13px;
  cursor: pointer;
  line-height: 50px;
  display: inline-block;
}
.album-wrap {
  padding: 40px 80px;
}
</style>
