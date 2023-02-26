/*
2023年1月22日 更新 1.2.0

账号密码10分钟自动更新
重新运行脚本可获取最新ID
本脚本获取的ID均已购买 Shadowrocket（小火箭）

重要告警:
① 请勿在手机设置中登入 (若造成锁机自行承担后果)
② 请勿开启ID二次认证 (登入ID时，选择其他选项，不升级)


by：iPhone 8、小良
https://iphone8.vip/
https://ae85.cn

博客：87xl.cn
*/

const js_name = "Apple ID 获取器"
$ui.loading(true);
$http.get({
    url: $text.base64Decode("aHR0cHM6Ly9pcGhvbmU4LnZpcC9jb25maWcv") + "appleid.json",
    handler: function (resp) {
        $ui.loading(false);
        var info = resp.data;
        if (info.bb != "1.2.0") {
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
                        type: "web",
                        props: {
                            id: "vid",
                            showsProgress: false,
                            scrollEnabled: false
                        },
                        layout: $layout.fill
                    }]
                    , layout: function (make) {
                        make.top.bottom.inset(5)
                        make.right.left.inset(10)
                    }
                },
                ]
            }
        },
        layout: $layout.fill,
    },
    ]

})


function get_data() {
    // var turl = $cache.get("info").turl;
    var turl = 'aHR0cDovLzUxLjE5NS4yMC40Mi9hc3NldHMv';
    var data_j = []
    for (i = 1; i < 7; i++) {
        data_j.push({ vid: { url: $text.base64Decode(turl) + i + ".html" } })
    }
    $("list").data = data_j;
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