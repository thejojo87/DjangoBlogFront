import axios from 'axios';
// 引入store;
import store from '../store/index';

// http request拦截器
axios.interceptors.request.use(
  (config) => {
    if (store.state.userInfo.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `JWT ${store.state.userInfo.token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  const res = error.response;
  switch (res.status) {
    case 401:
      // 返回 401 清除token信息并跳转到登录页面
      // store.commit(types.LOGOUT);
      //router.replace({
      //  path: '/app/login',
      //  query: {redirect: router.currentRoute.fullPath}
      //})
      console.log('未登录 或者token过期');
    case 403:
      console.log('您没有该操作权限');
    // case 404:
    //   console.log('没有这个api');
    case 500:
      console.log('服务器错误');
  }
  return Promise.reject(error);
});
