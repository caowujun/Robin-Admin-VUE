import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useValidator } from '@/hooks/web/useValidator'
import { useDictStoreWithOut } from '@/store/modules/dict'
import { FormSchema } from '@/types/form'

const { t } = useI18n()
const dictStore = useDictStoreWithOut()
const { required } = useValidator()

const roleType: any = dictStore.getDictObj['ROLETYPE'].map((v) => {
  return { label: t(v.label), value: v.value }
})

export const rules = reactive({
  // username: [required()],
  userDisplayName: [required()],
  email: [required()],
  address: [required()],
  phone: [required()],
  roleType: [required()],
  cityCode: [required()]
})

export const schema = reactive<FormSchema[]>([
  {
    field: 'username',
    label: t('app_user.username'),
    component: 'Input',
    componentProps: {
      disabled: true
    }
  },
  {
    field: 'userDisplayName',
    label: t('app_user.userDisplayName'),
    component: 'Input'
  },
  {
    field: 'email',
    label: t('app_user.email'),
    component: 'Input'
  },
  {
    field: 'address',
    label: t('app_user.address'),
    component: 'Input'
  },
  {
    field: 'phone',
    label: t('app_user.phone'),
    component: 'Input'
  },
  {
    field: 'roleType',
    label: t('app_user.roleType'),
    component: 'Select',
    componentProps: {
      options: roleType,
      placeholder: t('common.selectText')
    },
    value: '2'
  },
  {
    field: 'cityCode',
    label: t('app_user.cityCode'),
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
