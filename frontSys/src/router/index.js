import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home/components/home'
import HomeManager from '@/page/Home/components/homeManager'
import Login from '@/page/Home/components/login'
import StudentInfo from '@/page/Student/components/studentInfo'
import ManageStudent from '@/page/Manager/components/manageStudent'

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
      component:Home,
      children:[
        {
          path:'',
          name:'StudentInfo',
          component:StudentInfo
        }
      ]
    },
    {
      path:'/homeManager',
      name:'HomeManager',
      component:HomeManager,
      children:[
        {
          path:'/manageStudent',
          name:'ManageStudent',
          component:ManageStudent,
        }
      ]


    }
  ]
})
