import axios from "../../api/detail.js";
import * as type from "./detail-type.js";
import {  Loading, Notification } from "element-ui";
var details={
    state:{
        phoneData: [],
        OrderNo: null,
        totalId: null,
        activity: null,
        shopPromotion: [],//品牌
        defaultImgUrl: "https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png",//没有图片就用它
    },
    getters:{
        phoneData: state=>state.phoneData,
        OrderNo: state=>state.OrderNo,
        defaultImgUrl: state=>state.defaultImgUrl,
        activity: state=>state.activity,
        shopPromotion: state=>state.shopPromotion
    },
    actions:{
        async getPhoneData({ commit, state }){
            try{
                let load = Loading.service({target:'.el-main',background:"rgba(0,0,0,1)",text: "加载中...",spinner:"el-icon-loading"});
                let res = await axios.getPhoneData({ ConfigId : state.totalId});
                if(res.data.Status === 1){
                    commit(type.GET_PHONE_DATA,res.data.data);
                    load.close();
                    Notification.success({
                        title: '状态(status)',
                        message: '成功',
                        position: 'bottom-left',
                        duration: 1500
                    });
                }else{
                    load.close();
                    Notification.error({
                        title: '状态(status)',
                        message: '失败',
                        position: 'bottom-left',
                        duration: 1500
                    });
                }
            }catch(e){
                console.log("getPhoneData",e);
            }
        },
        async savePhoneData({ commit }, obj){
            try{
                let res = await axios.savePhoneData({configJson:JSON.stringify(obj)});
            }catch(e){
                Notification.error({
                    title: '状态(status)',
                    message: '保存数据失败',
                    position: 'bottom-left',
                    duration: 1500
                });
                console.log("savePhoneData",e);
            }
        },
        async removePhoneData({ commit }, obj){//移除swiper
            try{
                let res = await axios.removePhoneData(obj);
                
            }catch(e){
                Notification.error({
                    title: '状态(status)',
                    message: '删除数据失败',
                    position: 'bottom-left',
                    duration: 1500
                });
                console.log("removeData",e);
            }
        },
        async addPhoneData({ commit }, obj){
            try{
                let res = await axios.addPhoneData({configJson:JSON.stringify(obj)});
            }catch(e){
                Notification.error({
                    title: '状态(status)',
                    message: '加入数据失败',
                    position: 'bottom-left',
                    duration: 1500
                });
                console.log("addPhoneData",e);
            }
        },
        async sortPhoneData({ state }){//组件排序
            try{
                let res = await axios.sortPhoneData({configJson:JSON.stringify(state.phoneData)});
            }catch(e){
                Notification.error({
                    title: '状态(status)',
                    message: '排序失败',
                    position: 'bottom-left',
                    duration: 1500
                });
                console.log("sortPhoneData",e);
            }
        },

        async downBase64Img({ commit },img){
            try{
                let res = await axios.downBase64Img();
            }catch(e){
                Notification.error({
                    title: '状态(status)',
                    message: '上传失败',
                    position: 'bottom-left',
                    duration: 1500
                });
                console.log("downBase64Img",e);
            }
        },

        async removeFunctionalModule({ commit },obj){
            try{
                let res = await axios.removeFunctionalModule(obj);
            }catch(e){
                Notification.error({
                    title: '状态(status)',
                    message: '删除数据失败',
                    position: 'bottom-left',
                    duration: 1500
                });
                console.log("removeFunctionalModule",e);
            }
        },
        async saveFunctionalModule({ commit },obj){
            try{
                let res = await axios.saveFunctionalModule({modelJson:JSON.stringify(obj)});
                // console.log(res);
                
                if(res.data.Status === 1){

                }
            }catch(e){
                Notification.error({
                    title: '状态(status)',
                    message: '保存数据失败',
                    position: 'bottom-left',
                    duration: 1500
                });
                console.log("saveFunctionalModule",e);
            }
        },

        async removeTitleBar({ commit },obj){
            try{
                let res = await axios.removeTitleBar(obj);
            }catch(e){
                Notification.error({
                    title: '状态(status)',
                    message: '删除数据失败',
                    position: 'bottom-left',
                    duration: 1500
                });
                console.log("removeTitleBar",e);
            }
        },
        async saveTitleBar({ commit },obj){
            try{
                let res = await axios.saveTitleBar({configJson :JSON.stringify(obj)});
            }catch(e){
                Notification.error({
                    title: '状态(status)',
                    message: '保存数据失败',
                    position: 'bottom-left',
                    duration: 1500
                });
                console.log("saveTitleBar",e);
            }
        },
        
        async removeBottomMenu({ commit },obj){
            try{
                let res = await axios.removeBottomMenu(obj);
            }catch(e){
                Notification.error({
                    title: '状态(status)',
                    message: '删除数据失败',
                    position: 'bottom-left',
                    duration: 1500
                });
                console.log("removeBottomMenu",e);
            }
        },
        async saveBottomMenu({ commit },obj){
            try{
                let res = await axios.saveBottomMenu({configJson :JSON.stringify(obj)});
            }catch(e){
                Notification.error({
                    title: '状态(status)',
                    message: '保存数据失败',
                    position: 'bottom-left',
                    duration: 1500
                });
                console.log("saveBottomMenu",e);
            }
        },

        async removeMallintegral({ commit },obj){
            try{
                let res = await axios.removeMallintegral(obj);
            }catch(e){
                Notification.error({
                    title: '状态(status)',
                    message: '删除数据失败',
                    position: 'bottom-left',
                    duration: 1500
                });
                console.log("removeMallintegral",e);
            }
        },
        async saveMallintegral({ commit },obj){
            try{
                let res = await axios.saveMallintegral({configJson :JSON.stringify(obj)});
            }catch(e){
                Notification.error({
                    title: '状态(status)',
                    message: '保存数据失败',
                    position: 'bottom-left',
                    duration: 1500
                });
                console.log("saveBottomMenu",e);
            }
        },

        async getActivity( { commit }){
            try{
                let res = await axios.getActivity();
                if(res.data.Status === 1){
                    commit(type.SAVE_ACTIVITY_DATA, res.data.data);
                }else{
                    Notification.error({
                        title: '状态(status)',
                        message: '活动数据请求失败',
                        position: 'bottom-left',
                        duration: 1500
                    });
                }
            }catch(e){
                console.log("getActivity",e);
            }
        },
        async removeMallactivity({ commit },obj){
            try{
                let res = await axios.removeMallactivity(obj);
            }catch(e){
                Notification.error({
                    title: '状态(status)',
                    message: '删除数据失败',
                    position: 'bottom-left',
                    duration: 1500
                });
                console.log("removeMallactivity",e);
            }
        },
        async saveMallactivity({ commit },obj){
            try{
                let res = await axios.saveMallactivity({configJson :JSON.stringify(obj)});
            }catch(e){
                Notification.error({
                    title: '状态(status)',
                    message: '保存数据失败',
                    position: 'bottom-left',
                    duration: 1500
                });
                console.log("saveMallactivity",e);
            }
        },

        async saveBrandNaviGation( { commit },obj){
            try{
                let res = await axios.saveBrandNaviGation({ modelJson :JSON.stringify(obj)});
            }catch(e){
                Notification.error({
                    title: '状态(status)',
                    message: '保存数据失败',
                    position: 'bottom-left',
                    duration: 1500
                });
                console.log("saveBrandNaviGation",e);
            }
        },
        async removeBrandNaviGation({ commit },obj){
            try{
                let res = await axios.removeBrandNaviGation(obj);
            }catch(e){
                Notification.error({
                    title: '状态(status)',
                    message: '删除数据失败',
                    position: 'bottom-left',
                    duration: 1500
                });
                console.log("removeBrandNaviGation",e);
            }
        },

        async getShopPromotion( { commit }){
            try{
                let res = await axios.getShopPromotion();
                // console.log(res);
                if(res.data.Status === 1){
                    if(res.data.Status === 1){
                        commit(type.SAVE_SHOP_PROMATION,res.data.data);
                    }else{
                        
                        Notification.error({
                            title: '状态(status)',
                            message: '品牌数据请求失败',
                            position: 'bottom-left',
                            duration: 1500
                        });
                    }
                }
            }catch(e){
                console.log("removeBrandNaviGation",e);
            }
        }
    },
    mutations:{
        [ type.GET_PHONE_DATA ](state, data){
            state.phoneData = data;
            state.OrderNo = data.length-1;
        },
        [ type.SAVE_ACTIVITY_DATA ](state, activity){
            state.activity = activity;
        },
        [ type.SAVE_SHOP_PROMATION ](state, shopPromotion){
            state.shopPromotion = shopPromotion;
        }
    }
}
export default {
    namespaced:true,
    ...details
}