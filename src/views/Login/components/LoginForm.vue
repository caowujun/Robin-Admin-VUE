<script setup lang="ts">
import { ref, unref, watch } from 'vue'
import { Form } from '@/components/Form'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton, ElCheckbox, ElLink } from 'element-plus'
import { useForm } from '@/hooks/web/useForm'
import { loginApi } from '@/api/login'
import { useCache, useCache_local } from '@/hooks/web/useCache'
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'
import { UserType } from '@/api/login/types'
import { schema_login as schema, rules_login as rules } from './index'
import filterRouter from '@/router/permissionAssign'

// const emit = defineEmits(['to-register'])

const appStore = useAppStore()

const permissionStore = usePermissionStore()

const { currentRoute, addRoute, push } = useRouter()

const { wsCache } = useCache()
const { wsCache_local } = useCache_local()
const { t } = useI18n()

// const iconSize = 30

const remember = ref(false)

const { register, elFormRef, methods } = useForm()

const loading = ref(false)

// const iconColor = '#999'

const redirect = ref<string>('')

watch(
  () => currentRoute.value,
  (route: RouteLocationNormalizedLoaded) => {
    redirect.value = route?.query?.redirect as string
  },
  {
    immediate: true
  }
)

// 登录
const signIn = async () => {
  const formRef = unref(elFormRef)
  await formRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const { getFormData } = methods
      const formData = await getFormData<UserType>()

      try {
        const res = await loginApi(formData)

        if (res) {
          wsCache.set(
            'jwt',
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsYXN0TmFtZSI6IuadjiIsImZpcnN0TmFtZSI6IumdmeWLkiIsImlzcyI6IlNDU0siLCJ1c2VyVHlwZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjgzMjY5MjI1LCJ1c2VySWQiOjM0NjMzMTQ2MDI4Nzk5MTgwOSwibWVhbnNOYW1lIjoi6LuK5qSF5a2QIiwiZW1haWwiOiJ3YW5nbmFreEAxNjMuY29tIn0.-V-3x3LdkD0637Nt808bqMF7rwkFqzS3pym_l4VMkxY'
          )

          //選出されると、保存状況はローカルに保存され、有効期間は1か月です
          if (remember?.value === true) {
            wsCache_local.set('remember', remember.value)
            wsCache_local.set(appStore.getUserInfo, res.data)
          } else {
            wsCache.set(appStore.getUserInfo, res.data)
          }
          // 是否使用动态路由
          console.log('appStore.getDynamicRouter', appStore.getDynamicRouter)
          if (appStore.getDynamicRouter) {
            getRole(res.data.roleType)
          } else {
            await permissionStore.generateRoutes('none').catch(() => {})
            permissionStore.getAddRouters.forEach((route) => {
              addRoute(route as RouteRecordRaw) // 动态添加可访问路由表
            })
            permissionStore.setIsAddRouters(true)
            push({ path: redirect.value || permissionStore.addRouters[0].path })
          }
        }
      } finally {
        loading.value = false
      }
    }
  })
}

// 获取角色信息
const getRole = async (accountRoleType: string) => {
  alert(1)
  // admin - 模拟前端过滤菜单，roleType=1
  // test - 模拟前端过滤菜单，roleType=2
  const res = filterRouter(accountRoleType) //: await getTestRoleApi(params)
  // const { wsCache } = useCache()
  const routers = res || []
  //路由加到缓存
  wsCache.set('roleRouters', routers)
  remember.value && wsCache_local.set('roleRouters', routers)
  //1代表是前端过滤，2代表是后端过滤
  await permissionStore.generateRoutes(1, routers).catch(() => {})
  permissionStore.getAddRouters.forEach((route) => {
    addRoute(route as RouteRecordRaw) // 动态添加可访问路由表
  })
  permissionStore.setIsAddRouters(true)
  push({ path: redirect.value || permissionStore.addRouters[0].path })
}

// 去注册页面
// const toRegister = () => {
//   emit('to-register')
// }
</script>

<template>
  <Form
    :schema="schema"
    :rules="rules"
    label-position="top"
    hide-required-asterisk
    size="large"
    class="dark:(border-1 border-[var(--el-border-color)] border-solid)"
    @register="register"
  >
    <template #title>
      <h2 class="text-2xl font-bold text-center w-[100%]">{{ t('login.login') }}</h2>
    </template>

    <template #tool>
      <div class="flex justify-between items-center w-[100%]">
        <ElCheckbox v-model="remember" :label="t('login.remember')" size="small" />
        <ElLink type="primary" :underline="false">{{ t('login.forgetPassword') }}</ElLink>
      </div>
    </template>

    <template #login>
      <div class="w-[100%]">
        <ElButton :loading="loading" type="primary" class="w-[100%]" @click="signIn">
          {{ t('login.login') }}
        </ElButton>
      </div>
      <!-- <div class="w-[100%] mt-15px">
        <ElButton class="w-[100%]" @click="toRegister">
          {{ t('login.register') }}
        </ElButton>
      </div> -->
    </template>

    <!-- <template #otherIcon>
      <div class="flex justify-between w-[100%]">
        <Icon
          icon="ant-design:github-filled"
          :size="iconSize"
          class="cursor-pointer anticon"
          :color="iconColor"
        />
        <Icon
          icon="ant-design:wechat-filled"
          :size="iconSize"
          class="cursor-pointer anticon"
          :color="iconColor"
        />
        <Icon
          icon="ant-design:alipay-circle-filled"
          :size="iconSize"
          :color="iconColor"
          class="cursor-pointer anticon"
        />
        <Icon
          icon="ant-design:weibo-circle-filled"
          :size="iconSize"
          :color="iconColor"
          class="cursor-pointer anticon"
        />
      </div>
    </template> -->
  </Form>
</template>

<style lang="less" scoped>
:deep(.anticon) {
  &:hover {
    color: var(--el-color-primary) !important;
  }
}
</style>
