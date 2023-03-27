import apiList from '../apiList'
import request from '@/config/axios'
import { Gasoline } from '../types'

export const getTableListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: apiList.gasoline.page, params })
}

export const delTableListApi = (ids: string[] | number[]): Promise<IResponse> => {
  return request.post({ url: apiList.gasoline.delAll, data: { ids } })
}

export const saveGasolineApi = (data: Partial<Gasoline>): Promise<IResponse> => {
  return request.post({ url: apiList.gasoline.save, data })
}

export const getGasolineApi = (id: string): Promise<IResponse<Gasoline>> => {
  return request.get({ url: apiList.gasoline.detail, params: { id } })
}
