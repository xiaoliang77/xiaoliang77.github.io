/*
2022年11月10日 更新
新增自动更新功能
脚本仅供代码学习，请勿分享。非法传播照成法律问题与作者无关。

by：iPhone 8、小良
https://iphone8.vip/
*/


$cache.set("id", "21")
$cache.set("pg", 1)
var urlt = $text.base64Decode("aHR0cHM6Ly9ndWFuZ3hpYmlhb21laTIzOC50b3A=");
var js_name = "1024视频"
var data = [{ "name": "国产", "id": "21" }, { "name": "日本", "id": "22" }, { "name": "欧美", "id": "3" },{ "name": "三级", "id": "20" }, { "name": "动漫", "id": "14" }]

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

    },
    ]

})

function getdata() {
    var id = $cache.get("id")
    var pg = $cache.get("pg")
    $ui.loading(true)
    $http.get({
        url: urlt + "/index.php/vod/type/id/" + id + "/page/" + pg + ".html",
        header: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1"
        },
        handler: function (resp) {
            $ui.loading(false)
            var text = resp.data.replace(/\n|\s|\r/g, "")
            var shu = text.match(/divclass=\"item\">.*?<\/div>/g)
            if (pg == 1) {
                var data = []
            } else {
                var data = $("list").data
            }
            for (i in shu) {
                var a = shu[i]
                if (a.indexOf('href=') !== -1) {
                    var mc = a.match(/title=\"(\S*?)\"/)[1]
                    var id = a.match(/detail\/id\/(\S*?)\.html/)[1]
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
        url: urlt + "/index.php/vod/play/id/" + id + "/sid/1/nid/1.html",
        handler: function (resp) {
            $ui.loading(false)
            var text = resp.data.replace(/\n|\s|\r/g, "")
            var video = text.match(/<divclass=\"player-wrap\"(\S*?)<\/script>/)[1]
            var vurl = video.match(/url\":\"(\S*?)\"/)[1]
            vurl = vurl.replace(/\\/g, "")
            $ui.push({
                props: {
                    title: mc
                },
                views: [{
                    type: "web",
                    props: {
                        url: vurl,
                    },
                    layout: $layout.fill
                }]
            })
        }
    })
}


async function get_updata() {
    const resp = await $http.get($text.base64Decode("aHR0cHM6Ly9pcGhvbmU4LnZpcC9jb25maWcvMTAyNC5qc29u"));
    if(resp.response.statusCode === 200){
        if (resp.data.vdieo.version != "2.0") {
            $ui.alert({
                title: "发现新版本 - " + resp.data.vdieo.version,
                message: resp.data.vdieo.upexplain,
                actions: [
                    {
                        title: "立即更新",
                        handler: function () {
                            download(resp.data.vdieo.updata)
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