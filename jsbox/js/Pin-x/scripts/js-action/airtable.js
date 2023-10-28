var listdata = [{
    icon: { icon: $icon("018", $color("tint")) },
    mc: { text: "扫一扫" },
    url: "alipays://platformapi/startapp?saId=10000007"
}, {
    icon: { icon: $icon("146", $color("tint")) },
    mc: { text: "付钱" },
    url: "alipayqr://platformapi/startapp?saId=20000056"
}, {
    icon: { icon: $icon("141", $color("tint")) },
    mc: { text: "收钱" },
    url: "alipays://platformapi/startapp?appId=20000123"
}, {
    icon: { icon: $icon("162", $color("tint")) },
    mc: { text: "转账" },
    url: "alipayqr://platformapi/startapp?saId=20000116"
}, {
    icon: { icon: $icon("122", $color("tint")) },
    mc: { text: "手机充值" },
    url: "alipays://platformapi/startapp?appId=10000003"
}, {
    icon: { icon: $icon("017", $color("tint")) },
    mc: { text: "微信扫码" },
    url: "weixin://scanqrcode"
}, {
    icon: { icon: $icon("190", $color("tint")) },
    mc: { text: "Pay" },
    url: "shoebox://"
}, {
    icon: { icon: $icon("226", $color("tint")) },
    mc: { text: "蚂蚁庄园" },
    url: "alipays://platformapi/startapp?appId=66666674"
}, {
    icon: { icon: $icon("134", $color("tint")) },
    mc: { text: "蚂蚁森林" },
    url: "alipays://platformapi/startapp?appId=60000002"
}, {
    icon: { icon: $icon("142", $color("tint")) },
    mc: { text: "信用还款" },
    url: "alipays://platformapi/startapp?appId=09999999"
}]


function run() {
    $ui.render({
        props: {
            title: "支付",
            id: "zhifu",
        },
        views: [{
            type: "matrix",
            props: {
                columns: 5,
                itemHeight: 70,
                data: listdata,
                template: [{
                    type: "image",
                    props: {
                        id: "icon",
                        bgcolor: $color("clear"),
                    },
                    layout: function (make, view) {
                        make.top.inset(10)
                        make.centerX.equalTo(view.center)
                        make.width.height.equalTo(30)

                    }
                }, {
                    type: "label",
                    props: {
                        id: "mc",
                        font: $font(14)
                    },
                    layout(make, view) {
                        make.top.equalTo($("icon").bottom).inset(5)
                        make.centerX.equalTo(view.center)
                        make.height.equalTo(25)
                    }
                }]
            },
            layout: function (make) {
                make.top.left.bottom.right.equalTo(0)
            },
            events: {
                didSelect: function (sender, indexPath, obj) {

                    $app.openURL(obj.url);
                }

            }
        }, {
            type: "button",
            props: {
                icon: $icon("225", $color("tint"), $size(20, 20)),
                bgcolor: $color("clear")
            },
            layout: function (make) {
                make.right.bottom.inset(10);
            },
            events: {
                tapped(sender) {
                    $device.taptic(0);
                    $widget.height = 180;
                    $("zhifu").remove();
                    var dataManager = require("../data-manager");
                    dataManager.init();
                    var path = $app.env == $env.app ? "scripts/app" : "scripts/widget";
                    var module = require(path);
                    module.init();
                }
            }
        },]
    })
}

module.exports = {
    run: run
};