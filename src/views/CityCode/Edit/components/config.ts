import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useValidator } from '@/hooks/web/useValidator'
import { FormSchema } from '@/types/form'

const { t } = useI18n()
const { required } = useValidator()

export const rules = reactive({
  code: [required()],
  city: [required()]
})

export const schema = reactive<FormSchema[]>([
  {
    field: 'code',
    label: t('app_citycode.code'),
    component: 'Input'
  },
  {
    field: 'city',
    label: t('app_citycode.city'),
    component: 'Input'
  },

  {
    field: 'areaSecond',
    label: t('app_citycode.areaSecond'),
    component: 'Input'
  },
  {
    field: 'areaFirst',
    label: t('app_citycode.areaFirst'),
    component: 'Input'
  },
  {
    field: 'tool'
  }
])
