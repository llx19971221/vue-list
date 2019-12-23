<template>
    <div class="ar-total">
        <ar-shadow @changeDrawerStatu="changeDrawerStatu" :openDrawer="openDrawer" :oneItem="oneItem" />
        <ar-layout :oneItem="oneItem" />
        <ar-drawer :openDrawer="openDrawer" :oneItem="oneItemDeepClone" @changeDrawerStatu="changeDrawerStatu"/>
    </div>
</template>
<script>
import ShadowBox from "@/components/ShadowBox.vue";
import AcitivityLayout from "./children/ActivityRecommendLayout.vue";
import AcitivityDrawer from "./children/ActivityRecommendDrawer.vue";
export default {
    name: "activityRecommend",
    data() {
        return {
            oneItemDeepClone: _.cloneDeep(this.oneItem),//深拷贝，防止对象一起改变
            openDrawer: false//打开抽屉
        }
    },
    components: {
        'ar-layout': AcitivityLayout,
        'ar-shadow': ShadowBox,
        'ar-drawer': AcitivityDrawer
    },
    methods: {
        changeDrawerStatu(e,cloneDeepOneItem){//抽屉开关,如果没有保存，就不能变
            this.oneItemDeepClone = cloneDeepOneItem;
            this.openDrawer = e;
        }
    },
    props:[ 'oneItem']
}
</script>