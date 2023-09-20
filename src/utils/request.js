import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: 'https://api-hmzs.itheima.net/api',
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 请求头
    if (store.getters.token) {
      config.headers.Authorization = 'Bearer ' + store.getters.token
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    Message({
      message: response.data.msg,
      type: 'success'
    })

    return response.data
  },
  error => {
    Message({
      message: error.response.data.msg,
      type: 'error'
    })

    return Promise.reject(error)
  }
)

export default service
