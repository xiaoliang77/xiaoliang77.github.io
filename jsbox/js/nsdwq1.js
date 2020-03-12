var me = [{ "name": "国产视频", "id": "16" }, { "name": "自拍视频", "id": "15" }, { "name": "高清视频", "id": "14" }]

$ui.render({
  props: {
    title: "男神的武器 1.2"
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
        $cache.set("id", me[sender.index].id)
        $cache.set("pg", 1)
        getdata()

      }
    }
  }, {
    type: "matrix",
    props: {
      id: "Video",
      itemHeight: 150,
      columns: 2,
      spacing: 3,
      template: [{
          type: "image",
          props: {
            id: "img",
            radius: 3
          },
          layout: function(make, view) {
            make.top.right.left.inset(0)
            make.height.equalTo(110)
          }
        },{
      type: "label",
      props: {
        id: "sj",
        text: "未知",
        textColor: $color("#ffffff"),
        align: $align.center
      },
      layout(make, view) {
        make.top.right.equalTo(0)
        make.width.equalTo(100)
        make.height.equalTo(30)
      }
    },
        {
          type: "label",
          props: {
            id: "pm",
            align: $align.center,
            lines: 1,
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
        var pg = $cache.get("pg") + 1
        $cache.set("pg", pg)
        getdata()
      }
    }
  }, {
    type: "button",
    props: {
      id: "hb_img",
      src: "https://ae85.cn/img/xl.png",
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
  },]
})
var base64 = "aHR0cDovL3d3lz50Z2R5anguY29t"
var urlt = $text.base64Decode(base64.replace(/lz/, "dy"))

function getdata() {
  var pg = $cache.get("pg")
  var id = $cache.get("id")
  $ui.loading(true)
  $http.get({
    url: urlt + "/wap/list_" + id + "_" + pg + ".html",
    handler: function(resp) {
      $ui.loading(false)
      var arr = resp.data
      var html = arr.replace(/\n|\s|\r/g, "")
      var li = html.match(/<divclass=\"middle.*?<\/div>/g)
      var data
      if (pg == 1) {
        data = []
      } else {
        data = $("Video").data
      }

      for (i in li) {
        dli = li[i]
        data.push({
          img: {
            src: urlt + dli.match(/<imgsrc=\"(\S*?)\"/)[1]
          },
          pm: {
            text: dli.match(/alt=\"(\S*?)\"/)[1]
          },
          sj: {
            text: dli.match(/<span>(\S*?)<\/span>/)[1]
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
      var gurl = html.match(/ships\"\)\.load\(\"(\S*?)\"/)[1]
      geturl1(gurl, pm)
    }
  })
}

function geturl1(url, pm) {
  $ui.loading(true)
  $http.get({
    url: urlt + url,
    handler: function(resp) {
      $ui.loading(false)
      var arr = resp.data
      var html = arr.replace(/\n|\s|\r/g, "")
      var playurl = html.match(/src=\'(\S*?)\'/)[1]
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
    }]
  })
}

$cache.set("id", me[0].id)
$cache.set("py", 1)

getdata()