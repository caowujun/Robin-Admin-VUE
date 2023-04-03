import apiList from '../apiList'
import request from '@/config/axios'
import { Schedule } from '../types'

export const getTableListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: apiList.schedule.page, params })
}

export const delTableListApi = (ids: string[] | number[]): Promise<IResponse> => {
  return request.post({ url: apiList.schedule.delAll, data: { ids } })
}

export const saveApi = (data: Partial<Schedule>): Promise<IResponse> => {
  return request.post({ url: apiList.schedule.save, data })
}

export const getApi = (id: string): Promise<IResponse<Schedule>> => {
  return request.get({ url: apiList.schedule.detail, params: { id } })
}
