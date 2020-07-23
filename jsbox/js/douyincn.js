/*
2020年7月23日
支持pin软件
国内版不支持下载

by：iPhone 8、小良
http://ae85.cn/
*/


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

const base64 =
  "aHR0cHM6Ly8naXRlZS5jb20veWFvMDcvdXBkYXRlX2RldmljZS8yYXcvbWFzdGVyL2RvdXlpbi5qc28u";
$ui.loading(true);
$http.get({
  url: $text.base64Decode(base64.replace(/8/g, "9")),
  handler: function (resp) {
    $ui.loading(false);
    if (resp.response.statusCode == "200") {
      var info = resp.data.guonei;
      if (info.bb != "1.1") {
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
        $cache.set("info", info);
        getdata();
      }
    } else {
      $ui.alert("加载失败");
    }
  }
});

var timg = "https://gitee.com/yao07/update_device/raw/master/sucai/";
var src = "https://giant.gfycat.com/ComfortableJitteryLacewing.mp4"

$ui.render({
  props: {
    id: "mView",
    navBarHidden: 1,
    homeIndicatorHidden: 1,
    // bgcolor: $color("black")
    
  },
  views: [{
    type: "scroll",
    layout: $layout.fill,
    props: {
      id:"gundong",
      alwaysBounceHorizontal:false,
      // scrollEnabled:true
    },
    views: [
      {
        type: "view",
        layout: function(make, view) {
          make.top.left.inset(0)
          make.width.equalTo(view.super)
          make.height.equalTo($device.info.screen.height-45)
        },
        views:[
          {
            type: "web",
            props: {
              id: "player",
              showsProgress: false,
              inlineMedia: true,
              style: `body{background:#000000}#player{position:adsolute;width:100%;height:100%;margin-top:-8}`,
              html: `<video id="player" autoplay oncanplay="canPlay()" src="${src}"></video>`,
              script: function () {
                var video = document.getElementById("player");
                var duration;
                function play() {
                  if (video.paused) {
                    video.play();
                  } else video.pause();
                }
                function getProgress(loop = true) {
                  var currentTime = video.currentTime;
                  $notify("setProgress", {
                    now: currentTime,
                    total: duration
                  });
                  if (loop) {
                    setTimeout(function () {
                      getProgress();
                    }, 1000);
                  }
                }
                function changeProgress(obj) {
                  video.currentTime = obj.value * duration;
                }
                function canPlay() {
                  duration = video.duration;
                  if (getCookie("firstPlay") == "") {
                    document.cookie = "firstPlay=false";
                    getProgress();
                  }
                }
                function getCookie(cname) {
                  var name = cname + "=";
                  var ca = document.cookie.split(";");
                  for (var i = 0; i < ca.length; i++) {
                    var c = ca[i].trim();
                    if (c.indexOf(name) == 0)
                      return c.substring(name.length, c.length);
                  }
                  return "";
                }
              }
            },
            layout: (make, view) => {
              make.edges.inset(-8);
            },
            events: {
              setProgress: function (time) {
                var progress = time.now / time.total;
                $("progress").value = progress;
                $("currentTime").text = s_to_hs(time.now)
                $("duration").text = s_to_hs(time.total)
                //   console.log((progress * 100).toFixed(1) + "%");
              }
            }
          },
          {
            type: "view",
            layout: $layout.fill,
            events: {
              tapped: function () {
                $("player").notify({
                  event: "play"
                });
              },
            },
            views: [
              {
                type: "blur",
                props: {
                  id: "bottomView",
                  style: 3
                },
                layout: function (make, view) {
                  make.bottom.right.left.inset(0);
                  make.height.equalTo(60);
                },
                views: [
                  {
                    type: "slider",
                    props: {
                      id: "progress"
                    },
                    layout: (make, view) => {
                      make.top.inset(0);
                      make.left.right.inset(40);
                    },
                    events: {
                      changed: function (sender) {
                        $("player").notify({
                          event: "changeProgress",
                          message: {
                            value: sender.value
                          }
                        });
                      }
                    }
                  },
                  {
                    type: "label",
                    props: {
                      id: "currentTime",
                      textColor: $color("white"),
                      font: $font(13)
                    },
                    layout: function (make, view) {
                      make.left.inset(0);
                      make.top.inset(8);
                    }
                  },
                  {
                    type: "label",
                    props: {
                      id: "duration",
                      textColor: $color("white"),
                      font: $font(13)
                    },
                    layout: function (make, view) {
                      make.right.inset(0);
                      make.top.inset(8);
                    }
                  }
                ]
              }
            ]
          },
        ]
      }
    ],
    events:{
      pulled: function(sender) {
        getdata()
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
        tapped: function (sender) {
          $app.close();
        }
      },
      layout: function (make, view) {
        make.right.inset(5);
        make.bottom.inset(100);
        make.width.height.equalTo(50);
      }
    },
  ],
});

function getdata() {
  var info = $cache.get("info");
  var random = Math.floor(Math.random() * (1680 - 2 + 1)) + 2;
  $http.get({
    url: $text.base64Decode(info.turl) + random + ".json",
    header: {
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1"
    },
    handler: resp => {
      $("gundong").endRefreshing()
      var data = resp.data.url;
      $("player").html = `<video id="player" autoplay oncanplay="canPlay()" src="${data}"></video>`
      
      $delay(0.3, function() {
        $("player").notify({
          event: "play"
        });
      })

    }
  });
}

function s_to_hs(s) {
  var h;
  h = Math.floor(s / 60);
  s = s % 60;
  h += "";
  s += "";
  s = Number(s).toFixed(0);
  h = h.length == 1 ? "0" + h : h;
  s = s.length == 1 ? "0" + s : s;
  return h + ":" + s;
}