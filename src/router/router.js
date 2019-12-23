import Vue from "vue";
import Router from "vue-router";
// import MyList from "../page/list/MyList.vue";
// import TestV from "../page/TestV.vue";
const Details = () => import(/* webpackChunkName: "group-TestV" */ "../page/details/Details.vue");
const MyList = () => import(/* webpackChunkName: "group-TestV" */ "../page/list/MyList.vue");
const PhoneData = () => import(/* webpackChunkName: "group-TestV" */ "../page/phone/PhonePage.vue");
Vue.use(Router);
// console.dir(Router);
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect :"/setting"
    },
    {
      path: "/setting",
      name: "",
      component: MyList
    },
    {
      path: "/setting/details",
      name: "details",
      component: Details
    },
    {
      path: "/phoneData",
      name: "phoneData",
      component: PhoneData
    },
    {
      path: "*",
      redirect :"/setting"
    },
  ]
  // routes: [
  //   {
  //     path: "/",
  //     name: "",
  //     component: 
  //   },
  //   {
  //     path: "/",
  //     name: "",
  //     // route level code-splitting
  //     // this generates a separate chunk (about.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () =>
  //       import(/* webpackChunkName: "about" */ "./views/About.vue")
  //   }
  // ]
});
