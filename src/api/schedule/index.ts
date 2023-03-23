import apiList from '../apiList'
import request from '@/config/axios'

export const getTableListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: apiList.schedule.page, params })
}

export const delTableListApi = (ids: string[] | number[]): Promise<IResponse> => {
  return request.post({ url: apiList.schedule.delAll, data: { ids } })
}
