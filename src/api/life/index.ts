import apiList from '../apiList'
import request from '@/config/axios'

export const getTableListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: apiList.life.page, params })
}

export const delTableListApi = (ids: string[] | number[]): Promise<IResponse> => {
  return request.post({ url: apiList.life.delAll, data: { ids } })
}

// export const getTableListApi = (params: any): Promise<IResponse> => {
//   return request.get({ url: '/example/list', params })
// }

// export const saveTableApi = (data: Partial<TableData>): Promise<IResponse> => {
//   return request.post({ url: '/example/save', data })
// }

// export const getTableDetApi = (id: string): Promise<IResponse<TableData>> => {
//   return request.get({ url: '/example/detail', params: { id } })
// }

// export const delTableListApi = (ids: string[] | number[]): Promise<IResponse> => {
//   return request.post({ url: '/example/delete', data: { ids } })
// }
