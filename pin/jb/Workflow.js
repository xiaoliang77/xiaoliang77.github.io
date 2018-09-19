
$ui.menu({
  items: ["小良 - 更新器","App在线安装 - ipa提取","电影搜索引擎","80s - 电影下载", "BTbtt - 电影下载","快手去水印下载"],
  handler: function(title,idx) {
    switch (idx) {
      case 0:
        $app.openURL("workflow://run-workflow?name=%E5%B0%8F%E8%89%AF%20-%20%E6%9B%B4%E6%96%B0%E5%99%A8")
        break
      case 1:
        $app.openURL("workflow://run-workflow?name=App%E5%9C%A8%E7%BA%BF%E5%AE%89%E8%A3%85%20-%20%E6%8F%90%E5%8F%96ipa")
        break
      case 2:
        $app.openURL("workflow://run-workflow?name=%F0%9F%96%A5%E7%94%B5%E5%BD%B1%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E")
        break
      case 3:
        $app.openURL("workflow://run-workflow?name=80s%20-%20%E7%94%B5%E5%BD%B1%E4%B8%8B%E8%BD%BD")
        break
       case 4:
        $app.openURL("workflow://run-workflow?name=BTbtt%20-%20%E7%94%B5%E5%BD%B1%E4%B8%8B%E8%BD%BD")
        break
       case 5:
        $app.openURL("workflow://run-workflow?name=%E5%BF%AB%E6%89%8B%E6%97%A0%E6%B0%B4%E5%8D%B0%E8%A7%86%E9%A2%91%E4%B8%8B%E8%BD%BD")
        break
      default:
        break
    }
  }
})
