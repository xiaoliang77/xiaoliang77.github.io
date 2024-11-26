// lei=1   规则
// lei=2   脚本
// lei=3   应用
// lei=4   其他
var color = 108;
function co_sj() {
    if (color == 122) {
        color = 101;
    } else {
        color++;
    }
}

$.get('../../config/jsbox.json','',function (data) {
    $("#qt").html(kap_cj(data.data.jc));
})

function kap_cj(data){
    var txt1 = "";
    for (var i = 0; i < data.length; i++) {
        co_sj()
        var arr = data[i]
        txt1 = txt1 + `<div class="col-md-4" onclick="window.open('${arr.url}')">
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
$("#qt").html(kap_cj(data_qt));