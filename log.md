## 1.无法加载文件 F:\nodejs\node_global\pnpm.ps1，因为在此系统上禁止运行脚本

使用管理员权限打开 powershell，执行

```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```

## 安装 icon

```bash
pnpm install @element-plus/icons-vue
```
