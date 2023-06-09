import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { TableColumn } from '@/types/table'
import { FormSchema } from '@/types/form'
import { ElTag } from 'element-plus'
import { h } from 'vue'
const { t } = useI18n()

export const columns = reactive<TableColumn[]>([
  {
    field: 'username',
    label: t('app_user.username'),
    sortable: true
  },

  {
    field: 'userDisplayName',
    label: t('app_user.userDisplayName'),
    sortable: true
  },
  {
    field: 'email',
    label: t('app_user.email'),
    sortable: true
  },
  {
    field: 'address',
    label: t('app_user.address'),
    sortable: true,
    showOverflowTooltip: false
  },
  {
    field: 'phone',
    label: t('app_user.phone'),
    sortable: true
  },
  {
    field: 'roleType',
    label: t('app_user.roleType'),
    sortable: true,
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      // return cellValue === '1' ? t('app_money.income') : t('app_money.expenditure')

      return h(
        ElTag,
        {
          type: cellValue === 1 ? 'success' : 'warning'
        },
        () => (cellValue === 1 ? t('app_user.adminUser') : t('app_user.normalUser'))
      )
    }
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
    field: 'username',
    label: t('app_user.username'),
    component: 'Input'
  },
  {
    field: 'userDisplayName',
    label: t('app_user.userDisplayName'),
    component: 'Input'
  }
])
