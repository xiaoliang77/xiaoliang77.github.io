/*
App Store 地区切换 2.0

重要说明：
使用规则改了地区之后，只能查看修改后的地区的应用信息，并不能直接下载应用！必须使用对应地区ID账号才可以下载APP。

by：iPhone 8、小良
https://ae85.cn/

*/

var menu = [{ "name": "🇨🇳 中国大陆", "id": "143465" }, { "name": "🇭🇰 中国香港", "id": "143463" }, { "name": "🇲🇴 中国澳门", "id": "143515" }, { "name": "️🀄️ 中国台湾", "id": "143470" }, { "name": "🇺🇸 美国", "id": "143441" }, { "name": "🇯🇵 日本", "id": "143462" }, { "name": "🇰🇷 韩国", "id": "143466" }, { "name": "🇨🇦 加拿大", "id": "143455" }]

$ui.menu({
  items: menu.map(function (item) { return item.name }),
  handler: function (title, idx) {
    $app.openURL("itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/resetAndRedirect?dsf=" + menu[idx].id + "&mt=8")
  }
})