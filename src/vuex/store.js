import Vue from "vue";
import Vuex from "vuex";
import list from "./list/myList";
import details from "./detail/detail";
Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    myList:list,
    myDetail:details
  }
});
