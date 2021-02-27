/*
2021年2月27日 修复更新

by：iPhone 8、小良
http://ae85.cn/
*/
const gzgzh = {
    title: "关注公众号",
    handler: function () {
        $ui.alert({
            title: "温馨提示",
            message: "跳转微信会自动复制公众号ID\n请跳转到微信-搜索-公用号-粘贴-关注",
            actions: [
                {
                    title: "跳转微信",
                    handler: function () {
                        $clipboard.text = "ae85-cn";
                        $app.openURL("weixin://");
                    }
                },
                {
                    title: "取消"
                }
            ]
        });
    }
};

const base64 =
    "aHR0cHM6Ly8naXRlZS5jb20veWFvMDcvdXBkYXRlX2RldmljZS8yYXcvbWFzdGVyL2RvdXlpbi5qc28u";
$ui.loading(true);
$http.get({
    url: $text.base64Decode(base64.replace(/8/g, "9")),
    header: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1"
    },
    handler: function (resp) {
        $ui.loading(false);
        if (resp.response.statusCode == "200") {
            var info = resp.data.guonei;
            if (info.bb != "1.4") {
                $ui.alert({
                    title: "温馨提示",
                    message: info.gxsm,
                    actions: [
                        {
                            title: "访问官网",
                            handler: function () {
                                $app.openURL(info.gw);
                            }
                        },
                        gzgzh
                    ]
                });
            } else {
                $cache.set("info", info);
                Pgetdata();
            }
        } else {
            $ui.alert("加载失败");
        }
    }
});

$cache.set("pg", 1);
$ui.render({
    props: {
        title: "抖yin国内版 1.4",
    },
    views: [
        {
            type: "matrix",
            props: {
                id: "PVideo",
                itemHeight: 200,
                columns: 3,
                spacing: 0,
                bgcolor: $color("black"),
                template: [
                    {
                        type: "image",
                        props: {
                            id: "img",
                        },
                        layout: function (make, view) {
                            make.centerX.equalTo(view.super);
                            make.top.bottom.right.left.inset(1);
                        }
                    }
                ]
            },
            layout: function (make) {
                make.top.bottom.left.right.inset(0);
            },
            events: {
                didSelect: function (sender, indexPath, data) {
                    getvideo(data.url)
                },
                didReachBottom: function (sender) {
                    sender.endFetchingMore();
                    var page = $cache.get("pg") + 1;
                    $cache.set("pg", page);
                    Pgetdata();
                }
            }
        },{
            type: "label",
            props: {
                id: "jzz",
                font: $font("bold", 40),
                textColor: $color("#fff"),
                align: $align.center,
                text:"加载中···"
            },
            layout: function (make, view) {
                make.centerX.centerY.equalTo(view.center)
            }
        },
    ]
});


function Pgetdata() {
    var info = $cache.get("info");
    var pg = $cache.get("pg");
    $http.get({
        url: info.turl + "/video?page=" + pg,
        header: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1"
        },
        handler: resp => {
            $('jzz').hidden = true;
            var text = resp.data.replace(/\n|\r/g, "");
            var shu = text.match(/<div class=\"box-shadow card\">(\s*.*?\S*)<\/div>/g)
            var data = $("PVideo").data;
            for (i in shu) {
                var li = shu[i];
                var img = li.match(/src=\"(\s*.*?\S*)\"/)[1]
                img = $text.URLEncode(img);
                img = img.replace(/%2F/g, "/");
                img = img.replace(/%3A/g, ":");
                var url = li.match(/href=\"(\S*?)\"/)[1]
                data.push({
                    img: { src: img },
                    url: url
                });
            }
            $("PVideo").data = data;
            $("PVideo").endRefreshing();
        }
    });
}
function getvideo(url) {
    var info = $cache.get("info");
    $http.get({
        url: info.turl  + url,
        header: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1"
        },
        handler: resp => {
            var text = resp.data.replace(/\n|\r/g, "");
            var video = text.match(/<source src=\"(\s*.*?\S*)\"/)[1]
            var playurl = $text.URLEncode(video);
            playurl = playurl.replace(/%2F/g, "/");
            playurl = playurl.replace(/%3A/g, ":");
            playurl = playurl.replace(/%3F/g, "?");
            playurl = playurl.replace(/%3D/g, "=");
            if ($app.info.bundleID == "app.cyan.pin") {
                playweb(playurl);
            } else {
                if ($app.info.version > "2.0.0") {
                    playvideo(playurl);
                } else {
                    playweb(playurl);
                }
            }
        }
    });
}

function playweb(playurl) {
    $ui.push({
        props: {
            title: "抖yin国内版 1.4"
        },
        views: [{
            type: "web",
            props: {
                url: playurl,
            },
            layout: $layout.fill
        }]
    })

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
    exports.play = play
    const options = {
        showsPlaybackControls: true,
        videoGravity: "resizeAspect",
        allowsPictureInPicturePlayback: true,
        updatesNowPlayingInfoCenter: true,
        entersFullScreenWhenPlaybackBegins: false,
        exitsFullScreenWhenPlaybackEnds: false,
    }
    play(playurl, options);
}