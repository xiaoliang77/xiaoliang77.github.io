/*
2023年12月9日 更新

账号密码24小时自动更新
重新运行脚本可获取最新ID
本脚本获取的ID均已购买 Shadowrocket（小火箭）

重要告警:
① 请勿在手机设置中登入 (若造成锁机自行承担后果)
② 请勿开启ID二次认证 (登入ID时，选择其他选项，不升级)


by：iPhone 8、小良
https://iphone8.vip/
https://ae85.cn/

博客：87xl.cn
*/
var myHeaders = {
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    "Accept": "application/json, text/javascript, */*; q=0.01"
};
const js_name = "Apple ID 获取器"
$ui.loading(true);
$http.get({
    url: $text.base64Decode("aHR0cHM6Ly9pcGhvbmU4LnZpcC9jb25maWcv") + "appleid.json",
    handler: function (resp) {
        $ui.loading(false);
        var info = resp.data;
        if (info.bb != "1.5") {
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
                        title: "立即更新",
                        handler: function () {
                            download(info.updata)
                        }
                    }
                ]
            });
        } else {
            $cache.set("info", info);
            $ui.alert({ title: info.zyts, actions: [{ title: "知道了" }], message: info.sm })
            get_data()
        }
    }
});


$ui.render({
    props: {
        title: js_name,
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
                            id: "country",
                            font: $font(15),
                        },
                        layout: function (make, view) {
                            make.top.inset(16)
                            make.left.equalTo($("zt_wz").right).inset(15)
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
    const resp = await $http.get({ url: $text.base64Decode("turl"), header: myHeaders });
    const status = ['正在检测', '状态正常', '状态异常', '等待检测'];
    const arr = resp.data
    var data_j = []
    for (i in arr) {
        const zh = arr[i].username
        const mi = arr[i].password
        const zt = status[arr[i].status]
        const country = arr[i].country
        const sec = zt == "状态正常" ? "#0f0" : "#ddd";
        const yc = zt == "状态正常" ? false : true;
        const sj = arr[i].time
        const n = parseInt(i) + 1
        data_j.push({
            zbiao: { text: "ID " + n },
            zt_t: { textColor: $color(sec) },
            zt_wz: { text: zt, textColor: $color(sec) },
            country: { text: country },
            zh: { text: "账号：" + zh },
            mi: { text: "密码：" + mi },
            btn_z: { src: zh, hidden: yc },
            btn_m: { src: mi, hidden: yc },
            rq: { text: sj },
        })
    }
    $("list").data = await data_j;
}


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