## 1.无法加载文件 F:\nodejs\node_global\pnpm.ps1，因为在此系统上禁止运行脚本

使用管理员权限打开 powershell，执行

```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```

## 安装 icon

-g 全局安装,不在 mode_modules 目录下,不写入节点, npm install 时不下载该依赖。 -s 安装包会在 package.json 中的 dependencies 对象中。简称 dep。dep 是在生产环境中要用到的。 -d 安装包会在 package.json 中的 devDependencies 对象中，简称 dev。dev 是在开发中要用到的。

```bash
pnpm install element-plus
pnpm install @element-plus/icons-vue
pnpm install vue-router@4
pnpm install  eslint
pnpm install  prettier
```

## 1.9.8 的 package.json 文件更新了版本，但是更新后有个问题，多语言在页面显示不出来，所以回滚到了 1.9.7 的版本。
