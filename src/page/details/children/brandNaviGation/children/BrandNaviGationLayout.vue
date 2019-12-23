<template>
    <div class="bng-layout">
        <div v-if="oneItem.IsIcon === 0" class="bng-layout-one bng-layout-item">
            <ul v-if="oneItem.ShopPro.length === 0" class="bng-layout-list" :style="bgColor">
                <li v-for="i in 8" :key="i" class="bng-list-one">
                    <div class="bng-img-box">
                        <img draggable="false" class="bng-list-img" :src="defaultImg" alt="defaultlogo"/>
                    </div>
                </li>
            </ul>
            <ul v-else class="bng-layout-list" :style="bgColor">
                <li v-for="(item,idx) in oneItem.ShopPro" :key="idx" class="bng-list-one">
                    <div class="bng-img-box">
                        <img draggable="false" class="bng-list-img" :src="item.LogoUrl?`/list${item.LogoUrl}`:defaultImg" alt="logo"/>
                    </div>
                </li>
            </ul>
        </div>
        <div v-else-if="oneItem.IsIcon === 1" class="bng-layout-two bng-layout-item">
            <md-scroll-view
            ref="scrollView"
            :scrolling-y="false"
            :touch-angle="80"
            :is-prevent="false"
            :auto-reflow="true"
            >
                <ul v-if="oneItem.ShopPro.length === 0" class="bng-layout-list" :style="bgColor">
                    <li v-for="i in 8" :key="i" class="bng-list-one">
                        <div class="bng-img-box">
                            <img draggable="false" class="bng-list-img" :src="defaultImg" alt="defaultlogo"/>
                        </div>
                    </li>
                </ul>
                <ul v-else class="bng-layout-list" :style="bgColor">
                    <li v-for="(item,idx) in oneItem.ShopPro" :key="idx" class="bng-list-one">
                        <div class="bng-img-box">
                            <img draggable="false" class="bng-list-img" :src="item.LogoUrl?`/list${item.LogoUrl}`:defaultImg" alt="logo"/>
                        </div>
                    </li>
                </ul>
            </md-scroll-view>
        </div>
        <div v-else-if="oneItem.IsIcon === 2" class="bng-layout-three bng-layout-item">
            <md-scroll-view
            ref="scrollView"
            :scrolling-y="false"
            :touch-angle="80"
            :is-prevent="false"
            :auto-reflow="true"
            >
                <ul v-if="oneItem.ShopPro.length === 0" class="bng-layout-list" :style="bgColor">
                    <li v-for="i in 8" :key="i" class="bng-list-one" :style="logoBgColor">
                        <div class="bng-img-box">
                            <img draggable="false" class="bng-list-img" :src="defaultImg" alt="defaultlogo"/>
                        </div>
                        <div class="bng-msg-box">
                            <p class="title">1111111111</p>
                            <p class="bng-msg-troduce">111111111111</p>
                        </div>
                    </li>
                </ul>
                <ul v-else class="bng-layout-list" :style="bgColor">
                    <li v-for="(item,idx) in oneItem.ShopPro" :key="idx" class="bng-list-one" :style="logoBgColor">
                        <div class="bng-img-box">
                            <img draggable="false" class="bng-list-img" :src="item.LogoUrl?`/list${item.LogoUrl}`:defaultImg" alt="logo"/>
                        </div>
                        <div class="bng-msg-box">
                            <p class="title">{{item.StoreName}}</p>
                            <p class="bng-msg-troduce">{{item.Describe}}</p>
                        </div>
                    </li>
                </ul>
             </md-scroll-view>
        </div>
        <div v-else class="bng-layout-four bng-layout-list">
            <md-swiper
            ref="swiperSlider"
            :autoplay=0
            :is-loop="false"
            :is-prevent="false"
            :useNative-driver="false"
            :style="bgColor"
            >
                <md-swiper-item :key="idx" v-for="(everyPageItem, idx) in totalPage()">
                    <div class="bng-four-one" v-for="(item, itemIdx) in everyPageItem" :key="itemIdx">
                        <div class="bng-img-box" :style="logoBgColor">
                            <img draggable="false" class="bng-list-img" :src="item.LogoUrl?`/list${item.LogoUrl}`:defaultImg" alt="logo"/>
                        </div>
                        <p class="title">{{item.StoreName}}</p>
                    </div>
                </md-swiper-item>
            </md-swiper>
        </div>
    </div>
</template>
<script>
import { Carousel, CarouselItem }  from "element-ui";
import { ScrollView, Swiper, SwiperItem } from "mand-mobile"
export default {
    name: "bngLayout",
    data(){
        return {
            defaultImg: "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
            fourPage:1,
        }
    },
    components: {
        [ Carousel.name ]: Carousel,
        [ CarouselItem.name ]: CarouselItem,
        [ ScrollView.name ]: ScrollView,
        [ Swiper.name ]: Swiper,
        [ SwiperItem.name ]: SwiperItem
    },
    computed: {
        bgColor(){
            return {
                'background-color': this.oneItem.BackColor
            }
        },
        logoBgColor(){
            return {
                'background-color': this.oneItem.LogoColor
            }
        }
    },
    methods: {
        totalPage(){
            let ShopProNum = this.oneItem.ShopPro.length;//品牌数组个数
            let everyPageNum = 4;//每页三个
            let arr = [];//返回的每一页需要加载的东西
            if(ShopProNum === 0){//如果没有，就模拟
                let zeroShopPro = 11;//模拟有n个品牌信息
                this.fourPage = Math.ceil(zeroShopPro / everyPageNum);
                for(let i = 1;i <= this.fourPage;i++){
                    let oneArr = [];//一页需要加载的东西
                    // StoreName
                    for(let j = everyPageNum*i-(everyPageNum - 1);j <= (zeroShopPro - i*everyPageNum >= 0?everyPageNum*i:zeroShopPro);j++){
                        let obj = {};
                        obj['StoreName'] = '选项'+j;
                        oneArr.push(obj);
                    }
                    arr.push(oneArr);
                }
            }else{//如果有,则计算
                this.fourPage = Math.ceil(ShopProNum / everyPageNum);
                for(let i = 1;i <= this.fourPage;i++){
                        let oneArr = [];//一页需要加载的东西
                        for(let j = everyPageNum*i-(everyPageNum - 1);j <= (ShopProNum - i*everyPageNum >= 0?everyPageNum*i:ShopProNum);j++){
                            oneArr.push(this.oneItem.ShopPro[j-1]);
                        }
                        arr.push(oneArr);
                    }
                }
                return arr;
            }
    },
    props: [ 'oneItem' ]
}
</script>
<style lang="scss">
.bng-layout{
    padding: 10px 8px; 
    .bng-layout-item{
        border-bottom: 1px solid rgb(240,242,245);
    }
}
.bng-layout-one .bng-list-img {
    width: 60px;
    height: 46px;
}
.bng-layout-one .bng-layout-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
    .bng-list-one{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25%;
        padding: 8px 0;
        .bng-img-box{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 60px;
            background-color: rgb(240,242,245);
        }
    }
}

/** */
.bng-layout-two .bng-list-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
}
.bng-layout-two .bng-layout-list {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 3px;
    .bng-list-one{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 82.5px;
        height: 70px;
        padding:0 3px;
        border-radius: 4px;
        flex-shrink: 0;
        .bng-img-box{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            background-color: rgb(240,242,245);
        }
    }
}

/** */
.bng-layout-three .bng-list-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    vertical-align: top;
}
.bng-layout-three .bng-layout-list {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 3px;
    .bng-list-one{
        display: flex;
        justify-content: center;
        align-items: center;
        // width: 82.5px;
        height: 70px;
        padding:0 3px;
        border-radius: 4px;
        flex-shrink: 0;
        .bng-img-box{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 50px;
            padding: 6px;
        }
        & + .bng-list-one {
            margin-left: 4px;
        }
        .bng-msg-box{
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            height: 100%;
            p {
                font-size: 14px;
            }
            .title,
            .bng-msg-troduce {
                width: 70px;
            }
            .bng-msg-troduce {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                word-break: break-all;
            }
        }
    }
}

/** */
.bng-layout-four {
    .md-swiper-item{
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        .bng-four-one{
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            width: 25%;
            height: 95px;
            .bng-img-box{
                display: flex;
                flex-flow: column nowrap;
                justify-content: center;
                align-items: center;
                padding: 0 10px;
                height: 60px;
            }
            .bng-list-img{
                width: 60px;
                height: 100%;
                vertical-align: top;
            }
            .title{
                font-size: 12px;
                -webkit-line-clamp: 1;
                text-align: center;
            }
        }
    }
}

</style>