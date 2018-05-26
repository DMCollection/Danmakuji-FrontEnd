<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
<el-container>
  <el-header>

<el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1"><router-link to='/'><i class="el-icon-menu"></i>首页</router-link></el-menu-item>
  <el-menu-item index="2"><router-link to='/WatchVideo'><i class="el-icon-view"></i>观看</router-link></el-menu-item>

  <el-popover
    placement="top"
    width="160"
    v-model="showLogin">

    <div class="loginGroup" v-show="!isLogin">
      <el-input v-model="nameInput" placeholder="账号"></el-input>
      <el-input v-model="passwordInput" type="password" placeholder="密码"></el-input>
      <el-checkbox v-model="rememberMe">记住我</el-checkbox>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="showLogin = false">取消</el-button>
        <el-button type="primary" size="mini" @click="login">确定</el-button>
      </div>
    </div>

    <div class="loginedGroup" v-show="isLogin">
      <p> 已登录:{{loginUserName}}</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="showLogin = false">取消</el-button>
        <el-button type="primary" size="mini" @click="logout">注销</el-button>
      </div>      
    </div>

    <el-button type="primary" icon="el-icon-setting" circle slot="reference"></el-button>
  </el-popover>

</el-menu>
  </el-header>
  <el-main>
        <router-view></router-view>
  </el-main>
</el-container>

  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import WatchVideo from "./components/WatchVideo.vue";
import API from "./api/api.js";

export default {
  name: "app",
  components: {
    HelloWorld,
    WatchVideo
  },
  data() {
    return {
      showLogin: false,
      nameInput: "",
      passwordInput: "",
      rememberMe: false,
      activeIndex: "1",
      isLogin: false,
      loginUserName: ""
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.tap(key, keyPath);
    },
    async login() {
      let loginInfo = {
        principal: this.nameInput,
        password: this.passwordInput,
        remember_me: this.rememberMe ? 1 : 0
      };
      if (loginInfo.principal == "" || loginInfo.password == "") {
        this.$message({
          message: "账号或密码为空",
          type: "info"
        });
        return false;
      }
      let res = await API.login(loginInfo);

      let rd = res.data;

      let token = "";

      if (rd.code === 2002 || rd.data == null) {
        this.$message({
          message: "账号不存在或密码错误",
          type: "error"
        });
        return false;
      }
      if (rd.code === 0 || rd.msg === "OK") {
        token = rd.data.token;
        this.isLogin = true;
        this.loginUserName = loginInfo.principal;
        if (!token) {
          this.$message({
            message: "无法获取到Token",
            type: "error"
          });
        }
      }

      //检测localStorage , 若不存在则发出提示
      if (this.checkLocalStorage()) {
        //保存到localStorage
        localStorage.setItem("JWT_TOKEN", token);
        localStorage.setItem("loginUserName", this.loginUserName);
      }
    },
    checkLocalStorage() {
      if (typeof window.localStorage === "undefined") {
        this.$message({
          message: "请关闭隐私模式,或者浏览器太老旧了,否则无法保存登录状态",
          type: "warning"
        });
        return false;
      } else {
        return true;
      }
    },
    async logout() {
      let res = await API.logout();
      if (res.data.code === 0 || res.data.msg === "登出成功") {
        this.isLogin = false;
        localStorage.setItem("JWT_TOKEN", "");
        localStorage.setItem("loginUserName", "");
      }
    }
  },
  async mounted() {
    if (this.checkLocalStorage()) {
      let saveLoginName = localStorage.getItem("loginUserName");
      let JWT_TOKEN = localStorage.getItem("JWT_TOKEN");

      if (JWT_TOKEN == null || JWT_TOKEN == "") {
        return;
      }

      //检查Token是否过期
      let res = await API.checkToken(JWT_TOKEN);
      this.tap(res.data);

      if (res.data.code === 0 || res.data.msg === "ojbk") {
        this.isLogin = true;
        this.loginUserName = saveLoginName;
      }
    }
  }
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a {
  text-decoration: none;
}

.el-menu-item,
.el-header {
  padding: 0 !important;
}
.el-menu-item a {
  color: inherit;
  height: 100%;
  display: inline-block;
  padding: 0 20px;
}
.el-menu span {
  position: absolute;
  right: 0.6rem;
  top: 0.6rem;
}
.el-popper .el-input .el-input__inner {
  margin-bottom: 1rem !important;
}
</style>
