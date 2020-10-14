import Vue from 'vue'
import { login, getBackMenus, getAuth, logOff } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const user = {
  state: {
    token: '',
    name: '',
    roles: [],
    info: {},
    auth: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_AUTH: (state, auth) => {
      state.auth = auth
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            if (response.code !== 200) reject(response)
            const result = response.data
            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token) // 设置token

            commit('SET_NAME', result.username) // 设置昵称

            let userInfo = {
              username: result.username
            }
            Vue.ls.set('USERINFO', JSON.stringify(userInfo))

            commit('SET_INFO', result) // 设置用户信息

            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetBackMenus ({ commit }) {
      return new Promise((resolve, reject) => {
        getBackMenus()
          .then(response => {
            const result = response.data
            if (result && result.resourceItems.length > 0) {
              const role = result
              const resourceItems = response.data.resourceItems
              role.permissionList = role.resourceItems.map(permission => {
                return permission.id
              })

              // 生成权限数组
              let arr = []
              resourceItems.forEach(item => {
                arr.push({
                  dutyName: item.url,
                  duty: item.duty
                })
              })
              commit('SET_ROLES', result)
              commit('SET_AUTH', arr)
            } else {
              reject(new Error('getMenus: roles must be a non-null array !'))
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    LogOff ({ commit, state }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_INFO', {})
        Vue.ls.remove(ACCESS_TOKEN)
        Vue.ls.remove('USERINFO')

        logOff(state.token)
          .then(() => {
            resolve()
          })
          .catch(() => {
            resolve()
          })
      })
    }
  }
}

export default user
