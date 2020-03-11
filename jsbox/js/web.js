/** 网络那么大，我想出去看看！
 *  公众号：小良科技
 *  ID：ae85-cn
 *  关注公众号带你打开ios的另一扇门
 *  by：iPhone 8、小良
 *  https://ae85.cn/
 *  博客：87xl.cn
 */

$ui.loading(true);
$http.get({
    url: $text.base64Decode("aHR0cHM6Ly9naXRlZS5jb20veWFvMDcvdXBkYXRlX2RldmljZS9yYXcvbWFzdGVyLw==") + "web.json",
    handler: function (resp) {
        $ui.loading(false);
        if (resp.data.bb != "1.1") {
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
            tcgg(resp.data.gg);
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

function csh() {
    var info = $cache.get("info")
    var urlt = $text.base64Decode(info.turl)
    $ui.render({
        props: {
            title: "轻量级web浏览器 1.1"
        },
        views: [{
            type: "input",
            props: {
                id: "bjk",
                placeholder: "🌐 输入链接或关键字进行搜索..."
            },
            layout: function (make) {
                make.top.left.right.inset(5);
                make.height.equalTo(35);
            },
            events: {
                returned: function (sender) {
                    $("bjk").blur()
                    souurl()
                }
            }
        }, {
            type: "web",
            props: {
                id: "web",
                url: info.dhurl,
                toolbar: true,
                script: function () {
                    var a = document.getElementsByTagName("a")
                    for (var i = 0; i < a.length; ++i) {
                        var doc = a[i]
                        doc.target = "_self"
                    }
                }
            },
            layout: function (make, view) {
                make.top.equalTo($("bjk").bottom).inset(5);
                make.bottom.right.left.inset(0)
            },

            events: {
                didStart: function (sender, navigation) {
                    var url = $("web").url
                    var souurl = url.replace(urlt, "");
                    if (url.indexOf('jsbox/dh.html') !== -1) {
                        $("bjk").text = ""
                    } else {
                        $("bjk").text = souurl
                    }
                    if (url.indexOf('ae85.cn') == -1) {
                        if (url.indexOf(urlt) == -1) {
                            $("web").url = urlt + url
                        }
                    }

                }
            }
        }, ]
    });

    function souurl() {
        var key = $("bjk").text
        if (key == "") {
            alert("请输入链接或关键字进行搜索...")
            return;
        }

        if (key.indexOf('://') == -1) {
            if (key.indexOf('.com') == -1 && key.indexOf('.cn') == -1 && key.indexOf('.net') == -1 && key.indexOf('.top') == -1 && key.indexOf('.vip') == -1 && key.indexOf('.xin') == -1 && key.indexOf('.club') == -1 && key.indexOf('.info') == -1 && key.indexOf('.xyz') == -1 && key.indexOf('.org') == -1) {
                var u = urlt + "https://www.google.com/search?q=" + $text.URLEncode(key)
                $("web").url = u

            } else {
                if (key.indexOf('ae85.cn') > -1) {
                    $("web").url = "http://" + key
                } else {
                    $("web").url = urlt + key
                }
            }
        } else {
            if (key.indexOf('ae85.cn') > -1) {
                $("web").url = key
            } else {
                $("web").url = urlt + key
            }
        }

    }
}
