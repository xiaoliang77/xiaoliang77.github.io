/* 文字转语音
 *  2023年7月13日
 *  可在键盘中运行
 * 
 *  by：iPhone 8、小良
 *  https://iphone8.vip/
 *  公众号：小良科技
*/

csh()
const env = $app.env;
if (env == $env.keyboard) {
  $thread.main({
    delay: 0.3,
    handler: function() {
      $keyboard.getAllText(text => {
        $("bjk").text = text;
        download(text)
    })
    }
  })

} else {
  clipboard()
}

function csh() {
  $ui.render({
    props: {
      title: "文字转语音",
      id: "zjm"
    },
    views: [
      {
        type: "button",
        props: {
          title: "转换",
          id: "bt1"
        },
        layout: function (make) {
          make.top.inset(20);
          make.right.inset(10);
          make.width.equalTo(80);
          make.height.equalTo(35);
        },
        events: {
          tapped: function (sender) {
            $("bjk").blur();
            download($("bjk").text)
          }
        }
      },
      {
        type: "input",
        props: {
          id: "bjk",
          placeholder: "输入需要转换语音的内容…"
        },
        layout: function (make) {
          make.top.inset(20);
          make.left.inset(10);
          make.right.equalTo($("bt1").left).inset(10);
          make.height.equalTo(35);
        },
        events: {
          returned: function (sender) {
            $("bjk").blur();
            download($("bjk").text)
          }
        }
      }
    ]
  });
}


function download(gm) {
  var name = $text.URLEncode(gm);
  $ui.toast("正在转换中 ...");
  $ui.loading(true);
  $http.download({
    url: "https://dict.youdao.com/dictvoice?le=zh&product=pc&type=null&audio=" + name,
    handler: function (resp) {
      $ui.loading(false);
      if (resp.response.statusCode == "200") {
        $share.sheet([gm + ".mp3", resp.data]);
      } else {
        $ui.alert("下载失败");
      }
    }
  });
}

function clipboard() {
  var text = $clipboard.text;
  if (text) {
    $ui.alert({
      title: "要转换剪贴板中内容语音？",
      message: $clipboard.text,
      actions: [
        {
          title: "取消"
        },
        {
          title: "转换",
          handler: function () {
            $("bjk").text = text;
            download(text)
          }
        }
      ]
    });
  }
}


