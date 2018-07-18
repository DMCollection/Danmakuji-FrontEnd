<template>
    <div id="mainer" style="min-height: 37px;">
        <input id="rightNum" type="hidden">
        <div id="mainer-inner">
            <div id="area-reg">
                <div class="block l">
                    <div class="bg-login">
                    </div>
                </div>
                <div class="block r">
                    <div class="area-reg">
                        <el-form id="form-reg" class="form" status-icon ref="reg">
                        <h3 class="title">登陆 Darker</h3>
                        <div class="area">
                        <el-form-item>
                            <el-input id="ipt-username-reg" name="name" v-model="loginData.principal" type="text" auto-complete="off" class="regname name l error" placeholder="昵称/邮箱" required="required"></el-input>
                        </el-form-item>
                        <span class="clearfix"></span>
                        </div>
                        
                        <div class="area">
                        <el-form-item >
                            <el-input id="ipt-pwd-reg" name="password" v-model="loginData.password" type="password" auto-complete="off" placeholder="请输入密码，6-20位" class="password l error" required="required"></el-input>
                        </el-form-item>  
                        <span class="clearfix"></span>
                        </div>

                       <div class="area">
                        <el-form-item>
                            <span style="display:inline-block;color: #717171;margin-right:10px;">记住我</span>
                               <el-switch
                                   v-model="switchval"
                                   active-color="#3a86ef"
                                   inactive-color="#777">
                                </el-switch>
                                <span style=" color:#bbb;margin-left:10px">不是自己的电脑上不要勾选此项</span>
                        </el-form-item>
                        <span class="clearfix"></span>
                        </div>
                    
                       
                        <div class="area-tool">
                        <a @click="login" class="do login-btn primary">登陆</a>
                        <div id="launchBtn" class="launchBtn bg hidden">
                        </div>
                        <p></p>
                        <span class="clearfix"></span>
                        </div>
                        </el-form>
                    </div>
                </div>
            <span class="clearfix"></span>
            </div>
        </div>
    </div>
</template>
<script>
import API from "../api/api";
export default {
    data(){
        return {
            switchval: false,
            loginData:{
             principal : "",
             password: "",
             remember_me: 0
         }
        }
    },
    computed:{
    },
    methods:{
        async login() {
      let loginInfo = {
        principal: this.loginData.principal,
        password: this.loginData.password,
        remember_me: this.loginData.remember_me ? 1 : 0
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
      let uid = "";

      let token = "";

      let loginUserName = "";

      if (rd.code === 2002 || rd.data == null) {
        this.$message({
          message: rd.msg,
          type: "error"
        });
        return false;
      }
      if (rd.code === 0 || rd.msg === "OK") {
        token = rd.data.token;
        loginUserName = loginInfo.principal;
        console.log("username:",loginUserName);
        console.log("login return data:",rd.data);
        console.log(res);
        uid = rd.data.user.uid;
        this.tap("uid:"+uid);
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
        localStorage.setItem("USER_ID", uid);
        localStorage.setItem("JWT_TOKEN", token);
        localStorage.setItem("loginUserName", loginUserName);
        localStorage.setItem("face",rd.data.user.face);
        window.location.href = "/"
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
    }
    }
}
</script>

<style scoped>
 #mainer {
    clear: both;
    width: 100%;
}
el-input {
    outline: none;
    box-shadow: none;
}
#mainer-inner {
    margin: 0 auto;
    width: 980px;
    text-align: left;
    position: relative;
}
#area-reg {
    margin-top: 95px;
    margin-bottom: 32px;
}
#area-reg .block {
    box-shadow: none;
    width: 50%;
    background: none;
    border: 0;
}
div {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0;
    outline: 0;
    border: 0;
    vertical-align: baseline;
    font-weight: inherit;
    font-style: inherit;
    font-size: 100%;
    font-family: inherit;
}
.l {
    float: left;
}
.r {
    float: right;
}
.block {
    position: relative;
    overflow: visible;
    margin: 0 auto 16px;
    padding: 0;
    width: 100%;
    border: 1px solid #fff;
    background-color: #fff;
    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
    box-shadow: none\9;
}
#area-reg .l .bg-login {
    margin-top: 20px;
    width: 420px;
    height: 320px;
    background: url(/static/zz.gif) 50% 50% no-repeat;
    /* border-radius: 64px; */
    /* box-shadow: 0 0 2px #fbfbfb inset, 0 0 4px #fbfbfb inset, 0 0 8px #fbfbfb inset, 0 0 16px #fbfbfb inset, 0 0 32px #fbfbfb inset, 0 0 64px #fbfbfb inset; */
}
#area-reg .r .area-reg {
    width: 380px;
    height: auto;
    position: relative;
    padding: 0 16px;
    margin: 0 0 0 100px;
}
#area-reg .r .area-reg .after-reg {
    height: 134px;
    width: 335px;
}
.hidden {
    display: none !important;
}
#area-reg .r .area-reg .after-reg h3.title {
    width: 145px;
    margin: 0 auto 23px;
    padding: 4px 0 4px 35px;
    transition: none;
    font-size: 16px;
    font-weight: bold;
    color: #666;
    background: url(/static/reglogow.jpg) left no-repeat;
}
#area-reg .r .area-reg .after-reg .area-info {
    border: 1px #ddd solid;
    padding: 50px 55px 40px;
    background: #fff;
}
#area-reg .r .area-reg .after-reg .area-info p {
    color: #666;
    text-align: center;
    margin-bottom: 12px;
    font-size: 14px;
}
#area-reg .r .area-reg .after-reg .area-info p span {
    color: #3a86ef;
}
#area-reg .r .area-reg .after-reg a {
    text-indent: 2em;
    display: block;
    text-align: right;
    color: #999;
}
a:visited {
    color: #666;
}
a:link {
    text-decoration: none;
}
a {
    color: #369;
    text-decoration: none;
    white-space: normal;
    word-break: break-all;
    cursor: pointer;
}
#area-reg .r .area-reg .form .title {
    width: 160px;
    margin: 0 auto 23px;
    padding: 4px 0 4px 35px;
    transition: none;
    font-size: 20px;
    color: #666;
    background: url(/static/reglogow.jpg) left no-repeat;
}
#area-reg .r .area-reg .form .area {
    margin-bottom: 18px;
}
.area {
    position: relative;
}
/* #area-reg .r .area-reg .form .area .inp-icon.icon-mobile {
    left: 10px;
    top: 11px;
    font-size: 22px;
}
#area-reg .r .area-reg .form .area .inp-icon {
    position: absolute;
    left: 13px;
    top: 14px;
    color: #d9d9d9;
    font-size: 16px;
} */
.icon-mobile-phone:before, .icon-mobile:before {
    content: "\f10b";
}
#area-reg .r .area-reg .form .area input {
    margin: 0 16px 0 0;
    padding: 0 0 0 10px;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 349px;
    height: 40px;
    line-height: 40px;
    box-shadow: none;
    transition: none;
    font-size: 14px;
    border: 1px solid rgb(180, 179, 179);
}
/* input.error, textarea.error {
    border-color: #c00 !important;
    color: #c33 !important;
} */
.clearfix {
    display: inline-block;
    margin: 0;
    padding: 0;
    height: 0;
    line-height: 0;
    zoom: 1;
}
.clearfix {
    display: block;
    clear: both;
    _display: none;
}
.clearfix:after {
    display: block;
    visibility: hidden;
    clear: both;
    height: 0;
    content: '.';
}
.icon-user:before {
    content: "\f007";
}
#area-reg .r .area-reg .form .area input.mcode {
    width: 165px;
    padding-left: 10px;
    margin-right: 0;
}
/* #area-reg .r .area-reg .form .area input#send-mobile-code.dis {
    background: #eee;
    color: #c2c2c2;
}
#area-reg .r .area-reg .form .area input#send-mobile-code {
    margin-right: 0;
    margin-left: 18px;
    padding-left: 0;
    width: 165px;
    float: left;
    text-align: center;
    border-radius: 5px;
    color: #868686;
    cursor: pointer;
} */
#area-reg .r .area-reg .form .area-agree {
    color: #777;
    font-size: 12px;
}
#area-reg .r .area-reg .form .area-agree .agree {
    margin-right: 4px;
}
#area-reg .r .area-reg .form .area .agree {
    width: 16px;
    height: 16px;
    padding: 0;
    cursor: pointer;
}
#area-reg .r .area-reg .form .area-agree .agree-b {
    line-height: 16px;
    width: auto;
    display: inline;
}
#area-reg .r .area-reg .form .area label {
    display: inline-block;
    color: #666;
    font-size: 12px;
    width: 70px;
    height: 30px;
    line-height: 30px;
    margin-right: 12px;
    text-align: right;
}
#area-reg .r .area-reg .form .area-agree a {
    color: #3a86ef;
    font-size: 12px;
}
#area-reg .r .area-reg .form .area-agree a.back-login {
    margin-left: 15px;
}
#area-reg .r .area-reg .form .area-tool {
    text-align: center;
}
#area-reg .r .area-reg .form .area-tool .login-btn {
    display: block;
    height: 46px;
    line-height: 46px;
    font-size: 16px;
    color: #fff;
    background: #67bdcd;
    border: 1px #dcdcdc solid;
    border-radius: 5px;
}
#area-reg .r .area-reg .form .area-tool p {
    color: #3a86ef;
    margin-top: 14px;
    text-align: right;
}
#area-reg .r .area-reg .form .area-tool .btn {
    height: 35px;
    line-height: 35px;
    padding: 0 24px;
    width: auto;
    float: none;
    background: none;
    border: none;
    box-shadow: none;
    color: #3a86ef;
    font-size: 12px;
    margin: -15px -25px 0 0;
}
#area-reg .r .area-reg .form .banner-tip {
    text-align: center;
    margin-top: 30px;
    color: #f00;
}
</style>
