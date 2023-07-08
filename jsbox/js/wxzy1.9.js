/*
2023年7月8日更新

脚本仅供代码学习，请勿分享。非法传播照成法律问题与作者无关。

by：iPhone 8、小良
https://iphone8.vip/
https://ae85.cn/
*/

var channelList = [
    { "name": "国产", "id": "/type/1" }, { "name": "日本", "id": "/type/2" }, { "name": "韩国", "id": "/type/3" }, { "name": "欧美", "id": "/type/4" }, { "name": "三级", "id": "/type/5" }, { "name": "动漫", "id": "/type/6" }];
var myHeaders = {
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
};
var urlt = $text.base64Decode("aHR0cHM6Ly95a3l5LmNra3Mudmlw");

$ui.render({
    props: {
        title: "无限资源 1.9"
    },
    views: [
        {
            type: "menu",
            props: {
                id: "menu",
                items: channelList.map(function (item) {
                    return item.name
                }),
            },
            layout: function (make) {
                make.left.top.right.equalTo(0);
                make.height.equalTo(50)
            },
            events: {
                changed: function (sender) {
                    $cache.set("type", channelList[sender.index].id);
                    $cache.set("pg", 1);
                    getdata()
                }
            }
        },
        {
            type: "matrix",
            props: {
                id: "Video",
                itemHeight: 180,
                columns: 2,
                spacing: 7,
                template: [{
                    type: "image",
                    props: {
                        id: "img",
                        radius: 3
                    },
                    layout: function (make, view) {
                        make.centerX.equalTo(view.super);
                        make.height.equalTo(90);
                        make.width.equalTo(180);
                    }
                },
                {
                    type: "label",
                    props: {
                        id: "pm",
                        align: $align.center,
                        lines: 0,
                        font: $font("bold", 15)
                    },
                    layout: function (make, view) {
                        make.top.equalTo($("img").bottom).offset(10);
                        make.right.left.inset(0)
                    }
                },
                ]
            },
            layout: function (make) {
                make.top.equalTo($("menu").bottom);
                make.bottom.left.right.inset(0)
            },
            events: {
                didSelect: function (sender, indexPath, data) {
                    geturl(data.url, data.pm.text)
                },
                didReachBottom: function (sender) {
                    sender.endFetchingMore();
                    var page = $cache.get("pg") + 1;
                    $cache.set("pg", page);
                    var type = $cache.get("type");
                    $ui.loading(true);
                    $http.get({
                        url: urlt + type + "-" + page + ".html",
                        header: myHeaders,
                        handler: function (resp) {
                            $ui.loading(false);
                            var arr = resp.data;
                            var html = arr.replace(/\n|\s|\r/g, "");
                            var li = html.match(/<aclass=\"vodbox\".*?<\/a>/g);
                            for (i in li) {
                                var dli = li[i];
                                $("Video").insert({
                                    indexPath: $indexPath(0, $("Video").data.length),
                                    value: {
                                        img: {
                                            src: dli.match(/data-original="(\S*?)"/)[1]
                                        },
                                        pm: {
                                            text: I(dli.match(/I\(\"(\S*?)\"/)[1])
                                        },
                                        url: dli.match(/href="(\S*?)"/)[1]
                                    }
                                })
                            }

                        }
                    })

                }

            }
        }]
});


function getdata() {
    var type = $cache.get("type");
    $ui.loading(true);
    $http.get({
        url: urlt + type + ".html",
        header: myHeaders,
        handler: function (resp) {
            $ui.loading(false);
            var arr = resp.data;
            var html = arr.replace(/\n|\s|\r/g, "");
            var li = html.match(/<aclass=\"vodbox\".*?<\/a>/g);
            var data = [];
            for (i in li) {
                dli = li[i];
                data.push({
                    img: {
                        src: dli.match(/data-original="(\S*?)"/)[1]
                    },
                    pm: {
                        text: I(dli.match(/I\(\"(\S*?)\"/)[1])
                    },
                    url: dli.match(/href=\"(\S*?)\"/)[1]
                })
            }
            $("Video").data = data;
            $("Video").endRefreshing()
        }
    });
}

function geturl(url, pm) {
    $ui.loading(true);
    $http.get({
        url: urlt + url,
        header: myHeaders,
        handler: function (resp) {
            $ui.loading(false);
            var arr = resp.data;
            var html = arr.replace(/\n|\s|\r/g, "");
            var playurl = html.match(/<iframewidth="100%"height="100%"src="(.*?)"/)[1];
            playurl = playurl.substring(playurl.indexOf("url=") + 4);
            play(playurl, pm)
        }
    })
}

function play(url, mc) {
    $ui.push({
        props: {
            title: mc
        },
        views: [{
            type: "web",
            props: {
                id: "bof",
                url: url,
            },
            layout: $layout.fill
        }]
    })
}

$cache.set("type", channelList[0].id);
$cache.set("pg", 1);
getdata();

function I(r) {
    var n = "";
    for (i = 0; i < r.length; ++i) n += String.fromCharCode(128 ^ r.charCodeAt(i));
    return n
}

async function get_updata() {
    const resp = await $http.get($text.base64Decode("aHR0cHM6Ly9pcGhvbmU4LnZpcC9jb25maWcvd3h6eS5qc29u"));
    if(resp.response.statusCode === 200){
        if (resp.data.version != "1.9") {
            $ui.alert({
                title: "发现新版本 - " + resp.data.version,
                message: resp.data.upexplain,
                actions: [
                    {
                        title: "立即更新",
                        handler: function () {
                            download(resp.data.updata,resp.data.name)
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

function download(url,name) {
    $ui.toast("正在安装中 ...");
    $http.download({
        url: url,
        handler: function (resp) {
            $addin.save({
                name: name,
                data: resp.data,
                handler: function () {
                    $ui.alert({
                        title: "安装完成",
                        message: "\n是否打开？\n" + name,
                        actions: [
                            {
                                title: "打开",
                                handler: function () {
                                    $app.openExtension(name)
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