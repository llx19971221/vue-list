<template>
    <div class="ar-layout">
        <!-- <div class="ar-img-box">
            <img src="http://llxali.club/lu.jpeg" alt="hd"/>
        </div> -->
        <el-image fit="cover" :src="`/list${oneItem.Image}`"></el-image>
        <p class="ar-title">{{oneItem.Name?oneItem.Name:"无活动"}}</p>
    </div>
</template>
<script>
import { Image, Icon } from "element-ui";
export default {
    name: "activityRecLayout",
    components: {
        [ Image.name ]: Image
    },
    props: ['oneItem']
}
</script>
<style lang="scss">
    .ar-layout{  
        padding: 15px;
        // .ar-img-box{
        //     position: relative;
        //     height: 0;
        //     padding-bottom: 50%;
        //         img{
        //         position: absolute;
        //         top: 0;
        //         left: 0;
        //         width: 100%;
        //         height: 100%;
        //     }
        // }
        .ar-title{
            font-size: 15px;
            padding:5px 0;
        }
        .el-image{
            height: 0;
            width: 100%;
            padding-bottom: 49%;
            border-radius: 8px;
            .el-image__inner{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            .el-image__error{
                position: absolute;
                top: 0;
                left: 0;
            }
        }
    }
</style>