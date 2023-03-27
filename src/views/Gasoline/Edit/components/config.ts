import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useValidator } from '@/hooks/web/useValidator'
import { useDictStoreWithOut } from '@/store/modules/dict'
import { FormSchema } from '@/types/form'

const { t } = useI18n()
const dictStore = useDictStoreWithOut()
const { required } = useValidator()

const status: any = dictStore.getDictObj['STATUS'].map((v) => {
  return { label: t(v.label), value: v.value }
})

export const rules = reactive({
  recordDate: [
    {
      type: 'date',
      required: true,
      message: t('common.required'),
      trigger: 'blur'
    }
  ],
  amount: [required()],
  litre: [required()],
  unitPrice: [required()],
  kilometers: [required()],
  isFillUp: [required()]
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
    field: 'amount',
    label: t('app_gasoline.amount'),
    component: 'InputNumber',
    componentProps: {
      controlsPosition: 'right'
    }
  },
  {
    field: 'litre',
    label: t('app_gasoline.litre'),
    component: 'InputNumber',
    componentProps: {
      controlsPosition: 'right'
    }
  },
  {
    field: 'unitPrice',
    label: t('app_gasoline.unitPrice'),
    component: 'InputNumber',
    componentProps: {
      controlsPosition: 'right'
    }
  },
  {
    field: 'kilometers',
    label: t('app_gasoline.kilometers'),
    component: 'InputNumber',
    componentProps: {
      controlsPosition: 'right'
    }
  },
  {
    field: 'isFillUp',
    label: t('app_gasoline.isFillUp'),
    component: 'Select',
    componentProps: {
      options: status,
      placeholder: t('common.selectText')
    },
    value: '1',
    formItemProps: {
      style: {
        minWidth: '1580px'
      }
    }
  },
  {
    field: 'tool'
  }
])
