/*
火萤m3u8转指尖浏览器下载
by：iPhone 8、小良
更多规则：添加 小良-更新器 或
https://ae85.cn/
第n个版本

*/
var did = $clipboard.text
if (did.indexOf("huoying666.com") !== -1) {
  $ui.alert({
    title: "温馨提示：",
    message: "检测到你已复制了\n火萤分享的链接",
    actions: [{
        title: "取消",
      },
      {
        title: "获取数据",
        handler: function() {
          var vid = did.split("?v=")[1]
          getlj(vid)
        }
      }
    ]
  })
}

function getlj(id) {
  $ui.loading(true)
  $http.request({
    method: "POST",
    url: "https://api.hyhuo.com/video/play",
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: {
      "uuid": "f24958c0-3731-bb94-d86b-c712192bceef",
      "system_version": "9.3.3",
      "channel": "AppStore",
      "lan": "zh-Hans-CN",
      "nonce": "151257452400848",
      "gesture": "default",
      "timestamp": "1512574524",
      "vid": id,
      "source": "iOS",
      "token": "5049d3547a19bb714e461f1aa0f4274b",
      "device_name": "iPhone 8",
      "device_code": "D0F0AAE9-651D-4D5D-BD0D-22F71211D19D",
      "version_code": "2.1.2",
    },
    handler: function(resp) {
      $ui.loading(false)
      //$ui.alert(resp.data) 
      var str = resp.data.data.share_mp4
      var m3u8 = str.replace(/hd\.mp4/, "sd.m3u8")
      download(resp.data.data.share_desc, m3u8)
    }
  })

}
if (typeof($cache.get("acquiescence")) == "undefined") {
  $cache.set("acquiescence", 0)
}

var urls = [{
    name: "免费版",
    url: "etkwwweb://"
  },
  {
    name: "Pro版",
    url: "scamperllqweb://"
  },
  {
    name: "3.3旧版",
    url: "zhijianweb://"
  }
]

$app.keyboardToolbarEnabled = true

$ui.render({
  props: {
    title: "火萤无水印下载"
  },
  views: [{
      type: "button",
      props: {
        title: "搜索"
      },
      layout: function(make) {
        make.right.top.inset(10)
        make.size.equalTo($size(64, 32))
      },
      events: {
        tapped: function(sender) {

          sou()
        }
      }
    },
    {
      type: "input",
      props: {
        placeholder: "🔍搜索视频"
      },
      layout: function(make) {
        make.top.left.inset(10)
        make.right.equalTo($("button").left).offset(-10)
        make.height.equalTo($("button"))
      }
    },
    {
      type: "matrix",
      props: {
        columns: 2,
        itemHeight: 288,
        spacing: 5,
        template: [{
          type: "image",
          props: {
            id: "image",
          },
          layout: $layout.fill

        }]
      },
      layout: function(make) {
        make.left.bottom.right.equalTo(0)
        make.top.equalTo($("input").bottom).offset(5)
      },
      events: {
        didSelect: function(sender, indexPath, object) {
          download(object.title.title, object.m3u8.url)

        }

      }
    }
  ]
})

getdata()

function getdata() {
  $ui.loading(true)
  $http.request({
    method: "POST",
    url: "https://api.hyhuo.com/home/list",
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: {
      "uuid": "f24958c0-3731-bb94-d86b-c712192bceef",
      "display_status": "2",
      "system_version": "9.3.3",
      "channel": "AppStore",
      "lan": "zh-Hans-CN",
      "nonce": "151257452400848",
      "gesture": "default",
      "timestamp": "1512574524",
      "source": "iOS",
      "last_id": "0",
      "token": "5049d3547a19bb714e461f1aa0f4274b",
      "device_name": "iPhone 8",
      "device_code": "D0F0AAE9-651D-4D5D-BD0D-22F71211D19D",
      "page": "1",
      "sort": "recommend",
      "version_code": "2.1.2",
    },
    handler: function(resp) {
      $ui.loading(false)
      lite(resp.data)

    }

  })

}

function lite(data) {
  var id = data.data.data_list
  var data = []
  for (var idx in id) {
    var story = id[idx]
    data.push({
      image: {
        src: story.thumb_img
      },
      m3u8: {
        url: story.video_preview_url
      },
      title: {
        title: story.title

      }
    })
  }
  $("matrix").data = data

}

function download(title, url) {
  $ui.push({
    props: {
      title: title
    },
    views: [{
        type: "web",
        props: {
          url: url
        },
        layout: function(make, view) {
          make.top.left.right.inset(0)
          make.bottom.equalTo(0)

        }
      },
      {
        type: "button",
        props: {
          id: "bt1",
          src: "http://download.easyicon.net/png/1075663/96/",
          font: $font(20)
        },
        layout: function(make) {
          make.right.inset(10)
          make.top.equalTo(20)
          // make.right.inset(5)
          make.height.width.equalTo(50)
        },
        events: {
          tapped: function(sender) {
            $app.openURL(urls[$cache.get("acquiescence")].url + url)

          }
        }
      },
      {
        type: "button",
        props: {
          id: "bt2",
          src: "http://download.easyicon.net/png/1075673/96/",
          font: $font(20)
        },
        layout: function(make) {
          make.right.inset(10)
          make.top.equalTo($("bt1").bottom).offset(20)
          // make.right.inset(5)
          make.height.width.equalTo(50)
        },
        events: {
          tapped: function(sender) {
            $clipboard.text = url
            $ui.alert("已复制：" + url)

          }
        }
      },
      {
        type: "button",
        props: {
          id: "bt3",
          src: "http://download.easyicon.net/png/1075678/96/",
          font: $font(20)
        },
        layout: function(make) {
          make.right.inset(10)
          make.top.equalTo($("bt2").bottom).offset(20)
          // make.right.inset(5)
          make.height.width.equalTo(50)
        },
        events: {
          tapped: function(sender) {
            $share.sheet(url)

          }
        }
      },
      {
        type: "button",
        props: {
          id: "bt4",
          src: "http://download.easyicon.net/png/1075690/96/",
          font: $font(20)
        },
        layout: function(make) {
          make.right.inset(10)
          make.top.equalTo($("bt3").bottom).offset(20)
          // make.right.inset(5)
          make.height.width.equalTo(50)
        },
        events: {
          tapped: function(sender) {
            sz()

          },
          longPressed: function(sender) {
            $app.openURL("https://ae85.cn/")
          }

        }

      }
    ]

  })

}

function sou() {
  var keyword = $("input").text
  $("input").blur()
  var url = "https://search.hyhuo.com/so?channel=AppStore&device_code=D0F0AAE9-651D-4D5D-BD0D-22F71211D19D&device_name=iPhone%208&keyword=" + encodeURIComponent(keyword) + "&lan=zh-Hans-CN&nonce=151263529206348&page=1&source=iOS&system_version=9.3.3&timestamp=1512635292&token=593dd5f9300cc84626dbd208ee42395b&type=title&uuid=f24958c0-3731-bb94-d86b-c712192bceef&version_code=2.1.2"
  $ui.loading(true)
  $http.request({
    method: "GET",
    url: url,
    header: {
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.0 Mobile/14G60 Safari/602.1"
    },
    handler: function(resp) {
      $ui.loading(false)
      lite(resp.data)

    }
  })
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
          title: "选择指尖浏览器版本",
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
          title: "安装指尖浏览器",
          rows: ["免费版 - 跳转App Store商店下载", " Pro 版 - 跳转App Store商店下载", "3.3旧版 - 在线安装 (部分系统不支持)"]
        }, {
          title: "使用帮助",
          rows: ["使用教程", "联系作者", "关于脚本"]
        }],
        footer: {
          type: "label",
          props: {
            height: 100,
            lines: 0,
            text: "by：iPhone 8、小良\n\nhttps://ae85.cn/",
            textColor: $color("#198567"),
            align: $align.center,
            font: $font(16)
          }
        }
      },
      layout: $layout.fill,
      events: {
        didSelect: function(sender, indexPath, data) {

          if (data == "免费版 - 跳转App Store商店下载") {
            $app.openURL("https://itunes.apple.com/cn/app/%E6%8C%87%E5%B0%96%E6%B5%8F%E8%A7%88%E5%99%A8-%E5%AE%89%E5%85%A8%E5%BF%AB%E9%80%9F%E7%9A%84%E4%B8%8A%E7%BD%91%E6%B5%8F%E8%A7%88%E5%99%A8/id1279128759?mt")
          } else if (data == " Pro 版 - 跳转App Store商店下载") {
            $app.openURL("https://itunes.apple.com/cn/app/%E6%8C%87%E5%B0%96%E6%B5%8F%E8%A7%88%E5%99%A8pro%E7%89%88/id1104150882?mt=8")
          } else if (data == "3.3旧版 - 在线安装 (部分系统不支持)") {
            $app.openURL("itms-services://?action=download-manifest&url=https%3A%2F%2Fdafuvip.com%2Fshow%2Fplist%2F37336%3F1514395051")
          } else if (data == "联系作者") {
            $app.openURL("https://ae85.cn/")
          } else if (data == "使用教程") {
            $ui.push({
              props: {
                title: data
              },
              views: [{
                  type: "web",
                  props: {
                    url: "https://ae85.cn/"
                  },
                  layout: function(make, view) {
                    make.left.right.inset(0)
                    make.top.equalTo(0)
                    make.bottom.equalTo(0)
                  }
                }

              ]
            })

          } else if (data == "关于脚本") {
$ui.alert ("作者尚未编写😂")
          }
        }
      }
    }]
  })
}