var me = [{ "name": "热门视频", "id": "video_list" }, { "name": "国产视频", "id": "video_list/lmid/131" }, { "name": "日本视频", "id": "video_list/lmid/132" }, { "name": "欧美视频", "id": "video_list/lmid/134" }]
const mrhb = {
  type: "button",
  props: {
    id: "hb_img",
    radius: 30,
    src: "https://iphone8.vip/img/hb.jpg"
  },
  events: {
    tapped: function(sender) {
      $app.openURL(
        "alipays://platformapi/startapp?appId=20000067&__open_alipay__=YES&url=https%3A%2F%2Frender.alipay.com%2Fp%2Ff%2Ffd-j6lzqrgm%2Fguiderofmklvtvw.html%3Fchannel%3DqrCode%26shareId%3D2088202699097532%26sign%3DAFml1OwpzCQC4IVlQHEDQ0LKkXiaDFyESl0GCk43ahU%253D%26scene%3DofflinePaymentNewSns%26campStr%3Dp1j%252BdzkZl018zOczaHT4Z5CLdPVCgrEXq89JsWOx1gdt05SIDMPg3PTxZbdPw9dL%26token%3Dc1x08164vrc0u6jhg7oslac"
      );
    }
  },
  layout: function(make, view) {
    make.bottom.inset(66);
    make.width.height.equalTo(60);
    make.right.inset(15);
  }
};
$ui.render({
  props: {
    title: "男神的武器 1.3"
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
  }, mrhb]
})
var base64 = "aHR0cDovL25hbnNoZlzkZXd1cWkuY29t"
var urlt = $text.base64Decode(base64.replace(/lz/, "W5"))
function getdata() {
  var pg = $cache.get("pg")
  var id = $cache.get("id")
  $ui.loading(true)
  $http.get({
    url: urlt + "/index.php/home/video/" + id + "?&page=" + pg,
    handler: function(resp) {
      $ui.loading(false)
      var arr = resp.data
      var html = arr.replace(/\n|\s|\r/g, "")
      var text=html.match(/<divclass=\"boxmovie_list\"(\S*?)<\/div>/)[1]
      var li = text.match(/<li><ahref=\".*?<\/li>/g)
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
            src: dli.match(/<imgsrc=\"(\S*?)\"/)[1]
          },
          pm: {
            text: dli.match(/<h3>(\S*?)<\/h3>/)[1]
          },
          sj: {
            text: dli.match(/down_date\">(\S*?)<\/span>/)[1]
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
      // console.log(arr)
      var html = arr.replace(/\n|\s|\r/g, "")
      var gurl = html.match(/varvideo=\[\"(\S*?)\"\]/)[1]
      play(gurl, pm)
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
$cache.set("id", me[0].id)
$cache.set("pg", 1)
getdata()