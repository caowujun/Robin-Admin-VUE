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
    // redirect: 'noredirect',//不设置等同于设置为noredirect
    children: [
      {
        path: 'income',
        component: () => import('@/views/Income/List/index.vue'),
        name: 'income',
        meta: {
          title: t('app_menu.income'),
          icon: 'clarity:media-changer-outline-badged'
        },
        children: [
          {
            path: 'add/index',
            name: 'incomeAdd',
            component: () => import('@/views/Income/Edit/index.vue'),
            meta: {
              title: t('app_common.add'),
              hidden: true,
              canTo: true,
              activeMenu: '/personTools/income'
            }
          },
          {
            path: 'edit/index',
            name: 'incomeEdit',
            component: () => import('@/views/Income/Edit/index.vue'),
            meta: {
              title: t('app_common.edit'),
              hidden: true,
              canTo: true,
              activeMenu: '/personTools/income'
            }
          }
        ]
      },

      {
        path: 'sex',
        component: () => import('@/views/Sex/List/index.vue'),
        name: 'sex',
        meta: {
          title: t('app_menu.sex'),
          icon: 'clarity:resource-pool-outline-alerted'
        },
        children: [
          {
            path: 'add/index',
            name: 'sexAdd',
            component: () => import('@/views/Sex/Edit/index.vue'),
            meta: {
              title: t('app_common.add'),
              hidden: true,
              canTo: true,
              activeMenu: '/personTools/sex'
            }
          },
          {
            path: 'edit/index',
            name: 'sexEdit',
            component: () => import('@/views/Sex/Edit/index.vue'),
            meta: {
              title: t('app_common.edit'),
              hidden: true,
              canTo: true,
              activeMenu: '/personTools/sex'
            }
          }
        ]
      },

      {
        path: 'schedule',
        component: () => import('@/views/Schedule/List/index.vue'),
        name: 'schedule',
        meta: {
          title: t('app_menu.schedule'),
          icon: 'clarity:calendar-outline-badged'
        },
        children: [
          {
            path: 'add/index',
            name: 'scheduleAdd',
            component: () => import('@/views/Schedule/Edit/index.vue'),
            meta: {
              title: t('app_common.add'),
              hidden: true,
              canTo: true,
              activeMenu: '/personTools/schedule'
            }
          },
          {
            path: 'edit/index',
            name: 'scheduleEdit',
            component: () => import('@/views/Schedule/Edit/index.vue'),
            meta: {
              title: t('app_common.edit'),
              hidden: true,
              canTo: true,
              activeMenu: '/personTools/schedule'
            }
          }
        ]
      },

      {
        path: 'gasoline',
        component: () => import('@/views/Gasoline/List/index.vue'),
        name: 'gasoline',
        meta: {
          title: t('app_menu.gasoline'),
          icon: 'clarity:hourglass-outline-alerted'
        },
        children: [
          {
            path: 'add/index',
            name: 'gasolineAdd',
            component: () => import('@/views/Gasoline/Edit/index.vue'),
            meta: {
              title: t('app_common.add'),
              hidden: true,
              canTo: true,
              activeMenu: '/personTools/gasoline'
            }
          },
          {
            path: 'edit/index',
            name: 'gasolineEdit',
            component: () => import('@/views/Gasoline/Edit/index.vue'),
            meta: {
              title: t('app_common.edit'),
              hidden: true,
              canTo: true,
              activeMenu: '/personTools/gasoline'
            }
          }
        ]
      },

      {
        path: 'article',
        component: () => import('@/views/Article/List/index.vue'),
        name: 'article',
        meta: {
          title: t('app_menu.article'),
          icon: 'clarity:bookmark-line'
        },
        children: [
          {
            path: 'add/index',
            name: 'articleAdd',
            component: () => import('@/views/Article/Edit/index.vue'),
            meta: {
              title: t('app_common.add'),
              hidden: true,
              canTo: true,
              activeMenu: '/personTools/article'
            }
          },
          {
            path: 'edit/index',
            name: 'articleEdit',
            component: () => import('@/views/Article/Edit/index.vue'),
            meta: {
              title: t('app_common.edit'),
              hidden: true,
              canTo: true,
              activeMenu: '/personTools/article'
            }
          }
        ]
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
        path: 'user',
        component: () => import('@/views/User/List/index.vue'),
        name: 'user',
        meta: {
          title: t('app_menu.userManage'),
          icon: 'clarity:user-line'
        },
        children: [
          {
            path: 'add/index',
            name: 'userAdd',
            component: () => import('@/views/User/Edit/index.vue'),
            meta: {
              title: t('app_common.add'),
              hidden: true,
              canTo: true,
              activeMenu: '/personTools/user'
            }
          },
          {
            path: 'edit/index',
            name: 'userEdit',
            component: () => import('@/views/User/Edit/index.vue'),
            meta: {
              title: t('app_common.edit'),
              hidden: true,
              canTo: true,
              activeMenu: '/personTools/user'
            }
          }
        ]
      },

      {
        path: 'role',
        component: () => import('@/views/Role/List/index.vue'),
        name: 'role',
        meta: {
          title: t('app_menu.roleManage'),
          icon: 'clarity:employee-group-line'
        },
        children: [
          {
            path: 'add/index',
            name: 'roleAdd',
            component: () => import('@/views/Role/Edit/index.vue'),
            meta: {
              title: t('app_common.add'),
              hidden: true,
              canTo: true,
              activeMenu: '/personTools/role/add'
            }
          },
          {
            path: 'edit/index',
            name: 'roleEdit',
            component: () => import('@/views/Role/Edit/index.vue'),
            meta: {
              title: t('app_common.edit'),
              hidden: true,
              canTo: true,
              activeMenu: '/personTools/role/edit'
            }
          }
        ]
      },

      {
        path: 'enumType',
        component: () => import('@/views/EnumType/List/index.vue'),
        name: 'enumType',
        meta: {
          title: t('app_menu.enumType'),
          icon: 'clarity:key-line'
        },
        children: [
          {
            path: 'add/index',
            name: 'enumTypeAdd',
            component: () => import('@/views/EnumType/Edit/index.vue'),
            meta: {
              title: t('app_common.add'),
              hidden: true,
              canTo: true,
              activeMenu: '/personTools/enumType'
            }
          },
          {
            path: 'edit/index',
            name: 'enumTypeEdit',
            component: () => import('@/views/EnumType/Edit/index.vue'),
            meta: {
              title: t('app_common.edit'),
              hidden: true,
              canTo: true,
              activeMenu: '/personTools/enumType'
            }
          }
        ]
      },

      {
        path: 'cityCode',
        component: () => import('@/views/CityCode/List/index.vue'),
        name: 'cityCode',
        meta: {
          title: t('app_menu.cityCode'),
          icon: 'clarity:key-line'
        },
        children: [
          {
            path: 'add/index',
            name: 'cityCodeAdd',
            component: () => import('@/views/CityCode/Edit/index.vue'),
            meta: {
              title: t('app_common.add'),
              hidden: true,
              canTo: true,
              activeMenu: '/personTools/cityCode'
            }
          },
          {
            path: 'edit/index',
            name: 'cityCodeEdit',
            component: () => import('@/views/CityCode/Edit/index.vue'),
            meta: {
              title: t('app_common.edit'),
              hidden: true,
              canTo: true,
              activeMenu: '/personTools/cityCode'
            }
          }
        ]
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
        path: 'sysLog',
        component: () => import('@/views/Log/SysLog/List/index.vue'),
        name: 'sysLog',
        meta: {
          title: t('app_menu.sysLog'),
          icon: 'clarity:bell-line'
        },
        children: [
          {
            path: 'view/index',
            name: 'sysLogDetail',
            component: () => import('@/views/Log/View/index.vue'),
            meta: {
              title: t('app_common.detail'),
              hidden: true,
              canTo: true,
              activeMenu: '/log/sysLog'
            }
          }
        ]
      },
      {
        path: 'operateLog',
        component: () => import('@/views/Log/OperateLog/List/index.vue'),
        name: 'operateLog',
        meta: {
          title: t('app_menu.operateLog'),
          icon: 'clarity:bell-outline-badged'
        },
        children: [
          {
            path: 'view/index',
            name: 'operationLogDetail',
            component: () => import('@/views/Log/View/index.vue'),
            meta: {
              title: t('app_common.detail'),
              hidden: true,
              canTo: true,
              activeMenu: '/log/operateLog'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/modifyUserInfo',
    component: Layout,
    redirect: '/modifyUserInfo/index',
    name: 'modifyUserInfo',
    meta: { hidden: true, canTo: true },
    children: [
      {
        path: 'index',
        name: 'modifyUserInfo-index',
        component: () => import('@/views/User/ModifyUserInfo/index.vue'),
        meta: {
          title: t('app_login.userInfoItem'),
          icon: 'clarity:avatar-solid'
        }
      }
    ]
  },
  {
    path: '/modifyPassword',
    component: Layout,
    redirect: '/modifyPassword/index',
    name: 'modifyPassword',
    meta: { hidden: true, canTo: true },
    children: [
      {
        path: 'index',
        name: 'modifyPassword-index',
        component: () => import('@/views/User/ModifyPassword/index.vue'),
        meta: {
          title: t('app_login.modifyPwdItem'),
          icon: 'clarity:paste-solid'
        }
      }
    ]
  }
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
