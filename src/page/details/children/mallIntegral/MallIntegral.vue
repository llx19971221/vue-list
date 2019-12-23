<template>
    <div class="mi-father">
        <mi-shadow @changeDrawerStatu="changeDrawerStatu" :openDrawer="openDrawer" :oneItem="oneItem" />
        <mi-layout :oneItem="oneItem"/>
        <mi-drawer :openDrawer="openDrawer" :oneItem="oneItemDeepClone" @changeDrawerStatu="changeDrawerStatu"/>
    </div>
</template>
<script>
import ShadowBox from "@/components/ShadowBox.vue";
import MallLayout from "./children/MallLayout.vue";
import MallDrawer from "./children/MallDrawer.vue";
export default {
    name: "mallIntegral",
    data() {
        return {
            oneItemDeepClone: _.cloneDeep(this.oneItem),//深拷贝，防止对象一起改变
            openDrawer: false//打开抽屉
        }
    },
    components: {
        'mi-layout': MallLayout,
        'mi-shadow': ShadowBox,
        'mi-drawer': MallDrawer
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