<template>
       <el-drawer
        custom-class="mi-drawer"
        title="积分商城配置"
        :visible="openDrawer"
        :before-close="handleClose"
        size="692px"
        direction="rtl">
        <mi-layout :oneItem="oneItem"/>
        <el-form :model="oneItem" label-position="top">
            <el-form-item label="商品数量" prop="AccordingNum">
                <el-input-number :min="4" :max="10" v-model="oneItem.AccordingNum" />
            </el-form-item>
            <el-form-item label="显示样式" prop="Style">
                <el-radio-group v-model="oneItem.Style">
                    <el-radio-button :label=1>并排显示</el-radio-button>
                    <el-radio-button :label=2>单行显示</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="名称文字大小" prop="NameSize">
                <el-select v-model="oneItem.NameSize">
                    <el-option v-for="(item,idx) in nameSizeArr" :label="item.name" :value="item.value" :key='idx' />
                </el-select>
            </el-form-item>
            <el-form-item label="名称颜色" prop="NameColor">
                <el-color-picker v-model="oneItem.NameColor" />
            </el-form-item>
            <el-form-item label="积分文字大小" prop="PointsSize">
                <el-select v-model="oneItem.PointsSize">
                    <el-option v-for="(item,idx) in pointsSizeArr" :label="item.name" :value="item.value" :key='idx' />
                </el-select>
            </el-form-item>
            <el-form-item label="积分颜色" prop="PointsColor">
                <el-color-picker v-model="oneItem.PointsColor" />
            </el-form-item>
            <el-form-item label="按钮文字大小" prop="BtnNameSize">
                <el-select v-model="oneItem.BtnNameSize">
                    <el-option v-for="(item,idx) in buttonSizeArr" :label="item.name" :value="item.value" :key='idx' />
                </el-select>
            </el-form-item>
            <el-form-item label="按钮颜色" prop="BtnNameColor">
                <el-color-picker v-model="oneItem.BtnNameColor" />
            </el-form-item>
            <el-form-item label="按钮背景颜色" prop="BtnBackColor">
                <el-color-picker v-model="oneItem.BtnBackColor" />
            </el-form-item>
            <el-form-item align="right">
                <el-button @click="save" type="primary">保存</el-button>
            </el-form-item>
        </el-form>
       </el-drawer>
</template>
<script>
import MallLaout from "./MallLayout.vue";
import { Drawer, InputNumber, Form, FormItem, ColorPicker, Select, Option, RadioGroup, RadioButton, Button } from 'element-ui';
import { mapActions } from 'vuex';
export default {
    name: "mallDrawer",
    data(){
        return {
            nameSizeArr: [
                {
                    name: "14px",
                    value: 14
                },
                {
                    name: "15px",
                    value: 15
                },
                {
                    name: "16px",
                    value: 16
                }
            ],
            pointsSizeArr: [
                {
                    name: "0px",
                    value: 0
                },
                {
                    name: "6px",
                    value: 6
                },
                {
                    name: "12px",
                    value: 12
                },
                {
                    name: "15px",
                    value: 15
                },
                {
                    name: "20px",
                    value: 20
                }
            ],
            buttonSizeArr: [
                {
                    name: "14px",
                    value: 14
                },
                {
                    name: "16px",
                    value: 16
                },
                {
                    name: "18px",
                    value: 18
                },
                {
                    name: "20px",
                    value: 20
                }
            ],
        }
    },
    components: {
        [ Drawer.name ]: Drawer,
        [ InputNumber.name ]: InputNumber,
        [ Form.name ]: Form,
        [ FormItem.name ]: FormItem,
        [ ColorPicker.name ]: ColorPicker,
        [ Select.name ]: Select,
        [ Option.name ]: Option,
        [ RadioGroup.name ]: RadioGroup,
        [ RadioButton.name ]: RadioButton,
        [ Button.name ]: Button,
        'mi-layout': MallLaout
    },
    methods: {
        ...mapActions("myDetail",{
            saveMallintegral: "saveMallintegral",
            getPhoneData: "getPhoneData"
        }),
        handleClose(){//关闭抽屉
            this.$emit("changeDrawerStatu",false,this.oneItem);
        },
        save(){
            this.saveMallintegral(this.oneItem).then(()=>{
                this.getPhoneData().then(()=>{
                    this.handleClose();
                })
            })
        }
    },
    props:  [ 'openDrawer', 'oneItem']
}
</script>
<style lang="scss">
    .mi-drawer .el-drawer__body{
        padding: 0 30px;
        margin-top: 20px;
        overflow-y: scroll;
        .mi-style-one,
        .mi-style-two {
            padding:0 140px;
        }
        .el-form-item__label{
            line-height: 1.2;
            margin: 0;
        }
        .el-color-picker,
        .el-color-picker__trigger{
            width: 100%;
        }
    }
</style>