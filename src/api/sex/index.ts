import apiList from '../apiList'
import request from '@/config/axios'
import { battle } from '../types'

export const getTableListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: apiList.battle.page, params })
}

export const delTableListApi = (ids: string[] | number[]): Promise<IResponse> => {
  return request.post({ url: apiList.battle.delAll, data: { ids } })
}

export const saveApi = (data: Partial<battle>): Promise<IResponse> => {
  return request.post({ url: apiList.battle.save, data })
}

export const getApi = (id: string): Promise<IResponse<battle>> => {
  return request.get({ url: apiList.battle.detail, params: { id } })
}

export const chartApi = (date: string): Promise<IResponse<battle>> => {
  return request.get({ url: apiList.battle.chart, params: { date } })
}
