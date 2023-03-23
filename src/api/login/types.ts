export type UserLoginType = {
  username: string
  password: string
}

export type UserType = {
  username: string
  userDisplayName: string
  password: string
  role: string
  roleType: string
  permissions: string | string[]
}
