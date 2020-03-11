/*
小火箭-ss节点免费一键获取
更新(2018.5.15)：向右滑动可插看节点详情和生成二维码。
前提是要先安装好小火箭(Shadowrocket)这个app
by：iPhone8、小良
https://ae85.cn/

演示视频：
http://t.cn/R8rDfQD

升级版视频：
http://t.cn/RR9HIyg

*/

$ui.render({
  props: {
    title: "小火箭-ss节点一键获取 1.1"
  },
  views: [{
      type: "label",
      props: {
        id: "rq",
        text: "加载中……",
        textColor: $color("#008062"),
        align: $align.center
      },
      layout(make, view) {
        make.top.left.equalTo(0)
        make.right.inset(100)
        make.height.equalTo(30)
      }
    },
    {
      type: "button",
      props: {
        id: "b1",
        title: "一键获取"

      },
      layout: function(make) {
        make.left.equalTo($("rq").right)
        make.top.right.equalTo(0)
        make.right.inset(5)
        make.height.equalTo(30)
      },
      events: {
        tapped: function(sender) {
          $app.openURL(ssz)

        },
        longPressed: function(sender) {
          $app.openURL("https://ae85.cn/")
        }

      }
    },
    {
      type: "list",
      props: {
        id: "list",
        rowHeight: 50,
        data: new Array(),
        actions: [{
          title: "二维码",
          handler: function(tableView, indexPath) {
            var obj = tableView.object(indexPath)
            var url = obj.split("\n")[1]
            var image = $qrcode.encode("ss://" + url)
            $share.universal(image)
          }
        }, {
          title: "详情",
          handler: function(tableView, indexPath) {
            var obj = tableView.object(indexPath)
            var dz = obj.split("\n")
            var text = $text.base64Decode(dz[1]).split("@")
            var q = text[0].split(":")
            var h = text[1].split(":")
            var xq = `服务器：${h[0]}\n端口：${h[1]}\n密码：${q[1]}\n算法：${q[0]}`
            $ui.alert({
              title: dz[0],
              message: xq,
              actions: [{
                  title: "复制节点详情",
                  handler: function() {
                    $clipboard.text = xq
                    $ui.toast("已复制")
                  }
                },
                {
                  title: "添加至小火箭",
                  handler: function() {
               $app.openURL("ss://" + dz[1])
                  }
                },
                {
                  title: "生成二维码",
                  handler: function() {
                    var image = $qrcode.encode("ss://" + dz[1])
                    $share.universal(image)
                  }
                },
                {
                  title: "取消"
                }
              ]
            })
          }
        }, ]
      },
      layout(make) {
        make.top.equalTo($("rq").bottom).inset(5)
        make.bottom.left.right.equalTo(0)
      },
      events: {
        didSelect(sender, indexPath, data) {
          $app.openURL("ss://" + data.split("\n")[1])
        }
      }
    }
  ]

})

var ssz = ""

function ss() {
  $http.get({
    url: "https://ae85.cn/ssm.json",
    handler(resp) {
      var arr = resp.data
      bbyz(arr.bb)
      $("rq").text = arr.rq
      var jd = arr.data
      var data = []
      for (i in jd) {
        var s = 1 + i++
          ssz = "ss://" + jd[s] + ssz
        data.push("免费节点 " + s + "\n" + jd[i])

      }
      $("list").data = data
    }
  })
}

ss()

function bbyz(bb) {
  if (bb != 3) {
    $ui.alert({
      title: "温馨提示：",
      message: "脚本无法使用，请看看是否有更新",
      actions: [{
        title: "访问小良网站",
        handler: function() {
          $app.openBrowser({ url: "https://ae85.cn/" })
        }
      }, {
        title: "关注小良微博",
        handler: function() {
          $app.openURL("https://weibo.com/u/2934241775")
        }

      }]
    })
  }
}