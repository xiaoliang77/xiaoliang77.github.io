/*
PornHub视频下载

·脚本在国内网络是无法直接使用，需要科学上网。
·脚本内置浏览访问PornHub官网，并接入下载按钮。
·JS内置下载功能（下载会比较慢）不推荐使用。
·启用迅雷下载（需要beta或旧版）才会自动跳转和自动创建下载任务。
·提供复制视频真实MP4链接（可用于其他浏览器下载）。
·跳转苹果自带浏览器Safari下载（需要ios13以上）使用教程：https://mp.weixin.qq.com/s/LDdYSTNqhcKz2QzNqHbb1g

by：iPhone 8、小良
更多js脚本： https://ae85.cn/
*/

const menuview = {
    type: "view",
    props: {
        id: "mview",
        bgcolor: $color("white")
    },
    views: [
        {
            type: "view",
            props: {
                id: "line",
                bgcolor: $color("#b2b2b2")
            },
            layout: function (make) {
                make.top.right.left.inset(0);
                make.height.equalTo(0.5);
            }
        },
        {
            type: "button",
            props: {
                id: "B1",
                icon: $icon("042", $color("#0080FF"), $size(30, 30)),
                bgcolor: $color("white")
            },
            layout: function (make, view) {
                make.top.equalTo($("line").bottom).inset(10);
                make.width.equalTo(view.super).dividedBy(4);
            },
            events: {
                tapped(sender) {
                    $("dview").hidden = true;
                }
            }
        },
        {
            type: "button",
            props: {
                id: "B2",
                title: "<",
                font: $font("bold", 30),
                titleColor: $color("#0080FF"),
                bgcolor: $color("white")
            },
            layout: function (make, view) {
                make.left.equalTo($("B1").right);
                make.top.equalTo($("line").bottom);
                make.width.equalTo(view.super).dividedBy(4);
            },
            events: {
                tapped(sender) {
                    if ($("dview").hidden) {
                        $("videoweb").goBack()
                    }
                }
            }
        },
        {
            type: "button",
            props: {
                id: "B3",
                title: ">",
                font: $font("bold", 30),
                titleColor: $color("#0080FF"),
                bgcolor: $color("white")
            },
            layout: function (make, view) {
                make.left.equalTo($("B2").right);
                make.top.equalTo($("line").bottom);
                make.width.equalTo(view.super).dividedBy(4);
            },
            events: {
                tapped(sender) {
                    if ($("dview").hidden) {
                        $("videoweb").goForward()
                    }

                }
            }
        },
        {
            type: "button",
            props: {
                id: "B4",
                icon: $icon("165", $color("#0080FF"), $size(30, 30)),
                bgcolor: $color("white")
            },
            layout: function (make, view) {
                make.left.equalTo($("B3").right);
                make.top.equalTo($("line").bottom).inset(10);
                make.width.equalTo(view.super).dividedBy(4);
            },
            events: {
                tapped(sender) {
                    $("dview").hidden = false;
                }
            }
        }
    ],
    layout: function (make) {
        make.left.right.bottom.inset(0);
        make.height.equalTo(80);
    }
};


const downlistview = {
    type: "view",
    props: {
        id: "listview",
        hidden: true,
    },
    views: [{
        type: "label",
        props: {
            id: "biaoti",
            font: $font("bold", 17),
            lines: 3,
        },
        layout: function (make, view) {
            make.left.right.inset(15);
            make.top.inset(10);
        }
    }, {
        type: "list",
        id: "downlist",
        props: {
            rowHeight: 45,
            bgcolor: $color("#e6e6e6"),
        },
        layout: function (make) {
            make.top.equalTo($('biaoti').bottom).inset(10)
            make.left.right.bottom.inset(15)
        },
        events: {
            didSelect: function (sender, indexPath, data) {
                var url = data.split("\n")[1]
                $ui.menu({
                    items: ["JS内置下载 (慢)-不推荐", "启用迅雷下载-beta或旧版", "复制视频连接-其他工具下载", "Safari浏览器下载-ios13以上"],
                    handler: function (title, idx) {
                        switch (idx) {
                            case 0:
                                download(url, $("biaoti").text)
                                break
                            case 1:
                                $app.openURL("thunder://" + $text.base64Encode(`AA${url}ZZ`))
                                break
                            case 2:
                                $clipboard.text = url
                                $ui.toast("已复制" + url);
                                break
                            case 3:
                                $app.openURL(url)
                                break
                            default:
                                break
                        }
                    }
                })
            }
        }
    }],
    layout: function (make) {
        make.top.equalTo($('bt1').bottom).inset(25)
        make.left.right.bottom.inset(0);
    }
}


const downview = {
    type: "view",
    props: {
        id: "dview",
        bgcolor: $color("#e6e6e6")
    },
    views: [{
        type: "label",
        props: {
            id: "tis1",
            text: "请将视频链接粘贴到下方：",
            font: $font(14)
        },
        layout: function (make, view) {
            make.left.inset(15);
            make.top.inset(10);
        }
    },
    {
        type: "text",
        props: {
            id: "bjk",
            lines: 0,
            radius: 5,
            placeholder: "输入视频地址…"
        },
        layout: function (make) {
            make.top.equalTo($("tis1").bottom).inset(5);
            make.right.left.inset(15);
            make.height.equalTo(110);
        },
        events: {
            returned: function (sender) {
                $("bjk").blur();
            }
        }
    },
    {
        type: "button",
        props: {
            title: "获取视频下载地址",
            id: "bt1"
        },
        layout: function (make) {
            make.top.equalTo($("bjk").bottom).inset(15);
            make.right.left.inset(15);
            make.height.equalTo(45);
        },
        events: {
            tapped: function (sender) {
                $("bjk").blur();
                var link = $('bjk').text
                if (link.indexOf('video.php?viewkey=') !== -1) {
                    getdata(link)
                } else {
                    $ui.alert("请输入正确的视频连接");
                }
            },
        }
    },
    {
        type: "spinner",
        props: {
            loading: false,
            style: 0
        },
        layout: function (make, view) {
            make.top.equalTo($("bjk").bottom).inset(110);
            make.centerX.equalTo(view.super);
        }
    }, downlistview
    ],
    layout: $layout.fill
}

function main() {
    $ui.render({
        props: {
            title: "PornHub视频下载"
        },
        views: [{
            type: "web",
            props: {
                id: "videoweb",
                url: "https://www.pornhub.com/"
            },
            layout: function (make, view) {
                make.top.bottom.right.left.inset(0)
            },
            events: {
                didStart: function (sender, navigation) {
                    var url = sender.url
                    $("down").hidden = url.indexOf('video.php?viewkey=') !== -1 ? false : true

                },
            }
        },

        {
            type: "button",
            props: {
                id: "down",
                title: "下载↓",
                hidden: true,
                bgcolor: $rgb(210, 105, 30),
                titleColor: $color("white "),
                font: $font(15)
            },
            layout: function (make, view) {
                make.right.inset(10)
                make.bottom.inset(90)
                make.width.equalTo(55)
                make.height.equalTo(32)
            },
            events: {
                tapped: function (sender) {
                    var link = $("videoweb").url
                    $("bjk").text = link
                    getdata(link)
                    $("dview").hidden = false;
                }
            }
        },
            downview, menuview,
        ]
    })
}

function pinview() {
    $ui.render({
        props: {
            title: "PornHub视频下载"
        },
        views: [
            downview, 
        ]
    })
}
if ($app.info.bundleID=="app.cyan.pin") {
    pinview()
}else{
    main()
}


function getdata(url) {
    $ui.loading(true);
    $('spinner').loading = true;
    $("listview").hidden = true;
    $http.get({
        url: $detector.link(url),
        handler: function (resp) {
            var text = resp.data.match(/\[\'videoUrl\'\] = media_.;(.*?)flashvars_/g)
            var str = text[text.length - 1].match(/\[\'videoUrl\'\] = media_.;(.*?)flashvars_/)[1]
            var title = resp.data.match(/og:title\" content=\"(.*?)\"/)[1]
            $('biaoti').text = title
            var media = str.match(/var (media_.)=/)[1]
            eval(str);
            var lurl = eval(media);
            $http.get({
                url: lurl,
                handler: function (resp) {
                    $ui.loading(false)
                    $('spinner').loading = false;
                    var arr = resp.data;
                    var data = []
                    for (i in arr) {
                        data.push("清晰度: " + arr[i].quality + "P\n" + arr[i].videoUrl)
                    }
                    $("listview").hidden = false;
                    $("list").data = data
                    $("list").endFetchingMore()
                }
            });
        }
    });
}

function download(url, title) {
    $ui.toast("正在下载中 ...");
    $ui.loading(true);
    $http.download({
        url: url,
        handler: function (resp) {
            $ui.loading(false);
            if (resp.response.statusCode == "200") {
                $share.sheet([title + ".mp4", resp.data]);
            } else {
                $ui.alert("下载失败");
            }
        }
    });
}

function getclipboard() {
    var url = $clipboard.link;
    if (url.indexOf('video.php?viewkey=') !== -1) {
        $ui.alert({
            title: "要获取剪贴板中的视频链接",
            message: $clipboard.text,
            actions: [
                {
                    title: "取消",
                    handler: function () { }
                },
                {
                    title: "获取",
                    handler: function () {
                        $("bjk").text = url;
                        getdata(url);
                    }
                }
            ]
        });
    }
}

getclipboard()