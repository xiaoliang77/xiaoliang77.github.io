
var channelList = [
    { "name": "国产", "id": "/type/1" },{ "name": "日本", "id": "/type/2" },{ "name": "韩国", "id": "/type/3" },{ "name": "欧美", "id": "/type/4" },{ "name": "三级", "id": "/type/5" },{ "name": "动漫", "id": "/type/6" }];
var myHeaders = {
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
};
var urlt = $text.base64Decode("aHR0cDovLzExOTQ0MS5jb20=");;
$ui.render({
    props: {
        title: "无限资源 1.8"
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
                    console.log(urlt + type + "-" + page + ".html");
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
                                            text: dli.match(/I\(\"(\S*?)\"/)[1]
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
                        text: dli.match(/I\(\"(\S*?)\"/)[1]
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
