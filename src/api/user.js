import request from '@/utils/request'

// 登录函数
/**
 * @description: 登录函数
 * @param {*} data { mobile,password}
 * @return {*} promise
 */
export function loginAPI(data) {
  return request({
    url: '/park/login',
    method: 'POST',
    data
  })
}
// 首页-工作台-基础信息查询

export function infoAPI() {
  return request({
    url: 'home/workbench/info',
    method: 'GET'
  })
}
// 首页-工作台-临期合同查询
export function rentInfoAPI({ params }) {
  return request({
    url: 'home/workbench/rentInfo',
    method: 'GET',
    data: params
  })
}
