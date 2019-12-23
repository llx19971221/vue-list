<template>
    <div class="wrap">
        <!-- <qr-code :id="qrId" /> -->
        <el-button
        class="add-btn"
        size="medium "
        type="primary"
        @click="openAdd"
        >增加</el-button>
        <el-table
            size="small"
            :border=true
            :header-row-class-name="headerRowStyle"
            :row-class-name="tableRowClassName"
            :data="tableData">
            <el-table-column
            label="配置名称"
            align="center"
            prop="ConfigName">
            <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="点击获取详细信息" placement="right">
                    <router-link class="row-nav" :to="'/setting/details?id='+scope.row.Id">{{scope.row.ConfigName}}</router-link>
                </el-tooltip>
            </template>
            </el-table-column>
            <el-table-column
            label="创建人"
            align="center"
            prop="CreatorName">
            </el-table-column>
            <el-table-column
            label="创建时间"
            align="center"
            prop="ShowAddTime">
            </el-table-column>
            <el-table-column
            label="状态"
            align="center"
            prop="ShowPublishStatus">
            </el-table-column>
            <el-table-column
                label="操作"
                align="center">
                <template slot-scope="scope">
                        <!-- <el-popover
                        class="two-code"
                        placement="left"
                        :disabled="scope.row.PublishStatus != 1"
                        trigger="click"
                        @after-enter="showPopover"> -->
                            <el-button
                            size="medium"
                            :type="scope.row.PublishStatus ===1?'success':'default'"
                            @click="publish(scope.row.Id,scope.row.ConfigName,scope.row.PublishStatus)"
                            >{{scope.row.PublishStatus === 1? '预览' : '发布'}}</el-button>
                        <!-- </el-popover> -->
                    <!-- <el-button
                    size="medium"
                    type="info"
                    @click="update(scope.row.Id,scope.row.ConfigName)"
                    >修改</el-button> -->
                    <!-- <el-button
                    size="medium"
                    type="danger"
                    @click="remove(scope.row.Id)"
                    >删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination
                layout="total, prev, pager, next, jumper, sizes"
                align='center'
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize"
                :pager-count="5"
                :total="totalItem">
            </el-pagination>
            
        </div>
        <!-- <router-view></router-view> -->
        <qr-code @changeQrCodeDrawer="changeQrCodeDrawer" :id="qrId" :openQrDrawer="openQrDrawer" />
    </div>
</template>

<script>
  import { Table, TableColumn, Button, MessageBox, Pagination, Popover, Tooltip, Drawer } from "element-ui";
  import { mapActions, mapGetters } from "vuex";
  import QRCode from "./QrCode.vue";
    export default {
    name:"MyList",
    components:{
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        [Button.name]: Button,
        [Pagination.name]: Pagination,
        [Popover.name]:Popover,
        [Tooltip.name]: Tooltip,
        [ Drawer.name ]: Drawer,
        'qr-code': QRCode
        // [MessageBox.name]:MessageBox
    },
    data() {
        return {
            tableData: [],
            totalItem: 1,
            pageSize: 5,
            currentPage: 1,  
            showP: false,
            qrId:null,
            openQrDrawer: false
        }
    },
    computed:{
        ...mapGetters("myList",{
            startData: "startData",
            total: "total"
        })
    },
    methods:{
        changeQrCodeDrawer(){
            this.openQrDrawer = false;
        },
        showPopover(){
            this.showP = true;
        },
        headerRowStyle(){
            // console.log(1);
            return "header-row-style";
        },
        tableRowClassName({ row }) {//发布行变色
            if(row.PublishStatus === 1){
                // console.log(2);
                return "success-row";
            }
        },
        handleCurrentChange() {//换页
            this.dealStartData();
        },
        handleSizeChange(val) {//改变每页显示大小
            this.pageSize=val;
            this.dealStartData();
        },
        ...mapActions("myList", {
            startGetData:'startGetData',//得到初始数据
            saveData: 'saveData',//新增
            removeData: 'removeData',//删除
            publishData: 'publishData',//发布
            updateData: 'updateData'
        }),
        dealStartData() {//得到初始数据方法
            this.Nprogress.start();
            this.startGetData({
                Skip:this.currentPage,
                Take:this.pageSize
            }).then(e=>{
                this.Nprogress.done();
                if(this.startData.length==0){
                    this.tableData=[];
                    this.totalItem=1;
                }else{
                    // console.log(this.startData);
                    this.totalItem=this.total;
                    this.tableData=this.startData;
                }
            })
        },
        openAdd() {//新增方法
             MessageBox.prompt('请输入新增配置名', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPlaceholder: "新增配置名",
                inputPattern: /^[^\s\.\,\/\*\&\^\%\$\#\@\!\~\/\_\-\=]+$/,
                inputErrorMessage: "错误的配置名",
                closeOnClickModal: false
            }).then(({ value })=>{
                // console.log(value);
                this.saveData({ConfigId:"",ConfigName:value}).then((res) => {
                    if(res.status === 1){
                        this.totalItem++;
                        this.currentPage = Math.ceil((this.totalItem)/this.pageSize);
                        this.dealStartData();
                    }
                }).catch(()=>{
                    return;
                });
            })
        },
        remove(id) {//删除
            MessageBox.confirm('此操作将删除表格对应项, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                // console.log(id);
                this.removeData({
                    configId:id
                }).then((res)=>{
                    if(res.status === 1){
                        this.totalItem--;
                        let totalPage = Math.ceil((this.totalItem)/this.pageSize);
                        if(totalPage < this.currentPage){
                            this.currentPage--;
                        }
                        this.dealStartData();
                    }
                })
            }).catch(()=>{
                return;
            })
        },
        publish(id,configName,publishStatus) {//发布
            if(publishStatus === 1){
                this.qrId = id;
                this.openQrDrawer = true;
                return ;
            }
            else{
                MessageBox.confirm(`您确定要发布"${configName}"吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type:"warning"
                }).then(()=>{
                    this.publishData({configId:id}).then(e=>{
                        if(e.status === 1){
                            this.dealStartData();
                        }
                    })
                })
            }
            
        },
        update(id,configName) {//修改
            MessageBox.prompt(`请修改配置名称`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputValue: configName,
            inputPlaceholder: "配置名称",
            inputPattern: /^[^\s\.\,\/\*\&\^\%\$\#\@\!\~\/\_\-\=]+$/,
            inputErrorMessage: "错误的配置名",
            closeOnClickModal: false
            }).then(({ value })=>{
                this.updateData({ConfigId:id,configname:value}).then(e=>{
                    if(e.status === 1){
                        this.dealStartData();
                    }
                })
            }).catch(()=>{
                return;
            })
        }
    },
    mounted() {
        this.dealStartData();
        // this.qrcode();
    }
}
</script>
<style lang="scss" scoped>
.wrap{
    position: relative;
    width: 100%;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
    min-width: 1320px;
    margin: 0 auto;
    overflow: hidden;
}
.el-dialog__wrapper{
    top: 0;
    width: 100%;
    height: 100%;
}
.add-btn{
    margin-bottom: 20px;
}
.page{
    margin-top: 10px;
}
.row-nav{
    color:rgb(64,169,254);
}
.publish-box{
    margin-right:10px;
}
.two-code{
    margin-right:10px;
}
.el-table .header-row-style{
    background-color:rgb(250,250,250);
}
.el-table th{
    background-color:inherit;
}
</style>