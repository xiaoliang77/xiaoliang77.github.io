/*
更新：新增下载功能以及复制链接功能。
点击下载图标即可下载当前播放视频。
长按下载图标可复制视频链接到剪贴板。
by：iPhone 8、小良
http://ae85.cn/
*/

$cache.set("page", 1)
$ui.render({
  props: {
    title: "抖阴-js版 1.2"
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
        $console.info(page)
        getlist()
      }

    }
  }, {
    type: "button",
    props: {
      id: "hb_img",
      src: "http://ae85.cn/wf/hb.jpg",
      radius: 30
    },
    events: {
      tapped: function(sender) {
        $app.openURL("alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=https%3A%2F%2Fqr.alipay.com%2Fc1x08786tiy5qigyhnjd2db%3F_s%3Dweb-other")
      }
    },
    layout: function(make, view) {
      make.bottom.inset(66)
      make.width.height.equalTo(60)
      make.right.inset(15)
    }
  }, ]
})

function getlist() {
  $ui.loading(true)
  var page = $cache.get("page")
  $http.request({
    method: "POST",
    url: "http://www.avyubjdh.com//app/article/video/list",
    header: {
      "User-Agent": "TomatoClub/1.0.5 (iPhone; iOS 9.3.3; Scale/2.00)",
      "Content-Type": "application/x-www-form-urlencoded",
      "deviceNo": "45676372d3002bb6cff712794d43698b"
    },
    body: {
      "memberId": "8933",
      "pageSize": "10",
      "pageNo": page,

    },
    handler: function(resp) {
      $ui.loading(false)
      var json = resp.data.data
      var img = "http://imgdown.avyubjdh.com/img//"
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
          url: "http://videodown.avyubjdh.com/video//" + li.videoUrl

        })
      }
      $("matrix").data = data
      $("matrix").endRefreshing()
    }
  })
}

getlist()

function web(url) {
  $ui.push({
    props: {
      title: "抖阴-js版 1.1"
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
          src: "http://ae85.cn/jsbox/img/xiazai.png",
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