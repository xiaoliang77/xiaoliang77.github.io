var me = [{ "name": "国产", "id": "/v1" }, { "name": "日本", "id": "/v2" }, { "name": "欧美", "id": "/v3" }, { "name": "香港", "id": "/v5" }, { "name": "韩国", "id": "/v6" }, ]

const mrhb = {
  type: "button",
  props: {
    id: "hb_img",
   src: "https://iphone8.vip/img/hb.jpg",
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
}


$ui.render({
  props: {
    title: "无限资源 1.3"
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

var urlt = "http://wxav0.com"

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
//      console.log(arr)
      var html = arr.replace(/\n|\s|\r/g, "")
      var playurl = html.match(/<videosrc=\"(\S*?)\"/)[1]
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
