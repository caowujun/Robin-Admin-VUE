const routes = new Map([
  ['/home/index', '1,2'],

  ['/personTools', '1,2'],
  ['/personTools/sex/index', '1,2'],
  ['/personTools/sex/add/index', '1,2'],
  ['/personTools/sex/edit/index', '1,2'],

  ['/personTools/schedule/index', '1,2'],
  ['/personTools/schedule/add/index', '1,2'],
  ['/personTools/schedule/edit/index', '1,2'],

  ['/personTools/income/index', '1,2'],
  ['/personTools/income/add/index', '1,2'],
  ['/personTools/income/edit/index', '1,2'],

  ['/personTools/gasoline/index', '1,2'],
  ['/personTools/gasoline/add/index', '1,2'],
  ['/personTools/gasoline/edit/index', '1,2'],

  ['/personTools/article/index', '1,2'],
  ['/personTools/article/add/index', '1,2'],
  ['/personTools/article/edit/index', '1,2'],

  ['/sysSetting', '1'],
  ['/sysSetting/user/index', '1'],
  ['/sysSetting/user/add/index', '1'],
  ['/sysSetting/user/edit/index', '1'],

  ['/sysSetting/role/index', '1'],
  ['/sysSetting/role/add/index', '1'],
  ['/sysSetting/role/edit/index', '1'],

  ['/sysSetting/enumType/index', '1'],
  ['/sysSetting/enumType/add/index', '1'],
  ['/sysSetting/enumType/edit/index', '1'],

  ['/sysSetting/cityCode/index', '1'],
  ['/sysSetting/cityCode/add/index', '1'],
  ['/sysSetting/cityCode/edit/index', '1'],

  ['/log', '1'],
  ['/log/sysLog/index', '1'],
  ['/log/operateLog/index', '1'],
  ['/modifyUserInfo/index', '1,2'],
  ['/modifyPassword/index', '1,2']
])

const filterRouter = (role: string): Array<string> => {
  const res: string[] = []
  for (const [key, value] of routes) {
    if (value.includes(role)) {
      res.push(key)
    }
  }
  return res
}

export default filterRouter
