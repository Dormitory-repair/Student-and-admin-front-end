import Vue from 'vue'
import VueRouter from 'vue-router'
// import LoginStudentView from '../views/LoginStudentView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: '/student/login'
  },
  {
    path:'/student/login',
    name:'login-student',
    component:()=>import('../views/LoginStudentView.vue')
  },
  {
    path:'/manager/login',
    name:'login-manager',
    component:()=>import('../views/LoginManagerView.vue')
  },
  {
    path:'/student/register',
    name:'register',
    component:()=>import('../views/RegisterView.vue')
  },
  {
    path:'/student/repairhall',
    name:'repairhall',
    component:()=>import('../views/RepairHallView.vue')
  },
  {
    path:'/student/repairform',
    name:'repairform',
    component:()=>import('../views/RepairFormView.vue')
  },
  {
    path:'/student/myrepair',
    name:'myrepair',
    component:()=>import('../views/MyRepairView.vue')
  },
  {
    path:'/manage/student',
    name:'studentmessage',
    component:()=>import('../views/ManageStudentView.vue')
  },
  {
    path:'/manage/worker',
    name:'workermessage',
    component:()=>import('../views/ManageWorkerView.vue')
  },
  {
    path:'/manage/admin',
    name:'adminmessage',
    component:()=>import('../views/ManageAdminView.vue')
  },

  // {
  //   path: '/',
  //   name: 'login-student',
  //   component: LoginStudentView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
