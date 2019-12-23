<template>
    <div class="th-layout" :style="backGround">
        <div class="left">
            <img v-if="oneItem.LeftImage" :src="'/list'+oneItem.LeftImage" alt="leftLogo"/>
            <p class="title" :style="leftSize">{{oneItem.HeadLine}}</p>
        </div>
        <a v-if="oneItem.FuncLink" :href="oneItem.FuncLink" class="right">
            <p class="title" :style="rightSize">{{oneItem.RightWord}}</p>
            <img v-if="oneItem.RightImage" :src="'/list'+oneItem.RightImage" alt="rightLogo"/>
        </a>
        <a v-else href="javascript:void(0);" class="right">
            <p class="title" :style="rightSize">{{oneItem.RightWord}}</p>
            <img v-if="oneItem.RightImage" :src="'/list'+oneItem.RightImage" alt="rightLogo"/>
        </a>
    </div>
</template>
<script>
export default {
    name: "titleLayout",
    computed: {
        leftSize(){
            return {
                'font-size': this.oneItem.HeadLineSize + 'px',
                'color': this.oneItem.HeadLineColor,
            }
        },
        rightSize(){
            return {
                'font-size': this.oneItem.RightWordSize + 'px',
                'color': this.oneItem.RightWordColor,
            }
        },
        backGround(){
            if(this.oneItem.Istemplate === 2){
                return {
                    'background-image': `url('/list${this.oneItem.BackImage}')`,
                    "margin-top": this.oneItem.Fromabove + "px"
                }
            }
            else{
                return {
                    'background-color': this.oneItem.BackColor,
                    "margin-top": this.oneItem.Fromabove + "px"
                }
            }
        }
    },
    props: [ 'oneItem' ]
}
</script>
<style lang="scss">
    .th-layout{
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        // box-sizing: border-box;
        padding:10px 10px 3px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .left,
        .right {
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;
            flex-shrink: 0;
            width:50%;
            min-height: 19.1px;
            img{
                width:12px;
                height:12px;
            }
            .title{
                text-overflow: ellipsis;
                overflow: hidden;
                word-wrap: break-all;
                white-space: nowrap;
            }
        }
        .right{
            justify-content: flex-end;
        }
        .left img{
            margin-right: 5px;
        }
        .right img{
            margin-left:5px;
        }
    }
</style>