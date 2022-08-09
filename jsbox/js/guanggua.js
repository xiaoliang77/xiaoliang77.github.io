/*
黄瓜视频破解
无限观看次数
未满18岁请勿使用该脚本程序
代码编写比较个性自由，请勿模仿。
by：iPhone 8、小良
https://iphone8.vip/
*/
var urlt = "http://imgup.hgpornhub.com/img//"
var tu = [{ ing: "/71/ab7c562572aa74075f7bf5e175bb562d.png", ddr: 855 }, { ing: "/83/03690813fbf3c498dab1fe24208e2587.png", ddr: 851 }, { ing: "/93/0dc9355f703f9874b1187256fd48c147.png", ddr: 853 }, { ing: "/7/3a5945597a2ce26a8da7995b2dc9a287.png", ddr: 854 }]
var ssc = [{
  type: "button",
  props: {
    src: urlt + tu[0].ing,
  },
  events: {
    tapped: function(sender) {
      zyljm(0, tu[0].ddr + " - ")
      getzyl(tu[0].ddr)
    }
  }
}, {
  type: "button",
  props: {
    src: urlt + tu[1].ing,
  },
  events: {
    tapped: function(sender) {
      zyljm(0, tu[1].ddr + " - ")
      getzyl(tu[1].ddr)
    }
  }
}, {
  type: "button",
  props: {
    src: urlt + tu[2].ing,
  },
  events: {
    tapped: function(sender) {
      zyljm(0, tu[2].ddr + " - ")
      getzyl(tu[2].ddr)

    }
  }
}, {
  type: "button",
  props: {
    src: urlt + tu[3].ing,
  },
  events: {
    tapped: function(sender) {
      zyljm(0, tu[3].ddr + " - ")
      getzyl(tu[3].ddr)
    }
  }
}, ]

cdu = "http://imgup.fghuj.com/img//"
var cd = [{ img: { src: cdu + "/78/115629fd07630ea61381359777d8c9d0.png" }, pm: { text: "无码" }, id: "2" }, { img: { src: cdu + "/39/30a637449a45dd4de6ecd4412b304c89.png" }, pm: { text: "人妻熟女" }, id: "7" }, { img: { src: cdu + "/87/89be74acbf2888276e054a80c72ebc14.png" }, pm: { text: "素人" }, id: "8" }, { img: { src: cdu + "/115/c7de6cb8c5076ef9bf115bc50e4147aa.png" }, pm: { text: "帝王温暖" }, id: "21" }, { img: { src: cdu + "/6/2d5fffa092cbfae11628021c5524dbbb.png" }, pm: { text: "辣妹大奶" }, id: "6" }, { img: { src: cdu + "/99/577f543ec0f6ebf463b744b5bb51d9a6.png" }, pm: { text: "制服诱惑" }, id: "10" }, { img: { src: cdu + "/88/b93962b10ea3a7429e336a97ba711862.png" }, pm: { text: "偷拍自拍" }, id: "23" }, { img: { src: "https://iphone8.vip/pin/quabut.png" }, pm: { text: "全部" }, id: "1" }, ]

var me = [{ name: "全部", id: "1" }, { name: "无码", id: "2" }, { name: "人妻熟女", id: "7" }, { name: "素人", id: "8" }, { name: "帝王温暖", id: "21" }, { name: "辣妹大奶", id: "6" }, { name: "制服诱惑", id: "23" }, { name: "偷拍自拍", id: "10" }, { name: "各行各业", id: "14" }, { name: "当红女优", id: "3" }, { name: "深夜综艺", id: "24" }, { name: "集体性爱", id: "11" }, { name: "美少女", id: "12" }, { name: "性感内衣", id: "16" }, { name: "重口变态", id: "15" }, { name: "角色扮演", id: "13" }, { name: "不伦乱伦", id: "9" }, { name: "按摩桑拿", id: "17" }, { name: "人气排行", id: "4" }, { name: "第一人称", id: "18" }, { name: "妄想写真", id: "22" }, { name: "青春荡漾", id: "38" }, { name: "欧美AV", id: "5" }, { name: "放浪女孩", id: "39" }, { name: "三级剧情", id: "58" }]

const mrhb = {
  type: "button",
  props: {
    id: "hb_img",
    src: "https://iphone8.vip/img/xl.png",
  },
  events: {
    tapped: function(sender) {
      $app.openURL("alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=https%3A%2F%2Fqr.alipay.com%2Fc1x08786tiy5qigyhnjd2db%3F_s%3Dweb-other")
    }
  },
  layout: function(make, view) {
    make.bottom.inset(66)
    make.width.height.equalTo(60)
    make.right.inset(15)
  }
}

$cache.set("acquiescence", 0)
$cache.set("id", 1)
$cache.set("page", 1)

const views_sou = {
  type: "input",
  props: {
    id: "wd",
    type: $kbType.search,
    placeholder: "🔍 输入关键字查找片源...",
    darkKeyboard: true
  },
  layout: function(make, view) {

    make.top.inset(0)
    make.left.right.inset(10)
    make.height.equalTo(35)
  },
  events: {
    returned: function(sender) {
      var key = sender.text
      $cache.set("key", key)
      zyljm(1, "搜索：" + key + " - ")
      Search(key)
      $("input").blur()
    }
  }
}

function Search() {
  var page = $cache.get("page")
  var key = $cache.get("key")
  $text.URLEncode(key)
  $ui.loading(true)
  $http.request({
    method: "GET",
    url: "http://app.huangguaporn.com//es/mov/search?pageNo=" + page + "&pageSize=10&q=" + encodeURI(key),
    header: {
      "User-Agent": "huang gua shi pin/1.0.6 (iPhone; iOS 9.3.3; Scale/2.00)",
    },
    handler: function(resp) {
      $ui.loading(false)
      var json = resp.data.data
      var img = "http://imgup.huangguaporn.com/cover/"
      if (page == 1) {
        var data = []
      } else {
        var data = $("zxpyd").data
      }
      for (i in json) {
        var li = json[i]
        data.push({
          img: {
            src: img + li.thumbnail
          },
          pm: {
            text: li.movName
          },
          urlj: li.address,
          size: li.movSize,
        })
      }
      $("zxpyd").data = data
      $("zxpyd").endRefreshing()
    }
  })
}
$ui.render({
  props: {
    title: "黄瓜视频破解"
  },
  views: [views_sou, {
      type: "gallery",
      props: {
        id: "lbt",
        items: ssc,
        interval: 2,
        radius: 5.0
      },
      layout: function(make, view) {
        make.top.equalTo($("wd").bottom).inset(5)
        make.left.right.inset(10)
        make.height.equalTo(220)
      }
    }, {
      type: "matrix",
      props: {
        id: "cd",
        data: cd,
        itemHeight: 80,
        columns: 4,
        spacing: 3,
        template: [{
            type: "image",
            props: {
              id: "img",
              radius: 3
            },
            layout: function(make, view) {
              make.top.inset(0)
              make.centerX.equalTo(view.center)
              make.height.width.equalTo(50)
            }
          },
          {
            type: "label",
            props: {
              id: "pm",
              align: $align.center,
              lines: 1,
              font: $font("bold", 12)
            },
            layout: function(make, view) {
              make.top.equalTo($("img").bottom).offset(5)
              make.right.left.inset(0)
            }
          },
        ]
      },
      layout: function(make) {
        make.top.equalTo($("lbt").bottom)
        make.left.right.inset(0)
        make.height.equalTo(160)
      },
      events: {
        didSelect: function(sender, indexPath, data) {
          $cache.set("id", data.id)
          $cache.set("page", 1)
          quan()
        },

      }
    },
    {
      type: "button",
      props: {
        id: "bq1",
        align: $align.left,
        lines: 1,
        title: "📀最新片源",
        titleColor: $color("#FF7F00"),
        bgcolor: $color("clear"),
      },
      layout: function(make, view) {
        make.top.equalTo($("cd").bottom).offset(10)
        make.left.inset(10)
      }
    },
    {
      type: "button",
      props: {
        id: "bt1",
        title: "更多 〉",
        align: $align.right,
        titleColor: $color("#FF7F00"),
        bgcolor: $color("clear"),
      },
      layout: function(make) {

        make.top.equalTo($("bq1").top)
        make.right.inset(10)
      },
      events: {
        tapped: function(sender) {
          $cache.set("acquiescence", 1)
          quan()
        }
      }
    },
    {
      type: "matrix",
      props: {
        id: "zxpyd",
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
        make.top.equalTo($("bq1").bottom)
        make.left.right.inset(10)
        make.height.equalTo(300)
      },
      events: {
        didSelect: function(sender, indexPath, data) {
          bfjm(data)
        }
      }
    },
    mrhb
  ]
})

getlist()

function getlist() {
  var tab = $cache.get("acquiescence") + 1
  var id = $cache.get("id")
  var page = $cache.get("page")
  if (id == 1) {
    var url = "http://app.huangguaporn.com//home/clsmov/query?filter=" + tab + "&pageNo=" + page + "&pageSize=10"
  } else {
    var url = "http://app.huangguaporn.com//home/clsmov/query?clsId=" + id + "&filter=" + tab + "&pageNo=" + page + "&pageSize=10"
  }
  $ui.loading(true)
  $http.request({
    method: "GET",
    url: url,
    header: {
      "User-Agent": "huang gua shi pin/1.0.6 (iPhone; iOS 9.3.3; Scale/2.00)"
    },
    handler: function(resp) {
      $ui.loading(false)
      var json = resp.data.data
      var img = "http://imgup.huangguaporn.com/cover/"
      if (page == 1) {
        var data = []
      } else {
        var data = $("zxpyd").data
      }
      for (i in json) {
        var li = json[i]
        data.push({
          img: {
            src: img + li.thumbnail
          },
          pm: {
            text: li.movName
          },
          urlj: li.address,
          size: li.movSize,
        })
      }
      $("zxpyd").data = data
      $("zxpyd").endRefreshing()
    }
  })
}

function bfjm(data) {
  var ut = "http://videoup.fghuj.com/video/"
  var url = JSON.stringify(data.urlj)
  var uu = ut + url.match(/\:\"(\S*?)\"/)[1]
  web(uu, data.pm.text)
}

function web(url, mc) {
  $ui.push({
    props: {
      title: mc
    },
    views: [{
      type: "web",
      props: {
        url: url,
      },
      layout: $layout.fill,

    }, mrhb]
  })
}

function quan() {
  getlist()
  $ui.push({
    props: {
      title: "全部高清影片"
    },
    views: [views_sou, {
      type: "tab",
      props: {
        id: "tab",
        items: ["最多播放", "最近更新", "最多喜欢"],
        index: $cache.get("acquiescence")
      },
      layout(make, view) {
        make.top.equalTo($("wd").bottom).inset(5)
        make.left.right.inset(10)
        make.height.equalTo(30)
      },
      events: {
        changed: function(sender) {
          $cache.set("acquiescence", sender.index)
          $cache.set("page", 1)
          getlist()

        }
      }
    }, {
      type: "menu",
      props: {
        id: "menu",
        items: me.map(function(item) {
          return item.name
        }),
      },
      layout: function(make) {
        make.top.equalTo($("tab").bottom).inset(10)
        make.left.right.equalTo(0)
        make.height.equalTo(40)

      },
      events: {
        changed: function(sender) {
          $cache.set("id", me[sender.index].id)
          $cache.set("page", 1)
          getlist()

        }
      }
    }, {
      type: "matrix",
      props: {
        id: "zxpyd",
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
        make.top.equalTo($("menu").bottom).inset(10)
        make.left.right.inset(10)
        make.bottom.inset(0)
      },
      events: {
        didSelect: function(sender, indexPath, data) {
          bfjm(data)
        },
        didReachBottom: function(sender) {
          sender.endFetchingMore()
          var pg = $cache.get("page") + 1
          $cache.set("page", pg)
          getlist()
        }
      }
    }, ]
  })
}

function zyljm(shu, title) {
  $ui.push({
    props: {
      title: title + "视频列表"
    },
    views: [{
      type: "matrix",
      props: {
        id: "zxpyd",
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
        make.top.bottom.left.right.inset(10)
      },
      events: {
        didSelect: function(sender, indexPath, data) {
          bfjm(data)
        },
        didReachBottom: function(sender) {
          sender.endFetchingMore()
          var pg = $cache.get("page") + 1
          $cache.set("page", pg)
          if (shu == 1) {
            Search()
          } else {
            getzyl($cache.get("idx"))
          }

        }
      }
    }, ]
  })

}

function getzyl(id) {
  var page = $cache.get("page")
  $cache.set("idx", id)
  $ui.loading(true)
  $http.request({
    method: "POST",
    url: "http://app.huangguaporn.com//module/movlist",
    header: {
      "User-Agent": "huang gua shi pin/1.0.6 (iPhone; iOS 9.3.3; Scale/2.00)",
      "Version": "106002101",
      "Content-Type": "application/json",
      "Seq": "6372d3002bb6cff727941C30mC30sCpOmCJK",
    },
    body: {
      "navCls": 1,
      "navId": id,
      "pageSize": 10,
      "pageNo": page
    },
    handler: function(resp) {
      $ui.loading(false)
      var json = resp.data.data
      var img = "http://imgup.huangguaporn.com/cover/"
      if (page == 1) {
        var data = []
      } else {
        var data = $("zxpyd").data
      }
      for (i in json) {
        var li = json[i]
        data.push({
          img: {
            src: img + li.thumbnail
          },
          pm: {
            text: li.movName
          },
          urlj: li.address,
          size: li.movSize,
        })
      }
      $("zxpyd").data = data
      $("zxpyd").endRefreshing()
    }
  })
}