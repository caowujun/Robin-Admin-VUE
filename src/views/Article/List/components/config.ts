import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { TableColumn } from '@/types/table'
import { FormSchema } from '@/types/form'
import { useDictStoreWithOut } from '@/store/modules/dict'

const { t } = useI18n()
const dictStore = useDictStoreWithOut()

const articleType: any = dictStore.getDictObj['ARTICLESHARE'].map((v) => {
  return { label: t(v.label), value: v.value }
})

export const columns = reactive<TableColumn[]>([
  {
    field: 'articleName',
    label: t('app_article.articleName'),
    sortable: true
  },
  {
    field: 'articleUrl',
    label: t('app_article.articleUrl'),
    sortable: true
  },
  {
    field: 'articleType',
    label: t('app_article.articleType'),
    sortable: true,
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      // console.log(dictStore.getDictObj['ARTICLESHARE'].find((f) => parseInt(f.value) === cellValue))
      return dictStore.getDictObj['ARTICLESHARE'].find((f) => parseInt(f.value) === cellValue)
        ?.label
    }
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
    field: 'articleType',
    label: t('app_article.articleType'),
    component: 'Select',
    componentProps: {
      options: articleType,
      placeholder: ' '
    }
  },
  {
    field: 'articleName',
    label: t('app_article.articleName'),
    component: 'Input'
  }
])
