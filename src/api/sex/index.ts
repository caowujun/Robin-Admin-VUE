import apiList from '../apiList'
import request from '@/config/axios'
import { Sex } from '../types'

export const getTableListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: apiList.sex.page, params })
}

export const delTableListApi = (ids: string[] | number[]): Promise<IResponse> => {
  return request.post({ url: apiList.sex.delAll, data: { ids } })
}

export const saveApi = (data: Partial<Sex>): Promise<IResponse> => {
  return request.post({ url: apiList.sex.save, data })
}

export const getApi = (id: string): Promise<IResponse<Sex>> => {
  return request.get({ url: apiList.sex.detail, params: { id } })
}

export const chartApi = (date: string): Promise<IResponse<Sex>> => {
  return request.get({ url: apiList.sex.chart, params: { date } })
}
