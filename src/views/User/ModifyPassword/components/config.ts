import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useValidator } from '@/hooks/web/useValidator'
import { FormSchema } from '@/types/form'

const { t } = useI18n()
const { required, password_format, validateConfirmPsdReg } = useValidator()

export const passwordSameValidation = reactive({
  validator: validateConfirmPsdReg,
  confirmPsd: '',
  message: t('app_login.passwordEqual'),
  trigger: 'blur'
})

export const rules = reactive({
  currentPassword: [required()],
  newPassword: [
    required(t('app_login.required_password')),
    { min: 8, max: 64, message: t('login.length_password') },
    {
      validator: password_format,
      message: t('login.formater_password'),
      trigger: 'blur'
    }
  ],
  newPasswordAgain: [passwordSameValidation, required(t('app_login.required_password'))]
})

export const schema = reactive<FormSchema[]>([
  {
    field: 'currentPassword',
    label: t('app_login.currentPassword'),
    component: 'Input',
    componentProps: {
      // disabled: true
    }
  },
  {
    field: 'newPassword',
    label: t('app_login.newPassword'),
    component: 'Input'
  },
  {
    field: 'newPasswordAgain',
    label: t('app_login.newPasswordAgain'),
    component: 'Input'
  },

  {
    field: 'tool'
  }
])
