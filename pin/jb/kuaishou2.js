/*
快手视频去水印下载 1.2
更新：2018年9月15日

by：iPhone 8、小良
更多js脚本： http://ae85.cn/

*/

function generateStr(a) {
  var c = function() {
      for (var d = 0, f = new Array(256), g = 0; 256 != g; ++g) {
        d = g,
          d = 1 & d ? -306674912 ^ d >>> 1 : d >>> 1,
          d = 1 & d ? -306674912 ^ d >>> 1 : d >>> 1,
          d = 1 & d ? -306674912 ^ d >>> 1 : d >>> 1,
          d = 1 & d ? -306674912 ^ d >>> 1 : d >>> 1,
          d = 1 & d ? -306674912 ^ d >>> 1 : d >>> 1,
          d = 1 & d ? -306674912 ^ d >>> 1 : d >>> 1,
          d = 1 & d ? -306674912 ^ d >>> 1 : d >>> 1,
          d = 1 & d ? -306674912 ^ d >>> 1 : d >>> 1,
          f[g] = d
      }
      return "undefined" != typeof Int32Array ? new Int32Array(f) : f
    }(),
    b = function(g) {
      for (var j, k, h = -1, f = 0, d = g.length; f < d;) {
        j = g.charCodeAt(f++),
          j < 128 ? h = h >>> 8 ^ c[255 & (h ^ j)] : j < 2048 ? (h = h >>> 8 ^ c[255 & (h ^ (192 | j >> 6 & 31))],
            h = h >>> 8 ^ c[255 & (h ^ (128 | 63 & j))]) : j >= 55296 && j < 57344 ? (j = (1023 & j) + 64,
            k = 1023 & g.charCodeAt(f++),
            h = h >>> 8 ^ c[255 & (h ^ (240 | j >> 8 & 7))],
            h = h >>> 8 ^ c[255 & (h ^ (128 | j >> 2 & 63))],
            h = h >>> 8 ^ c[255 & (h ^ (128 | k >> 6 & 15 | (3 & j) << 4))],
            h = h >>> 8 ^ c[255 & (h ^ (128 | 63 & k))]) : (h = h >>> 8 ^ c[255 & (h ^ (224 | j >> 12 & 15))],
            h = h >>> 8 ^ c[255 & (h ^ (128 | j >> 6 & 63))],
            h = h >>> 8 ^ c[255 & (h ^ (128 | 63 & j))])
      }
      return h ^ -1
    };
  return b(a) >>> 0
}

function geturl(url) {
  var c = Math.random().toString(10).substring(2);
  var a = generateStr(url + "@" + c).toString(10);
  $ui.loading(true)
  $http.request({
    method: "POST",
    url: "http://service0.iiilab.com/video/web/kuaishou",
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "http://kuaishou.iiilab.com",
      "Referer": "http://kuaishou.iiilab.com/",
      "Cookie": "PHPSESSIID=651069736986; _ga=GA1.2.1290873180.1528290722; _gat=1; _gat_gtag_UA_98109640_11=1; _gid=GA1.2.1958495067.1536980687; iii_Session=mpgem9tjsn3lvdv93ngcnq4od1",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13G34 Safari/601.1"
    },
    body: {
      "link": url,
      "r": c,
      "s": a,
    },
    handler: function(resp) {
      $ui.loading(false)
      var json = resp.data.data
      var durl = json.video
      $cache.set("url", durl)
      $("web").url = durl
      $("bt2").alpha = 1

    }
  })
}
var html = `<head><meta charset="UTF-8"></head><body><span style="font-size:34px;"><br><h1>使用说明：</h1><h2>在快手客户端复制你要下载的视频链接，粘贴到上面并按下获取按钮。<br>首次运行会自动识别并提取无水印视频</h2><br><h1><a href="http://ae85.cn/">点击观看</a> 视频教程</h1> <br><h1><a href="http://ae85.cn/fuli/xiaoliang.html">点击领取</a> 支付宝红包</h1><br><h1><a href="http://ae85.cn/lxfs.html">关注公众号</a> VIP视频解析</h1><br><h2>by：iPhone 8、小良&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://ae85.cn/">http://ae85.cn/</a> </h2></span></body>`

$ui.render({
  props: {
    title: "快手视频去水印下载 1.2"
  },
  views: [{
      type: "button",
      props: {
        title: "获取"
      },
      layout: function(make) {
        make.right.top.inset(10)
        make.size.equalTo($size(64, 32))
      },
      events: {
        tapped: function(sender) {
          $ui.toast("加载中……")
          geturl($("input").text)
        }
      }
    },
    {
      type: "input",
      props: {
        placeholder: "输入视频地址…"
      },
      layout: function(make) {
        make.top.left.inset(10)
        make.right.equalTo($("button").left).offset(-10)
        make.height.equalTo($("button"))
      }
    }, {
      type: "web",
      props: {
        id: "web",
        html: html
      },
      layout: function(make) {
        make.top.equalTo($("button").bottom).inset(10)
        make.bottom.inset(0)
        make.left.right.inset(10)
      }
    },
    {
      type: "button",
      props: {
        id: "bt1",
        radius: 25,
        src: "http://ae85.cn/wf/hb.jpg",
        font: $font(20)
      },
      layout: function(make) {
        make.right.inset(15)
        make.top.equalTo(80)
        make.height.width.equalTo(50)
      },
      events: {
        tapped: function(sender) {
          $app.openURL("alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=https%3A%2F%2Fqr.alipay.com%2Fc1x08786tiy5qigyhnjd2db%3F_s%3Dweb-other")
        },
        longPressed: function(sender) {
          $("web").html = html
        }
      }
    },
    {
      type: "button",
      props: {
        id: "bt2",
        src: "http://ae85.cn/jsbox/img/xiazai.png",
        font: $font(20)
      },
      layout: function(make) {
        make.right.inset(15)
        make.top.equalTo($("bt1").bottom).offset(20)
        make.height.width.equalTo(50)
      },
      events: {
        tapped: function(sender) {
          download($cache.get("url"))
        },
        longPressed: function(sender) {
          var url = $cache.get("url")
          $clipboard.text = url
          $ui.alert("已复制：\n" + url)
        }
      }
    },
  ]
})

function csh() {
  $("bt2").alpha = 0
  var durl = $clipboard.text
  if (durl.indexOf("gifshow.com") !== -1) {
    $("input").text = durl
    geturl(durl)
    $ui.toast("加载中……")
  }
}

csh()

function download(url) {
  $ui.toast("正在下载中 ...")
  $ui.loading(true)
  $http.download({
    url: url,
    handler: function(resp) {
      $ui.loading(false)
      if (resp.response.statusCode == "200") {
        $share.sheet([
          "download.mp4",
          resp.data
        ])
      } else {
        $ui.alert("下载失败")
      }
    }
  })
}