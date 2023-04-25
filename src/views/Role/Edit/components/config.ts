import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useValidator } from '@/hooks/web/useValidator'
import { FormSchema } from '@/types/form'

const { t } = useI18n()
const { required } = useValidator()

export const rules = reactive({
  //   recordDate: [
  //     {
  //       type: 'date',
  //       required: true,
  //       message: t('common.required'),
  //       trigger: 'blur'
  //     }
  //   ],
  roleName: [required()],
  notes: [{ min: 1, max: 512, message: t('app_common.length_notes') }]
})

export const schema = reactive<FormSchema[]>([
  //   {
  //     field: 'recordDate',
  //     label: t('app_common.recordDate'),
  //     component: 'DatePicker',
  //     componentProps: {
  //       type: 'datetime',
  //       valueFormat: 'YYYY-MM-DD HH:mm:ss'
  //     }
  //   },
  {
    field: 'roleName',
    label: t('app_role.roleName'),
    component: 'Input'
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
