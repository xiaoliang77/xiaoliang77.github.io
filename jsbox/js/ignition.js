/*
ignition 是第三方企业证书APP免费提供站

js可提取ipa文件包，在线安装，过滤广告，在线搜索等功能。

by：iPhone 8、小良
更多js脚本： https://ae85.cn/
*/

var souview = {
    type: "view",
    props: {
        id: "souView",
        bgcolor: $color("#1D1D27"),
    },
    layout: (make, view) => {
        make.right.left.top.inset(0);
        make.height.equalTo(60)
    },
    views: [{
        type: "input",
        props: {
            id: "bjk",
            placeholder: " 输入关键字进行搜索...",
            bgcolor: $color("#848485"),
            textColor: $color("#fff"),
        },
        layout: function (make) {
            make.top.inset(10)
            make.left.right.inset(10);
            make.height.equalTo(35);
        },
        events: {
            returned: function (sender) {
                getsouapp(sender.text)
            }
        }
    },]
}
function csh() {
    $ui.render({
        props: {
            title: "ignition"
        },
        views: [souview,
            {
                type: "view",
                props: {
                    id: "zhoView",
                },
                layout: (make, view) => {
                    make.right.left.bottom.inset(0);
                    make.top.equalTo($("souView").bottom);

                },
                views: [{
                    type: "list",
                    props: {
                        id: "cd",
                        rowHeight: 50,
                        bgcolor: $color("#15151E"),
                        separatorColor: $color('#15151E'),
                        data: [{ img: { src: "https://app.ignition.fun/img/All%20Apps.png" }, mc: { text: "All Apps" }, key: "All%20Apps" }, { img: { src: "https://app.ignition.fun/img/AppStore.png" }, mc: { text: "AppStore" }, key: "appstore" }, { img: { src: "https://app.ignition.fun/img/Emulators.png" }, mc: { text: "Emulators" }, key: "emulators" }, { img: { src: "https://app.ignition.fun/img/Entertainment.png" }, mc: { text: "Entertainment" }, key: "entertainment" }, { img: { src: "https://app.ignition.fun/img/Experimental.png" }, mc: { text: "Experimental" }, key: "experimental" }, { img: { src: "https://app.ignition.fun/img/Games.png" }, mc: { text: "Games" }, key: "games" }, { img: { src: "https://app.ignition.fun/img/Jailbreaks.png" }, mc: { text: "Jailbreaks" }, key: "jailbreaks" }, { img: { src: "https://app.ignition.fun/img/Social.png" }, mc: { text: "Social" }, key: "social" }, { img: { src: "https://app.ignition.fun/img/Tweaked.png" }, mc: { text: "Tweaked" }, key: "tweaked" }, { img: { src: "https://app.ignition.fun/img/Unknown.png" }, mc: { text: "Unknown" }, key: "unknown" }, { img: { src: "https://app.ignition.fun/img/Utilities.png" }, mc: { text: "Utilities" }, key: "utilities" }, { img: { src: "https://ae85.cn/wf/xl.png" }, mc: { text: "iPhone 8、小良" }, key: "https://ae85.cn/yy.html" }],
                        template: {
                            props: {
                                bgcolor: $color("#1D1D27"),
                            }, views: [
                                {
                                    type: "image",
                                    props: {
                                        id: "img",
                                        radius: 7
                                    },
                                    layout: function (make, view) {
                                        make.left.inset(10);
                                        make.centerY.equalTo(view.center);
                                        make.height.width.equalTo(40);
                                    }
                                },
                                {
                                    type: "label",
                                    props: {
                                        id: "mc",
                                        align: $align.center,
                                        lines: 0,
                                        font: $font("bold", 20),
                                        textColor: $color('#FFF')
                                    },
                                    layout: function (make, view) {
                                        make.left.equalTo($("img").right).offset(15);
                                        make.centerY.equalTo(view.center);
                                    }
                                },
                                {
                                    type: "label",
                                    props: {
                                        text: ">",
                                        align: $align.center,
                                        lines: 1,
                                        textColor: $color("#434345"),
                                        font: $font(30)
                                    },
                                    layout: function (make, view) {
                                        make.centerY.equalTo(view.center);
                                        make.right.inset(10);
                                    }
                                }
                            ]
                        }
                    },
                    layout: function (make) {
                        make.top.equalTo(0)
                        make.left.right.bottom.inset(0);
                    },
                    events: {
                        didSelect: function (sender, indexPath, data) {
                            if (data.key.indexOf('ae85.cn') != -1) {
                                $ui.push({
                                    props: {
                                        title: "应用"
                                    },
                                    views: [{
                                        type: "web",
                                        props: {
                                            id: "web",
                                            url: data.key
                                        },
                                        layout: $layout.fill,
                                    }]
                                });
                            } else {
                                gteappdata(data.key, data.mc.text)
                            }

                        }
                    }
                }]
            },
        ]
    });
}

csh()

function applist(name, data) {
    $ui.push({
        props: {
            title: name
        },
        views: [souview, {
            type: "view",
            props: {
                id: "applistView",
            },
            layout: (make, view) => {
                make.right.left.bottom.inset(0);
                make.top.equalTo($("souView").bottom);
            },
            views: [{
                type: "list",
                props: {
                    id: "cd",
                    rowHeight: 50,
                    bgcolor: $color("#15151E"),
                    separatorColor: $color('#15151E'),
                    data: data,
                    template: {
                        props: {
                            bgcolor: $color("#1D1D27"),
                        }, views: [
                            {
                                type: "image",
                                props: {
                                    id: "img",
                                    radius: 7
                                },
                                layout: function (make, view) {
                                    make.left.inset(10);
                                    make.centerY.equalTo(view.center);
                                    make.height.width.equalTo(40);
                                }
                            },
                            {
                                type: "label",
                                props: {
                                    id: "mc",
                                    align: $align.center,
                                    lines: 0,
                                    font: $font("bold", 20),
                                    textColor: $color('#FFF')
                                },
                                layout: function (make, view) {
                                    make.left.equalTo($("img").right).offset(15);
                                    make.centerY.equalTo(view.center);
                                }
                            },
                            {
                                type: "label",
                                props: {
                                    id: "rq",
                                    text: ">",
                                    align: $align.center,
                                    lines: 1,
                                    textColor: $color("#434345"),
                                    font: $font(30)
                                },
                                layout: function (make, view) {
                                    make.centerY.equalTo(view.center);
                                    make.right.inset(10);
                                }
                            },
                            {
                                type: "matrix",
                                props: {
                                    id: "hhq",
                                    itemHeight: 30,
                                    columns: 1,
                                    spacing: 0,
                                    radius: 15,
                                    template: {
                                        props: {
                                            bgcolor: $color("#00cc00"),
                                        }, views: [
                                            {
                                                type: "label",
                                                props: {
                                                    id: "hq",
                                                    text: "安装",
                                                    textColor: $color("#fff"),
                                                    align: $align.center,
                                                    font: $font(15)
                                                },
                                                layout: $layout.fill
                                            }
                                        ]
                                    }
                                },
                                layout: function (make, view) {
                                    make.centerY.equalTo(view.center);
                                    make.size.equalTo($size(50, 30));
                                    make.right.equalTo($('rq').left).inset(10);
                                },
                                events: {
                                    didSelect: function (sender, indexPath, data) {
                                        install(data.id)
                                    }
                                }
                            }
                        ]

                    }
                },
                layout: function (make) {
                    make.top.equalTo(0)
                    make.left.right.bottom.inset(0);
                },
                events: {
                    didSelect: function (sender, indexPath, data) {
                        getappxq(data.id, data.mc.text, data.img.src)
                    }
                }
            }]
        }]
    });
}

function gteappdata(key, title) {
    $ui.loading(true)
    $http.get({
        url: "https://app.ignition.fun/pages/category.php?category=" + key,
        handler: function (resp) {
            $ui.loading(false)
            var html = resp.data.replace(/\n|\s|\r/g, "")
            var arr = html.match(/<li>(\S*?)<\/li>/g)
            var data = []
            for (i in arr) {
                var sen = arr[i]
                var name = sen.match(/\"item-header\">(\S*?)<divclass/)[0]
                name = name.match(/<\/div>(\S*?)<divclass/)[1]
                var img = sen.match(/<imgsrc=\"(\S*?)\"/)[1]
                var href = sen.match(/<ahref=\"(\S*?)\"/)[1]
                var id = href.replace(/\/|app/g, "")
                data.push({
                    img: { src: img }, mc: { text: name }, id: id, hhq: {
                        data: [{ id: id }]
                    }
                })
            }
            applist(title, data)
        }
    });
}

function install(id) {
    $app.openURL("itms-services://?action=download-manifest&url=https://ignition.fun/install.php%3Fapp%3D" + id);
}

function getappxq(id, name, img) {
    $ui.loading(true)
    $http.get({
        url: "https://app.ignition.fun/pages/app.php?app=" + id,
        handler: function (resp) {
            $ui.loading(false)
            var html = resp.data.replace(/\n|\r/g, "")
            var xiangq = html.match(/block-strong\">.*?<\/div>/)[0]
            xiangq = xiangq.replace(/block-strong\">|<ul>|<p>|<li>|<h3>|<\/div>|<\/ul>/g, "")
            xiangq = xiangq.replace(/<\/p>|<\/li>|<\/h3>/g, "\n")
            var text = html.match(/item-after\">(\S*?)<\/div>/g)
            var version = text[0].match(/item-after\">(\S*?)<\/div>/)[1]
            xqjm(name, id, img, version, xiangq)
        }
    });
}

function xqjm(name, id, img, bb, xq) {
    $ui.push({
        props: {
            title: name
        },
        views: [{
            type: "view",
            props: {
                id: "appxqView",
                bgcolor: $color("#15151E"),
            },
            layout: (make, view) => {
                make.right.left.bottom.top.inset(0);
            },
            views: [{
                type: "view",
                props: {
                    id: "tou",
                    bgcolor: $color("#1D1D27"),
                },
                layout: (make, view) => {
                    make.right.left.inset(0);
                    make.top.inset(30)
                    make.height.equalTo(90)
                },
                views: [{
                    type: "image",
                    props: {
                        id: "img",
                        src: img,
                        radius: 7
                    },
                    layout: function (make, view) {
                        make.left.inset(10);
                        make.centerY.equalTo(view.center);
                        make.height.width.equalTo(70);
                    }
                },
                {
                    type: "label",
                    props: {
                        id: "mc",
                        text: name,
                        align: $align.center,
                        lines: 0,
                        font: $font("bold", 18),
                        textColor: $color('#FFF')
                    },
                    layout: function (make, view) {
                        make.left.equalTo($("img").right).offset(15);
                        make.top.equalTo(15)
                    }
                },
                {
                    type: "label",
                    props: {
                        id: "Version",
                        text: "Version :  " + bb,
                        align: $align.center,
                        lines: 0,
                        font: $font(15),
                        textColor: $color('#78787E'),
                    },
                    layout: function (make, view) {
                        make.left.equalTo($("mc").left)
                        make.top.equalTo($("mc").bottom).offset(15);
                    }
                }, {
                    type: "button",
                    props: {
                        id: "hq",
                        title: "GET",
                        textColor: $color("#fff"),
                        radius: 15,
                        bgcolor: $color("#3E92CC"),
                        font: $font("bold", 15)
                    },
                    layout: function (make, view) {
                        make.right.inset(10);
                        make.centerY.equalTo(view.center);
                        make.size.equalTo($size(50, 30));
                    },
                    events: {
                        tapped: function (sender, indexPath, data) {
                            var installurl = "itms-services://?action=download-manifest&url=https://ignition.fun/install.php%3Fapp%3D" + id
                            $ui.menu({
                                items: ["在线安装", "提取ipa", "复制安装地址", "复制ipa地址"],
                                handler: (title, idx) => {
                                    switch (idx) {
                                        case 0:
                                            install(id)
                                            break;
                                        case 1:
                                            getipa(id, 2, name)
                                            break;
                                        case 2:
                                            $clipboard.text = installurl
                                            $ui.alert("已复制\n\n" + installurl);
                                            break;
                                        case 3:
                                            getipa(id, 1)
                                            break;
                                    }
                                }
                            });
                        }
                    }
                },]
            }, {
                type: "label",
                props: {
                    id: "About",
                    text: "About " + name,
                    align: $align.center,
                    lines: 0,
                    font: $font("bold", 17),
                    textColor: $color('#78787E'),
                },
                layout: function (make, view) {
                    make.left.offset(15)
                    make.top.equalTo($("tou").bottom).offset(55);
                }
            }, {
                type: "view",
                props: {
                    id: "xiangqing",
                    bgcolor: $color("#1D1D27"),
                },
                layout: (make, view) => {
                    make.top.equalTo($("About").bottom).inset(10);
                    make.left.right.bottom.offset(0)
                },
                views: [{
                    type: "text",
                    props: {
                        id: "Version",
                        text: xq,
                        lines: 0,
                        font: $font(16),
                        textColor: $color('#fff'),
                        bgcolor: $color("#1D1D27"),
                    },
                    layout: function (make, view) {
                        make.top.left.right.bottom.inset(5)
                    }
                },]
            }]
        }]
    });
}

$http.get({
    url: "https://app.ignition.fun/pages/search.php",
    handler: function (resp) {
        $ui.loading(false)
        var html = resp.data.replace(/\n|\s|\r/g, "")
        var arr = html.match(/<li>(\S*?)<\/li>/g)
        $cache.set("arr", arr);
    }
})

function getsouapp(key) {
    var arr = $cache.get("arr");
    var data = []
    for (i in arr) {
        var sen = arr[i]
        var name = sen.match(/\"item-header\">(\S*?)<divclass/)[0]
        name = name.match(/<\/div>(\S*?)<divclass/)[1]
        var img = sen.match(/<imgsrc=\"(\S*?)\"/)[1]
        var href = sen.match(/<ahref=\"(\S*?)\"/)[1]
        var id = href.replace(/\/|app/g, "")
        if (sen.indexOf(key) != -1) {
            data.push({
                img: { src: img }, mc: { text: name }, id: id, hhq: {
                    data: [{ id: id }]
                }
            })
        }
    }
    applist("Search", data)
}

function getipa(id, zt, title) {
    $ui.loading(true)
    $http.get({
        url: "https://ignition.fun/install.php?app=" + id,
        handler: function (resp) {
            $ui.loading(false)
            var url = resp.data.match(/http.*?\.ipa/)[0]
            if (zt == 1) {
                $clipboard.text = url
                $ui.alert("已复制\n\n" + url);
            } else {
                $ui.toast("正在下载中 ...");
                $ui.loading(true);
                $http.download({
                    url: url,
                    handler: function (resp) {
                        $ui.loading(false);
                        if (resp.response.statusCode == "200") {
                            $share.sheet([title + ".ipa", resp.data]);
                        } else {
                            $ui.alert("下载失败");
                        }
                    }
                });
            }
        }
    });
}
