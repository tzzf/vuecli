import axios from 'axios'
import vue from 'vue'
import store from '../store/index'
import * as types from '../store/type'
import router from '../router/index'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'


// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers.Authorization = `Bearer ${store.state.token}`;

            //  config.headers.Authorization = 'Bearer ' + store.state.token;
            //  console.log(store.state.token);
            //  console.log(config.headers)
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// // http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: { redirect: router.currentRoute.fullPath }
                    })
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    });
// export default axios
// 封装axios的post请求
export function fetchPost(url, params) {
    console.log(url)
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}
export function fetchGet(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, params)
            .then(response => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}
// export default service
export default {
    ajaxPost(url, params) {
        return fetchPost(url, params);
    },
    ajaxGet(url, params) {
        return fetchGet(url, params);
    },
}