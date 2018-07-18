<template>
  <div class="pb-card-container">
    <div class="pb-thumb">
      <img :src="pbTemp.thumb?pbTemp.thumb:'/static/2.jpg'" alt="暂无封面">
    </div>
    <div class="pb-card-header">
      <div class="pb-name">
        <h2>{{pb.bn}}</h2>
      </div>
      <div class="pb-episode">
        <span> <span style="color: cadetblue"> | </span> 共{{pbTemp.et}}集</span>
      </div>
      <div class="pb-status">
        状态:
        <div :class="{pending:isPending,failed: isFailed,success: isSuccess,nperfect: isNotPerfect}"
             style="float: right;border-radius: 5px;width: 48px;height: 21px;">
          <span>{{pbTemp.pbs_name}}</span>
        </div>
      </div>
    </div>
    <div class="pb-message" v-if="pbTemp.msg!==''">
      修改建议:{{pbTemp.msg}}
    </div>
    <br>
    <div class="pb-time-holder">
      <div class="pb-time">
        创建时间: {{new Date(pbTemp.create_time).toLocaleString()}}
      </div>
      <br>
      <div class="pb-time">
        修改时间: {{new Date(pbTemp.modify_time).toLocaleString()}}
      </div>
    </div>
    <div class="action-btn-group">
      <el-row>
        <el-button v-if="postBangumi.pbs === 'SUCCESS'" size="mini" class="show">设置为可见</el-button>
        <el-button v-if="postBangumi.pbs === 'SUCCESS'" size="mini" class="thumb">设置封面</el-button>
        <el-button v-if="postBangumi.pbs !== 'SUCCESS'" size="mini" class="edit" @click="dialogVisible=true">修改</el-button>
        <el-button size="mini" class="delete">删除</el-button>
      </el-row>
    </div>
    <el-dialog title="修改番剧信息" :visible.sync="dialogVisible" width="550px">
      <el-form>
        <el-form-item class="post-bangumi-explain">
          <div class="explain-container">
            <span><strong>* 番剧名称定义需要按照以下规则</strong></span><br>
            <span>- 番剧名称以百度百科为准</span><br>
            <span>- 第一个季度直接采取该名称,例如「darker」</span><br>
            <span>- 多个季度,则以「番剧名称+空格+第几季」命名,例如「darker 第二季」</span><br>
            <span>- sp,ova,剧场版规则与以上规则一致,例如「darker ova」</span><br>
            <span>- 当然也不仅限于番剧,电影也是一样可以的</span>
          </div>
        </el-form-item>
        <el-form-item label="番剧名称" label-width="140">
          <el-input auto-complete="off" v-model="pb.bn"
                    style="width: 350px;display: inherit;"></el-input>
        </el-form-item>
        <el-form-item label="是否有第0集">
          <div style="float: left;margin-left: 20px;">
            <el-radio-group v-model="pb.hzi" size="small" text-color="#141422">
              <el-radio border :label="0">没有</el-radio>
              <el-radio border :label="1">有</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item style="margin-bottom: 0">
          <div class="explain-container">
            <span>* 若剧场版或电影则集数为「1」</span><br>
          </div>
        </el-form-item>
        <el-form-item label="总集数" label-width="120">
          <el-input type="text" v-model="pb.et" style="width: 80px;display: inherit;"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 0">
          <div class="explain-container">
            <span><strong>* 若本次提交被收录后可按个人喜好设置该作封面 *</strong></span><br>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small" class="cancel-btn">取 消
        </el-button>
        <el-button type="primary" size="small" @click="updatePostBangumi" class="submit-btn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import API from "../api/api";

  export default {
    props: ["postBangumi"],
    name: "PostBangumiCard",
    components:{
    },
    data() {
      return {
        dialogVisible:false,
        pb: {
          id: this.postBangumi.id,
          bn: this.postBangumi.bn,
          et: this.postBangumi.et,
          hzi: this.postBangumi.hzi
        },
        pbTemp:this.postBangumi,
      }
    },
    computed: {
      isPending() {
        return this.postBangumi.pbs_name === "待处理";
      },
      isSuccess() {
        return this.postBangumi.pbs_name === "已采纳";
      },
      isNotPerfect() {
        return this.postBangumi.pbs_name === "待完善";
      },
      isFailed() {
        return this.postBangumi.pbs_name === "未被采纳";
      },
    },
    methods: {
      async updatePostBangumi(){
        console.log("pb:",this.pb);
        let res = await API.updatePostBangumi(this.pb);
        let rd = res.data;
        if (rd.code === 0) {
          this.$alert(rd.msg, '修改成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.pbTemp = rd.data;
              setTimeout(()=> this.dialogVisible = false,400);
            }
          });
          // 如果该番剧已经存在了
        } else if (rd.code===5003){
          this.$alert(rd.msg, '提示', {
            confirmButtonText: '确定',
          });
        } else {
          this.$alert(rd.msg, '参数有误', {
            confirmButtonText: '确定',
            callback: action => {
              console.log(action);
            }
          });
        }
      }
    },
    created() {

    }
  }
</script>

<style scoped>
  .pb-card-container {
    width: 100%;
    border: 1px solid #3a3a48;
    height: 130px;
    border-radius: 5px;
    box-shadow: 3px 0 14px;
    margin-bottom: 18px;
  }

  .pb-thumb {
    height: 130px;
    width: 80px;
    display: inline-block;
    float: left;
  }

  .pb-thumb img {
    float: left;
    height: 99%;
    min-width: 99%;
    width: 99%;
    overflow: hidden;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .pb-name {
    float: left;
    margin-left: 15px;
  }

  .pb-name h2 {
    font-weight: 400;
    font-size: 17px;
    margin: 0;
    color: #e4e4e6;
  }

  .pb-episode {
    padding: 0;
    margin-left: 5px;
    float: left;
    color: #e4e4e6;
  }

  .pb-card-header {
    height: 25px;
    padding: 10px;
  }

  .pb-status {
    float: right;
    margin-right: 15px;
    color: #e4e4e6;
  }

  .pb-status-text {
    border-radius: 5px;
  }

  .pb-status span {
    color: #e4e4e6;
    font-size: 14px;
  }

  .pb-time {
    float: left;
    height: 18px;
    margin-bottom: 5px;
    margin-top: 5px;
    font-size: 13px;
    color: #99a2aa;
  }

  .pb-time-holder {
    height: 60px;
    margin-left: 15px;
    display: inline-block;
    float: left;
    padding-top: 3px;
  }

  .pb-message {
    float: left;
    margin-left: 15px;
    color: cadetblue;
    height: 18px;
  }

  .action-btn-group {
    float: right;
    display: inline-block;
    margin-top: 25px;
    margin-right: 15px;
  }

  .action-btn-group button {
    border: none;
    background-color: #264452;
    color: #e4e4e6;
  }

  .action-btn-group button:hover {
    background-color: #5c889c;
  }

  .action-btn-group button:active {
    background-color: #253840;
  }

  .action-btn-group .delete {
    background-color: #b72d2d;
  }

  .action-btn-group .delete:hover {
    background-color: #e23b3b;
  }

  .action-btn-group .delete:active {
    background-color: #840101;
  }

  .pending {
    background-color: #a77427;
  }

  .success {
    background-color: #367b13;
  }

  .nperfect {
    background-color: #3580ce;
  }

  .failed {
    background-color: #9e0c0c;
  }
  .el-message-box{
    border: none;
  }

  .cancel-btn{
    background-color: #e2e2e2;
    border:none;
  }

  .cancel-btn:active{
    background-color: #CBCBCB;
  }
  .submit-btn{
    border: none;
  }
</style>