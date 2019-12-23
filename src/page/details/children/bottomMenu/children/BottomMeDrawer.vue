<template>
    <el-drawer
        custom-class="bm-drawer"
        title="底部菜单设置"
        :visible="openDrawer"
        :before-close="handleClose"
        size="692px"
        direction="rtl">
        <bm-layout :oneItem="oneItem" />
        <el-form class="bm-form" :model="oneItem" label-position="top">
            <el-form-item label="背景颜色设置" prop="BaseColor">
                <el-color-picker v-model="oneItem.BaseColor"/>
            </el-form-item>
            <el-form-item label="未选中字体颜色" prop="FontColor">
                <el-color-picker v-model="oneItem.FontColor"/>
            </el-form-item>
            <el-form-item label="选中字体颜色" prop="SelectColor">
                <el-color-picker v-model="oneItem.SelectColor"/>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="this.oneItem.Images.length === 5" @click="bmNewAdd" type="primary">新增+</el-button>
            </el-form-item>
             <bm-drawerSort :tableHeader="tableHeader" :slickArray="oneItemImages" :EditOneImg="bmEditOneImg" :DelOneImg="bmDelOneImg" @changeOneItemButtons="changeOneItemImages"/>
            <el-form-item class="bm-btn-group">
                <el-button-group>
                    <el-button @click="save" type="primary">保存</el-button>
                    <el-button @click="cancel" type="danger">取消</el-button>
                </el-button-group>
            </el-form-item>
        </el-form>
        <bm-innerDrawer @changeInnerDrawer="changeInnerDrawer" :innerOpen="innerOpen" :innerForm="innerForm" />
     </el-drawer>
</template>
<script>
//:before-close="handleClose"
import { Drawer, FormItem, Form, ColorPicker, Button, ButtonGroup, MessageBox } from "element-ui";
import { mapActions } from "vuex";
import BottomInnerDrawer from "./BottomInnerDrawer.vue";
import BottomMeLayout from "./BottomMeLayout.vue";
import DrawerSort from "@/components/DrawerSort.vue";
export default {
    name: "bottomMeDrawer",
    data(){
        return {
            tableHeader: ['序号','未选中图标','选中图标','按钮名称','打开链接','操作'],
            innerOpen: false,//内部抽屉
            newOrEdit: true,//true是new false是编辑
            editIndex: null,//被编辑项的索引
            innerForm: {
                FunctionName: "",//系统模块选了第几个
                FunctionType: 1,
                Id: btoa(new Date().toUTCString()),
                LinkType: 0,
                menuId: this.oneItem.Id,
                ShowFunctionName: "",//最后显示给用户看的模块名
                ShowFunctionType: "默认功能分类",
                btnName: "",
                OrderNo: this.oneItem.Images.length + 1,
                LinkUrl: "",//如果选第一个或者第二个，这个就不填，不然就填上
                ImageUrl: "",
                SelectImageUrl: ""
            }
        }
    },
    components: {
        [ Drawer.name ]: Drawer,
        [ FormItem.name ]: FormItem,
        [ Form.name ]: Form,
        [ Button.name ]: Button,
        [ ButtonGroup.name ]: ButtonGroup,
        [ ColorPicker.name ]: ColorPicker,
        'bm-layout': BottomMeLayout,
        'bm-drawerSort': DrawerSort,
        "bm-innerDrawer": BottomInnerDrawer
    },
    props:  [ 'openDrawer', 'oneItem'],
    computed: {
        oneItemImages: {
            get(){
                return this.oneItem.Images;
            },
            set(val){
                this.oneItem.Images = val;
            }
        }
    },
    methods: {
        changeOneItemImages(e){//子组件触发排序之后,把克隆过去改变的值，再传回来，赋值给父组件的值，这样就不会有直接改变父组件值的错误
            this.oneItemImages = e;
        },
        changeInnerDrawer(clickBtnClose,innerForm){//内部抽屉关闭触发方法
            if(clickBtnClose&&this.newOrEdit){//如果是新增，就加入到数组
                this.oneItem.Images.push(innerForm);
            }else if(clickBtnClose&&!this.newOrEdit){//如果是编辑，就把原数组得项，替换
                this.oneItem.Images[this.editIndex] = innerForm;
                this.oneItem.Images = _.cloneDeep(this.oneItem.Images);
            }
            this.innerOpen = false;
        },
         handleClose(){//关闭抽屉
            this.$emit("changeDrawerStatu",false,this.oneItem);
        },
        ...mapActions("myDetail",{
            saveBottomMenu: "saveBottomMenu",
            getPhoneData: "getPhoneData"
        }),
        save(){//保存数据
            this.saveBottomMenu(this.oneItem).then(()=>{
                this.getPhoneData().then(()=>{
                    this.handleClose();
                });
            })
        },
        bmEditOneImg(idx){
            this.editIndex = idx;//编辑得那个下标
            this.newOrEdit = false;//点击了编辑按钮
            this.innerForm = _.cloneDeep(this.oneItem.Images[idx]);//得到编辑得数据
            this.innerOpen = true;//打开最里面得抽屉开始编辑
        },
        bmDelOneImg(idx){
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
        cancel(){//取消修改
            this.$emit("changeDrawerStatu",false,this.oneItem);
        },
        bmNewAdd(){
            this.innerForm = {
                FunctionName: "",//系统模块选了第几个
                FunctionType: 1,
                Id: btoa(new Date().toUTCString()),
                LinkType: 0,
                menuId: this.oneItem.Id,
                ShowFunctionName: "",//最后显示给用户看的模块名
                ShowFunctionType: "默认功能分类",
                btnName: "",
                OrderNo: this.oneItem.Images.length + 1,
                LinkUrl: "",//如果选第一个或者第二个，这个就不填，不然就填上
                ImageUrl: "",
                SelectImageUrl: ""
            };//初始化值，因为是新建，所以所有东西都要为初始状态
            this.newOrEdit = true;//表示是点击新增这个按钮
            this.innerOpen = true;
        }
    }
}
</script>
<style lang="scss">
    .bm-drawer .el-drawer__body{
        overflow-y: scroll;
        padding:0 30px 100px;
        margin-top: 20px;
        .el-form {
            margin-top: 20px;
        }
        .el-form-item__label{
            padding: 0;
            line-height: 1.2;
        }
        .el-color-picker{
            width: 100%;
        }
        .el-color-picker * {
            width: 100%;
        }
        .bm-btn-group{
            text-align: right;
            position: fixed;
            bottom: 0;
            z-index: 2002;
            background-color: #fafafa;
            width: 675px;
            right: 17px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            padding: 20px;
            margin: 0;
        }
    }
</style>