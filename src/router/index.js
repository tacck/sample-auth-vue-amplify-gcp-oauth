import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { Auth, Cache } from 'aws-amplify'
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
  {
    path: '/information',
    name: 'List',
    component: () =>
      import(/* webpackChunkName: "information" */ '../views/List.vue'),
    meta: { isPublic: true },
  },
  {
    path: '/information/:id',
    name: 'Information',
    props: true,
    component: () =>
      import(/* webpackChunkName: "information" */ '../views/Information.vue'),
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
    if (user !== null) {
      const currentSession = await Auth.currentSession()
      updateJwtToken(currentSession)
    }
    next()
  }
})

export default router

async function updateJwtToken(currentSession) {
  console.log('currentSession', currentSession)
  const token = currentSession.getIdToken().getJwtToken()

  const info = {}
  info.token = token
  await Cache.setItem('federatedInfo', info)
}
