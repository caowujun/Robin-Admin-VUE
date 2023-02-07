import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { TableColumn } from '@/types/table'
import { FormSchema } from '@/types/form'
import { useDictStoreWithOut } from '@/store/modules/dict'

const { t } = useI18n()
const dictStore = useDictStoreWithOut()

const categoryStatus: any = dictStore.getDictObj['moneyCategory'].map((v) => {
  return { label: t(v.label), value: v.value }
})

export const columns = reactive<TableColumn[]>([
  {
    field: 'recordDate',
    label: t('app_money.recordDate'),
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
    field: 'amount',
    label: t('app_money.amount'),
    sortable: true
  },
  {
    field: 'categoryTitle',
    label: t('app_money.category'),
    sortable: true,
    formatter: (_: Recordable, __: TableColumn, cellValue: string) => {
      return t(cellValue)
      // return h(
      //   ElTag,
      //   {
      //     type: cellValue === 1 ? 'success' : cellValue === 2 ? 'warning' : 'danger'
      //   },
      //   () =>
      //     cellValue === 1
      //       ? t('tableDemo.important')
      //       : cellValue === 2
      //       ? t('tableDemo.good')
      //       : t('tableDemo.commonly')
      // )
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
    field: 'category',
    label: t('app_money.category'),
    component: 'Select',
    componentProps: {
      options: categoryStatus,
      placeholder: ' '
    },
    value: 1
  }
])
