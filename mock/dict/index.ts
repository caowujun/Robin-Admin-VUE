import { config } from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'

const { result_code } = config

const timeout = 1000

const dictObj: Recordable = {
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
  moneyCategory: [
    {
      value: 0,
      label: 'app_dic.income'
    },
    {
      value: 1,
      label: 'app_dic.expenditure'
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
  ],
  roleType: [
    {
      value: '1',
      label: '管理员'
    },
    {
      value: '2',
      label: '普通用户'
    }
  ]
}

export default [
  // 字典接口
  {
    url: '/dict/list',
    method: 'get',
    timeout,
    response: () => {
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
    response: () => {
      return {
        code: result_code,
        data: [
          {
            label: 'test1',
            value: 0
          },
          {
            label: 'test2',
            value: 1
          },
          {
            label: 'test3',
            value: 2
          }
        ]
      }
    }
  }
] as MockMethod[]
