import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home/components/home'
import Login from '@/page/Home/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path:'/home',
      name:'Home',
      component:Home
    }
  ]
})
