import { config } from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'
import { toAnyString } from '@/utils'
import Mock from 'mockjs'

const { result_code } = config

const timeout = 1000

const count = 100

let List: {
  id: string
  startTimeText: string
  endTimeText: string
  notes: string
}[] = []

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: toAnyString(),
      startTimeText: '@datetime',
      endTimeText: '@datetime',
      notes: i
    })
  )
}

export default [
  // 列表接口
  {
    url: '/schedule/page',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { pageIndex, pageSize, startTimeText, endTimeText } = query
      console.log('schedule/page', startTimeText, endTimeText)

      const mockList = List.filter((item) => {
        if (startTimeText && startTimeText != '')
          return (
            (item.startTimeText > startTimeText && item.endTimeText < endTimeText) ||
            (item.startTimeText > startTimeText && item.startTimeText < endTimeText) ||
            (item.endTimeText > startTimeText && item.endTimeText < endTimeText)
          )
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
    url: '/schedule/save',
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
    url: '/schedule/detail',
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
    url: '/schedule/delete',
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