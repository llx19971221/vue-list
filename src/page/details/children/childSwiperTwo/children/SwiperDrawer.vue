<template>
    <el-drawer
        class="cs-drawer"
        title="轮播图配置"
        :visible="openDrawer"
        :before-close="handleClose"
        :destroy-on-close="true"
        size="692px"
        direction="rtl">
        <cs-layout :oneItem="oneItem" />
        <el-form :model="oneItem" label-position="top">
            <el-form-item label="是否浮动" prop="IsFloat">
                <el-switch v-model="oneItem.IsFloat" :active-value=1 :inactive-value=0 />
            </el-form-item>
            <el-form-item label="轮播图延迟" prop="RollingTime">
                <el-select v-model="oneItem.RollingTime" placeholder="默认3000ms">
                    <el-option v-for="(item,idx) in selectDelay" :label="`${item}ms`" :value="item" :key="idx"/>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="innerDrawer">新增+</el-button>
            </el-form-item>
            <el-form-item>
                <cs-sort :tableHeader="tableHeader" :slickArray="oneItem.Images" @changeOneItemButtons="changeOneItemButtons" :EditOneImg="EditOneImg" :DelOneImg="DelOneImg" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
        <cs-innerDrawer :formData="formData" :openInnerDrawer="openInnerDrawer" @changeInnerDrawer="changeInnerDrawer" />
    </el-drawer>
</template>
<script>
import { Drawer, Switch, Form, FormItem, Select, Option, Button, MessageBox } from 'element-ui';
import SwiperLayout from "./SwiperLayout.vue";
import SwiperInnerDrawer from "./InnerDrawer.vue";
import DrawerSort from "@/components/DrawerSort.vue";
import { mapActions } from "vuex";
export default {
    name: "swiperDrawer",
    data(){
        return {
            selectDelay: [ 1000, 2000, 3000, 5000 ],
            tableHeader: [ '编号', '缩略图', '标题', '链接', '操作'],
            openInnerDrawer: false,
            addOrNew: true,//true是新建, false是编辑
            idx: null,
            formData: {
                FunctionName: "",//系统模块选了第几个
                FunctionType: 1,
                Id: btoa(new Date().toUTCString()),
                LinkType: 1,
                RollingScreenConfigId: this.oneItemId,
                ShowFunctionName: "",//最后显示给用户看的模块名
                ShowFunctionType: "默认功能分类",
                Title: "",
                OrderNo: this.oneItem.Images.length + 1,
                LinkUrl: "",//如果选第一个或者第二个，这个就不填，不然就填上
                ImageUrl: ""
            }
        }
    },
    components: {
        [ Drawer.name ]: Drawer,
        [ Form.name ]: Form,
        [ FormItem.name ] :FormItem,
        [ Switch.name ]: Switch,
        [ Select.name ]: Select,
        [ Option.name ]: Option,
        [ Button.name ]: Button,
        'cs-layout': SwiperLayout,
        'cs-sort': DrawerSort,
        'cs-innerDrawer': SwiperInnerDrawer
    },
    methods: {
        ...mapActions("myDetail",{
           savePhoneData: "savePhoneData",
           getPhoneData: "getPhoneData" 
        }),
        save(){
            this.savePhoneData(this.oneItem).then(()=>{
                this.getPhoneData().then(()=>{
                    this.handleClose();
                })
            })
        },
        handleClose(){//关闭抽屉
            this.$emit("changeDrawerStatu",false,this.oneItem);
        },
        changeOneItemButtons(val){//排序赋值
            this.oneItem.Images = val;
        },
        changeInnerDrawer(value,saveOrClose,cloneInnerForm){
            if(this.addOrNew && saveOrClose){
                this.oneItem.Images.push(this.formData);
            }else if(!this.addOrNew && saveOrClose){
                this.oneItem.Images[this.idx] = cloneInnerForm;
                this.oneItem.Images = _.cloneDeep(this.oneItem.Images);
            }
            this.openInnerDrawer = value;
        },
        EditOneImg(idx){
            this.idx = idx;
            this.addOrNew = false;
            this.formData = _.cloneDeep(this.oneItem.Images[idx]);
            this.openInnerDrawer = true;
        },
        DelOneImg(idx){
            MessageBox.confirm("您确定要删除该项吗?",'警告',{
                "cancelButtonText": "取消",
                'confirmButtonText': "确定"
            }).then(()=>{
                this.oneItem.Images.splice(idx,1);
            })
            .catch(()=>{
                return;
            })
        },
        innerDrawer(){
            this.formData = {
                FunctionName: "",//系统模块选了第几个
                FunctionType: 1,
                Id: btoa(new Date().toUTCString()),
                LinkType: 1,
                RollingScreenConfigId: this.oneItemId,
                ShowFunctionName: "",//最后显示给用户看的模块名
                ShowFunctionType: "默认功能分类",
                Title: "",
                OrderNo: this.oneItem.Images.length + 1,
                LinkUrl: "",//如果选第一个或者第二个，这个就不填，不然就填上
                ImageUrl: ""
            };
            this.addOrNew = true;
            this.openInnerDrawer = true;
        }
    },
    props: ['oneItem', 'openDrawer']
}
</script>
<style lang="scss">
    .cs-drawer .el-drawer__body {
        padding: 0 30px;
        overflow-y: scroll;
        .el-form-item__label{
            line-height: 1.2;
            padding:0;
        }
        .cs-father{
            width: 375px;
            margin: 20px auto;
        }
    } 
</style>