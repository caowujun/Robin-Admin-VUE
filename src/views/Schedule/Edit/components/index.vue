<script setup lang="ts">
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { useI18n } from '@/hooks/web/useI18n'
import { useRoute, useRouter } from 'vue-router'
import { ElButton, ElMessage } from 'element-plus'
import { schema, rules } from './config'
import { computed, onMounted, ref } from 'vue'
import { saveApi, getApi } from '@/api/schedule'
import { noMessageAlert } from '@/utils/ElMessageBoxDefine'
import { useAppStore } from '@/store/modules/app'
import { dateFormatToGreenwich } from '@/utils/dateFormat'

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
    // console.log(res)
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
        result['scheduleStartDate'] = result.scheduleDate
          ? dateFormatToGreenwich([result.scheduleDate[0], result.scheduleDate[1]], false).value[0]
          : ''
        result['scheduleEndDate'] = result.scheduleDate
          ? dateFormatToGreenwich([result.scheduleDate[0], result.scheduleDate[1]], false).value[1]
          : ''
        console.log(result)
        let res = await saveApi(result)
          .catch(() => {})
          .finally(() => {
            loading.value = false
          })

        if (res) {
          ElMessage.success(t('app_common.saveSuccess'))
          push({ name: 'income' })
        }
      }
    })
}

const reset = async () => {
  push({ name: 'schedule' })
}
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
