<template>
    <div class="ht-father">
        <ht-shadow @changeDrawerStatu="changeDrawerStatu" :openDrawer="openDrawer" :oneItem="oneItem" />
        <ht-titleLayout :oneItem="oneItem"/>
        <ht-drawer :openDrawer="openDrawer" :oneItem="oneItemDeepClone" @changeDrawerStatu="changeDrawerStatu"/>
    </div>
</template>
<script>
import ShadowBox from "@/components/ShadowBox.vue";
import TitleLayout from "./children/TitleLayout.vue";
import HeaderDrawer from "./children/HeaderDrawer.vue";
export default {
    name: "headerTitle",
    data() {
        return {
            oneItemDeepClone: _.cloneDeep(this.oneItem),//深拷贝，防止对象一起改变
            openDrawer: false//打开抽屉
        }
    },
    components: {
        'ht-shadow': ShadowBox,
        'ht-titleLayout': TitleLayout,
        'ht-drawer': HeaderDrawer
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