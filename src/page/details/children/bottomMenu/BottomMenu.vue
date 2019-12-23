<template>
    <div class="bm-father">
        <bm-shadow @changeDrawerStatu="changeDrawerStatu" :openDrawer="openDrawer" :oneItem="oneItem" />
        <bm-layout :oneItem="oneItem" />
        <bm-drawer :openDrawer="openDrawer" :oneItem="oneItemDeepClone" @changeDrawerStatu="changeDrawerStatu"/>
    </div>
</template>
<script>
import BottomMeLayout from "./children/BottomMeLayout";
import ShadowBox from "@/components/ShadowBox";
import BottomMeDrawer from "./children/BottomMeDrawer";
export default {
    name: "bottomMenu",
    data() {
        return {
            oneItemDeepClone: _.cloneDeep(this.oneItem),//深拷贝，防止对象一起改变
            openDrawer: false//打开抽屉
        }
    },
    components: {
        "bm-layout": BottomMeLayout,
        'bm-shadow': ShadowBox,
        "bm-drawer": BottomMeDrawer
    },
    methods: {
        changeDrawerStatu(e,cloneDeepOneItem){//抽屉开关,如果没有保存，就不能变
            this.oneItemDeepClone = cloneDeepOneItem;
            this.openDrawer = e;
        }
    },
    props: ['oneItem']
}
</script>