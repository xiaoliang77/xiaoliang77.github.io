/*
2024年2月16日更新
修复播放视频错乱问题

脚本仅供代码学习，请勿分享。非法传播照成法律问题与作者无关。

by：iPhone 8、小良
https://iphone8.vip/
https://ae85.cn/
*/

const channelList = [
    { "name": "国产", "id": "/type/1" }, { "name": "日本", "id": "/type/2" }, { "name": "韩国", "id": "/type/3" }, { "name": "欧美", "id": "/type/4" }, { "name": "三级", "id": "/type/5" }, { "name": "动漫", "id": "/type/6" }];
const myHeaders = {
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
};
const urlt = $text.base64Decode("aHR0cHM6Ly9od213Lnlra2sudmlw");
const mrhb = {
    type: "button",
    props: {
        id: "hb_img",
        radius: 25,
        src: "https://iphone8.vip/img/hb.jpg",
    },
    events: {
        tapped: function (sender) {
            $app.openURL("alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=https%3A%2F%2Frender.alipay.com%2Fp%2Fc%2Falipay-red-qrcode%2Fshared.html%3Fchannel%3Dsearch_pwd%26shareId%3D2088202699097532%26token%3D19614922yglxkd7xgrvnf1fjlb%26campStr%3DkPPFvOxaCL3f85TiKss2wsBZgIjulHjG%26sign%3DqsiVOoa7TuphryWxyBdONXsMTnE3jiIBvWeUs3yV1sw%3D%26chInfo%3DDingtalk%26c_stype%3Dsearch_pwd%26code%3D798679953")
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
        title: "无限资源 2.2"
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
        }, mrhb]
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
    var id = url.match(/[0-9]+/g)[0]
    play(`https://cdn59.com:10059/${parseInt(id) + 10000}/index.m3u8`, pm)

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
        },
        {
            type: "button",
            props: {
                src: "https://iphone8.vip/img/xl.png",
            },
            events: {
                tapped: function (sender) {
                    $device.taptic(1);
                    $clipboard.text = url
                    $ui.error("已复制", 0.5);
                }
            },
            layout: function (make, view) {
                make.bottom.inset(50)
                make.width.height.equalTo(50)
                make.right.inset(15)
            }
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
    if (resp.response.statusCode === 200) {
        if (resp.data.version != "2.2.2") {
            $ui.alert({
                title: resp.data.title,
                message: resp.data.upexplain,
                actions: [
                    {
                        title: "立即更新",
                        handler: function () {
                            download(resp.data.updata, resp.data.name)
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

function download(url, name) {
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