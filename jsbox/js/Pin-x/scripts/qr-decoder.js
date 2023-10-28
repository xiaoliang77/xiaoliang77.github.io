function render() {
    $widget.height = 181
    $ui.render({
        views: [{
            type: "matrix",
            props: {
                id: "photos",
                square: true,
                columns: 4,
                spacing: 1,
                template: [{
                    type: "image",
                    props: {
                        id: "img"
                    },
                    layout: $layout.fill,
                }
                ]
            },
            layout: $layout.fill,
            events: {
                didSelect: function (sender, indexPath, data) {
                    decode(data.tp)
                }
            }
        }, {
            type: "button",
            props: {
                id: "closebtn",
                bgcolor: $color("clear"),
                icon: $icon("225", $color("tint"), $size(18, 18))
            },
            layout: function (make, view) {
                make.top.inset(4);
                make.right.inset(6);
            },
            events: {
                tapped(sender) {
                    $device.taptic(0);
                    $widget.height = 181;
                    $("photos").remove();
                    var path = $app.env == $env.app ? "scripts/app" : "scripts/widget";
                    var module = require(path);
                    module.init();
                }
            }
        },]
    })
}

function xphotos() {
    render()
    if ($env == $env.$app) {
        var count = 12
    } else {
        var count = 3
    }
    $photo.fetch({
        count: count,
        handler: function (images) {
            var data = []
            for (i in images) {
                var img = images[i]
                data.push({ img: { image: img }, tp: img })
            }
            $("photos").data = data
        }
    })
}

function decode(img) {
    var text = $qrcode.decode(img)
    if (text) {
        alert("识别成功\n" + text)
        var dataManager = require("../data-manager");
        dataManager.copied2Clip(text);
        $clipboard.text = text
    } else {
        alert("识别失败")
    }
}

function csh() {
    url = $clipboard.link
    if (url) {
        $http.download({
            url: url,
            handler: function (resp) {
                decode(resp.data.image)
            }
        })
    } else {
        xphotos();
    }
}

module.exports = {
    csh: csh
}
