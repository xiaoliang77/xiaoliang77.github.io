/*
网购历史价格查询 1.1
新增：自动查询商品隐藏优惠券。
支持：淘宝、京东、舒宁、亚马逊、等各大网商商品历史价格查询。

by：iPhone 8、小良
http://ae85.cn/
*/
var ycq;
$ui.render({
    props: {
        title: "网购历史价格查询 1.1",

    },
    views: [{
        type: "button",
        props: {
            title: "查询",
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
                tmenu($('bjk').text);
            }
        }
    }, {
        type: "input",
        props: {
            id: "bjk",
            placeholder: "输入商品地址…"
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
                tmenu($('bjk').text);
            }
        }
    }, {
        type: 'view',
        props: {
            hidden: true,
            id: 'xxjgjm',
        },
        layout: function (make, view) {
            make.left.bottom.right.inset(0);
            make.top.equalTo($("bjk").bottom).inset(20);
        },
        views: [{
            type: "image",
            props: {
                id: "lt",
                bgcolor: $color("white")
            },
            layout: function (make, view) {
                make.left.top.inset(10);
                make.size.equalTo($size(100, 100));
            }
        }, {
            type: "label",
            props: {
                id: "b1",
                lines: 3,
                font: $font(15),
            },
            layout(make, view) {
                make.top.inset(10)
                make.right.inset(0)
                make.left.equalTo($("lt").right).inset(10)

            }
        }, {
            type: "label",
            props: {
                id: "b2",
                font: $font(13),
                textColor: $color("#c4c4c4"),
            },
            layout(make, view) {
                make.bottom.equalTo($("lt").bottom)
                make.right.inset(0)
                make.left.equalTo($("b1").left)
            }
        }, {
            type: "label",
            props: {
                id: "b3",
                font: $font("bold", 17),
                textColor: $color("#F00"),
            },
            layout(make, view) {
                make.bottom.equalTo($("b2").top).inset(3)
                make.right.inset(0)
                make.left.equalTo($("b1").left)
            }
        }, {
            type: 'view',
            props: {
                bgcolor: $color("#f2f2f2"),
                id: 'fgf'
            },
            layout: function (make, view) {
                make.left.right.inset(0);
                make.top.equalTo($("lt").bottom).inset(20);
                make.height.equalTo(20)

            }
        }, {
            type: "label",
            props: {
                id: "jgzs",
                text: "价格走势",
                font: $font("bold", 17),
            },
            layout(make, view) {
                make.top.equalTo($("fgf").bottom).inset(15)
                make.left.inset(10)
                make.width.equalTo(100)
            }
        }, {
            type: "label",
            props: {
                id: "zdj",
                font: $font(16),
                textColor: $color("#F00"),
            },
            layout(make, view) {
                make.top.equalTo($("jgzs").top)
                make.right.inset(10)
            }
        }, {
            type: "label",
            props: {
                text: "历史最低价: ",
                font: $font(16),
            },
            layout(make, view) {
                make.top.equalTo($("jgzs").top)
                make.right.equalTo($("zdj").left)
            }
        }, {
            type: 'view',
            props: {
                bgcolor: $color("#f2f2f2"),
                id: 'fgf1'
            },
            layout: function (make, view) {
                make.left.right.inset(0);
                make.top.equalTo($("jgzs").bottom).inset(15);
                make.height.equalTo(1)

            }
        }, {
            type: "web",
            props: {
                id: "web",
                scrollEnabled: 0,
                showsProgress: 0,
                script: function () {
                    document.getElementsByClassName("header-bar border-bottom-img")[0].style.display = "none";
                    document.getElementsByClassName("app-promotion-bar")[0].style.display = "none";
                    document.getElementsByClassName("t")[0].style.display = "none";
                    document.getElementsByClassName("input")[0].style.display = "none";
                    document.getElementsByClassName("btn")[0].style.display = "none";
                    document.getElementsByClassName("spinfo")[0].style.display = "none";
                    $notify("share")
                }
            },
            layout: function (make, view) {
                make.top.equalTo($("fgf1").bottom)
                make.right.left.inset(0)
                make.height.equalTo(250)
            },

            events: {
                share: function (obj) {
                    $('web').hidden = false;
                },
            }
        }, {
            type: 'view',
            props: {
                bgcolor: $color("#f2f2f2"),
                id: 'quan'
            },
            layout: function (make, view) {
                make.left.right.bottom.inset(0);
                make.top.equalTo($("web").bottom)
            },
            views: [{
                type: "button",
                props: {
                    title: "直接购买",
                    id: "quanBt",
                    bgcolor: $color("#f40"),
                },
                layout: function (make) {
                    make.top.inset(20);
                    make.left.right.inset(20);
                    make.height.equalTo(35);
                },
                events: {
                    tapped: function (sender) {
                        $app.openURL(ycq);
                    }
                }
            },]
        },]
    }, {
        type: "image",
        props: {
            id: "jzdh",
            hidden: true,
            src: "https://gitee.com/yao07/other/raw/master/jzz.gif",
            bgcolor: $color("white")
        },
        layout: function (make, view) {
            make.center.equalTo(view.center)
            make.size.equalTo($size(200, 200));
        }
    },]
})

function tmenu(text) {
    $('web').hidden = true;
    $('xxjgjm').hidden = true;
    $('jzdh').hidden = false;
    $('quanBt').title = "直接购买"
    var url = $detector.link(text);
    if (!url[0]) {
        $ui.alert("请先输入链接");
    } else {
        $ui.toast("处理中，请稍后···")
        $('web').url = "http://tool.manmanbuy.com/m/history.aspx?url=" + $text.URLEncode(url);
        getlsjg(url)
    }
}

function getlsjg(text) {
    $ui.loading(true)
    $http.get({
        url: "https://apapia.manmanbuy.com/ChromeWidgetServices/WidgetServices.ashx?p_url=" + $text.URLEncode(text) + "&methodName=getBiJiaInfo_wxsmall&jsoncallback=&jgzspic=no",
        handler: function (resp) {
            $ui.loading(false)
            if (resp.data.ok == 1) {
                var add = resp.data.single
                $('b1').text = add.title
                $('lt').src = add.bigpic
                $('b2').text = add.zk_scname
                $('b3').text = "￥" + add.spmoney
                $('zdj').text = "￥" + add.lowerPrice
                if (add.zk_scname == "淘宝天猫") {
                    ycq = add.url.replace(/http:\/\/|https:\/\//, "taobao://")
                } else {
                    ycq = add.url
                }
                $('xxjgjm').hidden = false;
                $('jzdh').hidden = true;
                getzk(add.id)
            } else {
                alert(resp.data.msj)
            }
        }
    })
}

function getzk(id) {
    $ui.loading(true)
    $http.get({
        url: "http://service.manmanbuy.com/i.ashx?method=mmb.service.mmbcuxiaotbnew.getquannew&spbh=" + id + "&comefrom=BC",
        handler: function (resp) {
            $ui.loading(false)
            var json = JSON.parse(resp.data.result)
            if (json.status == "有券") {
                $ui.toast("发现该商品有隐藏优惠券")
                var quan = json.quanlist[0]
                ycq = quan.quan_url.replace(/http:\/\/|https:\/\//, "taobao://")
                $('quanBt').title = "领取隐藏优惠券：" + quan.quan_remark
            } else {
                $ui.error("未找到该商品隐藏优惠券")
                $('quanBt').title = "未找到隐藏优惠券 - 直接购买"
            }
        }
    })
}

var url = $clipboard.link
if (url) {
    $ui.alert({
        title: "要是否查询剪贴板中的链接",
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