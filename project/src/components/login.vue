<template>
  <center>
    <div class="form" @keyup.enter="toLogin">
      <Mytip content="邮箱" :info="emailInfo">
        <Input class="input" type="text" v-model="email" placeholder="邮箱" icon="ios-email-outline"/>
      </Mytip>
      <Mytip content="密码" :info="passwordInfo">
        <Input class="input" type="password" v-model="password" placeholder="密码" icon="ios-locked-outline"/>
      </Mytip>
      <Button class="login-bt" type="primary" long @click="toLogin" :loading="loadStatu">登陆</Button>
      <a href="#" class="forget-psw" @click="forgetPasswork">忘记密码</a>
      <a href="#" class="register" @click="toRegister">前往注册</a>
    </div>
  </center>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from "vuex";
import { IP } from "@/utils/interaction";

import Mytip from "./Mytip.vue";
export default {
  data() {
    return {
      email: "",
      password: "",
      loadStatu: false,
      emailInfo: "",
      passwordInfo: "",
      barcodeInfo: "",
      storage: window.localStorage
    };
  },
  components: {
    Mytip
  },
  computed: {
    ...mapState({
      user: state => {
        return state.user;
      }
    })
  },
  methods: {
    ...mapActions({
      login: 'user/login'
    }),
    toLogin: function() {
      if (!this.check()) return;
      this.loadStatu = true;
      this.login({
        email: this.email,
        password: this.password,
      }).then(data => {
        if (data.state) {
          this.storage.setItem('email', this.email)
          this.onSuccess(data.info);
        } else {
          this.onError(data.info);
        }
      }).catch(err => {
        this.onError(err);
      }); 
    },
    onSuccess(info) {
      this.$router.push({
        name: 'homepage',
      })
    },
    onError(err) {
      this.loadStatu = false;
      this.$Message.error(err);
    },
    toRegister() {
      this.$router.push({
        name: 'register',
      })
    },
    check() {
      if (this.email.trim() == "" || this.password.trim() == "" ) {
        this.$Message.error("请填写好所有的信息");
        return false;
      } else {
        return true;
      }
    },
    forgetPasswork() {
      if (this.email.trim() == "") {
        this.$Message.error("请填写好邮箱");
        return;
      }
    }
  },
  watch: {
    email: function(val) {
      var regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      if (val === "") {
        this.emailInfo = "请输入邮箱";
      } else if (!regEmail.test(val)) {
        this.emailInfo = "邮箱格式不对";
      } else {
        this.emailInfo = "";
      }
    }
  },
  mounted () {
    if(this.storage.email !== undefined) {
      this.email = this.storage.email
    }
  }
}
</script>

<style scoped>
.form {
  position: relative;
  top: 300px;
  width: 25%;
  min-width: 350px;
  padding: 30px;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #f4f4f4;
}
.input,
.login-bt {
  margin: 0 0 20px 0;
}
.forget-psw {
  padding-right: 10px;
  margin-right: 10px;
  border-right: 1px solid white;
  color: #a0a0a0;
}
.register {
  color: #a0a0a0;
}
.competence {
  position: absolute;
  left: 32px;
  bottom: 30px;
  color: white;
}

</style>