/*
下拉刷新，海量资源
在线观看，速度超赞
by：iPhone 8、小良
https://iphone8.vip/

*/

$cache.set("page", 1)
$cache.set("peid", 39)
var tdn = "http://www.avwujie.com"
$ui.render({
  props: {
    title: "无界"
  },
  views: [{
      type: "menu",
      props: {
        items: ["精品", "自拍", "欧美", "日韩", "三级", "动漫"]
      },
      layout: function(make) {
        make.left.top.right.equalTo(0)
        make.height.equalTo(44)
      },
      events: {
        changed: function(sender) {
          switch (sender.index) {
            case 0:
              var peid = 39
              break
            case 1:
              var peid = 34
              break
            case 2:
              var peid = 38
              break
            case 3:
              var peid = 32
              break
            case 4:
              var peid = 36
              break
            case 5:
              var peid = 40
              break
          }
          $cache.set("peid", peid)
          $cache.set("page", 1)
          Initialize()
        }
      }
    },
    {
      type: "list",
      props: {
        rowHeight: 80,
        template: [{
            type: "image",
            props: {
              id: "image"
            },
            layout: function(make, view) {
              make.left.top.bottom.inset(5)
              make.width.equalTo(100)
            }
          },
          {
            type: "label",
            props: {
              id: "label",
              font: $font("bold", 17),
              lines: 0
            },
            layout: function(make, view) {
              make.left.equalTo($("image").right).offset(10)
              make.centerY.equalTo(view.super)
              make.right.inset(10)
            }
          }
        ]
      },
      layout: function(make) {
        make.top.equalTo($("menu").bottom)
        make.right.left.bottom.inset(0)
      },
      events: {
        didSelect: function(sender, indexPath, data) {
          play(data.url, data.label.text)
        },
        pulled: function(sender) {
          var page = $cache.get("page") + 1
          //var id = $cache.get("peid")
          $cache.set("page", page)
          Initialize()

        },

      }
    }
  ]
})

function Initialize() {
  $ui.loading(true)
  $http.get({
    url: tdn + "/index.php?m=wap&a=video_lists&typeid=" + $cache.get("peid") + "&page=" + $cache.get("page"),
    handler: function(resp) {
      $ui.loading(false)
      var text = resp.data.replace(/\n|\s|\r/g, "")
      var shu = text.match(/\"mb-item\">[\s\S]*?<\/li>/g)
      var data = []
      for (i in shu) {
        var story = shu[i]
        data.push({
          url: tdn + story.match(/\/index.*?(?=\")/)[0],
          image: {
            src: tdn + story.match(/url\((\S*)\)/)[1]
          },
          label: {
            text: story.match(/title\">(\S*?)</)[1]
          }
        })
      }
      $("list").data = data
      $("list").endRefreshing()
    }
  })
}

function play(url, m) {
  $http.get({
    url: url,
    handler(resp) {
      var video = resp.data.match(/<video src=\"(\S*?)\"/)[1]
      openURL(video, m)
    }
  })
}

function openURL(url, m) {
  $ui.push({
    props: {
      title: m
    },
    views: [{
      type: "web",
      props: {
        url: url
      },
      layout: $layout.fill
    }]
  })
}

Initialize(39)