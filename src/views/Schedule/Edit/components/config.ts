import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
// import { useValidator } from '@/hooks/web/useValidator'
import { FormSchema } from '@/types/form'

const { t } = useI18n()

export const rules = reactive({
  scheduleDate: [
    {
      type: 'date',
      required: true,
      message: t('common.required'),
      trigger: 'blur'
    }
  ],
  // category: [required()],
  // amount: [required()],
  notes: [{ min: 1, max: 512, message: t('app_common.length_notes') }]
})

export const schema = reactive<FormSchema[]>([
  {
    field: 'scheduleDate',
    label: t('app_schedule.scheduleDate'),
    component: 'DatePicker',
    componentProps: {
      type: 'daterange',
      startPlaceholder: ' ',
      endPlaceholder: ' '
    },
    formItemProps: {
      style: {}
    }
    // value: [new Date(), new Date()]
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
