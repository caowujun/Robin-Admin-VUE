import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { TableColumn } from '@/types/table'
import { FormSchema } from '@/types/form'

const { t } = useI18n()

export const columns = reactive<TableColumn[]>([
  {
    field: 'recordDate',
    label: t('app_common.recordDate'),
    sortable: true,
    form: {
      component: 'DatePicker',
      componentProps: {
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD'
      }
    }
  },
  {
    field: 'exceptionType',
    label: t('app_log.exceptionType'),
    sortable: true
  },

  {
    field: 'exceptionMsg',
    label: t('app_log.exceptionMsg'),
    sortable: true
  },
  {
    field: 'actionText',
    label: t('app_log.actionText'),
    sortable: true
  },

  {
    field: 'action',
    label: t('app_common.action'),
    align: 'center',
    headerAlign: 'center'
  }
])

export const schema = reactive<FormSchema[]>([
  {
    field: 'actionText',
    label: t('app_log.actionText'),
    component: 'Input'
  }
])
