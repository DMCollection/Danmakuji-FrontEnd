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
            <div :class="{hidden:!isRegSuccess}" class="after-reg">
              <h3 class="title">注册成功!</h3>
              <div class="area-info">
                <p>您的用户名为:<span class="mobile">{{regNick}}</span></p>
                <p>您的邮箱为:<span class="mobile">{{regEmail}}</span></p>
                <p>请妥善保管!</p>
              </div>
              <a href="/">稍后将会自动回到首页...</a>
            </div>

            <el-form v-show="!isRegSuccess" id="form-reg" class="form" :model="registerData" status-icon :rules="rules"
                     ref="reg">
              
              <h3 class="title">  注册 Darker</h3>
              <div class="area">
                <el-form-item prop="nick">
                  <el-input id="ipt-username-reg" name="name" v-model="registerData.nick" type="text"
                            auto-complete="off" class="regname name l error" placeholder="请输入昵称"
                            required="required"></el-input>
                </el-form-item>
                <span class="clearfix"></span>
              </div>
              <div class="area">
                <el-form-item prop="email">
                  <el-input id="ipt-mobile-reg" name="mobile" v-model="registerData.email" type="text"
                            auto-complete="off" class="mobile l error" placeholder="请输入邮箱"
                            required="required"></el-input>
                </el-form-item>
                <span class="clearfix"></span>
              </div>
              <div class="area">
                <el-form-item prop="password">
                  <el-input id="ipt-pwd-reg" name="password" v-model="registerData.password" type="password"
                            auto-complete="off" placeholder="请输入密码，6-20位" class="password l error"
                            required="required"></el-input>
                </el-form-item>
                <span class="clearfix"></span>
              </div>
              <div class="area">
                <el-form-item prop="dupwd">
                  <el-input id="ipt-repwd-reg" name="dupwd" v-model="registerData.dupwd" type="password"
                            auto-complete="off" placeholder="确认密码" class="re-password l error"
                            required="required"></el-input>
                </el-form-item>
                <span class="clearfix"></span>
              </div>
              <!-- <div class="area area-agree">
              <input id="ipt-agree-reg" type="checkbox" checked="checked" class="l agree">
              <label for="ipt-agree-reg" class="agree-b">我已经认真阅读并同意Darker的<a href="#" target="_blank">《使用协议》</a>。</label>
              <a href="#" class="back-login">返回登录</a>
              <span class="clearfix"></span>
              </div> -->
              <div class="area-tool">
                <a @click="register" :disabled="isRegInfoValid?'disabled':''" class="do login-btn primary">注册</a>
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
    data() {
      var checkNick = (rule, value, callback) => {
        var nickRegEx = new RegExp("[a-z0-9A-Z\\u4e00-\\u9fa5_]{1,20}", "g");
        if (!nickRegEx.test(value)) {
          return callback(new Error('用户名格式不正确'));
        }
        this.isNickValid = true;
        callback();
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          var passwordRegEx = new RegExp("[a-z0-9A-Z._]{6,20}", "g");
          if (!passwordRegEx.test(value)) {
            callback(new Error('密码格式不正确'));
          }
          this.isPwd1Valid = true;
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerData.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          this.isPwd2Valid = true;
          callback();
        }
      };
      var checkEmail = (rule, value, callback) => {
        var emailRegEx = new RegExp("^[A-Za-z0-9\\u4e00-\\u9fa5]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$", "g");
        if (!emailRegEx.test(value)) {
          return callback(new Error('邮箱格式不正确'));
        }
        this.isEmailValid = true;
        callback();
      };
      return {
        isPwd1Valid: false,
        isPwd2Valid: false,
        isNickValid: false,
        isEmailValid: false,
        isRegSuccess: false,
        registerData: {
          nick: "",
          password: "",
          email: "",
          dupwd: ""
        },
        rules: {
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          dupwd: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          nick: [
            {validator: checkNick, trigger: 'blur'}
          ],
          email: [
            {validator: checkEmail, trigger: 'blur'}
          ]
        },
        regNick: "",
        regEmail: ""

      }
    },
    computed: {
      isRegInfoValid() {
        return (this.isPwd1Valid && this.isPwd2Valid && this.isEmailValid && this.isNickValid);
      }
    },
    methods: {
      async register() {
        if (!this.isRegInfoValid) {
          this.$message.error("注册信息有误");
          return;
        }
        let postData = {
          nick: this.registerData.nick,
          email: this.registerData.email,
          pwd: this.registerData.password
        }
        let res = await API.register(postData);
        this.tap("注册结果：" + res);
        let resData = res.data.data;
        this.tap(resData);
        if (res.data.code === 0) {
          this.tap("注册成功");
          this.isRegSuccess = true;
          this.regNick = resData.nick;
          this.regEmail = resData.email;
          let loginRes = await API.login({
            principal: this.registerData.nick,
            password: this.registerData.password,
            remember_me: 1
          });
          this.tap("login res:" + loginRes);
          let loginResData = loginRes.data.data;
          this.tap(loginResData);
          if (loginRes.data.code === 0) {
            this.tap("偷偷登陆成功");
            localStorage.setItem("USER_ID", loginResData.user.uid);
            localStorage.setItem("JWT_TOKEN", loginResData.token);
            localStorage.setItem("loginUserName", loginResData.user.nick);
            setTimeout(() => {
              // window.location.href = "/";
            }, 3000);
          }
        }
        else {
          if (res.data.code === 1001) {
            this.tap("code === 1001");
            this.$message.error(res.data.msg);
          }
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
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    box-shadow: none \9;
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
    border-radius: 10px;
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
    text-align: center;
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
    padding: 4px 0 4px 45px;
    transition: none;
    font-size: 20px;
    color: #666;
    background: url(/static/reglogow.png) left no-repeat;
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
