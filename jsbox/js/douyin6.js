/*
2022年6月2日、修复更新
更新支持pin软件
新增下载功能

by：iPhone 8、小良
http://ae85.cn/
*/
var timer;
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

const base64 = "aHR0cHM6Ly8hZTg1LmNuL2NvbmZpZy8kb3V5aW4uanNvbg==";
$ui.loading(true);
$http.get({
  url: $text.base64Decode(base64.replace(/8/g, "9")),
  handler: function (resp) {
    $ui.loading(false);
    if (resp.response.statusCode == "200") {
      var info = resp.data;
      if (info.bb != "2.6") {
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
        $('web').url = $text.base64Decode(info.turl)
        timer = $timer.schedule({
          interval: 2,
          handler: function () {
              zhur();
          }
      });
      }
    } else {
      $ui.alert("加载失败");
    }
  }
});



$ui.render({
  views: [
    {
      type: "web",
      props: {
        id: "web",
        inlineMedia:0,
        pictureInPicture:0,
        showsProgress:0,
      },
      layout: $layout.fill
    }
  ]
});

function zhur() {
  var webView = $("web")
  webView.eval({
      script: `document.querySelectorAll('div[data-v-c3a3eca6]')[1].remove();`,
      handler: function (result, error) {
        timer.invalidate()
      }
  })
}