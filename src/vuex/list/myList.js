import axios from "../../api/detail";
import * as type from "./myList-type";
import { Message, Loading, Notification } from "element-ui";
var myList = {
    state: {
        startData:  "",
        total:  0
    },
    getters: {
        startData: state => state.startData,
        total: state => state.total,
        totalPage: state => state.totalPage
    },
    actions: {
        async startGetData({commit}, obj){
            try{
                let load=Loading.service({background:"rgba(255,255,255,1",text: "加载中...",spinner:"el-icon-loading"});
                let res = await axios.startGetData(obj);
                // console.log(res);
                // console.log(obj);
                if(res.data.Status === 1){
                    load.close();
                    // Message({
                    //     message: "数据获取成功",
                    //     type: "success",
                    //     duration: 2000
                    // })
                    // Notification.success({
                    //     title: '成功',
                    //     message: '数据获取成功',
                    //     duration: 2000,
                    //     position: "bottom-left"
                    // })
                }else{
                    load.close();
                    Message({
                        message: "数据获取失败",
                        type: "error",
                        duration: 1000
                    })
                }
                commit(type.START_GET_DATA,res);
            }catch(err){
                console.log("startGetErr",err);
            }
        },
        async saveData(e,obj){
            try{   
                let load=Loading.service({background: "rgba(255,255,255,1", text: "加载中...", spinner:"el-icon-loading"});
                let res = await axios.saveData(obj);
                // console.log(res);
                if(res.data.Status === 1){
                    load.close();
                    // Message({
                    //     message: "添加成功",
                    //     type: "success",
                    //     duration: 1000
                    // })
                    Notification.success({
                        title: '成功',
                        message: '添加成功',
                        duration: 2000,
                        position: "bottom-left"
                    })
                }else{
                    load.close();
                    Message({
                        message: "添加失败",
                        type: "error",
                        duration: 1000
                    })
                }
                return Promise.resolve({
                    status: res.data.Status
                })
            }catch(err){
                console.log("addErr",err);
            }
        },
        async removeData(e, obj){
            try{
                let load=Loading.service({background: "rgba(255,255,255,1", text: "加载中...", spinner:"el-icon-loading"});
                let res = await axios.removeData(obj);
                // console.log(res);
                if(res.data.Status === 1){
                    load.close();
                    // Message({
                    //     message: "删除成功",
                    //     type: "success",
                    //     duration: 1000
                    // })
                    Notification.success({
                        title: '成功',
                        message: '删除成功',
                        duration:2000,
                        position: "bottom-left"
                    })
                }else{
                    load.close();
                    Message({
                    message: "删除失败",
                        type: "error",
                        duration: 1000
                    })
                }
                return Promise.resolve({
                    status: res.data.Status
                })
            }catch(err){
                console.log("removeErr",err);
            }
        },
        async publishData(e,obj){
            try{
                let load=Loading.service({background: "rgba(255,255,255,1", text: "加载中...", spinner:"el-icon-loading"});
                let res = await axios.publishData(obj);
                // console.log(res);
                if(res.data.Status === 1){
                    load.close();
                    // Message({
                    //     message: "成功发布",
                    //     type: "success",
                    //     duration: 1000
                    // })
                    Notification.success({
                        title: '成功',
                        message: '发布成功',
                        duration: 2000,
                        position: "bottom-left"
                    })
                }else{
                    load.close();
                    Message({
                    message: "发布失败",
                        type: "error",
                        duration: 1000
                    })
                }
                return Promise.resolve({
                    status: res.data.Status
                })
            }catch(err){
                console.log("removeErr",err);
            }
        },
        async updateData(e,obj){
            try{
                let load=Loading.service({background: "rgba(255,255,255,1", text: "加载中...", spinner:"el-icon-loading"});
                let res = await axios.updateData(obj);
                // console.log(res);
                if(res.data.Status === 1){
                    load.close();
                    // Message({
                    //     message: "修改成功",
                    //     type: "success",
                    //     duration: 1000
                    // })
                    Notification.success({
                        title: '成功',
                        message: '修改成功',
                        duration: 2000,
                        position: "bottom-left"
                    })
                }else{
                    load.close();
                    Message({
                    message: "修改失败",
                        type: "error",
                        duration: 1000
                    })
                }
                return Promise.resolve({
                    status: res.data.Status
                })
            }catch(err){
                console.log("removeErr",err);
            }
        }
    },
    mutations: {
        [type.START_GET_DATA](state,res){
            state.startData = res.data.data;
            state.total = res.data.Total;
        }
    }
}
export default {
    namespaced: true,
    ...myList
}