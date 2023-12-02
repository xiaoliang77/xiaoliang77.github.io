/*
2023年12月2日更新

修复无法使用
更换切换视频方式

脚本仅供代码学习，请勿分享。非法传播造成法律问题与作者无关。

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
var js_name
$ui.loading(true);
$http.get({
  url: $text.base64Decode(base64),
  handler: function (resp) {
    $ui.loading(false);
    if (resp.response.statusCode == "200") {
      var info = resp.data;
      js_name = info.js_name
      if (info.bb != "2.8") {
        $ui.alert({
          title: "温馨提示",
          message: info.gxsm,
          actions: [
            {
              title: "立即更新",
              handler: function () {
                download(info.updata)
              }
            },
            gzgzh
          ]
        });
      } else {
        turl = $text.base64Decode(info.turl)
        get_Video_data()
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
            $device.taptic(2)
            get_Video_data()
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
$ui.render({
  props: {
    id: "mView",
    navBarHidden: 1,
    statusBarStyle: 0,
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
        src: timg + "jsbox/img/drlogo.png",
        radius: 25
      },
      events: {
        tapped: function (sender) {
          $ui.alert("暂无用户信息");
        }
      },
      layout: function (make, view) {
        make.right.inset(5);
        make.bottom.equalTo($("x_img").top).inset(15);
        make.width.height.equalTo(50);
      }
    },
    {
      type: "button",
      props: {
        id: "fuzhi_img",
        src: timg + "jsbox/img/hongbao.png"
      },
      events: {
        tapped: function (sender) {
          $app.openURL("alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=https%3A%2F%2Frender.alipay.com%2Fp%2Fc%2Falipay-red-qrcode%2Fshared.html%3Fchannel%3Dsearch_pwd%26shareId%3D2088202699097532%26token%3D19614922yglxkd7xgrvnf1fjlb%26campStr%3DkPPFvOxaCL3f85TiKss2wsBZgIjulHjG%26sign%3DqsiVOoa7TuphryWxyBdONXsMTnE3jiIBvWeUs3yV1sw%3D%26chInfo%3DDingtalk%26c_stype%3Dsearch_pwd%26code%3D798679953")
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

function get_Video_data() {
  $http.get({
    url: turl,
    handler: function (resp) {
      var data = resp.data.data;
      var video_s = []
      for (i in data) {
        video_s.push({
          type: "video",
          props: {
            id: "vid" + i,
            src: data[i].videoUrl
          },
          layout: $layout.fill,
        }
        )
      }
      const st = {
        type: "list",
        props: {
          id: "listv",
          data: video_s,
        },
        layout: function (make, view) {
          make.top.equalTo(0)
          make.right.left.inset(0)
          make.bottom.inset(90)
        },
        events: {
          rowHeight: function (sender, indexPath) {
            return sender.bounds.height
          },
          willEndDragging: function (sender, velocity, target) {
            const liHeight = sender.bounds.height
            let num = target.y / liHeight;
            let integerPart = Math.floor(num);
            let zx = integerPart * liHeight
            let zd = zx + liHeight
            let y = target.y
            if (y < zd / 2) {
              return $point(0, zx)
            } else {
              return $point(0, zd)
            }
          },
          willBeginDragging: function (sender) {
            sender.data.map(item => {
              $(item.props.id).pause()
            })
          },
          didReachBottom: function (sender) {
            get_Video_data()
          }
        }
      }
      $("fenye").add(st)
    }
  });
}

function download(url) {
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