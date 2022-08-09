/*
视频评论，基于百度【好看视频、全民小视频】而写的，因为这个在微信中是没有被屏蔽的，可以直接打开观看。
可用于微信朋友圈、qq空间、等场所评论使用。还挺好玩的。

by：iPhone 8、小良
https://iphone8.vip/
*/

var dtext = $clipboard.link;
if (!dtext) {
    $ui.alert("请先到全民小视频或者好看视频中复制视频分享链接在运行脚本");
} else {
    if(dtext.search(/hao222.com|haokan.baidu.com/) != -1){
        $http.get({
            url: dtext,
            handler: function (resp) {
                var html = resp.data.replace(/\n|\s|\r|\\/g, "")
                $console.info(resp.data);
                if (html.search(/videoSrc:/) != -1) {
                    var url = html.match(/videoSrc:\'(\S*?)\'/)[1]
                } else {
                    var url = html.match(/url\":\"(\S*?)\"/)[1]
                }
                $http.shorten({
                    url: url,
                    handler: function (resp) {
                        var te = "视频评论🎬" + resp;
                        if ($app.env == $env.keyboard) {
                            $keyboard.insert(te);
                            $keyboard.next()
                        } else {
                            $clipboard.text = te;
                            $ui.toast("已复制");
                        }
                    }
                });
            }
        });
    }else{
        $ui.alert("对不起！脚本仅支持【全民小视频】和【好看视频】链接");
    }
}
