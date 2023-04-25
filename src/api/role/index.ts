import apiList from '../apiList'
import request from '@/config/axios'
import { Role } from '../types'

export const getTableListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: apiList.role.page, params })
}

export const delTableListApi = (ids: string[] | number[]): Promise<IResponse> => {
  return request.post({ url: apiList.role.delAll, data: { ids } })
}

export const saveApi = (data: Partial<Role>): Promise<IResponse> => {
  return request.post({ url: apiList.role.save, data })
}

export const getApi = (id: string): Promise<IResponse<Role>> => {
  return request.get({ url: apiList.role.detail, params: { id } })
}

export const getListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: apiList.role.list, params })
}
