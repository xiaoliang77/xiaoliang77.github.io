/*
2019年1月24日 修复更新
更新：去掉之前版权问题的直播源。

by：iPhone 8、小良
https://ae85.cn/

博客：87xl.cn
*/

$ui.loading(true);
$http.get({
    url: $text.base64Decode("aHR0cHM6Ly9naXRlZS5jb20veWFvMDcvdXBkYXRlX2RldmljZS9yYXcvbWFzdGVyLw==") + "saishi.json",
    handler: function (resp) {
        $ui.loading(false);
        if (resp.data.bb != "1.5") {
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
                    title: "赛事直播1.5"
                },
                views: [{
                    type: "web",
                    props: {
                        id: "web",
                        toolbar:1,
                        url: $text.base64Decode(resp.data.turl),
                        script: function () {
                            document.getElementsByClassName("logo")[0].style.display = "none";
                            var a = document.getElementsByTagName("a")
                            for (var i = 0; i < a.length; ++i) {
                                var doc = a[i]
                                doc.target = "_self"
                            }
                         document.getElementsByClassName("copy")[0].style.display = "none";
                        }
                    },
                    layout: $layout.fill,
                },]
            })

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
