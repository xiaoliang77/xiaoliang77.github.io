/*
2018年12月18日 修复更新
更新：更换直播源
原先的资源已经停止更新了
by：iPhone 8、小良
http://ae85.cn/
*/

$ui.render({
  props: {
    title: "赛事直播 1.3"
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
      make.top.inset(5)
      make.right.left.inset(0)
      make.height.equalTo(30)
    }
  },{
    type: "list",
    props: {
      rowHeight: 50,
      template: [
        {
          type: "label",
          props: {
            id: "mc",
            font: $font("bold", 17),
          },
          layout: $layout.fill
        },
      ]
    },
    layout(make, view) {
      make.top.equalTo($("rq").bottom).inset(5)
      make.right.left.bottom.inset(0)
    },
    events: {
      didSelect: function (sender, indexPath, data) {
        setxq(data.menu[0].url, data.mc.text, data.menu)
      }
    }
  }]

})

var urlt = "http://m.360zhibo.com"

function getlb() {
  $ui.loading(true)
  $http.get({
    url: urlt,
    handler: function (resp) {
      $ui.loading(false)
      var html = resp.data.replace(/\n|\s|\r/g, "")
      var li = html.split('<divclass="col_02">')[2]
      var t1 = li.match(/<liondblclick=.*?<\/li>/g)
      var biao = li.match(/<divclass=\"title1\">(\S*?)<\/div>/)[1]
      var data = []
      for (i in t1) {
        var text = t1[i].match(/<spanclass=(\S*?)<\/div>/)[1]
        text = text.replace(/\"time\">|\"imp\">|<\/span>|<span>|<ahref=\"\/cat\/cba\/\">|<\/a>/g, " ")
        var href = t1[i].match(/<ahref=\".*?<\/a>/g)
        var menu = []
        for (n in href) {
          var name = href[n].match(/\">(\S*?)<\/a>/)[1]
          var url = href[n].match(/href=\"(\S*?)\"/)[1]
          menu.push({
            name: name.replace(/\(.*?\)/g, ''),
            url: url
          })
        }
        data.push({
          mc: { text: text },
          menu: menu
        })
      }
      $("rq").text = biao
      $("list").data = data
    }
  })
}
getlb()

function setxq(url, pm, meun) {
  $ui.push({
    props: {
      title: pm
    },
    views: [{
      type: "menu",
      props: {
        id: "meun",
        items: meun.map(function (item) {
          return item.name
        }),
      },
      layout: function (make) {
        make.left.top.right.equalTo(0)
        make.height.equalTo(50)

      },
      events: {
        changed: function (sender) {
          getpy(meun[sender.index].url)
        }
      }
    }, {
      type: "web",
      props: {
        id: "bof"
      },
      layout: function (make, view) {
        make.right.left.bottom.inset(0)
        make.top.equalTo($("meun").bottom).inset(5)
      }
    },]
  })
  getpy(url)
}

function getpy(url) {
  if (url.indexOf('http') == -1) {
    $ui.loading(true)
    $http.request({
      method: "GET",
      url: urlt + url,
      header: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_3_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13G34 Safari/601.1",
        "Referer": urlt
      },
      handler: function (resp) {
        $ui.loading(false)
        var html = resp.data.replace(/\n|\s|\r/g, "")
        if (html.indexOf('dw(') == -1) {
          alert("未找到该直播源地址")
        } else {
          var u = html.match(/dw\(\'(\S*?)\'\)/)[1]
          $("bof").url = $detector.link(u)[0];
        }
      }
    })
  } else {
    $("bof").url = $detector.link(url)[0];
  }
}
