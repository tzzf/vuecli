// 组装模块并导出 store 的文件
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './type'

Vue.use(Vuex);
// 导出需要的模块
export default new Vuex.Store({
  state: {
    username: '',
    token: '',
    pwd: '',
    count: 0
  },
  mutations: {
    inc: state => state.count++,
    dec: state => state.count--,
    [types.LOGIN]: (state, data) => {
      state.token = localStorage.token;
    },
  },
  // action:{
  //   Addtoken(state){
  //     state.token=localStorage.setItem("token")
  //   }
  // }
});
