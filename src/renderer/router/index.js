import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)
const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.logged) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.logged) {
    next()
    return
  }
  next('/login')
}

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: require('@/components/login').default,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/',
      component: require('@/components/dashboard').default,
      beforeEnter: ifAuthenticated,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: require('@/components/student/statics-student').default
        },
        {
          path: '/new-student',
          name: 'new-student',
          component: require('@/components/student/new-student').default
        },
        {
          path: '/list-student',
          name: 'list-student',
          component: require('@/components/student/list-student').default
        },
        {
          path: '/edit-student/:index',
          name: 'edit-student',
          component: require('@/components/student/edit-student').default
        },
        {
          path: '/score-student/:index',
          name: 'score-student',
          component: require('@/components/student/score-student').default
        },
        {
          path: '/statistics',
          name: 'statistics',
          component: require('@/components/student/statistics').default
        },
        {
          path: '/department',
          name: 'department',
          component: require('@/components/department/department-level').default
        },
        {
          path: '/edit-department/:index',
          name: 'edit-department',
          component: require('@/components/department/edit-department').default
        },
        {
          path: '/new-user',
          name: 'new-user',
          component: require('@/components/user/new-user').default
        },
        {
          path: '/list-user',
          name: 'list-user',
          component: require('@/components/user/list-user').default
        },
        {
          path: '/edit-user/:index',
          name: 'edit-user',
          component: require('@/components/user/edit-user').default
        },
        {
          path: '/account',
          name: 'account',
          component: require('@/components/user/account').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
