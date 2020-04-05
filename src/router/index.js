import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { Auth } from 'aws-amplify'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () =>
      import(/* webpackChunkName: "signin" */ '../views/Signin.vue'),
    meta: { isPublic: true },
  },
  {
    path: '/signout',
    name: 'Signout',
    component: () =>
      import(/* webpackChunkName: "signin" */ '../views/Signout.vue'),
  },
  {
    path: '/authed',
    name: 'Authed',
    component: () =>
      import(/* webpackChunkName: "signin" */ '../views/Authed.vue'),
    meta: { isPublic: true },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(async (to, from, next) => {
  const user = await Auth.currentUserInfo()
  store.commit('setUser', user)
  if (to.matched.some(record => !record.meta.isPublic) && user === null) {
    next({ path: '/signin' })
  } else {
    next()
  }
})

export default router
