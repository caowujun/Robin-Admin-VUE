import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useValidator } from '@/hooks/web/useValidator'
import { FormSchema } from '@/types/form'

const { t } = useI18n()
const { required } = useValidator()

export const rules = reactive({
  enumType: [required()],
  enumName: [required()],
  enumLanguage: [required()],
  enumValue: [required()],
  notes: [{ min: 1, max: 512, message: t('app_common.length_notes') }]
})

export const schema = reactive<FormSchema[]>([
  {
    field: 'enumType',
    label: t('app_enum.enumType'),
    component: 'Input'
  },
  {
    field: 'enumName',
    label: t('app_enum.enumName'),
    component: 'Input'
  },
  {
    field: 'enumValue',
    label: t('app_enum.enumValue'),
    component: 'InputNumber',
    componentProps: {
      controlsPosition: 'right'
    }
  },
  {
    field: 'enumLanguage',
    label: t('app_enum.enumLanguage'),
    component: 'Input'
  },
  {
    field: 'notes',
    label: t('app_common.notes'),
    component: 'Input'
  },
  {
    field: 'tool'
  }
])
