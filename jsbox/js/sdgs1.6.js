/*
狩都高速 1.6
2020.6.3 修复更新
 by：iPhone 8、小良
 http://ae85.cn/
*/


var timer;
var count;
var me = [
  { name: "推荐资源", id: "/recom/1.html?recom=1" },
  { name: "人气热门", id: "/hot/1.html?hot=1" }
];
$ui.render({
  props: {
    title: "狩都高速 1.6"
  },
  views: [
    {
      type: "menu",
      props: {
        id: "menu",
        items: me.map(function(item) {
          return item.name;
        })
      },
      layout: function(make) {
        make.left.top.right.equalTo(0);
        make.height.equalTo(50);
      },
      events: {
        changed: function(sender) {
          $cache.set("type", me[sender.index].id);
          $cache.set("page", 1);
          getdata();
        }
      }
    },
    {
      type: "matrix",
      props: {
        id: "Video",
        itemHeight: 280,
        columns: 2,
        spacing: 5,
        template: [
          {
            type: "image",
            props: {
              id: "img",
              radius: 3
            },
            layout: function(make, view) {
              make.centerX.equalTo(view.super);
              make.top.bottom.right.left.inset(3);
            }
          }
        ]
      },
      layout: function(make) {
        make.top.equalTo($("menu").bottom);
        make.bottom.left.right.inset(0);
      },
      events: {
        didSelect: function(sender, indexPath, data) {
          //          geturl(data.url);
          $("web").url =
            turl + "/portal/index/detail/identification/" + data.url + ".html";
          //          play();
        },
        didReachBottom: function(sender) {
          sender.endFetchingMore();
          var page = $cache.get("page") + 1;
          $cache.set("page", page);
          getdata();
        }
      }
    },
    {
      type: "web",
      props: {
        id: "web"
      },
      layout: function(make, view) {
        make.top.equalTo(0);
        make.right.left.inset(0);
        make.height.equalTo(1);
      },
      events: {
        didFinish: function(sender, navigation) {
          console.info("加载中");
          zhur();
        }
      }
    }
  ]
});

function csh() {
  $ui.loading(true);
  $http.get({
    url: $text.base64Decode(
      "aHR0cHM6Ly9naXRlZS5jb20veWFvMDcvdXBkYXRlX2RldmljZS9yYXcvbWFzdGVyL3NkZ3MuanNvbg=="
    ),
    handler: function(resp) {
      $ui.loading(false);
      if (resp.response.statusCode == "200") {
        var info = resp.data;
        console.log(info.gg);
        $cache.set("info", info);
        if (info.bb != "1.6") {
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
          $cache.set("page", 1);
          $cache.set("type", me[0].id);
          turl = $text.base64Decode(info.turl);
          getdata();
        }
      } else {
        $ui.alert("加载失败");
      }
    }
  });
}
csh();

function getdata() {
  var page = $cache.get("page");
  var type = $cache.get("type");

  $ui.loading(true);
  $http.get({
    url: turl + "/index.php/portal/index/search/freeplay/1.html",
    handler: function(resp) {
      $ui.loading(false);
      var arr = resp.data;
      var html = arr.replace(/\n|\s|\r/g, "");
      var te = html.match(/<ulid=\"works\"[\s\S]*?<\/ul>/)[0];

      var li = te.match(/<li><ahref=\S*?<\/a>/g);
      if (page == 1) {
        var data = [];
      } else {
        var data = $("Video").data;
      }
      for (i in li) {
        var dli = li[i];
        var img = turl + dli.match(/\/upload\/admin.*?\.jpg/);
        if (dli.search("detail/id") != -1) {
          data.push({
            img: {
              src: img
            },
            url: dli.match(/detail\/identification\/(\S*?).htm/)[1]
          });
        } //过滤会员片
      }
      //      console.info(data)
      $("Video").data = data;
      $("Video").endRefreshing();
    }
  });
}

function zhur() {
  var webView = $("web");
  webView.eval({
    script: `var URL = document.getElementById("do_play_2"); URL.click();`,
    handler: function(result, error) {
      timer = $timer.schedule({
        interval: 1,
        handler: function() {
          zhur2();
        }
      });
    }
  });
}

function zhur2() {
  var webView = $("web");
  webView.eval({
    script: `var URL = document.getElementsByClassName("dplayer-video dplayer-video-current")[0].src; window.name = URL`,
    handler: function(result, error) {
      if (result.code == 4) {
        if (count == 4) {
          $("spinner").loading = false;
          $ui.alert("过去播放地址失败，请重试！");
          timer.invalidate();
        }
        count++;
      } else {
        play(result);

        timer.invalidate();
      }
    }
  });
}

function play(url) {
  $ui.push({
    props: {
      title: "狩都高速 1.6"
    },
    views: [
      {
        type: "web",
        props: {
          url: url
        },
        layout: $layout.fill
      }
    ]
  });
}
