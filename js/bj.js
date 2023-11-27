// lei=1   规则
// lei=2   脚本
// lei=3   应用
// lei=4   其他
var color = 103;
function co_sj() {
    if (color == 112) {
        color = 101;
    } else {
        color++;
    }
}
var data_bj = [{"title":"Telegram 机器人","image":"img/tg_logo.png","rq":"笔记","details":"bot申请，配置，代码","url":"dosc/telegram.html"},{"title":"Linux 系统操作","image":"img/linux.png","rq":"笔记","details":"常用命令","url":"dosc/linux.html"},{"title":"VFX视频剪辑","image":"img/videox.png","rq":"笔记","details":"重要知识点","url":"dosc/vfx-video.html"},{"title":"Windows 批处理(bat)类","image":"img/jsdrgz.png","rq":".bat文件","details":"wifi密码，dns缓存","url":"dosc/tool-bat.html"}]


function kap_cj(data){
    var txt1 = "";
    for (var i = 0; i < data.length; i++) {
        co_sj()
        var arr = data[i]
        txt1 = txt1 + `<div class="col-md-4" onclick="window.open('${arr.url}')">
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
$("#bj").html(kap_cj(data_bj));




