import { config } from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'
import { toAnyString } from '@/utils'
import Mock from 'mockjs'
import { random } from 'lodash-es'

const { result_code } = config

const timeout = 1000

const count = 11

let List: {
  id: string
  amount: number
  recordDate: string
  // categoryTitle: string
  category: number
  notes: string
}[] = []

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: toAnyString(),
      recordDate: '@datetime',
      amount: random(1, 1000),
      category: i % 2,
      notes: 'test'
    })
  )
}

export default [
  // 列表接口
  {
    url: '/money/page',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { category, pageIndex, pageSize } = query

      const mockList = List.filter((item) => {
        return category
          ? Number.parseInt(item.category.toString()) == Number.parseInt(category.toString())
            ? true
            : false
          : true
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
    url: '/money/save',
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
    url: '/money/detail',
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
    url: '/money/delete',
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
  }
] as MockMethod[]
