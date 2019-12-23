import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./vuex/store";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
// import "swiper/css/swiper.css";
Vue.config.productionTip = false;
Vue.prototype.Nprogress=Nprogress;
Nprogress.configure({
  showSpinner: false, // 是否显示加载ico    
})
router.beforeEach((to,from,next)=>{
  // console.log("be",to,from);
  
  next();
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
