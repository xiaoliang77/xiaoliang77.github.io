/*
贴吧签到升级到1.2版本
更新时间：2018年8月18日
更新内容：修复无法签到问题。支持多账号签到。增加添加BDUSS功能，添加管理账号，切换账号签到。
by：iPhone 8、小良
https://ae85.cn/
*/

if ($file.exists("baidu")) {
  var file = $file.list("baidu")
  if (file.length > 0) {
    var wjm = file[file.length - 1]
    var data = $file.read("baidu/" + wjm)
    var id = wjm.replace(".txt", "")
    $cache.set("BDUSS", data.string)
    qiandaoui(id)

  } else {
    tianjiaui()
  }

} else {
  $file.mkdir("baidu")
}
var zfbhb = {
  type: "button",
  props: {
    id: "hb_img",
    src: "https://ae85.cn/img/hb.jpg",
    radius: 30
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

function tianjiaui() {
  $ui.render({
    props: {
      title: "添加百度账号BDUSS"
    },
    views: [{
        type: "button",
        props: {
          id: "dr_img",
          src: "https://ae85.cn/jsbox/img/drlogo.png",
          radius: 40
        },
        layout: function(make, view) {
          make.top.inset(20)
          make.width.height.equalTo(80)
          make.centerX.equalTo(view.center)
        }
      }, {
        type: "input",
        props: {
          id: "bjk1",
          placeholder: "输入百度账号"
        },
        layout: function(make) {
          make.top.equalTo($("dr_img").bottom).inset(20)
          make.left.right.inset(30)
          make.height.equalTo(40)
        }
      }, {
        type: "input",
        props: {
          id: "bjk2",
          placeholder: "输入BDUSS"
        },
        layout: function(make) {
          make.top.equalTo($("bjk1").bottom).inset(15)
          make.left.right.inset(30)
          make.height.equalTo(40)
        }
      }, {
        type: "button",
        props: {
          id: "bt1",
          title: "添加",
          bgcolor: $color("#149bcc"),

        },
        layout: function(make) {

          make.top.equalTo($("bjk2").bottom).inset(20)
          make.left.right.inset(30)
          make.height.equalTo(40)
        },
        events: {
          tapped: function(sender) {
            var id = $("bjk1").text
            var key = $("bjk2").text

            if (id == "") {
              $ui.alert("请填写账号")
            } else if (key == "") {
              $ui.alert("请填写BDUSS")
            } else {
              if (
                $file.write({
                  data: $data({ string: key }),
                  path: "baidu/" + id + ".txt"
                })) {
                $ui.toast("添加成功……")
                $cache.set("BDUSS", key)
                qiandaoui(id)
                getlb()

              }
            }
          }

        }
      }, {
        type: "button",
        props: {
          id: "bt2",
          title: "获取BDUSS教程",
          titleColor: $color("#0000cd"),
          bgcolor: $color("clear")
        },
        layout: function(make) {

          make.top.equalTo($("bt1").bottom).inset(20)
          make.left.inset(30)
          make.size.equalTo($size(120, 40))
        },
        events: {
          tapped: function(sender) {
            webdr("http://t.cn/Rkb7u8i")

          }

        }
      }, {
        type: "button",
        props: {
          id: "bt3",
          title: "其他方式获取",
          titleColor: $color("#0000cd"),
          bgcolor: $color("clear"),

        },
        layout: function(make) {

          make.top.equalTo($("bt1").bottom).inset(20)
          make.right.inset(30)
          make.size.equalTo($size(110, 40))
        },
        events: {
          tapped: function(sender) {
            webdr("http://bduss.hugang8.cn/index.html")
          }

        }
      }, {
        type: "button",
        props: {
          id: "bt4",
          title: "作者网站",
          titleColor: $color("#008080"),
          bgcolor: $color("clear"),
          borderColor: $color("#008080"),
          borderWidth: 1
        },
        layout: function(make) {

          make.bottom.inset(1)
          make.left.inset(5)
          make.width.equalTo(110)
          make.height.equalTo(35)
        },
        events: {
          tapped: function(sender) {
            $app.openURL("https://ae85.cn/")
          }

        }
      },
      {
        type: "button",
        props: {
          id: "bt5",
          title: "公众号",
          titleColor: $color("#CD0000"),
          bgcolor: $color("clear"),
          borderColor: $color("#CD0000"),
          borderWidth: 1
        },
        layout: function(make, kbon) {

          make.bottom.inset(1)
          make.centerX.equalTo(kbon.center).inset(-55)
          make.width.equalTo(110)
          make.height.equalTo(35)
        },
        events: {
          tapped: function(sender) {
            $app.openURL("https://ae85.cn/lxfs.html")
          }

        }
      },
      {
        type: "button",
        props: {
          id: "bt6",
          title: "作者QQ",
          titleColor: $color("#FF7F00"),
          bgcolor: $color("clear"),
          borderColor: $color("#FF7F00"),
          borderWidth: 1
        },
        layout: function(make) {

          make.bottom.inset(1)
          make.right.inset(5)
          make.width.equalTo(110)
          make.height.equalTo(35)
        },
        events: {
          tapped: function(sender) {
            $app.openURL("http://wpa.qq.com/msgrd?v=3&uin=84088289&site=qq&menu=yes")
          }

        }
      },
      zfbhb,
    ]
  })
}

function webdr(url) {
  $ui.push({
    props: {
      title: "获取百度BDUSS"
    },
    views: [{
      type: "web",
      props: {
        id: "webid",
        url: url,
        toolbar: true,
      },
      layout: $layout.fill,

    }, ]
  })
}

function qiandaoui(id) {
  $ui.render({
    props: {
      title: id + " - 贴吧签到"
    },
    views: [{
      type: "matrix",
      props: {
        id: "lb",
        columns: 2,
        itemHeight: 40,
        spacing: 5,
        template: [{
          type: "label",
          props: {
            id: "bj",
            text: "",
            bgcolor: $color("#F8F8F8"),
            borderColor: $color("#f0f0f0"),
            borderWidth: 1,
          },
          layout(make, view) {
            make.top.left.right.bottom.inset(0)
          }

        }, {
          type: "label",
          props: {
            id: "mc",
          },
          layout(make, view) {
            make.left.inset(10)
            make.top.right.bottom.inset(0)
          }

        }, {
          type: "label",
          props: {
            id: "zt",
            font: $font(13),
            radius: 3,
            textColor: $color("#C4483D"),
            borderColor: $color("#C4483D"),
            borderWidth: 1,
          },
          layout(make, view) {
            make.top.inset(13)
            make.right.inset(35)
          }

        }, {
          type: "label",
          props: {
            id: "dj",
            font: $font(13),
            radius: 18,
            bgcolor: $color("#47c7ff"),
            textColor: $color("#ffffff"),
            align: $align.center,
          },
          layout(make, view) {
            make.top.inset(7)
            make.right.inset(5)
            make.size.equalTo(25, 25)
          }

        }, ]
      },
      layout(make, view) {
        make.top.left.right.inset(0)
        make.bottom.inset(200)

      },
      events: {
        didSelect: function(sender, indexPath, data) {
          var tqzt = data.zt.text
          if (tqzt == "未签") {
            qian(data.mc.text)
          } else {
            $("sm").text = $("sm").text + sj() + data.mc.text + "：已签到！\n"
          }
          getlb()
        }

      }
    }, {
      type: "button",
      props: {
        id: "bt1",
        title: "一键签到  (长按切换账号)",
        bgcolor: $color("#F41093"),

      },
      layout: function(make) {

        make.top.equalTo($("lb").bottom).inset(10)
        make.left.right.inset(20)
        make.height.equalTo(40)
      },
      events: {
        tapped: function(sender) {
          var data = $("lb").data
          for (i in data) {
            var zt = data[i].zt.text
            if (zt == "未签") {
              qian(data[i].mc.text)
            } else {
              $("sm").text = $("sm").text + sj() + data[i].mc.text + "：已签到！\n"
            }
          }
          getlb()
        },
        longPressed: function(sender) {
          idlistui()
          idlist()
        }

      }
    }, {
      type: "text",
      props: {
        id: "sm",
        text: "",
        editable: false,
        textColor: $color("#FF4040")
      },
      layout: function(make) {
        make.top.equalTo($("bt1").bottom).inset(10)
        make.left.right.inset(10)
        make.bottom.inset(0)
      }
    }, zfbhb, ]
  })
}

function getlb() {
  $ui.loading(true)
  var BDUSS = $cache.get("BDUSS")
  $http.request({
    method: "GET",
    url: "https://tieba.baidu.com/?page=like",
    header: {
      "Cookie": "BDUSS=" + BDUSS,
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 10_1_1 like Mac OS X; zh-CN) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/14B100 UCBrowser/10.7.5.650 Mobile"
    },

    handler: function(resp) {
      $ui.loading(false)
      var text = resp.data.replace(/\n|\s|\r/g, "")
      var shu = text.match(/<lidata-fn=[\s\S]*?<\/li>/g)
      var tbs = text.match(/\"tbs\":\"(\S*?)\"/)[1]
      $cache.set("tbs", tbs)
      var data = []
      for (i in shu) {
        var story = shu[i]
        var zt = ""
        if (story.indexOf("forumTile_signglobal_icon") !== -1) { zt = "已签到" } else { zt = "未签" };
        data.push({
          mc: {
            text: story.match(/forumTile_name\">(\S*?)</)[1]
          },
          zt: {
            text: zt
          },
          dj: {
            text: story.match(/levellevel_(\S*?)\"/)[1]
          }

        })
      }
      $("lb").data = data
    }
  })

}

getlb()

function qian(bm) {
  $ui.loading(true)
  var BDUSS = $cache.get("BDUSS")
  var tbs = $cache.get("tbs")
  $http.request({
    method: "POST",
    url: "https://tieba.baidu.com/sign/add",
    header: {
      "Cookie": "BDUSS=" + BDUSS,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 10_1_1 like Mac OS X; zh-CN) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/14B100 UCBrowser/10.7.5.650 Mobile"
    },
    body: {
      ie: "utf-8",
      kw: bm,
      tbs: tbs,
    },
    handler: function(resp) {
      if (resp.data.no == 0) {
        $("sm").text = $("sm").text + sj() + bm + "：签到成功！\n"
      }

    }
  })

}

function sj() {
  var sj = new Date()
  var h = sj.getHours()
  var m = sj.getMinutes()
  var s = sj.getSeconds()
  return h + ":" + m + ":" + s + " - "
}

function idlistui() {
  $ui.push({
    props: {
      title: "账号管理",
      bgcolor: $color("#FF1493"),
    },
    views: [{
      type: "list",
      props: {
        id: "idlist",
        actions: [{
          title: "删除",
          handler: function(sender, indexPath) {
            $file.delete("baidu/" + sender.data[0].rows[indexPath.row] + ".txt")
            idlist()
          }
        }]
      },
      layout: $layout.fill,
      events: {
        didSelect: function(sender, indexPath, data) {
          if (data == "点击 - 添加账号") {
            tianjiaui()
          } else {
            var key = $file.read("baidu/" + data + ".txt")
            $cache.set("BDUSS", key.string)
            qiandaoui(data)
            getlb()
          }
        }
      }
    }]
  })
}

function idlist() {
  var arr = []
  var file = $file.list("baidu")
  for (var i = 0; i < file.length; i++) {
    arr.push(file[i].replace(".txt", ""))
  }
  $("idlist").data = [{
      title: "账号 (" + arr.length + ")   -  点击切换账号                注：向左滑动可删除",
      rows: arr
    },
    {
      title: "==================================================",
      rows: ["点击 - 添加账号"]
    }
  ]
}