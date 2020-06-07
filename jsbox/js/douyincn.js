/*
2020年6月7日
支持pin软件
国内版不支持下载

by：iPhone 8、小良
http://ae85.cn/
*/


const gzgzh = {
  title: "关注公众号",
  handler: function() {
    $ui.alert({
      title: "温馨提示",
      message: "跳转微信会自动复制公众号ID\n请跳转到微信-搜索-公用号-粘贴-关注",
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
};

const base64 =
  "aHR0cHM6Ly8naXRlZS5jb20veWFvMDcvdXBkYXRlX2RldmljZS8yYXcvbWFzdGVyL2RvdXlpbi5qc28u";
$ui.loading(true);
$http.get({
  url: $text.base64Decode(base64.replace(/8/g, "9")),
  handler: function(resp) {
    $ui.loading(false);
    if (resp.response.statusCode == "200") {
      var info = resp.data.guonei;
      if (info.bb != "1.0") {
        $ui.alert({
          title: "温馨提示",
          message: info.gxsm,
          actions: [
            {
              title: "访问官网",
              handler: function() {
                $app.openURL(info.gw);
              }
            },
            gzgzh
          ]
        });
      } else {
        $cache.set("info", info);
        if ($app.info.bundleID == "app.cyan.pin") {
          pin();
        }
      }
    } else {
      $ui.alert("加载失败");
    }
  }
});

var timg = "https://gitee.com/yao07/update_device/raw/master/sucai/";

$ui.render({
  props: {
    id: "mView",
    navBarHidden: 1,
    homeIndicatorHidden: 1,
    bgcolor: $color("black")
  },
  views: [
    {
      type: "matrix",
      props: {
        id: "Video",
        bgcolor: $color("black"),
        itemHeight: $device.info.screen.height - 45,
        columns: 1,
        spacing: 0,
        waterfall: false,
        template: [
          {
            type: "video",
            props: {
              id: "video"
            },
            layout: function(make, view) {
              make.left.right.top.bottom.inset(0);
            }
          }
        ]
      },
      layout: function(make) {
        make.left.right.top.inset(0);
        make.bottom.inset(0);
      },
      events: {
        didSelect: function(sender, indexPath, data) {
          $("video").toggle();
        },
        didReachBottom: function(sender) {
          sender.endFetchingMore();
          xldata();
        },
        pulled: function(sender) {
          sender.endRefreshing();
          cldata();
        }
      }
    },
    {
      type: "button",
      props: {
        id: "x_img",
        src: timg + "x.png"
      },
      events: {
        tapped: function(sender) {
          $app.close();
        }
      },
      layout: function(make, view) {
        make.right.inset(5);
        make.bottom.inset(100);
        make.width.height.equalTo(50);
      }
    },
    {
      type: "button",
      props: {
        id: "logo",
        src: "https://ae85.cn/img/xl.png"
      },
      events: {
        tapped: function(sender) {
          pin();
          Pgetdata();
        }
      },
      layout: function(make, view) {
        make.right.inset(5);
        make.bottom.equalTo($("x_img").top).inset(15);
        make.width.height.equalTo(50);
      }
    }
  ]
});

function getdata() {
  var info = $cache.get("info");
  $http.post({
    url: $text.base64Decode(info.turl),
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: {
      token: info.token
    },
    handler: resp => {
      var data = resp.data.data.list;
      $cache.set("vdata", data);
      $cache.set("dqshu", 1);
      if ($app.info.bundleID == "app.cyan.pin") {
        Pgetdata();
      } else {
        xldata();
      }
    }
  });
}

function cldata() {
  var dqshu = $cache.get("dqshu");
  var vdata = $cache.get("vdata");
  if (vdata.length == 0) {
    $ui.toast("数据正在加载中...");
  } else if (dqshu == 0) {
    var arr = vdata[0];
    $("Video").data = [{ video: { src: arr.link, poster: arr.image } }];
    $cache.set("dqshu", vdata.length - 1);
  } else {
    var arr = vdata[dqshu];
    $("Video").data = [{ video: { src: arr.link, poster: arr.image } }];
    $cache.set("dqshu", dqshu - 1);
  }
  $delay(1, function() {
    $("video").toggle();
  });
}

function xldata() {
  var dqshu = $cache.get("dqshu");
  var vdata = $cache.get("vdata");
  if (vdata.length == 0) {
    $ui.toast("数据正在加载中...");
  } else if (dqshu == vdata.length) {
    var arr = vdata[0];
    $("Video").data = [{ video: { src: arr.link, poster: arr.image } }];
    $cache.set("dqshu", 0);
  } else {
    var arr = vdata[dqshu];
    $("Video").data = [{ video: { src: arr.link, poster: arr.image } }];
    $cache.set("dqshu", dqshu + 1);
  }
  $delay(1, function() {
    $("video").toggle();
  });
}
getdata();

function Pgetdata() {
  var vdata = $cache.get("vdata");
  if (vdata.length == 0) {
    $ui.toast("数据正在加载中...");
  } else {
    var data = [];
    for (i in vdata) {
      data.push({
        img: { src: vdata[i].image },
        url: vdata[i].link
      });
    }
    $("PVideo").data = data;
    $("PVideo").endRefreshing();
  }
}

function pin() {
  $ui.push({
    props: {
      title: "抖yin国内版"
    },
    views: [
      {
        type: "matrix",
        props: {
          id: "PVideo",
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
          make.top.bottom.left.right.inset(0);
        },
        events: {
          didSelect: function(sender, indexPath, data) {
            play(data.url);
          }
        }
      }
    ]
  });
}

function play(url) {
  $ui.push({
    props: {
      title: "抖yin国内版"
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
