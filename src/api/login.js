import { axios } from '@/utils/request'

const api = {
  Login: '/backend/employeeLogin/login',
  GetBackMenus: '/backend/employeeLogin/permissionList',
  LogOff: '/backend/employee/logOff',
  auth: '/backend/employeeLogin/answer'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
// 登录
export function login (parameter) {
  return axios({
    url: api.Login,
    method: 'post',
    data: parameter
  })
}

// 获取菜单
export function getBackMenus () {
  return axios({
    url: api.GetBackMenus,
    method: 'get'
  })
}

export function getAuth () {
  return axios({
    url: api.auth,
    method: 'get'
  })
}

// 登出
export function logOff () {
  return axios({
    url: api.LogOff,
    method: 'post'
  })
}
