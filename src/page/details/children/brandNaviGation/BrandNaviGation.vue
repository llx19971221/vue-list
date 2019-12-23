<template>
    <div class="bng-father">
        <bng-shadow @changeDrawerStatu="changeDrawerStatu" :openDrawer="openDrawer" :oneItem="oneItem" />
        <bng-Layout :oneItem="oneItem"/>
        <bng-drawer :openDrawer="openDrawer" :oneItem="oneItemDeepClone" @changeDrawerStatu="changeDrawerStatu"/>
    </div>
</template>
<script>
import ShadowBox from "@/components/ShadowBox.vue";
import BrandNaviGationLayout from "./children/BrandNaviGationLayout.vue";
import BrandNaviGationDrawer from "./children/BrandNaviGationDrawer.vue";
import { mapActions } from "vuex";
export default {
    name: "brandNaviGation",
    data() {
        return {
            oneItemDeepClone: _.cloneDeep(this.oneItem),//深拷贝，防止对象一起改变
            openDrawer: false//打开抽屉
        }
    },
    components: {
        'bng-shadow': ShadowBox,
        'bng-Layout': BrandNaviGationLayout,
        'bng-drawer': BrandNaviGationDrawer
    },
    methods: {
         ...mapActions("myDetail", {
                getShopPromotion: "getShopPromotion" 
            }),
        changeDrawerStatu(e,cloneDeepOneItem){//抽屉开关,如果没有保存，就不能变
            if(e){
               this.getShopPromotion();
            }
            this.oneItemDeepClone = cloneDeepOneItem;
            this.openDrawer = e;
        }
    },
    props:[ 'oneItem']
}
</script>