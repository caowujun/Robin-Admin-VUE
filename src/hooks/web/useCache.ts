/**
 * 配置浏览器本地存储的方式，可直接存储对象数组。
 */

import WebStorageCache from 'web-storage-cache'

type CacheType = 'sessionStorage' | 'localStorage'

export const useCache = (type: CacheType = 'sessionStorage') => {
  const wsCache: WebStorageCache = new WebStorageCache({
    storage: type
  })

  return {
    wsCache
  }
}
//--------------------------------caowujun----------------------------------------------------
export const useCache_local = (type: CacheType = 'localStorage') => {
  const wsCache_local: WebStorageCache = new WebStorageCache({
    storage: type,
    exp: 60 * 60 * 24 * 30
  })

  return {
    wsCache_local
  }
}

export const cacheClear = () => {
  useCache().wsCache.clear()
  useCache_local().wsCache_local.clear()
}

export const getCache = (key: string): any => {
  return (
    useCache().wsCache.get(key) ??
    (useCache_local().wsCache_local.get('remember') === true
      ? useCache_local().wsCache_local.get(key)
      : null)
  )
}

export const updateCache = (key: string, value: any): any => {
  useCache().wsCache.replace(key, value)
  useCache_local().wsCache_local.replace(key, value)
}
