import { axios } from '@/utils/request'
const isDev = process.env.NODE_ENV === 'production'

const api = {
  list: '/backend/warning/tab',
  column: '/backend/warning/column',
  addlist: '/backend/infoMgmt/add',
  columnsp: '/backend/infoMgmt/targetInfo',
  create: '/backend/infoMgmt/add',
  currentInfo: '/backend/infoMgmt/getById',
  keywordSystem: '/backend/infoMgmt/keywordSystem',
  danger: '/upload/getCategoryLevel',
  add: '/backend/infoMgmt/add',
  remove: '/backend/infoMgmt/removeCoverImg',
  addBannerInfo: '/backend/infoMgmt/addBannerInfo',
  generateCode: '/backend/infoMgmt/getInfomationQrCode',
  update: '/backend/infoMgmt/update'
}

//  新增舆情预警
export function getAddlist (parameter) {
  return axios({
    url: api.addlist,
    method: 'post',
    params: parameter
  })
}

// 舆情预警 - 首页列表
export function getList (parameter) {
  return axios({
    url: api.list,
    method: 'get',
    params: parameter
  })
}

// 舆情预警 - 首页弹框
export function getColumn (parameter) {
  return axios({
    url: api.column,
    method: 'get',
    params: parameter
  })
}

export function getColumnsp (parameter) {
  return axios({
    url: api.columnsp,
    method: 'get',
    params: parameter
  })
}

//  编辑-新增
export function monitorcreate (parameter) {
  return axios({
    url: api.create,
    method: 'post',
    data: parameter
  })
}

// 编辑 - 获取当前页面信息
export function getCurrentInfo (parameter) {
  return axios({
    url: api.currentInfo,
    method: 'get',
    params: parameter
  })
}

// 编辑 - 获取搜索关键词
export function getkeywordSystem (parameter) {
  return axios({
    url: api.keywordSystem,
    method: 'post',
    params: parameter
  })
}

// 风险分类
export function getDangerList () {
  return axios({
    url: api.danger,
    method: 'get'
  })
}

// 新增
export function getNewsAdd (parameter) {
  return axios({
    url: api.add,
    method: 'post',
    data: parameter
  })
}

// 移除图片
export function getRemoveUpload (parameter) {
  return axios({
    url: api.remove,
    method: 'post',
    params: parameter
  })
}

// 添加bannerifno
export function getNewsAddBanner (parameter) {
  return axios({
    url: api.addBannerInfo,
    method: 'post',
    data: parameter
  })
}

// 生成快报二维码
export function getFastCode (parameter) {
  return axios({
    url: api.generateCode,
    method: 'post',
    params: parameter
  })
}

export let specialUrl = {
  code: !isDev
    ? 'https://testinfo.aifound.cn/newDetail.html?id='
    : 'https://info.aifound.cn/newDetail.html?id=',
  upload: !isDev
    ? 'https://testapp.aifound.cn/backend/infoMgmt/coverImgUpload'
    : 'https://app.aifound.cn/backend/infoMgmt/coverImgUpload'
}

// 更新
export function getUpdate (parameter) {
  return axios({
    url: api.update,
    method: 'post',
    data: parameter
  })
}
