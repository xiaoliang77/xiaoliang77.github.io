$ui.render({
  props: {
    title: "男神的武器"
  },
  views: [{
      type: "menu",
      props: {
        items: ["高清视频", "自拍视频", "国产视频"]
      },
      layout: function(make) {
        make.left.top.right.equalTo(0)
        make.height.equalTo(44)
      },
      events: {
        changed: function(sender) {
          switch (sender.index) {
            case 0:
              var ID = 14
              break
            case 1:
              var ID = 15
              break
            case 2:
              var ID = 16
              break
          }
          Videorefetch(ID)
          $cache.set("ID", ID)
          $cache.set("page", 1)
        }
      }
    },
    {
      type: "list",
      props: {
        rowHeight: 70,
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
          openURL(data.url)
        },
        didReachBottom: function(sender) {
          sender.endFetchingMore()
          var page = $cache.get("page") + 1
          $cache.set("page", page)
          $http.get({
            url: "http://api.juyuexuan.com/api/movie/index?page=" + page + "&pagesize=6&typeid=14",
            handler: function(resp) {
              var stories = resp.data
              var data = []
              for (var idx in stories) {
                var story = stories[idx]
                sender.insert({
                  indexPath: $indexPath(0, sender.data.length),
                  value: {
                    url: story.video,
                    image: {
                      src: story.pic
                    },
                    label: {
                      text: story.title
                    }
                  }
                })
              }
            }
          })
        }
      }
    }
  ]
})

function Videorefetch(id) {
  $ui.loading(true)
  $http.get({
    url: "http://api.juyuexuan.com/api/movie/index?page=1&pagesize=6&typeid=" + id,
    handler: function(resp) {
      $ui.loading(false)
      var stories = resp.data
      //$ui.alert(stories)
      var data = []
      for (var idx in stories) {
        var story = stories[idx]
        data.push({
          url: story.video,
          image: {
            src: story.pic
          },
          label: {
            text: story.title
          }
        })
      }
      $("list").data = data
    }
  })
}

function openURL(url) {
  $ui.push({
    props: {
      title: url
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

Videorefetch(14)

$cache.set("page", 1)