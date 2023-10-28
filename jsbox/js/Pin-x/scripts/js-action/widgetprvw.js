var openURL = {
  name: "链接",
  pattern: "link"
};
var leftView;

function navLayout() {
  return function(make, view) {
    make.left.equalTo(leftView.right);
    make.bottom.inset(4);
    make.height.equalTo(20);
    make.width.equalTo(view.super).multipliedBy(0.25);
    leftView = view;
  };
}

function show(content) {
  $widget.height = 400;
  var tabEngines = [
    {
      name: "百度",
      pattern: "https://www.baidu.com/s?wd="
    },
    {
      name: "谷歌",
      pattern:
        "https://yao07.herokuapp.com/proxy/https://www.google.com/search?q="
    },
    {
      name: "云盘",
      pattern: "https://www.yunpanjingling.com/search/"
    },
    {
      name: "音乐",
      pattern: "https://m.sq688.com/search.php?key="
    }
  ];
  if ($detector.link(content) != "") {
    tabEngines.unshift(openURL);
  }
  var tabSite = tabEngines[0].pattern;
  $ui.window.add({
    type: "blur",
    props: {
      id: "wprvw",
      style: 1
    },
    views: [
      {
        type: "tab",
        props: {
          id: "tabwp",
          items: tabEngines.map(function(item) {
            return item.name;
          })
        },
        layout: function(make, view) {
          make.left.right.inset(6);
          make.top.inset(4);
          make.height.equalTo(22);
        },
        events: {
          changed: function(sender) {
            tabSite = tabEngines[sender.index].pattern;
            $("web").url = detectContent(tabSite, content);
          }
        }
      },
      {
        type: "view",
        props: {
          id: "mianv",
          bgcolor: $rgba(200, 200, 200, 0.25),
          radius: 10,
          borderWidth: 0.4,
          borderColor: $rgba(100, 100, 100, 0.25)
        },
        layout: function(make, view) {
          make.left.right.bottom.inset(4);
          make.top.equalTo($("tabwp").bottom).offset(4);
        },
        views: [
          {
            type: "button",
            props: {
              icon: $icon("225", $color("tint"), $size(20, 20)),
              bgcolor: $color("clear")
            },
            layout: function(make) {
              make.left.top.inset(4);
            },
            events: {
              tapped(sender) {
                $device.taptic(0);
                $widget.height = 180;
                $("wprvw").remove();
              }
            }
          },
          {
            type: "label",
            props: {
              id: "weburl",
              bgcolor: $color("clear"),
              font: $font("bold", 12),
              textColor: $color("darkGray"),
              align: $align.center
            },
            layout: function(make, view) {
              make.centerX.equalTo(view.super), make.top.inset(6);
              make.width.equalTo(view.super).multipliedBy(0.5);
            }
          },
          {
            type: "button",
            props: {
              icon: $icon("096", $color("tint"), $size(20, 20)),
              bgcolor: $color("clear")
            },
            layout: function(make) {
              make.right.top.inset(4);
            },
            events: {
              tapped(sender) {
                $app.openURL($("web").url);
              }
            }
          },
          {
            type: "web",
            props: {
              id: "web",
              url: detectContent(tabSite, content),
              bounces: true
            },
            layout: function(make, view) {
              make.left.right.inset(0);
              make.top.bottom.inset(28);
            },
            events: {
              didStart: function(sender, navigation) {
                $("weburl").text = sender.url;
              }
            }
          },
          {
            type: "button",
            props: {
              id: "goBack",
              bgcolor: $color("clear"),
              title: "<",
              font: $font("Menlo", 28),
              titleColor: $color("tint")
            },
            layout: function(make, view) {
              make.left.equalTo(0);
              make.bottom.inset(4);
              make.height.equalTo(20);
              make.width.equalTo(view.super).multipliedBy(0.25);
              leftView = view;
            },
            events: {
              tapped(sender) {
                $("web").goBack();
              }
            }
          },
          {
            type: "button",
            props: {
              id: "goforward",
              bgcolor: $color("clear"),
              title: ">",
              font: $font("Menlo", 28),
              titleColor: $color("tint")
            },
            layout: navLayout(),
            events: {
              tapped(sender) {
                $("web").goForward();
              }
            }
          },
          webPreviewBTN("022", navLayout(), function(sender) {
            $share.sheet($("web").url);
          }),
          webPreviewBTN("162", navLayout(), function(sender) {
            $("web").reload();
          })
        ]
      }
    ],
    layout: $layout.fill
  });
}

function webPreviewBTN(icon, layout, handler) {
  return {
    type: "button",
    props: {
      icon: $icon(icon, $color("tint"), $size(18, 18)),
      bgcolor: $color("clear")
    },
    layout: layout,
    events: {
      tapped: handler
    }
  };
}

function detectContent(tabSite, content) {
  if (tabSite.indexOf("link") != -1) {
    return $detector.link(content)[0];
  } else {
    var tsec = tabSite + encodeURIComponent(content);
  }
  return tsec;
}

module.exports = {
  show: show
};
