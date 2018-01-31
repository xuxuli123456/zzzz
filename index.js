import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

let siteManage = resolve => require(['@/components/siteManage.vue'], resolve)
let manageapp = resolve => require(['@/components/manageapp.vue'], resolve)
let manageblock = resolve => require(['@/components/manageblock.vue'], resolve)
let pagemanage = resolve => require(['@/components/pagemanage.vue'], pagemanage)
let appwebmanage = resolve => require(['@/components/appwebmanage.vue'], appwebmanage)

Vue.use(Router)
// 路由配置
let router = new Router({
  routes: [{
    path: '/siteManage',
    name: 'siteManage',
    component: siteManage
  }, {
    path: '/manageapp',
    name: 'manageapp',
    component: manageapp
  }, {
    path: '/manageblock',
    name: 'manageblock',
    component: manageblock
  }, {
    path: '/pagemanage',
    name: 'pagemanage',
    component: pagemanage
  }, {
    path: '/appwebmanage',
    name: 'appwebmanage',
    component: appwebmanage
  }, {
    path: '*',
    redirect: '/siteManage'
  }]
})
// 页面更新回调
router.afterEach(toRoute => {
  let path = toRoute.path
  let arr = []
  store.getters.navData.map((index, ele) => {
  if (index.path && (index.path === path)){
  let obj = {
    name: index.name,
    path: index.path,
    id: index.id
  }
  arr.push(obj)
  return
}
if (!index.path) {
  let obj = {}
  index.list.map((index1, ele1) => {
    if (index1.path === path) {
    arr.push({name: index.name, path: ''})
    obj.name = index1.name
    obj.path = index1.path
    obj.id = index1.id
    arr.push(obj)
  }
})
}
})
store.dispatch({
  type: 'setBreadData',
  d: arr
})
})
export default router

