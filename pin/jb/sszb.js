/*
2018年10月8日 修复更新
更新：修复部分不能播放问题
by：iPhone 8、小良
http://ae85.cn/

*/

$ui.render({
  props: {
    title: "赛事直播1.1"
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
          getzl(data.url, data.sais.text)
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

function getlb() {
  $ui.loading(true)
  $http.get({
    url: urlt + "/d/js/js/1461842166.js?_t=6",
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
            rq: { text: "带你打开ios新世纪" },
            zd1: { text: "脚本2.3版" },
            zd2: { text: "规则3.2版" },
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

getlb()

