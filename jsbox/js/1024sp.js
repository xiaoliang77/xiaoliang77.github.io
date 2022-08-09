/*
2022年7月4日 更新
脚本仅供代码学习，请勿分享。非法传播照成法律问题与作者无关。

by：iPhone 8、小良
https://iphone8.vip/
*/


$cache.set("id", "1")
$cache.set("pg", 1)
var urlt = $text.base64Decode("aHR0cHM6Ly9nb25nZGlzaGFvbnYyMzUudG9wLw==");
var data = [{ "name": "国产", "id": "1" }, { "name": "无码", "id": "13" }, { "name": "欧美", "id": "6" },{ "name": "三级", "id": "4" }, { "name": "动漫", "id": "14" }]

$ui.render({
    props: {
        title: "1024视频"
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
        handler: function (resp) {
            $ui.loading(false)
            var text = resp.data.replace(/\n|\s|\r/g, "")
            var shu = text.match(/<h2class=\"f-15rows-2mt10\">(\S*?)<\/h2>/g)
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
            var video = text.match(/<divclass=\"video-tips\">(\S*?)<\/script>/)[1]
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
