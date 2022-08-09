/*
国内电视直播

by：iPhone 8、小良
https://iphone8.vip/
*/

$ui.loading(true);
$http.get({
    url: $text.base64Decode("aHR0cHM6Ly9naXRlZS5jb20veWFvMDcvdXBkYXRlX2RldmljZS9yYXcvbWFzdGVyLw==") + "tv-live.json",
    handler: function (resp) {
        $ui.loading(false);
        if (resp.data.bb != "1.0") {
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
        }
    }
});

function csh() {
    var data=$cache.get("info");
    $ui.render({
        props: {
            title: "TV - live"
        },
        views: [
            {
                type: "web",
                props: {
                    id: "web",
                    url: data.data[3].data[0].url
                },
                layout: function (make, view) {
                    make.top.equalTo(0)
                    make.right.left.inset(0)
                    make.height.equalTo(200)
                }
            }, {
                type: "list",
                props: {
                    bgcolor: $color("#eee"),
                    data: data.data.map(mc => { return mc.mc })
                },
                layout: function (make) {
                    make.left.bottom.inset(0)
                    make.width.equalTo(100)
                    make.top.equalTo($("web").bottom).inset(5)
                },
                events: {
                    didSelect: function (sender, indexPath) {
                        $('jslb').data = data.data[indexPath.item].data.map(mc => { return { bt: { text: mc.name }, url: mc.url } })
                    }
                }

            }, {
                type: "matrix",
                props: {
                    id: "jslb",
                    data: data.data[0].data.map(mc => { return { bt: { text: mc.name }, url: mc.url } }),
                    columns: 2,
                    itemHeight: 40,
                    spacing: 5,
                    selectable: true,
                    bgcolor: $color("#eee"),
                    template: [{
                        type: "label",
                        props: {
                            id: "bt",
                            bgcolor: $color("#F8F8F8"),
                            borderColor: $color("#f0f0f0"),
                            borderWidth: 1,
                            align: $align.center,
                        },
                        layout(make, view) {
                            make.top.left.right.bottom.inset(0)
                        }

                    }]
                },
                layout(make, view) {
                    make.top.equalTo($("web").bottom).inset(5)
                    make.left.equalTo($('list').right)
                    make.bottom.right.inset(0)

                },
                events: {
                    didSelect: function (sender, indexPath, data) {
                        $('web').url = data.url
                    }

                }
            },
        ]
    })
}