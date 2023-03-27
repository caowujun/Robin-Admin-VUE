import { config } from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'
import { toAnyString } from '@/utils'
import Mock from 'mockjs'
// import { random } from 'lodash-es'

const { result_code } = config

const timeout = 1000

const count = 91

const sysLogList: {
  id: string
  username: string
  exceptionType: string
  recordDate: string
  exceptionMsg: string
}[] = []
const operationLogList: {
  id: string
  username: string
  actionType: string
  recordDate: string
  actionText: string
}[] = []
for (let i = 0; i < count; i++) {
  sysLogList.push(
    Mock.mock({
      id: toAnyString(),
      recordDate: '@datetime',
      exceptionType: 'nullpoint',
      username: i % 2 == 0 ? 'admin' : 'normal',
      exceptionMsg: 'test'
    })
  )
}
for (let i = 0; i < count; i++) {
  operationLogList.push(
    Mock.mock({
      id: toAnyString(),
      recordDate: '@datetime',
      actionType: i % 2 == 0 ? 'add' : 'insert',
      username: i % 2 == 0 ? 'admin' : 'normal',
      actionText: 'insert into test'
    })
  )
}
export default [
  // 列表接口
  {
    url: '/log/sysLog/Page',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { exceptionMsg, pageIndex, pageSize } = query

      const mockList = sysLogList.filter((item) => {
        return exceptionMsg ? (item.exceptionMsg.indexOf(exceptionMsg) > 0 ? true : false) : true
      })

      const pageList = mockList.filter(
        (_, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1)
      )
      return {
        code: result_code,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },
  // 列表接口
  {
    url: '/log/operationLog/Page',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { actionText, pageIndex, pageSize } = query

      const mockList = operationLogList.filter((item) => {
        return actionText ? (item.actionText.indexOf(actionText) > 0 ? true : false) : true
      })

      const pageList = mockList.filter(
        (_, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1)
      )
      return {
        code: result_code,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  }
  //   // 详情接口
  //   {
  //     url: '/money/getById',
  //     method: 'get',
  //     response: ({ query }) => {
  //       const { id } = query
  //       for (const example of List) {
  //         if (example.id === id) {
  //           return {
  //             code: result_code,
  //             data: example
  //           }
  //         }
  //       }
  //     }
  //   }
] as MockMethod[]
