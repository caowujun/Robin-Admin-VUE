import { ref } from 'vue'
// date format to 2016-01-06T10:15:47+08:00
// flag: true HH:ss:mm;false  none
// The maximum length of the array is 2
export const dateFormatToGreenwich = (dateArray, hmsFlag: Boolean) => {
  const returnDate = ref<string[]>([])
  dateArray.forEach((date, index) => {
    // year
    const Y = date.getFullYear().toString()
    // month
    const M = compareWithTen((date.getMonth() + 1).toString())
    // day
    const D = compareWithTen(date.getDate().toString())
    // hour
    const H = compareWithTen(date.getHours().toString())
    // minute
    const MM = compareWithTen(date.getMinutes().toString())
    // second
    const S = compareWithTen(date.getSeconds().toString())
    const timeZone = -date.getTimezoneOffset() / 60
    const dateTime = ref('')
    if (hmsFlag) {
      dateTime.value = strSplice(Y, M, D, H + ':' + MM + ':' + S, timeZone)
    } else {
      if (0 === index) {
        dateTime.value = strSplice(Y, M, D, '00:00:00', timeZone)
      } else {
        dateTime.value = strSplice(Y, M, D, '23:59:59', timeZone)
      }
    }
    returnDate.value.push(dateTime.value)
  })
  return returnDate
}

// hmsFlag: true 00:00:00,false 23:59:59
export const dateFormat = (date, hmsFlag: Boolean, nowDate?: Boolean) => {
  // year
  const Y = date.getFullYear().toString()
  // month
  const M = compareWithTen((date.getMonth() + 1).toString())
  // day
  const D = compareWithTen(date.getDate().toString())
  // hour
  const H = compareWithTen(date.getHours().toString())
  // minute
  const MM = compareWithTen(date.getMinutes().toString())
  // second
  const S = compareWithTen(date.getSeconds().toString())
  const timeZone = -date.getTimezoneOffset() / 60
  const dateTime = ref('')
  if (hmsFlag) {
    dateTime.value = strSplice(Y, M, D, '00:00:00', timeZone)
  } else {
    dateTime.value = strSplice(Y, M, D, '23:59:59', timeZone)
  }

  if (hmsFlag && nowDate) {
    dateTime.value = strSplice(Y, M, D, H + ':' + MM + ':' + S, timeZone)
  }
  return dateTime.value
}

const strSplice = (Y, M, D, HMS, timeZone) => {
  const dateTime = ref('')
  if (timeZone > 0) {
    // Greater than 0 is the east area
    dateTime.value = Y + '-' + M + '-' + D + 'T' + HMS + '+' + compareWithTen(timeZone) + ':00'
  } else {
    // Less than 0 is the West area
    dateTime.value = Y + '-' + M + '-' + D + 'T' + HMS + compareWithTen(timeZone) + ':00'
  }
  return dateTime.value
}

// compare With Ten
const compareWithTen = (num) => {
  if (num >= 0) {
    if (num < 10) {
      return '0' + num
    }
    return num
  } else {
    if (num > -10) {
      return '-0' + num.toString().substring(1, 2)
    }
    return num
  }
}

///formatter single date yyyy/mm/dd
export const dateFormatSingle = (date: Date, hmsFlag: Boolean) => {
  // year
  const Y = date.getFullYear().toString()
  // month
  const M = compareWithTen((date.getMonth() + 1).toString())
  // day
  const D = compareWithTen(date.getDate().toString())
  if (hmsFlag) {
    // hour
    const H = compareWithTen(date.getHours().toString())
    // minute
    const MM = compareWithTen(date.getMinutes().toString())
    // second
    const S = compareWithTen(date.getSeconds().toString())
    return Y + '/' + M + '/' + D + ' ' + H + ':' + MM + ':' + S
  } else {
    return Y + '/' + M + '/' + D
  }
}

///formatter single date yyyymmdd
export const dateFormatDateToNumber = (date: Date, hmsFlag: Boolean) => {
  // year
  const Y = date.getFullYear().toString()
  // month
  const M = compareWithTen((date.getMonth() + 1).toString())
  // day
  const D = compareWithTen(date.getDate().toString())
  if (hmsFlag) {
    // hour
    const H = compareWithTen(date.getHours().toString())
    // minute
    const MM = compareWithTen(date.getMinutes().toString())
    // second
    const S = compareWithTen(date.getSeconds().toString())
    return Y + M + D + H + MM + S
  } else {
    return Y + M + D
  }
}

// get now month days
export const getMonthDays = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = new Date(year, month, 0)
  return day.getDate()
}
