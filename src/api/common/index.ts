import request from '@/config/axios'
import apiList from '../apiList'
import { EnumType } from '../types'

// 获取所有字典
export const getDictApi = (): Promise<IResponse> => {
  return request.get({ url: '/dict/list' })
}

// 模拟获取某个字典
export const getDictOneApi = async (enumType: string): Promise<IResponse> => {
  return request.get({ url: '/dict/one/' + enumType })
}

export const getTableListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: apiList.enumType.page, params })
}

export const delTableListApi = (ids: string[] | number[]): Promise<IResponse> => {
  return request.post({ url: apiList.enumType.delAll, data: { ids } })
}
export const getEnumType = (): Promise<IResponse> => {
  return request.get({ url: apiList.enumType.typeList })
}

export const saveApi = (data: Partial<EnumType>): Promise<IResponse> => {
  return request.post({ url: apiList.enumType.save, data })
}

export const getApi = (id: string): Promise<IResponse<EnumType>> => {
  return request.get({ url: apiList.enumType.detail, params: { id } })
}
