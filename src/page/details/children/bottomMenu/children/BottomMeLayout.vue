<template>
    <div class="bm-layout" :style="backColor">
        <el-row v-if="oneItem.Images.length > 0">
            <el-col :class="`el-col-${oneItem.Images.length}`" v-for="(item,idx) in oneItem.Images" :key='idx'>
                <a class="bm-nav" href="javascript:void(0)" @click="changeStyle(idx)">
                    <div class="bm-img" alt="logo" :style="index === idx?`background-image:url('/list${item.SelectImageUrl}')`:`background-image:url('/list${item.ImageUrl}')`"></div>
                    <p :style="index === idx?selectStyle:fontStyle" class="title">{{item.btnName}}</p>
                </a>
            </el-col>
        </el-row>
        <el-row v-else>
            <el-col class="el-col-3" v-for="item in 3" :key='item'>
                <a class="bm-nav" href="javascript:void(0)">
                    <div class="bm-img" alt="logo" :style="`background-image:url('${defaultImgUrl}')`"></div>
                    <p :style="fontStyle" class="title">底部标签名</p>
                </a>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { Row, Col } from "element-ui";
import { mapGetters } from "vuex";
export default {
    name: 'bottomMeLayout',
    data(){
        for(let i in this.oneItem.Images){
            let img = document.createElement("img");
            let img2 = document.createElement("img");
            img.src = `/list${this.oneItem.Images[i].SelectImageUrl}`;
            img2.src = `/list${this.oneItem.Images[i].ImageUrl}`
        }//预加载一波，避免闪烁
        return {
            index: 0//选择了第几个
        }
    },
    components: {
        [ Row.name ]: Row,
        [ Col.name ]: Col
    },
    computed: {
        ...mapGetters("myDetail",{
            defaultImgUrl: "defaultImgUrl"//没有图片的时候用它
        }),
        fontStyle(){
            return {
                "font-size": this.oneItem.FontSize?this.oneItem.FontSize + 'px':"14px",
                "color": this.oneItem.FontColor?this.oneItem.FontColor:"#000"
            }
        },
        selectStyle(){
            return {
                "font-size": this.oneItem.FontSize?this.oneItem.FontSize + 'px':"14px",
                "color": this.oneItem.SelectColor
            }
        },
        backColor(){
            return {
                "background-color": this.oneItem.BaseColor
            }
        },
    },
    methods: {
        changeStyle(idx){
            this.index = idx;
        }
    },
    props: ['oneItem']
}
</script>
<style lang="scss">
    .bm-layout{
        .el-row{
            display: flex;
            justify-content: center;
            align-items: center;
            width:100%;
            padding:7.5px 0;
            .el-col{
                width: 20%;
                height:auto;
                .bm-nav{
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: center;
                    align-items: center;
                    width:100%;
                    .bm-img{
                        width:24px;
                        height:24px;
                        background-repeat: no-repeat;
                        background-size: 21px 21px;
                        background-position: center center;
                    }
                    .title{
                        width:100%;
                        text-align: center;
                        margin-top:3px;
                        line-height: 1.2;
                        font-size: 13px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                }
            }
            .el-col-1{
                width:100%;
            }
            .el-col-2{
                width:50%;
            }
            .el-col-3{
                width:33.33%;
            }
            .el-col-4{
                width:25%;
            }
            .el-col-5{
                width:20%;
            }
        }
    }
</style>