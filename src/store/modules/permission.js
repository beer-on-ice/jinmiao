import { asyncRouterMap, constantRouterMap } from '@/config/router.config'
import { BasicLayout, RouteView } from '@/layouts'

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission 已登录的用户的准入列表
 * @param route 传入的某个路由详情信息
 * @returns {boolean}
 */
function hasPermission (permission, route) {
  // 拿到路由，首先跟已有的进行匹配，并渲染，然后生成没有的
  if (route.meta && route.meta.permission) {
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id)
  } else {
    return true
  }
}

/**
 * 筛选出能在roles的permissionList里匹配到对应权限的路由
 *
 * @param routerMap 异步路由列表
 * @param roles 登录用户的信息
 * @returns {*}
 */

function filterAsyncRouter (routerMap, roles) {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(roles.permissionList, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

// 生成请求动态返回的路由
function generateAllRoutes (roles) {
  let flatRoles = flatten(roles)
  flatRoles.forEach(item => {
    item.name = item.url
    item.meta = {}
    item.meta.title = item.nodeName
    item.meta.dutyName = item.url
    item.meta.keepAlive = false
    item.path = `/${item.url}`
  })

  flatRoles = unFlatten(flatRoles)

  let resultArr = [
    {
      path: '/',
      name: 'index',
      component: BasicLayout,
      meta: { title: '首页' },
      redirect: '/welcome',
      children: [...flatRoles]
    },
    {
      path: '*',
      redirect: '/404',
      hidden: true
    }
  ]

  return resultArr
}

// 二维化，构建路由信息
const unFlatten = arr => {
  // 拷贝一下原有数组，防止后续修改会影响原数组
  const flattenedArr = JSON.parse(JSON.stringify(arr))

  // 临时缓存索引(id 为下标的对象)
  // 大致这个样子 { 1:{},2:{},3:{} }
  let cache = {}

  // 最终要返回的非扁平化数组
  let unflattenedArr = []
  // 存放非根结点的数组
  let tempArr = []

  flattenedArr.forEach(item => {
    // 每一个元素都加上 children 字段
    item.children = []

    // 使用 id 做缓存索引
    // 之后只需要知道 id，就可以直接找到数据对象
    cache[item.id] = item

    if (!item.parentId) {
      // 不存在 parentId 属性，当前元素为根结点
      // 直接放到最终的返回对象里面，后续元素可以直接挂载
      unflattenedArr.push(item)
    } else {
      // 子节点，放到新对象里面，后续会用到
      tempArr.push(item)
    }
  })

  // 处理非根子节点
  tempArr.forEach(item => {
    // 当前 item 的父节点 id
    const parentId = item.parentId

    item.component = () => import(`@/views/${cache[parentId].url}/${item.url}`)
    item.path = `/${cache[parentId].url}/${item.url}`

    if (cache[parentId].node === 0) {
      cache[parentId].component = RouteView
      cache[parentId].redirect = `/${cache[parentId].url}/${item.url}`
    }

    // 通过上面的 cache 索引，直接将子节点挂到对应的父节点上
    cache[parentId].children.push(item)
  })

  Object.keys(cache).forEach(id => {
    const item = cache[id]
    if (item.children.length === 0) {
      delete item.children
    }
  })
  console.log('实际生成的路由：', unflattenedArr)

  return unflattenedArr
}

// 一维化
const flatten = arr =>
  [].concat(...arr.map(item => [].concat(item, ...flatten(item.sonItem || []))))

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        // const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)

        const accessedRouters = generateAllRoutes(roles.resourceItems)

        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
