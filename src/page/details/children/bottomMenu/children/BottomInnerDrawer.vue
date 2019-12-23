<template>
    <el-drawer
        custom-class="bm-inner-drawer"
        title="新增底部菜单"
        :visible="innerOpen"
        size="500px"
        :before-close="handleClose"
        direction="rtl">
        <el-form class="bm-inner-form" ref="bmIneerForm" :model="innerForm" label-width="100px" label-position="right">
            <el-form-item label="排序编号" prop="OrderNo" :required="true">
                <el-input v-model="innerForm.OrderNo" :disabled="true"/>
            </el-form-item>
            <el-form-item label="按钮名称" prop="btnName" :required="true">
                <el-input v-model="innerForm.btnName"/>
            </el-form-item>
            <bm-innerUpLoadImg :innerForm="innerForm" :bestSize="'48px*48px'" :myProp="'ImageUrl'" :label="'未选中图标'" />
            <bm-innerUpLoadImg :innerForm="innerForm" :bestSize="'48px*48px'" :myProp="'SelectImageUrl'" :label="'选中图标'" />
            <bm-innerModelSelect :innerForm="innerForm" :LinkType="'LinkType'" :FunctionName="'FunctionName'" :LinkUrl="'LinkUrl'" :ShowFunctionName="'ShowFunctionName'" :useOneOrTwo="false" />
            <el-form-item>
                <el-button type="primary" @click="save('bmIneerForm')">保存</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>
<script>
import { Drawer, FormItem, Form, Button, Input } from "element-ui";
import UpLoadImg from "@/components/UpLoadImg.vue";
import ModelSelect from "@/components/ModelSelect.vue";
export default {
    name: "bottomInnerDrawer",
    data(){
        return {
            clickBtnClose: false//是点击保存关闭得还是直接关闭得
        }
    },
    props: [ 'innerForm', 'innerOpen' ],
    components: {
        [ Drawer.name ]: Drawer,
        [ FormItem.name ]: FormItem,
        [ Form.name ]: Form,
        [ Button.name ]: Button,
        [ Input.name ]: Input,
        'bm-innerUpLoadImg': UpLoadImg,
        'bm-innerModelSelect': ModelSelect
    },
    methods: {
        handleClose(){
            this.$emit("changeInnerDrawer",this.clickBtnClose,this.innerForm);
        },
        save(FormName){
            this.$refs[FormName].validate((valid)=>{
                if(valid){
                    this.clickBtnClose = true;
                    this.handleClose();
                    this.clickBtnClose = false;
                }
            })
            
        }
    }
}
</script>
<style lang="scss">
    .bm-inner-drawer{
        overflow-y: scroll;
        .bm-inner-form{
            margin-top:30px;
            padding-left:20px;
        }
        .el-input__inner{
            width:250px;
        }
    }
</style>