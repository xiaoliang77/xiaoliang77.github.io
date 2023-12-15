/*
2023年12月15日 更新
更新无法使用问题
脚本仅供代码学习，请勿分享。非法传播照成法律问题与作者无关。

by：iPhone8、小良
https://iphone8.vip/
https://ae85.cn/
*/

$cache.set("id", "629")
$cache.set("pg", 1)
var urlt = $text.base64Decode("aHR0cHM6Ly9iYnMubXlsejB2LmNvbS8yMDQ4Lw==");
var js_name = "1024视频"
var data = [{"id": "629","name":"网友自拍"},{"id": "528","name":"国产精品"},{"id": "567","name":"国产自拍"},{"id": "566","name":"网红主播"},{"id": "529","name":"日韩精品"},{"id": "535","name":"日韩无码"},{"id": "538","name":"中文字幕"},{"id": "569","name":"中文字幕2"},{"id": "537","name":"欧美精品"},{"id": "542","name":"伦理三级"},{"id": "541","name":"动漫精品"},{"id": "544","name":"自拍偷拍"},{"id": "581","name":"无码杂类"},{"id": "568","name":"日韩杂类"},{"id": "546","name":"杂类合辑"}]

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
        url: urlt + "thread.php?fid=279&type=" + id + "s&page=" + pg,
        header: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1"
        },
        handler: function (resp) {
            $ui.loading(false)
            var text = resp.data.replace(/\n|\s|\r/g, "")
            var shu = text.match(/subjectbreak-all\"data-url=\"read.*?<\/div>/g)
            if (pg == 1) {
                var data = []
            } else {
                var data = $("list").data
            }

            for (i in shu) {
                var a = shu[i]
                if (i > 3) {
                    var mc = a.match(/tid=(.*?)">(.*?)<\/a>/)[2]
                    var id = a.match(/tid=([0-9]+)/)[1]
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
        url: urlt + "read.php?tid=" + id,
        handler: function (resp) {
            var text = resp.data.replace(/\n|\s|\r/g, "")
            var video = text.match(/IFRAMESRC=(\S*?)FRAMEBORDER/)[1]
            video = video.replace(/&#46;/g, ".").match(/\?url=(\S*?)\.m3u8/)[1] + ".m3u8"
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
    });
}


async function get_updata() {
    const resp = await $http.get($text.base64Decode("aHR0cHM6Ly9pcGhvbmU4LnZpcC9jb25maWcvMTAyNC5qc29u"));
    if (resp.response.statusCode === 200) {
        if (resp.data.vdieo.version != "2.8") {
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