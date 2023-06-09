import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useValidator } from '@/hooks/web/useValidator'
import { FormSchema } from '@/types/form'
import { getListApi } from '@/api/role'

const { t } = useI18n()
const { required } = useValidator()

const roleList: any = await getListApi('')

const roleType: any = roleList.map((v) => {
  return { label: t(v.roleName), value: v.roleValue }
})

export const rules = reactive({
  username: [required()],
  userDisplayName: [required()],
  email: [required()],
  address: [required()],
  phone: [required()],
  roleType: [required()],
  notes: [{ min: 1, max: 512, message: t('app_common.length_notes') }]
})

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
    value: roleType[0].value
  },
  {
    field: 'cityCode',
    label: t('app_user.cityCode')
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
