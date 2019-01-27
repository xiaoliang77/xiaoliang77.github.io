/*
快手视频去水印下载 1.1
更新：2018年6月23日
支持最新版快手
可查看更多作品进行下载

by：iPhone 8、小良
更多js脚本： https://ae85.cn/

*/
$ui.render({
  props: {
    title: "快手视频去水印下载 1.1"
  },
  views: [{
      type: "button",
      props: {
        title: "获取"
      },
      layout: function(make) {
        make.right.top.inset(10)
        make.size.equalTo($size(64, 32))
      },
      events: {
        tapped: function(sender) {
          $ui.toast("加载中……")
          $("webid").url = $("input").text

        }
      }
    },
    {
      type: "input",
      props: {
        placeholder: "输入视频地址…"
      },
      layout: function(make) {
        make.top.left.inset(10)
        make.right.equalTo($("button").left).offset(-10)
        make.height.equalTo($("button"))
      }
    }, {
      type: "web",
      props: {
        id: "web",
        html: `<head><meta charset="UTF-8"></head><body><span style="font-size:34px;"><br><h1>使用说明：</h1><h2>在快手客户端复制你要下载的视频链接，粘贴到上面并按下获取按钮。<br>首次运行会自动识别并提取无水印视频</h2><br><h1><a href="http://t.cn/RrLlW7b">点击观看</a> 视频教程</h1> <br><h1><a href="https://ae85.cn/fuli/xiaoliang.html">点击领取</a> 支付宝红包</h1><br><br><br><br><h2>by：iPhone 8、小良&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://ae85.cn/">https://ae85.cn/</a> </h2></span></body>`
      },
      layout: function(make) {
        make.top.equalTo($("button").bottom).inset(10)
        make.bottom.inset(0)
        make.left.right.inset(10)
      }
    }, {
      type: "web",
      props: {
        id: "webid",
        ua: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36",
        script: function() {
          var Html = window.parent.document.body.innerHTML
          $notify("customEvent", Html)
        }
      },
      layout: function(make, view) {
        make.top.inset(0)
        make.size.equalTo(0, 0)
      },

      events: {
        customEvent: function(obj) {
          clt(obj)
          $("webid").url = ""
        }
      }

    }
  ]
})

function csh() {
  var durl = $clipboard.text
  if (durl.indexOf("gifshow.com") !== -1) {
    $("input").text = durl
    $("webid").url = durl
    $ui.toast("加载中……")
  }
}
var data = []

function clt(html) {
  var text = html.replace(/\n|\s|\r/g, "")
  var t = text.match(/currentWork\":(\S*?)\}/)[1] + "}"
  var t1 = JSON.parse(t)
  var url = t1.playUrl
  shes(url)
  var list = text.match(/\{\"list\":.*?\"userInfo\"/)[0].replace(/\{\"list\":|\,\"userInfo\"/g, "")
  li = JSON.parse(list)
  for (i in li) {
    l = li[i]
    data.push({
      image: {
        src: l.thumbnailUrl
      },
      url: l.playUrl
    })
  }
}
csh()

function shes(url) {
  $ui.push({
    props: {
      title: "iPhone 8、小良"
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
          src: "https://ae85.cn/jsbox/img/gengduo.png",
          font: $font(20)
        },
        layout: function(make) {
          make.right.inset(10)
          make.top.equalTo(20)
          make.height.width.equalTo(50)
        },
        events: {
          tapped: function(sender) {
            list()
          },
          longPressed: function(sender) {
            $app.openURL("alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=https%3A%2F%2Fqr.alipay.com%2Fc1x08786tiy5qigyhnjd2db%3F_s%3Dweb-other")
           
          }
        }
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
          make.top.equalTo($("bt1").bottom).offset(20)
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

function list() {
  $ui.push({
    props: {
      title: "更多作品"
    },
    views: [{
      type: "matrix",
      props: {
        columns: 2,
        itemHeight: 288,
        spacing: 5,
        data: data,
        template: [{
          type: "image",
          props: {
            id: "image",
          },
          layout: $layout.fill

        }]
      },
      layout: function(make) {
        make.top.left.bottom.right.equalTo(0)
      },
      events: {
        didSelect: function(sender, indexPath, obj) {
          shes(obj.url)
        }

      }
    }]
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