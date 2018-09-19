/*
小火箭-ss节点免费获取
前提是要先安装好小火箭(Shadowrocket)这个app
by：iPhone8、小良
http://ae85.cn/

演示视频：
http://t.cn/R8rDfQD

*/

$ui.render({
  props: {
    title: "小火箭-ss节点免费获取"
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
        make.top.left.right.equalTo(0)
        make.height.equalTo(30)
      }
    },
    {
      type: "list",
      props: {
        id: "list",
        rowHeight: 50,
        data: new Array(),
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

function ss() {
  $http.get({
    url: "http://ae85.cn/ss.json",
    handler(resp) {
      var arr = resp.data
      bbyz(arr.bb)
      $("rq").text = arr.rq
      var jd = arr.data
      var data = []
      for (i in jd) {
        var s = 1 + i++
          data.push("免费节点 " + s + "\n" + jd[i])

      }

      $("list").data = data
    }
  })
}

ss()

function bbyz(bb) {
  if (bb != 2) {
    $ui.alert({
      title: "温馨提示：",
      message: "脚本无法使用，请看看是否有更新",
      actions: [{
        title: "访问小良网站",
        handler: function() {
          $app.openBrowser({ url: "http://ae85.cn/" })
        }

      }]
    })
  }
}