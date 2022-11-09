// lei=1   规则
// lei=2   脚本
// lei=3   应用
// lei=4   其他
var color = 105;
function co_sj() {
    if (color == 112) {
        color = 101;
    } else {
        color++;
    }
}
var data_yy = [{ "title": "TrollStore - 巨魔安装教程", "image": "img/TrollStore.jpg", "rq": "ios14 - ios15", "details": "无需越狱，无需电脑，APP免签，免续签，永久使用，有了他就可以安装下面这下APP了", "url": "https://mp.weixin.qq.com/s?__biz=MzI0NDM1MDUwOQ==&mid=2247485098&idx=1&sn=c2bde1304ce95c69179a64d6797a88e6&chksm=e95e6de8de29e4fed39995b0e7abd7298206bd2d86f427f7bbda275894d8da5adfe16853b6b8&token=665554799&lang=zh_CN#rd" },
{ "title": "ipa 文件仓库", "image": "img/wjwl.png", "rq": "TrollStore 专区", "details": "仓库内的ipa文件下载后请使用TrollStore 巨魔 安装使用", "url": "https://pan.ae85.cn/TrollStore" },
{ "title": "AppsManager-应用管理器", "image": "img/AppsManager.png", "rq": "请使用巨魔app安装", "details": "管理应用、备份、还原、抹除数据<br>还原订阅账号数据 可免费使用app订阅功能", "url": "https://pan.ae85.cn/d/TrollStore/AppsManager_1.7.0.ipa" },
{ "title": "Shadowrocket - 小火箭", "image": "img/Shadowrocket.jpg", "rq": "请使用巨魔app安装", "details": "15.1.1永久签使用Shadowrocket_2_2_16_原始权限_trollstore专用", "url": "https://pan.ae85.cn/d/TrollStore/15.1.1%E6%B0%B8%E4%B9%85%E7%AD%BE%E4%BD%BF%E7%94%A8Shadowrocket_2_2_16_%E5%8E%9F%E5%A7%8B%E6%9D%83%E9%99%90_trollstore%E4%B8%93%E7%94%A8.ipa" },
{ "title": "手机迅雷", "image": "img/xunlei.png", "rq": "请使用巨魔app安装", "details": "下载后使用巨魔安装，请先安装好TrollStore(巨魔)app", "url": "https://pan.ae85.cn/d/TrollStore/%E8%BF%85%E9%9B%B7Crack.ipa" },
{ "title": "Pin - 剪贴板扩展 (越狱版)", "image": "img/Pin.png", "rq": "⚡️️ v3.2.2　💾13.8MB", "details": "需要手机越狱才能安装使用", "url": "https://pan.ae85.cn/d/%E9%98%BF%E9%87%8C%E4%BA%91%E7%9B%98/APP-IOS/Pin%203.2.2.ipa" },
{ "title": "JSBox - 越狱版", "image": "img/jsbox.jpg", "rq": "⚡️️ v1.24.0　💾29.8MB", "details": "需要手机越狱才能安装使用", "url": "https://pan.ae85.cn/d/%E9%98%BF%E9%87%8C%E4%BA%91%E7%9B%98/APP-IOS/JSBox%E8%B6%8A%E7%8B%B1%E7%89%88_1.24.0_.ipa" },]


function kap_cj(data) {
    var txt1 = "";
    for (var i = 0; i < data.length; i++) {
        co_sj()
        var arr = data[i]
        txt1 = txt1 + `<div class="col-md-4" onclick="install('${arr.url}')">
        <div class="kap s${color}">
            <img src="./${arr.image}">
            <div class="title">
                <h4>${arr.title}</h4>
                <p class="ri">${arr.rq}</p>
            </div>
            <div class="sm">
                <p>${arr.details}</p>
            </div>
        </div>
        </div>`
    }
    return txt1;
}
$("#yy").html(kap_cj(data_yy));


function install(id) {
    if (id.indexOf('http') !== -1) {
        var url = id
    } else {
        var url = "itms-services://?action=download-manifest&url=https://gitee.com/yao07/APP/raw/master/" + id + ".xml"
    }
    if (isios()) {
        window.open(url);
    } else {
        $("#qrcode").empty();
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            width: 230,
            height: 230,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        qrcode.makeCode("https://iphone8.vip/yy.html");
        $(".ma_tac").show();
    }
}

function isios() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["iPhone", "iPad", "iPod"];
    var flag = false;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = true;
            break;
        }
    }
    return flag;
}


