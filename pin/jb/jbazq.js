/*
由于ios12系统权限问题导致url以及文件方式分享的脚本都不能通过 URL Schemes 以及 Action Extension 来进行安装了，虽然还可以用复制代码的方式来安装我们的脚本。但是复制代码这个方法比较麻烦。所以是很有必要写这么一个脚本，为了方便我自己的同时也方便大家。所以分享这个脚本给大家。
jsbox脚本安装器使用也很简单，我们只需要复制脚本的分享链接，然后运行这个脚本安装器就可以安装了。非常方便快捷。

by：iPhone 8、小良
http://ae85.cn/
*/
if ($app.info.bundleID == "app.cyan.pin") {
    $ui.alert("该脚本不支持Pin！\n只支持JSBox \n\npin请使用复制代码方式添加");
    $app.openURL("http://qq.cn.hn/g4s");
    return;
}

if ($app.env == $env.action) {
    var data = $context.data
    var name = data.fileName
    install(data, name)
    return;
}

var link = $clipboard.link
if (link) {
    if (link.indexOf('jsbox://') !== -1) {
        urlcl(link)
    } else {
        $http.get({
            url: link,
            header: {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1"
            },
            handler: function (resp) {
                var data = resp.data
                var link = data.match(/jsbox:\/\/(\S*?)\'/)[1]
                urlcl(link)
            }
        })
    }

} else {
    $ui.alert({
        title: "温馨提示:",
        message: "\n请先复制脚本链接再运行！\n\n不会使用？看看教程吧！",
        actions: [{
            title: "查看图文教程",
            handler: function () {
                $app.openURL("http://qq.cn.hn/g43");
            }
        },{
            title: "观看视频教程",
            handler: function () {
                $app.openURL("http://t.cn/E2gUpNI");
            }
        },{
            title: "取消"
        }]

    });
}

function urlcl(link) {
    var shu = link.split("&")
    var url = $text.URLDecode(shu[0].split("url=")[1])
    if (url.indexOf('/blob/master/') !== -1) {
        url = url.replace(/\/blob\/master\//, "/raw/master/")
    }
    var name = $text.URLDecode(shu[1].split("name=")[1])
    $ui.toast("正在安装中 ...");
    $http.download({
        url: url,
        handler: function (resp) {
            install(resp.data, name)
        }
    })
}

function install(data, name) {
    $addin.save({
        name: name,
        data: data,
        handler: function () {
            $ui.alert({
                title: "安装完成",
                message: "\n是否打开？\n" + name,
                actions: [
                    {
                        title: "打开",
                        handler: function () {
                            $app.openExtension(name)
                            $app.close(delay)
                        }
                    },
                    {
                        title: "不了"
                    }]
            });
        }
    })
}