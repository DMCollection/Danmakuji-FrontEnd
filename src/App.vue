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

export default {
  name: "app",
  components: {
    HelloWorld,
    WatchVideo
  },
      data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
};
</script>

<style>
body{
  margin:0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a{
  text-decoration: none;
}

.el-menu-item,.el-header{
  padding:0 !important;

}
.el-menu-item a{
      color: inherit;
    height: 100%;
    display: inline-block;
    padding: 0 20px;
}
</style>
