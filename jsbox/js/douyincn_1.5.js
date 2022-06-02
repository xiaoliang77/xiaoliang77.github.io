/*
2022年6月2日 修复更新
ps：脚本仅供学习参考，视频数据来源于网络，请勿相信视频内广告信息，造成损失与作者无关。

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
    "aHR0cHM6Ly8jb2RlLmFsaXl1bi5jb20vODQwODgyODkvZ3hxL3Jhdy8tYXN0ZXIvZG81eWluLmpzb24=";
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
            if (info.bb != "1.5") {
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

var itemHeight = $device.info.screen.height - 145;

$ui.render({
    props: {
        title: "抖yin国内版 1.5",
    },
    views: [
        {
            type: "matrix",
            props: {
                id: "PVideo",
                itemHeight: itemHeight,
                autoRowHeight: true,
                columns: 1,
                spacing: 0,
                bgcolor: $color("black"),
                template: [
                    {
                        type: "web",
                        props: {
                            id: "bof",
                        },
                        layout: $layout.fill
                    }
                ]
            },
            layout: function (make) {
                make.top.bottom.left.right.inset(0);
            },
            events: {
                didReachBottom: function (sender) {
                    sender.endFetchingMore();
                    Pgetdata();
                }
            }
        },
        {
            type: "label",
            props: {
                id: "jzz",
                font: $font("bold", 40),
                textColor: $color("#fff"),
                align: $align.center,
                text: "加载中···"
            },
            layout: function (make, view) {
                make.centerX.centerY.equalTo(view.center)
            }
        },

    ]
});

function Pgetdata() {
    var info = $cache.get("info");
    var pg = Math.ceil(Math.random() * 4600);
    var turl = $text.base64Decode(info.turl)
    $http.get({
        url: turl + "json/" + pg + ".json",
        header: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1"
        },
        handler: resp => {
            $('PVideo').data = [{ bof: { url: resp.data.url } }]
            $('jzz').hidden = true;
        }
    });
}
