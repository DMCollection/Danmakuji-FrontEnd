<template>
    <div class="email-verify">
        <div class="verify-result">
            {{verifyResult.result}}
        </div>

        <div style="margin-top:40px;">
            <el-button type="primary">回到首页</el-button>
        </div>
    </div>
</template>

<script>
import API from "../api/api";

export default {
    data(){
        return {
            verifyResult:{
                code: 1,
                result: ""
            }
        }
    },
    methods:{
        async verifyEmailAddr(uid,key){
            let res = await API.verifyEmail(uid,key);
            let rd = res.data;
            console.log("rd:",rd);
            this.verifyResult.code = rd.code;
            this.verifyResult.result = rd.msg;
        }
    },
    created(){
        let userId = this.$route.query.userId;
        let uuid = this.$route.query.uuid;
        console.log("userId:",userId);
        console.log("uuid:",uuid);
        if(userId && uuid){
            this.verifyEmailAddr(userId,uuid); 
        }
        else{
            this.verifyResult.result = "邮箱验证失败";      
        }
    }
}
</script>

<style scoped>
.email-verify {
    min-height: 700px;
}
.verify-result {
    text-align: center;
    color: #20968b;
    font-size: 18px;
    margin-top: 100px;
}
</style>
