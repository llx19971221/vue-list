<template>
    <div class="cs-total">
        <cs-shadow @changeDrawerStatu="changeDrawerStatu" :openDrawer="openDrawer" :oneItem="oneItem" />
        <cs-swiper :oneItem="oneItem" />
        <cs-drawer :oneItem="oneItemDeepClone" @changeDrawerStatu="changeDrawerStatu" :openDrawer="openDrawer" />
    </div>
</template>
<script>
import SwiperLayout from "./children/SwiperLayout.vue";
import SwiperDrawer from "./children/SwiperDrawer.vue";
import ShadowBox from "@/components/ShadowBox.vue";
export default {
    name: "childSwiper",
    data() {
        this.oneItem.RollingTime = this.oneItem.RollingTime?this.oneItem.RollingTime:3000;
        return {
            oneItemDeepClone: _.cloneDeep(this.oneItem),//深拷贝，防止对象一起改变
            openDrawer: false//打开抽屉
        }
    },
    components: {
        'cs-swiper': SwiperLayout,
        'cs-drawer': SwiperDrawer,
        'cs-shadow': ShadowBox
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