<template>
  <div class="post-bangumi-container">
    <el-scrollbar style="height: 100%">
      <div class="pb-header">
        <div class="left">
          <h2 class="pb-header-title">全部提交</h2>
          <span class="num">(12)</span>
        </div>
        <div class="right">
          <el-select v-model="value" @change="getPostBangumiByStatus">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="action-bar">
        <div class="new-post-bangumi">
          <el-badge value="hot" class="item">
            <el-button size="mini" @click="dialogVisible=true" class="new-pb-btn">提交番剧信息</el-button>
          </el-badge>
        </div>
        <div class="bar-search">
          <el-input
                  v-model="searchBangumiName"
                  @keyup.enter.native="searchByBn"
                  @blur="cancelSearch"
                  placeholder="请输入番剧名称"
                  size="mini"
                  class="bar-search-input">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="bar-time-sort">
          <el-select v-model="timeSort" @change="getPostBangumiByTimeSort" size="mini" value="0">
            <el-option value="0" label="创建时间"></el-option>
            <el-option value="1" label="修改时间"></el-option>
          </el-select>
        </div>
      </div>

      <div class="pb-content">
        <post-bangumi-card v-for="postBangumi in postBangumiList" :post-bangumi="postBangumi"
                           :key="postBangumi.id"></post-bangumi-card>
        <div v-if="postBangumiList.length === 0">
          <h2>暂无信息</h2>
        </div>
        <div class="page-container" v-if="postBangumiList.length!==0">
          <el-pagination
                  :current-page="pageInfo.pageNumber"
                  :page-size="pageInfo.pageSize"
                  layout="prev, pager, next"
                  :total="pageInfo.totalSize"
                  @current-change="changePage"
          >
          </el-pagination>
        </div>
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
            <el-input auto-complete="off" v-model="postBangumi.bangumiName"
                      style="width: 350px;display: inherit;"></el-input>
          </el-form-item>
          <el-form-item label="是否有第0集">
            <div style="float: left;margin-left: 20px;">
              <el-radio-group v-model="postBangumi.hasZeroIndex" size="small" text-color="#141422">
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
            <el-input type="text" v-model="postBangumi.episodeTotal" style="width: 80px;display: inherit;"></el-input>
          </el-form-item>
          <el-form-item label="封面">
            <input type="hidden" v-model="postBangumi.thumb">
            <el-button type="primary" size="mini" style="float: left;margin: 7px 0;border: none" @click="show=true">上传封面</el-button>
          </el-form-item>
          <el-form-item>
            <img v-show="postBangumi.thumb" :src="postBangumi.thumb" alt="加载不出来呢" width="100%" style="border-radius: 5px;">
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
          <el-button type="primary" size="small" @click="sendPostBangumiInfo" class="submit-btn">确 定</el-button>
        </div>
      </el-dialog>
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
    </el-scrollbar>
  </div>


</template>

<script>
  import infiniteScroll from "vue-infinite-scroll";
  import PostBangumiCard from "../components/PostBangumiCard";
  import 'babel-polyfill';
  import myUpload from 'vue-image-crop-upload';
  import API from "../api/api";

  export default {
    name: "PostBangumi",
    components: {
      postBangumiCard: PostBangumiCard,
      myUpload:myUpload

    },
    data() {
      return {
        pageInfo: [],
        busy: false,
        postBangumiList: [],
        options: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '待处理'
        }, {
          value: '2',
          label: '已采纳'
        }, {
          value: '3',
          label: '待完善'
        }, {
          value: '4',
          label: '未被采纳'
        }, {
          value: '5',
          label: '待审核'
        }],
        value: '0',
        timeSort: '0',
        searchBangumiName: '',
        pbParams: {
          pn: 1,
          ps: 10,
          sc: '',
          pbsc: '',
          pc: '',
          dc: '',
          bn: ''
        },
        dialogVisible:false,
        postBangumi: {
          bangumiName: "",
          episodeIndex: "",
          hasZeroIndex: 0,
          thumb:''
        },
        show:false,
        langExtObj:{
          preview:"封面预览"
        },
      }
    },
    directives: {
      infiniteScroll
    },
    methods: {
      async initPostBangumi() {
        let res = await API.getUserPostBangumi(this.pbParams);
        let rd = res.data;
        if (rd.code === 0) {
          this.postBangumiList = rd.data.postBangumi;
          this.pageInfo = rd.data.page;
        } else {
        }
      },
      async getPostBangumiByStatus() {
        let val = this.value;
        if (val === '0') {
          this.pbParams.pbsc = '';
        } else {
          this.pbParams.pbsc = val;
        }
        this.pbParams.pn = 1;
        this.doGetPostBangumiList();
      },
      async changePage(p) {
        this.pbParams.pn = p;
        let res = await API.getUserPostBangumi(this.pbParams);
        let rd = res.data;
        if (rd.code === 0) {
          this.postBangumiList = rd.data.postBangumi;
          this.pageInfo = rd.data.page;
        }
      },
      async getPostBangumiByTimeSort() {
        this.pbParams.pc = this.timeSort;
        this.pbParams.pn = 1;
        this.doGetPostBangumiList();
      },
      async doGetPostBangumiList() {
        let res = await API.getUserPostBangumi(this.pbParams);
        let rd = res.data;
        if (rd.code === 0) {
          this.postBangumiList = rd.data.postBangumi;
          this.pageInfo = rd.data.page;
        } else {
          this.$message.error(rd.msg);
        }
      },
      async searchByBn() {
        this.pbParams.bn = this.searchBangumiName;
        this.pbParams.pn = 1;
        this.doGetPostBangumiList();
      },
      async cancelSearch() {
        if (this.searchBangumiName === '') {
          this.pbParams.pn = 1;
          this.doGetPostBangumiList();
        }
      },
      async sendPostBangumiInfo() {
        let bangumiName = this.postBangumi.bangumiName;
        let episodeTotal = this.postBangumi.episodeTotal;
        let hasZeroIndex = this.postBangumi.hasZeroIndex;

        let postBangumiInfo = {
          "bangumiName": bangumiName,
          "episodeTotal":episodeTotal,
          "hasZeroIndex":hasZeroIndex,
          "thumb":this.postBangumi.thumb
        };
        console.log("sendPostBangumiInfo",postBangumiInfo);

        let rd = (await API.sendPostBangumi(postBangumiInfo)).data;
        if (rd.code === 0) {
          this.$alert(rd.msg, '提交成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.postBangumi.bangumiName = "";
              this.postBangumi.episodeTotal = "";
              this.postBangumi.hasZeroIndex = 0;
              setTimeout(()=> this.dialogVisible = false,400);
              this.postBangumiList.unshift(rd.data);
            }
          });
          // 如果该番剧已经存在了
        } else if (rd.code===5003){
          this.$alert(rd.msg, '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.postBangumi.bangumiName = "";
              this.postBangumi.episodeTotal = "";
              this.postBangumi.hasZeroIndex = 0;
            }
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
      cropUploadSuccess(res, field) {
        console.log('-------- upload success --------');
        console.log(res);
        let link = res.data.link;
        link = link.substring(link.lastIndexOf('/'));
        console.log("link:", link);
        this.postBangumi.thumb = this.GLOBAL.imgURL + link;
        console.log('field: ' + field);
        // console.log('curImageUrl:', this.curImageUrl);
      },
      cropSuccess(imgDataUrl, field) {
        console.log('-------- crop success --------');

      },
      cropUploadFail(status, field) {
        console.log('-------- upload fail --------');
        console.log(status);
        console.log('field: ' + field);
      },
    },
    created() {
      this.initPostBangumi();
    }
  }
</script>


<style scoped>
  .post-bangumi-container {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    height: 100%;
    animation: ShowVideo 0.4s;
  }

  .pb-header {
    color: #e4e4e6;
    height: 65px;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;
  }

  .pb-header-title {
    font-weight: 400;
    font-size: 20px;
    display: inline-block
  }

  .right{
    width: 200px;
  }

  .left .num {
    position: relative;
    bottom: -1px;
    font-size: 12px;
    color: #99a2aa;
  }

  .pb-header .left {
    float: left;
  }

  .pb-header .right {
    float: right;
  }

  .el-select {
    margin: 15px 0;
  }

  .action-bar {
    height: 30px;
    margin: 20px 20px 50px;
  }

  .new-post-bangumi{
    /*display: inline-block;*/
    float: left;
    margin: 15px 0;
  }
  .new-pb-btn{
    border: none;
    background-color: #3f51b5;
    color: #e4e4e6;
  }
  .new-pb-btn:hover{
    background-color: #5467b5;
  }
  .new-pb-btn:active{
    background-color: #364bb5;
  }

  .bar-time-sort {
    float: right;
    margin-right: 15px;
    width: 100px;
  }

  .bar-search {
    float: right;
    margin: 15px 0;
  }

  .bar-search-input {
    width: 200px;
    border: none;
  }

  .pb-content {
    margin: 25px;
  }

</style>
<style>
  .el-scrollbar__wrap {
    overflow-x: hidden;
    margin-bottom: 0 !important;
  }

  /*.page-container button{*/
  /*background-color: white!important;*/
  /*}*/
  .page-container .el-pagination .btn-prev {
    background-color: #262633;
    color: #e4e4e6;
  }

  .page-container .el-pagination .btn-prev:hover {
    color: #37c8f7;
  }

  .page-container .el-pagination .number {
    background-color: #262633;
  }

  .page-container .el-pagination .btn-next {
    background-color: #262633;
    color: #e4e4e6;
  }

  .page-container .el-pagination .btn-next:hover {
    color: #37c8f7;
  }

  /*.page-container .el-pagination button:disabled {*/
  /*background-color: #262633;*/
  /*}*/
  .page-container .el-pager li {
    color: #e4e4e6;
    min-width: 28px;
    margin: 0 3px;
  }

  .page-container .el-pager li:hover {
    /*color: darkred;*/
    background-color: #37c8f7;
    border-radius: 50%;
  }

  .page-container .el-pager li.active {
    border-radius: 50%;
    background-color: #37c8f7;
  }

</style>