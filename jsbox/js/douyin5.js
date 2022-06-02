/*
2020年6月3日、修复更新
更新支持pin软件
新增下载功能

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
var itemHeight = $device.info.screen.height - 45;
const base64 =
  "aHR0cHM6Ly8jb2RlLmFsaXl1bi5jb20vODQwODgyODkvZ3hxL3Jhdy8tYXN0ZXIvZG81eWluLmpzb24=";
$ui.loading(true);
$http.get({
  url: $text.base64Decode(base64.replace(/8/g, "9")),
  handler: function(resp) {
    $ui.loading(false);
    if (resp.response.statusCode == "200") {
      var info = resp.data;
      if (info.bb != "2.5") {
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
          Pgetdata();
        } else {
          getdata();
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
        itemHeight: itemHeight,
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
          cldata();
        },
        pulled: function(sender) {
          sender.endRefreshing();
          xldata();
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
        id: "xia_img",
        src: timg + "xia.png"
      },
      events: {
        tapped: function(sender) {
          download($("video").src);
        }
      },
      layout: function(make, view) {
        make.right.inset(2);
        make.bottom.equalTo($("x_img").top).inset(15);
        make.width.height.equalTo(58);
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
        make.bottom.equalTo($("xia_img").top).inset(15);
        make.width.height.equalTo(50);
      }
    }
  ]
});

function getdata() {
  $http.get({
    url: $text.base64Decode($cache.get("info").turl),
    handler: resp => {
      var data = resp.data;
      $cache.set("vdata", data);
      $cache.set("dqshu", 1);
      cldata();
    }
  });
}

function cldata() {
  var dqshu = $cache.get("dqshu");
  var vdata = $cache.get("vdata");
  if (vdata.length == 0) {
    $ui.toast("数据正在加载中...");
  } else if (vdata.length != dqshu) {
    var arr = vdata[dqshu - 1];
    $("Video").data = [{ video: { src: arr.mp4Url, poster: arr.posterUrl } }];
    $cache.set("dqshu", dqshu + 1);
    $delay(1, function() {
      $("video").toggle();
    });
  } else {
    getdata();
  }
}

function xldata() {
  var dqshu = $cache.get("dqshu");
  var vdata = $cache.get("vdata");
  if (vdata.length == 0) {
    $ui.toast("数据正在加载中...");
  } else if (dqshu > 1) {
    var arr = vdata[dqshu];
    $("Video").data = [{ video: { src: arr.mp4Url, poster: arr.posterUrl } }];
    $cache.set("dqshu", dqshu - 1);
    $delay(1, function() {
      $("video").toggle();
    });
  } else {
    var arr = vdata[0];
    $("Video").data = [{ video: { src: arr.mp4Url, poster: arr.posterUrl } }];
  }
}

function download(url) {
  $ui.toast("正在下载中 ...");
  $ui.loading(true);
  $http.download({
    url: url,
    handler: function(resp) {
      $ui.loading(false);
      if (resp.response.statusCode == "200") {
        $share.sheet(["download.mp4", resp.data]);
      } else {
        $ui.alert("下载失败");
      }
    }
  });
}

function pin() {
  $ui.push({
    props: {
      title: "抖yin 2.5"
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
          },
          didReachBottom: function(sender) {
            sender.endFetchingMore();
            Pgetdata();
          }
        }
      }
    ]
  });
}

function Pgetdata() {
  $http.get({
    url: $text.base64Decode($cache.get("info").turl),
    handler: resp => {
      var arr = resp.data;
      var data = $("PVideo").data;
      for (i in arr) {
        var li = arr[i];
        data.push({
          img: { src: li.posterUrl },
          url: li.mp4Url
        });
      }
      $("PVideo").data = data;
      $("PVideo").endRefreshing();
    }
  });
}

function play(url) {
  $ui.push({
    props: {
      title: "抖yin 2.5"
    },
    views: [
      {
        type: "web",
        props: {
          url: url
        },
        layout: $layout.fill
      },
      {
        type: "button",
        props: {
          id: "xia_img",
          src: timg + "xia.png"
        },
        events: {
          tapped: function(sender) {
            download(url);
          }
        },
        layout: function(make, view) {
          make.right.inset(2);
          make.bottom.inset(65);
          make.width.height.equalTo(58);
        }
      }
    ]
  });
}