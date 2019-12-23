import axios from "axios";
import Vue from "vue";
const { CancelToken } = axios;
Vue.prototype.$cancelRequest = new Map();
export default {
    request:(option,params)=>{
        let url=option;
        let method='get';
        let opArr=url.split(" ");
        if(opArr.length>=2){
            url=opArr[0];
            method=opArr[1];
            if(method.toLocaleLowerCase()!=='get'&&method.toLocaleLowerCase()!=='post'){
                url=method;
                method=opArr[0].toLocaleLowerCase();
            }
        }
        let cancelToken = new CancelToken(cancel => {
            Vue.prototype.$cancelRequest.set(Symbol(Date.now()), {
              pathname: window.location.pathname,
              cancel,
            })
          });
        // console.log(params);
        // console.log(url);
        let op = {
            url: url,
            method: method,
            params,
            timeout: 30000,
            cancelToken: cancelToken
        };
        if(method == 'post'){
            op = {
                url: url,
                method: method,
                data: params,
                timeout: 30000,
                cancelToken: cancelToken
            }
        }
        return axios(op).then((res)=>{
            // console.log(res);
            let result={};
                if(res.data){
                    result.data=typeof(res.data) === "String"?JSON.parse(res.data.data):res.data;
                }else{
                    result.list=res.data.list;
                }
                return Promise.resolve({
                    ...result,
                    code:1,
                    status: res.status,
                    flag:"success"
                })
        }).catch((err)=>{       
            let status=err.response.status?err.response.status:600;
            return Promise.resolve({
                // list:data.data.data,
                code:2,
                status:status,
                msg:err.response.statusText,
                flag:"failed"
            })
        });
    }
    
} 