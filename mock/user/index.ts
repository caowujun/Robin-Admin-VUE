import { config } from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'
import { toAnyString } from '@/utils'
const { result_code } = config

const timeout = 1000

let List: {
  id: string
  username: string
  userDisplayName: string
  password: string
  role: string
  roleType: string
  cityCode: string
  address: string
  email: string
  phone: string
  createDate: string
  notes: string
  // permissions: string | string[]
}[] = [
  {
    id: '1',
    username: 'admin',
    userDisplayName: '管理员',
    password: 'admin',
    role: 'admin',
    roleType: '1',
    cityCode: '101120601',
    address: '中国潍坊',
    email: 'test@163.com',
    phone: '13333333333',
    createDate: '@datetime',
    notes: '测试管理员'
    // permissions: ['*.*.*']
  },
  {
    id: '2',
    username: 'test',
    userDisplayName: '普通用户',
    password: 'test',
    role: 'test',
    roleType: '2',
    cityCode: '101120601',
    address: '中国北京',
    email: 'test123@163.com',
    phone: '13111111111',
    createDate: '@datetime',
    notes: '测试普通用户'
    // permissions: ['example:dialog:create', 'example:dialog:delete']
  }
]

export default [
  // 列表接口
  {
    url: '/user/page',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { pageIndex, pageSize, username, userDisplayName } = query

      const mockList = List.filter((item) => {
        const result1 = username && username != '' ? item.username.indexOf(username) > 0 : true
        const result2 =
          userDisplayName && userDisplayName != ''
            ? item.userDisplayName.indexOf(userDisplayName) > 0
            : true
        return result1 && result2
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
    url: '/user/save',
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
    url: '/user/detail',
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
    url: '/user/delete',
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
  },
  // 列表接口
  {
    url: '/user/list',
    method: 'get',
    response: ({ query }) => {
      const { username } = query

      const mockList = List.filter((item) => {
        if (username && item.username.indexOf(username) < 0) return false
        return true
      })

      return mockList
    }
  },
  // 登录接口
  {
    url: '/user/login',
    method: 'post',
    timeout,
    response: ({ body }) => {
      const data = body
      let hasUser = false
      for (const user of List) {
        if (user.username === data.username && user.password === data.password) {
          hasUser = true
          return {
            code: result_code,
            data: user
          }
        }
      }
      if (!hasUser) {
        return {
          code: '500',
          message: '账号或密码错误'
        }
      }
    }
  },
  // 退出接口
  {
    url: '/user/loginOut',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: result_code,
        data: null
      }
    }
  }
] as MockMethod[]
