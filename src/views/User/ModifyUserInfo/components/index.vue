<script setup lang="ts">
import { Form } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter } from 'vue-router'
import { ElButton, ElMessage, ElOption, ElSelect } from 'element-plus'
import { schema, rules } from './config'
import { computed, onMounted, ref } from 'vue'
import { changeUserInfoApi, getApi } from '@/api/user'
import { noMessageAlert } from '@/utils/ElMessageBoxDefine'
import { useAppStore } from '@/store/modules/app'
import { cacheQuery, updateCache } from '@/hooks/web/useCache'
import { getByCodeApi, getCityCodeApi } from '@/api/citycode'

const { register, methods, elFormRef } = useForm({
  schema
})
const { t } = useI18n()
const { push } = useRouter()
const { setValues, getFormData } = methods
const loading = ref(false)
const appStore = useAppStore()
const isMobile = computed(() => appStore.getMobile)
const value = ref<string>('')

interface ListItem {
  value: string
  label: string
}
const options = ref<ListItem[]>([])

onMounted(async () => {
  if (cacheQuery(appStore.getUserInfo)?.id) {
    const res: any = await getApi(cacheQuery(appStore.getUserInfo)?.id)
    res ? setValues(res.data) : noMessageAlert()
    const cityCode: any = await getByCodeApi(res.data.cityCode).catch(() => {})
    if (cityCode) {
      options.value = [
        {
          value: cityCode.data.code,
          label: cityCode.data.city + ',' + cityCode.data.areaSecond + ',' + cityCode.data.areaFirst
        }
      ]
      value.value = cityCode.data.code
    }
  }
})
const remoteMethod = (query: string) => {
  options.value = []
  if (query) {
    loading.value = true
    setTimeout(async () => {
      loading.value = false
      const res: any = await getCityCodeApi(query).catch(() => {})

      options.value = res?.map((v) => {
        return { label: v.city + ',' + v.areaSecond + ',' + v.areaFirst, value: v.code }
      })
    }, 100)
  }
}
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
          ElMessage.success(t('app_common.saveSuccess'))
          push({ name: 'home' })
        }
      }
    })
}

const reset = async () => {
  push({ name: 'home' })
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
    <template #cityCode>
      <ElSelect
        filterable
        remote
        :remote-method="remoteMethod"
        v-model="value"
        :remote-show-suffix="true"
        :clearable="true"
      >
        <ElOption
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>
    </template>
    <template #tool>
      <div class="buttonBox">
        <ElButton @click="save" type="primary">{{ t('app_common.save') }}</ElButton>
        <ElButton @click="reset">{{ t('common.cancel') }}</ElButton>
      </div>
    </template>
  </Form>
</template>
<style scoped lang="less"></style>
