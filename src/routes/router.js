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

Vue.use(VueRouter);

const routes = [
    { path: "/", name: "HelloWorld", component: HelloWorld },
    { path: "/video", name: "video", component: WatchVideo },
    { path: "/register", name: "register", component: Register},
    { path: "/login", name: "login", component: Login},

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
      

];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    // mode: 'history',
    routes // （缩写）相当于 routes: routes
});



export default router;