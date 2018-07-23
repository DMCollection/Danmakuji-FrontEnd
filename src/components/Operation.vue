<template>
  <div class="operation">
    <el-popover
            popper-class="del-pop"
            placement="bottom"
            trigger="click"
            v-model="visible1"
    >
      <div v-if="r_uid === uid" class="del-self">
        <el-popover
                placement="top"
                width="160"
                v-model="visible2"
                >
          <p>这是一段内容这是一段内容确定删除吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
            <el-button type="primary" size="mini" @click="deleteReply(reply_id)">确定</el-button>
          </div>
          <el-button @click="visible1 = false" size="small" type="text" slot="reference" class="oper-item">删除</el-button>
        </el-popover>
        <!--<div @click="deleteReply(reply_id)" class="oper-item">删除</div>-->
      </div>
      <div v-else>
        <!--<div class="oper-item">加入黑名单</div>-->
        <div class="oper-item">举报</div>
      </div>
      <el-button slot="reference"
                 icon="el-icon-more"
                 style="float: right;padding: 2px 0;color:#999;transform: rotate(90deg);font-size:18px"
                 type="text"
      >
      </el-button>
    </el-popover>
  </div>
</template>

<script>
  import API from "../api/api"
  export default {
    props: ["root","r_uid", "reply_id","index"],
    data() {
      return {
        displayOper: {
          display: "none"
        },
        uid: "",
        visible1: false,
        visible2: false
      }
    },
    methods: {
      async deleteReply(rid){
        let res = await API.deleteReply(rid);
        if (res.data.code === 0) {
          console.log("删除成功，rid:" + rid);
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "success"
          });
          if(this.root){
            console.log("root reply, ready to del,",this.index);
            this.$emit("delRootReply",this.index);
          }
          else {
            console.log("sub reply, ready to del,",this.index);
            this.$emit("delSubReply",this.index)
          }
        } else {
          this.$message({
            showClose: true,
            message: res.data.msg,
            type: "error"
          });
        }
        this.visible2 = false;
      }
    },
    created() {
      let uid = localStorage.getItem("USER_ID");
      if(uid){
        this.uid = uid;
      }
    }
  }
</script>

<style scoped>
  .oper-item {
    cursor: pointer;
  }
  .del-self div:hover {
    background: #e5e9ef;
    color: #00a1d6;
  }

  .bb-comment .comment-list .list-item .info .operation {
    position: relative;
    width: 18px;
    float: right;
    margin-right: 0;
  }
</style>
