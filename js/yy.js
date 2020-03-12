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
var data_yy = [{"title":"Youtube++ - 增强版","image":"img/Youtube.jpg","rq":"更新：2019年4月22日","details":"1080p下载、去视频广告等功能\n⚡️️ v12.44.16      💾96.9MB","url":"Youtube"},{"title":"Filza - 文件管理","image":"img/filza.png","rq":"更新：2019年4月22日","details":"ios11~11.1.2 可查系统文件\n改字体、美化主题、游戏破解、等","url":"FilzaEscaped","button":"点击 - 进入"},{"title":"Twitter++ - 增强版","image":"img/Twitter.jpg","rq":"更新：2019年4月22日","details":"可本地保存图片、视频等功能\n⚡️️ v7.11      💾82.3MB","url":"Twitter"},{"title":"手机迅雷","image":"img/xunlei.png","rq":"更新：2018年12月19日","details":"更新支持 ios 12 系统\n⚡️️ v5.3      💾未知","url":"xunlei"},{"title":"Panda Helper","image":"img/phico.png","rq":"三方应用商店","details":"免费下载收费应用或游戏的平台，无需越狱、无需Apple ID","url":"pandahelper"},{"title":"Cute CUT Pro - 视频编辑","image":"img/CuteCUTPro.jpg","rq":"更新：2018年12月4日","details":"Appstore收费￥40，这里免费提供\n⚡️️ v1.8.5      💾89MB","url":"CuteCutPro"},{"title":"电影精灵 - 视频编辑","image":"img/dyjl.png","rq":"更新：2018年10月17日","details":"创作出属于您自己的微电影\n⚡️️ 8.84      💾140MB","url":"dianyingjingling"}]


function kap_cj(data){
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
    var url = "itms-services://?action=download-manifest&url=https://gitee.com/yao07/APP/raw/master/" + id + ".xml"
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


