<template>
    <el-drawer
        custom-class="bng-drawer"
        title="标题栏配置"
        :visible="openDrawer"
        :before-close="handleClose"
        size="692px"
        direction="rtl">
        <bng-layout :oneItem="oneItem" />
        <el-form class="bng-drawer-form" :model="oneItem" label-position="top">
            <el-form-item label="样式选择" prop="IsIcon">
                <el-radio-group v-model="oneItem.IsIcon">
                    <div class="bng-drawer-radio">
                        <el-radio :label=0>LOGO列表显示</el-radio>
                    </div>
                    <div class="bng-drawer-radio">
                        <el-radio :label=1>LOGO滚动显示</el-radio>
                    </div>
                    <div class="bng-drawer-radio">
                        <el-radio :label=2>LOGO文字滚动显示1</el-radio>
                    </div>
                    <div class="bng-drawer-radio">
                        <el-radio :label=3>LOGO文字滚动显示2</el-radio>
                    </div>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="oneItem.IsIcon != 0 && oneItem.IsIcon != 1" label="LOGO背景颜色" prop="LogoColor">
                <el-color-picker v-model="oneItem.LogoColor" />
            </el-form-item>
            <el-form-item label="背景颜色" prop="BackColor">
                <el-color-picker v-model="oneItem.BackColor" />
            </el-form-item>
            <el-form-item label="品牌选择" prop="ShopPro">
                  <el-select value-key="ShopPromotionId" v-model="oneItem.ShopPro" multiple placeholder="请选择">
                    <el-option
                    v-for="item in shopPromotion"
                    :key="item.ShopPromotionId"
                    :label="item.StoreName"
                    :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="save" type="primary">保存</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>
<script>
import { Drawer, Form, FormItem, Button, ColorPicker, RadioGroup, Radio, Select, Option } from "element-ui";
import BrandNaviGationLayout  from "./BrandNaviGationLayout.vue";
import { mapGetters, mapActions } from "vuex";
export default {
    name: "bngDrawer",
    components: {
        [ Drawer.name ]: Drawer,
        [ Form.name ]: Form,
        [ FormItem.name ]: FormItem,
        [ Button.name ]: Button,
        [ ColorPicker.name ]: ColorPicker,
        [ RadioGroup.name ]: RadioGroup,
        [ Radio.name ]: Radio,
        [ Select.name ]: Select,
        [ Option.name ]: Option,
        'bng-layout': BrandNaviGationLayout
    },
    computed: {
        ...mapGetters("myDetail", {
            shopPromotion: "shopPromotion"
        })
    },
    methods: {
        handleClose(){//关闭抽屉
            this.$emit("changeDrawerStatu",false,this.oneItem);
        },
        ...mapActions("myDetail",{
            saveBrandNaviGation: "saveBrandNaviGation",
            getPhoneData: "getPhoneData"
        }),
        save(){//保存数据
            this.saveBrandNaviGation(this.oneItem).then(()=>{
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
    .bng-drawer {
        .el-drawer__body {
            // overflow-y: scroll;
            .bng-layout {
                margin-top: 30px;
                padding: 10px 100px;
            }
            .bng-drawer-form {
                padding: 0 30px;
            }
            .el-form-item__label {
                padding-bottom: 0;
            }
            .bng-drawer-radio + .bng-drawer-radio {
                margin-top: 10px;
            }
            .el-color-picker,
            .el-color-picker__trigger {
                width: 100%;
            }
            .el-select {
                width: 100%;
            }
        }
    }
</style>