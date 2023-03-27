import { useI18n } from '@/hooks/web/useI18n'
import { dateFormatSingle } from '@/utils/dateFormat'

const { t } = useI18n()

type Callback = (error?: string | Error | undefined) => void

interface LengthRange {
  min: number
  max: number
  message: string
}

export const useValidator = () => {
  const required = (message?: string) => {
    return {
      required: true,
      message: message || t('common.required')
    }
  }

  const lengthRange = (val: any, callback: Callback, options: LengthRange) => {
    const { min, max, message } = options
    if (val.length < min || val.length > max) {
      callback(new Error(message))
    } else {
      callback()
    }
  }

  const notSpace = (val: any, callback: Callback, message: string) => {
    // 用户名不能有空格
    if (val.indexOf(' ') !== -1) {
      callback(new Error(message))
    } else {
      callback()
    }
  }

  const notSpecialCharacters = (val: any, callback: Callback, message: string) => {
    // 密码不能是特殊字符
    if (/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/gi.test(val)) {
      callback(new Error(message))
    } else {
      callback()
    }
  }

  // 两个字符串是否想等
  const isEqual = (val1: string, val2: string, callback: Callback, message: string) => {
    if (val1 === val2) {
      callback()
    } else {
      callback(new Error(message))
    }
  }

  // 英数字とアンダースコアのみを入力できる
  const letter_num_underline = (val: any, value: string, callback: Callback) => {
    if (/^[A-Za-z0-9_]+$/gi.test(value)) {
      callback()
    } else {
      callback(new Error(val.message))
    }
  }

  // ・半角英数字のみ,・大小英文字と数字が混在している
  const password_format = (val: any, value: string, callback: Callback) => {
    if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z0-9]{4,64}$/g.test(value)) {
      callback()
    } else {
      callback(new Error(val.message))
    }
  }

  //日期比较
  const dateCompareNow = (val: any, value: Date, callback: Callback) => {
    if (
      new Date(dateFormatSingle(value[1], false)) >= new Date(dateFormatSingle(new Date(), false))
    ) {
      callback()
    } else {
      callback(new Error(val.message))
    }
  }

  //日期验证
  const validateBirthday = (val: any, value: string, callback: Callback) => {
    if (/^(\s*|[\d]{4}|[\d]{8})$/g.test(value)) {
      callback()
    } else {
      callback(new Error(val.message))
    }
  }

  //数字验证
  const number = (val: any, value: string, callback: Callback) => {
    if (/^[A-Za-z0-9_]+$/gi.test(value)) {
      callback()
    } else {
      callback(new Error(val.message))
    }
  }
  return {
    required,
    lengthRange,
    notSpace,
    notSpecialCharacters,
    isEqual,
    letter_num_underline,
    password_format,
    dateCompareNow,
    validateBirthday,
    number
  }
}
