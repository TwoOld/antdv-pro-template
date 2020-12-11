import {
  UserLayout,
  BasicLayout,
  // eslint-disable-next-line
  BlankLayout,
  // keep-alive
  RouteView
} from '@/layouts'
import {
  bxAnaalyse
} from '@/core/icons'

// const RouteView = {
//   name: 'RouteView',
//   render: (h) => h('router-view')
// }

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: 'menu.home'
    },
    redirect: '/dashboard/infinite',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/infinite',
        component: RouteView,
        meta: {
          title: '测试',
          keepAlive: true,
          icon: bxAnaalyse,
          permission: ['dashboard']
        },
        children: [{
            path: '/dashboard/infinite',
            name: 'Infinite',
            component: () => import('@/views/dashboard/Infinite'),
            meta: {
              title: '列表',
              keepAlive: true,
              permission: ['dashboard']
            }
          },
          {
            path: '/dashboard/test',
            name: 'Test',
            component: () => import('@/views/dashboard/Test'),
            meta: {
              title: '测试',
              keepAlive: false,
              permission: ['dashboard']
            }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [{
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
