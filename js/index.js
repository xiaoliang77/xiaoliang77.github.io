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
var data_gz = [{"title":"🔥网购历史价格查询 1.5","image":"img/wanggou.png","rq":"更新：2022年8月11日","details":"更新支持领取隐藏优惠券！\n支持：淘宝、天猫、京东、舒宁、亚马逊、等各大网商","url":"dd7e95547d174a79a7ac6dc9d6304097"},{"title":"🔥YouTube视频下载","image":"img/youtube.png","rq":"发布：2022年3月20日","details":"支持：选择视频品质下载（1080p/720p）","url":"1d826257d89c4af7b5894110cd9c0b4f"},{"title":"🔥Pornhub视频下载1.3","image":"img/down.png","rq":"更新：2022年3月18日","details":"可以选择视频清晰度品质下载，支持调用手机迅雷下载","url":"35e0454b5d614c879426bbb30fd31952"}]

var data_jb = [{"title":"🔥赛事直播 1.6.2","image":"img/sszb.jpg","rq":"2022年10月29日","details":"如果脚本代码报错，请将jsbox软件升级到2.0以上","url":"sszb"},{"title":"🔥Apple ID 获取器","image":"img/appleid.jpg","rq":"更新：2022年10月29日","details":"ID可下载Shadowrocket(小火箭),\n账号密码24小时自动更新，更新频率约10分钟/次","url":"appleid"},{"title":"🔥小良 - 更新器 v3.0 Js版","image":"img/xl.png","rq":"更新：2022年8月8日","details":"js脚本是运行在pin或jsbox上的程序, 可以方便快捷的更新小良作品","url":"gxq"},{"title":"🔥抖yin国内版1.6","image":"img/douyin.png","rq":"更新：2022年8月16日","details":"修复更新，支持pin软件使用","url":"douyincn"}]

var data_yy = [{ "title": "TrollStore - 巨魔安装教程", "image": "img/TrollStore.jpg", "rq": "ios14 - ios15", "details": "无需越狱，无需电脑，APP免签，免续签，永久使用，有了他就可以安装下面这下APP了", "url": "https://mp.weixin.qq.com/s?__biz=MzI0NDM1MDUwOQ==&mid=2247485098&idx=1&sn=c2bde1304ce95c69179a64d6797a88e6&chksm=e95e6de8de29e4fed39995b0e7abd7298206bd2d86f427f7bbda275894d8da5adfe16853b6b8&token=665554799&lang=zh_CN#rd" },
{ "title": "ipa 文件仓库", "image": "img/wjwl.png", "rq": "TrollStore 专区", "details": "仓库内的ipa文件下载后请使用TrollStore 巨魔 安装使用", "url": "https://pan.ae85.cn/TrollStore" },
{ "title": "AppsManager-应用管理器", "image": "img/AppsManager.png", "rq": "请使用巨魔app安装", "details": "管理应用、备份、还原、抹除数据<br>还原订阅账号数据 可免费使用app订阅功能", "url": "https://pan.ae85.cn/TrollStore/AppsManager_1.7.0.ipa" },]

var data_qt = [{ "title": "Telegram 直连", "image": "img/tg_logo.png", "rq": "Safari 浏览器中打开", "details": "无需科学上网即可使用Telegram", "url": "http://3f.ae85.cn:772/api/telegram.php" }, { "title": "屏蔽iOS 13.x系统自动更新", "image": "img/settings.png", "rq": "Safari 浏览器中打开", "details": "ios13用户不想系统自动下载更新的可以安装这个描述文件", "url": "https://iphone8.vip//ios/iOS13.mobileconfig" }, { "title": "手机获取百度BDUSS教程", "image": "img/bduss.jpg", "rq": "视频教程", "details": "手机端利用抓包工具获取BDUSS\n视频操作有点快，多看几遍吧！", "url": "http://t.cn/Rkb7u8i", }]

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


