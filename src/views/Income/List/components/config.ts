import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { TableColumn } from '@/types/table'
import { FormSchema } from '@/types/form'
import { useDictStoreWithOut } from '@/store/modules/dict'
import { ElTag } from 'element-plus'
import { h } from 'vue'
const { t } = useI18n()
const dictStore = useDictStoreWithOut()

debugger
const categoryStatus: any = dictStore.getDictObj['INCOME'].map((v) => {
  return { label: t(v.label), value: v.value }
})

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
    field: 'amount',
    label: t('app_money.amount'),
    sortable: true
  },
  {
    field: 'category',
    label: t('app_money.category'),
    sortable: true,
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      // return cellValue === '1' ? t('app_money.income') : t('app_money.expenditure')

      return h(
        ElTag,
        {
          type: cellValue === 0 ? 'success' : 'warning'
        },
        () => (cellValue === 0 ? t('app_money.income') : t('app_money.expenditure'))
      )
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
    value: '1'
  }
])
