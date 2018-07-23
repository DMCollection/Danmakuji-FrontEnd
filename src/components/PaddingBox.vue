<template>
    <div class="paging-box">
        <el-pagination v-show="view_more"
                small
                @current-change="targetPageSub"
                :current-page.sync="root_reply.reply.cur_page"
                :page-size="10"
                :pager-count="11"
                layout="prev, pager, next"
                :total="root_reply.reply.totalSize">
        </el-pagination>
        </div>
</template>

<script>
import API from "../api/api"
export default {
    props: ["sub_replies", "root_reply","view_more","sub_page"],
    data(){
        return {
        }
    },
    methods:{
        async loadSubReplies(prid,pn){
            this.tap("load subReplies, prid:"+prid+" pn:"+pn);
            let res = (await API.getSubReplies(prid,pn));
            let resData =  res.data;
            console.log("subReplies data:",resData);
            return resData;
        },
        async targetPageSub(val){
            this.tap("targer page sub invoked!");
            this.root_reply.reply.cur_page = val;
            let prid = this.root_reply.reply.reply.replyId;
            let resData = (await this.loadSubReplies(prid,val));
            let subReplies = resData.data.replies;
            this.$emit("changeSubRepliesPage",subReplies);
        }
    }
}
</script>

<style scoped>
.paging-box {
    font-size: 12px;
}
</style>
