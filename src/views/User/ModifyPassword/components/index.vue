<script setup lang="ts">
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter } from 'vue-router'
import { ElButton, ElMessage } from 'element-plus'
import { schema, rules } from './config'
import { computed, onMounted, ref } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { changeUserPasswordApi } from '@/api/user'

const { register, methods, elFormRef } = useForm({
  schema
})
const { t } = useI18n()
const { push } = useRouter()
const { getFormData } = methods
const loading = ref(false)
const appStore = useAppStore()
const isMobile = computed(() => appStore.getMobile)

// watch(
//   form,
//   async (newValue) => {
//     if (newValue.newPasswordAgain) {
//       const _rules = Object.assign(passwordSameValidation, { confirmPsd: newValue.newPassword })
//       rules.newPasswordAgain.splice(0, 1, _rules)
//     }
//     setValues({
//       currentPassword: newValue.currentPassword,
//       newPassword: newValue.newPassword,
//       newPasswordAgain: newValue.newPasswordAgain
//     })
//   },
//   {
//     immediate: true,
//     deep: true
//   }
// )
onMounted(async () => {
  // if (query.id) {
  //   const res: any = await getApi(query.id as string)
  //   res ? setValues(res.data) : noMessageAlert()
  // }
})
const save = async () => {
  if (!elFormRef) return

  await elFormRef?.value
    ?.validate(() => {})
    .then(async (valid) => {
      if (valid) {
        loading.value = true
        const result: any = await getFormData()
        let res = await changeUserPasswordApi(result)
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
