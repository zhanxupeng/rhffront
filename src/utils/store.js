import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const state = {
  channelState: true,
  loginState: false,
  msgCount: 0,
  tabsName: '',
  newComponentName: ''
}
export default new Vuex.Store({
  state,
  mutations: {
    channelStateChange (state) {
      state.channelState = !state.channelState
    },
    loginStateChange (state, param) {
      state.loginState = param
    },
    msgCountChange (state, param) {
      state.msgCount = param
    },
    tabsNameChange (state, param) {
      state.tabsName = param
    },
    componentNameChange (state, param) {
      state.newComponentName = param
    }
  }
})
