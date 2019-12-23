<template>
    <body id="app">
      <transition name="scale">
        <router-view />
        <router-view name="details" />
      </transition>
    </body>
</template>

<script>
// import MyList from "./page/list/MyList";
// import { Progress } from "element-ui";
export default {
  name: "app",
  data(){
    return {
      percentage: 0
    }
  },
  components: {
    // MyList
  },
  mounted(){
    this.percentage = 100;
  },
  beforeMount(){
    this.percentage = 75;
  },
  Created(){
    this.percentage = 50;
  },
  beforeCreate(){
    this.percentage = 25;
  }
};
</script>

<style lang="scss">
@import "./assets/css/common.scss";
html,body{
  background-color: #fff;
}
.scale-enter-active {
 animation: opacity-in .6s linear;
}
.el-progress-bar__outer{
  position: absolute;
  top:0;
  left:0;
  width:100%;
  background-color:#fff;
}
@keyframes opacity-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

