import { ElMessageBox } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

const noMessageAlert = () => {
  ElMessageBox.confirm(t('common.noMessageAlert'), t('common.warnning'), {
    confirmButtonText: t('common.noMessageClose'),
    type: 'warning',
    showCancelButton: false,
    callback: () => {
      history.go(-1)
    }
  })
}
export { noMessageAlert }
