import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { TableColumn } from '@/types/table'
import { FormSchema } from '@/types/form'
// import { useDictStoreWithOut } from '@/store/modules/dict'

const { t } = useI18n()
// const dictStore = useDictStoreWithOut()

// const categoryStatus: any = dictStore.getDictObj['moneyCategory'].map((v) => {
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
    field: 'kilometers',
    label: t('app_gasoline.kilometers'),
    sortable: true
  },
  {
    field: 'amount',
    label: t('app_gasoline.amount'),
    sortable: true
  },
  {
    field: 'litre',
    label: t('app_gasoline.litre'),
    sortable: true
  },
  {
    field: 'unitPrice',
    label: t('app_gasoline.unitPrice'),
    sortable: true
  },
  {
    field: 'isFillUp',
    label: t('app_gasoline.isFillUp'),
    sortable: true,
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return cellValue === 1 ? t('app_common.yes') : t('app_common.no')
      // return t(dictStore.getDictObj['STATUS'].find((f) => parseInt(f.value) === cellValue)?.label)
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
