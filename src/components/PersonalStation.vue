<template>
    <div class="persondiv" style="width:980px;margin:0 auto;">
        <el-container style="height: 800px; border-radius:5px">
  <el-aside style="margin-right:20px;background-color:#262633;" width="200px">
    <el-menu style="background-color:#262633;border:0" :default-active="pactiveIndex">
        <router-link :to="{name:'avatar'}"><el-menu-item class="nav-item" index="1">头像信息</el-menu-item></router-link>
        <router-link :to="{name:'personal'}"><el-menu-item class="nav-item" index="2">个人资料</el-menu-item></router-link>
        <router-link :to="{name:'security'}"><el-menu-item class="nav-item" index="3">账号安全</el-menu-item></router-link>
    </el-menu>
  </el-aside>
  
  <el-container style="overflow:inherit;background-color:#262633;">
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
    </div>
</template>

<script>
import AvatarInfo from "./AvatarInfo.vue"
import Personal from "./PersonDetailInfo.vue"
import Security from "./SecurityInfo.vue"

export default {
  data() {
    return {
      pactiveIndex:"1"
    };
  },
  components: {
    AvatarInfo,
    Personal,
    Security
  },
  methods: {
			
		}
};
</script>

<style scoped>
.nav-item{
  color: #149287;
}
</style>

