import Vue from "vue";

import VueRouter from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import WatchVideo from "../components/WatchVideo.vue";
import Register from "../components/Register.vue";
import PersonalStation from "../components/PersonalStation.vue";
import AvatarInfo from "../components/AvatarInfo.vue";
import Login from "../components/Login.vue";
import Personal from "../components/PersonDetailInfo.vue";
import Security from "../components/SecurityInfo.vue";
import MessageStation from "../components/MessageStation.vue";
import SystemNotice from "../components/SystemNotice.vue";
import ReplyNotice from "../components/ReplyNotice.vue";
import AtNotice from "../components/AtNotice.vue";
Vue.use(VueRouter);

const routes = [
    { path: "/", name: "HelloWorld", component: HelloWorld },
    { path: "/video", name: "video", component: WatchVideo },
    { path: "/register", name: "register", component: Register},
    { path: "/login", name: "login", component: Login},
    { path: "/video/:epid", name: "video", component: WatchVideo },

    // { path: "/space", name: "space", component: PersonalStation},
    // { path: "/space/avatar",name: "avatar",component: AvatarInfo},
    {
        path: '/space',
        component: PersonalStation,
        name: 'space',
        children: [
            { path: 'avatar', component: AvatarInfo, name: 'avatar' },
            { path: 'personal', component: Personal, name: 'personal' },
            { path: 'security', component: Security, name: 'security' }
            // { path: 'personalInfo', component: PersonalInfo, name: '个人信息' }
        ]
      },
      {
          path: '/message',
          component: MessageStation,
          name: 'message',
          children: [
              {path: 'snotice', component: SystemNotice, name: 'snotice'},
              {path: 'rnotice', component: ReplyNotice, name: 'rnotice'},
              {path: 'anotice', component: AtNotice, name: 'anotice'}
          ]

      }
      

];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    // mode: 'history',
    routes // （缩写）相当于 routes: routes
});



export default router;