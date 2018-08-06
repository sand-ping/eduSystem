import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/page/Home/components/HelloWorld'
import Login from '@/page/Home/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})
