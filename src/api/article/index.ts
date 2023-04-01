import apiList from '../apiList'
import request from '@/config/axios'
import { Article } from '../types'

export const getTableListApi = async (params: any): Promise<IResponse> => {
  return request.get({ url: apiList.article.page, params })
}

export const delTableListApi = (ids: string[] | number[]): Promise<IResponse> => {
  return request.post({ url: apiList.article.delAll, data: { ids } })
}

export const saveApi = (data: Partial<Article>): Promise<IResponse> => {
  return request.post({ url: apiList.article.save, data })
}

export const getApi = (id: string): Promise<IResponse<Article>> => {
  return request.get({ url: apiList.article.detail, params: { id } })
}
