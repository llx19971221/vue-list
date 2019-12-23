<template>
    <el-drawer
        custom-class="ht-drawer"
        title="标题栏配置"
        :visible="openDrawer"
        :before-close="handleClose"
        size="692px"
        direction="rtl">
        <ht-TitleLayout :oneItem="oneItem"/>
        <el-form class="ht-form" :model="oneItem" label-position="top">
            <el-form-item label="上边距" prop="Fromabove" :required="true">
                <el-select v-model="oneItem.Fromabove">
                    <el-option v-for="(item,idx) in marginOptions" :key='idx' :value="item.value" :label="item.key"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="模板背景类型" prop="Istemplate" :required="true">
                <el-radio-group v-model="oneItem.Istemplate">
                    <el-radio-button :label=1>颜色背景</el-radio-button>
                    <el-radio-button :label=2>图片背景</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="oneItem.Istemplate === 1" label="选择背景颜色" prop="BackColor" :required="true">
                <el-color-picker v-model="oneItem.BackColor" />
            </el-form-item>
            <ht-upLoadImg class="ht-back-img" v-else :innerForm="oneItem" :size="'750px*30px'" :myProp="'BackImage'"/><!--背景图上传-->
            <el-form-item label="左侧标题" prop="HeadLine" :required="true">
                <el-input v-model="oneItem.HeadLine" />
            </el-form-item>
            <el-form-item label="左边字体颜色" prop="HeadLineColor" :required="true">
                <el-color-picker v-model="oneItem.HeadLineColor" />
            </el-form-item>
            <el-form-item label="左边字体大小" prop="HeadLineSize" :required="true">
                <el-select v-model="oneItem.HeadLineSize">
                    <el-option v-for="(item,idx) in fontSizeOptions" :key='idx' :value="item.value" :label="item.key"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="左边图标" prop="LeftImage" :required="true">
                <ht-upLoadImg :innerForm="oneItem" :size="'48px*48px'" :myProp="'LeftImage'"/>
            </el-form-item>
            <el-form-item label="右侧文字" prop="RightWord" :required="true">
                <el-input v-model="oneItem.RightWord" />
            </el-form-item>
            <el-form-item label="右边字体颜色" prop="RightWordColor" :required="true">
                <el-color-picker v-model="oneItem.RightWordColor" />
            </el-form-item>
            <el-form-item label="右边字体大小" prop="RightWordSize" :required="true">
                <el-select v-model="oneItem.RightWordSize">
                    <el-option v-for="(item,idx) in fontSizeOptions" :key='idx' :value="item.value" :label="item.key"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="右边图标" prop="RightImage" :required="true">
                <ht-upLoadImg :innerForm="oneItem" :size="'48px*48px'" :myProp="'RightImage'"/>
            </el-form-item>
            <!--模块选择-->
            <ht-modelSelect :innerForm="oneItem" :LinkType="'FuncType'" :FunctionName="'FuncName'" :LinkUrl="'FuncLink'" :ShowFunctionName="'ShowFunctionName'" :useOneOrTwo="false"  />
            <el-form-item class="ht-btn-group" :required="true">
                <el-button-group>
                    <el-button @click="save" type="primary">保存</el-button>
                </el-button-group>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>
<script>
import { Drawer, Form, FormItem, Button, ButtonGroup, MessageBox, ColorPicker, Select, Option, RadioGroup, RadioButton, Input } from "element-ui";
import UpLoadImg from "@/components/UpLoadImg.vue";
import TitleLayout from "./TitleLayout.vue";
import ModelSelect from "@/components/ModelSelect.vue";
import { mapActions } from "vuex";
export default {
    name: "headerDrawer",
    data(){
        return {
            fontSizeOptions: [
                {
                    value: 12,
                    key: "12px"
                },
                {
                    value: 13,
                    key: "13px"
                }
                ,{
                    value: 14,
                    key: "14px"
                },
                {
                    value: 15,
                    key: "15px"
                },
                {
                    value: 16,
                    key: "16px"
                },{
                    value: 17,
                    key: "17px"
                },
                {
                    value: 18,
                    key: "18px"
                },
                {
                    value: 19,
                    key: "19px"
                },
                {
                    value: 20,
                    key: "20px"
                }
            ],
            marginOptions: [
                 {
                    value: 0,
                    key: "0px"
                },
                {
                    value: 6,
                    key: "6px"
                }
                ,{
                    value: 12,
                    key: "12px"
                },
                {
                    value: 18,
                    key: "18px"
                },
                {
                    value: 20,
                    key: "20px"
                }
            ]
        }
    },
    components: {
        [ Drawer.name ]: Drawer,
        [ Form.name ]: Form,
        [ FormItem.name ]: FormItem,
        [ Button.name ]: Button,
        [ ColorPicker.name ]: ColorPicker,
        [ Select.name ]: Select,
        [ Option.name ]: Option,
        [ ButtonGroup.name ]: ButtonGroup,
        [ RadioGroup.name ]: RadioGroup,
        [ RadioButton.name ]: RadioButton,
        [ Input.name ]: Input,
        'ht-TitleLayout': TitleLayout,
        'ht-upLoadImg': UpLoadImg,
        'ht-modelSelect': ModelSelect
    },
    methods: {
        handleClose(){//关闭抽屉
            this.$emit("changeDrawerStatu",false,this.oneItem);
        },
        ...mapActions("myDetail",{
            saveTitleBar: "saveTitleBar",
            getPhoneData: "getPhoneData"
        }),
        save(){//保存数据
            this.saveTitleBar(this.oneItem).then(()=>{
                this.getPhoneData().then(()=>{
                    this.handleClose();
                });
            })
        }
    },
    props:  [ 'openDrawer', 'oneItem']
}
</script>
<style lang="scss">
    .ht-drawer{
        overflow-y: scroll;
        .el-drawer__body {
            margin-top:20px;
        }
        .el-drawer__body .th-layout{
            margin:0 100px;
        }
        .ht-form{
            position: relative;
            padding:0 60px 100px;
            margin-top:30px;
            .el-form-item__label{
                padding:0;
                line-height: 1.2;
            }
            .el-select{
                width:100%;
            }
            .el-color-picker{
                width:100%;
                .el-color-picker__color, 
                .el-color-picker__trigger{
                    width:100%;
                }
            }
            .ht-btn-group{
                text-align: right;
                position: fixed;
                bottom: 0;
                z-index: 2010;
                background-color: #fafafa;
                width: 675px;
                right: 17px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                padding: 20px;
                margin: 0;
            }
            .ht-back-img{
                width:100%;
            }
            .el-form-item.ht-back-img * {
                width:100%;
            }
        }
    }
</style>