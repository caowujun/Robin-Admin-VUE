import apiList from '../apiList'
import request from '@/config/axios'
import { User, ChangeUseInfo, ChangeUserPassword } from '../types'

export const getTableListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: apiList.user.page, params })
}

export const delTableListApi = (ids: string[] | number[]): Promise<IResponse> => {
  return request.post({ url: apiList.user.delAll, data: { ids } })
}

export const saveApi = (data: Partial<User>): Promise<IResponse> => {
  return request.post({ url: apiList.user.save, data })
}

export const getApi = (id: string): Promise<IResponse<User>> => {
  return request.get({ url: apiList.user.detail, params: { id } })
}

export const changeUserInfoApi = (data: Partial<ChangeUseInfo>): Promise<IResponse> => {
  return request.post({ url: apiList.user.save, data })
}

export const changeUserPasswordApi = (data: Partial<ChangeUserPassword>): Promise<IResponse> => {
  return request.post({ url: apiList.user.save, data })
}
