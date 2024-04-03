var color = 100;
function co_sj() {
    if (color == 122) {
        color = 101;
    } else {
        color++;
    }
}

// $.get('../../config/data.json', '', function (data) {
//     $("#gz").html(kap_cj(data.data.gz));
// })

$.get('https://s3.iphone8.vip/data/rule/shortcuts.json',function (data) {
    $("#gz").html(kap_cj(data));
},'json');

function kap_cj(data) {
    var txt1 = "";
    for (var i = 0; i < data.length; i++) {
        co_sj()
        var arr = data[i]
        var viewVideoBox = ``;
        if (arr.jsurl) {
            viewVideoBox = `<div class="video_icon" id="${arr.jsurl}" onclick="handleVideoClick(event, this)"><img src="./img/jiaocheng3.png" alt=""></div>`
        }
        const author = arr.author == null || arr.author == '' || arr.author == 'null' ? ``:`<p class="author">作者：${arr.author}</p>`;
        txt1 = txt1 + `<div class="col-md-4 row-box" onclick="install('${arr.url}')">
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

// 判断图片是否是网络图片
const isImgHttp = (url) => {
    if (!url) {
        return "./img/shortcuts.png";
    } else if (url.includes("https://")) {
        return url;
    } else {
        return "./img/" + url;
    }
}

//阻止事件冒泡
function handleVideoClick(event, divElement) {
    event.stopPropagation(); // 阻止事件冒泡
    var url = divElement.id;
    window.open(url, '_blank');
}

// 安装快捷指令
function install(id) {
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

// 判断是否是ios
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