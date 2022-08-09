/*
2022年5月31日 修复更新
更新：修复配置文件，如果报错，请将你的jsbox升级到2.0以上版本。

by：iPhone 8、小良
https://iphone8.vip/

博客：87xl.cn
*/

var appid = $app.info.bundleID;
var appbb = $app.info.version;
if (appid == "app.cyan.pin") {
    $ui.alert("暂不支持Pin软件运行！");
    return;
} else {
    $app.minSDKVer = "2.0.0"
}
var gw = "https://iphone8.vip/"
$ui.loading(true);
$http.get({
    url: $text.base64Decode("aHR0cHM6Ly9hZTg1LmNuL2NvbmZpZy8=") + "saishi.json",
    handler: function (resp) {
        $ui.loading(false);
        var info = resp.data;
        if (info.bb != "1.6.1") {
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
            $cache.set("info", info);
            tcgg(info.gg)
            getdata()
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

$ui.render({
    props: {
        title: "赛事直播1.6.1",
        //bgcolor: $color("gray")
    },
    views: [{
        type: "list",
        props: {
            rowHeight: 180,
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
                            font: $font("bold", 17),
                            align: $align.center
                        },
                        layout: function (make, view) {
                            make.centerX.equalTo(view.center)
                            make.top.inset(21)
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
                            make.top.equalTo($("sais").bottom).inset(10)

                        }

                    },
                    {
                        type: "label",
                        props: {
                            id: "zd1",
                            font: $font(15),
                            //textColor: $color("gray"),
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
                            // textColor: $color("gray"),
                            align: $align.center
                        },
                        layout: function (make) {
                            make.right.equalTo(0)
                            make.top.equalTo($("lt2").bottom).inset(5)
                            make.width.equalTo(100)
                        }
                    }, {
                        type: "divider",
                        props: {
                            id: "fgx",
                            bgcolor: $color("#ddd")
                        },
                        layout: function (make) {
                            make.left.right.inset(5)
                            make.top.equalTo($("zd2").bottom).inset(10)
                            make.height.equalTo(1)
                        }
                    }, {
                        type: "label",
                        props: {
                            id: "zb",
                            font: $font("bold", 18),
                            textColor: $color("#D35400"),
                            align: $align.center,
                            text: "主播"
                        },
                        layout: function (make) {
                            make.left.inset(15)
                            make.top.equalTo($("fgx").bottom).inset(30)
                            make.width.equalTo(40)
                        }
                    }, {
                        type: "matrix",
                        props: {
                            id: "cd",
                            itemHeight: 40,
                            columns: 4,
                            spacing: 5,
                            template: [
                                {
                                    type: "image",
                                    props: {
                                        id: "img",
                                        radius: 20
                                    },
                                    layout: function (make, view) {
                                        make.top.inset(0);
                                        make.centerX.equalTo(view.center);
                                        make.height.width.equalTo(40);
                                    }
                                },
                                {
                                    type: "label",
                                    props: {
                                        id: "pm",
                                        align: $align.center,
                                        textColor: $color("gray"),
                                        font: $font(12),

                                    },
                                    layout: function (make, view) {
                                        make.top.equalTo($("img").bottom).offset(8);
                                        make.right.left.inset(5);
                                    }
                                },
                                {
                                    type: "image",
                                    props: {
                                        id: "ztai",
                                    },
                                    layout: function (make, view) {
                                        make.bottom.equalTo($("img").bottom).offset(8);;
                                        make.right.left.inset(8);
                                        make.height.equalTo(15)
                                    }
                                },
                            ]
                        },
                        layout: function (make) {
                            make.top.equalTo($("fgx").bottom).inset(5);
                            make.right.inset(10);
                            make.left.equalTo($("zb").right).inset(5);
                            make.height.equalTo(155);
                        },
                        events: {
                            didSelect: function (sender, indexPath, data) {
                                getvideo(data.id)
                            }
                        }
                    }]
                    , layout: function (make) {
                        make.top.bottom.inset(5)
                        make.right.left.inset(10)
                    }
                }


                ]
            }
        },
        layout: $layout.fill,
    }]

})

$("list").data = [{
    lt1: { src: gw + "img/xl.png" },
    lt2: { src: gw + "img/xiaoliang.png" },
    sais: { text: "数据加载中···" },
    rq: { text: "2022-5-31 更新" },
    zd1: { text: "JSBox" },
    zd2: { text: "请稍后" },
    url: "https://iphone8.vip/",
    cd: { data: [{ img: { src: gw + "img/xiaoliang.png" }, pm: { text: "如果" }, ztai: { src: gw + "jsbox/img/zbzt_1.png" } }, { img: { src: gw + "img/xiaoliang.png" }, pm: { text: "长时间" }, ztai: { src: gw + "jsbox/img/zbzt_1.png" } }, { img: { src: gw + "img/xiaoliang.png" }, pm: { text: "未加载" }, ztai: { src: gw + "jsbox/img/zbzt_1.png" } }, { img: { src: gw + "img/xiaoliang.png" }, pm: { text: "请反馈" }, ztai: { src: gw + "jsbox/img/zbzt_1.png" } }] }
}]


function getdata() {
    var turl = $cache.get("info").turl;
    $http.get({
        url: $text.base64Decode(turl) + "match_all.json",
        header: {
            "User-Agent": "LiveApp/1.0 (iPhone; iOS 13.5; Scale/3.00)",
        },
        handler: function (resp) {
            var json = resp.data.data;
            var data = [];
            for (i in json) {
                tarr = json[i].data
                if (!tarr == "") {
                    for (a in tarr) {
                        var zarr = tarr[a].list
                        var zbdata = []
                        for (z in zarr) {
                            var zb = zarr[z]
                            zbdata.push({
                                img: { src: zb.head_pic },
                                pm: { text: zb.nickname },
                                ztai: { src: `https://iphone8.vip/jsbox/img/zbzt_${zb.a_status}.png` },
                                id: zb.room_num
                            })
                        }
                        var ss = tarr[a]
                        data.push({
                            lt1: { src: ss.home_logo },
                            lt2: { src: ss.visiting_logo },
                            sais: { text: ss.title },
                            rq: { text: ss.time },
                            zd1: { text: ss.home_name },
                            zd2: { text: ss.visiting_name },
                            cd: { data: zbdata }
                        })
                    }
                }
            }
            $("list").data = data
            $("list").endRefreshing();
        }
    });

}

function getvideo(id) {
    var turl = $cache.get("info").turl;
    $http.get({
        url: $text.base64Decode(turl) + "room/" + id + ".json",
        header: {
            "User-Agent": "LiveApp/1.0 (iPhone; iOS 13.5; Scale/3.00)",
        },
        handler: function (resp) {
            var url = resp.data.data.room_info.m3u8_hd;
            if (url) {
                playvideo(url)
            } else {
                $ui.alert("主播已离开");
            }
        }
    });
}

function playvideo(playurl) {
    const frameworks = ["AVFoundation", "AVKit"];
    frameworks.forEach(name => {
        $objc("NSBundle").$bundleWithPath(`/System/Library/Frameworks/${name}.framework`).$load();
    });

    const gravities = {
        resize: "AVLayerVideoGravityResize",
        resizeAspect: "AVLayerVideoGravityResizeAspect",
        resizeAspectFill: "AVLayerVideoGravityResizeAspectFill",
    }

    function play(src, {
        showsPlaybackControls = true,
        videoGravity = "resizeAspect",
        allowsPictureInPicturePlayback = true,
        updatesNowPlayingInfoCenter = true,
        entersFullScreenWhenPlaybackBegins = false,
        exitsFullScreenWhenPlaybackEnds = false,
    } = {}) {

        const url = (() => {
            if (/^(http|https):\/\//i.test(src)) {
                return $objc("NSURL").$URLWithString(src);
            } else {
                return $objc("NSURL").$fileURLWithPath($file.absolutePath(src));
            }
        })();

        const player = $objc("AVPlayer").$playerWithURL(url);
        player.$play();

        const playerVC = $objc("AVPlayerViewController").$new();
        playerVC.$setPlayer(player);
        playerVC.$setShowsPlaybackControls(showsPlaybackControls);
        playerVC.$setVideoGravity(gravities[videoGravity]);
        playerVC.$setAllowsPictureInPicturePlayback(allowsPictureInPicturePlayback);
        playerVC.$setUpdatesNowPlayingInfoCenter(updatesNowPlayingInfoCenter);
        playerVC.$setEntersFullScreenWhenPlaybackBegins(entersFullScreenWhenPlaybackBegins);
        playerVC.$setExitsFullScreenWhenPlaybackEnds(exitsFullScreenWhenPlaybackEnds);

        const rootVC = $ui.controller.ocValue();
        rootVC.$presentViewController_animated_completion(playerVC, true, null);
    }

    exports.play = play;
    // Example (http/https, or local path)
    const src = "";
    const options = {
        showsPlaybackControls: true,
        videoGravity: "resizeAspect", // resize, resizeAspectFill
        allowsPictureInPicturePlayback: true,
        updatesNowPlayingInfoCenter: true,
        entersFullScreenWhenPlaybackBegins: false,
        exitsFullScreenWhenPlaybackEnds: false,
    }

    play(playurl, options);
}