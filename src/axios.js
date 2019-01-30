/**
 *  2019/1/11  lize
 */
import axios from 'axios'

const removePending = (ever) => {
  
  for(let p in pending){
    
    if(ever){
      
      if(pending[p].u === `${ever.url}&${ever.data}`) { //当当前请求在数组中存在时执行函数体
        
        pending[p].f('我执行了'); //执行取消操作
        
        pending.splice(p, 1); //把这条记录从数组中移除
        
      }
      
    }else{
      
      pending[p].f('我执行了'); //执行取消操作
      
      pending.splice(p, 1); //把这条记录从数组中移除
      
    }
    
  }
  
};

const cancelToken = axios.CancelToken;

let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识

let baseUrl = '';

let headers = {};

const Http = axios.create({
  
  baseURL: baseUrl,
  
  withCredentials: false,
  
  headers: headers,
  
});

// http request 拦截器
Http.interceptors.request.use (
  
  (config) => {
    
    removePending(config);
    
    config.cancelToken = new cancelToken((c)=>{
      
      pending.push({ u: `${config.url}&${config.data}`, f: c });
      
    });
    
    return config;
    
  },
  
  (err) => {
    
    return Promise.reject (err);
    
  }

);
//响应拦截器
Http.interceptors.response.use (
  
  (response) => {
    
    console.log(response)
    
    removePending(response.config);
    
    return response.data;
    
  }, (err) => {
    
    return Promise.reject (err);
    
  }

);

export default {
  
  install:function(Vue,option){
    
    Object.defineProperty(Vue.prototype,option[0],{value:Http});
    
    Object.defineProperty(Vue.prototype,option[1],{value:removePending});
    
  }
  
}

