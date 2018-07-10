<template>
    <div class="message-div" style="width:980px;margin:0 auto;">
  <el-container style="min-height: 800px; border-radius:5px">
  <el-aside style="margin-right:20px;background-color:#262633;" width="200px">
      <div class="msg-icon"></div>
      <div class="msg-station">消息中心</div>
    <el-menu style="background-color:#262633;border:0" :default-active="pactiveIndex">
        <!-- <ul class="nav-list">
            <li class="nl-item" @click="changeMsgTypeTitle('系统通知')">
                <router-link :to="{name:'snotice'}">
                    系统通知
        </router-link>
            </li>
            <li class="nl-item" @click="changeMsgTypeTitle('回复我的')">
                 <router-link :to="{name:'rnotice'}">回复我的
        </router-link>
            </li>
            <li class="nl-item" @click="changeMsgTypeTitle('@我的')">
                <router-link :to="{name:'anotice'}">@我的
                </router-link>  
            </li>
        </ul> -->
        <router-link :to="{name:'snotice'}">
            <el-menu-item @click="changeMsgTypeTitle('系统通知')" class="nav-item" index="1">系统通知</el-menu-item>
        </router-link>
           
        <router-link :to="{name:'rnotice'}">
            <el-menu-item  @click="changeMsgTypeTitle('回复我的')" class="nav-item" index="2">回复我的 </el-menu-item>
        </router-link>
           
        <router-link :to="{name:'anotice'}">
            <el-menu-item @click="changeMsgTypeTitle('@我的')" class="nav-item" index="3">@我的</el-menu-item>
        </router-link>

        <router-link :to="{name:'lnotice'}">
            <el-menu-item @click="changeMsgTypeTitle('收到的赞')" class="nav-item" index="4">收到的赞</el-menu-item>
        </router-link> 
    </el-menu>
  </el-aside>
  
  <el-container style="overflow:inherit;">
      
      <el-header style="background-color:#262633;margin-bottom:10px;height:50px;">
          <p class="msg-type-title">{{msgType}}</p>
      </el-header>
    
    <el-main style="padding:0">
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
    </div>
</template>

<script>
import SystemNotice from "./SystemNotice.vue";
import ReplyNotice from "./ReplyNotice.vue";
import AtNotice from "./AtNotice.vue";
export default {
  data() {
    return {
      pactiveIndex:"1",
      msgType: '系统通知'
    };
  },
  components: {
    SystemNotice,
    ReplyNotice,
    AtNotice
  },
  methods: {
      changeMsgTypeTitle(type){
          this.msgType = type;
      },
      getParams(){
          let type = this.$route.params.type;
          console.log("get params msgType:",type);
          if(type){
              this.msgType = type;
          }
          else{
              console.log('no type from params!');
          }
          
      }
  },
  watch:{
      '$route': 'getParams'
  },
  mounted(){
      let t = this.$route.params.type;
      if(t){
          console.log('change type to:',t);
          this.msgType = t;
      }
  }
};
</script>

<style scoped>
.nav-item{
  color: #149287;
}
.msg-station{
    margin: 20px;
    color: #149299
}
.nav-list{
    margin: 0;
    padding: 0 0 0 20px;
    list-style-type: none;
    display: block;
}
.msg-type-title{
    color: #149299;
    width: 100px;
}
/* .msg-icon {
    width: 14px;
    height: 16px;
    margin-right: 10px;
    background: url(data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='12' viewBox='0 0…0 0 .322.151l1.429-1.112z' fill='%23333' fill-rule='evenodd'/%3E%3C/svg%3E) 50%/contain no-repeat;
} */
/* .nl-item{
    height: 40px;
    position: relative;
    color: #149287;;
}
.nav-list li:before {
    content: "\25CF";
    line-height: 20px;
}
.nl-item:before {
    width: 10px;
    height: 20px;
    text-align: center;
}
.nl-item a{
    padding-left: 10px;
    line-height: 40px;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-decoration: none;
} */
</style>

