import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home/components/home'
import Login from '@/page/Home/components/login'
import StudentInfo from '@/page/Student/components/studentInfo'
import ManagerHome from '@/page/Manager/components/manager-home'
import ManagerInfo from '@/page/Manager/components/manager-info'
import ManageStudent from '@/page/Manager/components/manageStudent'
import ManageCollege from '@/page/Manager/components/manageCollege'
import ManageTeacher from '@/page/Manager/components/manageTeacher'
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
      path:'/managerHome',
      component:ManagerHome,
      children:[
        {
          path:'',
          name:'ManagerInfo',
          component:ManagerInfo
        },
        {
          path:'manageStudent',
          name:'ManageStudent',
          component:ManageStudent,
        },
        {
          path:'manageCollege',
          name:'ManageCollege',
          component:ManageCollege,
        },
        {
          path:'manageTeacher',
          name:'ManageTeacher',
          component:ManageTeacher,
        }
      ]
    }
  ]
})
