/* 音乐下载 1.5
 *  2022年11月11日 修复更新
 *  新增自动更新功能
 *  视频教程: http://t.cn/EGtlxQ5

 *  by：iPhone 8、小良
 *  https://iphone8.vip/
 *  公众号：小良科技
*/

$cache.set("pg", 1);
const js_name = "音乐下载"
var turl = $text.base64Decode("aHR0cHM6Ly9hZTg1LmNuL2NvbmZpZy8=") + "yinyue.json"
async function get_updata() {
  const resp = await $http.get(turl);
  if(resp.response.statusCode === 200){
      if (resp.data.bb != "1.5") {
          $ui.alert({
              title: "发现新版本 - " + resp.data.bb,
              message: resp.data.gxsm,
              actions: [
                  {
                      title: "立即更新",
                      handler: function () {
                          down(resp.data.updata)
                      }
                  }, {
                      title: "取消"
                  }
              ]

          });
          
      }
  }
}
get_updata()
csh()
function down(url) {
  $ui.toast("正在安装中 ...");
  $http.download({
      url: url,
      handler: function (resp) {
          $addin.save({
              name: js_name,
              data: resp.data,
              handler: function () {
                  $ui.alert({
                      title: "安装完成",
                      message: "\n是否打开？\n" + js_name,
                      actions: [
                          {
                              title: "打开",
                              handler: function () {
                                  $app.openExtension(js_name)
                              }
                          },
                          {
                              title: "不了"
                          }]
                  });
              }
          })
      }
  })
}

function csh() {
  $ui.render({
    props: {
      title: js_name,
      id: "zjm"
    },
    views: [
      {
        type: "button",
        props: {
          title: "搜索",
          id: "bt1"
        },
        layout: function (make) {
          make.top.inset(20);
          make.right.inset(10);
          make.width.equalTo(80);
          make.height.equalTo(35);
        },
        events: {
          tapped: function (sender) {
            $("bjk").blur();
            $cache.set("key", $("bjk").text);
            getlist();
          }
        }
      },
      {
        type: "input",
        props: {
          id: "bjk",
          placeholder: "输入歌手、歌名、专辑…"
        },
        layout: function (make) {
          make.top.inset(20);
          make.left.inset(10);
          make.right.equalTo($("bt1").left).inset(10);
          make.height.equalTo(35);
        },
        events: {
          returned: function (sender) {
            $("bjk").blur();
            $cache.set("key", $("bjk").text);
            getlist();
          }
        }
      },
      {
        type: "list",
        props: {
          rowHeight: 39,
          hidden: true,
          template: [
            {
              type: "label",
              props: {
                id: "mc"
              },
              layout: function (make, view) {
                make.left.inset(10);
                make.centerY.equalTo(view.center);
                make.width.equalTo(240);
              }
            },
            {
              type: "label",
              props: {
                id: "gs"
              },
              layout: function (make, view) {
                make.left.equalTo($("mc").right).inset(10);
                make.centerY.equalTo(view.center);
                make.width.equalTo(95);
              }
            },
            {
              type: "label",
              props: {
                text: "⋮"
              },
              layout: function (make, view) {
                make.right.inset(10);
                make.centerY.equalTo(view.center);
                make.width.equalTo(10);
              }
            }
          ]
        },
        layout: function (make) {
          make.top.equalTo($("bjk").bottom).inset(25);
          make.right.left.bottom.inset(0);
        },
        events: {
          didSelect: function (sender, indexPath, data) {
            geturl(data);
          },
          didReachBottom: function (sender) {
            sender.endFetchingMore();
            var page = $cache.get("pg") + 1;
            $cache.set("pg", page);
            getlist();
          }
        }
      }
    ]
  });
}

function getlist() {
  var page = $cache.get("pg");
  var key = $cache.get("key");
  $ui.loading(true);
  $http.post({
    url: $text.base64Decode("aHR0cDovL211c2ljLml0em8uY24v"),
    header: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",
    },
    body: {
      input: key,
      filter: "name",
      type: "netease",
      page: page
    },
    handler: function (resp) {
      $ui.loading(false);
      var json = resp.data;
      if (json.code === 200) {
        if (json.data.length == 0) {
          alert("未找到歌曲")
          return;
        }
        if (page == 1) {
          var data = []
        } else {
          var data = $('list').data
        }
        for (i in json.data) {
          const j = json.data[i];
          data.push({
            mc: { text: j.title },
            gs: { text: j.author },
            img: j.pic,
            url: j.url
          })
        }
        $('list').data = data
        $('list').hidden = false
      }

    }
  });
}


function getlist1() {
  var page = $cache.get("pg");
  var key = $cache.get("key");
  var source = rce[$cache.get("srce")];
  var urlt = $text.base64Decode($cache.get("info").turl);
  if (!key) {
    alert("请先输入你要搜索的内容");
    return;
  }
  $ui.loading(true);

  $http.get({
    url: urlt + "/api.php?types=search&count=20&source=" + source + "&pages=" + page + "&name=" +
      $text.URLEncode(key),
    handler: resp => {
      $ui.loading(false)
      var json = resp.data;
      if (json.length == 0) {
        alert("未找到歌曲")
        return;
      }
      if (page == 1) {
        var data = []
      } else {
        var data = $('list').data
      }

      for (i in json) {
        var j = json[i]
        data.push({
          mc: { text: j.name },
          gs: { text: j.artist[0] },
          img: { src: j.pic },
          id: j.id
        })
      }
      $('list').data = data
      $('list').hidden = false

    }
  });
}
var sftc = 0;
function geturl(data) {
  if (sftc) {
    $audio.stop();
    $("ewmView").remove();
  }
  sftc = 1;
  $("zjm").add({
    type: "view",
    bgcolor: $color("#ddd"),
    props: {
      id: "ewmView",
      radius: 7,
      bgcolor: $color("white"),
      borderWidth: 1,
      borderColor: $color("tint")
    },
    views: [{
      type: "button",
      props: {
        icon: $icon("225", $color("#f00"), $size(30, 30)),
        bgcolor: $color("clear")
      },
      layout: function (make) {
        make.right.top.inset(10);
      },
      events: {
        tapped(sender) {
          $audio.stop();
          $("ewmView").remove();
          sftc = 0;
        }
      }
    },{
      type: "image",
      props: {
        id: "img",
        src:data.img,
        radius:5
      },
      layout: function(make, view) {
        make.top.inset(25)
        make.left.inset(25)
        make.width.height.equalTo(100)
      }
    },
      {
        type: "label",
        props: {
          id: "t_gname",
          font: $font("bold", 21),
          text: data.mc.text
        },
        layout: function (make, view) {
          make.top.inset(35);
          make.right.inset(20);
          make.left.equalTo($("img").right).inset(10);
        }
      },
      {
        type: "label",
        props: {
          id: "t_gsm",
          text: data.gs.text
        },
        layout: function (make, view) {
          make.top.equalTo($("t_gname").bottom).inset(10);
          make.right.inset(20);
          make.left.equalTo($("img").right).inset(10);
        }
      },
      {
        type: "button",
        props: {
          title: "试听",
          id: "sBtn",
          bgcolor: $color("#409eff")
        },
        layout: function (make, view) {
          make.top.equalTo($("img").bottom).inset(40);
          make.left.inset(50);
          make.width.equalTo(80);
        },
        events: {
          tapped: function (sender) {
            if (sender.title == "试听") {
              $("sBtn").title = "停止";
              $audio.play({
                url: data.url
              });
            } else {
              $("sBtn").title = "试听";
              $audio.stop();
            }
          }
        }
      },
      {
        type: "button",
        props: {
          title: "下载",
          bgcolor: $color("#090")
        },
        layout: function (make, view) {
          make.top.equalTo($("img").bottom).inset(40);
          make.right.inset(50);
          make.width.equalTo(80);
        },
        events: {
          tapped(sender) {
            download(data.url, data.mc.text);
          },
          longPressed: function () {
            $clipboard.text = data.url;
            alert("复制成功\n\n" + data.url);
          }
        }
      },
    ],
    layout: function (make, view) {
      make.top.inset(150);
      make.left.right.inset(20);
      make.height.equalTo(220);
    }
  });
}

function download(url, gm) {
  $ui.toast("正在下载中 ...");
  $ui.loading(true);
  $http.download({
    url: url,
    handler: function (resp) {
      $ui.loading(false);
      if (resp.response.statusCode == "200") {
        $share.sheet([gm + ".mp3", resp.data]);
      } else {
        $ui.alert("下载失败");
      }
    }
  });
}


function clipboard(){
  var text = $clipboard.text;
  $("bjk").text = text;
  $cache.set("key", text);
  getlist();

}

clipboard()

