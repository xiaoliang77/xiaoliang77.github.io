/*
2021年2月13日 更新
脚本仅供代码学习，请勿分享。非法传播照成法律问题与作者无关。

by：iPhone 8、小良
https://ae85.cn/
*/


$cache.set("id", "10")
$cache.set("pg", 1)
var urlt = $text.base64Decode("aHR0cHM6Ly9tMS5sdG81Lnh5ei8yMDQ4Lw==");
var data = [{ "name": "国产", "id": "10" }, { "name": "日韩", "id": "11" }, { "name": "欧美", "id": "12" }, { "name": "另类", "id": "13" }]

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
        url: urlt + "thread.php?fid-78-type-" + id + "-page-" + pg + ".html",
        handler: function (resp) {
            $ui.loading(false)
            var text = resp.data.replace(/\n|\s|\r/g, "")
            if (text.indexOf('普通主题') !== -1) {
                text = text.split("普通主题")[1]
            }
            var shu = text.match(/class=\"tr3t_one\">(\S*?)<\/tr>/g)
            if (pg == 1) {
                var data = []
            } else {
                var data = $("list").data
            }
            for (i in shu) {
                var a = shu[i]
                if (a.indexOf('href=') !== -1) {
                    var mc = a.match(/class=\"subject\">(\S*?)<\/a>/)[1]
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
        url: urlt + id,
        handler: function (resp) {
            $ui.loading(false)
            var text = resp.data.replace(/\n|\s|\r/g, "")
            var video = text.match(/IFRAMESRC=(\S*?)FRAMEBORDER/)[1]
            $http.get({
                url: video,
                handler: function(resp) {
                    var text = resp.data.replace(/\n|\s|\r/g, "")
                    var links = $detector.link(text);
                    for (i in links) {
                        const element = links[i];
                        if (element.indexOf('.mp4') !== -1) {
                            $ui.push({
                                props: {
                                    title: mc
                                },
                                views: [{
                                    type: "web",
                                    props: {
                                        url: element,
                                    },
                                    layout: $layout.fill
                                }]
                            })
                        }
                        
                    }
                }
            });

        }
    })
}