import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useValidator } from '@/hooks/web/useValidator'
import { useDictStoreWithOut } from '@/store/modules/dict'
import { FormSchema } from '@/types/form'

const { t } = useI18n()
const dictStore = useDictStoreWithOut()
const { required } = useValidator()
const articleType: any = dictStore.getDictObj['ARTICLESHARE'].map((v) => {
  return { label: t(v.label), value: v.value }
})

export const rules = reactive({
  articleName: [required()],
  articleUrl: [required()],
  articleType: [required()],
  notes: [{ min: 1, max: 512, message: t('app_common.length_notes') }]
})

export const schema = reactive<FormSchema[]>([
  {
    field: 'articleType',
    label: t('app_article.articleType'),
    component: 'Select',
    componentProps: {
      options: articleType,
      placeholder: t('common.selectText')
    }
  },
  {
    field: 'articleName',
    label: t('app_article.articleName'),
    component: 'Input'
  },
  {
    field: 'articleUrl',
    label: t('app_article.articleUrl'),
    component: 'Input'
  },

  {
    field: 'notes',
    label: t('app_common.notes'),
    component: 'Input'
  },
  {
    field: 'tool'
  }
])
