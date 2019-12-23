<template>
    <div class="fm-father">
        <fm-shadow @changeDrawerStatu="changeDrawerStatu" :openDrawer="openDrawer" :oneItem="oneItem" />
        <fm-drawer :oneItem="oneItemDeepClone" @changeDrawerStatu="changeDrawerStatu" :openDrawer="openDrawer" />
        <fm-swiper :oneItem="oneItem"/>
    </div>
</template>
<script>
import FmSwiper from "./children/FmSwiper.vue";
import ShadowBox from "@/components/ShadowBox.vue";
import fmDrawer from "./children/fmDrawer.vue";
export default {
    name: "functionalModule",
    data() {
        return {
            oneItemDeepClone: _.cloneDeep(this.oneItem),//深拷贝，防止对象一起改变
            openDrawer: false//打开抽屉
        }
    },
    components: {
        'fm-swiper': FmSwiper,
        'fm-drawer': fmDrawer,
        'fm-shadow': ShadowBox
    },
    props: ['oneItem'],
    methods: {
        changeDrawerStatu(e,cloneDeepOneItem){//抽屉开关,如果没有保存，就不能变
            this.oneItemDeepClone = cloneDeepOneItem;
            this.openDrawer = e;
        }
    }
}
</script>
<style lang="scss">
    .fm-father{
        .md-swiper-indicator{
            width:15px;
            height:2px;
            margin: 0;
            padding:0;
        }
        
        .md-swiper-indicator-active{
            background-color: #0ae;
        }
    }
    .fm-drawer{
        .md-swiper-indicator{
            width:15px;
            height:2px;
            margin: 0;
            padding:0;
        }
        
        .md-swiper-indicator-active{
            background-color: #0ae;
        }
    }
    
</style>