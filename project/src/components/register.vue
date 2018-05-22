<template>
  <center>
    <div class="form" @keyup.enter="toRegister">
      <Mytip content="用户名" :info="nameInfo">
        <Input class="input" type="text" v-model="userName" placeholder="用户名" icon="ios-person-outline"/>
      </Mytip>
      <Mytip content="邮箱" :info="emailInfo">
        <Input class="input" type="text" v-model="email" placeholder="邮箱" icon="ios-email-outline"/>
      </Mytip>
      <Mytip content="密码" :info="passwordInfo">
        <Input class="input" type="password" v-model="password" placeholder="密码" icon="ios-locked-outline"/>
      </Mytip>
      <Mytip content="确认密码" :info="rePasswordInfo">
        <Input class="input" type="password" v-model="rePassword" placeholder="确认密码" icon="ios-unlocked-outline"/>
      </Mytip>
      <Button class="login-bt" type="primary" long @click="toRegister" :loading="loadStatu">注册</Button>
      <a href="#" class="a-login" @click="toLogin">前往登录</a>
    </div>
  </center>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from "vuex";
import Mytip from "./Mytip.vue";
export default {
  data() {
    return {
      userName: "",
      email: "",
      password: "",
      rePassword: "",
      loadStatu: false,
      nameInfo: "",
      emailInfo: "",
      passwordInfo: "",
      rePasswordInfo: "",
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
      register: 'user/register'
    }),
    toRegister: function() {
      if (!this.check()) return;
      this.loadStatu = true;
      this.register({
        userName: this.userName,
        email: this.email,
        password: this.password,
      }).then(data => {
          if (data.state) {
            this.onSuccess(data.info);
            this.toLogin();
          } else {
            this.onError(data.info);
          }
        })
        .catch(err => {
          this.onError(err);
        });
    },
    onSuccess(info) {
      this.$Message.success(info);
    },
    onError(err) {
      this.loadStatu = false;
      this.$Message.error(err);
    },
    toLogin() {
      this.$router.push({
        name: 'login'
      })
    },
    check() {
      if (
        this.userName.trim() == "" ||
        this.email.trim() == "" ||
        this.password.trim() == "" ||
        this.password.trim() !== this.rePassword.trim()
      ) {
        this.$Message.error("请填写好所有的信息");
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    userName: function(val) {
      if (val.trim() === "") {
        this.nameInfo = "请输入用户名";
      } else {
        this.nameInfo = "";
      }
    },
    email: function(val) {
      var regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      if (val === "") {
        this.emailInfo = "请输入邮箱";
      } else if (!regEmail.test(val)) {
        this.emailInfo = "邮箱格式不对";
      } else {
        this.emailInfo = "";
      }
    },
    password: function(val) {
      if (val === "") {
        this.passwordInfo = "请输入密码";
      }
    },
    rePassword: function(val) {
      if (val === "") {
        this.rePasswordInfo = "请确定密码";
      } else if (this.rePassword !== this.password) {
        this.rePasswordInfo = "确认密码不匹配";
      } else {
        this.rePasswordInfo = "";
      }
    }
  }
};
</script>

<style scoped>
.form {
  position: relative;
  top: 250px;
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
  border-right: 1px solid white;
  padding-right: 10px;
  margin-right: 10px;
}
.competence {
  position: absolute;
  left: 32px;
  bottom: 30px;
  color: white;
}
.a-login {
  color: #a0a0a0;
}
</style>
