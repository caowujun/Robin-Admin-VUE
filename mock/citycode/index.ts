import { config } from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'
import { toAnyString } from '@/utils'
import Mock from 'mockjs'

const { result_code } = config

const timeout = 1000

const count = 11

let List: {
  id: string
  city: string
  code: string
  areaSecond: string
  areaFirst: string
}[] = []

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: toAnyString(),
      city: toAnyString(),
      code: 'test' + i,
      areaSecond: (i % 4) + 1,
      areaFirst: 'test' + i
    })
  )
}
List.push(
  Mock.mock({
    id: '101120601',
    city: '潍坊',
    code: '101120601',
    areaSecond: '潍坊',
    areaFirst: '山东'
  })
)
List.push(
  Mock.mock({
    id: '101010100',
    city: '北京',
    code: '101010100',
    areaSecond: '北京',
    areaFirst: '北京'
  })
)
export default [
  // 列表接口
  {
    url: '/citycode/page',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { pageIndex, pageSize, city } = query
      const mockList = List.filter((item) => {
        return city ? item.city?.indexOf(city) > -1 : true
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
    url: '/citycode/filter',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { city } = query
      const mockList = List.filter((item) => {
        return city ? item.city?.indexOf(city) > -1 : true
      })

      return mockList
    }
  },
  // 保存接口
  {
    url: '/citycode/save',
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
    url: '/citycode/detail',
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
  // 详情接口
  {
    url: '/citycode/byCode',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { code } = query
      for (const example of List) {
        if (example.code === code) {
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
    url: '/citycode/delete',
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
