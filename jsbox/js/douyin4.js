/*
2018年10月9日、修复更新
支持：视频下载以及复制视频链接。
点击下载图标即可下载当前播放视频。
长按下载图标可复制视频链接到剪贴板。
by：iPhone 8、小良
https://ae85.cn/
*/

const base64 = "aHR0cHM6Ly9naXRlZS5jblzveWFvMDcvdXBkYXRlX2RldmljZS9yYXcvbWFzdGVyL2RvdXlpbi5qc29u"
$ui.loading(true)
$http.get({
  url: $text.base64Decode(base64.replace(/lz/, "20")),
  handler: function(resp) {
    $ui.loading(false)
    if (resp.response.statusCode == "200") {
      var info = resp.data;
      if (info.bb != "1.4") {
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
        zrui()
        getlist()
      }

    } else {
      $ui.alert("加载失败")
    }
  }
})




$cache.set("page", 1)
function zrui(){
$ui.render({
  props: {
    title: "抖阴-js版 1.4"
  },
  views: [{
    type: "matrix",
    props: {
      columns: 2,
      itemHeight: 288,
      spacing: 1,
      template: [{
        type: "image",
        props: {
          id: "bj",
        },
        layout: $layout.fill
      }, {
        type: "image",
        props: {
          id: "tx",
          radius: 15
        },
        layout: function(make, view) {
          make.bottom.left.inset(5)
          make.width.height.equalTo(30)

        }
      }, {
        type: "label",
        props: {
          id: "mc",
          textColor: $color("#e5e5e5"),
        },
        layout(make, view) {
          make.bottom.inset(5)
          make.left.equalTo($("tx").right).inset(5)
          make.height.equalTo(30)
        }
      }, {
        type: "label",
        props: {
          id: "sm",
          textColor: $color("#ffffff"),
        },
        layout(make, view) {
          make.bottom.equalTo($("mc").top).inset(1)
          make.left.right.inset(5)
          make.height.equalTo(30)
        }
      }, ]
    },
    layout: function(make) {
      make.top.left.bottom.right.equalTo(0)
    },
    events: {
      didSelect: function(sender, indexPath, obj) {
        web(obj.url)
      },
      didReachBottom: function(sender) {

        var page = $cache.get("page") + 1
        $cache.set("page", page)
        sender.endFetchingMore()
        // $console.info(page)
        getlist()
      }

    }
  }, {
    type: "button",
    props: {
      id: "hb_img",
      src: "https://ae85.cn/img/hb.jpg",
      radius: 30
    },
    events: {
      tapped: function(sender) {
        $app.openURL("alipays://platformapi/startapp?appId=20000067&__open_alipay__=YES&url=https%3A%2F%2Frender.alipay.com%2Fp%2Ff%2Ffd-j6lzqrgm%2Fguiderofmklvtvw.html%3Fchannel%3DqrCode%26shareId%3D2088202699097532%26sign%3DAFml1OwpzCQC4IVlQHEDQ0LKkXiaDFyESl0GCk43ahU%253D%26scene%3DofflinePaymentNewSns%26campStr%3Dp1j%252BdzkZl018zOczaHT4Z5CLdPVCgrEXq89JsWOx1gdt05SIDMPg3PTxZbdPw9dL%26token%3Dc1x08164vrc0u6jhg7oslac")
      }
    },
    layout: function(make, view) {
      make.bottom.inset(66)
      make.width.height.equalTo(60)
      make.right.inset(15)
    }
  }, ]
})
}

function getlist() {
  $ui.loading(true)
  var page = $cache.get("page")
  var info=$cache.get("info")
  $http.request({
    method: "POST",
    url: info.turl,
    header: {
      "User-Agent": "TomatoClub_release/1.1.2 (iPhone; iOS 12.0; Scale/2.00)",
      "Content-Type": "application/x-www-form-urlencoded",
      "deviceNo": "883d4f2b55ba17616da017552aa64ba1","gCode":" feb9cf48683c37043e1bb8d8d129b9dd"
    },
    body: {
      "memberId": info.id,
      "pageSize": "10",
      "pageNo": page,

    },
    handler: function(resp) {
      $ui.loading(false)
    //   console.log(resp.data)
      var json = resp.data.data
      var img=info.timg
      if (page == 1) {
        var data = []
      } else {
        var data = $("matrix").data
      }
      for (i in json) {
        var li = json[i]
        data.push({
          bj: {
            src: img + li.videoCover
          },
          tx: {
            src: img + li.avatar
          },
          mc: {
            text: li.name
          },
          sm: {
            text: li.description
          },
          url: info.tvideo + li.videoUrl

        })
      }
      $("matrix").data = data
      $("matrix").endRefreshing()
    }
  })
}


console.log()
function web(url) {
  $ui.push({
    props: {
      title: "抖阴-js版 1.4"
    },
    views: [{
        type: "web",
        props: {
          url: url,
        },
        layout: $layout.fill,

      },
      {
        type: "button",
        props: {
          id: "bt2",
          src: "https://ae85.cn/jsbox/img/xiazai.png",
          font: $font(20)
        },
        layout: function(make) {
          make.right.inset(10)
          make.top.inset(15)
          make.height.width.equalTo(50)
        },
        events: {
          tapped: function(sender) {
            download(url)
          },
          longPressed: function(sender) {
            $clipboard.text = url
            $ui.alert("已复制：\n" + url)
          }
        }
      },
    ]
  })
}

function download(url) {
  $ui.toast("正在下载中 ...")
  $ui.loading(true)
  $http.download({
    url: url,
    handler: function(resp) {
      $ui.loading(false)
      if (resp.response.statusCode == "200") {
        $share.sheet([
          "download.mp4",
          resp.data
        ])
      } else {
        $ui.alert("下载失败")
      }
    }
  })
}
