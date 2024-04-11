/*
小良 - 更新器 3.2
 2024年4月11 修复更新配置文件
 *快速获取安装小良个人作品

by：iPhone 8、小良
https://iphone8.vip/
https://ae85.cn/

博客：87xl.cn
*/

const pz = {
    title: "小良 - 更新器 3.2",
    pin: "pin://install?url=",
    anzsb: "安装失败！\n请检查你的网络是否正常",
    banqsm: "- 感谢支持 - iPhone8.vip -\n唯一官方正版、未经允许请勿转载\n版权所有 iPhone 8、小良 ©2016~2024",
    lei: ["首页推荐", "安装脚本", "添加规则", "查看教程", "获取应用"],
    slide: []
};

const menu = {
    type: "menu",
    props: {
        id: "Menu",
        items: ["推荐", "脚本", "规则", "教程", "应用", "关于"]
    },
    layout: function (make) {
        make.left.bottom.right.equalTo(0);
        make.height.equalTo(40);
    },
    events: {
        changed: function (sender) {
            var index = sender.index;
            $delay(0.1, function () {
                if (index == 0) {
                    csh();
                    render();
                } else {
                    zxgetlist(index);
                }
            });
        }
    }
};

const fgx = {
    type: "view",
    props: {
        id: "fy",
        bgcolor: $color("#838b8b")
    },
    layout: function (make) {
        make.left.right.equalTo(0);
        make.bottom.equalTo($("Menu").top);
        make.height.equalTo(0.75);
        make.width.equalTo($device.info.screen.width);
    }
};

const vlist = {
    type: "list",
    props: {
        id: "vlist",
        rowHeight: 210,
        template: [
            {
                type: "label",
                props: {
                    id: "lmc",
                    font: $font("bold", 23),
                    lines: 0
                },
                layout: function (make, view) {
                    make.left.right.inset(10);
                    make.top.inset(10);
                }
            },
            {
                type: "label",
                props: {
                    id: "xsqb",
                    text: "显示全部 〉",
                    font: $font(16),
                    textColor: $color("blue")
                },
                layout: function (make) {
                    make.top.inset(5);
                    make.right.inset(0);
                    make.width.equalTo(90);
                    make.height.equalTo(35);
                }
            },
            {
                type: "matrix",
                props: {
                    id: "cd",
                    itemHeight: 80,
                    columns: 4,
                    spacing: 5,
                    template: [
                        {
                            type: "image",
                            props: {
                                id: "img",
                                radius: 16
                            },
                            layout: function (make, view) {
                                make.top.inset(0);
                                make.centerX.equalTo(view.center);
                                make.height.width.equalTo(80);
                            }
                        },
                        {
                            type: "label",
                            props: {
                                id: "pm",
                                align: $align.center,
                                lines: 0,
                                font: $font("bold", 12)
                            },
                            layout: function (make, view) {
                                make.top.equalTo($("img").bottom).offset(5);
                                make.right.left.inset(5);
                            }
                        },
                    ]
                },
                layout: function (make) {
                    make.top.equalTo($("lmc").bottom).inset(20);
                    make.left.right.inset(0);
                    make.height.equalTo(155);
                },
                events: {
                    didSelect: function (sender, indexPath, data) {
                        xqym(data.data, data.idx);
                    }
                }
            }
        ]
    },
    layout: function (make, view) {
        make.width.equalTo(view.super);
        make.left.inset(0);
        make.top.equalTo($("gall").bottom).inset(5);
        make.height.equalTo(975);
    },
    events: {
        didSelect: function (sender, indexPath, data) {
            zxgetlist(data.id);
        }
    }
};

function refetch() {
    var turl = $text.base64Decode("aHR0cHM6Ly9pcGhvbmU4LnZpcC9jb25maWcv") + "jsbox.json"
    $ui.loading(true);
    $http.get({
        url: turl,
        handler: async function (resp) {
            $ui.loading(false);
            var res = resp.data;
            if ( res.version != "3.2") {
                $ui.alert({
                    title: "发现新版本",
                    message: res.hant,
                    actions: [
                        {
                            title: "立即更新",
                            handler: function () {
                                azjs( res.file,  res.name);
                            }
                        },
                        {
                            title: "访问官网",
                            handler: function () {
                                $app.openURL("https://iphone8.vip/");
                            }
                        }
                    ]
                });
            } else {
                $ui.loading(true);
                const t = '?t='+new Date().getTime()
                const gz = await get_data(res.data_link.gz+t)
                const jb = await get_data(res.data_link.jb+t)
                $ui.loading(false);
                res.data.gz = gz;
                res.data.jb = jb;
                $cache.set("stories", res);
                pz.slide = slide()
                csh();
                render();
                tcgg(res.js.gg);
            }
        }
    });
}

function tcgg(gg) {
    if ($file.exists("gg.txt")) {
        var file = $file.read("gg.txt").string;
        $console.info(file);
        if (file != gg) {
            xrwj(gg);
        }
    } else {
        xrwj(gg);
    }
}

async function get_data(url) {
    var resp = await $http.get({ url: url });
    return resp.data;
}

const isImgHttp = (url) => {
    const gw = $cache.get("stories").gw
    if (!url) {
        return gw + "img/jzsb.png";
    } else if (url.includes("https://")) {
        return url;
    } else {
        return gw + "img/" + url;
    }
}

function timestampToTime(timestamp) {
    const date = new Date(+timestamp);
    if (date instanceof Date && !isNaN(date.getTime())) {
        return `更新：${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    }else{
        return timestamp;
    }
}

function xrwj(nr) {
    $ui.alert(nr);
    $file.write({
        data: $data({ string: nr }),
        path: "gg.txt"
    });
}

function zxgetlist(id) {
    var json = $cache.get("stories").data;
    if (id == 1) {
        listjm("脚本列表", "⁺ 安装 ", id);
        $("Menu").index = 1;
        getlist(json.jb, id);
    } else if (id == 2) {
        listjm("规则列表", "⁺ 添加 ", id);
        $("Menu").index = 2;
        getlist(json.gz, id);
    } else if (id == 3) {
        listjm("教程列表", "⁺ 观看 ", id);
        $("Menu").index = 3;
        getlist(json.jc, id);
    } else if (id == 4) {
        listjm("应用列表", "⁺ 获取 ", id);
        $("Menu").index = 4;
        getlist(json.yy, id);
    } else if (id == 5) {
        listjm("关于作者", "⁺ 点赞 ", id);
        $("Menu").index = 5;
        getlist(json.qt, id);
    }
}

refetch();

function slide() {
    var arr = $cache.get("stories").js.zygd;
    var gw = $cache.get("stories").gw
    var data = [];
    for (i in arr) {
        var gd = arr[i];
        data.push({
            type: "button",
            props: {
                src: gw + "img/" + gd.src,
                title: i
            },
            events: {
                tapped(sender) {
                    get_slide(sender.title)
                }
            }
        })
    }
    return data;
}

function get_slide(i) {
    var arr = $cache.get("stories").js.zygd;
    web(arr[i].url, arr[i].name);
}

function azjs(jsurl, jsname) {
    const appid = $app.info.bundleID;
    const appbb = $app.info.version;
    const gw = $cache.get("stories").gw;
    const name = jsname.replace(/🔥/, "")
    const d_name = encodeURI(name)
    var url = gw + "jsbox/js/" + jsurl;
    if (jsurl.includes("https://")) {
        url = jsurl;
    } 
    
    const pin_url = url + "&name=" + d_name;
    if (appid == "app.cyan.pin") {
        if ((appbb == "3.2.2") | (appbb == "3.2.3")) {
            $ui.toast("正在安装中 ...");
            $app.openURL(pz.pin + pin_url);
        } else {
            $ui.alert({
                title: "温馨提示:",
                message:
                    "您的Pin版本不支持直接导入\n你还可以选择以下方式添加\n\n1.分享模式可以将js文件分享到微信或其它App或备忘录后再导入到Pin\n\n2.复制代码模式:在pin新建一个空白脚本将复制后的代码粘贴到代码区保存即可\n\n如果不会操作请看视频教程",
                actions: [
                    {
                        title: "分享文件模式添加",
                        handler: function () {
                            $ui.toast("正在下载中 ...");
                            $ui.loading(true);
                            $http.download({
                                url: url,
                                handler: function (resp) {
                                    $ui.loading(false);
                                    if (resp.response.statusCode == "200") {
                                        $share.sheet([name + ".js", resp.data]);
                                    } else {
                                        $ui.alert(pz.anzsb);
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: "复制代码模式添加",
                        handler: function () {
                            $ui.loading(true);
                            $http.get({
                                url: url,
                                handler: function (resp) {
                                    $ui.loading(false);

                                    if (resp.response.statusCode == "200") {
                                        $clipboard.text = resp.data;
                                        $ui.alert("js脚本代码已复制\n\n新建扩展脚本粘贴即可");
                                    } else {
                                        $ui.alert(pz.anzsb);
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: "观看添加视频教程",
                        handler: function () {
                            $app.openURL("https://mp.weixin.qq.com/s/9E86yTg1Nwm7XuZeOqhVLQ");
                        }
                    },
                    {
                        title: "取消"
                    }
                ]
            });
        }
    } else if (appid == "app.cyan.jsbox") {
        $ui.toast("正在安装中 ...");
        $http.download({
            url: url,
            handler: function (resp) {
                $addin.save({
                    name: name,
                    data: resp.data,
                    handler: function () {
                        $ui.alert({
                            title: "安装完成",
                            message: "\n是否打开？\n" + name,
                            actions: [
                                {
                                    title: "打开",
                                    handler: function () {
                                        $app.openExtension(name)
                                    }
                                },
                                {
                                    title: "不了"
                                }]
                        });
                    }
                })
            }
        })
    }
}

function render() {
    var json = $cache.get("stories").data;
    $("vlist").data = [
        clzyli(json.jb, "最新js脚本", "1"),
        clzyli(json.gz, "热门快捷指令规则", "2"),
        clzyli(json.jc, "各类实用教程", "3"),
        clzyli(json.yy, "破解App应用", "4"),
        clzyli(json.qt, "关于作者", "5")
    ];
}

function clzyli(json, mc, idx) {
    var data = [];
    for (i in json) {
        if (i < 4) {
            data.push({
                img: { src: isImgHttp(json[i].img) },
                pm: { text: json[i].title },
                rq: { text: timestampToTime(json[i].rq) },
                data: json[i],
                idx: idx
            });
        }
    }
    var txt = {
        lmc: { text: mc },
        cd: { data: data },
        id: idx
    };
    return txt;
}

[{
    type: "gallery",
    props: {
        id: "gall",
        items: pz.slide,
        interval: 3
    },
    layout: function (make, view) {
        make.height.equalTo(160);
        make.width.equalTo(view.super);
        make.top.left.inset(0);
    }
}]
function csh() {
    $ui.render({
        props: {
            title: pz.title
        },
        views: [
            menu,
            fgx,
            {
                type: "scroll",
                layout: function (make, view) {
                    make.top.left.right.inset(0);
                    make.bottom.equalTo($("fy").top);
                },
                views: [
                    {
                        type: "gallery",
                        props: {
                            id: "gall",
                            items: pz.slide,
                            interval: 3
                        },
                        layout: function (make, view) {
                            make.height.equalTo(166);
                            make.width.equalTo(view.super);
                            make.top.left.inset(0);
                        }
                    },
                    vlist,
                    {
                        type: "label",
                        props: {
                            align: $align.center,
                            font: $font(14),
                            textColor: $color("blue"),
                            text: pz.banqsm,
                            lines: 0
                        },
                        layout: function (make, view) {
                            make.width.equalTo(view.super);
                            make.left.inset(0);
                            make.top.equalTo($("vlist").bottom).inset(5);
                            make.height.equalTo(75);
                        }
                    }
                ]
            },
        ]
    });
}

function getlist(json, lei) {
    var gw = $cache.get("stories").gw
    var data = [];
    for (var idx in json) {
        var story = json[idx];
        data.push({
            lt: {
                src: isImgHttp(story.img)
            },
            mc: {
                text: story.title
            },
            sm: {
                text: story.sm
            },
            hhq: {
                data: [{ url: story.url, title: story.title }]
            },
            rq: {
                text: timestampToTime(story.rq)
            },
            data: story,
            idx: lei
        });
    }
    $("list").data = data;
    $("list").endRefreshing();
}

function listjm(bt, ant, id) {
    $ui.render({
        props: {
            title: bt
        },
        views: [
            menu,
            fgx,
            {
                type: "list",
                props: {
                    rowHeight: 95,
                    template: [
                        {
                            type: "image",
                            props: {
                                id: "lt",
                                radius: 16,
                                bgcolor: $color("white")
                            },
                            layout: function (make, view) {
                                make.left.top.bottom.inset(10);
                                make.width.equalTo(view.height);
                            }
                        },
                        {
                            type: "label",
                            props: {
                                id: "mc",
                                font: $font("bold", 17),
                                lines: 0
                            },
                            layout: function (make, view) {
                                make.left.equalTo($("lt").right).offset(10);
                                make.top.inset(13);
                            }
                        },
                        {
                            type: "label",
                            props: {
                                id: "rq",
                                font: $font(15),
                                textColor: $color("blue")
                            },
                            layout: function (make) {
                                make.left.equalTo($("mc"));
                                make.top.equalTo($("mc").bottom).inset(5);
                            }
                        },
                        {
                            type: "label",
                            props: {
                                id: "sm",
                                font: $font(15),
                                textColor: $color("gray")
                            },
                            layout: function (make) {
                                make.left.equalTo($("rq"));
                                make.top.equalTo($("rq").bottom).inset(5);
                            }
                        },
                        {
                            type: "matrix",
                            props: {
                                id: "hhq",
                                itemHeight: 30,
                                columns: 1,
                                spacing: 0,
                                template: [
                                    {
                                        type: "label",
                                        props: {
                                            id: "hq",
                                            text: ant,
                                            radius: 5,
                                            textColor: $color("blue"),
                                            borderColor: $color("blue"),
                                            borderWidth: 1,
                                            align: $align.center,
                                            font: $font(15)
                                        },
                                        layout: $layout.fill
                                    }
                                ]
                            },
                            layout: function (make) {
                                make.top.inset(32);
                                make.size.equalTo($size(50, 30));
                                make.right.inset(10);
                            },
                            events: {
                                didSelect: function (sender, indexPath, data) {
                                    if (id == 1) {
                                        azjs(data.url, data.title);
                                    } else if (id == 2) {
                                        installgz(data.url)
                                    } else {
                                        $app.openURL(data.url);
                                    }
                                }
                            }
                        }
                    ]
                },
                layout: function (make) {
                    make.top.equalTo(0);
                    make.bottom.equalTo($("fy").top);
                    make.right.left.inset(0);
                },
                events: {
                    didSelect: function (sender, indexPath, data) {
                        xqym(data.data, data.idx);
                    }
                }
            },
        ]
    });
}

function xqym(data, idx) {
    var an_name = pz.lei[idx]
    if (idx == 5) {
        an_name = data.button
    }
    $ui.push({
        props: {
            title: pz.title
        },
        views: [
            menu,
            fgx,
            {
                type: "image",
                props: {
                    id: "icon",
                    src: isImgHttp(data.img),
                    radius: 16,
                    bgcolor: $color("white")
                },
                layout: function (make, view) {
                    make.left.top.inset(5);
                    make.width.height.equalTo(100);
                }
            },
            {
                type: "label",
                props: {
                    id: "biao",
                    text: data.title,
                    font: $font("bold", 21),
                    lines: 0
                },
                layout: function (make, view) {
                    make.left.equalTo($("icon").right).offset(10);
                    make.top.inset(10);
                }
            },
            {
                type: "label",
                props: {
                    id: "biaorq",
                    text: timestampToTime(data.rq),
                    font: $font(15),
                    textColor: $color("blue"),
                    lines: 0
                },
                layout: function (make, view) {
                    make.left.equalTo($("icon").right).offset(10);
                    make.top.equalTo($("biao").bottom).inset(10);
                }
            },
            {
                type: "label",
                props: {
                    id: "biaozz",
                    text: data.author,
                    font: $font(15),
                    radius: 7,
                    textColor: $color("#777777"),
                    bgcolor: $color("#F5F5F5"),
                    lines: 0
                },
                layout: function (make, view) {
                    make.left.equalTo($("icon").right).offset(10);
                    make.top.equalTo($("biaorq").bottom).inset(10);
                }
            },
            {
                type: "button",
                props: {
                    id: "bt1",
                    title: an_name,
                    font: $font(16),
                    titleColor: $color("blue"),
                    bgcolor: $color("clear"),
                    borderColor: $color("blue"),
                    borderWidth: 1
                },
                layout: function (make) {
                    make.bottom.equalTo($("icon").bottom);
                    make.right.inset(5);
                    make.size.equalTo($size(100, 32));
                },
                events: {
                    tapped: function (sender) {
                        if (idx == 1) {
                            azjs(data.url, data.title);
                        } else if (idx == 2) {
                            installgz(data.url)
                        } else {
                            $app.openURL(data.url);
                        }
                    },
                    longPressed: function (sender) {
                        //暂时取消长按功能
                    }
                }
            },
            {
                type: "tab",
                props: {
                    items: ["详情", "教程"],
                    index: 0
                },
                layout: function (make) {
                    make.left.right.inset(30);
                    make.top.equalTo($("icon").bottom).offset(10);
                    make.height.equalTo(28);
                },
                events: {
                    changed: function (sender) {
                        if (sender.index == 0) {
                            $("smbq").alpha = 1;
                            $("web").alpha = 0;
                        } else {
                            $("smbq").alpha = 0;
                            $("web").alpha = 1;
                        }
                    }
                }
            },
            {
                type: "view",
                props: {
                    id: "fh",
                    bgcolor: $color("#838b8b")
                },
                layout: function (make) {
                    make.left.equalTo(0);
                    make.top.equalTo($("tab").bottom).offset(5);
                    make.height.equalTo(0.75);
                    make.width.equalTo($device.info.screen.width);
                }
            },
            {
                type: "text",
                props: {
                    id: "smbq",
                    text: data.sm,
                    editable: false,
                    radius: 7,
                    font: $font("Avenir-Light", 17)
                },
                layout: function (make) {
                    make.right.left.inset(5);
                    make.top.equalTo($("fh").bottom).offset(10);
                    make.bottom.equalTo($("fy").top).inset(1);
                }
            },
            {
                type: "web",
                props: {
                    url: data.jsurl,
                    alpha: 0,
                    radius: 7
                },
                layout: function (make, view) {
                    make.left.right.inset(1);
                    make.top.equalTo($("fh").bottom).offset(1);
                    make.bottom.equalTo($("fy").top).inset(1);
                }
            },
        ]
    });
}

function web(url, mc) {
    $ui.push({
        props: {
            title: mc
        },
        views: [
            menu,
            fgx,
            {
                type: "web",
                props: {
                    url: url
                },
                layout: function (make, view) {
                    make.top.left.right.inset(0);
                    make.bottom.equalTo($("fy").top).inset(1);
                }
            },
        ]
    });
}

function installgz(id) {
    $ui.toast("正在处理中 ...");
    if ($device.info.version.split(".")[0] < 12) {
        $http.get({
            url: "https://www.icloud.com/shortcuts/api/records/" + id,
            handler: function (resp) {
                var durl = resp.data.fields.icon.value.downloadURL
                var name = resp.data.fields.name.value
                $http.post({
                    url: "http://web.chacuo.net/charseturlencode",
                    header: {
                        "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Mobile Safari/537.36"
                    },
                    body: {
                        data: durl,
                        type: "urlencode",
                        arg: "s=utf-8_j=1_t=0"
                    },
                    handler: function (resp) {
                        var data = resp.data;
                        data = JSON.stringify(data)
                        var eurl = data.data
                        var url = "workflow://import-workflow/?url=" + eurl + "&name=" + $text.URLEncode(name)
                        $app.openURL(url);
                    }
                });
            }
        });
    } else {
        $app.openURL("https://www.icloud.com/shortcuts/" + id);
    }
}