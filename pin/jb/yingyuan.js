/*
海量资源，高清视频极速稳定观看。
by：iPhone 8、小良
http://ae85.cn/

*/


$ui.render({
  props: {
    title: "极速影院"
  },
  views: [{
      type: "menu",
      props: {
        id: "meun",
        items: ["电影", "电视剧", "综艺", "动漫"],
      },
      layout: function(make) {
        make.left.top.right.equalTo(0)
        make.height.equalTo(50)

      },
      events: {
        changed: function(sender) {
          $cache.set("type", sender.index + 1)
          getdata()

        }
      }
    },
    {
      type: "list",
      props: {
        id: "List",
        data: [{
          rows: [{
            id: "wd",
            type: "input",
            props: {
              type: $kbType.search,
              placeholder: "搜索影视...",
              darkKeyboard: true
            },
            layout: function(make, view) {
              make.left.right.top.bottom.inset(5)
            },
            events: {
              returned: function(sender) {
                var key = $("input").text

                Search(key)
$("input").blur()
              }
            }
          }]
        }]
      },
      layout: function(make) {
        make.top.equalTo($("meun").bottom)
        make.height.equalTo(50)
        make.left.right.inset(0)
      }
    },
    {
      type: "matrix",
      props: {
        id: "Video",
        itemHeight: 230,
        columns: 3,
        spacing: 3,
        template: [{
            type: "image",
            props: {
              id: "img"
            },
            layout: function(make, view) {
              make.centerX.equalTo(view.super)
              make.height.equalTo(180)
              make.width.equalTo(120)
            }
          },
          {
            type: "label",
            props: {
              id: "pm",
              align: $align.center,
              lines: 0,
              font: $font("bold", 15)
            },
            layout: function(make, view) {
              make.top.equalTo($("img").bottom).offset(10)
              make.right.left.inset(0)
            }
          },
          {
            type: "label",
            props: {
              id: "gx",
              textColor: $color("#fff"),
              font: $font(14)
            },
            layout: function(make, view) {
              make.top.equalTo($("img").bottom).offset(-23)
              make.left.inset(5)
              make.right.inset(45)
            }
          },
          {
            type: "label",
            props: {
              id: "pf",
              textColor: $color("#fff"),
              font: $font(14)
            },
            layout: function(make, view) {
              make.top.equalTo($("img").bottom).offset(-23)
              make.right.inset(0)
              make.width.equalTo(30)
            }
          }
        ]
      },
      layout: function(make) {
        make.top.equalTo($("List").bottom)
        make.bottom.left.right.inset(0)
      },
      events: {
        didSelect: function(sender, indexPath, data) {
            $cache.set("playid", data.id)
            getjs(data.url, data.pm.text, data.gx.text, data.pf.text)

          }
          ,
        didReachBottom: function(sender) {
          sender.endFetchingMore()
          var page = $cache.get("pg") + 1
          $cache.set("pg", page)
          getdata()
        }

      }
    }
  ]
})
var urlt = "http://piaohuaapprs.dafanqie.tv:82"

function getdata() {
  var pg = $cache.get("pg")
  var type = $cache.get("type")
  $ui.loading(true)
  $http.request({
    method: "POST",
    url: urlt + "/getlist.php",
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "YingShi/1.1.2 (iPhone; iOS 9.3.3; Scale/2.00)"
    },
    body: {
      "pg": pg,
      "area": "",
      "type": type,
      "class": "",
      "year": ""

    },
    handler: function(resp) {
      $ui.loading(false)
      var arr = resp.data.html
      var data = []
      for (i in arr) {
        var a = arr[i]
        data.push({
          img: {
            src: urlt + a.pic
          },
          pm: {
            text: a.name
          },
          gx: {
            text: a.remarks
          },
          pf: {
            text: a.score
          },
          id: a.id,
          url: urlt + a.link

        })
      }

      $("Video").data = data

    }
  })

}

function getjs(url, pm, gx, pf) {
  $ui.loading(true)
  $http.get({
    url: url,
    handler: function(resp) {
      $ui.loading(false)
      var text = resp.data.replace(/\n|\s|\r/g, "")
      var jian = text.match(/\"des_infoAll\">(\S*?)<\/div>/)[1]
      var lt = text.match(/<imgclass=\"play-img\"src=\"(\S*?)\"/)[1]
      var jsdata = text.match(/num=(\S*?)\"/g)

      var js = []
      for (i in jsdata) {
        js.push({
          bt: {
            text: String(parseInt(i) + 1)
          }
        })

      }
      play($cache.get("playid"), "1")
      var playurl = $cache.get("playurl")
      setxq(playurl, pm, jian, gx, pf, js)
      if (js.length < 1) {
        $("smbq").updateLayout(function(make) {
          make.height.equalTo(460)
        })
        $("bqxj").alpha = 0
      }
    }
  })
}
$cache.set("pg", "1")
$cache.set("type", "1")
getdata()
function setxq(playurl, pm, jian, gx, pf, js) {
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
        id: "bq1",
        text: "🔵 简介：",
        font: $font(21),
      },
      layout(make, view) {
        make.top.equalTo($("bof").bottom).inset(5)
        make.left.inset(5)
        make.size.equalTo($size(100, 30))

      }
    }, {
      type: "label",
      props: {
        id: "bq2",
        text: gx,
        textColor: $color("#3c78d8"),
        align: $align.center
      },
      layout(make, view) {
        make.top.equalTo($("bof").bottom).inset(5)
        make.centerX.equalTo($("bq1").center)
        make.size.equalTo($size(200, 30))

      }
    }, {
      type: "label",
      props: {
        id: "bq3",
        text: pf + "分",
        textColor: $color("#dd7e6b")
      },
      layout(make, view) {
        make.top.equalTo($("bof").bottom).inset(5)
        make.right.inset(5)
        make.size.equalTo($size(40, 30))

      }
    }, {
      type: "text",
      props: {
        id: "smbq",
        text: "         " + jian,
        editable: false,
        font: $font("Avenir-Light", 17)
      },
      layout(make, view) {
        make.top.equalTo($("bq1").bottom).inset(5)
        make.left.right.inset(5)
        make.height.equalTo(160)

      }
    }, {
      type: "label",
      props: {
        id: "bqxj",
        text: "🔵 选集：",
        font: $font(21),
      },
      layout(make, view) {
        make.top.equalTo($("smbq").bottom).inset(5)
        make.left.inset(5)
        make.size.equalTo($size(100, 30))

      }
    }, {
      type: "matrix",
      props: {
        id: "jslb",
        data: js,
        columns: 7,
        itemHeight: 40,
        spacing: 5,
        square: true,
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

          play(id, data.bt.text)

        }

      }
    }, ]

  })

}

function play(id, index) {
   $ui.loading(true)
  $http.request({
    method: "POST",
    url: "http://iapi.qizhouqi.com/app/ios/getvideo.php",
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "YingShi/1.1.2 (iPhone; iOS 9.3.3; Scale/2.00)"
    },
    body: {
      "id": id,
      "index": index,

    },
    handler: function(resp) {
      $ui.loading(false)
      var ab = JSON.stringify(resp.data)
      var url = ab.match(/\"url\":\"(\S*?)\"/)[1]
      $("bof").url = url

    }

  })

}

function Search(the) {
  $http.get({
    url: urlt + "/search/search11.php?q=" + encodeURI(the),
    handler: function(resp) {
      var html = resp.data.html.replace(/\n|\s|\r/g, "")
      var li = html.match(/<li>(\S*?)<\/li>/g)

      var data = []
      for (i in li) {
        var a = li[i]
        data.push({
          img: {
            src: urlt + a.match(/data-src=\"(\S*?)\"/)[1]
          },
          pm: {
            text: a.match(/<dt>(\S*?)<\/dt>/)[1]
          },
          gx: {
            text: a.match(/tag_hd\">(\S*?)<\/em>/)[1]
          },
          pf: {
            text: a.match(/tag_score\">(\S*?)<\/em>/)[1]
          },
          id: a.match(/data-id=\"(\S*?)\"/)[1],
          url: urlt + a.match(/href=\"(\S*?)\"/)[1]

        })
      }
      $("Video").data = data
    }
  })
}