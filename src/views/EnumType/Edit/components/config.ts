import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useValidator } from '@/hooks/web/useValidator'
// import { useDictStoreWithOut } from '@/store/modules/dict'
import { FormSchema } from '@/types/form'

const { t } = useI18n()
// const dictStore = useDictStoreWithOut()
const { required } = useValidator()

// const status: any = dictStore.getDictObj['STATUS'].map((v) => {
//   return { label: t(v.label), value: v.value }
// })

export const rules = reactive({
  enumType: [required()],
  enumLanguage: [required()],
  enumValue: [required()]
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
