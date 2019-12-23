<template>
    <div class="shadow">
        <el-button @click="childUpdate"  class="el-icon-edit-outline" type="primary">编辑</el-button>
        <el-button @click="childDelete"  class="el-icon-delete" type="danger">删除</el-button>
    </div>
</template>
<script>
import { Button, MessageBox, Icon } from 'element-ui';
import { mapActions } from 'vuex';
export default {
    name: "shadowBox",
    components: {
        [ Button.name ]: Button
    },
    props: [ 'openDrawer', 'oneItem'],
    methods: {
        ...mapActions("myDetail",{
            removePhoneData: "removePhoneData",
            removeFunctionalModule: "removeFunctionalModule",
            removeTitleBar: "removeTitleBar",
            removeBottomMenu: "removeBottomMenu",
            removeMallintegral: "removeMallintegral",
            removeBrandNaviGation: "removeBrandNaviGation",
            getPhoneData: "getPhoneData"
        }),
        childUpdate(){//显示抽屉
            let obj = {
                data: _.cloneDeep(this.oneItem),
                openDrawer: true
            }
            this.$emit("changeDrawerStatu", true,  _.cloneDeep(this.oneItem));
        },
        childDelete(){//删除组件
            let fn = null;
            console.log(this.oneItem.type, this.oneItem.Id);
            if(this.oneItem.type === 1){
                fn = ()=>{
                    this.removePhoneData({ imageConfigId: this.oneItem.Id}).then(()=>{
                        this.getPhoneData();
                    })
                };
            }
            else if(this.oneItem.type === 2){
                fn = ()=>{
                    this.removeBrandNaviGation({ modelId: this.oneItem.Id}).then(()=>{
                        this.getPhoneData();
                    })
                };
            }else if(this.oneItem.type === 3){
                fn = ()=>{
                    this.removeFunctionalModule({ modelId: this.oneItem.Id}).then(()=>{
                        this.getPhoneData();
                    })
                };
            }else if(this.oneItem.type === 4){
                fn = ()=>{
                    this.removeTitleBar({ titleConfigId: this.oneItem.Id}).then(()=>{
                        this.getPhoneData();
                    })
                };
            }else if(this.oneItem.type === 5){
                fn = ()=>{
                    this.removeMallactivity({ activityConfigId: this.oneItem.Id}).then(()=>{
                        this.getPhoneData();
                    })
                };
            }else if(this.oneItem.type === 6){
                // integralConfigId
                fn = ()=>{
                    this.removeMallintegral({ integralConfigId : this.oneItem.Id }).then(()=>{
                        this.getPhoneData();
                    })
                }

            }else if(this.oneItem.type === 7){
                fn = ()=>{
                    this.removeBottomMenu({ imageConfigId : this.oneItem.Id }).then(()=>{
                        this.getPhoneData();
                    })
                }
            }
            this.deleteMessageTemp(fn);
        },
        deleteMessageTemp(fn){
             MessageBox.confirm("您确定要删除该项吗?",'警告',{
                    "cancelButtonText": "取消",
                    'confirmButtonText': "确定"
                }).then(fn)
                .catch(()=>{
                    return;
                })
        }
    }
}
</script>
<style lang="scss">
    .shadow .el-button::before{
        margin-right: 3px;
    }
</style>