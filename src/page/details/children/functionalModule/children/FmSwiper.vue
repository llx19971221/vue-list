<template>
    <div class="head-swiper">
            <div class="horizontal-box" v-if="ifhorizontal === 1"><!--横向滚动-->
                <md-swiper :autoplay=0 :dragable=true :is-loop=false>
                    <md-swiper-item v-for="i in horizontalNum" :key="i">
                        <el-row class="horizontal-scroll-row" :style="bgStyle">
                            <el-col v-for="j in totalColNum" v-if="(j-1) >= everyPageNum[i-1] && (j-1) < everyPageNum[i]" :key="j" :class="'el-col-'+rowShowNum">
                                <div v-if="oneItem.Buttons.length === 0" class='img-msg-box' :style="fontStyle">
                                    <a href="javascript:void(0)" class='img-msg-nav' :style="fontStyle">
                                        <img :src="defaultImgUrl" style="width:40px;height:40px;vertical-align:top;" />
                                        <p class="title"></p>
                                    </a>
                                </div>
                                <div v-else class="img-msg-box">
                                    <a href="javascript:void(0)" class='img-msg-nav' :style="fontStyle">
                                        <img :src="'/list/'+oneItem.Buttons[j-1].ImageUrl" style="width:40px;height:40px;vertical-align:top;" />
                                        <p class="title">{{oneItem.Buttons[j-1].Name}}</p>
                                    </a>
                                </div>
                            </el-col>
                        </el-row>
                    </md-swiper-item>
                </md-swiper>
            </div>
            <div class="oriental-box" v-if="ifhorizontal === 0" >
                <el-row :style="bgStyle"><!--分行-->
                    <el-col v-for="i in totalColNum" :key="i" :class="'el-col-'+rowShowNum">
                        <div v-if="oneItem.Buttons.length === 0" class='img-msg-box' :style="fontStyle">
                            <a href="javascript:void(0)" class='img-msg-nav' :style="fontStyle">
                                <img :src="defaultImgUrl" style="width:40px;height:40px;vertical-align:top;" />
                                <p class="title"></p>
                            </a>
                        </div>
                        <div v-else class="img-msg-box">
                            <a href="javascript:void(0)" class='img-msg-nav' :style="fontStyle">
                                <img :src="'/list/'+oneItem.Buttons[i-1].ImageUrl" style="width:40px;height:40px;vertical-align:top;" />
                                <p class="title">{{oneItem.Buttons[i-1].Name}}</p>
                            </a>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
</template>
<script>
import { Row, Col } from "element-ui";
import { Swiper, SwiperItem } from "mand-mobile";
export default {
    name: "fm-swiper",
    data(){
        return {
            defaultImgUrl: "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",
            showRowNum: 2,//一页显示2行
        }
    },
    components: {
        [ Row.name ]: Row,
        [ Col.name ]: Col,
        [ Swiper.name ]: Swiper,
        [ SwiperItem.name ]: SwiperItem
    },
    computed: {
        rowShowNum(){
            return this.oneItem.StyleType;//每行显示几个
        },
        ifhorizontal(){
             return this.oneItem.RowShowType;//是否横向滚动显示
        },
        bgStyle(){//el-row的颜色
            return {
                'background-color': this.oneItem.BackgroundColor
            }
        },
        fontStyle(){//title的字体
            return {
                'font-size': this.oneItem.FontSize + 'px',
                'color': this.oneItem.FontColor
            }
        },
        rowShowNum(){
            return this.oneItem.StyleType;//每行显示几个
        },
        ifhorizontal(){
             return this.oneItem.RowShowType;//是否横向滚动显示
        },
        bgStyle(){//el-row的颜色
            return {
                'background-color': this.oneItem.BackgroundColor
            }
        },
        fontStyle(){//title的字体
            return {
                'font-size': this.oneItem.FontSize + 'px',
                'color': this.oneItem.FontColor
            }
        },
        horizontalNum(){//得到横向滚动页数
            return Math.ceil(this.totalColNum / (this.rowShowNum * this.showRowNum));
        },
        everyPageNum(){//每页显示个数
            let pageNumArr = [0];//每页显示到第几个停止的数组,循环判断条件:是否大于前一个小于后一个
            let pageNum = this.showRowNum * this.rowShowNum;//每页显示个数
            for(let i=0; i<this.horizontalNum;i++){
                if(pageNum <= this.totalColNum){
                    pageNumArr.push(pageNum);
                    pageNum+=pageNum;
                }else{
                    pageNumArr.push(this.totalColNum);
                }
            }
            // console.log(pageNumArr);
            return pageNumArr;
        },
        totalColNum(){
            return this.oneItem.Buttons.length === 0?10:this.oneItem.Buttons.length;
        }
    },
    props:[ 'oneItem' ]
}
</script>
<style lang="scss">
.head-swiper .el-row{
        height:100%;
        padding:20px 0 15px;
        .el-col{
            height:75px;
            box-sizing: border-box;
        }
        .el-col-5{
            width:20%;
        }
        .el-col-4{
            width:25%;
        }
        .el-col-3{
            width:33.33%;
        }
    }
    .img-msg-box{
        width:100%;
        height:100%;
        .img-msg-nav{
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
            width: 100%;
            height:100%;
        }
        .title{
            width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            word-break: break-all;
            text-align: center;
            margin-top:8px;
        }
    }
</style>