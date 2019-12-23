<template>
    <div class="phone-page-wrap">
        <div class="phone-one-item" v-for="(oneItem,idx) in phoneData" :key="idx">
            <phone-swiper :oneItem="oneItem" v-if="oneItem.type === 1"/>
            <phone-funcModule :oneItem="oneItem" v-else-if="oneItem.type === 2" />
            <phone-brandNaviGationLayout :oneItem="oneItem" v-else-if="oneItem.type === 3" />
            <phone-headerTitle :oneItem="oneItem" v-else-if="oneItem.type === 4" />
            <phone-activityRecommend :oneItem="oneItem" v-else-if="oneItem.type === 5"/>
            <phone-mallIntegral :oneItem="oneItem" v-else-if="oneItem.type === 6" />
            <phone-bottomMenu :oneItem="oneItem" v-else />
        </div>
    </div>
</template>
<script>
import Swiper from "../details/children/childSwiperTwo/children/SwiperLayout.vue";
import FunctionalModule from "../details/children/functionalModule/children/FmSwiper.vue";
import HeadTitle from "../details/children/headerTitle/children/TitleLayout.vue";
import BottomMenu from "../details/children/bottomMenu/children/BottomMeLayout.vue";
import MallIntegral from "../details/children/mallIntegral/children/MallLayout.vue";
import ActivityRecommend from "../details/children/activityRec/children/ActivityRecommendLayout.vue";
import BrandNaviGationLayout from "../details/children/brandNaviGation/children/BrandNaviGationLayout.vue";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    name: "phonePage",
    components: {
        'phone-swiper': Swiper,
        'phone-funcModule': FunctionalModule,
        'phone-brandNaviGationLayout': BrandNaviGationLayout,
        'phone-headerTitle': HeadTitle,
        'phone-bottomMenu': BottomMenu,
        'phone-mallIntegral': MallIntegral,
        'phone-activityRecommend': ActivityRecommend
    },
    mounted(){
       this.id = this.$route.query.id;
       this.$store.state.myDetail.totalId=this.id;
       this.getPhoneData();
    },
    computed: {
        ...mapGetters("myDetail",{
            phoneData: "phoneData"
        })
    },
    methods: {
        ...mapActions("myDetail",{
            getPhoneData: "getPhoneData"
        })
    }
}
</script>
<style lang="scss">
    .phone-one-item:nth-last-child(1){
        position: fixed;
        width: 100%;
        bottom: 0;
    }
    .phone-page-wrap{
        padding-bottom: 80px;
    }
</style>