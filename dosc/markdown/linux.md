# Linux 操作指令 [GitHub](https://github.com/liangziai77/liangziai77.github.io/blob/master/dosc/markdown/telegram.md)

### 文件管理
命令|用途|例子
----|----|----
touch     |创建文件     |touch /home/file.txt   
mkdir     |创建目录     |
mkdir -p  |连续创建目录 |mkdir -p /a/b/c
cp        |拷贝文件     |cp -ap 复制所有 目标路径
cp -r     |拷贝文件夹   |
mv        |移动         |
rm -rf    |强制删除     |慎用
cat       |查看文件内容 |
vim       |编辑文件     |:w保存，:q退出，:wq保存并退出，:wq!退出不保存
--help    |帮助         |vim --help 查看vim都可以怎么使用


### 用户管理
命令|解释
----|----
/etc/passwd                      |用户密码配置
useradd  user01                  |创建一个名为user01的用户
id  user01                       |查询user01用户信息
passwd  user01                   |修改user01密码
userdel -r  user01               |删除user01用户（-r 连家目录一块删）
usermod -s /sbin/nologin user01  |修改user01用户消息（nologin封账号，不让登入）
groupadd yayaya                  |创建组yayaya
cat /etc/group                   |查看组
grep yayaya   /etc/group         |搜索/etc/group 里面有没有yayaya
groupadd z1 -g 2000              |添加组z1，并指定gid 2000
groupdel z1                      |删除组z1




```Bash
touch       //创建文件     |touch /home/file.txt
touch 111
```
