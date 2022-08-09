/*
直播 - 秋名山见
内容不可描述
by：iPhone 8、小良
https://iphone8.vip/

*/


var template = [{
  type: "image",
  props: {
    id: "tx",
    radius: 30
  },
  layout: function(make, view) {
    make.top.inset(1)
    make.centerX.equalTo(view.center)
    make.width.height.equalTo(60)

  }
}, {
  type: "label",
  props: {
    id: "mc",
    textColor: $color("#149bcc"),
    align: $align.center
  },
  layout(make, view) {
    make.right.left.inset(0)
    make.top.equalTo($("tx").bottom).inset(5)
    make.height.equalTo(30)
  }
}, ]
var zfb = "alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=https%3A%2F%2Fqr.alipay.com%2Fc1x08786tiy5qigyhnjd2db%3F_s%3Dweb-other"
var szan = {
  type: "button",
  props: {
    id: "hb_img",
    src: "https://iphone8.vip/img/xl.png",
  },
  events: {
    tapped: function(sender) {
      sz()
    }
  },
  layout: function(make, view) {
    make.bottom.inset(66)
    make.width.height.equalTo(60)
    make.right.inset(15)
  }
}
if (typeof($cache.get("acquiescence")) == "undefined") {
  $cache.set("acquiescence", 0)
}

var urls = [{
    name: "VLC",
    url: "vlc://",
    store: "https://itunes.apple.com/cn/app/vlc-for-mobile/id650377962?mt=8"
  },
  {
    name: "OPlayer Lite",
    url: "OPlayerLite://",
    store: "https://itunes.apple.com/cn/app/%E6%92%AD%E6%94%BE%E5%99%A8oplayer-lite-%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%99%A8/id385907472?mt=8"
  },
  {
    name: "nPlayer",
    url: "nplayer://",
    store: "https://itunes.apple.com/cn/app/nplayer-lite/id1078835991?mt=8"
  }
]


$ui.render({
  props: {
    title: "直播 - 秋名山见"
  },
  views: [{
    type: "matrix",
    props: {
      columns: 4,
      itemHeight: 98,
      spacing: 3,
      template: template
    },
    layout: function(make) {
      make.top.left.bottom.right.equalTo(0)
    },
    events: {
      didSelect: function(sender, indexPath, obj) {
        mc = obj.mc.text
        if (mc == "福利(200)") {
          $app.openURL(zfb)
        } else {
          getlist(obj.id, mc)
        }
      },
    }
  }, szan]
})

const url = "aHR0cDovL2FlODUuY24vcGluL3piLmpzb24="

$ui.loading(true)
$http.get({
  url: $text.base64Decode(url),
  handler: function(resp) {
    $ui.loading(false)
    if (resp.response.statusCode == "200") {
      var info = resp.data;
      $cache.set("info", info)
      if (info.version != "1.0") {
        $ui.alert({
          title: "温馨提示",
          message: info.Ucontent,
          actions: [{
            title: "进入官网",
            handler: function() {
              $app.openBrowser({ url: inof.xl })
            }
          }, {
            title: "关注微博",
            handler: function() {
              $app.openBrowser({ url: inof.weibo })
            }
          }]
        })
      } else {
        getpt(info)
      }

    } else {
      $ui.alert("加载失败")
    }
  }
})

function getpt(info) {
  $ui.loading(true)
  $http.request({
    method: "POST",
    url: $text.base64Decode(info.qms.pturl),
    header: {
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13G34 Version/11.0 Safari/604.1",
      "X-Requested-With": "XMLHttpRequest"
    },
    handler: function(resp) {
      $ui.loading(false)
      var json = resp.data.pt.replace(/\n|\s|\r/g, "")
      var arr = json.match(/<liid=.*?<\/li>/g)
      var data = [{
        tx: {
          src: "https://iphone8.vip/img/hb.jpg"
        },
        mc: {
          text: "福利(200)"
        },
        id: info.zfb
      }]
      for (i in arr) {
        var li = arr[i]
        data.push({
          id: li.match(/id=\'(\S*?)\'/)[1],
          tx: {
            src: li.match(/src=\'(\S*?)\'/)[1]
          },
          mc: {
            text: li.match(/title\'>(\S*?)<\/p>/)[1]
          }
        })
      }
      $("matrix").data = data
      $("matrix").endRefreshing()
    }
  })
}

function getlist(id, mc) {
  var info = $cache.get("info")
  $ui.loading(true)
  $http.request({
    method: "POST",
    url: $text.base64Decode(info.qms.fjurl),
    header: {
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13G34 Version/11.0 Safari/604.1",
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: {
      "n": id,
    },
    handler: function(resp) {
      $ui.loading(false)
      var urlz = resp.data.url
      var json = resp.data.zb.replace(/\n|\s|\r/g, "")
      var arr = json.match(/<li.*?<\/li>/g)
      var data = [{
        tx: {
          src: "https://iphone8.vip/img/hb.jpg"
        },
        mc: {
          text: "每日福利"
        },
        id: info.zfb
      }]
      for (i = 1; i < arr.length - 1; i++) {
        var li = arr[i]
        var mcj = $text.URLDecode(li.match(/title\'>(\S*?)<\/p>/)[1])
        data.push({
          id: urlz[i],
          tx: {
            src: li.match(/src=\'(\S*?)\'/)[1]
          },
          mc: {
            text: mcj
          }
        })
      }
      $ui.push({
        props: {
          title: "秋名山上 - " + mc
        },
        views: [{
          type: "matrix",
          props: {
            data: data,
            columns: 4,
            itemHeight: 98,
            spacing: 3,
            template: template
          },
          layout: function(make) {
            make.top.left.bottom.right.equalTo(0)
          },
          events: {
            didSelect: function(sender, indexPath, obj) {
              mc = obj.mc.text
              if (mc == "每日福利") {
                $app.openURL(zfb)
              } else {
                openbf(obj.id)
              }
            },
          }
        }, szan]
      })

    }
  })
}

function openbf(url) {
  var bbf = urls[$cache.get("acquiescence")]
  var canOpen = $app.openURL(bbf.url + url);
  if (!canOpen) {
    $ui.alert({
      message: "请先安装 " + bbf.name,
      actions: [{
          title: "跳转安装",
          handler: function() {
            $app.openURL(bbf.store);
          }
        },
        {
          title: "设置其他播放器",
          handler: function() {
            sz()
          }
        }
      ]
    })
  }
  return canOpen;
}

function sz() {
  $ui.push({
    props: {
      title: "设置"
    },
    views: [{
      type: "list",
      props: {
        data: [{
          title: "选择设置默认播放器",
          rows: [{
            type: "tab",
            props: {
              items: urls.map(function(item) { return item.name }),
              index: $cache.get("acquiescence")

            },
            layout: $layout.center,
            events: {
              changed: function(sender) {
                $cache.set("acquiescence", sender.index)

              }
            }
          }]
        }, {
          title: "安装播放器",
          rows: [" VLC       -  跳转App Store商店下载", "OPlayer -  跳转App Store商店下载", " nPlayer -  跳转App Store商店下载"]
        }, {
          title: "使用帮助",
          rows: ["作者官网", "作者微博", "关于脚本"]
        }],
        footer: {
          type: "label",
          props: {
            height: 100,
            lines: 0,
            text: "by：iPhone 8、小良\nhttps://iphone8.vip/",
            textColor: $color("#198567"),
            align: $align.center,
            font: $font(16)
          }
        }
      },
      layout: $layout.fill,
      events: {
        didSelect: function(sender, indexPath, data) {
          if (data == " VLC       -  跳转App Store商店下载") {
            $app.openURL(urls[0].store)
          } else if (data == "OPlayer -  跳转App Store商店下载") {
            $app.openURL(urls[1].store)
          } else if (data == "nPlayer -  跳转App Store商店下载") {
            $app.openURL(urls[2].store)
          } else if (data == "作者官网") {
            web("https://iphone8.vip/","iPhone 8、小良")
          } else if (data == "作者微博") {
            web("https://weibo.com/u/2934241775","小良Ge")
          } else if (data == "关于脚本") {
            $ui.alert("关于脚本\n版本：v1.0\n脚本由小良编写\n如有问题欢迎反馈")
          }
        }
      }
    }]
  })
}

function web(url, text) {
  $ui.push({
    props: {
      title: text
    },
    views: [{
        type: "web",
        props: {
          url: url
        },
        layout: $layout.fill
      }

    ]
  })

}