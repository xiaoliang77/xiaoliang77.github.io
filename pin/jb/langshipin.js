const icon = ["135", "045", "067", "023"];
const cai = [
  { url: "/api3/get_video_list/hit", title: "热门影片" },
  { url: "/api3/get_video_list/new", title: "最新上架" },
  { url: "/api3/categories_new", title: "影片分类" },
  { url: "/api3/get_video_list/search/", title: "搜索影片" }
];
const menuview = {
  type: "view",
  props: {
    id: "Rview"
  },
  views: [
    {
      type: "view",
      props: {
        id: "line",
        bgcolor: $color("#b2b2b2")
      },
      layout: function(make) {
        make.top.right.left.inset(0);
        make.height.equalTo(0.5);
      }
    },
    {
      type: "button",
      props: {
        id: "B1",
        bgcolor: $color("white")
      },
      layout: function(make, view) {
        make.bottom.inset(0);
        make.top.equalTo($("line").bottom);
        make.width.equalTo(view.super).dividedBy(4);
      },
      events: {
        tapped(sender) {
          setupColor(sender, 0);
          Hotjm(cai[0].url, cai[0].title);
        }
      }
    },
    {
      type: "button",
      props: {
        id: "B2",
        bgcolor: $color("white")
      },
      layout: function(make, view) {
        make.bottom.inset(0);
        make.left.equalTo($("B1").right);
        make.top.equalTo($("line").bottom);
        make.width.equalTo(view.super).dividedBy(4);
      },
      events: {
        tapped(sender) {
          setupColor(sender, 1);
          Hotjm(cai[1].url, cai[1].title);
        }
      }
    },
    {
      type: "button",
      props: {
        id: "B3",
        bgcolor: $color("white")
      },
      layout: function(make, view) {
        make.bottom.inset(0);
        make.left.equalTo($("B2").right);
        make.top.equalTo($("line").bottom);
        make.width.equalTo(view.super).dividedBy(4);
      },
      events: {
        tapped(sender) {
          setupColor(sender, 2);
          fenlei();
        }
      }
    },
    {
      type: "button",
      props: {
        id: "B4",
        bgcolor: $color("white")
      },
      layout: function(make, view) {
        make.bottom.inset(0);
        make.left.equalTo($("B3").right);
        make.top.equalTo($("line").bottom);
        make.width.equalTo(view.super).dividedBy(4);
      },
      events: {
        tapped(sender) {
          setupColor(sender, 3);
          soujm();
        }
      }
    }
  ],
  layout: function(make) {
    make.left.right.bottom.inset(0);
    make.height.equalTo(44);
  }
};

const matview = {
  type: "matrix",
  props: {
    id: "Video",
    itemHeight: 180,
    columns: 3,
    spacing: 3,
    template: [
      {
        type: "image",
        props: {
          id: "img",
          radius: 3
        },
        layout: function(make, view) {
          make.centerX.equalTo(view.super);
          make.height.equalTo(180);
          make.width.equalTo(view.super);
        }
      },
      {
        type: "view",
        props: {
          bgcolor: $color("#FF4040"),
          radius: 3
        },
        layout: function(make, view) {
          make.top.equalTo(0);
          make.right.equalTo(0);
          make.size.equalTo($size(38, 19));
        }
      },
      {
        type: "label",
        props: {
          id: "leix",
          align: 1,
          textColor: $color("#fff")
        },
        layout: function(make, view) {
          make.top.equalTo(0);
          make.right.equalTo(0);
          make.size.equalTo($size(38, 18));
        }
      }
    ]
  },
  layout: function(make) {
    make.bottom.equalTo($("Rview").top);
    make.top.left.right.inset(0);
  },
  events: {
    didSelect: function(sender, indexPath, data) {
      getbof(data.id);
    }
  }
};

function Hotjm(url, mc) {
  $ui.render({
    props: {
      title: mc
    },
    views: [menuview, matview, mrhb]
  });
  if (mc == "热门影片") {
    setupColor($("B1"), 0);
  } else {
    setupColor($("B2"), 1);
  }
  gethot(url);
}

function setupColor(sz, num) {
  var color = $color("#a4b4c4");
  var size = $size(30, 30);
  $("B1").icon = $icon(icon[0], color, size);
  $("B2").icon = $icon(icon[1], color, size);
  $("B3").icon = $icon(icon[2], color, size);
  $("B4").icon = $icon(icon[3], color, size);
  sz.icon = $icon(icon[num], $color("#0080FF"), size);
}

function gethot(url) {
  $http.request({
    method: "POST",
    url: $text.base64Decode($cache.get("turl")) + url,
    header: {
      "User-Agent": "avfun/2.4 (iPhone; iOS 12.0; Scale/2.00)",
      "Authorization": "Token token='xNtE8WTy5DzfA77WbkoGJbJKZpSgH'"
    },
    handler: function(resp) {
      var json = resp.data;
      var arr = json.rows;
      var data = [];
      for (i in arr) {
        if (i != 0) {
          var a = arr[i];
          data.push({
            img: { src: a.cover },
            leix: { text: a.cat_text },
            id: a.id
          });
        }
      }
      $("Video").data = data;
      $("Video").endRefreshing();
    }
  });
}
//gethot()
function getbof(id) {
  $http.request({
    method: "POST",
    url:
      $text.base64Decode($cache.get("turl")) + "/api3/get_video_data_v2/" + id,
    header: {
      "User-Agent": "avfun/2.4 (iPhone; iOS 12.0; Scale/2.00)",
      "Authorization": "Token token='xNtE8WTy5DzfA77WbkoGJbJKZpSgH'",
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    },
    body: {
      "loginemail": "",
      "deviceid": "822B1F74-C959-410F-ABC0-DFC36359FFB8",
      "token": ""
    },
    handler: function(resp) {
      var data = resp.data;
      var mc = data.title;
      var arr = data.play_list;
      var jsdata = [];
      for (i in arr) {
        jsdata.push({
          bt: { text: String(parseInt(i) + 1) },
          url: arr[i].split("?")[0]
        });
      }
      bofjm(mc, jsdata);
    }
  });
}
function bofjm(mc, jsdata) {
  $ui.push({
    props: {
      title: mc
    },
    views: [
      {
        type: "web",
        props: {
          id: "bof",
          url: jsdata[0].url
        },
        layout: function(make, view) {
          make.right.left.top.inset(0);
          make.height.equalTo(196);
        }
      },
      {
        type: "label",
        props: {
          id: "bq1",
          text: mc,
          lines: 2,
          font: $font(19),
          textColor: $color("#ff42c3")
        },
        layout(make, view) {
          make.top.equalTo($("bof").bottom).inset(10);
          make.left.right.inset(5);
        }
      },
      {
        type: "label",
        props: {
          id: "bqxj",
          text: "🔵 选集：",
          font: $font(21)
        },
        layout(make, view) {
          make.top.equalTo($("bq1").bottom).inset(15);
          make.left.inset(5);
          make.size.equalTo($size(100, 30));
        }
      },
      {
        type: "matrix",
        props: {
          id: "jslb",
          data: jsdata,
          columns: 7,
          itemHeight: 40,
          spacing: 5,
          square: true,
          selectable: true,
          template: [
            {
              type: "label",
              props: {
                id: "bt",
                bgcolor: $color("#F8F8F8"),
                borderColor: $color("#f0f0f0"),
                borderWidth: 1,
                align: $align.center
              },
              layout(make, view) {
                make.top.left.right.bottom.inset(0);
              }
            }
          ]
        },
        layout(make, view) {
          make.top.equalTo($("bqxj").bottom).inset(5);
          make.left.right.inset(5);
          make.bottom.inset(0);
        },
        events: {
          didSelect: function(sender, indexPath, data) {
            var id = $cache.get("playid");
            $("jslb")
              .cell(indexPath)
              .add({
                type: "label",
                props: {
                  text: data.bt.text,
                  bgcolor: $color("#F8F8F8"),
                  borderColor: $color("#f01232"),
                  borderWidth: 1,
                  align: $align.center
                },
                layout(make, view) {
                  make.top.left.right.bottom.inset(0);
                }
              });
            $("bof").url = data.url;
          }
        }
      },
      mrhb
    ]
  });
}

function fenlei() {
  $http.request({
    method: "POST",
    url: $text.base64Decode($cache.get("turl")) + cai[2].url,
    header: {
      "User-Agent": "avfun/2.4 (iPhone; iOS 12.0; Scale/2.00)",
      "Authorization": "Token token='xNtE8WTy5DzfA77WbkoGJbJKZpSgH'",
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    },
    handler: function(resp) {
      var data = resp.data;
      var juq = data.rows_1;
      var wum = data.rows_2;
      var juqli = [];
      for (i in juq) {
        juqli.push({
          lmc: { text: juq[i].title },
          xssl: { text: juq[i].count + " 〉" },
          id: juq[i].id
        });
      }
      var wumli = [];
      for (i in wum) {
        wumli.push({
          lmc: { text: wum[i].title },
          xssl: { text: wum[i].count + " 〉" },
          id: wum[i].id
        });
      }

      $ui.render({
        props: {
          title: cai[2].title
        },
        views: [
          menuview,
          {
            type: "menu",
            props: {
              id: "flmeun",
              items: ["劇情薄码", "無嗎高清"]
            },
            layout: function(make) {
              make.left.top.right.equalTo(0);
              make.height.equalTo(50);
            },
            events: {
              changed: function(sender) {
                if (sender.index == 0) {
                  $("vlist").data = juqli;
                } else {
                  $("vlist").data = wumli;
                }
              }
            }
          },
          {
            type: "list",
            props: {
              id: "vlist",
              data: juqli,
              template: [
                {
                  type: "label",
                  props: {
                    id: "lmc",
                    font: $font("bold", 21),
                    lines: 0
                  },
                  layout: function(make, view) {
                    make.left.inset(0);
                    make.top.bottom.inset(0);
                    make.right.inset(100);
                  }
                },
                {
                  type: "label",
                  props: {
                    id: "xssl",
                    font: $font(16),
                    align: 2,
                    textColor: $color("#848484")
                  },
                  layout: function(make) {
                    make.top.bottom.inset(0);
                    make.right.inset(0);
                    make.width.equalTo(90);
                  }
                }
              ]
            },
            layout: function(make) {
              make.top.equalTo($("flmeun").bottom);
              make.bottom.equalTo($("Rview").top);
              make.left.right.inset(15);
            },
            events: {
              didSelect: function(sender, indexPath, data) {
                getflli(data.lmc.text, data.id);
              }
            }
          },
          mrhb
        ]
      });
      setupColor($("B3"), 2);
    }
  });
}

function getflli(mc, id) {
  $ui.push({
    props: {
      title: mc
    },
    views: [menuview, matview, mrhb]
  });
  var url = `/api3/get_video_list/cat/${id}/1`;
  gethot(url);
  setupColor($("B3"), 2);
}

function soujm() {
  $ui.render({
    props: {
      title: cai[3].title
    },
    views: [
      menuview,
      {
        type: "input",
        props: {
          id: "wd",
          type: $kbType.search,
          placeholder: "搜索影视...",
          darkKeyboard: true
        },
        layout: function(make, view) {
          make.left.right.top.inset(5);
          make.height.equalTo(32);
        },
        events: {
          returned: function(sender) {
            var key = encodeURI($("wd").text);
            var url = cai[3].url + key;
            gethot(url);
            $("wd").blur();
          }
        }
      },
      {
        type: "matrix",
        props: {
          id: "Video",
          itemHeight: 180,
          columns: 3,
          spacing: 3,
          template: [
            {
              type: "image",
              props: {
                id: "img",
                radius: 3
              },
              layout: function(make, view) {
                make.centerX.equalTo(view.super);
                make.height.equalTo(180);
                make.width.equalTo(view.super);
              }
            },
            {
              type: "view",
              props: {
                bgcolor: $color("#FF4040"),
                radius: 3
              },
              layout: function(make, view) {
                make.top.equalTo(0);
                make.right.equalTo(0);
                make.size.equalTo($size(38, 19));
              }
            },
            {
              type: "label",
              props: {
                id: "leix",
                align: 1,
                textColor: $color("#fff")
              },
              layout: function(make, view) {
                make.top.equalTo(0);
                make.right.equalTo(0);
                make.size.equalTo($size(38, 18));
              }
            }
          ]
        },
        layout: function(make) {
          make.bottom.equalTo($("Rview").top);
          make.top.equalTo($("wd").bottom).inset(10);
          make.left.right.inset(0);
        },
        events: {
          didSelect: function(sender, indexPath, data) {
            getbof(data.id);
          }
        }
      },
      mrhb
    ]
  });
  setupColor($("B4"), 3);
}

function csh() {
  $ui.loading(true);
  $http.get({
    url: $text.base64Decode(
      "aHR0cHM6Ly9naXRlZS5jb20veWFvMDcvdXBkYXRlX2RldmljZS9yYXcvbWFzdGVyL2xhbmdzcC5qc29u"
    ),
    handler: function(resp) {
      $ui.loading(false);
      if (resp.response.statusCode == "200") {
        var info = resp.data;
        $cache.set("info", info);
        console.log(info.gg)
        if (info.bb != "1.0") {
          $ui.alert({
            title: "温馨提示",
            message: info.gxsm,
            actions: [
              {
                title: "进入官网",
                handler: function() {
                  $app.openURL(info.gw);
                }
              },
              {
                title: "关注公众号",
                handler: function() {
                  $ui.alert({
                    title: "温馨提示",
                    message:
                      "跳转微信会自动复制公众号ID\n请跳转到微信-搜索-公用号-粘贴-关注",
                    actions: [
                      {
                        title: "跳转微信",
                        handler: function() {
                          $clipboard.text = "ae85-cn";
                          $app.openURL("weixin://");
                        }
                      },
                      {
                        title: "取消"
                      }
                    ]
                  });
                }
              }
            ]
          });
        } else {
          $cache.set("zfb",info.zfb)
          $cache.set("turl", info.turl);
          Hotjm(cai[0].url, cai[0].title);
        }
      } else {
        $ui.alert("加载失败");
      }
    }
  });
}

csh();

const mrhb = {
  type: "button",
  props: {
    id: "hb_img",
    radius: 30,
    src: "https://ae85.cn/wf/hb.jpg"
  },
  events: {
    tapped: function(sender) {
      $app.openURL($cache.get("zfb"));
    }
  },
  layout: function(make, view) {
    make.bottom.inset(66);
    make.width.height.equalTo(60);
    make.right.inset(15);
  }
};
