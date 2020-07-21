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
var data_gz = [{"title":"小良 - 更新器 3.5 (规则)","image":"img/xiaoliang.png","rq":"更新：2019年4月24日","details":"内置：Wf规则、Pin脚本、破解App 等\n此规则只用于更新小良个人规则","url":"a261538eb87b4f989f8b48d46b4a87bb"},{"title":"🔥Pornhub视频下载","image":"img/down.png","rq":"更新：2020年7月12日","details":"可设置默认下载方式，支持调用手机迅雷自动创建下载任务","url":"acef5f74051c47069d62e7e515a32a15"},{"title":"🔥剪贴板文字转语音v1.0","image":"img/yuyin.png","rq":"群友：深巷旧港丶 提供","details":"将剪贴板文字转语音以mp3形式导出，可以配合MP3转音乐插件使用","url":"14dd1649dc434a4da128de39433bc350"}]

var data_jb = [{"title":"小良 - 更新器 v2.6 Js版","image":"img/xl.png","rq":"更新：2019年1月27日","details":"js脚本是运行在pin或jsbox上的程序, 可以方便快捷的更新小良作品","url":"gxq","button":"安装脚本"},{"title":"🔥诺基亚短信图片生成器","image":"img/zzkia.png","rq":"发布：2020年7月20日","details":"这是一个娱乐脚本","url":"zzkia"},{"title":"🔥短视频下载器 2.8","image":"img/dsp.png","rq":"更新：2020年7月1日","details":"修复：部分解析失败平台，新增YouTube视频下载。","url":"dsp"}]

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


