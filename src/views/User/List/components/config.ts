import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { TableColumn } from '@/types/table'
import { FormSchema } from '@/types/form'
// import { useDictStoreWithOut } from '@/store/modules/dict'
import { ElTag } from 'element-plus'
import { h } from 'vue'
const { t } = useI18n()
// const dictStore = useDictStoreWithOut()

// const cityCode: any = dictStore.getDictObj['cityCode'].map((v) => {
//   return { label: t(v.label), value: v.value }
// })

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
    sortable: true
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
      // return cellValue === '1' ? t('app_dic.income') : t('app_dic.expenditure')
      return h(
        ElTag,
        {
          type: cellValue === 0 ? 'success' : 'warning'
        },
        () => (cellValue === 0 ? t('app_user.admin') : t('app_user.notAdmin'))
      )
    }
  },
  {
    field: 'cityCode',
    label: t('app_user.cityCode'),
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
