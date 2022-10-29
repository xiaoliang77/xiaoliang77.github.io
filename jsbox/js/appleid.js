/*
2022年10月29日 更新

账号密码24小时自动更新
重新运行脚本可获取最新ID

重要告警:
① 请勿在手机设置中登入 (若造成锁机自行承担后果)
② 请勿开启ID二次认证 (登入ID时，选择其他选项，不升级)


by：iPhone 8、小良
https://iphone8.vip/

博客：87xl.cn
*/


$ui.loading(true);
$http.get({
    url: $text.base64Decode("aHR0cHM6Ly9pcGhvbmU4LnZpcC9jb25maWcv") + "appleid.json",
    handler: function (resp) {
        $ui.loading(false);
        var info = resp.data;
        if (info.bb != "1.0.0") {
            $ui.alert({
                title: "温馨提示：",
                message: info.gxsm,
                actions: [
                    {
                        title: "访问官网",
                        handler: function () {
                            $app.openURL(info.gw);
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
            $cache.set("info", info);
            $ui.alert({ title: info.zyts, actions: [{ title: "知道了" }], message: info.sm})
            get_data()
        }
    }
});


$ui.render({
    props: {
        title: "Apple ID 获取器",
    },
    views: [{
        type: "list",
        props: {
            rowHeight: 170,
            style: 0,
            separatorHidden: true,
            bgcolor: $color("#dddddd"),
            template: {
                props: {
                    bgcolor: $color("#dddddd"),
                }, views: [{
                    type: "view",
                    props: {
                        id: "VFView",
                        bgcolor: $color("#fff"),
                        radius: 7,
                    },
                    views: [{
                        type: "label",
                        props: {
                            id: "zbiao",
                            font: $font("bold", 18),
                        },
                        layout: function (make, view) {
                            make.top.inset(15)
                            make.left.inset(10)
                        }
                    }, {
                        type: "label",
                        props: {
                            id: "zt_t",
                            font: $font("bold", 55),
                            textColor: $color("red"),
                            text: "·",
                        },
                        layout: function (make, view) {
                            make.top.inset(5)
                            make.size.equalTo(40, 40)
                            make.left.equalTo($("zbiao").right)

                        }
                    }, {
                        type: "label",
                        props: {
                            id: "zt_wz",
                            font: $font(15),
                            textColor: $color("#0f0")
                        },
                        layout: function (make, view) {
                            make.top.inset(16)
                            make.left.equalTo($("zt_t").right).inset(-15)
                        }
                    }, {
                        type: "label",
                        props: {
                            id: "rq",
                            font: $font(15),
                            textColor: $color("red"),
                            align: $align.center
                        },
                        layout: function (make, view) {
                            make.right.inset(10)
                            make.top.inset(15)
                        }
                    }, {
                        type: "divider",
                        props: {
                            id: "fgx",
                            bgcolor: $color("#ddd")
                        },
                        layout: function (make) {
                            make.left.right.inset(5)
                            make.top.equalTo(50)
                            make.height.equalTo(1)
                        }
                    }, {
                        type: "label",
                        props: {
                            id: "zh",
                            font: $font("bold", 18),
                        },
                        layout: function (make, view) {
                            make.top.equalTo($("fgx").bottom).inset(20)
                            make.left.inset(10)
                        }
                    }, {
                        type: "button",
                        props: {
                            title: "复制",
                            id: "btn_z"
                        },
                        layout: function (make, view) {
                            make.right.inset(10)
                            make.top.equalTo($("fgx").bottom).inset(15)
                            make.width.equalTo(57)
                            make.height.equalTo(30)

                        },
                        events: {
                            tapped: function (sender) {
                                $clipboard.text = sender.src
                                $ui.toast("账号 已复制")
                                $device.taptic(2)
                            }
                        }
                    }, {
                        type: "label",
                        props: {
                            id: "mi",
                            font: $font("bold", 18),
                        },
                        layout: function (make, view) {
                            make.top.equalTo($("zh").bottom).inset(20)
                            make.left.inset(10)
                        }
                    }, {
                        type: "button",
                        props: {
                            title: "复制",
                            id: "btn_m"
                        },
                        layout: function (make, view) {
                            make.right.inset(10)
                            make.top.equalTo($("btn_z").bottom).inset(15)
                            make.width.equalTo(57)
                            make.height.equalTo(30)

                        },
                        events: {
                            tapped: function (sender) {
                                $clipboard.text = sender.src
                                $ui.toast("密码 已复制", 1)
                                $device.taptic(2)
                            }
                        }
                    },]
                    , layout: function (make) {
                        make.top.bottom.inset(5)
                        make.right.left.inset(10)
                    }
                }

                ]
            }
        },
        layout: $layout.fill,
    },
    ]

})


async function get_data() {
    var turl = $cache.get("info").turl;
    var data = []
    for (i = 1; i < 7; i++) {
        const resp = await $http.get($text.base64Decode(turl)  + i + ".html");
        data.push(cl_hd(resp))
    }
    $("list").data = await data
}

function cl_hd(params) {
    var text = params.data.replace(/\n|\s|\r/g, "")
    var shu = text.match(/class=\"val\">(\S*?)<\/div>/g)
    var zh = shu[0].match(/value=\"(\S*?)\"/)[1]
    var mi = shu[1].match(/value=\"(\S*?)\"/)[1]
    var zt = shu[2].match(/value=\"(\S*?)\"/)[1]
    var sj = params.data.match(/inputVal\">(.*?)<\/div>/)[1]
    var x = text.match(/bage00(\S*?)<\/div>/)[1]
    var sec = zt == "可用" ? "#0f0" : "#ddd";
    var yc = zt == "可用" ? false : true;
    const data = {
        zbiao: { text: "ID " + x },
        zt_t: { textColor: $color(sec) },
        zt_wz: { text: zt, textColor: $color(sec) },
        zh: { text: "账号：" + zh },
        mi: { text: "密码：" + mi },
        btn_z: { src: zh, hidden: yc },
        btn_m: { src: mi, hidden: yc },
        rq: { text: sj + " 更新" },
    }
    return data;
}

