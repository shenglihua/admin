import axios from 'axios'
export default function(config){
    const myaxios=axios.create({
        // baseURL:process.env.VUE_APP_BASE_URL,
        timeout:1000,
    }) 
    myaxios.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        if (config.url != '/login' && config.url != '/register') {
          config.headers.token = sessionStorage.getItem('token');
        }
        return config;
      }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      });
    
      // 添加响应拦截器
      myaxios.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        return response.data;
      }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
      });
     return myaxios(config)
}