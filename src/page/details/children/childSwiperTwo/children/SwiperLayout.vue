<template>
    <div class="cs-father" v-if="oneItem.Images.length != 0" key="cs-father-one">
        <md-swiper v-if="!ifReset" class="cs-swiper" ref="csSwiper" :autoplay="oneItem.RollingTime?oneItem.RollingTime:3000" :dragable=true :is-loop=true>
            <md-swiper-item v-for="(item,idx) in oneItem.Images" :key="idx">
                <img class="swiper-logo" :src="`/list${item.ImageUrl}`" alt="swiperLogo"/>
            </md-swiper-item>
        </md-swiper>
        <md-swiper v-else class="cs-swiper" ref="csSwiper2" :autoplay="oneItem.RollingTime?oneItem.RollingTime:3000" :dragable=true :is-loop=true>
            <md-swiper-item v-for="(item,idx) in oneItem.Images" :key="`${idx}T`">
                <img class="swiper-logo" :src="`/list${item.ImageUrl}`" alt="swiperLogo"/>
            </md-swiper-item>
        </md-swiper>
        <img class="swiper-float-img" v-if="oneItem.IsFloat === 1" src="@/assets/images/yh.png" alt="floatLogo"/>
    </div>
    <div class="cs-father" key="cs-father-two" v-else>
        <md-swiper v-if="!ifReset" class="cs-swiper" ref="csSwiper" :autoplay="oneItem.RollingTime?oneItem.RollingTime:3000" :dragable=true :is-loop=true>
            <md-swiper-item v-for="i in 3" :key="i">
                <img class="swiper-logo" :src="defaultImgUrl" alt="swiperLogo"/>
            </md-swiper-item>
        </md-swiper>
        <md-swiper v-else class="cs-swiper" ref="csSwiper2" :autoplay="oneItem.RollingTime?oneItem.RollingTime:3000" :dragable=true :is-loop=true>
            <md-swiper-item v-for="i in 3" :key="i+'T'">
                <img class="swiper-logo" :src="defaultImgUrl" alt="swiperLogo"/>
            </md-swiper-item>
        </md-swiper>
        <img class="swiper-float-img" v-if="oneItem.IsFloat === 1" src="@/assets/images/yh.png" alt="floatLogo"/>
    </div>
</template>
<script>
import { Swiper, SwiperItem } from "mand-mobile";
export default {
    name: "swiperLayout",
    data(){
        return {
            ifReset: false,
            timer: null,
            defaultImgUrl:"https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
        }
    },
    components: {
        [ Swiper.name ]: Swiper,
        [ SwiperItem.name ]: SwiperItem
    },
    computed: {
    //     RollingTime(){
    //         // get(){
    //         //     if(this.ifReset){
    //         //         clearInterval(this.timer);
    //         //         this.$refs.csSwiper.stop();
    //         //         this.timer = setInterval(() => {
    //         //              this.$refs.csSwiper.next();
    //         //         }, this.oneItem.RollingTime);
    //         //     }else{
    //         //         this.ifReset = true;
    //         //         return this.oneItem.RollingTime;
    //         //     }
    //         // }
    //         this.ifReset = true;
    //         return this.oneItem.RollingTime;
    //     }
    },
    watch: {
        'oneItem': {
            handler: function(){
                this.ifReset = true;
                setTimeout(() => {
                    this.ifReset = false;
                }, 500);
            },
            deep: true
        }
    },
    props: ['oneItem']
}
</script>
<style lang="scss">
.cs-father{
    position: relative;
    height: 180px;
}
.cs-swiper{
    position: relative;
    height: 100%;
    .swiper-logo{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .md-swiper-indicator{
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: #fff;
        &.md-swiper-indicator-active{
            background-color: #2f86f6;
        }
    }
}
.swiper-float-img{
    width: 100%;
    position: absolute;
    z-index: 1000;
    bottom: -1px;
    left: 0;
}
</style>