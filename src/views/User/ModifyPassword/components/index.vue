<script setup lang="ts">
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { useI18n } from '@/hooks/web/useI18n'
import { useRoute, useRouter } from 'vue-router'
import { ElButton, ElMessage } from 'element-plus'
import { schema, rules } from './config'
import { computed, onMounted, ref } from 'vue'
import { saveApi, getApi } from '@/api/user'
import { noMessageAlert } from '@/utils/ElMessageBoxDefine'
import { useAppStore } from '@/store/modules/app'

const { register, methods, elFormRef } = useForm({
  schema
})
const { t } = useI18n()
const { query } = useRoute()
const { push } = useRouter()
const { setValues, getFormData } = methods
const loading = ref(false)
const appStore = useAppStore()
const isMobile = computed(() => appStore.getMobile)

onMounted(async () => {
  if (query.id) {
    const res: any = await getApi(query.id as string)
    res ? setValues(res.data) : noMessageAlert()
  }
})
const save = async () => {
  if (!elFormRef) return

  await elFormRef?.value
    ?.validate(() => {})
    .then(async (valid) => {
      if (valid) {
        loading.value = true
        const result: any = await getFormData()
        let res = await saveApi(result)
          .catch(() => {})
          .finally(() => {
            loading.value = false
          })

        if (res) {
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
    :label-width="isMobile ? 'auto' : '200px'"
    :label-position="isMobile ? 'top' : 'right'"
    :width="isMobile ? 'auto' : '600px'"
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
