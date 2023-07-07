export type battle = {
  id: string
  recordDate: string
  battleNumber: number
  notes: string
}
export type Money = {
  id: string
  amount: number
  recordDate: string
  category: string
  notes: string
}
export type Gasoline = {
  id: string
  amount: number
  litre: number
  unitPrice: number
  kilometers: number
  isFillUp: number
  recordDate: string
}
export type User = {
  id: string
  username: number
  userDisplayName: number
  password: string
  role: string
  roleType: number
  address: string
  email: string
  phone: string
  notes: string
  // recordDate: string
  cityCode: string
}
export type Role = {
  id: string
  // recordDate: string
  roleName: string
  roleType: number
  notes: string
}

export type EnumType = {
  id: string
  enumName: string
  enumType: string
  enumValue: number
  enumLanguage: string
  notes: string
}

export type ChangeUserPassword = {
  id: string
  currentPassword: number
  newPassword: number
  newPasswordAgain: number
}

export type ChangeUseInfo = {
  id: string
  // username: number
  userDisplayName: number
  // password: number
  // role: number
  roleType: number
  address: number
  email: number
  phone: number
  notes: number
  cityCode: string

  // recordDate: string
}
export type Article = {
  id: string
  articleType: number
  articleName: string
  articleUrl: string
  notes: string
}
export type Schedule = {
  id: string
  scheduleStartDate: number
  scheduleEndDate: string
  notes: string
}
export type CityCode = {
  code: string
  city: number
  areaSecond: string
  areaFirst: string
}
