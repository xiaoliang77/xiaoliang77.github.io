/*
2024年12月24日 更新
更新无法使用问题
脚本仅供代码学习，请勿分享。非法传播照成法律问题与作者无关。

by：iPhone8、小良
https://iphone8.vip/
https://ae85.cn/
*/

$cache.set("id", "1")
$cache.set("pg", 1)
var header = {
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
}
var urlt = $text.base64Decode("aHR0cHM6Ly9jYy43OTAyei54eXo=");
var js_name = "1024视频"
var data = [{ "name": "亞洲無碼", "id": "1" }, { "name": "亞洲有碼", "id": "2" }, { "name": "歐美無碼", "id": "3" }, { "name": "動漫無碼", "id": "4" }, { "name": "動漫有碼", "id": "5" }]
const mrhb = {
    type: "button",
    props: {
        id: "hb_img",
        radius: 25,
        src: "https://iphone8.vip/img/hb.jpg",
    },
    events: {
        tapped: function (sender) {
            $app.openURL("https://ae85-1251930860.cos.ap-chengdu.myqcloud.com/hongbao.html")
        }
    },
    layout: function (make, view) {
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

    }, mrhb
    ]

})

function getdata() {
    var id = $cache.get("id")
    var pg = $cache.get("pg")
    $ui.loading(true)
    $http.get({
        url: urlt + "/thread0806.php?fid=22&search=&type=" + id + "&page=" + pg,
        header: header,
        handler: function (resp) {
            $ui.loading(false)
            var text = resp.data.replace(/\n|\s|\r/g, "")
            if (text.includes("普通主題")) {
                const startIndex = text.indexOf("普通主題") + 4;
                const result = text.slice(startIndex).trim();
                text = result;
            }
            var shu = text.match(/<tdclass="tal"id="">.*?<\/td>/g)
            if (pg == 1) {
                var data = []
            } else {
                var data = $("list").data
            }
            for (i in shu) {
                var a = shu[i]
                if (a.indexOf('href=') !== -1) {
                    var mc = a.match(/<h3><a[^>]*>(.*?)<\/a><\/h3>/)[1]
                    var id = a.match(/ahref="(.*?)"/)[1]
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
        header: header,
        handler: function (resp) {
            const video = resp.data.match(/.src='(.*?)#/)[1]
            $http.get({
                url: video,
                handler: function (resp) {
                    $ui.loading(false)
                    const video_src = resp.data.match(/https?:\/\/[^\s]+?\.(mp4|m3u8)/g)
                    let selectedUrl = "";
                    if (video_src && video_src.length > 1) {
                        selectedUrl = video_src[1];
                    } else if (video_src && video_src.length === 1) {
                        selectedUrl = video_src[0];
                    } else {
                        $ui.alert("视频地址未获取到")
                        return ;
                    }

                    $ui.push({
                        props: {
                            title: mc
                        },
                        views: [{
                            type: "web",
                            props: {
                                url: selectedUrl,
                            },
                            layout: $layout.fill
                        }, mrhb]
                    })
                }
            })
        }
    })
}


async function get_updata() {
    const resp = await $http.get($text.base64Decode("aHR0cHM6Ly9pcGhvbmU4LnZpcC9jb25maWcvMTAyNC5qc29u"));
    if (resp.response.statusCode === 200) {
        if (resp.data.vdieo.version != "2.9.5") {
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

