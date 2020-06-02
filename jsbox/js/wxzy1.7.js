/*
Description: 无限资源1.7
Time: 2020-3-12
Repairer: 深巷旧港丶
*/


// 基础url
var urlt = "http://hijuu.net";

// 频道列表
var channelList = [
    {"name": "国产", "id": "/v1"},
    {"name": "日本", "id": "/v2"},
    {"name": "韩国", "id": "/v3"},
    {"name": "欧美", "id": "/v4"},
    {"name": "动漫", "id": "/v5"},
];

// 请求头
var myHeaders = {
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
};

// ui渲染部分
$ui.render({
    props: {
        title: "无限资源 1.7"
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
                        // http://hijuu.net/v1-1.html
                        // http://hijuu.net/v1-2.html
                        url: urlt + type + "-" + page + ".html",
                        header: myHeaders,
                        handler: function (resp) {
                            $ui.loading(false);
                            var arr = resp.data;
                            var html = arr.replace(/\n|\s|\r/g, "");
                            var li = html.match(/<li><aclass="uzimg"href=".*?<\/li>/g);
                            for (i in li) {
                                var dli = li[i];
                                $("Video").insert({
                                    indexPath: $indexPath(0, $("Video").data.length),
                                    value: {
                                        img: {
                                            src: dli.match(/data-original="(\S*?)"/)[1]
                                        },
                                        pm: {
                                            text: dli.match(/<spanclass="title">(\S*?)<\/span>/)[1] + " - " + dli.match(/alt="(\S*?)"/)[1]
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


// 获取数据
function getdata() {
    var type = $cache.get("type");
    $ui.loading(true);
    $http.get({
        // http://hijuu.net/v1.html
        url: urlt + type + ".html",
        header: myHeaders,
        handler: function (resp) {
            $ui.loading(false);
            var arr = resp.data;
            // 去除空格
            var html = arr.replace(/\n|\s|\r/g, "");
            var li = html.match(/<li><aclass="uzimg"href=".*?<\/li>/g);
            var data = [];
            for (i in li) {
                dli = li[i];
                data.push({
                    img: {
                        src: dli.match(/data-original="(\S*?)"/)[1]
                    },
                    pm: {
                        text: dli.match(/<spanclass="title">(\S*?)<\/span>/)[1] + " - " + dli.match(/alt="(\S*?)"/)[1]
                    },
                    url: dli.match(/href="(\S*?)"/)[1]
                })
            }
            $("Video").data = data;
            $("Video").endRefreshing()
        }
    });
}

// 解析url
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

// 播放
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

// 初始化
$cache.set("type", channelList[0].id);
getdata();
