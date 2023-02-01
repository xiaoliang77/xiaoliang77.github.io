// lei=1   规则
// lei=2   脚本
// lei=3   应用
// lei=4   其他
var color = 100;
function co_sj() {
    if (color == 112) {
        color = 101;
    } else {
        color++;
    }
}
var data_gz = [{"title":"🔥Instagram图像视频下载1.6","image":"img/Instagram.png","rq":"更新：2023年2月1日","details":"支持：多图一键下载。\n\n使用方法：在Instagram客户端复制分享链接后运行规则","url":"cd7c9bf145bf449bae739da8eb80651b"},{"title":"🔥音乐下载 1.6","image":"img/yyxz.png","rq":"更新：2022年11月11日","details":"修复不能使用问题。\n可导入音乐播放器","url":"d22af9587db545d2841be144a53ba110"},{"title":"🔥网购历史价格查询 1.5","image":"img/wanggou.png","rq":"更新：2022年8月11日","details":"更新支持领取隐藏优惠券！\n支持：淘宝、天猫、京东、舒宁、亚马逊、等各大网商","url":"dd7e95547d174a79a7ac6dc9d6304097"},{"title":"🔥YouTube视频下载","image":"img/youtube.png","rq":"发布：2022年3月20日","details":"支持：选择视频品质下载（1080p/720p）","url":"1d826257d89c4af7b5894110cd9c0b4f"},{"title":"🔥Pornhub视频下载1.3","image":"img/down.png","rq":"更新：2022年3月18日","details":"可以选择视频清晰度品质下载，支持调用手机迅雷下载","url":"35e0454b5d614c879426bbb30fd31952"},{"title":"🔥App Store 地区切换 2.0","image":"img/appstore.png","rq":"更新：2022年3月17日","details":"一键更换App Store应用商店地区","url":"c9ab7498f3ed4f26b3f1f7c66d55b880"},{"title":"🔥短视频下载2.9.1","image":"img/dsp.png","rq":"更新：2022年3月14日","details":"支持全平台，可设置调用手机迅雷下载","url":"7b2d1a35a42445fa8b5dd029ec801984"},{"title":"剪贴板文字转语音v1.0","image":"img/yuyin.png","rq":"群友：深巷旧港丶 提供","details":"将剪贴板文字转语音以mp3形式导出，可以配合MP3转音乐插件使用","url":"14dd1649dc434a4da128de39433bc350"},{"title":"淘宝验号查询助手","image":"img/tbyhcxzs.png","rq":"更新：2020年6月5日","details":"淘宝信誉，淘气值，买家卖家评论，等多种信息一键查询，无需电脑。","jsurl":"","url":"89d6ed5c371048f0a4fe86a255d42f3b","button":"添加规则"},{"title":"在线福利 6.5","image":"img/zxfl.jpg","rq":"更新：2019年11月21日","details":"修复更新\n数据来自互联网800资源采集。","url":"8f9d176b9cf045b6b12561258e6a5333"},{"title":"公众号.音.视.图下载1.1","image":"img/gzhyst.png","rq":"发布：2019年3月31日","details":"支持：视频、音频、图片、封面图下载","url":"33eaccf34e5e47c9b6411de53c03855e"}, {"title":"DJ多多下载","image":"img/djdd.png","rq":"发布：2019年3月6日","details":"规则暂不支持高音质下载","url":"ea3b112335964f939f84974930f4bf12"},{"title":"支付宝赏金生成器","image":"img/qian.png","rq":"发布：2018年11月20日","details":"娱乐装逼用的。\n不会使用的看教程。","url":"cb8517ddada445189b8d66547ce49482"}, {"title":"不越狱修改运营商名称1.2","image":"img/yysxg.png","rq":"更新：2018年11月16日","details":"支持：ios12以下系统(不包含ios12)\n同时支持：移动、联通、电信、三网修改。","url":"bd660418245a47e18396505d7239a467"},{"title":"BTbtt - 电影下载 1.2","image":"img/btbtt.png","rq":"更新:2018.8.14","details":"本次更新修复了下载失败问题，删除错误动作。\n资源来自BTbtt论坛，资源多更新快。","url":"960d2f8b08d74bc1b31f27bb21110b80"},{"title":"js导入pin-支持新版本","image":"img/jsdrgz.png","rq":"更新：2018年5月17日","details":"功能：利用Workflow规则把js脚本导入pin中使用。\n使用前请视频教程","url":"e866d6f4c0e64ebba9dbd2d38cb1ca41"}]


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
$("#gz").html(kap_cj(data_gz));


function install(id) {
    // var host = window.location.host;
    // var url = "https://workflow.is/workflows/" + id;
    var url = "https://www.icloud.com/shortcuts/" + id;
    
    if (isios()) {
        if (id.indexOf("workflow://") != -1) {
            url = id;
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
        if (id.indexOf("workflow://") != -1) {
            url = "https://iphone8.vip/gz.html";
        }
        qrcode.makeCode(url);
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


