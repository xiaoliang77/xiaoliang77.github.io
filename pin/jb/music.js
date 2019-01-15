/* 音乐下载
 *  支持:网易云音乐,QQ音乐,虾米音乐,酷狗音乐,百度/千千音乐.
 *  视频教程: http://t.cn/EGtlxQ5

 *  by：iPhone 8、小良
 *  http://ae85.cn/
*/
var rce = ["netease", "tencent", "xiami", "kugou", "baidu"]
$cache.set("srce", 0);
$ui.loading(true);
$http.get({
    url: $text.base64Decode("aHR0cHM6Ly9naXRlZS5jb20veWFvMDcvdXBkYXRlX2RldmljZS9yYXcvbWFzdGVyLw==") + "yinyue.json",
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
            tcgg(resp.data.gg)
            csh();
            clipboard()
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
    $ui.render({
        props: {
            title: "音乐下载",
            id: "zjm"
        },
        views: [{
            type: "button",
            props: {
                title: "搜索",
                id: "bt1"
            },
            layout: function (make) {
                make.top.inset(20);
                make.right.inset(10);
                make.width.equalTo(80)
                make.height.equalTo(35);
            },
            events: {
                tapped: function (sender) {
                    $("bjk").blur();
                    $cache.set("key", $('bjk').text)
                    getlist();
                }
            }
        }, {
            type: "input",
            props: {
                id: "bjk",
                placeholder: "输入歌手、歌名、专辑…"
            },
            layout: function (make) {
                make.top.inset(20);
                make.left.inset(10);
                make.right.equalTo($("bt1").left).inset(10);
                make.height.equalTo(35);
            },
            events: {
                returned: function (sender) {
                    $("bjk").blur();
                    $cache.set("key", $('bjk').text)
                    getlist();
                }
            }
        },
        {
            type: "tab",
            props: {
                id: "tab_i",
                items: ["网易云", "QQ音乐", "虾米", "酷狗", "百度"],
                index: 0
            },
            layout: function (make) {
                make.left.right.inset(10);
                make.top.equalTo($("bjk").bottom).offset(10);
                make.height.equalTo(28);
            },
            events: {
                changed: function (sender) {
                    $cache.set("srce", sender.index);
                }
            }
        }, {
            type: "list",
            props: {
                rowHeight: 39,
                hidden: true,
                template: [{
                    type: "label",
                    props: {
                        id: "mc",
                    },
                    layout: function (make, view) {
                        make.left.inset(10);
                        make.centerY.equalTo(view.center)
                        make.width.equalTo(240)
                    }
                }, {
                    type: "label",
                    props: {
                        id: "gs",
                    },
                    layout: function (make, view) {
                        make.left.equalTo($("mc").right).inset(10);
                        make.centerY.equalTo(view.center)
                        make.width.equalTo(95)
                    }
                }, {
                    type: "label",
                    props: {
                        text: "⋮",
                    },
                    layout: function (make, view) {
                        make.right.inset(10);
                        make.centerY.equalTo(view.center)
                        make.width.equalTo(10)
                    }
                },]
            },
            layout: function (make) {
                make.top.equalTo($("tab_i").bottom).inset(25);
                make.right.left.bottom.inset(0);
            },
            events: {
                didSelect: function (sender, indexPath, data) {
                    geturl(data)
                },
                didReachBottom: function (sender) {
                    sender.endFetchingMore()
                    var page = $cache.get("pg") + 1
                    $cache.set("pg", page)
                    getlist()
                }
            }
        }]
    })
}

function getlist() {
    var page = $cache.get("pg")
    var key = $cache.get("key")
    var urlt = $text.base64Decode($cache.get("info").turl);
    if (!key) {
        alert("请先输入你要搜索的内容")
        return;
    }
    $ui.loading(true)
    $http.post({
        url: urlt + "/api.php?callback=jQuery111309162134383204299_1546530630899",
        header: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": urlt,
            "Referer": urlt + "/",
            "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Mobile Safari/537.36",
            "X-Requested-With": "XMLHttpRequest"
        },
        body: {
            "types": "search",
            "count": "20",
            "source": rce[$cache.get("srce")],
            "pages": page,
            "name": key,
        },
        handler: function (resp) {
            $ui.loading(false)
            var text = resp.data;
            var json = text.replace(/jQuery111309162134383204299_1546530630899\(|\)/g, "")
            var jso = JSON.parse(json)
            if (jso.length == 0) {
                alert("未找到歌曲")
                return;
            }
            if (page == 1) {
                var data = []
            } else {
                var data = $('list').data
            }

            for (i in jso) {
                var j = jso[i]
                data.push({
                    mc: { text: j.name },
                    gs: { text: j.artist[0] },
                    id: j.id
                })
            }
            $('list').data = data
            $('list').hidden = false
        }
    });
}
var sftc = 0
function geturl(data) {
    var urlt = $text.base64Decode($cache.get("info").turl);
    if (sftc) {
        $audio.stop()
        $("ewmView").remove();
    }
    $ui.loading(true)
    $http.post({
        url: urlt + "/api.php?callback=jQuery1113006293226222768045_1546574985652",
        header: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": urlt,
            "Referer": urlt + "/",
            "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Mobile Safari/537.36",
            "X-Requested-With": "XMLHttpRequest"
        },
        body: {
            "types": "url",
            "id": data.id,
            "source": rce[$cache.get("srce")]
        },
        handler: function (resp) {
            $ui.loading(false)
            var text = resp.data;
            var json = text.replace(/jQuery1113006293226222768045_1546574985652\(|\)/g, "")
            jso = JSON.parse(json)
            sftc = 1
            $('zjm').add({
                type: "view",
                bgcolor: $color("#ddd"),
                props: {
                    id: "ewmView",
                    radius: 7,
                    bgcolor: $color("white"),
                    borderWidth: 1,
                    borderColor: $color("tint")
                },
                views: [{
                    type: "button",
                    props: {
                        icon: $icon("225", $color("#f00"), $size(30, 30)),
                        bgcolor: $color("clear")
                    },
                    layout: function (make) {
                        make.right.top.inset(10);
                    },
                    events: {
                        tapped(sender) {
                            $audio.stop()
                            $("ewmView").remove();
                            sftc = 0
                        }
                    }
                }, {
                    type: "label",
                    props: {
                        id: "t_gm",
                        text: "歌名：",
                        textColor: $color("#c4c4c4")
                    },
                    layout: function (make, view) {
                        make.top.inset(60)
                        make.left.inset(20)
                        make.width.equalTo(55)
                    }
                }, {
                    type: "label",
                    props: {
                        id: "t_gname",
                        text: data.mc.text
                    },
                    layout: function (make, view) {
                        make.top.inset(60)
                        make.right.inset(20)
                        make.left.equalTo($("t_gm").right)
                    }
                }, {
                    type: "label",
                    props: {
                        id: "t_gs",
                        text: "歌手：",
                        textColor: $color("#c4c4c4")
                    },
                    layout: function (make, view) {
                        make.top.equalTo($("t_gm").bottom).inset(10)
                        make.left.inset(20)
                        make.width.equalTo(55)
                    }
                }, {
                    type: "label",
                    props: {
                        id: "t_gsm",
                        text: data.gs.text
                    },
                    layout: function (make, view) {
                        make.top.equalTo($("t_gm").bottom).inset(10)
                        make.right.inset(20)
                        make.left.equalTo($("t_gs").right)
                    }
                }, {
                    type: 'button',
                    props: {
                        title: '试听',
                        id: 'sBtn',
                        bgcolor: $color('#409eff')
                    },
                    layout: function (make, view) {
                        make.top.equalTo($('t_gsm').bottom).inset(40);
                        make.left.inset(50);
                        make.width.equalTo(80)
                    },
                    events: {
                        tapped: function (sender) {
                            if (sender.title == "试听") {
                                $("sBtn").title = "停止"
                                $audio.play({
                                    url: jso.url
                                })

                            } else {
                                $("sBtn").title = "试听"
                                $audio.stop()
                            }
                        }
                    }
                }, {
                    type: "button",
                    props: {
                        title: "下载",
                        bgcolor: $color('#090')
                    },
                    layout: function (make, view) {
                        make.top.equalTo($('t_gsm').bottom).inset(40);
                        make.right.inset(50);
                        make.width.equalTo(80)
                    },
                    events: {
                        tapped(sender) {
                            download(jso.url, data.mc.text)
                        },
                        longPressed: function () {
                            $clipboard.text = jso.url
                            alert("复制成功\n\n" + jso.url)
                        }
                    }
                },],
                layout: function (make, view) {
                    make.top.inset(150)
                    make.left.right.inset(20)
                    make.height.equalTo(220)
                }
            })
        }
    });
}

function download(url, gm) {
    $ui.toast("正在下载中 ...");
    $ui.loading(true);
    $http.download({
        url: url,
        handler: function (resp) {
            $ui.loading(false);
            if (resp.response.statusCode == "200") {
                $share.sheet([gm + ".mp3", resp.data]);
            } else {
                $ui.alert("下载失败");
            }
        }
    });
}

function clipboard() {
    var text = $clipboard.text
    if (text) {
        $ui.alert({
            title: "要搜索剪贴板中内容？",
            message: $clipboard.text,
            actions: [{
                title: "取消",
                handler: function () {
                }
            }, {
                title: "搜索",
                handler: function () {
                    function tob_s(s) {
                        var gm = text.replace(/\n|\s|\r|\./g, "")
                        var key = gm.match(/《(\S*?)》/)[1]
                        $cache.set("srce", s);
                        $('tab_i').index = s
                        $('bjk').text = key
                        getlist(key)
                    }
                    if (text.indexOf('网易云音乐') !== -1) {
                        tob_s(0)
                    } else if (text.indexOf('QQ音乐') !== -1) {
                        tob_s(1)
                    } else if (text.indexOf('虾米音乐') !== -1) {
                        tob_s(2)
                    } else if (text.indexOf('千千音乐') !== -1) {
                        $cache.set("srce", 4);
                        $('tab_i').index = 4
                        $('bjk').text = text
                        getlist(text)
                    } else {
                        $('bjk').text = text
                        getlist(text)
                    }
                }
            }]
        })
    }
}
