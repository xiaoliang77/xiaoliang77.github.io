//使用方法：复制视频链接，启动脚本选择接口即可
//by：iPhone 8、小良
//视频教程：http://t.cn/RNTHBSq
//发布时间：2017.09.03

var url = $clipboard.text
var jk = [
{ name: "爱看解析 - ODFLV", code: "http://aikan-tv.com/?url=" },{ name: "手动点播放 - vip解析", code: "https://jiexi.071811.cc/jx.php?url=" },{ name: "163人 - 偶尔支持腾讯", code: "http://jx.api.163ren.com/vod.php?url=" },{ name: "百域阁 - 转圈圈就换线路", code: "http://api.baiyug.cn/vip/index.php?url=" },{ name: "旋风解析 - 1905优先使用", code: "http://api.xfsub.com/index.php?url=" },{ name: "石头解析 - 手动点播放", code: "https://jiexi.071811.cc/jx.php?url=" },{ name: "无名小站 - 无名小站同源", code: "http://www.sfsft.com/admin.php?url=" },{ name: "VIP看看 - 更换线路成功率会提高", code: "http://q.z.vip.totv.72du.com/?url=" },{ name: "眼睛会下雨 - vipjiexi", code: "http://www.vipjiexi.com/yun.php?url=" }
]

$ui.menu({
  items: jk.map(function(item) { return item.name }),
  handler: function(title, idx) {
    $app.openURL(jk[idx].code + url)
  }
})