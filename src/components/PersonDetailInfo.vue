<template>
  <div class="p-container">
    <div class="p-infos">
      <el-form id="form-user-detail" class="form" size="small" label-position="top" :model="userInfo" status-icon
               ref="udf">
        <el-form-item prop="nick">
          <span class="p-label">昵称：</span>
          <el-input id="nick" style="width:200px;" name="nick" v-model="userInfo.nick"></el-input>
        </el-form-item>

        <el-form-item prop="sex">
          <span class="p-label">性别：</span>
          <el-input id="sex" style="width:200px;" name="sex" v-model="userInfo.sex"></el-input>
        </el-form-item>

        <el-form-item prop="age">
          <span class="p-label">年龄：</span>
          <el-input id="age" style="width:200px;" name="age" v-model="userInfo.age"></el-input>
        </el-form-item>
        <el-form-item prop="sign">
          <span class="p-label">我的签名：</span>
          <el-input
                  rows="3"
                  resize="none"
                  type="textarea" id="sign" name="sign" v-model="userInfo.sign"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="updateUserInfo" type="primary">修改</el-button>
    </div>
  </div>
</template>

<script>
  import API from "../api/api";

  export default {
    data() {
      return {
        userInfo: {}
      };
    },
    methods: {
      async initUserInfo() {
        let uid = localStorage.getItem("USER_ID");
        if (uid) {
          let res = await API.getUserInfoByUid(uid);
          let rd = res.data;
          if (rd.code === 0) {
            console.log("init userInfo success:", rd.data);
            this.userInfo = rd.data;
          } else {
            console.log("获取用户信息失败");
          }
        } else {
          console.log("uid为空");
        }
      },
      async updateUserInfo() {
        let uid = localStorage.getItem("USER_ID");
        console.log("uid:", uid);
        let user = {
          sex: this.userInfo.sex,
          age: this.userInfo.age
        };
        console.log(user);
        if (user.sex && user.age !== '') {
          let res = await API.updateUserInfo(uid, user);
          let rd = res.data;
          console.log(rd);
          if (rd.code === 0) {
            console.log("修改成功");
            this.userInfo.age = rd.data.age;
            this.userInfo.sex = rd.data.sex;
          } else {
            console.log(rd.msg);
          }
        }
      }
    },
    created() {
      this.initUserInfo();
    }
  };
</script>

<style scoped>
  .p-container {
    margin: 20px;
    text-align: left;
  }

  .p-label {
    color: #149299;
  }

  .el-textarea{
    display: inherit;
  }
</style>



