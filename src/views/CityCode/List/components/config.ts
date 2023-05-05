import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { TableColumn } from '@/types/table'
import { FormSchema } from '@/types/form'

const { t } = useI18n()

export const columns = reactive<TableColumn[]>([
  {
    field: 'code',
    label: t('app_citycode.code'),
    sortable: true
  },
  {
    field: 'city',
    label: t('app_citycode.city'),
    sortable: true
  },
  {
    field: 'areaSecond',
    label: t('app_citycode.areaSecond'),
    sortable: true
  },
  {
    field: 'areaFirst',
    label: t('app_citycode.areaFirst'),
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
    field: 'city',
    label: t('app_citycode.city'),
    component: 'Input'
  }
])
