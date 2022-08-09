/** 规则文件提取
 * 支持workflow形式链接和捷径形式链接
 * 支持图标下载
 *
 * by：iPhone 8、小良
 * https://iphone8.vip/
 */

function get_tiqu(url) {
    $http.get({
        url: url,
        handler: function (resp) {
            var json = resp.data
            var name = json.fields.name.value
            var url = json.fields.shortcut.value.downloadURL
            var ur = url.replace(/\{/, "%7B").replace(/\}/, "%7D")
            var img = json.fields.icon.value.downloadURL
            var im = img.replace(/\{/, "%7B").replace(/\}/, "%7D")
            var data = { "url": ur, "img": im }
            $cache.set("info", data)
            $cache.set("wjm", name)
            $('bjk_wjm').text = name
            $('vediobtn').hidden = false
            $('spinner').loading = false;
        }
    });
}

function download() {
    var info = $cache.get("info");
    var hzm = $cache.get("vid");
    var wjm = $cache.get("wjm");
    $http.download({
        url: info.url,
        handler: function (resp) {
            var file = resp.data;
            $share.sheet([wjm + hzm, file]);
        }
    });
}

function getclipboard() {
    var url = $clipboard.link
    if (url) {
        $ui.alert({
            title: "要提取剪贴板中的链接",
            message: $clipboard.text,
            actions: [{
                title: "取消",
                handler: function () {
                }
            }, {
                title: "提取",
                handler: function () {
                    $('bjk').text = url
                    tmenu(url)
                }
            }]
        })
    }
}
var all_type = [
    { name: "workflow文件格式", vid: ".wflow" },
    { name: "捷径shortcuts文件格式", vid: ".shortcut" }
];
$cache.set("vid", all_type[0].vid)
$app.autoKeyboardEnabled = true;
$ui.render({
    props: {
        title: "规则文件提取",
        bgcolor: $color("#e6e6e6"),
    },
    views: [{
        type: "label",
        props: {
            id: "tis1",
            text: "请将 捷径或workflow 链接粘贴到下方：",
            font: $font(14)
        },
        layout: function (make, view) {
            make.left.inset(15);
            make.top.inset(30);
        }
    }, {
        type: "text",
        props: {
            id: "bjk",
            lines: 0,
            radius: 5,
            placeholder: "https://www.icloud.com/shortcuts/... \n或长按【提取】按钮"
        },
        layout: function (make) {
            make.top.equalTo($("tis1").bottom).inset(5)
            make.right.left.inset(15);
            make.height.equalTo(160);
        },
        events: {
            returned: function (sender) {
                $("bjk").blur();
                tmenu($('bjk').text);
            }
        }
    }, {
        type: "button",
        props: {
            title: "提  取",
            id: "bt1"
        },
        layout: function (make) {
            make.top.equalTo($("bjk").bottom).inset(15)
            make.right.left.inset(15);
            make.height.equalTo(45);
        },
        events: {
            tapped: function (sender) {
                tmenu($('bjk').text);
            },
            longPressed: function (info) {
                $('bjk').text = $clipboard.link;
                tmenu($clipboard.link)
            }
        }
    }, {
        type: 'view',
        props: {
            id: 'vediobtn',
            hidden: true
        },
        layout: function (make, view) {
            make.left.right.inset(10);
            make.top.equalTo($('bt1').bottom).inset(30)
            make.height.equalTo(260)
        },
        views: [{
            type: 'button',
            props: {
                title: all_type[0].vid,
                id: 'Btnhz',
                bgcolor: $color('#ffffff'),
                titleColor: $color('#000000'),
            },
            layout: function (make, view) {
                make.top.inset(5)
                make.right.inset(5);
                make.height.equalTo(35);
                make.width.equalTo(85)
            },
            events: {
                tapped: function (sender) {
                    $ui.menu({
                        items: all_type.map(function (item) {
                            return item.name;
                        }),
                        handler(title, idx) {
                            var hzm = all_type[idx].vid
                            $cache.set("vid", hzm)
                            $('Btnhz').title = hzm
                        }
                    })
                }
            }
        }, {
            type: "input",
            props: {
                id: "bjk_wjm",
                radius: 5,
                bgcolor: $color('#ffffff'),
                placeholder: "文件名"
            },
            layout: function (make) {
                make.top.inset(5)
                make.left.inset(5);
                make.right.equalTo($("Btnhz").left).inset(8)
                make.height.equalTo(35);
            },
            events: {
                didEndEditing: function (sender) {
                    $cache.set("wjm", sender.text)
                }
            }
        }, {
            type: 'button',
            props: {
                title: '下载 规则 文件',
                id: 'dBtn',
                bgcolor: $color('#409eff')
            },
            layout: function (make, view) {
                make.top.equalTo($('bjk_wjm').bottom).inset(20)
                make.left.right.inset(5);
                make.height.equalTo(40);
            },
            events: {
                tapped: function (sender) {
                    download()
                }
            }
        },
        {
            type: 'button',
            props: {
                title: '下载 规则 图标',
                id: 'fBtn',
                bgcolor: $color('#909399')
            },
            layout: function (make, view) {
                make.top.equalTo($('dBtn').bottom).inset(10)
                make.right.left.inset(5);
                make.height.equalTo(40);
            },
            events: {
                tapped: function (sender) {
                    $http.download({
                        url: $cache.get("info").img,
                        handler: function (resp) {
                            $photo.save({
                                data: resp.data,
                                handler: function (success) {
                                    if (success) {
                                        $ui.alert("已保存到相册！");
                                    }
                                }
                            })
                        }
                    });
                }
            }
        }]
    }, {
        type: "label",
        props: {
            id: "tis2",
            text: "规则文件提取可方便的提取workflow规则文件和捷径以及快捷指令格式文件。还支持下载规则图标。",
            font: $font(14),
            lines: 0,
            textColor: $color("#aaa"),
            align: 4,
        },
        layout: function (make, view) {
            make.top.equalTo($("vediobtn").bottom).inset(10)
            make.right.left.inset(15);
            make.height.equalTo(100);

        }
    }, {
        type: "spinner",
        props: {
            loading: false
        },
        layout: function (make, view) {
            make.bottom.equalTo($("bjk").bottom).inset(-10)
            make.centerX.equalTo(view.super)
        }
    },]
});

function tmenu(text) {
    $('vediobtn').hidden = true
    var url = $detector.link(text);
    url = url[0]
    if (!url) {
        $ui.alert("请先捷径或workflow规则链接");
    } else {
        $('spinner').loading = true;
        $http.lengthen({
            url: url,
            handler: function (url) {
                var u = url.replace(/shortcuts/, "shortcuts/api/records")
                get_tiqu(u)
            }
        });
    }
}

getclipboard()