import Vue from 'vue'
import Vuex from 'vuex'
import {setStore} from 'js-utils'
import {getConfig} from "./api/base";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    initFlag: false,
  },
  actions: {
    getConfig({commit, state, dispatch}) {
      return new Promise((resolve, reject) => {
        getConfig({shopNo: state.shopInfo.shopNo, businessTypeId: state.bizType.id}).then(res => {
          state.config = res.data || {};
          setStore('config', res.data || null);
          resolve(res.data);
        })
          .catch(error => {
            reject(error)
          })
      })
    },
  },
  getters: {},
  mutations: {

  }
})
