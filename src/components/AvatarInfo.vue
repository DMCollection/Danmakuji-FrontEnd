<template>
  <el-container>
    <el-main>
  <!-- <el-row :gutter="50"> -->
  
      <!-- <el-col :span="20"> -->
      <div class="cur-avatar">
          <span style="display: block;font-size: 12px;color: #99a2aa;padding-bottom:15px;">当前头像</span>
          <img style="width:100%; height:100%; border-radius: 50%;" :src="curImageUrl?curImageUrl:'/static/defaultface.png'" />
      </div>
      <div class="upload-container" style="margin-top:50px">
          <!-- <a style="display: block;font-size: 12px;color: #99a2aa;" class="btn" @click="toggleShow">设置头像</a> -->
          <el-button @click="toggleShow" type="primary">设置头像</el-button>
	<my-upload field="file"
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        v-model="show"
		:width="300"
		:height="300"
    :noSquare="true"
		url="http://10.0.46.20:8080/upload"
		img-format="jpg"
    ></my-upload>
      </div>
     <!-- </el-col>
    </el-row>   -->
    </el-main>
  </el-container>
</template>

<script>
import API from "../api/api";
import 'babel-polyfill';
import myUpload from 'vue-image-crop-upload';
import api from '../api/api';

export default {
  data() {
    return {
      show: false,
      imgDataUrl: "",
      curImageUrl: ""
    };
  },
  components: {
    "my-upload": myUpload
  },
  methods: {
			toggleShow() {
				this.show = !this.show;
			},
            /**
			 * crop success
			 *
			 * [param] imgDataUrl
			 * [param] field
			 */
			cropSuccess(imgDataUrl, field){
                console.log('-------- crop success --------');
				
			},
			/**
			 * upload success
			 *
			 * [param] jsonData   服务器返回数据，已进行json转码
			 * [param] field
			 */
			cropUploadSuccess(jsonData, field){
				console.log('-------- upload success --------');
                console.log(jsonData);
                let imageUrl = jsonData.data.large;
                this.imgDataUrl = imageUrl;
                this.curImageUrl = imageUrl;
                console.log('field: ' + field);
                console.log('curImageUrl:',this.curImageUrl);  
                this.updateUserAvatar();            
			},
			/**
			 * upload fail
			 *
			 * [param] status    server api return error status, like 500
			 * [param] field
			 */
			cropUploadFail(status, field){
				console.log('-------- upload fail --------');
				console.log(status);
				console.log('field: ' + field);
      },

      async updateUserAvatar(){
        let uid = localStorage.getItem('USER_ID');
        console.log('uid:',uid);
        let user = {
          face: this.curImageUrl
        };
        let res = await api.updateUserInfo(uid,user);
        let rd = res.data;
        console.log(rd);
        if(rd.code === 0){
          console.log("修改成功");
          localStorage.setItem("face",this.curImageUrl);
           setTimeout(() => {
                        this.$router.go(0);
                }, 800);
        }
        else{
          console.log(rd.msg);
        }
      },
      getUserFace(){
        return localStorage.getItem("face");
      }
        
    },
    mounted(){
      this.curImageUrl = this.getUserFace();
    }
};
</script>

<style scoped>
.cur-avatar {
    width: 100px;
    height: 100px;
    margin: 0 auto;
}
</style>
<style>
.vicp-wrap{
  background-color: #07070c !important;
  width:450px !important;
}
</style>



