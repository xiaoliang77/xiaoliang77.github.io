
/*
免费ss 1.1
2019-2-23 更新：
修复加载无响应问题！

by：iPhone 8、小良
http://ae85.cn/

博客：87xl.cn
*/

var timer, count = 1;
$ui.loading(true);
$http.get({
    url: $text.base64Decode("aHR0cHM6Ly9naXRlZS5jb20veWFvMDcvc3MvcmF3L21hc3Rlci8=") + "free-ss.json",
    handler: function (resp) {
        $ui.loading(false);
        if (resp.data.bb != "3.2") {
            $ui.alert({
                title: "温馨提示：",
                message: resp.data.gxsm,
                actions: [
                    {
                        title: "访问官网",
                        handler: function () {
                            $app.openURL(resp.data.gw);
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
                    }
                ]
            });
        } else {
            $cache.set("info", resp.data);
            csh();
            $('web').url = $text.base64Decode(resp.data.ssurl)
            xhrw()
        }
    }
});

function xhrw() {
    timer = $timer.schedule({
        interval: 1,
        handler: function () {
            zhur()
        }
    });
}

function csh() {
    $ui.render({
        props: {
            title: "ss 1.1",
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
                        make.width.equalTo(45);
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
                        textColor: $color("blue")
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
        },
        {
            type: "web",
            props: {
                id: "web",
            },
            layout: function (make, view) {
                make.top.equalTo(0)
                make.right.left.inset(0)
                make.height.equalTo(1)
            }
        },
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
                $app.openURL($cache.get("url"));
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

function zhur() {
    var info = $cache.get("info")
    var webView = $("web")
    var gj = info.gj
    webView.eval({
        script: `var html = document.getElementsByTagName("tbody")[1].innerHTML; window.name = html`,
        handler: function (result, error) {
            $console.info(result);
            if (count == 3) {
                $("web").url = $text.base64Decode(info.ssurl)
            }
            count++;
            if (result.code == 4) {
                //alert("请求超时\n确定重新加载！")
                //timer.invalidate()
            } else {
                if (result.indexOf("data") == -1) {
                    timer.invalidate()
                    var text = result.replace(/\n|\s|\r/g, "")
                    var shu = text.match(/<trrole=\"row\"(\S*?)<\/tr>/g);
                    var data = []
                    for (i in shu) {
                        var add = shu[i].match(/<td>(\S*?)<\/td>/g);
                        for (i in add) {
                            add[i] = add[i].replace(/<td>|<\/td>/g, "")
                        }
                        if (add[0].indexOf("/") == -1) {
                            add.unshift("10/10/10/10")
                        }
                        var f = add[3]
                        var fy = f.match(/none|table|rc4|salsa20|chacha20|xchacha20|aes-|bf-cfb|camellia-|-cbf|-gcm/)
                        var s, m
                        if (fy) {
                            s = add[3]
                            m = add[4]
                        } else {
                            s = add[4]
                            m = add[3]
                        }
                        var ms = Math.floor(Math.random() * (80 - 2 + 1)) + 2;
                        data.push({
                            lt: { src: `${$text.base64Decode(info.img)}${gj[add[6]]}_flag.png` },
                            mc: { text: add[1] },
                            rq: { text: add[5] },
                            ms: { text: ms + "ms" },
                            url: "ss://" + $text.base64Encode(`${s}:${m}@${add[1]}:${add[2]}`)
                        })
                    }
                    $("list").data = data
                    $("list").endFetchingMore()
                    $('jzz').hidden = true
                }
            }
        }
    })
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
                    $app.openURL("shadowrocket://add/" + url);
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
    $app.openURL("shadowrocket://add/" + ss);
}
