/*
网购历史价格查询
支持：淘宝、京东、舒宁、亚马逊、等各大网商商品历史价格查询。

by：iPhone 8、小良
http://ae85.cn/
*/
$ui.render({
    props: {
        title: "历史价格查询"
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
        type: "label",
        props: {
            id: "b1",
            hidden: true,
            textColor: $color("#FF0000"),
            align: $align.center
        },
        layout(make, view) {
            make.left.right.equalTo(0)
            make.top.equalTo($("bjk").bottom).inset(15)
            make.height.equalTo(40)
        }
    }, {
        type: "web",
        props: {
            id: "web",
            scrollEnabled: 0,
            hidden: true,
            script: function () {
                document.getElementsByClassName("header-bar border-bottom-img")[0].style.display = "none";
                document.getElementsByClassName("app-promotion-bar")[0].style.display = "none";
                document.getElementsByClassName("t")[0].style.display = "none";
                document.getElementsByClassName("input")[0].style.display = "none";
                document.getElementsByClassName("btn")[0].style.display = "none";
                document.getElementsByClassName("spinfo")[0].style.display = "none";
                var zdj = document.getElementsByClassName("bigwidth")[0].textContent;
                $notify("share", zdj)
            }
        },
        layout: function (make, view) {
            make.top.equalTo($("b1").bottom)
            make.right.left.inset(0)
            make.height.equalTo(250)
        },

        events: {
            share: function (obj) {
                $('b1').text = obj
                $('web').hidden = false;
                $("b1").hidden = false;
            },
        }
    },]
})

function tmenu(text) {
    $('web').hidden = true;
    $('b1').hidden = true;
    var url = $detector.link(text);
    if (!url[0]) {
        $ui.alert("请先输入链接");
    } else {
        $ui.toast("处理中，请稍后···")
        $('web').url = "http://tool.manmanbuy.com/m/history.aspx?url=" + $text.URLEncode(url);
    }
}

function getclipboard() {
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
}
getclipboard()