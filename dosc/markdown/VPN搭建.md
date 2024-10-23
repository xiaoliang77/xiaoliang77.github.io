# vpn搭建
## 解决GitHub国内服务器连接慢点问题

这种方案的原理就是：原理：绕过 DNS 解析，直接使用本地的 DNS 记录进行直接跳转。  
可以通过 http://ping.chinaz.com/ 链接查询github的DNS信息  
例如：  
可以直接打开 http://ping.chinaz.com/github.com 链接查看github。  
可以直接打开 http://ping.chinaz.com/raw.githubusercontent.com 链接查看github。  

## 修改服务器hosts
```bash
sudo vi /etc/hosts
```

添加以下内容
```sh
20.205.243.166 github.com
140.82.121.3 github.com
```
> :wq  保存退出后


---
## 安装BBR 加速器(如果不安装直接执行第5-6步)
1-4是安装BBR 加速器部分 5-6 是酸酸乳部分
```sh
1：sudo -i
```
(最前面显示root@xxxx)
```sh
2：wget -N --no-check-certificate https://raw.githubusercontent.com/FunctionClub/YankeeBBR/master/bbr.sh && bash bbr.sh install
```
蓝底窗口按TAB键选NO

选择重启 Y 

这里会断开连接，大家可以关掉窗口再重新打开或几秒钟后在界面随便按几个字母 便会提示重新连接。
```sh
3：sudo -i
```
(最前面显示root@xxxx)
```sh
4：bash bbr.sh start
```
```sh
5：wget --no-check-certificate https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocksR.sh && chmod +x shadowsocksR.sh
```
```sh
6：./shadowsocksR.sh
```

输入shadowsocks 密码

输入端口号

其他一路回车（也可自行选择混淆 协议）

在最后出现红底数据以后完成

----

# 搭建 x-ui 面板

一键安装脚本
```Bash
bash <(curl -Ls https://raw.githubusercontent.com/vaxilu/x-ui/master/install.sh)
```
国内机器一键脚本
```Bash
bash <(curl -Ls http://www.xkig.cn/xui/install.sh)
```

只需要几秒钟，就会提示：出于安全考虑，安装/更新完成后需要强制修改端口与账户密码。

这里直接输入 “y”，回车，具体可以看右侧的我的设置：用户名（admin）、密码（admin123456）、端口（8377）

x-ui 面板支持这些协议：vmess、vless、trojan、shadowsocks、dokodemo-door、socks、http。所以我们可以按照自己的喜好和需求继续部署。