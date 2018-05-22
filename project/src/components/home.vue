<template>
  <div class="wrap">
    <div class="mune">
      <ul>
        <li class="icon" @click="tabHandel('homepage')">简易相册</li>
        <li :class="{active: currenTab==='homepage'}" @click="tabHandel('homepage')">首页</li>
        <li :class="{active: currenTab==='myupload'}" @click="tabHandel('myupload')">我的上传</li>
      </ul>
      <ul>
        <li class="email">
          <Dropdown @on-click="accountHandel" trigger="click">
            <a href="javascript:void(0)">
                {{user.email}}
                <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem name="account">我的账号</DropdownItem>
                <DropdownItem name="exit">退出</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      currenTab: 'homepage'
    }
  },
  computed: {
    ...mapState({
      user: state => {
        return state.user
      }
    })
  },
  methods: {
    ...mapActions({
      getInfo: 'user/getInfo',
      exit: 'user/exit'
    }),
    tabHandel (tabName) {
      this.currenTab = tabName
      this.$router.push({
        name: tabName
      })
    },
    accountHandel (name) {
      if (name === 'exit') {
        this.exit().then(() => {
          this.$router.push({
            name: 'login'
          })
        })
      }
    }
  },
  mounted () {
    this.getInfo().then(data => {
      if (!data.state) {
        this.$Message.error(data.info)
        this.$router.push({
          name: 'login'
        })
      }
    }).catch(err => {
      console.log(err)
      this.$router.push({
        name: 'login'
      })
    })
  }
}
</script>

<style scoped>
.wrap {
  height: calc( 100% - 27px );
}
.mune {
  background-color: #101010;
  overflow: hidden;
  font-size: 14px;
}
.mune ul:nth-child(1) {
  float: left;
}
.mune ul:nth-child(2) {
  float: right;
  margin-right: 20px;
}
.mune .icon {
  font-size: 16px;
  color: white;
}
.mune > ul > li{
  padding: 15px;
  display: inline-block;
  color: #9d9d9d;
  cursor: pointer;
  user-select: none;
}
.mune .email a {
  color: #9d9d9d;
}
.mune li.active {
  color: #fff;
  background-color: #080808;
}
</style>
