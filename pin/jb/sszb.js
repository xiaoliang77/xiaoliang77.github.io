/*
2018年7月3日 修复更新
更新：修复部分不能播放问题
by：iPhone 8、小良
http://ae85.cn/

*/

$ui.render({
  props: {
    title: "赛事直播"
  },
  views: [{
    type: "list",
    props: {
      rowHeight: 80,
      template: [{
          type: "image",
          props: {
            id: "lt1",
            radius: 7,
            bgcolor: $color("white")
          },
          layout: function(make, view) {
            make.top.inset(10)
            make.left.inset(30)
            make.size.equalTo(40, 40)

          }
        }, {
          type: "image",
          props: {
            id: "lt2",
            radius: 7,
            bgcolor: $color("white")
          },
          layout: function(make, view) {
            make.top.inset(10)
            make.right.inset(30)
            make.size.equalTo(40, 40)
          }
        },
        {
          type: "label",
          props: {
            id: "sais",
            font: $font("bold", 17),
            align: $align.center
          },
          layout: function(make, view) {
            make.centerX.equalTo(view.center)
            make.top.inset(21)
            make.width.equalTo(200)

          }
        }, {
          type: "label",
          props: {
            id: "rq",
            font: $font(15),
            textColor: $color("red"),
            align: $align.center
          },
          layout: function(make, view) {
            make.centerX.equalTo(view.center)
            make.top.equalTo($("sais").bottom).inset(10)

          }

        },
        {
          type: "label",
          props: {
            id: "zd1",
            font: $font(15),
            textColor: $color("gray"),
            align: $align.center
          },
          layout: function(make) {
            make.left.equalTo(0)
            make.top.equalTo($("lt1").bottom).inset(5)
            make.width.equalTo(100)
          }
        },
        {
          type: "label",
          props: {
            id: "zd2",
            font: $font(15),
            textColor: $color("gray"),
            align: $align.center
          },
          layout: function(make) {
            make.right.equalTo(0)
            make.top.equalTo($("lt2").bottom).inset(5)
            make.width.equalTo(100)
          }
        }

      ]
    },
    layout: $layout.fill,
    events: {
      didSelect: function(sender, indexPath, data) {
        var url = data.url
        if (url.indexOf("/qie/") !== -1) {
          getbofy(data.url, data.sais.text)
        } else {
          getzl(url, data.sais.text)
        }

      }
    }
  }]

})
var urlt = "http://m.didiaokan.com"

function getzl(url, mc) {
  if (url.indexOf("ae85.cn") !== -1) {
    play(url, "iPhone 8、小良 - 官网")
  } else {
    $ui.loading(true)
    $http.get({
      url: url,
      handler: function(resp) {
        $ui.loading(false)
        var html = resp.data
        var jsurl = html.match(/<video src=\"(\S*?)\"/)[1]
        play(jsurl, mc)

      }
    })
  }
}

function play(url, mc) {

  $ui.push({
    props: {
      title: mc
    },
    views: [{
      type: "web",
      props: {
        id: "bo",
        url: url,
      },
      layout: $layout.fill
    }]
  })
}

function getlb(url) {
  $ui.loading(true)
  $http.get({
    url: url,
    handler: function(resp) {
      $ui.loading(false)
      var html = resp.data
      var t1 = html.match(/<a data-action=\\\".*?<\/a>/g)
      var data = []
      for (i in t1) {
        d = t1[i].replace(/\\/g, "")
        var url = d.match(/href=\"(\S*?)\"/)[1]
        var img = d.match(/<img src=\"(\S.*?)\"/g)
        var zd = d.match(/<span>(\S.*?)<\/span>/g)
        var xx = []
        for (i in zd) {
          xx.push(zd[i].replace(/<span>|<\/span>/g, ""))
        }
        if (d.indexOf("备用") !== -1) {
          data.push({
            lt1: { src: "http://ae85.cn/wf/xl.png" },
            lt2: { src: "http://ae85.cn/wf/xiaoliang.png" },
            sais: { text: "小良 - 更新器" },
            rq: { text: "哪个更好用？" },
            zd1: { text: "脚本1.3版" },
            zd2: { text: "规则2.5版" },
            url: "http://ae85.cn/"
          })
        } else {
          data.push({
            lt1: {
              src: img[0].replace(/<img src=|\"|\\/g, "")
            },
            lt2: {
              src: img[1].replace(/<img src=|\"|\\/g, "")
            },
            sais: { text: xx[1] },
            rq: { text: xx[2] },
            zd1: { text: xx[0] },
            zd2: { text: xx[3] },
            url: url

          })
        }
      }
      $("list").data = data

    }
  })
}

getlb(urlt + "/d/js/js/1461842166.js?_t=6")

var js = []

function getbofy(url, mc) {
  $ui.loading(true)
  $http.request({
    method: "GET",
    url: urlt + "/qie/w2/w.html",
    header: {
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13G34 Safari/601.1",
      "Referer": url
    },
    handler: function(resp) {
      $ui.loading(false)
      var html = resp.data
      var t = html.match(/href=\"(\S.*?)<\/a>/g)
      for (i in t) {
        x = t[i]
        js.push({
          bt: {
            text: x.match(/_btn3\">(\S.*?)<\/a>/)[1]
          },
          url: x.match(/href=\"(\S.*?)\"/)[1]

        })
      }
      setxq("http://ae85.cn/", mc, js)
      getpy(js[0].url)
    }
  })
}

function setxq(playurl, pm, js) {
  $ui.push({
    props: {
      title: pm
    },
    views: [{
      type: "web",
      props: {
        id: "bof",
        url: playurl,
        radius: 7,
      },
      layout: function(make, view) {
        make.right.left.top.inset(0)
        make.height.equalTo(196)
      }

    }, {
      type: "label",
      props: {
        id: "bqxj",
        text: "🔵 切换播放源：",
        font: $font(21),
      },
      layout(make, view) {
        make.top.equalTo($("bof").bottom).inset(15)
        make.left.inset(5)
        make.size.equalTo($size(300, 30))

      }
    }, {
      type: "matrix",
      props: {
        id: "jslb",
        data: js,
        columns: 2,
        itemHeight: 50,
        spacing: 5,
        selectable: true,
        template: [{
          type: "label",
          props: {
            id: "bt",
            bgcolor: $color("#F8F8F8"),
            borderColor: $color("#f0f0f0"),
            borderWidth: 1,
            align: $align.center,
          },
          layout(make, view) {
            make.top.left.right.bottom.inset(0)
          }

        }]
      },
      layout(make, view) {
        make.top.equalTo($("bqxj").bottom).inset(5)
        make.left.right.inset(5)
        make.bottom.inset(0)

      },
      events: {
        didSelect: function(sender, indexPath, data) {
          var id = $cache.get("playid")
          $("jslb").cell(indexPath).add({
            type: "label",
            props: {
              text: data.bt.text,
              bgcolor: $color("#F8F8F8"),
              borderColor: $color("#f01232"),
              borderWidth: 1,
              align: $align.center,
            },
            layout(make, view) {
              make.top.left.right.bottom.inset(0)
            }
          })
          getpy(data.url)
        }
      }
    }, ]
  })
}

function getpy(url) {
  $ui.loading(true)
  $http.request({
    method: "GET",
    url: urlt + url,
    header: {
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13G34 Safari/601.1",
      "Referer": urlt + "/qie/w2/w.html"
    },
    handler: function(resp) {
      $ui.loading(false)
      var html = resp.data.replace(/\n|\s|\r/g, "")
      var j = html.match(/player\"(\S*?)<\/div>/)[1]
      var u = j.match(/src=\"(\S*?)\"/)[1]
      $("bof").url = u
      $clipboard.text = u
    }
  })
}