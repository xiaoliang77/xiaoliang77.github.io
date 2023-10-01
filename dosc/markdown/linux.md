# Linux 操作指令 [GitHub](https://github.com/liangziai77/liangziai77.github.io/blob/master/dosc/markdown/linux.md)

### 文件管理
```Bash
touch /home/file.txt    		#创建文件名为 file的txt文件  
mkdir                   		#创建目录     
mkdir -p /a/b/c         		#连续创建目录
cp                      		#拷贝文件 cp -ap 复制所有 目标路径
cp -r                   		#拷贝文件夹   
mv                      		#移动         
rm -rf                  		#强制删除，慎用
cat                     		#查看文件内容 ，
vim                     		#编辑文件i 退出编辑Esc  :w保存，:q退出，:wq保存并退出，:wq!退出不保存
which ls                		#查找命令文件 which后面跟需要查找的命令
find /etc -iname "hos*" 		#查找文件 find[路径][选项][表达式]，在/etc 下查找名字带有hos的文件 -iname（i忽略大小写）
tar -cf etc.tar /etc    		#打包压缩 tar[选项][压缩包名称][源文件路径]
tar -xf etc.tar         		#解压文件包 tar[选项][包名称][路径](-C /tmp)解压到/tmp里面，不写路径则解压到当前目录 
tar -zcvf 1.tar.gz wj   		#gzip方式打包压缩,把wj目录打包为一个名1.tar.gz的包
tar -tf etc.tar                 #查看压缩包内文件不解压，t查看f文件
```


### 用户管理
```Bash
/etc/passwd                      #用户密码配置
useradd  user01                  #创建一个名为user01的用户
id  user01                       #查询user01用户信息
passwd  user01                   #修改user01密码
userdel -r  user01               #删除user01用户（-r 连家目录一块删）
usermod -s /sbin/nologin user01  #修改user01用户消息（nologin封账号，不让登入）
groupadd yayaya                  #创建组yayaya
cat /etc/group                   #查看组
grep yayaya   /etc/group         #搜索/etc/group 里面有没有yayaya
groupadd z1 -g 2000              #添加组z1，并指定gid 2000
groupdel z1                      #删除组z1
useradd user1 -G z2              #把用户user1添加到附加组z2
us - root                        #切换root身份(永久提权)
chmod a=rwx file1.txt            #给file1授权读/写/执行权限【语法：chmod 对象(u/g/o/a) 赋值符(+/-/=)授权类型(r/w/x)】
chown user01.z1 file1.txt        #设置file.txt文件的主人为user01和属组z1
chmod -R 777 /tmp/dir1           #给dir1目录包含文件夹下所有文件 授权777权限
gitfacl file1.txt                #查看file1的详细授权
setfacl -m u:user1:r file1.txt   #设置用户user1对file1.txt读的权限
setfacl -x u:user1 file1.txt     #删除用户user1的acl权限
setfacl -b file1.txt             #删除所有acl权限
chattr +i file1.txt              #给文件加锁（-i去掉锁）锁后无法操作，无法删除

whoami                           #查看当前账号
```


### 进程管理
```Bash
ps aux                          #查看所有进程
nice -n -5 sleep 7000 &         #给程序设置进程优先级为-5，&后台
renice -20 2669                 #给pid 2669的进程修改优先级为-20
ps aux |grep sleep              #查看搜索sleep名称的进程
jobs                            #查看后台运行程序
kill %4                         #将进程id为4的结束掉，%为后台，不加%则为 终止pid为4的进程。
cat /proc/cpuinfo               #查看cup硬件信息
cat /proc/meminfo               #查看内存信息
```


### 重定向/管道
```Bash
date > 1.txt                    #将时间输出到1.txt文件中（重定向>覆盖）
date >> 1.txt                   #将时间追加到1.txt文件中（重定向>>追加）

cat /etc/passwd |grep "root"	#|管道，将左边的输出转到|右边输入，（查看root的密码信息）
```


### 存储管理
```Bash
lsblk                               #列出磁盘信息
fdisk /dev/sdb                      #启动分区工具（n分区 -> p扇区 -> +2G指定分区大小 -> w保存分区信息,d删除分区）
partprobe /dev/sdb                  #刷新分区表
fdisk -l /dev/sdb                   #查看磁盘分区信息
mkfs.ext4 /dev/sdb1                 #创建文件系统（格式化）
mkdir /mnt/disk1                    #创建一个文件夹给来挂载磁盘分区
mount -t ext4 /dev/sdb1 /mnt/disk1  #临时手动将sdb1分区挂载到disk1目录（系统重启挂载就消失了）
df -hT                              #查看挂载信息
vim /etc/fstab                      #系统启动时加载的文件（手动将磁盘挂载写入文件中，在最后一行，/dev/sdb1 /mnt/disk1 ext4 defaults 0 0）
mount -a                            #立刻挂载命令

pvcreate /dev/sdc                   #将物理磁盘转换成物理卷
pvscan                              #扫描已有的逻辑卷（略写pvs）查看VG空间
vgcreate vg1 /dev/sdc               #创建卷组，并添加物理卷（组名：vg1，成员/dev/sdc）
lvcreate -L 500M -n lv1 vg1         #创建逻辑卷500m 卷名：lv1，添加到vg1组
lvextend -L +500M /dev/vg1/lv1      #给逻辑卷扩容，扩容后需要刷新
resize2fs /dev/vg1/lv1              #刷新逻辑卷磁盘
vgextend vg1 /dev/ssd               #扩容vg，将ssd磁盘加入vg1卷组

free -m                             #查看当前交换分区(-m单位/G)

ln -s /root/file1.txt /111          #软连接（将源文件file1.txt生成一个根下的111软连接，如Windows的快捷方式）
```

### 软件管理
```Bash
yum -y install httsd            #安装软件包httsd，-y 自动确认
yum -y remove httpd             #卸载程序 httpd
yum -y update httpd             #更新httpd程序
yum list httpd                  #查看httpd安装信息
yum provides ifconfig           #查找yum仓库包含ifconfig关键字的包名
mv /etc/yum.repos.d/* /tmp/     #将yum官方源配置移动到/tmp/目录下
yum repolist                    #查看yum源有提供多少个软件包
yum makecache                   #刷新yum源配置生成缓存

rpm -ivh wget                   #rpm安装已下载的wget包，-i安装，v显示安装过程，h安装进度
rpm -q wget                     #查看wget软件是否安装
rpm -evh wget-1....             #卸载wget软件

rz                              #使用xshell 上传文件

systemctl stop httpd            #关闭httpd服务器
```

### 计划任务
```Bash
at now +1min            #新建一个1分钟后的定时任务
atq                     #查看当前定时任务

crontab -e              #创建计划任务
crontab -l              #查询计划任务（管理可以使用 -u查看别人的计划）
crontab -r              #删除计划任务
```

### 其他
```Bash
--help                      	#帮助 vim --help 查看vim都可以怎么使用
watch -n1 'll /tmp/file.txt'	#每秒执行一次查看文件命令(-n1)
date                            #获取当前时间
bt default                      #查看宝塔面板信息
```

### Linux开启root账号密码登录

```Bash
1）修改/etc/ssh/sshd_config文件
  vim /etc/ssh/sshd_config

2）修改如下：允许root账户登录
  #PermitRootLogin prohibit-password
  PermitRootLogin yes

 使用用户名密码作为验证连接
  PasswordAuthentication yes


3）编辑 认证文件authorized_keys
  vi /root/.ssh/authorized_keys

  删除前面这一堆
  no-port-forwarding,no-agent-forwarding,no-X11-forwarding,command="echo 'Please login as the user \"centos\" rather than the user \"root\".';echo;sleep 10" ···········

4）重启sshd服务
  service sshd start
  service sshd restart 

```

### 授权数据库连接
```Bash
mysql -uroot -p		#登入数据库

GRANT ALL PRIVILEGES ON *.* TO 'root'[ip地址]'%'IDENTIFIED BY '[密码]' WITH GRANT OPTION;

flush privileges;

exit		#退出数据库

firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="[ip地址]" port protocol="tcp" port="3306" accept"      #给防火墙加白

firewall-cmd --reload          #刷新防火墙
```

> <video id="video" controls="" preload="none" width= "50%" height= "300" poster="https://github.com/yoocl/material/raw/master/img/gz-djdd/0.png">
      <source id="mp4" src="http://pan.ae85.cn/d/GoogleDrive/%E8%A7%86%E9%A2%91/IMG_1509.mp4" type="video/mp4">
</video>

[视频地址](http://pan.ae85.cn/d/GoogleDrive/%E8%A7%86%E9%A2%91/IMG_1509.mp4)


> <video id="video" controls="" preload="none" width= "100%" height= "500" poster="https://pan.87xl.cn/0:/%E8%A7%86%E9%A2%91/2021-10-29_19-48-41.mp4">
      <source id="mp4" src="https://pan.87xl.cn/0:/%E8%A7%86%E9%A2%91/2021-10-29_19-48-41.mp4" type="video/mp4">
</video>

[视频地址](https://pan.87xl.cn/0:/%E8%A7%86%E9%A2%91/2021-10-29_19-48-41.mp4)

