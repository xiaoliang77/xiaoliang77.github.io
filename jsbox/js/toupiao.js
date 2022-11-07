
var timer
function csh() {
    $ui.render({
        props: {
            title: "投票",
            id: "ssjm"
        },
        views: [
            {
                type: "web",
                props: {
                    id: "web",
                    url: "https://www.wenjuan.com/s/Y7Rb2iq/",
                    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.24"
                },
                layout: $layout.fill,
                events: {
                    didFinish: function (sender, navigation) {
                        console.log(sender);
                        zhur()
                    }
                }
            }, {
                type: 'view',
                props: {
                    id: 'viewps',
                    bgcolor: $color("#dddddd")
                },
                layout: function (make, view) {
                    make.left.right.top.equalTo(0);
                    make.height.equalTo(32)
                },
                views: [{
                    type: "label",
                    props: {
                        font: $font(16),
                        text: "票数："

                    },
                    layout: function (make, view) {
                        make.left.inset(5);
                        make.top.inset(5);
                    }
                }, {
                    type: "label",
                    props: {
                        id: "zpiao",
                        font: $font(16),
                        text: "106848",
                        textColor: $color("red"),

                    },
                    layout: function (make, view) {
                        make.left.equalTo(46);
                        make.top.inset(5);
                    }
                }, {
                    type: "label",
                    props: {
                        font: $font(16),
                        text: "排名："

                    },
                    layout: function (make, view) {
                        make.left.inset(120);
                        make.top.inset(5);

                    }
                }, {
                    type: "label",
                    props: {
                        id: "paiming",
                        font: $font(16),
                        text: "12",
                        textColor: $color("orange"),

                    },
                    layout: function (make, view) {
                        make.left.equalTo(160);
                        make.top.inset(5);
                    }
                }, {
                    type: "label",
                    props: {
                        id: "cha",
                        font: $font(16),
                        text: "距离上一名99999票"
                    },
                    layout: function (make, view) {
                        make.left.inset(195);
                        make.top.inset(5);

                    }
                }, {
                    type: "button",
                    props: {
                        title: "刷新",
                        id: "btn_s"
                    },
                    layout: function (make, view) {
                        make.right.inset(5)
                        make.top.inset(2)
                        make.width.equalTo(57)
                        make.height.equalTo(27)

                    },
                    events: {
                        tapped: function (sender) {
                            get_data()
                        }
                    }
                },]
            },
        ]
    })
}


csh()
function zhur() {
    var webView = $("web")
    webView.eval({
        script: `document.getElementsByClassName("ws-checkbox")[137].click();document.getElementById("answer-submit-btn").click();`,
        handler: function (result, error) {

            timer = $timer.schedule({
                interval: 1,
                handler: function () {
                    $("web").eval({
                        script: `var zt = document.getElementById("end-desc"); window.name = zt`,
                        handler: function (result, error) {
                            if (result.code == 5) {
                                timer.invalidate()
                                $("web").url = "https://www.wenjuan.com/s/Y7Rb2iq/"
                            }

                        }
                    })
                }
            });

        }
    })
}


async function get_data() {
    $http.get({
        url: "https://www.wenjuan.com/vote/get_result/?project_id=635895bc5d2f8239434e8494&rid=635d8f98667a382b35d5a43e",
        handler: function (resp) {
            var data = resp.data;
            $("zpiao").text = data.data.vote_option_count_list[0].count
            $("paiming").text = data.data.vote_option_count_list[0].index
            $("cha").text = "距离上一名" + data.data.vote_option_count_list[0].diff_up + "票"
        }
    });

}

get_data()

