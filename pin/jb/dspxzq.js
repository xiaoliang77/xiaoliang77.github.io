/*
短视频下载器 2.0
12月23日  全新改版 支持 jsbox 同时也支持 pin 

支持：皮皮虾、抖音、快手、火山、今日头条、西瓜视频、微博、秒拍、小咖秀、晃咖、微视、美拍、网易云音乐、陌陌、映客、小影 等平台的视频。
部分支持去水印下载，如：抖音，快手等！

脚本使用密码到在公众号【小良科技】中回复〖285〗即可获取。

by：iPhone 8、小良
更多js脚本： http://ae85.cn/
*/
const base64 = "aHR0cHM6Ly9naXRlZS5jb20veLZvMDcvdXBkYXRlX2RldmljZS9yYXcvbLZzdGVyL2R1YW5zaGlwaW5nLmpzb24="
$ui.loading(true)
$http.get({
  url: $text.base64Decode(base64.replace(/LZ/g, "WF")),
  handler: function (resp) {
    $ui.loading(false)
    if (resp.response.statusCode == "200") {
      var info = resp.data;
      $cache.set("info", info)
      if (info.bb != "2.0") {
        $ui.alert({
          title: "温馨提示",
          message: info.gxsm,
          actions: [{
            title: "进入官网",
            handler: function () {
              $app.openURL(info.gw)
            }
          }, {
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
          }]
        })
      } else {
        yanz()

      }

    } else {
      $ui.alert("加载失败")
    }
  }
})
function yanz() {
  var file = $file.read("key.txt");
  if (!file) {
    cshyz();
  } else {
    if (yzmm(file.string)) {
      zjm();
      tcgg()
      getclipboard()
    } else {
      cshyz();
    }
  }
}
function tcgg() {
  var gg = $cache.get("info").gg
  if ($file.exists("gg.txt")) {
    var file = $file.read("gg.txt").string
    if (file != gg) {
      xrwj(gg)
    }
  } else {
    xrwj(gg)
  }
}
function xrwj(nr) {
  $ui.alert(nr);
  $file.write({
    data: $data({ string: nr }),
    path: "gg.txt"
  })
}
function getclipboard() {
  var url = $clipboard.link
  if (url) {
    $ui.alert({
      title: "要提取剪贴板中的链接",
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

function cshyz() {
  $ui.render({
    props: {
      title: "短视频下载器 2.0"
    },
    views: [
      {
        type: "label",
        props: {
          id: "dx1",
          text: "第一次使用脚本请输入密码进行验证",
          textColor: $color("#ff0000"),
          align: $align.center
        },
        layout(make, view) {
          make.top.inset(10);
          make.left.right.inset(0);
        }
      },
      {
        type: "button",
        props: {
          id: "bt1",
          title: "确定"
        },
        layout: function (make) {
          make.top.equalTo($("dx1").bottom).inset(15);
          make.right.inset(10);
          make.height.equalTo(40);
          make.width.equalTo(100);
        },
        events: {
          tapped: function (sender) {
            var bs = $("wd").text;
            if (yzmm(bs)) {
              $file.write({
                data: $data({ string: bs }),
                path: "key.txt"
              });
              zjm();
            } else {
              $ui.toast("验证失败……");
              $ui.alert(
                "请输入正确的密码\n如果不知道密码\n请到公众号：ae85-cn\n上回复 285 获取"
              );
            }
          }
        }
      },
      {
        type: "input",
        props: {
          id: "wd",
          font: $font(22),
          placeholder: "请输入开起密码...",
          darkKeyboard: true
        },
        layout: function (make, view) {
          make.top.equalTo($("dx1").bottom).inset(15);
          make.left.inset(10);
          make.height.equalTo(40);
          make.right.equalTo($("bt1").left).inset(5);
        },
        events: {
          returned: function (sender) {
            $("wd").blur();
          }
        }
      },
      {
        type: "web",
        props: {
          id: "webyz",
          toolbar: true,
          html: `<head><meta charset="UTF-8"></head><body><span style="font-size:34px;"><h1>使用说明：</h1><h2>为了防止脚本和谐速度过快，首次使用脚本，需要开启密码。</h2><h1>密码获取：</h1><h2>前往公众号【小良科技】在聊天窗口中回复〖285〗即可获取。<br></h2><br><h1><a href="http://t.cn/E49YWj6">点击观看</a> 视频教程</h1> <h1><a href="http://ae85.cn/fuli/xiaoliang.html">点击领取</a> 支付宝红包</h1><h1><a href="http://ae85.cn/lxfs.html">关注公众号</a> 小良科技</h1><h2>by：iPhone 8、小良&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://ae85.cn/">http://ae85.cn/</a> </h2></span></body>`
        },
        layout: function (make) {
          make.top.equalTo($("wd").bottom).inset(10);
          make.bottom.inset(0);
          make.left.right.inset(10);
        }
      }
    ]
  });
}

var timer;
function zjm() {
  $ui.render({
    props: {
      title: "短视频下载 2.0"
    },
    views: [{
      type: "button",
      props: {
        title: "提取",
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
          $('vediobtn').hidden = true;
          $('webxia').hidden = false;
          tmenu($('bjk').text);
        }
      }
    }, {
      type: "input",
      props: {
        id: "bjk",
        placeholder: "输入视频地址…"
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
      type: "web",
      props: {
        id: "webxia",
        html: `<head><meta charset="UTF-8"></head><body><span style="font-size:34px;"><br><h1>使用说明：</h1><h2>脚本已支持：皮皮虾、抖音、快手、火山、今日头条、西瓜视频、微博、秒拍、小咖秀、晃咖、微视、美拍、网易云音乐、陌陌、映客、小影 等平台的视频。<br><br>2.0适配pin有自动提取功能</h2><br><h1><a href="http://t.cn/E49YWj6">点击观看</a> 视频教程</h1> <h1><a href="http://ae85.cn/fuli/xiaoliang.html">点击领取</a> 支付宝红包</h1><h1><a href="http://ae85.cn/lxfs.html">关注公众号</a> 小良科技</h1><h2>by：iPhone 8、小良&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://ae85.cn/">http://ae85.cn/</a> </h2></span></body>`
      },
      layout: function (make) {
        make.top.equalTo($("bt1").bottom).inset(15);
        make.left.right.inset(10);
        make.bottom.inset(0)
      }
    },
    {
      type: "web",
      props: {
        id: "web",
      },
      layout: function (make, view) {
        make.top.equalTo(0)
        make.right.left.inset(0)
        make.height.equalTo(1)
      }
    }, {
      type: 'view',
      props: {
        hidden: true,
        id: 'vediobtn'
      },
      layout: function (make, view) {
        make.left.bottom.right.inset(10);
        make.top.equalTo($("bt1").bottom).inset(20);
      },
      views: [{
        type: 'video',
        props: {
          id: 'videobof',
          radius: 7,
          bgcolor: $color('#eee')
        },
        layout: function (make, view) {
          make.left.right.inset(10);
          make.top.equalTo(20);
          make.height.equalTo(250);
        }
      }, {
        type: 'button',
        props: {
          title: '下载视频',
          id: 'dBtn',
          bgcolor: $color('#409eff')
        },
        layout: function (make, view) {
          make.top.equalTo($('videobof').bottom).inset(30)
          make.left.inset(20);
          make.height.equalTo(50);
          make.width.equalTo(130)
        },
        events: {
          tapped: function (sender) {
            download($cache.get("url"))
          }
        }
      },
      {
        type: 'button',
        props: {
          title: '复制链接',
          id: 'fBtn',
          bgcolor: $color('#909399')
        },
        layout: function (make, view) {
          make.top.equalTo($('videobof').bottom).inset(30)
          make.right.inset(20);
          make.height.equalTo(50);
          make.width.equalTo(130)
        },
        events: {
          tapped: function (sender) {
            $clipboard.text = $cache.get("url");
            $ui.toast('复制成功!');
          }
        }
      }]
    }]
  });
}
function yzmm(t) {
  var a = "YWU4lz5jbg";
  if ($text.base64Decode(a.replace(/lz/, "NS") + "==") == t) {
    return 1;
  } else {
    return 0;
  }
}
function zhur() {
  var webView = $("web")
  webView.eval({
    script: `var URL = document.getElementsByClassName("btn btn-success")[0].href; window.name = URL`,
    handler: function (result, error) {
      if (result.indexOf('http') !== -1) {
        $cache.set("url", result);
        $('vediobtn').hidden = false;
        $('webxia').hidden = true;
        $('videobof').src = result;
        timer.invalidate()
      }
    }
  })
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
  if (!url[0]) {
    $ui.alert("请先输入链接");
  } else {
    $ui.toast("处理中，请稍后···")
    var turl = $cache.get("info").turl
    $('web').url = $text.base64Decode(turl) + url;
    timer = $timer.schedule({
      interval: 3,
      handler: function () {
        zhur()
      }
    });
  }
}

