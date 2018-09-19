/*
脚本数据来自另一个App收费节点。节点可以添加到小火箭或其他App中使用。

by：iPhone 8、小良
更多脚本：http://ae85.cn/
*/



$ui.render({
  props: {
    title: "另一个App收费ss"
  },
  views: [{
    type: "list",
    props: {
      id: "li",
      actions: [{
        title: "生成二维码",
        handler: function(tableView, indexPath) {
          var obj = tableView.object(indexPath)
          var url = obj.split("\n")[1]
          var image = $qrcode.encode(url)
          $share.universal(image)
        }
      }, ]
    },
    layout: function(make) {
      make.top.left.right.inset(0)
      make.bottom.inset(330)
    },
    events: {
      didSelect: function(sender, indexPath, data) {
        xiang(data)
      }
    }
  }, {
    type: "button",
    props: {
      id: "bt1",
      title: "一键添加所有节点",
      bgcolor: $color("#149bcc"),

    },
    layout: function(make) {
      make.top.equalTo($("li").bottom).inset(10)
      make.left.right.inset(20)
      make.height.equalTo(40)
    },
    events: {
      tapped: function(sender) {
        var data = $("li").data
        var ss = ""
        for (i in data) {
          var zt = data[i].split("\n")[1]
          ss = ss + zt
        }
        $app.openURL(ss)
      }
    }
  }, {
    type: "text",
    props: {
      text: "注：\n脚本数据来自另一个App收费节点。\n节点可以添加到小火箭或其他App中使用。\n\n使用方法：\n1).可一键添加至小火箭中。\n2).可点击节点查看详情手动添加至vpn软件中。\n3).可向左滑动生成二维码以二维码方式添加到vpn软件中。\n\nby：iPhone 8、小良\n更多脚本：http://ae85.cn/",
      editable: false,
      textColor: $color("#FF4040")
    },
    layout: function(make) {
      make.top.equalTo($("bt1").bottom).inset(10)
      make.left.right.inset(10)
      make.bottom.inset(0)
    }
  }, ]
})

$ui.loading("加载中……")
$http.request({
  method: "GET",
  url: "https://cmg40jii8cmmli4bxuczy.com:8443/nodes?location=free&networkType=WiFi",
  header: {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "FUVPNClient_iOS/156 CFNetwork/893.14.2 Darwin/17.3.0",
    "X-App-BundleID": "com.fansup.vpn1",
    "X-App-DeviceID": "02295D14-A233-4C31-93DB-8F5FDC2600EE",
    "X-App-Ver": "1.5.4",
    "X-Request-Ip": "116.136.7.3"
  },
  handler: function(resp) {
    $ui.loading(false)
    var arr = resp.data.nekitJSON
    var a = JSON.parse(arr).adapter
    //$ui.alert(a.adapter)
    var data = []
    for (i in a) {
      var j = a[i]
      var ip = j.host
      var hd = `${j.method}:${j.password}@${j.host}:${j.port}`
      var h = $text.base64Encode(hd)
      var s = 1 + i++
        if (ip) {
          data.push("节点" + s + "  -  " + ip + "\n" + "ss://" + h + "\n" + JSON.stringify(j))
        }
    }
    $("li").data = data
  }
})

function xiang(obj) {
  var text = obj.split("\n")
  var j = JSON.parse(text[2])
  var hd = `服务器：${j.host}\n端口：${j.port}\n密码：${j.password}\n算法：${j.method}`
  $ui.alert({
    title: text[0].split("-")[0],
    message: hd,
    actions: [{
        title: "复制节点详情",
        handler: function() {
          $clipboard.text = hd
          $ui.toast("已复制")
        }
      },
      {
        title: "添加至小火箭",
        handler: function() {
          $app.openURL(text[1])
        }
      },
      {
        title: "取消"
      }
    ]
  })
}