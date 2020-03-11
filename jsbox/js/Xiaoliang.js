$cache.set("menu", "规则")
$ui.render({
  props: {
    title: "小良 - 更新器"
  },
  views: [{
      type: "menu",
      props: {
        items: ["规则", "脚本", "应用", "教程", "解析", "其他"],
      },
      layout: function(make) {
        make.left.top.right.equalTo(0)
        make.height.equalTo(50)

      },
      events: {
        changed: function(sender) {
          var menu = sender.items[sender.index]
          $cache.set("menu", menu)
          render()

        }
      }
    },
    {
      type: "list",
      props: {
        rowHeight: 95,
        template: [{
            type: "image",
            props: {
              id: "lt",
              radius: 7,
              bgcolor: $color("white")
            },
            layout: function(make, view) {
              make.left.top.bottom.inset(10)
              make.width.equalTo(view.height)
            }
          },
          {
            type: "label",
            props: {
              id: "mc",
              font: $font("bold", 17),
              lines: 0
            },
            layout: function(make, view) {
              make.left.equalTo($("lt").right).offset(10)
              make.top.inset(13)
            }
          },
          {
            type: "label",
            props: {
              id: "sm",
              font: $font(15),
              textColor: $color("gray")
            },
            layout: function(make) {
              make.left.equalTo($("mc"))
              make.bottom.inset(10)
              make.top.inset(30)
              make.right.inset(3)
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
          xqym(data)

        }
      }
    }
  ]
})
var dnaem = "https://ae85.cn/"
var version = "1.0"
$ui.loading(true)

function refetch() {
  $http.get({
    url: dnaem + "gx/pinUpdater.txt",
    handler: function(resp) {
      $ui.loading(false)
      var data = resp.data
      var bb = data.version
      if (version < bb) {
        $ui.alert({
          title: "发现新版本-V" + bb,
          message: resp.data.hant,
          actions: [{
            title: "更新",
            handler: function() {
              $app.openBrowser({ url: data.bburl })
            }
          }]
        })
      } else {
        $cache.set("stories", resp.data.data)
        render()
      }

    }
  })
}

function render() {
  var cache = $cache.get("stories")
  var menu = $cache.get("menu")
  var id
  if (menu == "规则") {
    id = cache.gz
  } else if (menu == "脚本") {
    id = cache.jb
  } else if (menu == "应用") {
    id = cache.yy
  } else if (menu == "教程") {
    id = cache.jc
  } else if (menu == "解析") {
    id = cache.jx
  } else if (menu == "其他") {
    id = cache.qt
  }

  var data = []
  for (var idx in id) {
    var story = id[idx]
    data.push({
      jcurl: {
        text: story.jsurl
      },
      lt: {
        src: dnaem + story.image
      },
      mc: {
        text: story.title
      },
      sm: {
        text: story.details
      },
      url: {
        text: story.url
      },
      button: {
        text: story.button
      }
    })
  }
  $("list").data = data
  $("list").endRefreshing()

}

function xqym(data) {
  $ui.push({
    props: {
      title: data.mc.text
    },
    views: [{
        type: "image",
        props: {
          id: "icon",
          src: data.lt.src,
          radius: 7,
          bgcolor: $color("white")
        },
        layout: function(make, view) {
          make.left.top.inset(5)
          make.width.height.equalTo(60)
        }
      },
      {
        type: "button",
        props: {
          id: "bt1",
          title: data.button.text,
          font: $font(20)
        },
        layout: function(make) {
          make.left.equalTo($("icon").right).inset(5)
          make.top.equalTo(10)
          make.right.inset(5)
          make.height.equalTo(50)
        },
        events: {
          tapped: function(sender) {
            $app.openURL(data.url.text)
          }

        }
      },
      {
        type: "text",
        props: {
          id: "smbq",
          bgcolor: $color("#EDEDED"),
          text: data.sm.text,
          editable: false,
          radius: 7,
          font: $font("Avenir-Light", 17)
        },
        layout: function(make) {
          make.right.left.inset(5)
          make.top.equalTo($("bt1").bottom).offset(10)
          make.height.equalTo(120)
        }
      },
      {
        type: "web",
        props: {
          url: data.jcurl.text
        },
        layout: function(make, view) {
                    make.left.right.inset(5)
          make.top.equalTo($("smbq").bottom).offset(5)
          make.bottom.equalTo(0)
        }
      }
    ]
  })
}

refetch()