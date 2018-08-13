import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/user/login'
import Signup from '../components/user/signup'
import Board from '../components/board/board'
import BoardShow from '../components/board/view'
import BoardWrite from '../components/board/write'
import BoardList from '../components/board/board/list'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Board',
      component: Board
    },
    {
      path: '/write',
      name: 'Write',
      component: BoardWrite,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/view/:postIndex',
      name: 'Show',
      component: BoardShow,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
    }, {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
  ]
})
