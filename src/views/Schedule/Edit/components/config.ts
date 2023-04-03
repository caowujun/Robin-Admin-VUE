import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
// import { useValidator } from '@/hooks/web/useValidator'
import { FormSchema } from '@/types/form'

const { t } = useI18n()

export const rules = reactive({
  scheduleStartDate: [
    {
      type: 'datetime',
      required: true,
      message: t('common.required'),
      trigger: 'blur'
    }
  ],
  // scheduleEndDate: [
  //   {
  //     type: 'datetime',
  //     required: true,
  //     message: t('common.required'),
  //     trigger: 'blur'
  //   }
  // ],
  notes: [{ min: 1, max: 512, message: t('app_common.length_notes') }]
})

export const schema = reactive<FormSchema[]>([
  {
    field: 'scheduleStartDate',
    label: t('app_common.startTimeText'),
    component: 'DatePicker',
    componentProps: {
      type: 'datetime',
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  {
    field: 'scheduleEndDate',
    label: t('app_common.endTimeText'),
    component: 'DatePicker',
    componentProps: {
      type: 'datetime',
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    }
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
