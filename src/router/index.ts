import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'Root',
    meta: {
      hidden: true
    }
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'Redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/Redirect/Redirect.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true,
      noTagsView: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: t('router.login'),
      noTagsView: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/Error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true
    }
  }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    meta: {},
    name: 'home',
    children: [
      {
        path: 'index',
        name: 'home-index',
        component: () => import('@/views/Dashboard/Workplace.vue'),
        meta: {
          title: t('app_menu.home'),
          icon: 'clarity:dashboard-line'
        }
      }
    ]
  },
  {
    path: '/personTools',
    component: Layout,
    name: 'personTools',
    meta: {
      title: t('app_menu.personTools'),
      icon: 'clarity:details-line'
    },
    children: [
      {
        path: 'income/index',
        component: () => import('@/views/Income/List/index.vue'),
        name: 'income',
        meta: {
          title: t('app_menu.income'),
          icon: 'clarity:media-changer-outline-badged'
        }
      },
      {
        path: 'income/add/index',
        name: 'incomeAdd',
        component: () => import('@/views/Income/Edit/index.vue'),
        meta: {
          title: t('app_common.add'),
          hidden: true,
          canTo: true,
          activeMenu: '/personTools/income/index'
        }
      },
      {
        path: 'income/edit/index',
        name: 'incomeEdit',
        component: () => import('@/views/Income/Edit/index.vue'),
        meta: {
          title: t('app_common.edit'),
          hidden: true,
          canTo: true,
          activeMenu: '/personTools/income/index'
        }
      },
      {
        path: 'life/index',
        component: () => import('@/views/Life/List/index.vue'),
        name: 'life',
        meta: {
          title: t('app_menu.life'),
          icon: 'clarity:resource-pool-outline-alerted'
        }
      },
      {
        path: 'life/add/index',
        name: 'lifeAdd',
        component: () => import('@/views/Life/Edit/index.vue'),
        meta: {
          title: t('app_common.add'),
          hidden: true,
          canTo: true,
          activeMenu: '/personTools/life/add/index'
        }
      },
      {
        path: 'life/edit/index',
        name: 'lifeEdit',
        component: () => import('@/views/Life/Edit/index.vue'),
        meta: {
          title: t('app_common.edit'),
          hidden: true,
          canTo: true,
          activeMenu: '/personTools/life/edit/index'
        }
      },
      {
        path: 'schedule/index',
        component: () => import('@/views/Schedule/List/index.vue'),
        name: 'schedule',
        meta: {
          title: t('app_menu.schedule'),
          icon: 'clarity:calendar-outline-badged'
        }
      },
      {
        path: 'schedule/add/index',
        name: 'scheduleAdd',
        component: () => import('@/views/Life/Schedule/index.vue'),
        meta: {
          title: t('app_common.add'),
          hidden: true,
          canTo: true,
          activeMenu: '/personTools/schedule/add/index'
        }
      },
      {
        path: 'schedule/edit/index',
        name: 'scheduleEdit',
        component: () => import('@/views/Schedule/Edit/index.vue'),
        meta: {
          title: t('app_common.edit'),
          hidden: true,
          canTo: true,
          activeMenu: '/personTools/schedule/edit/index'
        }
      },
      {
        path: 'gasoline/index',
        component: () => import('@/views/Gasoline/List/index.vue'),
        name: 'gasoline',
        meta: {
          title: t('app_menu.gasoline'),
          icon: 'clarity:hourglass-outline-alerted'
        }
      },
      {
        path: 'gasoline/add/index',
        name: 'gasolineAdd',
        component: () => import('@/views/Gasoline/Edit/index.vue'),
        meta: {
          title: t('app_common.add'),
          hidden: true,
          canTo: true,
          activeMenu: '/personTools/gasoline/add/index'
        }
      },
      {
        path: 'gasoline/edit/index',
        name: 'gasolineEdit',
        component: () => import('@/views/Gasoline/Edit/index.vue'),
        meta: {
          title: t('app_common.edit'),
          hidden: true,
          canTo: true,
          activeMenu: '/personTools/gasoline/edit/index'
        }
      }
    ]
  },
  {
    path: '/sysSetting',
    component: Layout,
    name: 'sysSetting',
    meta: {
      title: t('app_menu.sysSetting'),
      icon: 'clarity:settings-line'
    },
    children: [
      {
        path: 'user/index',
        component: () => import('@/views/User/List/index.vue'),
        name: 'user',
        meta: {
          title: t('app_menu.userManage'),
          icon: 'clarity:user-line'
        }
      },
      {
        path: 'user/add/index',
        name: 'userAdd',
        component: () => import('@/views/User/Edit/index.vue'),
        meta: {
          title: t('app_common.add'),
          hidden: true,
          canTo: true,
          activeMenu: '/personTools/user/add/index'
        }
      },
      {
        path: 'user/edit/index',
        name: 'userEdit',
        component: () => import('@/views/User/Edit/index.vue'),
        meta: {
          title: t('app_common.edit'),
          hidden: true,
          canTo: true,
          activeMenu: '/personTools/user/edit/index'
        }
      },
      // {
      //   path: 'role/index',
      //   component: () => import('@/views/Role/List/index.vue'),
      //   name: 'role',
      //   meta: {
      //     title: t('app_menu.roleManage'),
      //     icon: 'clarity:employee-group-line'
      //   }
      // },
      // {
      //   path: 'role/add/index',
      //   name: 'roleAdd',
      //   component: () => import('@/views/Role/Edit/index.vue'),
      //   meta: {
      //     title: t('app_common.add'),
      //     hidden: true,
      //     canTo: true,
      //     activeMenu: '/personTools/role/add/index'
      //   }
      // },
      // {
      //   path: 'role/edit/index',
      //   name: 'roleEdit',
      //   component: () => import('@/views/Role/Edit/index.vue'),
      //   meta: {
      //     title: t('app_common.edit'),
      //     hidden: true,
      //     canTo: true,
      //     activeMenu: '/personTools/role/edit/index'
      //   }
      // },
      {
        path: 'enumType/index',
        component: () => import('@/views/Enum/List/index.vue'),
        name: 'enumType',
        meta: {
          title: t('app_menu.enumType'),
          icon: 'clarity:key-line'
        }
      },
      {
        path: 'enumType/add/index',
        name: 'enumTypeAdd',
        component: () => import('@/views/EnumType/Edit/index.vue'),
        meta: {
          title: t('app_common.add'),
          hidden: true,
          canTo: true,
          activeMenu: '/personTools/enumType/add/index'
        }
      },
      {
        path: 'enumType/edit/index',
        name: 'enumTypeEdit',
        component: () => import('@/views/EnumType/Edit/index.vue'),
        meta: {
          title: t('app_common.edit'),
          hidden: true,
          canTo: true,
          activeMenu: '/personTools/enumType/edit/index'
        }
      }
    ]
  },
  {
    path: '/log',
    component: Layout,
    name: 'log',
    meta: {
      title: t('app_menu.logManage'),
      icon: 'clarity:book-line'
    },
    children: [
      {
        path: 'sysLog/index',
        component: () => import('@/views/Log/SysLog/List/index.vue'),
        name: 'sysLog',
        meta: {
          title: t('app_menu.sysLog'),
          icon: 'clarity:bell-line'
        }
      },
      {
        path: 'operateLog/index',
        component: () => import('@/views/OperateLog/List/index.vue'),
        name: 'operateLog',
        meta: {
          title: t('app_menu.operateLog'),
          icon: 'clarity:bell-outline-badged'
        }
      }
    ]
  }
  // {
  //   path: '/log',
  //   component: Layout,
  //   redirect: '/log/index',
  //   meta: {},
  //   name: 'log',
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'log-index',
  //       component: () => import('@/views/Log/index.vue'),
  //       meta: {
  //         title: t('app_menu.logManage'),
  //         icon: 'clarity:book-line'
  //       }
  //     }
  //   ]
  // },
]

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = (): void => {
  const resetWhiteNameList = ['Redirect', 'Login', 'NoFind', 'Root']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
