/*
2019年5月28日 更新
脚本仅供代码学习，请勿分享。非法传播照成法律问题与作者无关。

by：iPhone 8、小良
https://ae85.cn/
*/


$cache.set("id", "14")
$cache.set("pg", 1)
var urlt = "http://w1.97xzjpzz.info/"
var data = [{ "name": "写真", "id": "14" }, { "name": "自拍", "id": "15" }, { "name": "露出", "id": "16" }, { "name": "街拍", "id": "49" }, { "name": "丝袜", "id": "21" }, { "name": "欧美", "id": "114" },]

$ui.render({
    props: {
        title: "1024图库"
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
        url: urlt + "pw/thread.php?fid=" + id + "&page=" + pg,
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
        handler: function (resp) {
            $ui.loading(false)
            var text = resp.data.replace(/\n|\s|\r/g, "")
            var shu = text.match(/<br><br><imgsrc=\"(\S*?)\"/g)
            var ingz = ""
            for (i in shu) {
                var ing = shu[i].replace(/<br><br><imgsrc=\"/, "")
                var li = "<li><img src=\"" + ing + "\"></li>"
                ingz = ingz + li
            }
            var html = `<html><head><meta charset="UTF-8"><title>${mc}</title></head><body>${ingz}</ul></body></html>`
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
                }]
            })
        }
    })
}
