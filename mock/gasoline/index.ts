import { config } from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'
import { toAnyString } from '@/utils'
import Mock from 'mockjs'

const { result_code } = config

const timeout = 1000

const count = 2

let List: {
  id: string
  recordDate: string
  amount: number
  litre: number
  isFillUp: number
  kilometers: number
  notes: string
}[] = []

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: toAnyString(),
      recordDate: '@datetime',
      amount: 100,
      litre: 33,
      isFillUp: i % 2,
      kilometers: 333,
      notes: 'test' + i
    })
  )
}

export default [
  // 列表接口
  {
    url: '/gasoline/page',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { pageIndex, pageSize, startTimeText, endTimeText } = query
      const mockList = List.filter((item) => {
        if (startTimeText && startTimeText != '')
          return item.recordDate > startTimeText && item.recordDate < endTimeText
        else return true
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
  // 保存接口
  {
    url: '/gasoline/save',
    method: 'post',
    timeout,
    response: ({ body }) => {
      if (!body.id) {
        List = [
          Object.assign(body, {
            id: toAnyString()
          })
        ].concat(List)
        return {
          code: result_code,
          data: 'success'
        }
      } else {
        List.map((item) => {
          if (item.id === body.id) {
            for (const key in item) {
              item[key] = body[key]
            }
          }
        })
        return {
          code: result_code,
          data: 'success'
        }
      }
    }
  },
  // 详情接口
  {
    url: '/gasoline/detail',
    method: 'get',
    response: ({ query }) => {
      const { id } = query
      for (const example of List) {
        if (example.id === id) {
          return {
            code: result_code,
            data: example
          }
        }
      }
    }
  },
  // 删除接口
  {
    url: '/gasoline/delete',
    method: 'post',
    response: ({ body }) => {
      const ids = body.ids
      if (!ids) {
        return {
          code: '500',
          message: '请选择需要删除的数据'
        }
      } else {
        let i = List.length
        while (i--) {
          if (ids.indexOf(List[i].id) !== -1) {
            List.splice(i, 1)
          }
        }
        return {
          code: result_code,
          data: 'success'
        }
      }
    }
  }
] as MockMethod[]
