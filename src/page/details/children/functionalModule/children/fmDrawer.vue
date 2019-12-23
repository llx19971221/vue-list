<template>
    <el-drawer
        class="fm-drawer"
        title="功能模块配置"
        :visible="openDrawer"
        :before-close="handleClose"
        size="692px"
        direction="rtl">
        <!--swiper-->
        <fm-swiper 
        :oneItem="oneItem"/>
        <!--样式选择-->
        <el-form class="fm-other-option" v-model="oneItem" label-position="top">
            <el-form-item label="样式选择（每行）">
                <el-radio-group v-model="oneItem.StyleType" size="mini">
                    <el-radio-button :label=5 >5个每行</el-radio-button>
                    <el-radio-button :label=4 >4个每行</el-radio-button>
                    <el-radio-button :label=3 >3个每行</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="样式选择（每行）">
                <el-radio-group v-model="oneItem.RowShowType" size="mini">
                    <el-radio-button :label=1 >滚动显示</el-radio-button>
                    <el-radio-button :label=0 >换行显示</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="底色选择">
                <el-color-picker v-model="oneItem.BackgroundColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="字体大小设置">
                <el-select v-model="oneItem.FontSize" placeholder="请选择">
                    <el-option
                    v-for="item in fontOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="字体颜色设置">
                <el-color-picker v-model="oneItem.FontColor"></el-color-picker>
            </el-form-item>
            <el-form-item>
                <el-button @click='innerDrawerOpen' type="primary">新增图标+</el-button>
            </el-form-item>
            <!--拖动排序组件-->
            <fm-drawerSort :tableHeader="tableHeader" :slickArray="oneItem.Buttons" :EditOneImg="fmEditOneImg" :DelOneImg="fmDelOneImg" @changeOneItemButtons="changeOneItemButtons"/>
            <el-form-item class="fm-drawer-btn">
                <el-button-group>
                    <el-button @click="handleClose" type="default" icon="el-icon-close">取消</el-button>
                    <el-button @click="saveFmData" type="primary" icon="el-icon-check">确定</el-button>
                </el-button-group>
            </el-form-item>
        </el-form>
        <el-drawer
        title="图标设置"
        custom-class="fm-inner-drawer"
        :visible.sync="innerDrawer"
        size="500px"
        :append-to-body="true"
        direction="rtl">
        <el-form label-width="100px" ref="innerForm" :rules="myRules" label-position="right" :model="innerForm">
            <el-form-item label="序号:" prop="OrderNo">
                <el-input v-model="innerForm.OrderNo" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="按钮名称:" prop="Name">
                <el-autocomplete v-model="innerForm.Name" :fetch-suggestions="innerFetchSuggest" placeholder="请输入按钮名称"></el-autocomplete>
            </el-form-item>
            <fm-modelSelect :innerForm="innerForm" :LinkType="'LinkType'" :FunctionName="'FunctionName'" :LinkUrl="'LinkUrl'" :ShowFunctionName="'ShowFunctionName'" :useOneOrTwo="true" />
            <!--加载图片组件-->
            <fm-upLoad :innerForm="innerForm" :bestSize="'80px*80px'" :myProp="'ImageUrl'" />
            <el-form-item>
                <el-button @click="submitInnerForm('innerForm')" type="primary">确定</el-button>
            </el-form-item>
        </el-form>
        </el-drawer>
    </el-drawer>
</template>
<script>
import FmSwiper from "./FmSwiper.vue";
import ModelSelect from "@/components/ModelSelect.vue";
import DrawerSort  from "@/components/DrawerSort.vue";
import UpLoadImg from "@/components/UpLoadImg.vue";
import { SlickList, SlickItem } from 'vue-slicksort';
import { mapActions } from "vuex";
import { Drawer, RadioButton, RadioGroup, Form, FormItem, Select, Option, Button, ButtonGroup, ColorPicker, Icon, Input, Autocomplete, MessageBox } from "element-ui";
export default {
    name: "fmDrawer",
    data(){
        return {
            tableHeader:[ '序号', '图标', '按钮名称', '打开链接', '操作' ],
            ifNewAdd: true,
            innerDrawer: false,//内部Drawer
            defaultImgUrl: "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",//没有图片就用它
            totalColNum: this.oneItem.Buttons.length === 0?10:this.oneItem.Buttons.length,//总共有10个功能模块
            showRowNum: 2,//一页显示2行
            fontOptions: [
                {
                    label: "12px",
                    value: 12
                },
                {
                    label: "13px",
                    value: 13
                },{
                    label: "14px",
                    value: 14
                },{
                    label: "15px",
                    value: 15
                },{
                    label: "16px",
                    value: 16
                },{
                    label: "17px",
                    value: 17
                },{
                    label: "18px",
                    value: 18
                },
            ],//字体选项
            innerForm: {
                FunctionName: "",//系统模块选了第几个
                FunctionType: 1,
                Id: btoa(new Date().toUTCString()),
                LinkType: 1,
                ModelId: this.oneItem.Id,
                ShowFunctionName: "",//最后显示给用户看的模块名
                ShowFunctionType: "默认功能分类",
                Name: "",
                OrderNo: this.oneItem.Buttons.length + 1,
                LinkUrl: "",//如果选第一个或者第二个，这个就不填，不然就填上
                ImageUrl: ""
            },
            myRules:{
                Name: [ 
                    { required: true, message: "不能为空", trigger: "blur" },
                    { min: 2, message: '至少2个长度', trigger: 'change' }
                ],
                LinkType: [
                    { required: true, message: "请选择一个链接"}
                ],
                FunctionName: [
                    { required: true, message: "请您选择一个功能模块", trigger: 'blur' }
                ],
                ImageUrl: [
                    { required: true, message: "请上传图片"}
                ]
            },//新增图片规则
            idx: null,//编辑内容下标
            inputSuggest: []//输入建议
        }  
    },
    components: {
        [ FormItem.name ]: FormItem,
        [ Drawer.name ]: Drawer,
        [ RadioButton.name ]: RadioButton,
        [ RadioGroup.name ]: RadioGroup,
        [ Form.name ]: Form,
        [ ColorPicker.name ]: ColorPicker,
        [ Select.name ]: Select,
        [ Option.name ]: Option,
        [ Button.name ]: Button,
        [ ButtonGroup.name ]: ButtonGroup,
        [ Input.name ]: Input,
        [ Autocomplete.name ]: Autocomplete,
        'fm-swiper': FmSwiper,
        'fm-modelSelect': ModelSelect,
        'fm-drawerSort': DrawerSort,
        'fm-upLoad': UpLoadImg,
        SlickList,
        SlickItem
    },
    props: ['oneItem', 'openDrawer'],
    methods: {
        changeOneItemButtons(e){//子组件触发排序之后,把克隆过去改变的值，再传回来，赋值给父组件的值，这样就不会有直接改变父组件值的错误
            this.oneItem.Buttons = e;
        },
         ...mapActions("myDetail",{
            saveFunctionalModule: "saveFunctionalModule",
            getPhoneData: "getPhoneData"
        }),
        innerDrawerOpen(){//打开内部抽屉
            this.innerForm = {
                FunctionName: "",//系统模块选了第几个
                FunctionType: 1,
                Id: btoa(new Date().toUTCString()),
                LinkType: 1,
                ModelId: this.oneItem.Id,
                ShowFunctionName: "",//最后显示给用户看的模块名
                ShowFunctionType: "默认功能分类",
                Name: "",
                OrderNo: this.oneItem.Buttons.length + 1,
                LinkUrl: "",//如果选第一个或者第二个，这个就不填，不然就填上
                ImageUrl: ""
            }
            this.ifNewAdd = true;
            this.innerDrawer = true;
        },
        handleClose(){//关闭抽屉
            this.$emit("changeDrawerStatu",false,this.oneItem);
        },
        saveFmData(){//保存数据
            this.saveFunctionalModule(this.oneItem).then(()=>{
                this.getPhoneData().then(()=>{
                    this.handleClose();
                });
            })
        },
        submitInnerForm(formName,innerForm){//提交内部抽屉表单
            this.$refs[formName].validate((valid)=>{
                if(valid){
                        if(this.inputSuggest.length === 0){
                            this.inputSuggest.push({ value: this.innerForm.Name });
                        }
                        else{
                            for(let i=0;i<this.inputSuggest.length;i++){
                                if(this.inputSuggest[i].value !=  this.innerForm.Name){
                                    if(i === this.inputSuggest.length-1){
                                        this.inputSuggest.push({ value: this.innerForm.Name });
                                    }  
                                }
                            }
                        }
                        if(this.ifNewAdd){
                            this.oneItemButtons.push(this.innerForm);
                        }else{
                            this.oneItem.Buttons[this.idx] = this.innerForm;
                            this.oneItem.Buttons = _.cloneDeep(this.oneItem.Buttons);
                        }
                        this.innerDrawer = false;
                }else{
                    return false;
                }
            })
        },
        innerFetchSuggest(query,cb){//返回输入建议
            cb( this.inputSuggest);
        },
        fmDelOneImg(idx){//删除功能模块中的一个按钮
            MessageBox.confirm("确定要删除该项？","提示",{
                confirmButtonText: "确定",
                cancelButtonText: '取消'
            }).then(()=>{
                this.oneItem.Buttons.splice(idx,1);
            }).catch(()=>{
                return;
            })
        },
        fmEditOneImg(idx){//设置功能模块中的一个按钮
            this.ifNewAdd = false;
            this.idx = idx;
            this.innerForm = _.cloneDeep(this.oneItem.Buttons[idx]);
            this.innerDrawer = true;
        }
    }
}
</script>
<style lang="scss">
    .fm-drawer .head-swiper{
        width:375px;
        margin:20px auto;
    }
    .fm-drawer .el-drawer__open .el-drawer.rtl{
        overflow-y: scroll;
    }
    .fm-other-option{
        box-sizing: border-box;
        padding:0 30px 50px;
        .el-form-item__label{
            padding:0;
            line-height:1.2
        }
        .el-form-item__content{
            line-height:normal;
        }
        .el-select,
        .el-color-picker,
        .el-color-picker__trigger{
            width:100%;
        }
        .fm-drawer-btn{
            text-align: right;
            position: fixed;
            bottom: 0;
            z-index: 2010;
            background-color: rgb(250,250,250);
            width: 675px;
            right: 17px;
            box-sizing: border-box;
            padding: 20px 20px;
            margin:0;
            // box-shadow: 0px -3px 22px 0px #000;
        }
        .fm-drawer-hstyle{
            text-indent: -9999px;
            z-index: 3000;
            outline: 5px dashed rgb(64,158,255);
            img{
                visibility: hidden;
            }
        }
    }
    .fm-inner-drawer {
        .el-drawer__body{
            padding-right:130px;
        }
        .el-form-item:nth-child(1) {
            margin-top:40px;
        }
    }
</style>