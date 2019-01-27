var me = [{ "name": "国产", "id": "/v1" }, { "name": "日本", "id": "/v2" }, { "name": "欧美", "id": "/v3" }, { "name": "香港", "id": "/v5" }, { "name": "韩国", "id": "/v6" }, ]

const mrhb = {
  type: "button",
  props: {
    id: "hb_img",
    src: "https://ae85.cn/wf/xl.png",
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
}


$ui.render({
  props: {
    title: "无限资源 1.1"
  },
  views: [{
    type: "menu",
    props: {
      id: "menu",
      items: me.map(function(item) {
        return item.name
      }),
    },
    layout: function(make) {
      make.left.top.right.equalTo(0)
      make.height.equalTo(50)

    },
    events: {
      changed: function(sender) {
        $cache.set("type", me[sender.index].id)
        $cache.set("pg", 1)
        getdata()

      }
    }
  }, {
    type: "matrix",
    props: {
      id: "Video",
      itemHeight: 130,
      columns: 2,
      spacing: 3,
      template: [{
          type: "image",
          props: {
            id: "img",
            radius: 3
          },
          layout: function(make, view) {
            make.centerX.equalTo(view.super)
            make.height.equalTo(90)
            make.width.equalTo(180)
          }
        },
        {
          type: "label",
          props: {
            id: "pm",
            align: $align.center,
            lines: 0,
            font: $font("bold", 15)
          },
          layout: function(make, view) {
            make.top.equalTo($("img").bottom).offset(10)
            make.right.left.inset(0)
          }
        },
      ]
    },
    layout: function(make) {
      make.top.equalTo($("menu").bottom)
      make.bottom.left.right.inset(0)
    },
    events: {
      didSelect: function(sender, indexPath, data) {
        geturl(data.url, data.pm.text)

      },
      didReachBottom: function(sender) {
        sender.endFetchingMore()
        var page = $cache.get("pg") + 1
        $cache.set("pg", page)
        var type = $cache.get("type")
        $ui.loading(true)
        $http.get({
          url: urlt + type + "-" + page + ".html",
          handler: function(resp) {
            $ui.loading(false)
            var arr = resp.data
            var html = arr.replace(/\n|\s|\r/g, "")
            var li = html.match(/<li><ahref=\".*?<\/li>/g)
            for (i in li) {
              var dli = li[i]
              $("Video").insert({
                indexPath: $indexPath(0, $("Video").data.length),
                value: {
                  img: {
                    src: dli.match(/original=\"(\S*?)\"/)[1]
                  },
                  pm: {
                    text: dli.match(/alt=\"(\S*?)\"/)[1]
                  },
                  url: dli.match(/<ahref=\"(\S*?)\"/)[1]
                }
              })
            }

          }
        })

      }

    }
  },mrhb]
})

var urlt = "http://xiaobishua.com"

function getdata() {
  var type = $cache.get("type")
  $ui.loading(true)
  $http.get({
    url: urlt + type + ".html",
    handler: function(resp) {
      $ui.loading(false)
      var arr = resp.data
      var html = arr.replace(/\n|\s|\r/g, "")
      var li = html.match(/<li><ahref=\".*?<\/li>/g)
      var data = []
      for (i in li) {
        dli = li[i]
        data.push({
          img: {
            src: dli.match(/original=\"(\S*?)\"/)[1]
          },
          pm: {
            text: dli.match(/alt=\"(\S*?)\"/)[1]
          },
          url: dli.match(/<ahref=\"(\S*?)\"/)[1]
        })
      }
      $("Video").data = data
      $("Video").endRefreshing()
    }
  })
}

function geturl(url, pm) {
  $ui.loading(true)
  $http.get({
    url: urlt + url,
    handler: function(resp) {
      $ui.loading(false)
      var arr = resp.data
      var html = arr.replace(/\n|\s|\r/g, "")
      $clipboard.text=html
      var playurl = html.match(/http:\/\/cdn.wy8.com.*?(?=\")/)[0]
      play(playurl, pm)
    }
  })
}

function play(url, mc) {

  $ui.push({
    props: {
      title: mc
    },
    views: [{
      type: "web",
      props: {
        id: "bof",
        url: url,
      },
      layout: $layout.fill
    },mrhb]
  })
}
$cache.set("type", me[0].id)
getdata()
