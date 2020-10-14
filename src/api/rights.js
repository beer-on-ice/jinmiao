import { axios } from '@/utils/request'

const api = {
  showResource: '/backend/employee/showResource',
  insertResource: '/backend/employee/insertResource',
  modifyResource: '/backend/employee/modifyResource',
  getAllRole: '/backend/employee/getAllRole',
  getAllRoles: '/backend/employee/getAllRoles',
  showSingleRole: '/backend/employee/showSingleRole',
  insertRoleAndDistributionResouce:
    '/backend/employee/insertRoleAndDistributionResouce',
  modifyRole: '/backend/employee/modifyRole',
  getAllUser: '/backend/employee/getAllUser',
  insertUser: '/backend/employee/insertUser',
  modifyPassword: '/backend/employee/modifyPassword',
  getUser: '/backend/employee/getUser',
  userRoleMap: '/backend/employee/userRoleMap'
}

export function getShowResource () {
  return axios({
    url: api.showResource,
    method: 'get'
  })
}
export function getInsertResource (parameter) {
  return axios({
    url: api.insertResource,
    method: 'post',
    params: parameter
  })
}
export function getModifyResource (parameter) {
  return axios({
    url: api.modifyResource,
    method: 'post',
    params: parameter
  })
}

export function getAllRole (parameter) {
  return axios({
    url: api.getAllRole,
    method: 'get',
    params: parameter
  })
}

export function getShowSingleRole (parameter) {
  return axios({
    url: api.showSingleRole,
    method: 'get',
    params: parameter
  })
}

export function getInsertRoleAndDistributionResouce (parameter) {
  return axios({
    url: api.insertRoleAndDistributionResouce,
    method: 'post',
    params: parameter
  })
}

export function getModifyRole (parameter) {
  return axios({
    url: api.modifyRole,
    method: 'post',
    params: parameter
  })
}

export function getAllUser (parameter) {
  return axios({
    url: api.getAllUser,
    method: 'get',
    params: parameter
  })
}

export function getInsertUser (parameter) {
  return axios({
    url: api.insertUser,
    method: 'post',
    params: parameter
  })
}

export function getModifyPassword (parameter) {
  return axios({
    url: api.modifyPassword,
    method: 'post',
    params: parameter
  })
}

export function getAllRoles () {
  return axios({
    url: api.getAllRoles,
    method: 'get'
  })
}

export function getUser (parameter) {
  return axios({
    url: api.getUser,
    method: 'get',
    params: parameter
  })
}

export function getUserRoleMap (parameter) {
  return axios({
    url: api.userRoleMap,
    method: 'post',
    params: parameter
  })
}
