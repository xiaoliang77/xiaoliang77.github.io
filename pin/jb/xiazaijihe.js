//by：iPhone 8、小良
//标题和URL schemes自己改，这只是做为事例。



var url = $clipboard.text
$ui.menu({
  items: ["完美下载器", "迅雷下载", "Pin - 抓图", "视频嗅探器", "发你视频", "Fileget", "视频下载-V"],
  handler: function(title, idx) {
    switch (idx) {
      case 0:
        $app.openURL("ilsdownloader://" + url)
        break
      case 1:
        $app.openURL("thunder://" + url)
        break
      case 2:
        $app.openURL("pin://gifsender?src=auto")
        break
      case 3:
        $app.openURL("fb666://")
        break
      case 4:
        $app.openURL("VideoKeeper://")
        break
      case 5:
        $app.openURL("fileget://")
        break
      case 6:
        $app.openURL("wllvdownloaderlite://")
        break

      default:
        break

    }
  }
})