var xuanX = "Base64-编码";
function transUI() {
  $widget.height = 260;
  $ui.render({
    type: "blur",
    props: {
      style: 1,
      id: "mainbg"
    },
    layout: $layout.fill,
    views: [
      {
        type: "view",
        props: {
          id: "mainvw",
          radius: 10,
          borderWidth: 0.4,
          borderColor: $rgba(100, 100, 100, 0.25)
        },
        layout: function (make, view) {
          make.top.bottom.left.right.inset(4);
        },
        views: [
          {
            type: "button",
            props: {
              id: "closebtn",
              bgcolor: $color("clear"),
              icon: $icon("225", $color("tint"), $size(18, 18))
            },
            layout: function (make, view) {
              make.top.inset(4);
              make.left.inset(6);
            },
            events: {
              tapped(sender) {
                $device.taptic(0);
                $widget.height = 181;
                $("mainbg").remove();
                var path = $app.env == $env.app ? "scripts/app" : "scripts/widget";
                var module = require(path);
                module.init();
              }
            }
          },
          {
            type: "button",
            props: {
              id: "kbbtn",
              bgcolor: $color("clear"),
              icon: $icon("010", $color("tint"), $size(18, 18))
            },
            layout: function (make, view) {
              make.top.inset(4);
              make.right.inset(6);
            },
            events: {
              tapped(sender) {
                $("originput").blur();
              }
            }
          },
          {
            type: "label",
            props: {
              textColor: $color("tint"),
              text: "text - 工具",
              font: $font("bold", 16),
              bgcolor: $color("clear"),
              align: $align.center
            },
            layout: function (make, view) {
              make.centerX.equalTo(view.super);
              make.top.inset(4);
            },
            events: {
              tapped(sender) {
                translate();
              }
            }
          },
          {
            type: "label",
            props: {
              id: "divideline",
              bgcolor: $rgba(100, 100, 100, 0.25)
            },
            layout: function (make, view) {
              make.top.equalTo($("closebtn").bottom).offset(3.6);
              make.right.left.inset(0);
              make.height.equalTo(0.4);
            }
          },
          {
            type: "view",
            props: {
              id: "iptvw"
            },
            layout: function (make, view) {
              make.left.right.inset(0);
              make.bottom.inset(28);
              make.top.equalTo($("divideline").bottom);
            },
            views: [
              {
                type: "view",
                props: {
                  id: "originputbg",
                  bgcolor: $rgba(200, 200, 200, 0.25)
                },
                layout: function (make, view) {
                  make.left.right.top.inset(0);
                  make.height.equalTo(view.super).multipliedBy(0.5);
                },
                views: [
                  {
                    type: "text",
                    props: {
                      id: "originput",
                      font: $font(12),
                      bgcolor: $color("clear")
                    },
                    layout: function (make, view) {
                      make.left.right.top.inset(0);
                      make.bottom.inset(5);
                    },
                    events: {
                      didChange: function (sender) {
                        translate();
                      }
                    }
                  }
                ]
              },
              {
                type: "view",
                props: {
                  bgcolor: $rgba(100, 100, 100, 0.15)
                },
                layout: function (make, view) {
                  make.left.right.bottom.inset(0);
                  make.top.equalTo($("originputbg").bottom);
                },
                views: [
                  {
                    type: "text",
                    props: {
                      id: "transinput",
                      editable: false,
                      font: $font(12),
                      bgcolor: $color("clear")
                    },
                    layout: function (make, view) {
                      make.left.right.top.inset(0);
                      make.bottom.inset(5);
                    }
                  }
                ]
              }
            ]
          },
          {
            type: "view",
            props: {
              bgcolor: $color("clear")
            },
            layout: function (make, view) {
              make.top.equalTo($("iptvw").bottom);
              make.right.left.bottom.inset(0);
            },
            views: [
              {
                type: "button",
                props: {
                  icon: $icon("019", $color("tint"), $size(18, 18)),
                  bgcolor: $color("clear")
                },
                layout: function (make, view) {
                  make.right.inset(6);
                  make.centerY.equalTo(view.super);
                },
                events: {
                  tapped(sender) {
                    var ttext = $("transinput").text;
                    if (ttext == "") {
                      return;
                    } else {
                      $clipboard.set({
                        "type": "public.plain-text",
                        "value": ttext
                      });
                      $("mainbg").remove();
                      $widget.height = 181;
                      var dataManager = require("../data-manager");
                      dataManager.init();
                      var path =
                        $app.env == $env.today ? "../widget" : "../app";
                      var module = require(path);
                      module.init();
                      $("input").text = $clipboard.text;
                      $ui.toast("结果已复制", 0.3);
                    }
                  }
                }
              },
              {
                type: "button",
                props: {
                  icon: $icon("027", $color("tint"), $size(18, 18)),
                  bgcolor: $color("clear")
                },
                layout: function (make, view) {
                  make.left.inset(6);
                  make.centerY.equalTo(view.super);
                },
                events: {
                  tapped(sender) {
                    $device.taptic(0);
                    $("originput").text = "";
                    $("transinput").text = "";
                  }
                }
              },
              {
                type: "button",
                props: {
                  id: "convertbtn",
                  title: xuanX,
                  bgcolor: $color("clear"),
                  titleColor: $color("tint"),
                  font: $font("bold", 18),
                },
                layout: function (make, view) {
                  make.centerX.centerY.equalTo(view.super);
                },
                events: {
                  tapped(sender) {
                    $("lgPVBg").hidden = false;
                  },
                  longPressed: function (sender) { }
                }
              },
            ]
          },
          {
            type: "view",
            props: {
              id: "lgPVBg",
              bgcolor: $color("clear"),
              style: 4,
              hidden: true
            },
            events: {
              tapped: function (sender) {
                $("lgPVBg").hidden = true;
              }
            },
            views: [
              {
                type: "blur",
                props: {
                  id: "lgPickBg",
                  radius: 10,
                  borderWidth: 0.4,
                  borderColor: $rgba(100, 100, 100, 0.25),
                  style: 4
                },
                layout: function (make, view) {
                  make.height.equalTo(150);
                  make.width.equalTo(view.super.width);
                  make.bottom.inset(0);
                },
                views: [
                  {
                    type: "picker",
                    props: {
                      id: "lgPick",
                      items: [["Base64-编码", "Base64-解码","URL-编码","URL-解码","MD5","SHA1","SHA256","convertToPinYin"]]
                    },
                    layout: function (make, view) {
                      make.left.right.inset(20);
                      make.bottom.inset(0);
                      make.height.equalTo(view.super).multipliedBy(0.9);
                    },
                    events: {
                      changed: function (sender) {
                        $device.taptic(0);
                        xuanX = sender.data[0]
                      }
                    }
                  },
                  {
                    type: "button",
                    props: {
                      title: "取消",
                      font: $font(14),
                      titleColor: $color("black"),
                      bgcolor: $color("clear")
                    },
                    layout: function (make, view) {
                      make.top.inset(2);
                      make.left.inset(4);
                    },
                    events: {
                      tapped: function (sender) {
                        $device.taptic(0);
                        $("lgPVBg").hidden = true;
                      }
                    }
                  },
                  {
                    type: "button",
                    props: {
                      title: "完成",
                      font: $font(14),
                      titleColor: $color("black"),
                      bgcolor: $color("clear")
                    },
                    layout: function (make, view) {
                      make.top.inset(2);
                      make.right.inset(4);
                    },
                    events: {
                      tapped: function (sender) {
                        $device.taptic(0);
                        $('convertbtn').title = xuanX
                        $("lgPVBg").hidden = true;
                        translate();
                      }
                    }
                  }
                ]
              }
            ],
            layout: $layout.fill
          }
        ]
      }
    ]
  });
}

function gtrans(text) {
  transUI();
  if (text) {
    $("originput").text = text;
    xuanX = "Base64-解码"
    $('convertbtn').title = xuanX
    translate();
  }
 
}

function translate() {
  var text = $("originput").text
  if (xuanX == "Base64-解码") {
    $("transinput").text = $text.base64Decode(text);
  } else if (xuanX == "Base64-编码") {
    $("transinput").text = $text.base64Encode(text);
  } else if (xuanX == "URL-解码") {
    $("transinput").text = $text.URLDecode(text);
  } else if (xuanX == "URL-编码") {
    $("transinput").text = $text.URLEncode(text);
  } else if (xuanX == "MD5") {
    $("transinput").text = $text.MD5(text);
  } else if (xuanX == "SHA1") {
    $("transinput").text = $text.SHA1(text);
  } else if (xuanX == "SHA256") {
    $("transinput").text = $text.SHA256(text);
  } else if (xuanX == "convertToPinYin") {
    $("transinput").text = $text.convertToPinYin(text);
  }


}

module.exports = {
  gtrans: gtrans
}
