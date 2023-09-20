import { getToken, setToken, removeToken } from '../../utils/auth'
import { loginAPI } from '../../api/user'
const state = () => {
  return {
    // 取
    token: getToken()
  }
}
const mutations = {
  // 存
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  // 删除
  removeToken(state) {
    state.token = null
    removeToken()
  }
}
const actions = {
  // 登录得接口请求
  async login({ commit }, data) {
    const res = await loginAPI(data)
    console.log(res.data)
    //  提交commit 执行setToken
    commit('setToken', res.data.token)
  },
  // 退出登录
  logout({ commit }) {
    commit('removeToken')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
