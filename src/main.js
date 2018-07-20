import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./routes/router.js";
import global from "./global/global";

// import axios from 'axios'

// Vue.prototype.$axios = axios.create({
//     baseURL: '/api/'
// })

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.tap = function(x) {
  console.log(x);
  return x;
};
Vue.prototype.GLOBAL = global;
// router
new Vue({
  render: h => h(App),
  router
}).$mount("#app");
