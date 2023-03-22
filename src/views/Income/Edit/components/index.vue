<script setup lang="ts">
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { useI18n } from '@/hooks/web/useI18n'
import { useRoute, useRouter } from 'vue-router'
import { ElButton, ElMessage } from 'element-plus'
import { schema, rules } from './config'
import { onMounted, ref } from 'vue'
import { saveMoneyApi, getMoneyApi } from '@/api/money'
import { noMessageAlert } from '@/utils/ElMessageBoxDefine'

const { register, methods, elFormRef } = useForm({
  schema
})
const { t } = useI18n()
const { query } = useRoute()
const { push } = useRouter()
const { setValues, getFormData } = methods
const loading = ref(false)

onMounted(async () => {
  // console.log('query.id', query.id)

  if (query.id) {
    const res: any = await getMoneyApi(query.id as string)
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
        let res = await saveMoneyApi(result)
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
  push({ name: 'income' })
}
</script>

<template>
  <Form @register="register" :is-col="false" :rules="rules" :loading="loading">
    <template #tool>
      <div class="buttonBox">
        <ElButton @click="save" type="primary">{{ t('app_common.save') }}</ElButton>
        <ElButton @click="reset">{{ t('common.cancel') }}</ElButton>
      </div>
    </template>
  </Form>
</template>
