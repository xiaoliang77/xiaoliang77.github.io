/*
2023年1月16日 更新
更新无法使用问题
脚本仅供代码学习，请勿分享。非法传播照成法律问题与作者无关。

by：iPhone8、小良
https://iphone8.vip/
https://ae85.cn/
*/

$cache.set("id", "10")
$cache.set("pg", 1)
var urlt = $text.base64Decode("aHR0cHM6Ly9iYnMyMDIzLnNpamlhYWkuY29tLzIwNDgv");
var js_name = "1024视频"
var data = [{ "name": "国产", "id": "10" }, { "name": "日韩", "id": "11" }, { "name": "欧美", "id": "12" }, { "name": "另类", "id": "13" }]

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
        url: urlt + "thread.php?fid-78-type-" + id + "-page-" + pg + ".html",
        header: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1"
        },
        handler: function (resp) {
            $ui.loading(false)
            var text = resp.data.replace(/\n|\s|\r/g, "")
            var shu = text.match(/subjectbreak-all.*?<\/div>/g)
            if (pg == 1) {
                var data = []
            } else {
                var data = $("list").data
            }
            for (i in shu) {
                var a = shu[i]
                if (a.indexOf('state/m/78') !== -1) {
                    var mc = a.match(/html\">(\S*?)<\/a>/)[1]
                    var id = a.match(/<ahref=\"(\S*?)\"/)[1]
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
        url: urlt + id,
        handler: function (resp) {
            $ui.loading(false)
            var text = resp.data.replace(/\n|\s|\r/g, "")
            var video = text.match(/IFRAMESRC=(\S*?)FRAMEBORDER/)[1]
            $ui.push({
                props: {
                    title: mc
                },
                views: [{
                    type: "web",
                    props: {
                        url: video,
                    },
                    layout: $layout.fill
                }]
            })
        }
    })
}


async function get_updata() {
    const resp = await $http.get($text.base64Decode("aHR0cHM6Ly9pcGhvbmU4LnZpcC9jb25maWcvMTAyNC5qc29u"));
    if (resp.response.statusCode === 200) {
        if (resp.data.vdieo.version != "2.1") {
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