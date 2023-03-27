import { config } from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'
import { toAnyString } from '@/utils'

const { result_code } = config

const timeout = 1000

let dictObj: Recordable = {
  importance: [
    {
      value: 0,
      label: 'tableDemo.commonly'
    },
    {
      value: 1,
      label: 'tableDemo.good'
    },
    {
      value: 2,
      label: 'tableDemo.important'
    }
  ],
  cityCode: [
    {
      value: '101120601',
      label: '潍坊'
    },
    {
      value: '101010100',
      label: '北京'
    }
  ]
}

let List: {
  id: string
  enumType: string
  enumName: string
  enumValue: string
  enumLanguage: string
}[] = [
  {
    id: '1',
    enumType: 'ROLETYPE',
    enumName: '管理员',
    enumValue: '1',
    enumLanguage: 'app_user.adminUser'
  },
  {
    id: '2',
    enumType: 'ROLETYPE',
    enumName: '一般用户',
    enumValue: '2',
    enumLanguage: 'app_user.normalUser'
  },
  {
    id: '3',
    enumType: 'INCOME',
    enumName: '收入',
    enumValue: '1',
    enumLanguage: 'app_money.expenditure'
  },
  {
    id: '4',
    enumType: 'INCOME',
    enumName: '支出',
    enumValue: '0',
    enumLanguage: 'app_money.income'
  }
  // {
  //   id: '5',
  //   enumType: 'CITYCODE',
  //   enumName: '潍坊',
  //   enumValue: '101120601',
  //   enumLanguage: '管理者'
  // },
  // {
  //   id: '6',
  //   enumType: 'CITYCODE',
  //   enumName: '北京',
  //   enumValue: '101010100',
  //   enumLanguage: '北京'
  // }
]

interface tagObj {
  [key: string]: any
}
const dbdics: tagObj = {}

export default [
  // 获取枚举type的接口
  {
    url: '/enum/type',
    method: 'get',
    response: () => {
      const enumTypes = Array.from(
        new Set(
          List.map((f) => {
            return f.enumType
          })
        )
      )
      return enumTypes
    }
  },
  // 列表接口
  {
    url: '/enum/page',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { pageIndex, pageSize, enumType } = query
      const mockList = List.filter((item) => {
        const result1 = enumType && enumType != '' ? item.enumType === enumType : true
        // const result2 = enumName && enumName != '' ? item.enumName.indexOf(enumName) > 0 : true

        return result1 //&& result2
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
    url: '/enum/save',
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
    url: '/enum/detail',
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
    url: '/enum/delete',
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
  // 字典接口
  {
    url: '/dict/list',
    method: 'get',
    timeout,
    response: () => {
      const enumTypes = Array.from(
        new Set(
          List.map((f) => {
            return f.enumType
          })
        )
      )
      enumTypes.forEach((item) => {
        dbdics[item] = List.filter((f) => f.enumType === item).map((g) => {
          return {
            value: g.enumValue,
            label: g.enumName
          }
        })
      })
      dictObj = { ...dictObj, ...dbdics }
      return {
        code: result_code,
        data: dictObj
      }
    }
  },
  // 获取某个字典
  {
    url: '/dict/one',
    method: 'get',
    timeout,
    response: (enumType: string) => {
      return {
        code: result_code,
        data: List.filter((f) => f.enumType === enumType).map((item) => {
          return {
            value: item.enumValue,
            label: item.enumName
          }
        })
      }
    }
  }
] as MockMethod[]
