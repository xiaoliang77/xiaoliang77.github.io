// lei=1   规则
// lei=2   脚本
// lei=3   应用
// lei=4   其他
var color = 101;
function co_sj() {
    if (color == 112) {
        color = 101;
    } else {
        color++;
    }
}
var data_gz = [{"title":"🔥短视频下载2.9.3","image":"img/dsp.png","rq":"更新：2023年10月7日","details":"支持全平台，可设置调用手机迅雷下载","url":"874c42ac4ae7472e933d8c5ef8101a04"},{"title":"🔥Twitter-视频下载","image":"img/twittergz.png","rq":"更新：2023年10月6日","details":"可以选择视频清晰度品质下载,支持分享面板调用","url":"6c266ffec3334ffb8aeb90e6dcdd1c23"},{"title":"🔥Pornhub视频下载1.4","image":"img/down.png","rq":"更新：2023年10月3日","details":"可以选择视频清晰度品质下载，支持调用手机迅雷下载","url":"c9014337da74421c9666b31107c7b922"}]

var data_jb = [{"title":"🔥PornHub视频下载","image":"img/ph.jpg","rq":"更新：2021年10月3日","details":"js版p站视频下载，可以选择视频清晰度品质下载，支持调用手机迅雷下载","url":"ph"},{"title":"🔥直播-秋名山见 2.2","image":"img/qmsj.jpg","rq":"2023年9月28日","details":"破解直播平台聚合，目前平台约有100个，低调使用！","url":"zbqms"},{"title":"🔥1024视频","image":"img/1024sp.png","rq":"更新：2023年10月7日","details":"在线视频<br>新增自动更新功能","url":"1024sp"}]

var data_yy = [{ "title": "TrollStore - 巨魔安装教程", "image": "img/TrollStore.jpg", "rq": "ios14 - ios15", "details": "无需越狱，无需电脑，APP免签，免续签，永久使用，有了他就可以安装下面这下APP了", "url": "https://mp.weixin.qq.com/s?__biz=MzI0NDM1MDUwOQ==&mid=2247485098&idx=1&sn=c2bde1304ce95c69179a64d6797a88e6&chksm=e95e6de8de29e4fed39995b0e7abd7298206bd2d86f427f7bbda275894d8da5adfe16853b6b8&token=665554799&lang=zh_CN#rd" },
{ "title": "ipa 文件仓库", "image": "img/wjwl.png", "rq": "TrollStore 专区", "details": "仓库内的ipa文件下载后请使用TrollStore 巨魔 安装使用", "url": "https://pan.ae85.cn/TrollStore" },
{ "title": "AppsManager-应用管理器", "image": "img/AppsManager.png", "rq": "请使用巨魔app安装", "details": "管理应用、备份、还原、抹除数据<br>还原订阅账号数据 可免费使用app订阅功能", "url": "https://pan.ae85.cn/d/TrollStore/AppsManager_1.7.0.ipa" },]

var data_qt = [{"title":"JSBox-破解，免费解锁高级功能 - 无需越狱","image":"img/jsbox.jpg","rq":"支持ios14-ios15.4.1","details":"需要使用巨魔软件，原理就是还原已解锁账号的备份文件","url":"https://mp.weixin.qq.com/s?__biz=MzI0NDM1MDUwOQ==&mid=2247485111&idx=1&sn=feb0948fd1911f3b0f5b26c23a03fd79&chksm=e95e6df5de29e4e35b0331e2c762c285cbfebf481ed24a120ff900230a5876d38f6f69195b96#rd"},{"title":"教你用自带浏览器 Safari 下载MP4视频和其他文件","image":"img/Safari.png","rq":"需要ios13及以上系统","details":"无需越狱，支持多文件同时下载，不用任何第三方工具就能轻松简单的下载文件","url":"https://mp.weixin.qq.com/s/LDdYSTNqhcKz2QzNqHbb1g"},{ "title": "Telegram 直连", "image": "img/tg_logo.png", "rq": "Safari 浏览器中打开", "details": "无需科学上网即可使用Telegram", "url": "http://3v.ae85.cn/api/telegram.php" }]

function kap_cj(data, lei) {
    var txt1 = "";
    for (var i = 0; i < 3; i++) {
        co_sj()
        var arr = data[i]
        if (lei == 4) {
            var an = `window.open('${arr.url}')`
        } else {
            var an = `install('${arr.url}',${lei})`
        }
        txt1 = txt1 + `<div class="col-md-4" onclick="${an}">
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
$("#gz").html(kap_cj(data_gz, 1));
$("#jb").html(kap_cj(data_jb, 2));
$("#yy").html(kap_cj(data_yy, 3));
$("#qt").html(kap_cj(data_qt, 4));

function install(id, lei) {
    // var host = window.location.host;
    // var gz_url = "https://workflow.is/workflows/" + id;
    var gz_url = "https://www.icloud.com/shortcuts/" + id;
    var jb_url = "https://iPhone8.vip/jsbox/" + id + ".html";
    var url;
    if (isios()) {
        if (lei == 1) {
            url = gz_url;
            if (gz_url.indexOf("workflow://") != -1) {
                url = id;
            }
        } else if (lei == 2) {
            url = jb_url;
        } else if (lei == 3) {
            url = "itms-services://?action=download-manifest&url=https://gitee.com/yao07/APP/raw/master/" + id + ".xml"
            if (id.indexOf('http') !== -1) {
                url = id
            }
        }
        // window.open(url,'_self');
        window.location.href = url


    } else {
        $("#qrcode").empty();
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            width: 230,
            height: 230,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        if (lei == 1) {
            url = gz_url;
            if (gz_url.indexOf("workflow://") != -1) {
                url = "https://iphone8.vip/";
            }
        } else if (lei == 2) {
            url = jb_url
        } else if (lei == 3) {
            url = "https://iphone8.vip/yy.html"
        }
        qrcode.makeCode(url);
        $(".ma_tac").show();
    }
}

function install_gz(id) {
    window.open()
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


