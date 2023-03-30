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
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      }
    }
  },
  {
    field: 'battleNumber',
    label: t('app_sex.battleNumber'),
    sortable: true
  },
  {
    field: 'notes',
    label: t('app_common.notes'),
    sortable: false
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
    field: 'recordDate',
    label: t('app_common.recordDate'),
    component: 'DatePicker',
    componentProps: {
      type: 'daterange',
      startPlaceholder: ' ',
      endPlaceholder: ' '
    },
    formItemProps: {
      style: {}
    },
    value: [new Date(new Date().setDate(new Date().getDate() - 6)), new Date()]
  }
])
