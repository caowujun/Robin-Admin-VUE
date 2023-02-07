const routes = new Map([
  ['/home/index', '1,2'],
  ['/personTools', '1,2'],
  ['/personTools/life/index', '1,2'],
  ['/personTools/schedule/index', '1,2'],
  ['/personTools/income/index', '1,2'],
  ['/personTools/income/add/index', '1,2'],
  ['/personTools/income/edit/index', '1,2'],
  ['/personTools/gasoline/index', '1,2'],

  ['/sysSetting', '1'],
  ['/sysSetting/user/index', '1'],
  ['/sysSetting/role/index', '1'],
  ['/sysSetting/menu/index', '1'],
  ['/sysSetting/enum/index', '1'],

  ['/log/index', '1']
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
