<template>
    <div class="security-container">
        <div class="security-wrapper">
            <div class="s-item">
                <p class="title">设置密码<i style="color:green;" class="el-icon-success"></i></p>
                <p class="tip"><span>已设置</span></p>
                <p class="opera"><a @click="gotoPwd" class="text">修改密码</a></p>
            </div>
            <div class="s-item">
                <p class="title">绑定邮箱<i :style="emailStyle" :class="emailIconClass"></i></p>
                <p class="tip"><span>{{getEmailStatus}}</span></p>
                <p class="opera"><el-button type="text" @click="gotoEmail" :disabled="disabled" class="text">{{emailOperaText}}</el-button></p>
            </div>
        </div>

        <div class="opera-wrapper">
            <div id="edit-pwd" class="edit-pwd-wrapper">
                <div class="opera-header">
                    <h3 class="op-title">修改密码</h3>
                </div>
                <el-form ref="pwd-form" :model="pwd" :rules="pRules" size="small" label-position="top">
                     <el-form-item prop="opwd" label="原密码">
                         <el-input v-model="pwd.opwd"></el-input>
                     </el-form-item>
                     <el-form-item prop="npwd" label="新密码">
                         <el-input v-model="pwd.npwd"></el-input>
                     </el-form-item>
                     <el-form-item prop="cpwd" label="确认新密码">
                         <el-input v-model="pwd.cpwd"></el-input>
                     </el-form-item>
                     <el-form-item>
                         <el-button>修改</el-button>
                         <el-button @click="resetForm('pwd-form')">重置</el-button>
                         <a style="color:#5757a5;margin-left:5px;vertical-align:-webkit-baseline-middle;"> 忘记密码？</a>
                     </el-form-item>
                     <el-form-item>
                         <p :style="epwdStyle">{{editPwdResult}}</p>
                     </el-form-item>
                </el-form>
            </div>

            <div id="c-email" class="edit-email-wrapper">
                <div class="opera-header">
                    <h3 class="op-title">更换邮箱</h3>
                </div>
                <el-form :model="email" :rules="eRules" ref="email-form" size="small" :inline="true">
                    <el-form-item prop="email">
                        <el-input v-model="email.email" placeholder="新邮箱"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button>更换</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import API from "../api/api";
export default {
  data() {
    var checkOriginPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入原密码"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.pwd.npwd !== "") {
          this.$refs["pwd-form"].validateField("cpwd");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.pwd.npwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      let regEmail = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
      if (value === "") {
        callback();
      } else if (!regEmail.test(value)) {
        callback(new Error("邮箱格式不正确!"));
      } else {
        callback();
      }
    };
    return {
      securityInfo: {},
      showPwdBox: false,
      showEmailBox: false,
      pwd: {
        opwd: "",
        npwd: "",
        cpwd: ""
      },
      email: {
        email: ""
      },
      pRules: {
        opwd: [{ validator: checkOriginPwd, trigger: "blur" }],
        npwd: [
          {
            min: 6,
            max: 20,
            message: "密码长度在 6 到 20 个字符",
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ],
        cpwd: [{ validator: validatePass2, trigger: "blur" }]
      },
      eRules: {
        email: [{ validator: checkEmail, trigger: "blur" }]
      },
      editPwdResult: "",
      changeEmailTip: "",
      changeEmailTime: 0,
      emailOperaText: "",
      emailVerified: 0,
      disabled: false
    };
  },
  watch: {
    emailVerified(val) {
      if (val === 1) {
        this.emailOperaText = "更换邮箱";
      } else if (val === 0) {
        this.emailOperaText = "验证邮箱";
      }
    }
  },
  methods: {
    async initSecurityInfo() {
      let uid = localStorage.getItem("USER_ID");
      if (uid) {
        let res = await API.getUserInfoByUid(uid);
        let rd = res.data;
        if (rd.code === 0) {
          console.log("getSecurityInfo success,", rd.data);
          this.securityInfo = rd.data;
          this.emailVerified = rd.data.emailVerified;
          if (this.emailVerified == 1) {
            this.emailOperaText = "更换邮箱";
          } else {
            this.emailOperaText = "验证邮箱";
          }
        } else {
          console.log("error getSecurityInfo");
        }
      } else {
        console.log("用户未登陆");
      }
    },
    updatePwd() {},
    gotoPwd() {
      let anchor = document.getElementById("edit-pwd");
      if (anchor) {
        console.log("go pwd");
        anchor.scrollIntoView();
      }
    },
    gotoEmail() {
      if (this.emailVerified === 1) {
        let anchor = document.getElementById("c-email");
        if (anchor) {
          console.log("go email");
          anchor.scrollIntoView();
        }
      } else {
          console.log("validate email addr!");
        this.validateEmailAddr();
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    timer() {
      if (this.changeEmailTime > 0) {
          console.log("time:",this.changeEmailTime);
        this.changeEmailTime--;
        this.emailOperaText = this.changeEmailTime + "s后可重新发送";
        setTimeout(this.timer, 1000);
      } else {
        this.changeEmailTime = 0;
        this.emailOperaText = "验证邮箱";
        this.disabled = false;
      }
    },
    validateEmailAddr() {
      this.changeEmailTime = 60;
      this.disabled = true;
      console.log("invoke timer!");
      this.timer();
    }
  },
  computed: {
    getEmailStatus() {
      let verify = this.securityInfo.emailVerified;
      if (verify === 1) {
        return this.securityInfo.email + "（已验证）";
      } else {
        return this.securityInfo.email + "（未验证）";
      }
    },
    emailStyle() {
      let verify = this.securityInfo.emailVerified;
      if (verify === 1) {
        return { color: "green" };
      } else {
        return { color: "rgb(153, 108, 25)" };
      }
    },
    emailIconClass() {
      let verify = this.securityInfo.emailVerified;
      if (verify === 1) {
        return "el-icon-success";
      } else {
        return "el-icon-warning";
      }
    },
    epwdStyle() {}
  },

  created() {
    console.log("SecurityInfo.vue created!");
    this.initSecurityInfo();
  }
};
</script>

<style scoped>
.security-container {
  margin: 0 auto;
  /* text-align: center; */
}
.opera-wrapper {
  margin-top: 20px;
  text-align: left;
}
.opera-header .op-title {
  color: #20968b;
}
.edit-pwd-wrapper {
  width: 400px;
}
.edit-email-wrapper {
  margin-top: 40px;
  width: 500px;
}
.s-item {
  height: 80px;
  line-height: 80px;
  margin-top: 20px;
  border-top: solid 1px #20968b;
}
.s-item p {
  text-align: left;
}
.s-item .title {
  float: left;
  width: 35%;
  font-size: 14px;
  color: #e5e9ef;
}
.s-item .title i {
  margin-left: 0;
  float: left;
  margin-top: 33px;
  margin-right: 5px;
}
.s-item .tip {
  width: 45%;
  float: left;
  font-size: 12px;
  color: #6d757a;
}
.s-item .opera {
  width: 20%;
  float: left;
}
.s-item .opera .text {
  font-size: 12px;
  color: #00a1d6;
}
.s-item .opera a:hover {
  cursor: pointer;
  color: #00c0ff;
}
</style>


