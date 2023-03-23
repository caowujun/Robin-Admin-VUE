import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { TableColumn } from '@/types/table'
import { FormSchema } from '@/types/form'
import { useDictStoreWithOut } from '@/store/modules/dict'

const { t } = useI18n()
const dictStore = useDictStoreWithOut()

const enumTypes: any = dictStore.getDictObj['cityCode'].map((v) => {
  return { label: t(v.label), value: v.value }
})

export const columns = reactive<TableColumn[]>([
  {
    field: 'enumType',
    label: t('app_enum.enumType'),
    sortable: true
  },
  {
    field: 'enumName',
    label: t('app_enum.enumName'),
    sortable: true
  },
  {
    field: 'enumValue',
    label: t('app_enum.enumValue'),
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
    field: 'enumType',
    label: t('app_enum.enumType'),
    component: 'Select',
    componentProps: {
      options: enumTypes,
      placeholder: ' '
    },
    value: ''
  },
  {
    field: 'enumName',
    label: t('app_enum.enumName'),
    component: 'Input'
  }
])
