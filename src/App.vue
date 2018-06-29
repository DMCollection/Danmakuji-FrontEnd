<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
<el-container>
  <!-- <el-header class="appheader" style="border-bottom: solid 1px #e6e6e6;box-shadow: 0 0 1px 0px rgba(0,0,0,.1);"> -->
 <el-header class="appheader" style="background-color: rgba(20,20,34,0.9);box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);">
 <div style="width:980px;margin:0 auto;">

<el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  style="border-bottom:none;background-color:inherit">

  <el-menu-item class="header-link" style="border-bottom:none" index="1">
    <router-link :to="{name:'HelloWorld'}">首页</router-link>
  </el-menu-item>
  <el-menu-item class="header-link" style="border-bottom:none" index="2">
    <router-link :to="{name:'video'}">观看</router-link>
  </el-menu-item>

  <!-- <el-popover 
    trigger="hover"
    placement="top"
    width="160"
    v-model="showLogin">

    <div class="loginGroup">
      <el-input v-model="nameInput" placeholder="账号"></el-input>

      <el-input v-model="passwordInput" type="password" placeholder="密码"></el-input>

      <el-checkbox v-model="rememberMe">记住我</el-checkbox>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="registerPage">注册</el-button>
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
      <el-button type="primary" slot="reference" circle ><i></i></el-button>
  </el-popover> -->


            <el-dropdown class="avatar-container" placement="bottom">
                <div class="avatar-wrapper">
                    <img class="user-avatar" :src="curUserFace?curUserFace:'/static/defaultface.png'">
                </div>
                <el-dropdown-menu v-if="isLogin" :visibleArrow="false" class="user-dropdown" slot="dropdown">
                        <router-link :to="{name:'personal'}">
                        <el-dropdown-item>
                            <span style="font-size:10px">{{getLoginUsername()}}</span>
                        </el-dropdown-item>
                        </router-link>
                        <router-link :to="{name:'avatar'}">
                        <el-dropdown-item >          
                              <span style="display:block;">个人中心</span>                        
                        </el-dropdown-item>
                        </router-link>
                        <el-dropdown-item @click="logout"><span style="display:block;">退出登录</span></el-dropdown-item>
                </el-dropdown-menu>
                <el-dropdown-menu v-else :visibleArrow="false" class="user-dropdown" slot="dropdown">
                        <el-dropdown-item style="background-color:#fff">
                            <div class="login-container">
                              <div class="i_menu i_menu_login">
                                <p class="tip">登录后你可以：</p> 
                                <div class="img">
                                <img src="/static/sk.jpg">
                                </div>
                            </div>
                            <el-button style="width:320px" @click="$router.push({path:'/login'})" type="primary">
                              登陆
                            </el-button> 
                            <p class="reg">首次使用？<a href="#/register">点我去注册</a></p>
                            </div>
                            
                        </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
  
            <el-dropdown class="message-container" placement="bottom">
                <div>
                  <el-badge v-if="unreadMsg>0" :value="unreadMsg" :max="99" class="item">
                    <!-- <a class="message-pos" href="#">消息</a> -->
                    <el-button class="header-link" type="text">消息</el-button>
                  </el-badge>
                  <el-button v-else class="header-link" type="text">消息</el-button>   
                </div>
                <el-dropdown-menu :visibleArrow="false" class="user-dropdown" slot="dropdown">
                        <router-link :to="{name:'snotice',params:{type:'系统通知'}}">
                        <el-dropdown-item>
                          <el-badge v-if="unreadAtMsg>0" :value="unreadSysMsg" :max="99" class="item">
                            <div class="notice-item" >系统通知</div>
                          </el-badge>
                          <div v-else class="notice-item" >系统通知</div>
                        </el-dropdown-item>
                        </router-link>
                        <router-link :to="{name:'rnotice',params:{type:'回复我的'}}">
                        <el-dropdown-item >
                            <el-badge v-if="unreadReplyMsg>0" :value="unreadReplyMsg" :max="99" class="item">
                            <div class="notice-item">回复我的</div>
                          </el-badge>    
                          <div v-else class="notice-item">回复我的</div>
                        </el-dropdown-item>
                        </router-link>
                    <!-- <router-link class='inlineBlock' to="/admin/profile"> -->
                        <router-link :to="{name:'anotice',params:{type:'@我的'}}">
                        <el-dropdown-item >
                            <el-badge v-if="unreadAtMsg>0" :value="unreadAtMsg" :max="99" class="item">
                            <div class="notice-item">@我的</div>
                          </el-badge>
                          <div v-else class="notice-item">@我的</div>   
                        </el-dropdown-item>
                        </router-link>
                    <!-- </router-link> -->
                    <el-dropdown-item >
                      <el-badge v-if="unreadLikeMsg>0" :value="unreadLikeMsg" :max="99" class="item">
                            <div class="notice-item">收到的赞</div>
                          </el-badge>
                             <div v-else class="notice-item">收到的赞</div>
                      </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
  
</el-menu>
</div>
  </el-header>
  <el-main style="background-color: #141422;">
        <router-view></router-view>
  </el-main>
  <myfooter></myfooter>
</el-container>


  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import WatchVideo from "./components/WatchVideo.vue";
import Register from "./components/Register.vue";
import PersonalStation from "./components/PersonalStation.vue";
import MessageStation from "./components/MessageStation.vue";
import Login from "./components/Login.vue";
import Footer from "./components/Footer.vue";
import API from "./api/api.js";

export default {
  name: "app",
  components: {
    HelloWorld,
    WatchVideo,
    Register,
    PersonalStation,
    MessageStation,
    Login,
    'myfooter':Footer
  },
  data() {
    return {
      showLogin: false,
      nameInput: "",
      passwordInput: "",
      rememberMe: false,
      activeIndex: "1",
      isLogin: false,
      loginUserName: "",
      uid: "",
      msgnum: 0,
      vuepages: {
        hello: "HelloWorld",
        video: "video",
        space: "space"
      },
      curUserFace: "",
      unreadMsg: 0,
      unreadSysMsg: 0,
      unreadReplyMsg: 0,
      unreadAtMsg: 0,
      unreadLikeMsg: 0
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.tap(key, keyPath);
    },
    registerPage() {
      this.tap("goto register page");
      this.showLogin = false;
      this.$router.push({ path: "/register" });
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
        this.tap("login return data:" + rd.data);
        this.uid = rd.data.user.uid;
        this.tap("uid:" + this.uid);
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
        localStorage.setItem("USER_ID", this.uid);
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
    getLoginUsername() {
      return localStorage.getItem("loginUserName");
    },
    async logout() {
      let res = await API.logout();
      if (res.data.code === 0 || res.data.msg === "登出成功") {
        this.isLogin = false;
        localStorage.setItem("JWT_TOKEN", "");
        localStorage.setItem("loginUserName", "");
        localStorage.setItem("USER_ID", "");
      }
      this.isLogin = false;
      localStorage.clear();
      window.location.href = "/";
    },
    getCurUserFace() {
      return localStorage.getItem("face");
    },
    async countUnreadMsg(){
      let uid = localStorage.getItem("USER_ID");
      if(uid){
        let res = await API.countUnreadMsg(uid);
        let rd = res.data;
        if(rd.code === 0){
          console.log("update msgCount:",rd.data.total);
          this.unreadMsg = rd.data.total;
          this.unreadSysMsg = rd.data.system;
          this.unreadReplyMsg = rd.data.reply;
          this.unreadAtMsg = rd.data.at;
          this.unreadLikeMsg = rd.data.like;
        }
        else{
          this.unreadMsg = 0;
          this.unreadSysMsg = 0;
          this.unreadReplyMsg = 0;
          this.unreadAtMsg = 0;
          this.unreadLikeMsg = 0;
          console.log("no new msg");
        }
      }
      else{
        console.log("未登陆");
      }
      
    }
  },

  async mounted() {
    if (this.checkLocalStorage()) {
      let saveLoginName = localStorage.getItem("loginUserName");
      let JWT_TOKEN = localStorage.getItem("JWT_TOKEN");
      let USER_ID = localStorage.getItem("USER_ID");
      this.tap("check userid: " + USER_ID);

      if (JWT_TOKEN == null || JWT_TOKEN == "") {
        return;
      }
      //检查Token是否过期
      let res = await API.checkToken(JWT_TOKEN);
      this.tap(res.data);

      if (res.data.code === 0 || res.data.msg === "ojbk") {
        this.isLogin = true;
        this.loginUserName = saveLoginName;
      } else {
        this.tap("clear localStorage!");
        localStorage.clear();
      }
    }
    this.curUserFace = this.getCurUserFace();
    console.log("getCurUserFace:", this.curUserFace);
  },
  created(){
    console.log("app created!");
    this.countUnreadMsg();
  }
};
</script>

<style>
body {
  margin: 0;
  background-image: url(/static/star-background.jpg);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif, FontAwesome;
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
/* .el-menu span {
  position: absolute;
  right: 0.6rem;
  top: 0.6rem;
} */
.el-popper .el-input .el-input__inner {
  margin-bottom: 1rem !important;
}

.avatar-container .avatar-wrapper {
  cursor: pointer;
  padding: 5px;
  position: relative;
  height: 40px;
  line-height: 40px;
}
.avatar-container {
  height: 50px;
  display: inline-block;
  position: absolute;
  top: 8px;
  right: 0;
}

.user-avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.message-container {
  height: 50px;
  display: inline-block;
  position: absolute;
  top: 10px;
  right: 70px;
}
.el-menu--horizontal {
  /* padding-left: 150px;
    box-shadow: 0 0 1px 0px rgba(0,0,0,.1); */
  height: 58px;
}

.login-container {
  width: 320px;
  height: 340px;
  background-color: #fff;
}
.i_menu_login .tip {
  font-size: 12px;
  color: #6d757a;
}

.reg {
  margin-top: 8px;
  text-align: center;
  color: #282828;
}
.reg a {
  color: #00a1d6;
}
.reg a:hover {
  background-color: #fff;
  color: #66b1ff;
}
.i_menu_login .img img {
  width: 320px;
  height: 200px;
  overflow: hidden;
  position: relative;
}
/* .el-menu--horizontal {
    border-right: none;
    border-bottom: solid 1px #e6e6e6;
    box-shadow: 0 0 1px 0px rgba(0,0,0,.1);
} */

.header-link {
  font-weight: 700;
  padding: 0.25em 0.75em;
  border-bottom: 3px solid transparent;
  font-size: 0.942666666666667rem;
  color: #f9efc1 !important;
}
.el-badge__content {
  border: 0;
}

/* body {
  background-image: url(/static/star-background.jpg);
} */
</style>
