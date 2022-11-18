
/*
免费ss 1.6
2022年11月18日 更新

by：iPhone 8、小良
https://iphone8.vip/

博客：87xl.cn
*/


const js_name = "免费ssr节点"
$ui.loading(true);
$http.get({
    url: $text.base64Decode("aHR0cHM6Ly9pUGhvbmU4LnZpcC9jb25maWcvZnJlZS1zcy5qc29u"),
    handler: function (resp) {
        $ui.loading(false);
        if (resp.data.bb != "1.6") {
            $ui.alert({
                title: "温馨提示：",
                message: resp.data.gxsm,
                actions: [
                    {
                        title: "立即更新",
                        handler: function () {
                            updownload(resp.data.updata)
                        }
                    },
                    {
                        title: "关注公众号",
                        handler: function () {
                            $ui.alert({
                                title: "温馨提示",
                                message: "跳转微信会自动复制公众号ID\n请跳转到微信-搜索-公用号-粘贴-关注",
                                actions: [{
                                    title: "跳转微信",
                                    handler: function () {
                                        $clipboard.text = "ae85-cn"
                                        $app.openURL("weixin://")
                                    }
                                }, {
                                    title: "取消"
                                }]
                            })
                        }
                    }, {
                        title: "取消"
                    },
                ]
            });
        } else {
            $cache.set("info", resp.data);
            csh();
            getdata(resp.data.urlt)
        }
    }
});

function csh() {
    $ui.render({
        props: {
            title: js_name,
            id: "ssjm"
        },
        views: [{
            type: "list",
            props: {
                rowHeight: 50,
                template: [{
                    type: "image",
                    props: {
                        id: "lt",
                        radius: 2,
                        bgcolor: $color("white")
                    },
                    layout: function (make, view) {
                        make.left.top.bottom.inset(10);
                        make.width.equalTo(0);
                    }
                }, {
                    type: "label",
                    props: {
                        id: "mc",
                        font: $font("bold", 17),
                        lines: 0
                    },
                    layout: function (make, view) {
                        make.left.equalTo($("lt").right).offset(10);
                        make.top.inset(5);
                    }
                },
                {
                    type: "label",
                    props: {
                        id: "rq",
                        font: $font(15),
                        textColor: $color("#c4c4c4")
                    },
                    layout: function (make) {
                        make.left.equalTo($("mc"));
                        make.top.equalTo($("mc").bottom).inset(3);
                    }
                }, {
                    type: "label",
                    props: {
                        text: ">",
                        id: "geng",
                        font: $font(25),
                        textColor: $color("#c4c4c4")
                    },
                    layout: function (make) {
                        make.right.inset(10);
                        make.top.bottom.inset(10);
                        make.width.equalTo(20)
                    }
                }, {
                    type: "label",
                    props: {
                        id: "ms",
                        align: 2,
                        font: $font(15),
                        textColor: $color("#6c9")
                    },
                    layout: function (make) {
                        make.right.equalTo($("geng").left).inset(10);
                        make.top.bottom.inset(10);
                        make.width.equalTo(60)
                    }
                },]
            },
            layout: function (make) {
                make.top.equalTo(0);
                make.right.left.bottom.inset(0);
            },
            events: {
                didSelect: function (sender, indexPath, data) {
                    $cache.set("url", data.url);
                    $cache.set("img", $qrcode.encode(data.url));
                    if ($app.info.bundleID == "app.cyan.pin") {
                        xzmune()
                    } else {
                        $('ssjm').add(tcjm)
                    }
                }
            }
        }, {
            type: "label",
            props: {
                id: "jzz",
                align: 1,
                font: $font(38),
                text: "加载中···",
                textColor: $color("#E42A00")
            },
            layout: $layout.fill
        }
        ]
    })
}
var tcjm = {
    type: "view",
    props: {
        id: "ewmView",
        radius: 7,
        bgcolor: $color("white"),
        borderWidth: 1,
        borderColor: $color("tint")
    },
    views: [{
        type: "button",
        props: {
            icon: $icon("225", $color("tint"), $size(30, 30)),
            bgcolor: $color("clear")
        },
        layout: function (make) {
            make.left.top.inset(10);
        },
        events: {
            tapped(sender) {
                $("ewmView").remove();
            }
        }
    }, {
        type: "image",
        props: {
            id: "eimg",
            image: $cache.get("img"),
            radius: 5,
            bgcolor: $color("white")
        },
        layout: function (make, view) {
            make.top.inset(50)
            make.centerX.equalTo(view.center)
            make.size.equalTo(250, 250)
        },
        events: {
            tapped(sender) {
                xzmune()
            },
        }
    }, {
        type: "button",
        props: {
            title: "URL"
        },
        layout: function (make, view) {
            make.top.equalTo($('eimg').bottom).inset(10);
            make.centerX.equalTo(view.center)
            make.width.equalTo(60)
        },
        events: {
            tapped(sender) {
                $clipboard.text = $cache.get("url");
                $app.openURL("shadowrocket://");
            },
            longPressed: function (info) {
                yjtj()
                //长按，添加节点
            }
        }
    },],
    layout: function (make, view) {
        make.top.inset(65)
        make.left.right.inset(20)
        make.height.equalTo(350)
    }
}

function getdata(turl) {
    $http.get({
        url: $text.base64Decode(turl),
        handler: function (resp) {
            var html = resp.data;
            var json = $text.base64Decode(html);
            json = JSON.parse(json)
            var riq = json.msg.split("更新时间: ")[1]
            json = json.data
            var data = []

            for (i in json) {
                var arr = json[i]
                var ms = Math.floor(Math.random() * (180 - 2 + 1)) + 2;
                if (arr.indexOf("vmess://") != -1) {
                    var base = arr.split("vmess://")[1]
                    var jm = JSON.parse($text.base64Decode(base));
                    jm.ps = jm.ps.replace(/→|openitsub.com/g, "")
                    var name = jm.ps
                    var jb = $text.base64Encode(JSON.stringify(jm));
                    var url = "vmess://" + jb
                    data.push({
                        mc: { text: name },
                        rq: { text: riq },
                        ms: { text: ms + "ms" },
                        url: url
                    })

                } else {
                    var name = arr.split("#")[1]
                    data.push({
                        mc: { text: name },
                        rq: { text: riq },
                        ms: { text: ms + "ms" },
                        url: arr
                    })
                }
            }
            $("list").data = data
            $("list").endFetchingMore()
            $('jzz').hidden = true
        }
    });
}



function xzmune() {
    var img = $cache.get("img")
    var url = $cache.get("url")
    $ui.menu({
        items: ["分享二维码", "保存到相册", "复制ss链接", "添加到小火箭", "一键加至小火箭"],
        handler: function (title, idx) {
            switch (idx) {
                case 0:
                    $share.sheet(["sample.png", img])
                    break
                case 1:
                    $photo.save({
                        image: img,
                        handler: function (success) {
                            $ui.toast('已保存到相册!');
                        }
                    })
                    break
                case 2:
                    $clipboard.text = url;
                    $ui.toast('复制成功!');
                    break
                case 3:
                    $clipboard.text = url;
                    $app.openURL("shadowrocket://");
                    break
                case 4:
                    yjtj()
                    break
            }
        }
    });

}

function yjtj() {
    var data = $('list').data
    var ss = ""
    for (i in data) {
        ss = ss + data[i].url
    }
    $clipboard.text = ss;
    $app.openURL("shadowrocket://");
}