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
var data_yy = [{ "title": "🔥Pin - 剪贴板扩展", "image": "img/Pin.png", "rq": "更新：2021年2月17日", "details": "⚡️️ v3.8.0      💾7.9MB<br>请使用复制代码法安装脚本", "url": "pin" }, { "title": "🔥Shadowrocket - 小火箭", "image": "img/Shadowrocket.jpg", "rq": "更新：2021年2月17日", "details": "⚡️️ v2.1.1      💾7.25MB<br>科学上网利器", "url": "Shadowrocket" }, { "title": "🔥手机迅雷", "image": "img/xunlei.png", "rq": "更新：2021年2月16日", "details": "⚡️️ v5.3.2      💾62.7MB<br>更新证书", "url": "xunlei" },]


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

        qrcode.makeCode("https://ae85.cn/yy.html");
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


