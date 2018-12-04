import axios from 'axios';
import router from '../router'
import { Notification } from 'element-ui'

let baseurl="/api/";
let timeout=20000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// http request 拦截器
axios.interceptors.request.use(
  config => {
    let token =localStorage.getItem('token');
    if (token&&token!=undefined) {
      // config.headers.Authorization ='Bearer ${token}';
      config.headers.Authorization =token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
axios.interceptors.response.use(
  response => {
    // 后台token更新，则修改localstorage的token
    // if (response.data!=undefined&&response.data.token) {
    //   localStorage.setItem('token', response.data.token);
    // }
    switch(response.status){
      case 202:
        Notification.warning({
          title: '提示',
          message: response.data.message
        });
        break;
      case 203: // 清除token信息并跳转到登录页面
        // if (!sessionStorage.getItem(prefix + 'errorToken')) {
        //   sessionStorage.setItem(prefix + 'errorToken', '203')
        Notification.warning({
          title: '提示',
          message: '用户信息认证失败~~'
        });
        localStorage.removeItem('token');
        router.replace({
          path: '/',
          query: {redirect: router.currentRoute.fullPath}
        });
        break;
    }
    return response;
  },
  error => {
    Notification.error({
      title: '出错啦',
      message: '错误'
    });
    return error.response

  }
);
export default {
  post(url,data){
    return axios({
      method:'post',
      data:data,
      url:baseurl+url,
      timeout:timeout,
      header:{
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
    }).catch((error)=>{
      console.log(error.message)
    })
  },
  get(url,data){
    return axios({
      method:'get',
      params:data,
      url:baseurl+url,
      timeout:timeout,
      header:{
        'X-Requested-With': 'XMLHttpRequest',
      },
      // transformRequest: [function (data) {
      //   // 对 data 进行任意转换处理
      //   // return data;
      // }],
      // // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
      // transformResponse: [function (data) {
      //   // 对 data 进行任意转换处理
      //   console.log(data)
      //
      //   return data
      //
      // }],
    }).catch((error)=>{
      console.log(error.message)
    })
  },

  put(url,data){
    return axios({
      method:'put',
      data:data,
      url:baseurl+url,
      timeout:timeout,
      header:{
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    }).catch((error)=>{
      console.log(error.message)
    })
  },
  delete(url,data){
    return axios({
      method:'delete',
      data:data,
      url:baseurl+url,
      timeout:timeout,
      header:{
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    }).catch((error)=>{
      console.log(error.message)
    })
  },

}