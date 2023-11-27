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