/*
直播 - 秋名山见 2.1
2022年8月10日

更新：配置文件换新域名
修复：报错无法使用问题
新增：接入影音宝播放器

by：iPhone 8、小良
https://iphone8.vip/
*/

var template = [{
    type: "image",
    props: {
        id: "tx",
        radius: 30
    },
    layout: function (make, view) {
        make.top.inset(1)
        make.centerX.equalTo(view.center)
        make.width.height.equalTo(60)

    }
}, {
    type: "label",
    props: {
        id: "mc",
        textColor: $color("#149bcc"),
        align: $align.center
    },
    layout(make, view) {
        make.right.left.inset(0)
        make.top.equalTo($("tx").bottom).inset(5)
        make.height.equalTo(30)
    }
},]

var szan = {
    type: "button",
    props: {
        id: "hb_img",
        src: "https://iphone8.vip/img/xl.png",
    },
    events: {
        tapped: function (sender) {
            sz()
        }
    },
    layout: function (make, view) {
        make.bottom.inset(30)
        make.width.height.equalTo(60)
        make.right.inset(15)
    }
}
var daocbm = {
    type: "button",
    props: {
        id: "dc_img",
        radius: 30,
        src: "https://iphone8.vip/img/filza.png",
    },
    events: {
        tapped: function (sender) {
            daoc()
        }
    },
    layout: function (make, view) {
        make.bottom.equalTo($('hb_img').top).inset(10)
        make.width.height.equalTo(60)
        make.right.inset(15)
    }
}
var m3u_data = [], m3u_name
if (typeof ($cache.get("acquiescence")) == "undefined") {
    $cache.set("acquiescence", 0)
}

var urls = [{
    name: "VLC",
    url: "vlc://",
    store: "https://itunes.apple.com/cn/app/vlc-for-mobile/id650377962?mt=8"
}, {
    name: "OPlayer Lite",
    url: "OPlayerLite://",
    store: "https://itunes.apple.com/cn/app/%E6%92%AD%E6%94%BE%E5%99%A8oplayer-lite-%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%99%A8/id385907472?mt=8"
},
{
    name: "nPlayer",
    url: "nplayer-",
    store: "https://itunes.apple.com/cn/app/nplayer-lite/id1078835991?mt=8"
},
{
    name: "影音宝",
    url: "yybx://play?",
    store: "https://itunes.apple.com/cn/app/nplayer-lite/id1468401388?mt=8"
}
]
function zjm() {
    $ui.render({
        props: {
            title: "直播 - 秋名山见 2.1"
        },
        views: [{
            type: "matrix",
            props: {
                columns: 4,
                itemHeight: 98,
                spacing: 3,
                template: template
            },
            layout: function (make) {
                make.top.left.bottom.right.equalTo(0)
            },
            events: {
                didSelect: function (sender, indexPath, obj) {
                    getlist(obj.id, obj.mc.text)
                },
            }
        }, szan]
    })
}
const urlt = "lz7zHR0cHM6Ly9pcGhvbmU4LnZpcC9jb25mlz7zWcvcW1zemIulz7znNvbg=="
$ui.loading(true)
$http.get({
    url: $text.base64Decode(urlt.replace(/lz7z/g, "a")),
    handler: function (resp) {
        $ui.loading(false)
        if (resp.response.statusCode == "200") {
            var info = resp.data;
            $cache.set("info", info)
            if (info.version != "2.1") {
                $ui.alert({
                    title: "温馨提示",
                    message: info.Ucontent,
                    actions: [{
                        title: "进入官网",
                        handler: function () {
                            $app.openURL(info.xl)
                        }
                    }, {
                        title: "关注公众号",
                        handler: function () {
                            $ui.alert({
                                title: "温馨提示",
                                message: "跳转微信会自动复制公众号ID\n请跳转到微信-搜索-公用号-粘贴-关注",
                                actions: [{
                                    title: "跳转微信",
                                    handler: function () {
                                        $clipboard.text = "ae85-cn"
                                        $app.openURL("weixin://")
                                    }
                                }, {
                                    title: "取消"
                                }]
                            })
                        }
                    }]
                })
            } else {
                zjm();
                tcgg()
                getpt()
            }

        } else {
            $ui.alert("加载失败")
        }
    }
})

function tcgg() {
    var gg = $cache.get("info").dont
    if ($file.exists("gg.txt")) {
        var file = $file.read("gg.txt").string
        if (file != gg) {
            xrwj(gg)
        }
    } else {
        xrwj(gg)
    }
}

function xrwj(nr) {
    $ui.alert(nr);
    $file.write({
        data: $data({ string: nr }),
        path: "gg.txt"
    })
}

function getpt() {
    var key = $cache.get("info").turl
    $ui.loading(true)
    $http.get({
        url: $text.base64Decode(key) + "json.txt",
        header: {
            "User-Agent": "Mozilla/5.0 (Linux; Android 4.4.2; OPPO R11 Build/NMF26X) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36"
        },
        handler: function (resp) {
            $ui.loading(false)
            var json = resp.data.pingtai
            var data = []
            for (i in json) {
                var arr = json[i]
                data.push({
                    tx: { src: arr.xinimg },
                    mc: { text: arr.title + "(" + arr.Number + ")" },
                    id: arr.address
                })
            }
            $("matrix").data = data
            $("matrix").endRefreshing()
        }
    })
}

function getlist(id, mc) {
    var key = $cache.get("info").turl
    $ui.loading(true)
    $http.get({
        url: $text.base64Decode(key) + id,
        header: {
            "User-Agent": "Mozilla/5.0 (Linux; Android 4.4.2; OPPO R11 Build/NMF26X) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36"
        },
        handler: function (resp) {
            $ui.loading(false)
            var json = resp.data.zhubo
            var data = []
            for (i in json) {
                var arr = json[i]
                data.push({
                    tx: { src: arr.img },
                    mc: { text: arr.title },
                    id: arr.address
                })
            }
            m3u_data = data
            m3u_name = mc
            $ui.push({
                props: {
                    title: mc + " - 主播列表"
                },
                views: [{
                    type: "matrix",
                    props: {
                        columns: 4,
                        itemHeight: 98,
                        spacing: 3,
                        template: template,
                        data: data
                    },
                    layout: function (make) {
                        make.top.left.bottom.right.equalTo(0)
                    },
                    events: {
                        didSelect: function (sender, indexPath, obj) {
                            openbf(obj.id)

                        }, didLongPress: function (sender, indexPath, data) {
                            $clipboard.text = data.id
                            $ui.alert("已复制\n\n" + data.id);
                        }
                    }
                }, szan, daocbm]
            })
        }
    })
}

function openbf(url) {
    var bbf = urls[$cache.get("acquiescence")]
    var canOpen = $app.openURL(bbf.url + url);
    if (!canOpen) {
        $ui.alert({
            message: "请先安装 " + bbf.name,
            actions: [{
                title: "跳转安装",
                handler: function () {
                    $app.openURL(bbf.store);
                }
            },
            {
                title: "设置其他播放器",
                handler: function () {
                    sz()
                }
            }
            ]
        })
    }
    return canOpen;
}

function sz() {
    $ui.push({
        props: {
            title: "设置"
        },
        views: [{
            type: "list",
            props: {
                data: [{
                    title: "选择设置默认播放器",
                    rows: [{
                        type: "tab",
                        props: {
                            items: urls.map(function (item) { return item.name }),
                            index: $cache.get("acquiescence")

                        },
                        layout: $layout.center,
                        events: {
                            changed: function (sender) {
                                $cache.set("acquiescence", sender.index)

                            }
                        }
                    }]
                }, {
                    title: "安装播放器",
                    rows: [" VLC       -  跳转App Store商店下载", "OPlayer -  跳转App Store商店下载", " nPlayer -  跳转App Store商店下载", "影音宝   -  跳转App Store商店下载"]
                }, {
                    title: "使用帮助",
                    rows: ["作者官网", "作者博客", "微信公众号：小良科技", "关于脚本"]
                }],
                footer: {
                    type: "label",
                    props: {
                        height: 100,
                        lines: 0,
                        text: "by：iPhone 8、小良\nhttps://iphone8.vip/",
                        textColor: $color("#198567"),
                        align: $align.center,
                        font: $font(16)
                    }
                }
            },
            layout: $layout.fill,
            events: {
                didSelect: function (sender, indexPath, data) {
                    if (data == " VLC       -  跳转App Store商店下载") {
                        $app.openURL(urls[0].store)
                    } else if (data == "OPlayer -  跳转App Store商店下载") {
                        $app.openURL(urls[1].store)
                    } else if (data == " nPlayer -  跳转App Store商店下载") {
                        $app.openURL(urls[2].store)
                    } else if (data == "影音宝   -  跳转App Store商店下载") {
                        $app.openURL(urls[3].store)
                    } else if (data == "作者官网") {
                        web("https://iphone8.vip/", "iPhone 8、小良")
                    } else if (data == "作者博客") {
                        web("https://87xl.cn", "小良、Blog")
                    } else if (data == "微信公众号：小良科技") {
                        web("http://mp.weixin.qq.com/mp/homepage?__biz=MzI0NDM1MDUwOQ==&hid=1&sn=91031d83ec40fffd43d268db23d7de8d&scene=18#wechat_redirect", "微信公众号-小良Ge")
                    } else if (data == "关于脚本") {
                        web("http://qq.cn.hn/g32", "直播-秋名山见")
                    }
                }
            }
        }]
    })
}

function web(url, text) {
    $ui.push({
        props: {
            title: text
        },
        views: [{
            type: "web",
            props: {
                url: url
            },
            layout: $layout.fill
        }]
    })
}

function daoc() {
    if (m3u_data) {
        var data = `#EXTM3U
`
        for (i in m3u_data) {
            var j = m3u_data[i]
            data = data + `#EXTINF:-1 tvg-logo="${j.tx.src}" group-title="${m3u_name}", ${j.mc.text}
${j.id}

`
        }
        var dd = $data({
            string: data
          });
        $share.sheet([m3u_name + ".m3u", dd]);
        
    }
   
}