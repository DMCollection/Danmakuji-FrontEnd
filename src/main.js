import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./routes/router.js";


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.tap = function(x) {
        console.log(x);
        return x;
    }
    // router
new Vue({
    render: h => h(App),
    router
}).$mount("#app");