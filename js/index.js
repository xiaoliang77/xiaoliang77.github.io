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
var data_gz = [{"title":"小良 - 更新器 3.5 (规则)","image":"img/xiaoliang.png","rq":"更新：2019年4月24日","details":"内置：Wf规则、Pin脚本、破解App 等\n此规则只用于更新小良个人规则","url":"a261538eb87b4f989f8b48d46b4a87bb"},{"title":"🔥bilibili-视频下载 1.2","image":"img/bilibili.png","rq":"更新：2020年6月11日","details":"默认1080p高清MP4视频，大视频建议启用迅雷下载","url":"dacdfd9617ff4ac2a51de02a8c9fcc9d"},{"title":"🔥音乐下载 1.4","image":"img/yyxz.png","rq":"更新：2020年6月8日","details":"修复不能使用问题。\n可导入音乐播放器，具体看演示视频\n可搜索，也支持QQ音乐分享链接","url":"b4fb58311c874534948a03fab5c18fbc"}]

var data_jb = [{"title":"小良 - 更新器 v2.6 Js版","image":"img/xl.png","rq":"更新：2019年1月27日","details":"js脚本是运行在pin或jsbox上的程序, 可以方便快捷的更新小良作品","url":"gxq","button":"安装脚本"},{"title":"🔥Flex 3补丁管理 1.5","image":"img/flex3.png","rq":"2020年6月9日","details":"更新内容：\n修复列表排序错乱问题\n修复ios13系统分享单个补丁名字错乱问题","url":"flex3"},{"title":"🔥抖yin国内版","image":"img/douyin.png","rq":"上线：2020年6月7日","details":"支持\n\n上滑下拉可切换视频。支持pin软件，不支持视频下载","url":"douyincn"}]

var data_yy = [{"title":"Youtube++ - 增强版","image":"img/Youtube.jpg","rq":"更新：2019年4月22日","details":"1080p下载、去视频广告等功能\n⚡️️ v12.44.16      💾96.9MB","url":"Youtube"},{"title":"Filza - 文件管理","image":"img/filza.png","rq":"更新：2019年4月22日","details":"ios11~11.1.2 可查系统文件\n改字体、美化主题、游戏破解、等","url":"FilzaEscaped","button":"点击 - 进入"},{"title":"Twitter++ - 增强版","image":"img/Twitter.jpg","rq":"更新：2019年4月22日","details":"可本地保存图片、视频等功能\n⚡️️ v7.11      💾82.3MB","url":"Twitter"}]

var data_qt = [{"title":"手机获取百度BDUSS教程","image":"img/bduss.jpg","rq":"视频教程","details":"手机端利用抓包工具获取BDUSS\n视频操作有点快，多看几遍吧！","url":"http://t.cn/Rkb7u8i",},{"title":"TestFlight申请和安装","image":"img/tf.jpg","rq":"视频教程","details":"TestFlight(app测试)申请和安装","url":"http://t.cn/Rma7VqB",},{"title":"Pin-js脚本获取添加方法","image":"img/Pin.png","rq":"视频教程","details":"教你如何获取小良所分享的脚本\n视频操作有点快，多看几遍吧！","url":"http://player.youku.com/embed/XMzQyMDA0NjQwNA==",}]

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


