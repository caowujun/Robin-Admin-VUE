export type UserLoginType = {
  username: string
  password: string
}

export type UserType = {
  username: string
  userDisplayName: string
  password: string
  role: string
  roleId: string
  permissions: string | string[]
}
