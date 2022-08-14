/*
2022年8月14日、修复更新
更新支持pin软件

by：iPhone 8、小良
https://iphone8.vip/
*/
var turl
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
      if (info.bb != "2.7") {
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
          type: "gallery",
          props: {
          },
          layout: function (make, view) {
            make.left.right.inset(-1)
            make.top.equalTo(0)
            make.bottom.inset(50)
          }
        }
      ],
      layout: $layout.fill,
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
            id: "video" + i, src: data[i].videoUrl, poster: data[i].imageUrl
          }
        })
      }
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
          make.top.equalTo(0)
          make.bottom.inset(50)
        },
        events: {
          changed: function (sender) {
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
