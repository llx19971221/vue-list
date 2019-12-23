<template>
    <div v-if="oneItem.Style === 1" class="mi-style-one">
        <div v-for="(item,idx) in oneItem.AccordingNum" :key="idx" class="style-one-box">
            <div class="mi-img-box">
                <!-- <img v-if="oneItem.Gifts.length != 0" class="style-one-picture" :src='`/list${oneItem.Gifts[0].GiftImage}`' alt="logo"/> -->
                <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="picture" width="60px" height="45px" fill="currentColor" aria-hidden="true"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792zm0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2zM304 456a88 88 0 1 0 0-176 88 88 0 0 0 0 176zm0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z"></path></svg>
            </div>
            <p :style="nameStyle" class="title">我是标题我是标题我是标题我是标题我是标题我是标题我是标题</p>
            <p :style="pointsStyle" class="points">50000000000000000000000000积分</p>
            <button :style="buttonStyle" class='mi-btn'>立即兑换</button>
        </div>
    </div>
    <div v-else class="mi-style-two">
        <div v-for="(item,idx) in oneItem.AccordingNum" :key="idx" class="style-two-box">
            <div class="mi-img-box">
                <!-- <img v-if="oneItem.Gifts.length != 0" class="style-one-picture" :src='`/list${oneItem.Gifts[0].GiftImage}`' alt="logo"/> -->
                <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="picture" width="60px" height="45px" fill="currentColor" aria-hidden="true"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792zm0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2zM304 456a88 88 0 1 0 0-176 88 88 0 0 0 0 176zm0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z"></path></svg>
            </div>
            <div class="mi-msg-box">
                <p :style="nameStyle" class="title">我是标题我是标题我是标题我是标题我是标题我是标题我是标题</p>
                <p :style="pointsStyle" class="points">50000000000000000000000000积分</p>
                <button :style="buttonStyle" class='mi-btn'>立即兑换</button>
            </div>
        </div>
    </div>
</template>
<script>
import { Row, Col } from "element-ui";
export default {
    name: "mallLayout",
    components: {
        [ Row.name ]: Row,
        [ Col.name ]: Col
    },
    computed: {
        nameStyle(){//名字style
            return {
                "font-size": `${this.oneItem.NameSize}px`,
                "color": this.oneItem.NameColor
            }
        },
        pointsStyle(){//分数style
            return {
                "font-size": `${this.oneItem.PointsSize}px`,
                "color": this.oneItem.PointsColor
            }
        },
        buttonStyle(){//立级兑换按钮
            return {
                "font-size": `${this.oneItem.BtnNameSize}px`,
                "color": this.oneItem.BtnNameColor,
                "background-color": this.oneItem.BtnBackColor
            }
        },
    },
    props: [ 'oneItem' ]
}
</script>
<style lang='scss'>
    .mi-style-one,
    .mi-style-two {
        background-color: #fff;
        box-sizing: border-box;
        padding: 5px 15px 0;
    }
    .mi-style-one {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
        .style-one-box{
            width:165px;
        }
    }
    .mi-img-box{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color:rgb(242,246,249);
    }
    .style-one-box {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: flex-start;
        padding:0 0 20px;
        .mi-img-box{
            width:100%;
            height: 110px;
            .style-one-picture{
                width: 100%;
                height: 100%;
                vertical-align: top;
            }
        }
    }
    /**一号布局完成 */

    .style-two-box{
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: flex-start;
        border-bottom: 1px solid rgb(225,227,230);
        padding:15px 0;
        height: 120px;
        .mi-img-box{
            width: 120px;
            height: 100%;
            flex-shrink: 0;
        }
        .mi-msg-box{
            display: flex;
            flex-flow: column;
            justify-content: flex-start;
            align-items: flex-start;
            overflow: hidden;
            padding-bottom: 20px;
            margin-left: 10px;
            height: 100%;
        }
    }

   .mi-style-two .style-two-box:last-child{
        border:none;
    }
    .title{
        line-height: 1.5;
        overflow: hidden;
        text-overflow: ellipsis;
        /*设置成弹性盒子 */
        display: -webkit-box;
        /*显示的个数 */
        -webkit-line-clamp: 2;
        /* 属性规定框的子元素应该被水平或垂直排列。 */
        -webkit-box-orient: vertical;
        word-break: break-all;
    }
    .points{
        width:100%;
        line-height: 1.3;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .mi-btn{
        padding:8px 15px;
        margin-top:5px;
    }
</style>