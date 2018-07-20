<template>
  <div class="pb-card-container" v-if="!isDelete">
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
        <div :class="{pending:isPending,failed: isFailed,success: isSuccess,nperfect: isNotPerfect,auditing: isAuditing}"
             style="float: right;border-radius: 5px;width: 48px;height: 21px;">
          <span>{{pbTemp.pbs_name}}</span>
        </div>
      </div>
    </div>

    <!--<br>-->
    <div class="pb-time-holder">
      <div class="pb-message" v-if="pbTemp.msg!==''">
        修改建议:{{pbTemp.msg}}
      </div>
      <br v-if="pbTemp.msg!==''">
      <div class="pb-time">
        创建时间: {{new Date(pbTemp.create_time).toLocaleString()}}
      </div>
      <br>
      <div class="pb-time">
        修改时间: {{new Date(pbTemp.modify_time).toLocaleString()}}
      </div>
    </div>
    <div class="action-btn-group-container">
      <!--<el-row>-->
      <!--<el-button v-if="postBangumi.pbs === 'SUCCESS' || postBangumi.pbs === 'AUDITING'" size="mini" class="show">设置为可见</el-button>-->
      <!--<el-button v-if="postBangumi.pbs === 'SUCCESS' || postBangumi.pbs === 'AUDITING'" size="mini" class="thumb" @click="toggleShow">设置封面</el-button>-->
      <!--<el-button v-if="postBangumi.pbs !== 'SUCCESS' || postBangumi.pbs === 'AUDITING'" size="mini" class="edit" @click="dialogVisible=true">修改</el-button>-->
      <!--<el-button size="mini" class="delete" @click="deletePostBangumi">删除</el-button>-->
      <!--</el-row>-->
      <el-dropdown >
      <span class="el-dropdown-link">
        <span style="color: #e4e4e6">操作</span><i class="el-icon-arrow-down el-icon--right" style="color: #8bc34a"></i>
      </span>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item>
            <div class="action-btn-group">
              <el-button v-if="postBangumi.pbs === 'SUCCESS' || postBangumi.pbs === 'AUDITING'" size="mini"
                         class="show">设置为可见
              </el-button>
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div class="action-btn-group">
            <el-button v-if="postBangumi.pbs === 'SUCCESS' || postBangumi.pbs === 'AUDITING'" size="mini" class="thumb"
                       @click="toggleShow">设置封面
            </el-button>
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div class="action-btn-group">
            <el-button v-if="postBangumi.pbs !== 'SUCCESS' || postBangumi.pbs === 'AUDITING'" size="mini" class="edit"
                       @click="dialogVisible=true">修改
            </el-button>
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div class="action-btn-group">
            <el-button size="mini" class="delete" @click="deletePostBangumi">删除</el-button>
            </div>
          </el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
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
        <el-form-item label="封面">
          <input type="hidden" v-model="pb.thumb">
          <el-button type="primary" size="mini" style="float: left;margin: 7px 0;border: none" @click="show=true">上传封面</el-button>
        </el-form-item>
        <el-form-item>
          <img v-show="pb.thumb" :src="pb.thumb" alt="加载不出来呢" width="100%" style="border-radius: 5px;">
        </el-form-item>
        <el-form-item style="margin-bottom: 0">
          <div class="explain-container">
            <span><strong>* 若本次提交被收录后封面仍可修改 *</strong></span><br>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small" class="cancel-btn">取 消
        </el-button>
        <el-button type="primary" size="small" @click="updatePostBangumi" class="submit-btn">确 定</el-button>
      </div>
    </el-dialog>
    <div class="upload-container" style="margin-top:50px">
      <!-- <a style="display: block;font-size: 12px;color: #99a2aa;" class="btn" @click="toggleShow">设置头像</a> -->
      <my-upload field="image"
                 @crop-success="cropSuccess"
                 @crop-upload-success="cropUploadSuccess"
                 @crop-upload-fail="cropUploadFail"
                 v-model="show"
                 :width="620"
                 :height="350"
                 :noCircle="true"
                 :url="GLOBAL.uploadURL"
                 :headers="GLOBAL.uploadHEADERS"
                 :langExt="langExtObj"
                 img-format="jpg"
      ></my-upload>
    </div>
  </div>
</template>

<script>
  import API from "../api/api";
  import 'babel-polyfill';
  import myUpload from 'vue-image-crop-upload';

  export default {
    props: ["postBangumi"],
    name: "PostBangumiCard",
    components: {
      "my-upload": myUpload
    },
    data() {
      return {
        dialogVisible: false,
        pb: {
          id: this.postBangumi.id,
          bn: this.postBangumi.bn,
          et: this.postBangumi.et,
          hzi: this.postBangumi.hzi,
          thumb:this.postBangumi.thumb
        },
        pbTemp: this.postBangumi,
        show: false,
        imgDataUrl: "",
        curImageUrl: "",
        isDelete: false,
        langExtObj: {
          preview: "封面预览"
        }
      }
    },
    computed: {
      isPending() {
        return this.pbTemp.pbs_name === "待处理";
      },
      isSuccess() {
        return this.pbTemp.pbs_name === "已采纳";
      },
      isNotPerfect() {
        return this.pbTemp.pbs_name === "待完善";
      },
      isFailed() {
        return this.pbTemp.pbs_name === "未被采纳";
      },
      isAuditing() {
        return this.pbTemp.pbs_name === "待审核";
      }
    },
    methods: {
      async updatePostBangumi() {
        console.log("pb:", this.pb);
        let res = await API.updatePostBangumi(this.pb);
        let rd = res.data;
        if (rd.code === 0) {
          this.$alert(rd.msg, '修改成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.pbTemp = rd.data;
              setTimeout(() => this.dialogVisible = false, 400);
            }
          });
          // 如果该番剧已经存在了
        } else if (rd.code === 5003) {
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
      },
      toggleShow() {
        this.show = !this.show;
      },
      cropUploadSuccess(res, field) {
        console.log('-------- upload success --------');
        console.log(res);
        let link = res.data.link;
        link = link.substring(link.lastIndexOf('/'));
        console.log("link:", link);
        this.pbTemp.thumb = this.GLOBAL.imgURL + link;
        this.pb.thumb = this.GLOBAL.imgURL + link;
        console.log('field: ' + field);
        // console.log('curImageUrl:', this.curImageUrl);

        this.updatePostBangumiThumb();
      },
      cropSuccess(imgDataUrl, field) {
        console.log('-------- crop success --------');

      },
      cropUploadFail(status, field) {
        console.log('-------- upload fail --------');
        console.log(status);
        console.log('field: ' + field);
      },
      async updatePostBangumiThumb() {
        let paramsData = {
          id: this.pbTemp.id,
          thumb: this.pbTemp.thumb
        };
        console.log("update post bangumi thumb : ", paramsData);
        let res = await API.updatePostBangumiThumb(paramsData);
        let rd = res.data;
        if (rd.code === 0) {
          this.pbTemp = rd.data;
          setTimeout(() => this.show = false, 100);
          this.$alert("修改封面需要审核，结果请留意系统通知", '封面提交成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.pbTemp = rd.data;
            }
          });
        } else {
          this.$message.error(rd.msg);
        }
      },
      deletePostBangumi() {
        this.$confirm('注意! 一旦删除将无法恢复, 本操作仅会删除个人记录, 已采纳的番剧信息将会保留', '确认删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await (API.deletePostBangumi(this.pbTemp.id));
          console.log("res:", res);
          let rd = res.data;
          if (rd.code === 0) {
            this.isDelete = true;
            this.$message.success("删除成功");
          } else {
            this.$message.error(rd.msg);
          }
        }).catch(() => {
        });
      }
    },
    async doDeletePostBangumi() {
      let res = await (API.deletePostBangumi(this.pbTemp.id));
      let rd = res.data;
      if (rd.code === 0) {
        this.isDelete = true;
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      } else {
        this.$message.error(rd.msg);
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
    width: 230px;
    display: inline-block;
    float: left;
  }

  .pb-thumb img {
    float: left;
    height: 99%;
    min-width: 99%;
    width: 99%;
    overflow: hidden;
    border-radius: 5px;
    /*margin: 15px 15px 15px 15px;*/
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
    color: cadetblue;
    height: 18px;
    margin-bottom: 5px;
  }

  .action-btn-group-container {
    float: right;
    display: inline-block;
    margin-top: 25px;
    margin-right: 15px;
  }

  .action-btn-group {

  }

  .el-dropdown-menu__item{
    padding: 0 10px;
  }

  .action-btn-group button {
    border: none;
    background-color: #264452;
    color: #e4e4e6;
    width: 100%;
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

  .auditing {
    background-color: #f56c6c;
  }

  .el-message-box {
    border: none;
  }

  .cancel-btn {
    background-color: #e2e2e2;
    border: none;
  }

  .cancel-btn:active {
    background-color: #CBCBCB;
  }

  .submit-btn {
    border: none;
  }

  .el-message-box {
    border: none;
  }
</style>