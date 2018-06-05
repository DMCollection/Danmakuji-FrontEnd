<template>
    <div class="paging-box">
        <!-- <span class="result">共28页</span>
        <span class="disabled">上一页</span>
        <span class="current">1</span>
        <a href="javascript:;" class="tcd-number">2</a>
        <a href="javascript:;" class="tcd-number">3</a>
        <a href="javascript:;" class="tcd-number">4</a>
        <span class="dian">...</span><a href="javascript:;" class="tcd-number">28</a>
        <a href="javascript:;" class="next">下一页</a> -->
        <el-pagination v-if="view_more"
                small
                @current-change="targetPageSub"
                @prev-click="prevPageSub"
                @next-click="nextPageSub"
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
    props: ["sub_replies", "root_reply","view_more"],
    data(){
        return {
            curPage: 1
        }
    },
    methods:{
        async loadSubReplies(prid,pn){
            this.tap("load subReplies, prid:"+prid+" pn:"+pn);
            let res = (await API.getSubReplies(prid,pn));
            let resData =  res.data;
            return resData;
        },
        async targetPageSub(val){
            this.tap("targer page sub invoked!");
            this.curPage = val;
            let prid = this.root_reply.reply.reply.replyId;
            let resData = (await this.loadSubReplies(prid,val));
            let subReplies = resData.data.replies;
            this.$emit("changeSubRepliesPage",subReplies);
        },
        async prevPageSub(){
            this.tap("prevPageSub invoked!");
            let prid = this.root_reply.reply.reply.replyId;
            this.curPage = this.curPage -1;
            let pn = this.curPage;
            let resData = (await this.loadSubReplies(prid,pn));
            let subReplies = resData.data.replies;
            this.$emit("changeSubRepliesPage",subReplies);
        },
        async nextPageSub(){
            this.tap("nextPageSub invoked!");
            let prid = this.root_reply.reply.reply.replyId;
            this.curPage = this.curPage + 1;
            let pn = this.curPage;
            let resData = (await this.loadSubReplies(prid,pn));
            let subReplies = resData.data.replies;
            this.$emit("changeSubRepliesPage",subReplies);
        }
    }
}
</script>

<style>
.paging-box {
    font-size: 12px;
}
/* .paging-box .result {
    padding-right: 10px;
}
.paging-box .disabled {
    display: none;
}
.paging-box .current {
    color: #00a1d6;
    font-weight: 700;
}
.paging-box .current, .paging-box .dian, .paging-box .next, .paging-box .prev, .paging-box .tcd-number {
    color: #222;
    cursor: pointer;
    text-align: center;
    margin: 0 4px;
    text-decoration: none;
    line-height: 26px;
} */
</style>
