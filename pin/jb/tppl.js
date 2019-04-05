/*
图片评论，可用于微信朋友圈、qq空间、等场所评论使用。还挺好玩的。

by：iPhone 8、小良
https://ae85.cn/
*/
var list_Height = $device.info.screen.width / 5
$ui.render({
    props: {
        navBarHidden: 1,
        statusBarStyle: 1,
        id: "zhuView"
    },
    views: [{
        type: "button",
        props: {
            title: "上传",
            id: "b_sc"
        },
        layout: function (make, view) {
            make.top.inset(5)
            make.right.inset(10)
            make.width.equalTo(64)
        },
        events: {
            tapped: function (sender) {
                shang()
            }
        }
    }, {
        type: "button",
        props: {
            title: "搜索",
            id: "b_sou"
        },
        layout: function (make, view) {
            make.top.inset(5)
            make.right.equalTo($('b_sc').left).inset(10)
            make.width.equalTo(64)
        },
        events: {
            tapped: function (sender) {
                $("bjk").blur()
                var text = $('bjk').text
                if (text) {
                    $('spinner').loading = true;
                    sousuo(text)
                }

            }
        }
    }, {
        type: "input",
        props: {
            id: "bjk",
            placeholder: "输入关键字进行搜索..."
        },
        layout: function (make) {
            make.top.inset(5)
            make.left.inset(10);
            make.right.equalTo($('b_sou').left).inset(10)
            make.height.equalTo(35);
        },
        events: {
            returned: function (sender) {
                $("bjk").blur()
            }
        }
    },
    {
        type: "matrix",
        props: {
            id: "img_list",
            itemHeight: list_Height,
            columns: 5,
            spacing: 5,
            template: [{
                type: "image",
                props: {
                    id: "img",
                    radius: 3
                },
                layout: function (make, view) {
                    make.top.bottom.right.left.inset(0);
                }
            }]
        },
        layout: function (make) {
            make.top.equalTo($("bjk").bottom).inset(5);
            make.bottom.left.right.inset(0);
        },
        events: {
            didSelect: function (sender, indexPath, data) {
                shengc(data.img.src)
            }
        }
    }, {
        type: "spinner",
        props: {
            loading: false
        },
        layout: function (make, view) {
            make.center.equalTo(view.super)
        }
    }]
});

function sousuo(text) {
    var key = $text.URLEncode(text);
    $http.get({
        url: "https://www.doutula.com/api/search?mime=0&page=1&keyword=" + key,
        handler: function (resp) {

            $('spinner').loading = false;
            if (resp.data.status == 1) {
                var arr = resp.data.data.list
                var data = []
                for (i in arr) {
                    data.push({ img: { src: arr[i].image_url } })
                }
                $('img_list').data = data
            }
        }
    })
}

function shang() {
    var url = "http://bbs1.people.com.cn/"
    $photo.pick({
        handler: function (resp) {
            var image = resp.image
            if (image) {
                $('spinner').loading = true;
                $http.upload({
                    url: url + "postImageUpload.do",
                    form: {
                    },
                    files: [
                        {
                            "image": image,
                            "name": "Filedata",
                            "filename": "Filedata.png"
                        }
                    ],
                    handler: function (resp) {
                        $('spinner').loading = false;
                        shengc(url + resp.data.imageUrl)
                    }
                })
            }
        }
    })
}

function shengc(url) {
    $http.shorten({
        url: url,
        handler: function (resp) {
            var te = "图片评论👍" + resp
            if ($app.env == $env.keyboard) {
                $keyboard.insert(te);
                $keyboard.next()
            } else {
                $clipboard.text = te;
                $ui.toast("已复制");
            }
        }
    });
}
