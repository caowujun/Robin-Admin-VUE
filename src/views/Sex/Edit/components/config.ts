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
  recordDate: [
    {
      type: 'date',
      required: true,
      message: t('common.required'),
      trigger: 'blur'
    }
  ],
  battleNumber: [required()],
  notes: [{ min: 1, max: 512, message: t('app_common.length_notes') }]
})

export const schema = reactive<FormSchema[]>([
  {
    field: 'recordDate',
    label: t('app_common.recordDate'),
    component: 'DatePicker',
    componentProps: {
      type: 'datetime',
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  {
    field: 'battleNumber',
    label: t('app_sex.battleNumber'),
    component: 'InputNumber',
    componentProps: {
      controlsPosition: 'right'
    }
  },
  {
    field: 'notes',
    label: t('app_common.notes'),
    component: 'Input'
    // componentProps: {
    //   type: 'textarea',
    //   rows: '3',
    //   maxlength: '512'
    // }
  },
  {
    field: 'tool'
  }
])
