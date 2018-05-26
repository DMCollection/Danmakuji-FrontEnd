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
    <el-input v-model="nameInput" placeholder="账号"></el-input>
    <el-input v-model="passwordInput" placeholder="密码"></el-input>
    <el-checkbox v-model="rememberMe">记住我</el-checkbox>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="showLogin = false">取消</el-button>
      <el-button type="primary" size="mini" @click="login">确定</el-button>
    </div>
    <el-button type="primary" icon="el-icon-setting" circle slot="reference"></el-button>
  </el-popover>
  <!-- <el-menu-item index="3"></el-menu-item> -->

</el-menu>
  </el-header>
  <el-main>
        <router-view></router-view>
    

  </el-main>
  <!-- <el-footer>Footer</el-footer> -->
</el-container>

  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import WatchVideo from "./components/WatchVideo.vue";
import axios from "axios";

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.JWT_TOKEN) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `${localStorage.JWT_TOKEN}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

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
      rememberMe: "",
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.tap(key, keyPath);
    },
    login() {
      //成功则关闭此框并弹出对话框
      // if(){
      //   showLogin = false;
      // }
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
