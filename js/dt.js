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
var data_bj = [{ "title": "电脑软件记录", "image": "img/web.jpg", "rq": "软件集合", "details": "个人使用", "url": "电脑工具" }, ]


function kap_cj(data) {
    var txt1 = "";
    for (var i = 0; i < data.length; i++) {
        co_sj()
        var arr = data[i]
        if (arr.url.indexOf('.html') !== -1) {
            var bot = arr.url
        } else {
            var bot = `dosc/daotu.html?vid=${arr.url}&name=${arr.title}`
        }
        txt1 = txt1 + `<div class="col-md-4" onclick="window.open('${bot}')">
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




