import apiList from '../apiList'
import request from '@/config/axios'

export const getTableListApi = async (params: any): Promise<IResponse> => {
  return request.get({ url: apiList.money.page, params })
}

export const delTableListApi = (ids: string[] | number[]): Promise<IResponse> => {
  return request.post({ url: apiList.money.delAll, data: { ids } })
}
