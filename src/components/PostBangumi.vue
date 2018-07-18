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
    </el-scrollbar>
  </div>


</template>

<script>
  import infiniteScroll from "vue-infinite-scroll";
  import PostBangumiCard from "../components/PostBangumiCard";

  import API from "../api/api";

  export default {
    name: "PostBangumi",
    components: {
      postBangumiCard: PostBangumiCard,

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
      }
    },
    directives: {
      infiniteScroll
    },
    methods: {
      async initPostBangumi() {
        let uid = localStorage.getItem("USER_ID");
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
          doGetPostBangumiList();
        }
      }
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