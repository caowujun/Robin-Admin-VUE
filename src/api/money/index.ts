import apiList from '../apiList'
import request from '@/config/axios'
import { Money } from '../types'

export const getTableListApi = async (params: any): Promise<IResponse> => {
  return request.get({ url: apiList.money.page, params })
}

export const delTableListApi = (ids: string[] | number[]): Promise<IResponse> => {
  return request.post({ url: apiList.money.delAll, data: { ids } })
}

export const saveMoneyApi = (data: Partial<Money>): Promise<IResponse> => {
  return request.post({ url: apiList.money.save, data })
}

export const getMoneyApi = (id: string): Promise<IResponse<Money>> => {
  return request.get({ url: apiList.money.detail, params: { id } })
}
