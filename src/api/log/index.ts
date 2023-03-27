import apiList from '../apiList'
import request from '@/config/axios'

export const getSysLogTableListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: apiList.log.sysLogPage, params })
}

export const getOperationLogTableListApi = (params: any): Promise<IResponse> => {
  return request.get({ url: apiList.log.operationLogPage, params })
}
