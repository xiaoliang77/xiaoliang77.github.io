/*
短视频下载器 2.9
2022年3月14日 更新
修复：修复部分失效平台。

支持：小红书去水印、抖音去水印、皮皮虾去水印、快手短视频无水印、Tiktok视频去水印、头条西瓜视频去水印、火山，微博，秒拍，美拍，陌陌，小影，全民小视频，映客，哔哩哔哩，等平台的视频下载。

解析后如果预览部分不了请直接点击下载或复制链接到其他下载工具下载。

by：iPhone 8、小良
更多js脚本： https://ae85.cn/
*/

const base64 =
  "aHR0cHM6Ly9naXRlZS5jb20veLZvMDcvdXBkYXRlX2RldmljZS9yYXcvbLZzdGVyL2R1YW5zaGlwaW5nLmpzb24=";
$ui.loading(true);
$http.get({
  url: $text.base64Decode(base64.replace(/LZ/g, "WF")),
  handler: function(resp) {
    $ui.loading(false);
    if (resp.response.statusCode == "200") {
      var info = resp.data;
      $cache.set("info", info);
      if (info.bb != "2.9") {
        $ui.alert({
          title: "温馨提示",
          message: info.gxsm,
          actions: [
            {
              title: "进入官网",
              handler: function() {
                $app.openURL(info.gw);
              }
            },
            {
              title: "关注公众号",
              handler: function() {
                $ui.alert({
                  title: "温馨提示",
                  message:
                    "跳转微信会自动复制公众号ID\n请跳转到微信-搜索-公用号-粘贴-关注",
                  actions: [
                    {
                      title: "跳转微信",
                      handler: function() {
                        $clipboard.text = "ae85-cn";
                        $app.openURL("weixin://");
                      }
                    },
                    {
                      title: "取消"
                    }
                  ]
                });
              }
            }
          ]
        });
      } else {
        zjm();
        tcgg();
        getclipboard();
      }
    } else {
      $ui.alert("加载失败");
    }
  }
});

function tcgg() {
  var gg = $cache.get("info").gg;
  if ($file.exists("gg.txt")) {
    var file = $file.read("gg.txt").string;
    if (file != gg) {
      xrwj(gg);
    }
  } else {
    xrwj(gg);
  }
}
function xrwj(nr) {
  $ui.alert(nr);
  $file.write({
    data: $data({ string: nr }),
    path: "gg.txt"
  });
}
function getclipboard() {
  var url = $clipboard.link;
  if (url) {
    $ui.alert({
      title: "要提取剪贴板中的链接",
      message: $clipboard.text,
      actions: [
        {
          title: "取消",
          handler: function() {}
        },
        {
          title: "提取",
          handler: function() {
            $("bjk").text = url;
            tmenu(url);
          }
        }
      ]
    });
  }
}

const by = {
  type: "label",
  props: {
    align: 1,
    font: $font(14),
    text: "iPhone 8、小良 (https://ae85.cn)",
    textColor: $color("#bbb")
  },
  layout: function(make, view) {
    make.bottom.inset(2);
    make.left.right.inset(0);
    make.height.equalTo(30);
  }
};

var timer;
var count;
function zjm() {
  $ui.render({
    props: {
      title: "短视频下载 2.8",
      bgcolor: $color("#e6e6e6"),
      navButtons: [
        {
          title: "Title",
          icon: "008",
          handler: function() {
            sysm();
          }
        }
      ]
    },
    views: [
      {
        type: "label",
        props: {
          id: "tis1",
          text: "请将视频链接粘贴到下方：",
          font: $font(14)
        },
        layout: function(make, view) {
          make.left.inset(15);
          make.top.inset(30);
        }
      },
      {
        type: "text",
        props: {
          id: "bjk",
          lines: 0,
          radius: 5,
          placeholder: "输入视频地址… \n或长按【解析】按钮"
        },
        layout: function(make) {
          make.top.equalTo($("tis1").bottom).inset(5);
          make.right.left.inset(15);
          make.height.equalTo(160);
        },
        events: {
          returned: function(sender) {
            $("bjk").blur();
            tmenu($("bjk").text);
          }
        }
      },
      {
        type: "button",
        props: {
          title: "解  析",
          id: "bt1"
        },
        layout: function(make) {
          make.top.equalTo($("bjk").bottom).inset(15);
          make.right.left.inset(15);
          make.height.equalTo(45);
        },
        events: {
          tapped: function(sender) {
            tmenu($("bjk").text);
          },
          longPressed: function(info) {
            $("bjk").text = $clipboard.link;
            tmenu($clipboard.link);
          }
        }
      },
      {
        type: "label",
        props: {
          id: "tis2",
          text:
            "目前支持：小红书去水印、抖音去水印、皮皮虾去水印、快手去水印、Tiktok去水印、头条西瓜去水印、火山去水印，微视去水印，哔哩哔哩去水印，微博，秒拍，美拍，陌陌，小影，全民小视频，映客，等平台的视频下载。",
          font: $font(14),
          lines: 0,
          textColor: $color("#aaa"),
          align: 4
        },
        layout: function(make, view) {
          make.top.equalTo($("bt1").bottom).inset(10);
          make.right.left.inset(15);
          make.height.equalTo(100);
        }
      },
      {
        type: "spinner",
        props: {
          loading: false
        },
        layout: function(make, view) {
          make.bottom.equalTo($("bjk").bottom).inset(-10);
          make.centerX.equalTo(view.super);
        }
      },
      by
    ]
  });
}

function sysm() {
  $ui.push({
    props: {
      title: "使用说明"
    },
    views: [
      {
        type: "web",
        props: {
          id: "webxia",
          bgcolor: $color("#e6e6e6"),
          html: `<head><meta charset="UTF-8"></head><body><span style="font-size:34px;"><br><h1>使用说明：</h1><h2>脚本支持：小红书去水印、抖音去水印、皮皮虾去水印、快手去水印、Tiktok去水印、头条西瓜去水印、火山去水印，微视去水印，哔哩哔哩去水印，微博，秒拍，美拍，陌陌，小影，全民小视频，映客，Instagram，YouTube，等平台的视频下载。<br><br></h2><br><h1><a href="http://t.cn/E49YWj6">点击观看</a> 视频教程</h1><img src="https://ae85.cn/img/gzh.jpg" alt="微信搜索：ae85-cn"><h2>更多内容请关注公众号: 小良科技</h2><h2>by：iPhone 8、小良&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://ae85.cn/">https://ae85.cn/</a> </h2></span></body>`
        },
        layout: function(make) {
          make.left.right.inset(10);
          make.top.bottom.inset(0);
        }
      }
    ]
  });
}

function cgjm(url) {
  $("spinner").loading = false;
  $ui.push({
    props: {
      title: "解析完成"
    },
    views: [
      {
        type: "view",
        props: {
          id: "vediobtn"
        },
        layout: function(make, view) {
          make.left.bottom.right.inset(10);
          make.top.inset(30);
        },
        views: [
          {
            type: "video",
            props: {
              id: "videobof",
              src: url,
              radius: 7,
              bgcolor: $color("#eee")
            },
            layout: function(make, view) {
              make.left.right.inset(10);
              make.top.equalTo(20);
              make.height.equalTo(250);
            }
          },
          {
            type: "button",
            props: {
              title: "下载视频",
              id: "dBtn",
              bgcolor: $color("#409eff")
            },
            layout: function(make, view) {
              make.top.equalTo($("videobof").bottom).inset(30);
              make.left.inset(20);
              make.height.equalTo(50);
              make.width.equalTo(130);
            },
            events: {
              tapped: function(sender) {
                download(url);
              }
            }
          },
          {
            type: "button",
            props: {
              title: "复制链接",
              id: "fBtn",
              bgcolor: $color("#909399")
            },
            layout: function(make, view) {
              make.top.equalTo($("videobof").bottom).inset(30);
              make.right.inset(20);
              make.height.equalTo(50);
              make.width.equalTo(130);
            },
            events: {
              tapped: function(sender) {
                $clipboard.text = url;
                $ui.toast("复制成功!");
              }
            }
          },
          {
            type: "label",
            props: {
              align: 1,
              font: $font(14),
              text: "注：如果视频预览无反应，请直接下载。",
              textColor: $color("#bbb")
            },
            layout: function(make, view) {
              make.top.equalTo($("fBtn").bottom).inset(20);
              make.left.right.inset(20);
              make.height.equalTo(30);
            }
          }
        ]
      }
    ]
  });
}

function download(url) {
  $ui.toast("正在下载中 ...");
  $ui.loading(true);
  $http.download({
    url: url,
    handler: function(resp) {
      $ui.loading(false);
      if (resp.response.statusCode == "200") {
        $share.sheet(["download.mp4", resp.data]);
      } else {
        $ui.alert("下载失败");
      }
    }
  });
}

function tmenu(text) {
  var url = $detector.link(text);
  url = url[0];
  if (!url) {
    $ui.alert("请先输入视频链接");
  } else {
    $ui.toast("处理中，请稍后···");
    $("spinner").loading = true;
    $http.get({
      url: $text.base64Decode($cache.get("info").turl) + url,
      handler: resp => {
        $("spinner").loading = false;
        var json = resp.data;

        if (json) {
          if (json.code == 1) {
            cgjm(json.url);
          } else {
            $ui.alert(json.msg);
          }
        } else {
          $ui.alert("网络异常请重试！");
        }
      }
    });
  }
}
