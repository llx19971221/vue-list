<template>
    <el-drawer
        class="cs-inner-drawer"
        title="新增图片"
        :visible="openInnerDrawer"
        :append-to-body="true"
        :before-close="handleInnerClose"
        size="500px"
        direction="rtl">
        <el-form :model="formData" ref="myInnerForm" label-width="100px">
            <el-form-item label="编号:" prop="OrderNo" :required="true">
                <el-input v-model="formData.OrderNo" :disabled="true"/>
            </el-form-item>
            <el-form-item label="标题:" prop="Title" :required="true">
                <el-input v-model="formData.Title"/>
            </el-form-item>
            <cs-innerModelSelect :innerForm="formData" :LinkType="'LinkType'" :FunctionName="'FunctionName'" :LinkUrl="'LinkUrl'" :ShowFunctionName="'ShowFunctionName'" :useOneOrTwo="true" />
            <cs-innerUpLoadImg  :innerForm="formData" :bestSize="'750px*360px'" :myProp="'ImageUrl'" :label="'上传图片'" />
            <el-form-item>
                <el-button type="primary" @click="confirm">确定</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>
<script>
import { Drawer, Input, Form, FormItem, Button } from 'element-ui';
import ModelSelect from "@/components/ModelSelect.vue";
import UpLoadImg from "@/components/UpLoadImg.vue";
export default {
    name: "swiperInnerDrawer",
    data(){
        return {
            saveOrClose: false//保存还是直接关闭
        }
    },
    components: {
        [ Drawer.name ]: Drawer,
        [ Form.name ]: Form,
        [ FormItem.name ] :FormItem,
        [ Button.name ]: Button,
        [ Input.name ]: Input,
        'cs-innerModelSelect': ModelSelect,
        'cs-innerUpLoadImg': UpLoadImg
    },
    methods: {
        handleInnerClose(){//内部抽屉关闭
            this.$emit("changeInnerDrawer",false,this.saveOrClose,this.formData);
        },
        confirm(){
            this.$refs['myInnerForm'].validate((valid)=>{
                if(valid){
                    this.saveOrClose = true;
                    this.handleInnerClose();
                    this.saveOrClose = false;
                }
            })
            
        }
    },
    props: [ 'formData', 'openInnerDrawer']
}
</script>
<style lang="scss">
    .cs-inner-drawer{
        .el-form{
            margin-top:20px;
        }
        .el-input{
            width:250px;
        }
    }
</style>