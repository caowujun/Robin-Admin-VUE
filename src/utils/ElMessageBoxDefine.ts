import { ElMessageBox } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

const noMessageAlert = () => {
  ElMessageBox.confirm(t('app_common.noMessageAlert'), t('app_common.warnning'), {
    confirmButtonText: t('app_common.noMessageClose'),
    type: 'warning',
    showCancelButton: false,
    callback: () => {
      history.go(-1)
    }
  })
}
export { noMessageAlert }
