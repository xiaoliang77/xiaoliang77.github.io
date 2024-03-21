/*
短视频下载器 3.0
2024年3月21日 更新
修复：部分平台视频无法下载问题。

支持：小红书去水印、抖音去水印、皮皮虾去水印、快手短视频无水印、Tiktok视频去水印、头条西瓜视频去水印、火山，微博，秒拍，美拍，陌陌，小影，全民小视频，映客，哔哩哔哩，等平台的视频下载。

解析后如果预览部分不了请直接点击下载或复制链接到其他下载工具下载。

by：iPhone 8、小良
更多js脚本： https://iphone8.vip/
*/
const js_name = "短视频下载器"

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
          handler: function () { }
        },
        {
          title: "提取",
          handler: function () {
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
    text: "iPhone 8、小良 (https://iphone8.vip)",
    textColor: $color("#bbb")
  },
  layout: function (make, view) {
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
      title: js_name,
      bgcolor: $color("#e6e6e6"),
      navButtons: [
        {
          title: "Title",
          icon: "008",
          handler: function () {
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
        layout: function (make, view) {
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
        layout: function (make) {
          make.top.equalTo($("tis1").bottom).inset(5);
          make.right.left.inset(15);
          make.height.equalTo(160);
        },
        events: {
          returned: function (sender) {
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
        layout: function (make) {
          make.top.equalTo($("bjk").bottom).inset(15);
          make.right.left.inset(15);
          make.height.equalTo(45);
        },
        events: {
          tapped: function (sender) {
            tmenu($("bjk").text);
          },
          longPressed: function (info) {
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
        layout: function (make, view) {
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
        layout: function (make, view) {
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
          html: `<head><meta charset="UTF-8"></head><body><span style="font-size:34px;"><br><h1>使用说明：</h1><h2>脚本支持：小红书去水印、抖音去水印、皮皮虾去水印、快手去水印、Tiktok去水印、头条西瓜去水印、火山去水印，微视去水印，哔哩哔哩去水印，微博，秒拍，美拍，陌陌，小影，全民小视频，映客，等平台的视频下载。<br><br></h2><br><img src="https://iphone8.vip/img/gzh.jpg" alt="微信搜索：ae85-cn"><h2>更多内容请关注公众号: 小良科技</h2><h2>by：iPhone 8、小良&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://iphone8.vip/">https://iphone8.vip/</a> </h2></span></body>`
        },
        layout: function (make) {
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
        layout: function (make, view) {
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
            layout: function (make, view) {
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
            layout: function (make, view) {
              make.top.equalTo($("videobof").bottom).inset(30);
              make.left.inset(20);
              make.height.equalTo(50);
              make.width.equalTo(130);
            },
            events: {
              tapped: function (sender) {
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
            layout: function (make, view) {
              make.top.equalTo($("videobof").bottom).inset(30);
              make.right.inset(20);
              make.height.equalTo(50);
              make.width.equalTo(130);
            },
            events: {
              tapped: function (sender) {
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
            layout: function (make, view) {
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

async function get_updata() {
  const resp = await $http.get($text.base64Decode("aHR0cHM6Ly9pcGhvbmU4LnZpcC9jb25maWcvZHVhbnNoaXBpbmcuanNvbg=="));
  if (resp.response.statusCode === 200) {
    $cache.set("info", resp.data);
    if (resp.data.bb != "3.0") {
      $ui.alert({
        title: "发现新版本 - " + resp.data.version,
        message: resp.data.gxsm,
        actions: [
          {
            title: "立即更新",
            handler: function () {
              download(resp.data.updata)
            }
          }, {
            title: "取消"
          }
        ]
      });
    } else {
      zjm();
      tcgg();
      getclipboard();
    }
  } else {
    $ui.alert("网络异常，加载失败，稍后请重试！");
  }
}
get_updata()

function download(url) {
  $ui.toast("正在安装中 ...");
  $http.download({
    url: url,
    handler: function (resp) {
      $addin.save({
        name: js_name,
        data: resp.data,
        handler: function () {
          $ui.alert({
            title: "安装完成",
            message: "\n是否打开？\n" + js_name,
            actions: [
              {
                title: "打开",
                handler: function () {
                  $app.openExtension(js_name)
                }
              },
              {
                title: "不了"
              }]
          });
        }
      })
    }
  })
}