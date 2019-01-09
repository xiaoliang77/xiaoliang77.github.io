/*
2019年1月8日 修复更新
更新：修复部分不能播放问题

by：iPhone 8、小良
http://ae85.cn/

*/

$ui.loading(true);
$http.get({
    url: $text.base64Decode("aHR0cHM6Ly9naXRlZS5jb20veWFvMDcvdXBkYXRlX2RldmljZS9yYXcvbWFzdGVyLw==") + "saishi.json",
    handler: function (resp) {
        $ui.loading(false);
        if (resp.data.bb != "1.4") {
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
            tcgg(resp.data.gg)
            $ui.render({
                props: {
                    title: "赛事直播1.4"
                },
                views: [{
                    type: "list",
                    props: {
                        rowHeight: 80,
                        template: [{
                            type: "image",
                            props: {
                                id: "lt1",
                                radius: 7,
                                bgcolor: $color("white")
                            },
                            layout: function (make, view) {
                                make.top.inset(10)
                                make.left.inset(30)
                                make.size.equalTo(40, 40)

                            }
                        }, {
                            type: "image",
                            props: {
                                id: "lt2",
                                radius: 7,
                                bgcolor: $color("white")
                            },
                            layout: function (make, view) {
                                make.top.inset(10)
                                make.right.inset(30)
                                make.size.equalTo(40, 40)
                            }
                        },
                        {
                            type: "label",
                            props: {
                                id: "sais",
                                font: $font("bold", 16),
                                align: $align.center
                            },
                            layout: function (make, view) {
                                make.centerX.equalTo(view.center)
                                make.top.inset(10)
                                make.width.equalTo(200)

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
                                make.centerX.equalTo(view.center)
                                make.top.equalTo($("sais").bottom).inset(5)

                            }
                        }, {
                            type: "label",
                            props: {
                                id: "zt",
                                font: $font(15),
                                textColor: $color("#c4c4c4c"),
                                align: $align.center
                            },
                            layout: function (make, view) {
                                make.centerX.equalTo(view.center)
                                make.top.equalTo($("rq").bottom).inset(5)

                            }
                        },
                        {
                            type: "label",
                            props: {
                                id: "zd1",
                                font: $font(15),
                                textColor: $color("gray"),
                                align: $align.center
                            },
                            layout: function (make) {
                                make.left.equalTo(0)
                                make.top.equalTo($("lt1").bottom).inset(5)
                                make.width.equalTo(100)
                            }
                        },
                        {
                            type: "label",
                            props: {
                                id: "zd2",
                                font: $font(15),
                                textColor: $color("gray"),
                                align: $align.center
                            },
                            layout: function (make) {
                                make.right.equalTo(0)
                                make.top.equalTo($("lt2").bottom).inset(5)
                                make.width.equalTo(100)
                            }
                        }

                        ]
                    },
                    layout: $layout.fill,
                    events: {
                        didSelect: function (sender, indexPath, data) {
                            getzb(data.id, data.sais.text)
                        }
                    }
                }]

            })
            getlb()
        }
    }
});
function tcgg(gg) {
    if ($file.exists("gg.txt")) {
        var file = $file.read("gg.txt").string;
        if (file != gg) {
            xrwj(gg);
        }
    } else {
        xrwj(gg);
    }
}
function xrwj(nr) {
    $ui.alert(nr);
    $file.write({
        data: $data({ string: nr }),
        path: "gg.txt"
    });
}
function play(url, mc) {
    $ui.push({
        props: {
            title: mc
        },
        views: [{
            type: "web",
            props: {
                id: "bo",
                url: url,
            },
            layout: $layout.fill
        }]
    })
}

function getlb() {
    $ui.loading(true)
    $http.get({
        url: $text.base64Decode($cache.get("info").turl) + "/Api/V1_5/Zhibo/anchor?v=ios_1.5.6",
        header: {
            "User-Agent": "PlayBall_IOS/1.0 (iPhone; iOS 12.0; Scale/3.00)"
        },
        handler: function (resp) {
            $ui.loading(false)
            var html = resp.data.data.zhibo_data
            var data = []
            for (a in html) {
                var t1 = html[a].data
                for (i in t1) {
                    var sjian = format(t1[i].start_time)
                    data.push({
                        lt1: {
                            src: t1[i].home_logo
                        },
                        lt2: {
                            src: t1[i].visit_logo
                        },
                        sais: { text: t1[i].name },
                        rq: { text: sjian },
                        zt: { text: t1[i].status_ch },
                        zd1: { text: t1[i].home_team },
                        zd2: { text: t1[i].visit_team },
                        id: t1[i].zhibo_id
                    })
                }
            }
            $("list").data = data

        }
    })
}
function format(sjc) {
    var shi = parseInt(sjc) * 1000
    var time = new Date(shi);
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    return m + "月" + d + "日" + " " + h + ":" + mm
}

function getzb(id, mc) {
    $ui.loading(true)
    $http.get({
        url: $text.base64Decode($cache.get("info").turl) + "/Api/V1_5/Zhibo/zhiboDetail/zhibo_id/"+id+"?v=ios_1.5.6",
        header: {
            "User-Agent": "PlayBall_IOS/1.0 (iPhone; iOS 12.0; Scale/3.00)"
        },
        handler: function (resp) {
            $ui.loading(false)
            var html = resp.data.data.zhibo_info.url
            
            if (html) {
                $ui.menu({
                    items: html.map(add => { return add.name }),
                    handler: function (title, idx) {

                        play(html[idx].url, mc)
                    }
                });
            } else {
                alert("暂无该赛事直播信息")
            }
        }
    })
}
