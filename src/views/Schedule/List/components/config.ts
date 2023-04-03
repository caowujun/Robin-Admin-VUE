import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { TableColumn } from '@/types/table'
import { FormSchema } from '@/types/form'

const { t } = useI18n()

export const columns = reactive<TableColumn[]>([
  {
    field: 'scheduleStartDate',
    label: t('app_common.startTimeText'),
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
    field: 'scheduleEndDate',
    label: t('app_common.endTimeText'),
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
    field: 'notes',
    label: t('app_common.notes'),
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
    },
    value: [new Date(new Date().setDate(new Date().getDate() - 6)), new Date()]
  }
])

// export const formatterApprovalStateColor = [
//   { key: notification_approval_status.waitingApply, color: 'rgb(250, 188, 4)' },
//   { key: notification_approval_status.waitingConfirm, color: 'rgb(102, 176, 50)' }
// ]
