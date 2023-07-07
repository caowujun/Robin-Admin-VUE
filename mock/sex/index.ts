import { config } from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'
import { toAnyString } from '@/utils'
import Mock from 'mockjs'

const { result_code } = config

const timeout = 1000

// const count = 100

let List: {
  id: string
  recordDate: string
  battleNumber: number
  notes: string
}[] = []
List.push(
  Mock.mock({
    id: toAnyString(),
    recordDate: '2023-05-02',
    battleNumber: 1,
    notes: 'test'
  })
)
List.push(
  Mock.mock({
    id: toAnyString(),
    recordDate: '2023-05-05',
    battleNumber: 1,
    notes: 'test'
  })
)

// for (let i = 0; i < count; i++) {
//   List.push(
//     Mock.mock({
//       id: toAnyString(),
//       recordDate: '@datetime',
//       battleNumber: i,
//       notes: 'test' + i
//     })
//   )
// }

export default [
  // 列表接口
  {
    url: '/battle/page',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { pageIndex, pageSize, startBattleTime, endBattleTime } = query

      const mockList = List.filter((item) => {
        if (startBattleTime && startBattleTime != '')
          return item.recordDate > startBattleTime && item.recordDate < endBattleTime
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
    url: '/battle/save',
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
    url: '/battle/detail',
    method: 'get',
    timeout,
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
    url: '/battle/delete',
    method: 'post',
    timeout,
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
  },
  // 列表接口
  {
    url: '/battle/chart',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: result_code,
        data: [
          { value: 13253, name: 'analysis.monday' },
          { value: 34235, name: 'analysis.tuesday' },
          { value: 26321, name: 'analysis.wednesday' },
          { value: 12340, name: 'analysis.thursday' },
          { value: 24643, name: 'analysis.friday' },
          { value: 1322, name: 'analysis.saturday' },
          { value: 1324, name: 'analysis.sunday' }
        ]
      }
    }
  }
] as MockMethod[]
