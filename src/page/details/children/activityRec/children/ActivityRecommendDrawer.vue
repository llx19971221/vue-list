<template>
        <el-drawer
        custom-class="ar-drawer"
        title="活动推荐配置"
        :visible="openDrawer"
        :before-close="handleClose"
        size="692px"
        @opened="DrawerOpened"
        direction="rtl">
        <ar-layout :oneItem="oneItem" />
            <!-- <ar-upLoadImg :innerForm="oneItem" bestSize="345px*170px" myProp="Image" label="活动图片"/> -->
        <form class="ar-form">
            <el-select value-key="Id" @change="selectChange" v-model="selectActivity" placeholder="请选择活动">
                <el-option :value="-1" label="无" />
                <el-option
                v-for="(item,idx) in activity"
                :key="item.Id"
                :label="item.Name"
                :value="item"/>
            </el-select>
            <el-button @click="save('myForm')" type="primary">保存</el-button>
        </form>
        </el-drawer>
</template>
<script>
import { Drawer, Select, Option, Button } from "element-ui";
import UpLoadImg from "@/components/UpLoadImg.vue";
import ActivityRecommendLayout from "./ActivityRecommendLayout.vue";
import { mapActions, mapGetters } from 'vuex';
export default {
    name: "acitivityRecDrawer",
    data(){
        return {
            selectActivity: null
        }
    },
    props: [ 'openDrawer', 'oneItem'],
    computed: {
        ...mapGetters("myDetail", {
            activity: "activity"
        })
    },
    methods: {
        ...mapActions("myDetail", {
            getPhoneData: "getPhoneData",
            saveMallactivity: "saveMallactivity",
            getActivity: "getActivity"
        }),
        handleClose(){//关闭抽屉
            this.$emit("changeDrawerStatu",false,this.oneItem);
        },
        save(){
            this.saveMallactivity(this.oneItem).then(()=>{
                this.getPhoneData();
            })
        },
        selectChange(){
            if(this.selectActivity){
                this.oneItem.Name = this.selectActivity.Name;
                this.oneItem.Image = this.selectActivity.Image;
                this.oneItem.activityId = this.selectActivity.Id;
            }
        },
        DrawerOpened(){
            this.getActivity();
        }
    },
    components: {
        [ Drawer.name ]: Drawer,
        [ Select.name ]: Select,
        [ Option.name ]: Option,
        [ Button.name ]: Button,
        'ar-upLoadImg': UpLoadImg,
        'ar-layout': ActivityRecommendLayout
    }
}
</script>
<style lang="scss">
    .ar-drawer {
        .ar-layout {
            width: 375px;
            margin: 0 auto 10px;
        }
        .ar-form{
            padding: 0 40px;
        }
        .el-select {
            
            width: 100%;
        }
    }
</style>