/*
脚本仅供代码学习，请勿分享。非法传播照成法律问题与作者无关。

by：iPhone 8、小良
https://ae85.cn/
*/

$cache.set("id", "1")
$cache.set("pg", 1)
var urlt = "http://801zy.com"
var data = [{ "name": "首页", "id": "1" }, { "name": "偷拍", "id": "2" }, { "name": "三级", "id": "3" }, { "name": "无码", "id": "4" }, { "name": "有码", "id": "5" }, { "name": "欧美", "id": "6" }, { "name": "另类", "id": "7" }, { "name": "卡通", "id": "8" }, { "name": "中文", "id": "9" }, { "name": "巨乳", "id": "10" }, { "name": "制服", "id": "11" }, { "name": "乱伦", "id": "12" }, { "name": "国产", "id": "13" }, { "name": "人妻", "id": "14" }, { "name": "学生", "id": "15" }, { "name": "日韩", "id": "16" }]

$ui.render({
    props: {
        title: "在线福利"
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

$http.get({
    url: urlt,
    handler: function (resp) {
        var cookie = resp.data.match(/cookie=\'(\S*?)\'/)[1];
        $cache.set("cookie", cookie)
        getdata()
    }
});

function getdata(cookie) {
    var id = $cache.get("id")
    var pg = $cache.get("pg")
    var cookie = $cache.get("cookie")
    $ui.loading(true)
    $http.get({
        url: urlt + "/list-" + id + "-" + pg + ".html",
        header: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
            "Cookie": cookie
        },
        handler: function (resp) {
            $ui.loading(false)
            var text = resp.data.replace(/\n|\s|\r/g, "")
            var shu = text.match(/\"videoName\"(\S*?)<\/li>/g)
            if (pg == 1) {
                var data = []
            } else {
                var data = $("list").data
            }
            for (i in shu) {
                var a = shu[i]
                var mc = a.match(/\/>(\S*?)<\/a>/)[1]
                var id = a.match(/href=\"(\S*?)\"/)[1]
                data.push(mc + "\n" + id)
            }
            $("list").data = data
            $("list").endFetchingMore()
        }
    })
}

function geting(id, mc) {
    var cookie = $cache.get("cookie")
    $ui.loading(true)
    $http.get({
        url: urlt + id,
        header: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
            "Cookie": cookie
        },
        handler: function (resp) {
            $ui.loading(false)
            var text = resp.data.replace(/\n|\s|\r/g, "")
            var url = text.match(/\"playlistwbox\">(\S*?)<\/div>/)[1]
            $ui.push({
                props: {
                    title: mc
                },
                views: [{
                    type: "web",
                    props: {
                        url: url,
                    },
                    layout: $layout.fill
                }]
            })
        }
    })
}