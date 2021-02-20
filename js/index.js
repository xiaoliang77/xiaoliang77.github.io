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
var data_gz = [{"title":"小良 - 更新器 3.5 (规则)","image":"img/xiaoliang.png","rq":"更新：2019年4月24日","details":"内置：Wf规则、Pin脚本、破解App 等\n此规则只用于更新小良个人规则","url":"a261538eb87b4f989f8b48d46b4a87bb"},{"title":"🔥Instagram图像视频下载1.2","image":"img/Instagram.png","rq":"更新：2021年2月20日","details":"支持：多图一键下载。\n\n使用方法：在Instagram客户端复制分享链接后运行规则","url":"6d16095da6454fa7ac8408779c830086"},{"title":"🔥音乐下载 1.5","image":"img/yyxz.png","rq":"更新：2021年2月19日","details":"修复不能使用问题。\n可导入音乐播放器","url":"4fe5a4c8e18643b2959fce63268ed1fa"}]

var data_jb = [{"title":"小良 - 更新器 v2.6 Js版","image":"img/xl.png","rq":"更新：2019年1月27日","details":"js脚本是运行在pin或jsbox上的程序, 可以方便快捷的更新小良作品","url":"gxq","button":"安装脚本"},{"title":"🔥音乐下载 1.2","image":"img/music.jpg","rq":"发布：2021年2月19日","details":"音乐下载\n支持：网易云音乐、QQ音乐、虾米音乐、酷狗音乐、百度音乐","url":"music"},{"title":"🔥网购历史价格查询1.4","image":"img/lsjgcx.jpg","rq":"更新：2021年2月16日","details":"历史价格走势图\n支持：淘宝、京东、亚马逊等","url":"wglsjg"}]

var data_yy = [ { "title": "🔥Shadowrocket - 小火箭", "image": "img/Shadowrocket.jpg", "rq": "⚡️️ v2.1.2　💾7.25MB", "details": "更新：2021年2月17日<br>科学上网利器", "url": "Shadowrocket" }, { "title": "🔥手机迅雷", "image": "img/xunlei.png", "rq": "⚡️️ v5.3.2　💾62.7MB", "details": "更新：2021年2月17日<br>更新证书", "url": "xunlei" },{ "title": "Pin - 剪贴板扩展 (越狱版)", "image": "img/Pin.png", "rq": "⚡️️ v3.2.2　💾13.8MB", "details": "需要手机越狱才能安装", "url": "pin" },{ "title": "JSBox - 越狱版", "image": "img/jsbox.jpg", "rq": "⚡️️ v1.24.0　💾29.8MB", "details": "需要手机越狱才能安装", "url": "jsbox" }]

var data_qt = [{"title":"Telegram 直连","image":"img/tg_logo.png","rq":"Safari 浏览器中打开","details":"无需科学上网即可使用Telegram","url":"http://3f.ae85.cn:772/api/telegram.php"},{"title":"屏蔽iOS 13.x系统自动更新","image":"img/settings.png","rq":"Safari 浏览器中打开","details":"ios13用户不想系统自动下载更新的可以安装这个描述文件","url":"https://ae85.cn/ios/iOS13.mobileconfig"},{"title":"手机获取百度BDUSS教程","image":"img/bduss.jpg","rq":"视频教程","details":"手机端利用抓包工具获取BDUSS\n视频操作有点快，多看几遍吧！","url":"http://t.cn/Rkb7u8i",}]

function kap_cj(data,lei){
    var txt1 = "";
    for (var i = 0; i < 3; i++) {
        co_sj()
        var arr = data[i]
        if(lei==4){
            var an =`window.open('${arr.url}')`
        }else{
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
$("#gz").html(kap_cj(data_gz,1));
$("#jb").html(kap_cj(data_jb,2));
$("#yy").html(kap_cj(data_yy,3));
$("#qt").html(kap_cj(data_qt,4));

function install(id, lei) {
    // var host = window.location.host;
    var gz_url = "https://workflow.is/workflows/" + id;
    var jb_url = "https://ae85.cn/jsbox/" + id + ".html";
    var url;
    if (isios()) {
        if (lei == 1) {
            url = gz_url;
            if(gz_url.indexOf("workflow://") != -1){
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
        if (lei == 1) {
            url = gz_url;
            if(gz_url.indexOf("workflow://") != -1){
                url = "https://ae85.cn";
            }
        } else if (lei == 2) {
            url = jb_url
        } else if (lei == 3) {
            url = "https://ae85.cn/yy.html"
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


