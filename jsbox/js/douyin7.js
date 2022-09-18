/*
2022年9月18日、域名被墙请使用科学上网
左右滑动记数有问题，需要复制视频链接和下载的朋友先往右边滑一个视频在滑动回来再操作下载和复制。这属于jsbox组件问题。

by：iPhone 8、小良
https://iphone8.vip/
*/
var turl
var video_url
var key
const gzgzh = {
  title: "关注公众号",
  handler: function () {
    $ui.alert({
      title: "温馨提示",
      message: "跳转微信会自动复制公众号ID\n请跳转到微信-搜索-公用号-粘贴-关注",
      actions: [
        {
          title: "跳转微信",
          handler: function () {
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

const base64 = "aHR0cHM6Ly9pcGhvbmU4LnZpcC9jb25maWcvZG91eWluLmpzb24=";
$ui.loading(true);
$http.get({
  url: $text.base64Decode(base64),
  handler: function (resp) {
    $ui.loading(false);
    if (resp.response.statusCode == "200") {
      var info = resp.data;
      if (info.bb != "2.7.1") {
        $ui.alert({
          title: "温馨提示",
          message: info.gxsm,
          actions: [
            {
              title: "访问官网",
              handler: function () {
                $app.openURL(info.gw);
              }
            },
            gzgzh
          ]
        });
      } else {
        turl = $text.base64Decode(info.turl)
        key = $text.base64Decode(info.key)
        getdata()

      }
    } else {
      $ui.alert("加载失败");
    }
  }
});

const conView = {
  type: "view",
  props: {
    id: "conView"
  },
  views: [
    {
      type: "matrix",
      props: {
        id: "mune",
        bgcolor: $color("black"),
        itemHeight: 80,
        data: [
          {
            m_tb: { icon: $icon("067", $color("#DDE2EA")) }
          },
          {
            m_tb: { icon: $icon("023", $color("#DDE2EA")) }
          },
          {
            m_tb: { icon: $icon("057", $color("#DDE2EA")) }
          },
          {
            m_tb: { icon: $icon("109", $color("#DDE2EA")) }
          }
        ],
        columns: 4,
        spacing: 0,
        waterfall: false,
        template: [
          {
            type: "image",
            props: {
              id: "m_tb",
              bgcolor: $color("black")
            },
            layout: function (make, view) {
              make.top.inset(15);
              make.width.height.equalTo(25);
              make.centerX.equalTo(view.conter);
            }
          }
        ]
      },
      layout: function (make) {
        make.bottom.left.right.top.inset(0);
      }, events: {
        didSelect: function (sender, indexPath, data) {
          if (indexPath.row == 0) {
            getdata()
          } else if (indexPath.row == 1) {
            $ui.alert("搜索功能暂未开发···");
          } else if (indexPath.row == 2) {
            $ui.alert("收藏功能暂未开发···");
          } else if (indexPath.row == 3) {
            $ui.alert({
              title: "温馨提示",
              message: "更多好玩脚本请关注公众号\n【小良科技】",
              actions: [gzgzh]
            });
          }
        }
      }
    }
  ],
  layout: function (make) {
    make.bottom.left.right.inset(0);
    make.height.equalTo(90);
  }
};

var timg = "https://iphone8.vip/"
// var itemHeight = $device.info.screen.height;
$ui.render({
  props: {
    id: "mView",
    navBarHidden: 1,
    statusBarStyle:0,
    homeIndicatorHidden: 1,
    bgcolor: $color("black")
  },
  views: [
    {
      type: "view",
      props: {
        id: "fenye",
      },
      views: [
        {
          type: "label",
          props: {
              id: "jzz",
              font: $font("bold", 40),
              textColor: $color("#fff"),
              align: $align.center,
              text: "加载中···"
          },
          layout: function (make, view) {
              make.centerX.centerY.equalTo(view.center)
          }
      },
        {
          type: "gallery",
          props: {
          },
          layout: function (make, view) {
            make.left.right.inset(-1)
            make.top.inset(0)
            make.bottom.inset(50)
          }
        }
      ],
      layout: $layout.fill,
    },
    {
      type: "button",
      props: {
        id: "x_img",
        src: timg + "jsbox/img/x.png"
      },
      events: {
        tapped: function (sender) {
          $app.close();
        }
      },
      layout: function (make, view) {
        make.right.inset(5);
        make.bottom.inset(100)
        make.width.height.equalTo(50);
      }
    },
    {
      type: "button",
      props: {
        id: "xia_img",
        src: timg + "jsbox/img/xia.png"
      },
      events: {
        tapped: function (sender) {
          // $ui.alert("该视频不支持下载，请复制视频地址到指尖浏览器上下载！");
          download(video_url)
        }
      },
      layout: function (make, view) {
        make.right.inset(2);
        make.bottom.equalTo($("x_img").top).inset(15);
        make.width.height.equalTo(58);
      }
    },
    {
      type: "button",
      props: {
        id: "fuzhi_img",
        src: timg + "jsbox/img/fuzhi.png"
      },
      events: {
        tapped: function (sender) {
          $clipboard.text = video_url;
          $ui.toast("已复制");
        }
      },
      layout: function (make, view) {
        make.right.inset(5);
        make.bottom.equalTo($("xia_img").top).inset(15);
        make.width.height.equalTo(50);
      }
    },
    {
      type: "button",
      props: {
        id: "logo",
        src: "https://iphone8.vip/img/xl.png"
      },
      events: {
        tapped: function (sender) {
          $app.openURL("https://iphone8.vip/");
        }
      },
      layout: function (make, view) {
        make.right.inset(5);
        make.bottom.equalTo($("fuzhi_img").top).inset(15);
        make.width.height.equalTo(50);
      }
    },
    
    conView
  ]
});


function getdata() {
  $http.get({
    url: turl,
    handler: function (resp) {
      var data = resp.data;
      var video_s = []
      for (i in data) {
        video_s.push({
          type: "video",
          props: {
            id: "video" + i, src: key+data[i].sourceId+"&redirectTo=GIF_VIDEO_SD", poster: key+data[i].sourceId+"&redirectTo=GIF_VIDEO_SD"
          }
        })
      }
      video_url = data[0].videoUrl
      var st = {
        type: "gallery",
        props: {
          id: "div",
          items: video_s,
          interval: 0,
          radius: 5.0
        },
        layout: function (make, view) {
          make.left.right.inset(-1)
          make.top.inset(0)
          make.bottom.inset(50)
        },
        events: {
          changed: function (sender) {
            video_url = sender.viewWithIndex(sender.page).src;
            if (sender.page == 4) {
              getdata()
            }
            $("video0").pause()
            $("video1").pause()
            $("video2").pause()
            $("video3").pause()
            $("video4").pause()
          }
        }
      }
      $("fenye").add(st)

    }
  });

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