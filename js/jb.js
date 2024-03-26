var color = 106;
function co_sj() {
    if (color == 112) {
        color = 101;
    } else {
        color++;
    }
}

$.get('../../config/data.json','',function (data) {
    $("#jb").html(kap_cj(data.data.jb));
})

function kap_cj(data){
    var txt1 = `<div class="col-md-4 row-box" onclick="install('')">
    <div class="kap s105">
        <img src="./img/xl.png">
        <div class="title">
            <h4>🔥小良 - 更新器 v3.1 Js版</h4>
            <p class="ri">更新：2023年10月21日</p>
        </div>
        <div class="video_icon" id="https://mp.weixin.qq.com/s/UJi4tePycqadcPD22Hprag" onclick="handleVideoClick(event, this)"><img src="./img/jiaocheng3.png" alt=""></div>
        <div class="sm">
            <p>js脚本是运行在pin或jsbox上的程序, 可以方便快捷的更新小良作品</p>
        </div>
    </div>
    </div>`
    for (var i = 0; i < data.length; i++) {
        co_sj()
        var arr = data[i]
        var viewVideoBox = ``;
        if (arr.jsurl) {
            viewVideoBox = `<div class="video_icon" id="${arr.jsurl}" onclick="handleVideoClick(event, this)"><img src="./img/jiaocheng3.png" alt=""></div>`
        } 
        txt1 = txt1 + `<div class="col-md-4 row-box" onclick="install('${arr.url}|${arr.title}|${arr.img}')">
        <div class="kap s${color}">
            <img src="./img/${arr.img}">
            <div class="title">
                <h4>${arr.title}</h4>
                <p class="ri">${arr.rq}</p>
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


// 教程按钮事件处理
function handleVideoClick(event, divElement) {
    event.stopPropagation(); // 阻止事件冒泡
    var url = divElement.id;
    window.open(url, '_blank');
}

function install(data) {
    var str = data.replace("🔥","");
    var arr = str.split("|");
    var name = encodeURI(arr[1])
    var url = "/jsbox/Install.html?vid=" + arr[0] + "&name=" + name + "&img=" + arr[2];

    if (isios()) {
        window.open(url,'_blank');
    } else {
        $("#qrcode").empty();
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            width: 230,
            height: 230,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        var turl = "https://" + window.location.host;
        qrcode.makeCode(turl+url);
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