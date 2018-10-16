/*
2018年10月16日、修复更新
更新：更换服务器资源（抛弃某社区资源的调用）
改变界面布局（尽量的接近短视频播放界面）
支持下载，复制链接。
上滑下拉可切换视频。

by：iPhone 8、小良
http://ae85.cn/
*/
var itemHeight = $device.info.screen.height
const base64 = "aHR0cHM6Ly9naXRlZS5jblzveWFvMDcvdXBkYXRlX2RldmljZS9yYXcvbWFzdGVyL2RvdXlpbi5qc29u"
$ui.loading(true)
$http.get({
  url: $text.base64Decode(base64.replace(/lz/, "20")),
  handler: function(resp) {
    $ui.loading(false)
    if (resp.response.statusCode == "200") {
      var info = resp.data;
      if (info.bb != "2.0") {
        $ui.alert({
          title: "温馨提示",
          message: info.gxsm,
          actions: [{
            title: "进入官网",
            handler: function() {
              $app.openURL(info.gw)
            }
          }, {
            title: "关注公众号",
            handler: function() {
              $ui.alert({
                title: "温馨提示",
                message: "跳转微信会自动复制公众号ID\n请跳转到微信-搜索-公用号-粘贴-关注",
                actions: [{
                  title: "跳转微信",
                  handler: function() {
                    $clipboard.text = "ae85-cn"
                    $app.openURL("weixin://")
                  }
                }, {
                  title: "取消"
                }]
              })
            }
          }]
        })
      } else {
        $cache.set("info", info)
        getdata()
      }

    } else {
      $ui.alert("加载失败")
    }
  }
})

var timg = "https://gitee.com/yao07/update_device/raw/master/sucai/"
$ui.render({
    props: {
        id: "mView",
        statusBarStyle: 0,
        navBarHidden: true,
        statusBarHidden: true,
        bgcolor: $color("black")
    },
    views: [{
        type: "matrix",
        props: {
            id: "Video",
            bgcolor: $color("black"),
            itemHeight: itemHeight,
            columns: 1,
            spacing: 0,
            waterfall: false,
            template: [{
                type: "video",
                props: {
                    id: "video",
                },
                layout: function (make, view) {
                    make.left.right.top.bottom.inset(-3)
                }
            }]
        },
        layout: function (make) {
            make.bottom.left.right.top.inset(0)
        },
        events: {
            didSelect: function (sender, indexPath, data) {
                $("video").toggle()
            },
            didReachBottom: function (sender) {
                sender.endFetchingMore()
                cldata()
            },
            pulled: function (sender) {
                sender.endRefreshing()
                xldata()

            }
        }
    },
    {
        type: "button",
        props: {
            id: "x_img",
            src: timg + "x.png"
        },
        events: {
            tapped: function (sender) {
                $app.close()
            }
        },
        layout: function (make, view) {
            make.top.left.inset(5);
            make.width.height.equalTo(50);
        }
    }, {
        type: "button",
        props: {
            id: "xia_img",
            src: timg + "xia.png"
        },
        events: {
            tapped: function (sender) {
                download($("video").src)
            }
        },
        layout: function (make, view) {
            make.top.inset(2);
            make.left.equalTo($("x_img").right).inset(15);
            make.width.height.equalTo(58);
        }
    }, {
        type: "button",
        props: {
            id: "fuzhi_img",
            src: timg + "fuzhi.png"
        },
        events: {
            tapped: function (sender) {
                $clipboard.text = $("video").src
                $ui.toast("已复制");
            }
        },
        layout: function (make, view) {
            make.top.inset(5);
            make.left.equalTo($("xia_img").right).inset(15);
            make.width.height.equalTo(50);
        }
    }, {
        type: "button",
        props: {
            id: "hb_img",
            src: timg + "hongbao.png"
        },
        events: {
            tapped: function (sender) {
                $app.openURL(
                    "alipays://platformapi/startapp?appId=20000067&__open_alipay__=YES&url=https%3A%2F%2Frender.alipay.com%2Fp%2Ff%2Ffd-j6lzqrgm%2Fguiderofmklvtvw.html%3Fchannel%3DqrCode%26shareId%3D2088202699097532%26sign%3DAFml1OwpzCQC4IVlQHEDQ0LKkXiaDFyESl0GCk43ahU%253D%26scene%3DofflinePaymentNewSns%26campStr%3Dp1j%252BdzkZl018zOczaHT4Z5CLdPVCgrEXq89JsWOx1gdt05SIDMPg3PTxZbdPw9dL%26token%3Dc1x08164vrc0u6jhg7oslac"
                );
            }
        },
        layout: function (make, view) {
            make.top.inset(2);
            make.left.equalTo($("fuzhi_img").right).inset(15);
            make.width.height.equalTo(55);
        }
    }],
})

$cache.set("py", 1);
function getdata(url) {
    $http.post({
        url: $cache.get("info").turl + $cache.get("py"),
        header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "iphoneLive/1.1 (iPhone; iOS 12.0; Scale/2.00)"
        },
        handler: function (resp) {
            var data = resp.data.data.info;
            $cache.set("vdata", data);
            $cache.set("dqshu", 1);
            cldata()
        }
    });
}

function cldata() {
    var dqshu = $cache.get("dqshu");
    var vdata = $cache.get("vdata");
    if (vdata.length == 0) {
        $ui.toast("数据正在加载中...");
    } else if (vdata.length != dqshu) {
        var arr = vdata[dqshu - 1]
        $("Video").data = [{ video: { src: arr.href, poster: arr.thumb_s } }]
        $cache.set("dqshu", dqshu + 1);
        $delay(1, function () {
            $("video").toggle()
        })
    } else {
        var py = $cache.get("py") + 1;
        $cache.set("py", py);
        getdata()
    }
}
function xldata() {
    var dqshu = $cache.get("dqshu");
    var vdata = $cache.get("vdata");
    if (vdata.length == 0) {
        $ui.toast("数据正在加载中...");
    } else if (dqshu > 1) {
        var arr = vdata[dqshu]
        $("Video").data = [{ video: { src: arr.href, poster: arr.thumb_s } }]
        $cache.set("dqshu", dqshu - 1);
        $delay(1, function () {
            $("video").toggle()
        })
    } else {
        var arr = vdata[0]
        $("Video").data = [{ video: { src: arr.href, poster: arr.thumb_s } }]
    }
}

function download(url) {
    $ui.toast("正在下载中 ...");
    $ui.loading(true);
    $http.download({
        url: url,
        handler: function (resp) {
            $ui.loading(false);
            if (resp.response.statusCode == "200") {
                $share.sheet(["download.mp4", resp.data]);
            } else {
                $ui.alert("下载失败");
            }
        }
    });
}

