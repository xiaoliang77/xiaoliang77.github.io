/*
短视频下载器 2.6
2020年6月5日 更新
修复：抖音，tiktok，快手等。
暂时取消脚本密码验证。


支持：微信公众号视频、小红书去水印、抖音去水印、皮皮虾去水印、快手短视频无水印、Tiktok视频去水印、头条西瓜视频去水印、等平台的视频下载。



by：iPhone 8、小良
更多js脚本： https://ae85.cn/
*/

const base64 =
  "aHR0cHM6Ly9naXRlZS5jb20veLZvMDcvdXBkYXRlX2RldmljZS9yYXcvbLZzdGVyL2R1YW5zaGlwaW5nLmpzb24=";
$ui.loading(true);
$http.get({
  url: $text.base64Decode(base64.replace(/LZ/g, "WF")),
  handler: function(resp) {
    $ui.loading(false);
    if (resp.response.statusCode == "200") {
      var info = resp.data;
      $cache.set("info", info);
      if (info.bb != "2.6") {
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
        // yanz()
        zjm();
        tcgg();
        getclipboard();
      }
    } else {
      $ui.alert("加载失败");
    }
  }
});

function tcgg() {
  var gg = $cache.get("info").gg;
  if ($file.exists("gg.txt")) {
    var file = $file.read("gg.txt").string;
    if (file != gg) {
      xrwj(gg);
    }
  } else {
    xrwj(gg);
  }
}
function xrwj(nr) {
  $ui.alert(nr);
  $file.write({
    data: $data({ string: nr }),
    path: "gg.txt"
  });
}
function getclipboard() {
  var url = $clipboard.link;
  if (url) {
    $ui.alert({
      title: "要提取剪贴板中的链接",
      message: $clipboard.text,
      actions: [
        {
          title: "取消",
          handler: function() {}
        },
        {
          title: "提取",
          handler: function() {
            $("bjk").text = url;
            tmenu(url);
          }
        }
      ]
    });
  }
}

const by = {
  type: "label",
  props: {
    align: 1,
    font: $font(14),
    text: "iPhone 8、小良 (https://ae85.cn)",
    textColor: $color("#bbb")
  },
  layout: function(make, view) {
    make.bottom.inset(2);
    make.left.right.inset(0);
    make.height.equalTo(30);
  }
};

var timer;
var count;
function zjm() {
  $ui.render({
    props: {
      title: "短视频下载 2.6",
      bgcolor: $color("#e6e6e6"),
      navButtons: [
        {
          title: "Title",
          icon: "008",
          handler: function() {
            sysm();
          }
        }
      ]
    },
    views: [
      {
        type: "label",
        props: {
          id: "tis1",
          text: "请将视频链接粘贴到下方：",
          font: $font(14)
        },
        layout: function(make, view) {
          make.left.inset(15);
          make.top.inset(30);
        }
      },
      {
        type: "text",
        props: {
          id: "bjk",
          lines: 0,
          radius: 5,
          placeholder: "输入视频地址… \n或长按【解析】按钮"
        },
        layout: function(make) {
          make.top.equalTo($("tis1").bottom).inset(5);
          make.right.left.inset(15);
          make.height.equalTo(160);
        },
        events: {
          returned: function(sender) {
            $("bjk").blur();
            tmenu($("bjk").text);
          }
        }
      },
      {
        type: "button",
        props: {
          title: "解  析",
          id: "bt1"
        },
        layout: function(make) {
          make.top.equalTo($("bjk").bottom).inset(15);
          make.right.left.inset(15);
          make.height.equalTo(45);
        },
        events: {
          tapped: function(sender) {
            tmenu($("bjk").text);
          },
          longPressed: function(info) {
            $("bjk").text = $clipboard.link;
            tmenu($clipboard.link);
          }
        }
      },
      {
        type: "label",
        props: {
          id: "tis2",
          text:
            "目前支持：微信公众号视频、小红书去水印、抖音去水印、皮皮虾去水印、快手短视频无水印、Tiktok视频去水印、头条西瓜视频去水印、等平台的视频下载。",
          font: $font(14),
          lines: 0,
          textColor: $color("#aaa"),
          align: 4
        },
        layout: function(make, view) {
          make.top.equalTo($("bt1").bottom).inset(10);
          make.right.left.inset(15);
          make.height.equalTo(100);
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
        }
      },
      {
        type: "spinner",
        props: {
          loading: false
        },
        layout: function(make, view) {
          make.bottom.equalTo($("bjk").bottom).inset(-10);
          make.centerX.equalTo(view.super);
        }
      },
      by
    ]
  });
}

function sysm() {
  $ui.push({
    props: {
      title: "使用说明"
    },
    views: [
      {
        type: "web",
        props: {
          id: "webxia",
          bgcolor: $color("#e6e6e6"),
          html: `<head><meta charset="UTF-8"></head><body><span style="font-size:34px;"><br><h1>使用说明：</h1><h2>脚本已支持：微信公众号视频、小红书去水印、抖音去水印、皮皮虾去水印、快手短视频无水印、Tiktok视频去水印、头条西瓜视频去水印、等平台的视频下载。<br><br>修复更新</h2><br><h1><a href="http://t.cn/E49YWj6">点击观看</a> 视频教程</h1> <h1><a href="https://ae85.cn/lxfs.html">关注公众号</a> 小良科技</h1><h2>by：iPhone 8、小良&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://ae85.cn/">https://ae85.cn/</a> </h2></span></body>`
        },
        layout: function(make) {
          make.left.right.inset(10);
          make.top.bottom.inset(0);
        }
      }
    ]
  });
}

function cgjm(url) {
  $("spinner").loading = false;
  $ui.push({
    props: {
      title: "解析完成"
    },
    views: [
      {
        type: "view",
        props: {
          id: "vediobtn"
        },
        layout: function(make, view) {
          make.left.bottom.right.inset(10);
          make.top.inset(30);
        },
        views: [
          {
            type: "video",
            props: {
              id: "videobof",
              src: url,
              radius: 7,
              bgcolor: $color("#eee")
            },
            layout: function(make, view) {
              make.left.right.inset(10);
              make.top.equalTo(20);
              make.height.equalTo(250);
            }
          },
          {
            type: "button",
            props: {
              title: "下载视频",
              id: "dBtn",
              bgcolor: $color("#409eff")
            },
            layout: function(make, view) {
              make.top.equalTo($("videobof").bottom).inset(30);
              make.left.inset(20);
              make.height.equalTo(50);
              make.width.equalTo(130);
            },
            events: {
              tapped: function(sender) {
                download(url);
              }
            }
          },
          {
            type: "button",
            props: {
              title: "复制链接",
              id: "fBtn",
              bgcolor: $color("#909399")
            },
            layout: function(make, view) {
              make.top.equalTo($("videobof").bottom).inset(30);
              make.right.inset(20);
              make.height.equalTo(50);
              make.width.equalTo(130);
            },
            events: {
              tapped: function(sender) {
                $clipboard.text = url;
                $ui.toast("复制成功!");
              }
            }
          }
        ]
      },
      by
    ]
  });
}

function zhur() {
  var webView = $("web");
  webView.eval({
    script: `var URL = document.getElementById("video_url").href; window.name = URL`,
    handler: function(result, error) {
      if (result.code == 4) {
        if (count == 4) {
          $("spinner").loading = false;
          $ui.alert("解析失败\n请检查链接是否有问题");
          timer.invalidate();
        }
        count++;
      } else {
        cgjm(result);
        timer.invalidate();
      }
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

function tmenu(text) {
  var url = $detector.link(text);
  url = url[0];
  if (!url) {
    $ui.alert("请先输入视频链接");
  } else {
    $ui.toast("处理中，请稍后···");
    $("spinner").loading = true;
    if (url.search(/douyinshortvideo.|amemv.|iesdouyin.|douyin.com/) != -1) {
      douyin(url);
    } else if (url.search(/tiktok.com|tiktokcdn.|tiktokv./) != -1) {
      tiktok(url);
    } else if (url.search(/pipix.com|hulushequ.|pipixia./) != -1) {
      pipix(url);
    } else if (
      url.search(
        /huoshan.com|huoshan.|huoshanzhibo.|hotsoonzb.|smzhuhe.|woaidazhe./
      ) != -1
    ) {
      huoshan(url);
    } else if (
      url.search(
        /toutiaoimg.cn|365yg.com|ixigua.|xiguaapp.|xiguavideo.|xiguashipin.|pstatp.|zijiecdn.|toutiaocdn.|toutiaoimg.|toutiao12.|toutiao11.|neihanshequ./
      ) != -1
    ) {
      toutiao(url);
    } else if (url.search(/weixin.qq.com/) != -1) {
      weixin_gzh(url);
    } else if (url.search(/xiaohongshu.com/) != -1) {
      xiaohongshu(url);
    } else if (
      url.search(/gifshow.|kuaishou.|kwai.|kw.|chenzhongtech./) != -1
    ) {
      kuaishou(url);
    } else if (
      url.search(
        /vigovideo.|yxixy.|chenzhongtech.|miaopai.|xiaokaxiu.|yixia.|weibo.|weico.|meipai.|musical.|musemuse.|muscdn.|xiaoying.|vivavideo.|immomo.|momocdn.|inke.|flipagram.|163.|weishi.qq|qzone.qq|kg4.qq|kg3.qq|kg2.qq|kg1.qq|kg.qq|instagram.|hao222.|haokan.baidu|quduopai.|nuoruien./
      ) != -1
    ) {
      count = 1;
      $ui.alert("暂不支持该链接解析\n请检测链接是否有误？\n或联系作者反馈");
      //            var turl = $cache.get("info").turl
      //            $('web').url = $text.base64Decode(turl) + url;
      timer = $timer.schedule({
        interval: 3,
        handler: function() {
          //                    zhur();
        }
      });
    } else {
      $ui.alert("暂不支持该链接解析\n请检测链接是否有误？\n或联系作者反馈");
      $("spinner").loading = false;
    }
  }
}

function douyin(url) {
  $http.lengthen({
    url: url,
    handler: function(yurl) {
      var id = yurl.match(/video\/(\S*?)\//)[1];
      $http.get({
        url: url,
        handler: function(resp) {
          var data = resp.data.replace(/\n|\s|\r/g, "");
          var dytk = data.match(/dytk\:\"(\S*?)\"/)[1];

          $http.get({
            url:
              $text.base64Decode($cache.get("info").douyin) +
              id +
              "&dytk=" +
              dytk,
            handler: resp => {
              var json = resp.data;
              var zurl = json.item_list[0].video.play_addr.url_list[0];
              var zu = zurl.replace(/playwm/, "play");
              cgjm(zu);
            }
          });
        }
      });
    }
  });
}

function tiktok(url) {
  tiktok = $cache.get("info").tiktok;
  $http.lengthen({
    url: url,
    handler: function(resp) {
      var id = resp.match(/v\/([0-9]+)/)[1];

      $http.get({
        url: $text.base64Decode(tiktok.durl) + id + "&act=download",
        handler: resp => {
          var data = resp.data.replace(/\n|\s|\r/g, "");
          var href = data.match(/download_mp4_sv2.*?class/)[0];
          var zurl = href.match(/href=\'(\S*?)\'/)[1];

          cgjm(zurl);
        }
      });
    }
  });
}

function pipix(url) {
  $http.lengthen({
    url: url,
    handler: function(yurl) {
      var id = yurl.match(/item\/([0-9]+)/)[1];

      $http.get({
        url: $text.base64Decode($cache.get("info").pipix) + id,
        handler: function(resp) {
          cgjm(resp.data.data.item.origin_video_download.url_list[0].url);
        }
      });
    }
  });
}

function huoshan(url) {
  $http.lengthen({
    url: url,
    handler: function(yurl) {
      var id = yurl.match(/item\/([0-9]+)/)[1];
      $http.get({
        url:
          $text.base64Decode($cache.get("info").huoshan) +
          id +
          "/?iid=66430143096&ac=4G&os_api=18&app_name=live_stream&channel=App%20Store&idfa=BA311C5F-C5F1-4E78-A71E-F636CF779EA8&device_platform=iphone&live_sdk_version=5.7.3&vid=C2CAA6A9-54F4-4853-80EB-09AD37FC7F57&openudid=c72471ef1607585229f08fef72081bb06e2b8605&device_type=iPhone10,3&mccmnc=51502&update_version_code=5734&version_code=5.7.3&os_version=12.0&screen_width=1125&aid=1112&device_id=60115234121&mas=007037d9d82d218ba64996b995edb93b9e0909ae35f38e1b0ed4e8&as=a2a51d0ffe479c25f19258",
        handler: function(resp) {
          cgjm(resp.data.data.video.url_list[0]);
        }
      });
    }
  });
}

function toutiao(url) {
  $http.lengthen({
    url: url,
    handler: function(yurl) {
      var id = yurl.match(/i([0-9]+)/)[1];
      $http.get({
        url: "https://m.toutiaoimg.com/i" + id + "/info/",
        handler: function(resp) {
          var video_id = resp.data.data.video_id;
          cgjm($text.base64Decode($cache.get("info").toutiao) + video_id);
        }
      });
    }
  });
}

function weixin_gzh(url) {
  $http.post({
    url: $text.base64Decode($cache.get("info").weixin_gzh),
    header: {
      "Cache-Control":
        "no-store, no-cache, must-revalidate, post-check=0, pre-check=0",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36",
      "X-Requested-With": "XMLHttpRequest"
    },
    body: {
      url: url
    },
    handler: function(resp) {
      var arr = resp.data.data;
      if (arr.length == 1) {
        cgjm(arr[0].url);
      } else {
        $ui.menu({
          items: arr.map(function(item) {
            return item.title;
          }),
          handler(title, idx) {
            cgjm(arr[idx].url);
          }
        });
      }
    }
  });
}

function xiaohongshu(url) {
  $http.post({
    url: $text.base64Decode($cache.get("info").xiaohongshu),
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "shuiyinjingling/1.6 (iPhone; iOS 12.0; Scale/3.00)"
    },
    body: {
      source_url: url,
      sign: ""
    },
    handler: function(resp) {
      cgjm(resp.data.data.data.video);
    }
  });
}

function kuaishou(url) {
  var kuai = $cache.get("info").kuaishou;
  $http.post({
    url: $text.base64Decode(kuai.durl),
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent":
        "%E5%BF%AB%E6%8D%B7%E6%8C%87%E4%BB%A4/788 CFNetwork/974.2.1 Darwin/18.0.0"
    },
    body: {
      url: url,
      token: $text.base64Decode(kuai.token)
    },
    handler: resp => {
      var data = resp.data;
      cgjm(data.list[0]);
    }
  });
}
