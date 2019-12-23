<template>
    <div id="root">
        <el-container>
            <el-header>
                <el-page-header
                    title=""
                    :content="'Id: '+id"
                    @back="goBack">
                </el-page-header>
            </el-header>
            <div class="container">
                <el-aside style="position:fixed;" width="200px">
                    <el-col>
                        <el-button @click="addChild(1)" type="primary" data-text="滚屏广告" plain><p class="title">点击添加</p></el-button>
                        <el-button @click="addChild(2)" type="primary" data-text="功能模块" plain><p class="title">点击添加</p></el-button>
                        <el-button @click="addChild(3)" type="primary" data-text="品牌导航" plain><p class="title">点击添加</p></el-button>
                        <el-button @click="addChild(4)" type="primary" data-text="标题栏" plain><p class="title">点击添加</p></el-button>
                        <el-button @click="addChild(5)" type="primary" data-text="活动推荐" plain><p class="title">点击添加</p></el-button>
                        <el-button @click="addChild(6)" type="primary" data-text="积分商城" plain><p class="title">点击添加</p></el-button>
                        <el-button @click="addChild(7)" type="primary" data-text="底部菜单" plain><p class="title">点击添加</p></el-button>
                    </el-col>
                </el-aside>
                <div :class="mainStyle">
                    <SlickList
                    :distance=20
                    helperClass="helpr-style"
                    @sort-start="sortStart"
                    @sort-move="sortMove"
                    @sort-end="sortEnd"
                    v-model="phoneData">
                        <SlickItem  class="one" v-for="(item,idx) in phoneData" :index="idx" :key='item.Id'>
                                <child-swpier  v-if="item.type === 1" :oneItem="item"/>
                                <child-fm v-else-if="item.type === 2" :oneItem="item"  />
                                <child-bng v-else-if="item.type === 3" :oneItem="item" />
                                <child-ht v-else-if="item.type === 4" :oneItem="item"  />
                                <child-ar v-else-if="item.type === 5" :oneItem="item"  />
                                <child-mi v-else-if="item.type === 6" :oneItem="item"  />
                                <child-bm v-else :oneItem="item"  />
                        </SlickItem>
                    </Slicklist>
                </div>
            </div>
        </el-container>
         <el-backtop style="left:700px;right:0;background-color:#000;color:#fff;" target="body">
             <i class="el-icon-caret-top"></i>
         </el-backtop>
    </div>
</template>
<script>
import { PageHeader, Container, Header, Col, Aside, Button, MessageBox, Backtop, Icon   } from "element-ui";
import { SlickList, SlickItem } from 'vue-slicksort'
import ChildSwiper  from "./children/childSwiperTwo/ChildSwiper";
import FunctionalModule  from "./children/functionalModule/FunctionalModule.vue";
import HeaderTitle from "./children/headerTitle/HeaderTitle.vue";
import BottomMenu from "./children/bottomMenu/BottomMenu.vue";
import MallIntegral from "./children/mallIntegral/MallIntegral.vue";
import BrandNaviGation from "./children/brandNaviGation/BrandNaviGation.vue";
import ActivityRecommend from "./children/activityRec/ActivityRecommend.vue";
import { mapActions, mapGetters  } from "vuex";
import _ from "lodash";
export default {
    name:"DetailsCom",
    mounted(){
       this.id = this.$route.query.id;
       this.$store.state.myDetail.totalId=this.id;
       this.getPhoneData();
    },
    components:{
        [ PageHeader.name ]: PageHeader,
        [ Col.name ]: Col,
        [ Container.name ]: Container,
        [ Header.name ]: Header,
        [ Aside.name ]: Aside,
        [ Button.name ]: Button,
        [ Backtop.name ]: Backtop,
        "child-swpier": ChildSwiper,//轮播图
        'child-fm': FunctionalModule,//功能模块
        'child-bng': BrandNaviGation,//品牌导航
        'child-ht': HeaderTitle,//标题栏
        'child-bm': BottomMenu,//底部菜单
        'child-mi': MallIntegral,//积分商城
        'child-ar': ActivityRecommend,//活动推荐
        SlickList,
        SlickItem
    },
    data(){
        return {
            id: "",
            mainChangeColor: false,
            randId:1
        }
    },
    computed:{
        ...mapGetters("myDetail",{
            OrderNo: "OrderNo"
        }),
        phoneData: {
            get() {
                return this.$store.state.myDetail.phoneData;
            },
            set(val) {
                this.$store.state.myDetail.phoneData = val;
                console.log(val);
                this.sortPhoneData().then(()=>{
                    this.getPhoneData({ ConfigId: this.id });
                });
            }
        },
        mainStyle(){
            return {
                "main-change-color": this.mainChangeColor,
                "el-main": true
            }
        }
    },
    methods:{
        ...mapActions("myDetail",{
            getPhoneData: "getPhoneData",
            addPhoneData: "addPhoneData",
            sortPhoneData: "sortPhoneData"
        }),
        addChild(type){
            let obj = [{
                Id: "",
                ConfigId: this.id,
                OrderNo: this.OrderNo + 1,
                type: type
            }];

            this.addPhoneData(obj).then(()=>{
                this.getPhoneData({ ConfigId: this.id });
            })
        },
        goBack(){
            this.$router.go(-1);
        },
        sortMove(e){
            // console.log(e);
            if(e.event.offsetX >= 1000){
                this.mainChangeColor=false;
            }else{
                this.mainChangeColor=true;
            }
        },
        sortStart(){
            this.phoneData.forEach((e,i)=>{
                console.log(e.OrderNo);
            });
            this.mainChangeColor=true;
        },
        sortEnd(e){
            this.mainChangeColor=false;
        }
    }
}
</script>
<style lang="scss">
@import "../../assets/css/common.scss";
.shadow{
        display: flex;
        flex-flow: row nowrap;
        justify-content:center;
        align-items: center;
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background-color:transparent;
        z-index: 1000;
        transition: all .6s;
        cursor: grab;
        .el-button{
            display: none;
            padding:8px 15px;
        }
    }
.el-dialog__wrapper{
    top:0;
    width:100%;
    height:100%;
}
.el-drawer__header{
    padding-bottom: 10px;
    font-size: 16px;
    margin-bottom: 0;
    border-bottom:1px solid rgb(244,244,244);
}
.one:hover .shadow{
    background-color:rgba(0,0,0,.7);
}
.one:hover .el-button{
    display: block;
}
.shadow:hover{
        cursor: grab;
    }
.el-main{
    padding: 8px;
    width: 375px;
    // background: rgb(240, 242, 245);
    background-color: #fff;
    box-shadow: rgba(63, 70, 82, 0.5) 0px 0px 12px inset;
    flex:none;
    margin-left:40px;
    min-height:180px;
    transition: all .4s;
    margin-left:250px;
    // flex:0;
}
.main-change-color{
    background-color:rgb(248,208,209);
}
.one{
    position: relative;
    height: auto;
    z-index: 2;
}
.helpr-style{
    outline: 3px dashed #1890FF;
}
#root{
    min-width:960px;
}
.el-page-header{
    padding:20px;
}
.el-page-header__content{
    color:rgb(140,140,140);
}
i.el-icon-back:hover {
    color: rgb(112,191,255);
}
.el-col .el-button + .el-button{
    margin:0;
    margin-top:20px;
}
.el-col .el-button{
    position:relative;
    padding: 0;
    border-radius:30px;
    border: 3px solid #1890FF;
    background-color:rgb(230,230,230);
    color:#1890FF;
    font-size:16px;
    width:160px;
    height:62px;
    overflow:hidden;
    .title{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        line-height:62px;
        border-radius:25px;
        z-index: 0;
        transform: scale3d(0.3,0.3,0.3);
        background-color:#1890FF;
        transition: all .2s linear;
        color:#fff;
    }
}
.el-button--primary.is-plain:focus{
    color: #409eff;
}
.el-col-24{
    display:flex;
    flex-flow:column nowrap;
    align-items:center;
}
.el-container{
    padding: 0 20px;
}
.el-col .el-button--primary.is-plain::before,
.el-col-24 .el-button--primary.is-plain::after {
    content: attr(data-text);
    display: block;
    position:relative;
    width:100%;
    overflow:hidden;
    height:31px;
    z-index:1;
    background-color:#F2F6F9;
}
.el-col-24 .el-button--primary.is-plain::after {
    top:0px;
    line-height: 0;
    transition: top .3s linear;
}
.el-col .el-button--primary.is-plain::before{ 
    bottom:0px;
    transition: bottom .3s linear;
    line-height: 62px;
}
.el-col .el-button--primary.is-plain:hover{
    background-color:#ccc;
    color:#1890FF;
    background:#ccc;
}
.el-col .el-button--primary.is-plain:hover::before{
    bottom:35px;
}
.el-col .el-button--primary.is-plain:hover::after{
    top:35px;
}
.el-col .el-button--primary.is-plain:hover  .title{
    transform:scale3d(1,1,1);
}
@keyframes move-up{
    0%{
        margin-bottom:0;
    }
    100%{
        margin-bottom:35px;
    }
}
.container{
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 30px 0;
}
</style>