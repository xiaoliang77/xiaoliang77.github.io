/*
Btbtt,BT电影天堂,BT种子,BT下载,BT电影下载
脚本支持：影片搜索、查看影片详情、复制影片磁力链接。
by：iPhone 8、小良
http://ae85.cn/
*/


$cache.set("id", "index-index")
$cache.set("pg", 1)
var urlt = "http://92btbtt.com/"
var data = [{ "name": "首页", "id": "index-index" }, { "name": "电影", "id": "forum-index-fid-951" }, { "name": "电视剧", "id": "forum-index-fid-950" }, { "name": "综艺", "id": "forum-index-fid-1106" }, { "name": "动慢", "id": "forum-index-fid-981" }]
var sfsou = 2
$ui.render({
    props: {
        title: "Btbtt-电影下载"
    },
    views: [{
        type: "input",
        props: {
            id: "wd",
            placeholder: "输入影片关键字...",
            darkKeyboard: true
        },
        layout: function (make, view) {
            make.top.equalTo(5)
            make.left.right.inset(5);
            make.height.equalTo(35);
        },
        events: {
            returned: function (sender) {
                $("wd").blur();
                $("zlist").data = []
                $cache.set("pg", 1)
                $cache.set("key", sender.text)
                sfsou = 1
                sou()
            }
        }
    }, {
        type: "menu",
        props: {
            id: "meun",
            items: data.map(function (item) {
                return item.name
            }),
        },
        layout: function (make) {
            make.top.equalTo($("wd").bottom).inset(5);
            make.left.right.equalTo(0)
            make.height.equalTo(35)

        },
        events: {
            changed: function (sender) {
                $cache.set("id", data[sender.index].id)
                $cache.set("pg", 1)
                sfsou = 2
                $("zlist").data = []
                getdata()
            }
        }
    },
    {
        type: "list",
        props: {
            id: "zlist"
        },
        layout: function (make) {
            make.right.left.bottom.inset(0)
            make.top.equalTo($("meun").bottom)
        },
        events: {
            didSelect: function (sender, indexPath, data) {
                var id = data.split("\n")
                geting(id[1], id[0])
            },
            didReachBottom: function (sender) {
                sender.endFetchingMore()
                var page = $cache.get("pg") + 1
                $cache.set("pg", page)
                $console.info(sfsou);
                if (sfsou == 1) {
                    sou()
                } else {
                    getdata()
                }

            }
        }

    },]
})

function getdata() {
    var id = $cache.get("id")
    var pg = $cache.get("pg")
    $ui.loading(true)
    $http.get({
        url: urlt + id + "-page-" + pg + ".htm",
        handler: function (resp) {
            $ui.loading(false)
            var text = resp.data.replace(/\n|\s|\r/g, "")
            if (pg == 1) {
                var data = []
                var shu = text.match(/<divclass=\"bg2\"(\S*?)<divclass=\"footer\">/)[0]
            } else {
                var data = $("zlist").data
                var shu = text.match(/<divclass=\"bodythreadlist\"(\S*?)<divclass=\"footer\">/)[0]
            }
            var arr = shu.match(/<tdvalign=\"(\S*?)<\/td>/g)
            for (i in arr) {
                var a = arr[i]
                var mc = a.match(/title=\"(\S*?)\"/g)[1].replace(/title=|\"/g, "")
                var id = a.match(/<ahref=\"(\S*?)\"/)[1]
                data.push(mc + "\n" + id)
            }
            $("zlist").data = data
            $("zlist").endFetchingMore()
        }
    })
}
getdata()

function geting(id, mc) {
    $ui.loading(true)
    $http.get({
        url: urlt + id,
        handler: function (resp) {
            $ui.loading(false)
            var yxzt
            var wjid
            var data = []
            var html = resp.data.split('<div style="width: 250px; height: 250px; float: right">')[1]
            var text = html.match(/<p>.*?<\/div>/)[0]
            var t = text.replace(/\/upload\//g, "http://92btbtt.com/upload/")
            var html = `<html><head><meta charset="UTF-8"><title>${mc}</title><style> body,div{ font-size:42px;} </style> </head><body><h3>${mc}</h3><hr/><div>${t}</body></html>`
            var fu_html = resp.data.replace(/\n|\s|\r/g, "")
            if (fu_html.search(/<divclass=\"attachlist\">/) != -1) {
                var fu_text = fu_html.match(/<divclass=\"attachlist\">(\S*?)<\/div>/g)[0]
                var arr = fu_text.match(/<ahref=\"(\S*?)<\/a>/g)
                if (arr.length == 1) {
                    yxzt = 1
                    var ent = arr[0];
                    wjid = ent.match(/"attach-dialog(\S*?)\.htm/)[1]
                } else {
                    yxzt = 2
                    for (i in arr) {
                        var ent = arr[i];
                        var name = ent.match(/height=\"16\"\/>(\S*?)<\/a>/)[1]
                        var id = ent.match(/"attach-dialog(\S*?)\.htm/)[1]
                        data.push(name + "\n" + id)
                    }
                }
            } else {
                yxzt = 0
            }

            $ui.push({
                props: {
                    title: mc
                },
                views: [{
                    type: "web",
                    props: {
                        html: html,
                    },
                    layout: $layout.fill
                }, {
                    type: "button",
                    props: {
                        id: "hb_img",
                        src: "http://ae85.cn/jsbox/img/xun.jpg",
                        radius: 30
                    },
                    events: {
                        tapped: function (sender) {
                            if (yxzt == 0) {
                                $ui.alert("该资源暂无附件");
                            } else if (yxzt == 1) {
                                getwj(wjid, 1)
                            } else if (yxzt == 2) {
                                wjlist(mc, data)
                            }
                        },
                        longPressed: function (sender) {
                            if (yxzt == 0) {
                                $ui.alert("该资源暂无附件");
                            } else if (yxzt == 1) {
                                getwj(wjid, 2)
                            }
                        }
                    },
                    layout: function (make, view) {
                        make.bottom.inset(50)
                        make.width.height.equalTo(60)
                        make.right.inset(15)
                    }
                },]
            })
        }
    })
}

function wjlist(mc, data) {
    $ui.push({
        props: {
            title: mc
        },
        views: [{
            type: "list",
            props: {
                data: data
            },
            layout: function (make) {
                make.top.right.left.bottom.inset(0)
            },
            events: {
                didSelect: function (sender, indexPath, data) {
                    var id = data.split("\n")
                    getwj(id[1], 1)
                }
            }

        }]
    });
}

function getwj(id, dian) {
    var url = "http://92btbtt.com/attach-download" + id + ".htm"
    $clipboard.text = url
    if (dian == 1) {
        var canOpen = $app.openURL("thunder://" + url);
        if (!canOpen) {
            $ui.alert({
                message: "请先安装迅雷",
                actions: [{
                    title: "跳转安装",
                    handler: function () {
                        $app.openURL("http://ae85.cn/yy.html");
                    }
                },
                {
                    title: "复制磁力链接",
                    handler: function () {
                        alert("已复制\n" + url)
                    }
                }
                ]
            })
        }
    } else {
        alert("已复制磁力链接")
    }
}

function sou(keyword) {
    var pg = $cache.get("pg")
    var key = $cache.get("key")
    $ui.loading(true)
    $http.get({
        url: urlt + "search-index-keyword-" + $text.URLEncode(key) + "-page-" + pg + ".htm",
        handler: function (resp) {
            $ui.loading(false)
            var text = resp.data.replace(/\n|\s|\r/g, "")
            var shu = text.match(/<divclass=\"bodythreadlist\"(\S*?)<divclass=\"footer\">/)[0]
            var arr = shu.match(/<tdvalign=\"(\S*?)<\/td>/g)
            if (pg == 1) {
                var data = []
            } else {
                var data = $("zlist").data
            }
            for (i in arr) {
                var a = arr[i]
                var mc = a.match(/title=\"(\S*?)\"/g)[1].replace(/title=|\"|<spanclass=red>|<\/span>/g, "")
                var id = a.match(/<ahref=\"(\S*?)\"/)[1]
                data.push(mc + "\n" + id)
            }
            $("zlist").data = data
            $("zlist").endFetchingMore()
        }
    })
}