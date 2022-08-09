/*
2019年4月10日 更新

网购历史价格查询 1.2
功能：自动查询商品隐藏优惠券。
支持：淘宝、京东、舒宁、亚马逊、等各大网商商品历史价格查询。

by：iPhone 8、小良
https://iphone8.vip/
*/
var ycq;
$ui.render({
    props: {
        title: "网购历史价格查询 1.2",

    },
    views: [{
        type: "button",
        props: {
            title: "查询",
            id: "bt1"
        },
        layout: function (make) {
            make.top.inset(10);
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
            make.top.inset(10);
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
            make.top.equalTo($("bjk").bottom).inset(10);
        },
        views: [{
            type: "web",
            props: {
                id: "web",
                scrollEnabled: 0,
                showsProgress: 0,
                script: function () {
                    document.getElementsByClassName("g")[0].style.display = "none";
                    document.getElementsByClassName("app-promotion-bar")[0].style.display = "none";
                    document.getElementsByClassName("letTry")[0].style.display = "none";
                    document.getElementsByClassName("trend_page")[0].style.display = "none";
                    document.getElementsByClassName("note")[0].style.display = "none";
                    $notify("share")
                }
            },
            layout: function (make, view) {
                make.top.equalTo(0)
                make.right.left.inset(0)
                make.bottom.inset(100)
            },
            events: {
                share: function (obj) {
                    $('xxjgjm').hidden = false;
                    $('jzdh').hidden = true;
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
                    make.top.inset(0);
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
    $('xxjgjm').hidden = true;
    $('jzdh').hidden = false;
    $('quanBt').title = "直接购买"
    var url = $detector.link(text);
    if (!url[0]) {
        $ui.alert("请先输入链接");
    } else {
        $ui.toast("处理中，请稍后···")
        $('web').url = "http://tool.manmanbuy.com/m/disSitePro.aspx?c_from=mmbapp&url=" + $text.URLEncode(url);
        GetUrlParam(url[0])
    }
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

function GetUrlParam(url) {
    var arrObj = url.split("?");
    if (arrObj.length > 1) {
        var arrPara = arrObj[1].split("&");
        var arr;
        for (var i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split("=");
            if (arr != null && arr[0] == "id") {
                getzk(arr[1])
            }
        }
    }
    else {
        $ui.error("未找到该商品id信息");
    }
}

