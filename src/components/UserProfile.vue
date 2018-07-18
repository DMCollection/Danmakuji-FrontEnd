<template>
  <div class="user-p-container">
    <div class="profile-wrapper">
      <div class="u-avatar">
        <img class="avatar-img" :src="userInfo.face?userInfo.face:'/static/rm.jpg'"/>
      </div>
      <div class="u-infos">
        <div class="u-nick">
          <span >{{userInfo.nick}}</span>
        </div>
        <div class="u-sex">
          <span >{{userInfo.sex}}</span>
        </div>
        <div class="u-age">
          <span >{{userInfo.uid}}</span>
        </div>
        <div class="u-sign">
          <span >{{userInfo.sign}}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import API from "../api/api";

  export default {
    data() {
      return {
        userInfo: ""
      }
    },
    methods: {
      async initUserInfo(uid) {
        let res = await API.getUserInfoByUid(uid);
        let rd = res.data;
        if (rd.code === 0) {
          console.log("获取用户信息成功,", rd.data);
          this.userInfo = rd.data;
        }
      }
    },
    created() {
      console.log("UserProfile.vue created!");
      let uid = this.$route.params.uid;
      console.log("uid is:", uid);
      if (uid) {
        this.initUserInfo(uid);
      }
      else {
        console.log("uid为空");
      }
    }
  }
</script>

<style scoped>

  .user-p-container{
    margin: 0 auto;
    width: 50%;
    height: 100%;
  }
  .u-avatar {
    position: relative;
    float: left;
    width: 64px;
    height: 64px;
    border: 2px solid hsla(0, 0%, 100%, .4);
    border-radius: 52px;
  }

  .avatar-img {
    width: 64px;
    height: 64px;
    /* background: #fff; */
    border-radius: 48px;
  }

  .u-infos {
    float: left;
    color: #fff;
    /* font-size: 0; */
    margin: 10px 0 0 20px;
  }

  .u-infos span {
    display: inline-block;
    margin-right: 5px;
    font-weight: 700;
    line-height: 18px;
    font-size: 18px;
    vertical-align: middle;
  }
</style>

<style>

</style>


