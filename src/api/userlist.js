import { axios } from '@/utils/request'
const api = {
  list: '/backend/user-manage',
  overview: '/backend/user-manage/overview',
  followdetail: '/backend/user-manage/overview/follow-detail',
  adviserdetail: '/backend/user-manage/overview/adviser-detail',
  bookdetail: '/backend/user-manage/overview/book-detail',
  getPushInfoCount: '/backend/infoMgmt/getPushInfoCount',
  getInfoByUserId: '/backend/infoMgmt/getInfoByUserId'
}

export function getList (parameter) {
  return axios({
    url: api.list,
    method: 'get',
    params: parameter
  })
}

export function getOverview (parameter) {
  return axios({
    url: api.overview,
    method: 'get',
    params: parameter
  })
}

export function getFollowdetail (parameter) {
  return axios({
    url: api.followdetail,
    method: 'get',
    params: parameter
  })
}

export function getAdviserdetail (parameter) {
  return axios({
    url: api.adviserdetail,
    method: 'get',
    params: parameter
  })
}

export function getBookdetail (parameter) {
  return axios({
    url: api.bookdetail,
    method: 'get',
    params: parameter
  })
}

// 获取舆情预警数量
export function getPushInfoCount (parameter) {
  return axios({
    url: api.getPushInfoCount,
    method: 'get',
    params: parameter
  })
}

// 获取舆情预警列表
export function getInfoByUserId (parameter) {
  return axios({
    url: api.getInfoByUserId,
    method: 'get',
    params: parameter
  })
}
