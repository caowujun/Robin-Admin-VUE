import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { TableColumn } from '@/types/table'
import { FormSchema } from '@/types/form'
// import { useDictStoreWithOut } from '@/store/modules/dict'
import { getEnumType } from '@/api/common'

const { t } = useI18n()
// const dictStore = useDictStoreWithOut()

const res: any = await getEnumType()
const enumTypes =
  res &&
  res.map((v) => {
    return { label: v, value: v }
  })
export const columns = reactive<TableColumn[]>([
  {
    field: 'enumType',
    label: t('app_enum.enumType'),
    sortable: true
  },
  {
    field: 'enumLanguage',
    label: t('app_enum.enumName'),
    sortable: true,
    formatter: (_: Recordable, __: TableColumn, cellValue: string) => {
      return t(cellValue)
    }
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
  }
  // {
  //   field: 'enumName',
  //   label: t('app_enum.enumName'),
  //   component: 'Input'
  // }
])
