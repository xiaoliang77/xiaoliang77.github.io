/*
语音评论，可用于微信朋友圈、qq空间、等场所评论使用。还挺好玩的。

by：iPhone 8、小良
https://ae85.cn/
*/
var dtext = $clipboard.text;
if (!$keyboard.hasText) {
  sheng(dtext);
} else {
  $keyboard.getAllText(function(text) {
    sheng(text);
  });
}
function sheng(text) {
  var key = $text.URLEncode(text);
  var url =
    "https://fanyi.baidu.com/gettts?lan=zh&text=" + key + "&spd=5&source=wise";
  $http.shorten({
    url: url,
    handler: function(resp) {
      var te = "语音评论👉" + resp;
      if ($app.env == $env.keyboard) {
        san(text.length);
        $keyboard.insert(te);
        $keyboard.next()
      } else {
        $clipboard.text = te;
        $ui.toast("已复制");
      }
    }
  });
}
function san(shu) {
  for (var i = 0; i < shu; i++) {
    $keyboard.delete();
  }
}
