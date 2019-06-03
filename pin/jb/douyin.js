/*
2019年6月3日、修复更新
该脚本不支持Pin！请使用JSBox
支持下载，复制链接。
上滑下拉可切换视频。

by：iPhone 8、小良
http://ae85.cn/
*/
if ($app.info.bundleID == "app.cyan.pin") {
  $ui.alert("该脚本不支持Pin！\n请使用JSBox");
  return;
}
const gzgzh = {
  title: "关注公众号",
  handler: function () {
    $ui.alert({
      title: "温馨提示",
      message: "跳转微信会自动复制公众号ID\n请跳转到微信-搜索-公用号-粘贴-关注",
      actions: [{
        title: "跳转微信",
        handler: function () {
          $clipboard.text = "ae85-cn"
          $app.openURL("weixin://")
        }
      }, {
        title: "取消"
      }]
    })
  }
}
var itemHeight = $device.info.screen.height;
const base64 = "aHR0cDovL3d3dy5tdXNvdWNhdC5jbjoyMDE4L2pzblzvZG91eWluLmpzb24=";
console.info($text.base64Decode(base64.replace(/lz/, "24")));
$ui.loading(true);
$http.get({
  url: $text.base64Decode(base64.replace(/lz/, "24")),
  handler: function (resp) {
    $ui.loading(false);
    if (resp.response.statusCode == "200") {
      var info = resp.data;
      if (info.bb != "2.2") {
        $ui.alert({
          title: "温馨提示",
          message: info.gxsm,
          actions: [
            {
              title: "访问官网",
              handler: function () {
                $app.openURL(info.gw);
              }
            }, gzgzh
          ]
        });
      } else {
        $cache.set("info", info);
        getdata();
      }
    } else {
      $ui.alert("加载失败");
    }
  }
});

var timg = "https://gitee.com/yao07/update_device/raw/master/sucai/";

const conView = {
  type: "view",
  props: {
    id: "conView"
  },
  views: [
    {
      type: "matrix",
      props: {
        id: "mune",
        bgcolor: $color("black"),
        itemHeight: 80,
        data: [
          {
            m_tb: { icon: $icon("067", $color("#DDE2EA")) }
          },
          {
            m_tb: { icon: $icon("023", $color("#DDE2EA")) }
          },
          {
            m_tb: { icon: $icon("057", $color("#DDE2EA")) }
          },
          {
            m_tb: { icon: $icon("109", $color("#DDE2EA")) }
          }
        ],
        columns: 4,
        spacing: 0,
        waterfall: false,
        template: [
          {
            type: "image",
            props: {
              id: "m_tb",
              bgcolor: $color("black")
            },
            layout: function (make, view) {
              make.top.inset(15);
              make.width.height.equalTo(25);
              make.centerX.equalTo(view.conter);
            }
          }
        ]
      },
      layout: function (make) {
        make.bottom.left.right.top.inset(0);
      }, events: {
        didSelect: function (sender, indexPath, data) {
          if (indexPath.row == 0) {
            cldata()
          } else if (indexPath.row == 1) {
            $ui.alert( "搜索功能暂未开发···");
          } else if (indexPath.row == 2) {
            $ui.alert("收藏功能暂未开发···");
          } else if (indexPath.row == 3) {
            $ui.alert({
              title: "温馨提示",
              message: "更多好玩脚本请关注公众号\n【小良科技】",
              actions: [gzgzh]
            });
          }
        }
      }
    }
  ],
  layout: function (make) {
    make.bottom.left.right.inset(0);
    make.height.equalTo(90);
  }
};

$ui.render({
  props: {
    id: "mView",
    navBarHidden: 1,
    homeIndicatorHidden: 1,
    //        statusBarHidden: true,
    bgcolor: $color("black")
  },
  views: [
    {
      type: "matrix",
      props: {
        id: "Video",
        bgcolor: $color("black"),
        itemHeight: itemHeight,
        columns: 1,
        spacing: 0,
        waterfall: false,
        template: [
          {
            type: "video",
            props: {
              id: "video"
            },
            layout: function (make, view) {
              make.left.right.top.bottom.inset(-3);
            }
          }
        ]
      },
      layout: function (make) {
        make.left.right.top.inset(0);
        make.bottom.inset(60);
      },
      events: {
        didSelect: function (sender, indexPath, data) {
          $("video").toggle();
        },
        didReachBottom: function (sender) {
          sender.endFetchingMore();
          cldata();
        },
        pulled: function (sender) {
          sender.endRefreshing();
          xldata();
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
          $app.close();
        }
      },
      layout: function (make, view) {
        make.right.inset(5);
        make.bottom.inset(100)
        make.width.height.equalTo(50);
      }
    },
    {
      type: "button",
      props: {
        id: "xia_img",
        src: timg + "xia.png"
      },
      events: {
        tapped: function (sender) {
          $ui.alert("该视频不支持下载，请复制视频地址到指尖浏览器上下载！");
        }
      },
      layout: function (make, view) {
        make.right.inset(2);
        make.bottom.equalTo($("x_img").top).inset(15);
        make.width.height.equalTo(58);
      }
    },
    {
      type: "button",
      props: {
        id: "fuzhi_img",
        src: timg + "fuzhi.png"
      },
      events: {
        tapped: function (sender) {
          $clipboard.text = $("video").src;
          $ui.toast("已复制");
        }
      },
      layout: function (make, view) {
        make.right.inset(5);
        make.bottom.equalTo($("xia_img").top).inset(15);
        make.width.height.equalTo(50);
      }
    },
    {
      type: "button",
      props: {
        id: "logo",
        src: "https://ae85.cn/wf/xl.png"
      },
      events: {
        tapped: function (sender) {
          $app.openURL("https://ae85.cn");
        }
      },
      layout: function (make, view) {
        make.right.inset(5);
        make.bottom.equalTo($("fuzhi_img").top).inset(15);
        make.width.height.equalTo(50);
      }
    },
    {
      type: "label",
      props: {
        id: "tis",
        text: "@iPhone 8、小良\nhttps://ae85.cn",
        color: $color("#DDE2EA"),
        font: $font("bold", 17),
        lines: 0,
      },
      layout: function (make, view) {
        make.bottom.inset(100)
        make.left.inset(10)
        make.widthm.equalTo(300)
        make.height.equalTo(80)

      }
    },
    conView
  ]
});

$cache.set("py", 1);
function getdata(url) {
  $http.post({
    url: $cache.get("info").turl + $cache.get("py"),
    header: {
      http_app_version: "1.0.6",
      "User-Agent": "iphoneLive/1.1 (iPhone; iOS 12.0; Scale/2.00)"
    },
    handler: function (resp) {
      console.info(resp.data);
      var data = resp.data.data.info;
      $cache.set("vdata", data);
      $cache.set("dqshu", 1);
      cldata();
    }
  });
}

function cldata() {
  var dqshu = $cache.get("dqshu");
  var vdata = $cache.get("vdata");
  if (vdata.length == 0) {
    $ui.toast("数据正在加载中...");
  } else if (vdata.length != dqshu) {
    var arr = vdata[dqshu - 1];
    $("tis").text = `@${arr.userinfo.user_nicename}\n${arr.title}`;
    $("Video").data = [{ video: { src: arr.href, poster: arr.thumb_s } }];
    $cache.set("dqshu", dqshu + 1);
    $delay(1, function () {
      $("video").toggle();
    });
  } else {
    var py = $cache.get("py") + 1;
    $cache.set("py", py);
    getdata();
  }
}
function xldata() {
  var dqshu = $cache.get("dqshu");
  var vdata = $cache.get("vdata");
  if (vdata.length == 0) {
    $ui.toast("数据正在加载中...");
  } else if (dqshu > 1) {
    var arr = vdata[dqshu];
    $("tis").text = `@${arr.userinfo.user_nicename}\n${arr.title}`;
    $("Video").data = [{ video: { src: arr.href, poster: arr.thumb_s } }];
    $cache.set("dqshu", dqshu - 1);
    $delay(1, function () {
      $("video").toggle();
    });
  } else {
    var arr = vdata[0];
    $("Video").data = [{ video: { src: arr.href, poster: arr.thumb_s } }];
  }
}


