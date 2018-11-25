import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home/components/home'
import HomeManager from '@/page/Home/components/homeManager'
import Login from '@/page/Home/components/login'
import StudentInfo from '@/page/Student/components/studentInfo'
import ManageStudent from '@/page/Manager/components/manageStudent'
import ManageCollege from '@/page/Manager/components/manageCollege'
import TeacherHome from '@/page/Teacher/components/teacher-home'
import TeacherInfo from '@/page/Teacher/components/teacher-info'

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
      path:'/teacherHome',
      name:'TeacherHome',
      component:TeacherHome,
      children:[
        {
          path:'',
          name:TeacherInfo,
          component:TeacherInfo,
        }
      ]
    },
    {
      path:'/homeManager',
      name:'HomeManager',
      component:HomeManager,
      children:[
        {
          path:'',
          name:'ManageStudent',
          component:ManageStudent,
        },
        {
          path:'manageCollege',
          name:'ManageCollege',
          component:ManageCollege,
        }
      ]


    }
  ]
})
