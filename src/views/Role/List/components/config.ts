import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { TableColumn } from '@/types/table'

const { t } = useI18n()

export const columns = reactive<TableColumn[]>([
  {
    field: 'roleName',
    label: t('app_role.roleName'),
    sortable: true
  },
  {
    field: 'roleValue',
    label: t('app_role.roleValue'),
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
