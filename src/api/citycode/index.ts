import apiList from '../apiList'
import request from '@/config/axios'
import { CityCode } from '../types'

export const getTableListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: apiList.citycode.page, params })
}

export const delTableListApi = (ids: string[] | number[]): Promise<IResponse> => {
  return request.post({ url: apiList.citycode.delAll, data: { ids } })
}

export const saveApi = (data: Partial<CityCode>): Promise<IResponse> => {
  return request.post({ url: apiList.citycode.save, data })
}

export const getApi = (id: string): Promise<IResponse<CityCode>> => {
  return request.get({ url: apiList.citycode.detail, params: { id } })
}
export const getByCodeApi = (code: string): Promise<IResponse<CityCode>> => {
  return request.get({ url: apiList.citycode.byCode, params: { code } })
}
// 模拟获取某个字典
export const getCityCodeApi = async (city: string): Promise<IResponse> => {
  return request.get({ url: apiList.citycode.filter, params: { city } })
}
