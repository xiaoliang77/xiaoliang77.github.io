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
var data_gz = [{"title":"小良 - 更新器 3.5 (规则)","image":"img/xiaoliang.png","rq":"更新：2019年4月24日","details":"内置：Wf规则、Pin脚本、破解App 等\n此规则只用于更新小良个人规则","url":"a261538eb87b4f989f8b48d46b4a87bb"},{"title":"🔥free-ss(免费ss)","image":"img/ss.jpg","rq":"更新：2021年2月15日","details":"科学上网，请配合 Shadowrocket（小火箭）软件使用","url":"d8b52d6b15714080bd8227d3b0e90101"},{"title":"Pornhub视频下载","image":"img/down.png","rq":"更新：2020年7月12日","details":"可设置默认下载方式，支持调用手机迅雷自动创建下载任务","url":"acef5f74051c47069d62e7e515a32a15"}]

var data_jb = [{"title":"小良 - 更新器 v2.6 Js版","image":"img/xl.png","rq":"更新：2019年1月27日","details":"js脚本是运行在pin或jsbox上的程序, 可以方便快捷的更新小良作品","url":"gxq","button":"安装脚本"},{"title":"🔥网购历史价格查询1.4","image":"img/lsjgcx.jpg","rq":"更新：2021年2月16日","details":"历史价格走势图\n支持：淘宝、京东、亚马逊等","url":"wglsjg"},{"title":"🔥free-ss(免费ss)","image":"img/ssjd.jpg","rq":"更新:2021年2月15日","details":"科学上网，请配合 Shadowrocket（小火箭）软件使用","url":"free-ss"}]

var data_yy = [{"title":"Youtube++ - 增强版","image":"img/Youtube.jpg","rq":"更新：2019年4月22日","details":"1080p下载、去视频广告等功能\n⚡️️ v12.44.16      💾96.9MB","url":"Youtube"},{"title":"Filza - 文件管理","image":"img/filza.png","rq":"更新：2019年4月22日","details":"ios11~11.1.2 可查系统文件\n改字体、美化主题、游戏破解、等","url":"FilzaEscaped","button":"点击 - 进入"},{"title":"Twitter++ - 增强版","image":"img/Twitter.jpg","rq":"更新：2019年4月22日","details":"可本地保存图片、视频等功能\n⚡️️ v7.11      💾82.3MB","url":"Twitter"}]

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


