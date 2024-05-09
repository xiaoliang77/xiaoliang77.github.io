/*
2024年5月10日 更新
更换源地址

脚本仅供代码学习，请勿分享。非法传播照成法律问题与作者无关。

by：iPhone 8、小良
https://iphone8.vip/
https://ae85.cn/
*/


$cache.set("id", "193")
$cache.set("pg", 1)
var header = {
    "User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
  }
var js_name = "1024小说"
var urlt = $text.base64Decode("aHR0cHM6Ly9kcDI0MDVzLmxpbmsv")
var data = [{ "name": "激情", "id": "193" }, { "name": "家庭", "id": "196" }, { "name": "校园", "id": "195" }, { "name": "武侠", "id": "197" }, { "name": "另类", "id": "199" }, { "name": "人妻", "id": "194" },]
const mrhb = {
    type: "button",
    props: {
      id: "hb_img",
      radius: 25,
      src: "https://iphone8.vip/img/hb.jpg",
    },
    events: {
      tapped: function(sender) {
        $app.openURL("https://ae85-1251930860.cos.ap-chengdu.myqcloud.com/hongbao.html")
      }
    },
    layout: function(make, view) {
      make.bottom.inset(50)
      make.width.height.equalTo(50)
      make.right.inset(15)
    }
  }
$ui.render({
    props: {
        title: js_name
    },
    views: [{
        type: "menu",
        props: {
            id: "meun",
            items: data.map(function (item) {
                return item.name
            }),
        },
        layout: function (make) {
            make.left.top.right.equalTo(0)
            make.height.equalTo(50)

        },
        events: {
            changed: function (sender) {
                $cache.set("id", data[sender.index].id)
                $cache.set("pg", 1)
                getdata()
            }
        }
    },
    {
        type: "list",
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
                getdata()
            }
        }

    },mrhb
    ]

})

function getdata() {
    var id = $cache.get("id")
    var pg = $cache.get("pg")
    $ui.loading(true)
    $http.get({
        url: urlt + "pw/thread.php?fid=" + id + "&page=" + pg,
        header: header,
        handler: function (resp) {
            $ui.loading(false)
            var text = resp.data.replace(/\n|\s|\r/g, "")
            if (text.indexOf('普通主题') !== -1) {
                text = text.split("普通主题")[1]
            }
            var shu = text.match(/class=\"tr3t_one\">(\S*?)<\/h3>/g)
            if (pg == 1) {
                var data = []
            } else {
                var data = $("list").data
            }
            for (i in shu) {
                var a = shu[i]
                if (a.indexOf('href=') !== -1) {
                    var txt = a.split("<h3>")[1]
                    var mc = txt.match(/\">(\S*?)<\/a>/)[1]
                    var id = a.match(/href=\"(\S*?)\"/)[1]
                    data.push(mc + "\n" + id)
                }
            }
            $("list").data = data
            $("list").endFetchingMore()
        }
    })
}

getdata()

function geting(id, mc) {
    $ui.loading(true)
    $http.get({
        url: urlt + "pw/" + id,
        header: header,
        handler: function (resp) {
            $ui.loading(false)
            var text = resp.data.match(/id=\"read_tpc\">.*?<\/div>/)
            text = text[0].replace('id=\"read_tpc\">', "")
            var html = `<html><head><meta charset="UTF-8"><title>${mc}</title><style> body,div{ font-size:42px;} </style> </head><body><div>${text}</body></html>`
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
                },mrhb]
            })
        }
    })
}

async function get_updata() {
    const resp = await $http.get($text.base64Decode("aHR0cHM6Ly9pcGhvbmU4LnZpcC9jb25maWcvMTAyNC5qc29u"));
    if(resp.response.statusCode === 200){
        if (resp.data.novel.version != "2.9.3") {
            $ui.alert({
                title: "发现新版本 - " + resp.data.novel.version,
                message: resp.data.novel.upexplain,
                actions: [
                    {
                        title: "立即更新",
                        handler: function () {
                            download(resp.data.novel.updata)
                        }
                    }, {
                        title: "取消"
                    }
                ]

            });
            
        }
    }
}
get_updata()

function download(url) {
    $ui.toast("正在安装中 ...");
    $http.download({
        url: url,
        handler: function (resp) {
            $addin.save({
                name: js_name,
                data: resp.data,
                handler: function () {
                    $ui.alert({
                        title: "安装完成",
                        message: "\n是否打开？\n" + js_name,
                        actions: [
                            {
                                title: "打开",
                                handler: function () {
                                    $app.openExtension(js_name)
                                }
                            },
                            {
                                title: "不了"
                            }]
                    });
                }
            })
        }
    })
}