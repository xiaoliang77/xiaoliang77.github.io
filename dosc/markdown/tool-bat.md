# 系统类工具
### 电脑历史WiFi密码查看 [下载](./tool/wifi-password.bat)
```bash
@echo off
title 以下为本机所连接过WIFI信息及密码
echo  **************************************************************
for /f "tokens=3*" %%i in ('netsh wlan show profiles ^| findstr "所有用户配置文件"') do (
    call :GetPass %%i %%j
)
pause>nul
goto :eof
:GetPass
echo WiFi : %*
for /f "delims=" %%a in ('netsh wlan show profile name^="%*" key^=clear ^| findstr "关键内容"') do (
    echo %%a
)
echo  --------------------------------------------------------------
goto :eof
```

### 清理dns缓存 [下载](./tool/清理DNS缓存.bat)
```bash
@echo off

ipconfig /flushdns

  echo ~~~------~~~~~

  echo 已经清空DNS缓存，失败请用管理员身份再运行一次哦

  pause
```
