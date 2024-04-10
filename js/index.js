// lei=1   规则
// lei=2   脚本
// lei=3   应用
// lei=4   其他
var color = 101;
function co_sj() {
    if (color == 122) {
        color = 101;
    } else {
        color++;
    }
}

$.get('../../config/data.json','',function (data) {
    // $("#gz").html(kap_cj(data.data.gz, 1));
    // $("#jb").html(kap_cj(data.data.jb, 2));
    $("#yy").html(kap_cj(data.data.yy, 3));
    $("#qt").html(kap_cj(data.data.jc, 4));
})

//新版规则
$.get('https://s3.iphone8.vip/data/rule/shortcuts.json',function (data) {
    $("#gz").html(kap_cj(data, 1));
},'json');

//新版脚本
$.get('https://s3.iphone8.vip/data/js/jsbox.json',function (data) {
    $("#jb").html(kap_cj(data, 2));
},'json');


function kap_cj(data, lei) {
    var txt1 = "";
    for (var i = 0; i < 3; i++) {
        co_sj()
        var arr = data[i]
        if (lei == 4) {
            var an = `window.open('${arr.url}')`
        } else if(lei == 2) {
            var an = `install('${arr.url}|${arr.title}|${arr.img}',2)`
        } else {
            var an = `install('${arr.url}',${lei})`
        }
        var viewVideoBox = ``;
        if (arr.jsurl) {
            viewVideoBox = `<div class="video_icon" id="${arr.jsurl}" onclick="handleVideoClick(event, this)"><img src="./img/jiaocheng3.png" alt=""></div>`
        }
        const author = arr.author == null || arr.author == '' || arr.author == 'null' ? ``:`<p class="author">作者：${arr.author}</p>`;
        txt1 = txt1 + `<div class="col-md-4 row-box" onclick="${an}">
        <div class="kap s${color}">
            <img src="${isImgHttp(arr.img)}">
            <div class="title">
                <h4>${arr.title}</h4>
                <p class="ri">${timestampToTime(arr.rq)}</p>
                ${author}
            </div>
            ${viewVideoBox}
            <div class="sm">
                <p>${arr.sm}</p>
            </div>
        </div>
        </div>`
    }
    return txt1;
}

const isImgHttp = (url) => {
    if (!url) {
        return "./img/jzsb.png";
    } else if (url.includes("https://")) {
        return url;
    } else {
        return "./img/" + url;
    }
}
// 教程按钮事件处理
function handleVideoClick(event, divElement) {
    event.stopPropagation(); // 阻止事件冒泡
    var url = divElement.id;
    window.open(url, '_blank');
}
function install(id, lei) {
    var gz_url = "https://www.icloud.com/shortcuts/" + id;
    var url;

    if (lei == 2) {
        var str = id.replace("🔥","");
        var arr = str.split("|");
        var name = encodeURI(arr[1])
        url = "/jsbox/Install.html?vid=" + arr[0] + "&name=" + name + "&img=" + arr[2];
    }

    if (isios()) {
        if (lei == 1) {
            url = gz_url;
            if (gz_url.indexOf("workflow://") != -1) {
                url = id;
            }
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
            url = "https://ae85.cn" + url
        } else if (lei == 3) {
            url = "https://iphone8.vip/yy.html"
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

// 时间戳转日期
function timestampToTime(timestamp) {
    const date = new Date(+timestamp);
    if (date instanceof Date && !isNaN(date.getTime())) {
        return `更新：${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    }else{
        return timestamp;
    }
}