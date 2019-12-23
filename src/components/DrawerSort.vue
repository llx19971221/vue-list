<template>
    <el-form-item class="nav-table">
        <i class="el-icon-warning">拖动行可以设置显示顺序</i>
        <el-row class="table-header slick-row">
            <el-col :class="'el-col-'+tableHeaderLength" v-for="item in tableHeader" :key='item'>{{item}}</el-col>
        </el-row>
        <div class="drawer-slick"><!--拖动排序-->
            <SlickList v-if="tableHeaderLength === 5" :distance=20  v-model="slickArrayCom" helperClass="drawer-hstyle" lockAxis="y" :lockToContainerEdges=true :hideSortableGhost=true >
                <SlickItem v-for="(item,idx) in slickArrayCom" :index="idx" :key='idx'>
                    <el-row class="slick-row">
                        <el-col :class="'col-num el-col-'+tableHeaderLength">{{idx+1}}</el-col>
                        <el-col :class="'el-col-'+tableHeaderLength"><img class="col-img" :src="'/list/'+item.ImageUrl" /></el-col>
                        <el-col :class="'el-col-'+tableHeaderLength"><p class="col-nameLink">{{item.Name?item.Name:item.Title}}</p></el-col>
                        <el-col :class="'el-col-'+tableHeaderLength" v-if="item.LinkType === 1"><P class="col-nameLink">无</p></el-col>
                        <el-col :class="'el-col-'+tableHeaderLength" v-else-if="item.LinkType === 2"><P class="col-nameLink">{{item.ShowFunctionName}}</p></el-col>
                        <el-col :class="'el-col-'+tableHeaderLength" v-else><P class="col-nameLink">{{item.LinkUrl}}</p></el-col>
                        <el-col :class="'col-do el-col-'+tableHeaderLength">
                            <el-link @click="EditOneImg(idx)" type="primary" style="margin-right: 10px;">编辑</el-link>
                            <el-link @click="DelOneImg(idx)" type="primary">删除</el-link>
                        </el-col>
                    </el-row>
                </SlickItem>
            </SlickList>
            <SlickList v-if="tableHeaderLength === 6" :distance=20  v-model="slickArrayCom" helperClass="drawer-hstyle" lockAxis="y" :lockToContainerEdges=true :hideSortableGhost=true >
                <SlickItem v-for="(item,idx) in slickArrayCom" :index="idx" :key='idx'>
                    <el-row class="slick-row">
                        <el-col :class="'col-num el-col-'+tableHeaderLength">{{idx+1}}</el-col>
                        <el-col :class="'el-col-'+tableHeaderLength"><img class="col-img" :src="'/list/'+item.ImageUrl" /></el-col>
                        <el-col :class="'el-col-'+tableHeaderLength"><img class="col-img" :src="'/list/'+item.SelectImageUrl" /></el-col>
                        <el-col :class="'el-col-'+tableHeaderLength"><p class="col-nameLink">{{item.btnName}}</p></el-col>
                        <!-- <el-col :class="'el-col-'+tableHeaderLength"><P class="col-nameLink">{{item.FunctionName?item.ShowFunctionName:item.LinkUrl?item.LinkUrl:'无'}}</p></el-col> -->
                        <el-col :class="'el-col-'+tableHeaderLength" v-if="item.LinkType === 0"><P class="col-nameLink">无</p></el-col>
                        <el-col :class="'el-col-'+tableHeaderLength" v-else-if="item.LinkType === 1"><P class="col-nameLink">{{item.ShowFunctionName}}</p></el-col>
                        <el-col :class="'el-col-'+tableHeaderLength" v-else><P class="col-nameLink">{{item.LinkUrl}}</p></el-col>
                        <el-col :class="'col-do el-col-'+tableHeaderLength">
                            <el-link @click="EditOneImg(idx)" type="primary" style="margin-right: 10px;">编辑</el-link>
                            <el-link @click="DelOneImg(idx)" type="primary">删除</el-link>
                        </el-col>
                    </el-row>
                </SlickItem>
            </SlickList>
        </div>
    </el-form-item>
</template>
<script>
import { SlickList, SlickItem } from 'vue-slicksort';
import { FormItem, Row, Col, Link, Icon } from "element-ui";
export default {
    name: "drawerSort",
    components: {
        SlickList,
        SlickItem,
        [ Row.name ]: Row,
        [ Col.name ]: Col,
        [ Link.name ]: Link,
        [ FormItem.name ]: FormItem
    },
    computed:{
        tableHeaderLength(){
            return this.tableHeader.length;
        },
        slickArrayCom: {
            get(){
                return this.slickArray;
            },
            set(val){
                this.$emit("changeOneItemButtons",val);
            }   
        }
    },  
    props: ['tableHeader', 'slickArray', 'EditOneImg', 'DelOneImg']
}
</script>
<style lang="scss">
.drawer-hstyle{
    text-indent: -9999px;
    z-index: 3000;
    outline: 5px dashed rgb(64,158,255);
    img{
        visibility: hidden;
    }
}
.nav-table{
    .el-icon-warning{
        display: block;
        padding: 8px 15px 8px 37px;
        border-radius: 3px;
        background-color: #e6f7ff;
        border: 1px solid #91d5ff;
        margin-bottom: 10px;
        &::before{
            color:rgb(64,158,255);
            margin-right: 6px;
        }
    }
}
.nav-table .el-row{
    height:65px;
    padding:0;
    &.table-header{
        height: 52px;
        background-color: rgb(250,250,250);
    }
    &.slick-row .el-col{
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        height: 100%;
        .col-img{
            width:32px;
            height:32px;
            vertical-align: top;
        }
        .col-nameLink{
            width:100%;
            line-height: 1.1;
            text-align: center;
            word-break: break-all;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }
    &.slick-row .col-do{
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }
    .el-col-5{
        width:20%;
    }
    .el-col-6{
        width:16.66%;
    }
}
</style>