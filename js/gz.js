var color = 100;
function co_sj() {
    if (color == 112) {
        color = 101;
    } else {
        color++;
    }
}

$.get('../../config/data.json','',function (data) {
    $("#gz").html(kap_cj(data.data.gz));
})

function kap_cj(data) {
    var txt1 = "";
    for (var i = 0; i < data.length; i++) {
        co_sj()
        var arr = data[i]
        txt1 = txt1 + `<div class="col-md-4" onclick="install('${arr.url}')">
        <div class="kap s${color}">
            <img src="./img/${arr.img}">
            <div class="title">
                <h4>${arr.title}</h4>
                <p class="ri">${arr.rq}</p>
            </div>
            <div class="sm">
                <p>${arr.sm}</p>
            </div>
        </div>
        </div>`
    }
    return txt1;
}

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


