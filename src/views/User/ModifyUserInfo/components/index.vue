<script setup lang="ts">
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter } from 'vue-router'
import { ElButton, ElMessage } from 'element-plus'
import { schema, rules } from './config'
import { computed, onMounted, ref } from 'vue'
import { changeUserInfoApi, getApi } from '@/api/user'
import { noMessageAlert } from '@/utils/ElMessageBoxDefine'
import { useAppStore } from '@/store/modules/app'
import { cacheQuery, updateCache } from '@/hooks/web/useCache'

const { register, methods, elFormRef } = useForm({
  schema
})
const { t } = useI18n()
const { push } = useRouter()
const { setValues, getFormData } = methods
const loading = ref(false)
const appStore = useAppStore()
const isMobile = computed(() => appStore.getMobile)

onMounted(async () => {
  if (cacheQuery(appStore.getUserInfo)?.id) {
    const res: any = await getApi(cacheQuery(appStore.getUserInfo)?.id)
    res ? setValues(res.data) : noMessageAlert()
  }
})
const save = async () => {
  if (!elFormRef) return
  // appStore.setUserDisplayName('result.userDisplayName')

  await elFormRef?.value
    ?.validate(() => {})
    .then(async (valid) => {
      if (valid) {
        loading.value = true
        const result: any = await getFormData()
        let res = await changeUserInfoApi(result)
          .catch(() => {})
          .finally(() => {
            loading.value = false
          })

        if (res) {
          // alert(result.userDisplayName)
          //更新缓存
          appStore.setUserDisplayName(result.userDisplayName)
          //選出されると、保存状況はローカルに保存され、有効期間は1か月です
          updateCache(appStore.getUserInfo, result)
          console.log(cacheQuery(appStore.getUserInfo))
          ElMessage.success(t('app_common.saveSuccess'))
          push({ name: 'home' })
        }
      }
    })
}

const reset = async () => {
  push({ name: 'home' })
}
// const layout = ref('inline')
// const buttonPosition = ref('left')
</script>

<template>
  <Form
    @register="register"
    :is-col="false"
    :rules="rules"
    :loading="loading"
    :label-width="isMobile ? 'auto' : appStore.getLabelWidth"
    :label-position="isMobile ? 'top' : 'right'"
  >
    <template #tool>
      <div class="buttonBox">
        <ElButton @click="save" type="primary">{{ t('app_common.save') }}</ElButton>
        <ElButton @click="reset">{{ t('common.cancel') }}</ElButton>
      </div>
    </template>
  </Form>
</template>
<style scoped lang="less"></style>
