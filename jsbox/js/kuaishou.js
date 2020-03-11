//使用方法：复制快手视频链接后启用脚本即可。
//by：iPhone 8、小良
//演示视频：http://t.cn/RpCY4TN
//更新时间：2017.9.12

$http.get({
  url: $clipboard.text,
  handler: function(ym) {
    var a = ym.data
    var b = a.match(/<meta property="og:image" content="(\S*)jpg/)
    var c = b[1] + "mp4"
    $ui.toast("正在下载请，请耐心等待…")
    $http.download({
      url: c,
      handler: function(xz) {
        //$share.sheet(xz.data)
        $quicklook.open({
          data: xz.data
        })
      }
    })
  }
})