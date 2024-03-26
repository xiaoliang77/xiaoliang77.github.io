var color = 100;
function co_sj() {
    if (color == 122) {
        color = 101;
    } else {
        color++;
    }
}


$.getJSON('http://flex.ae85.cn/getdata.php?key=ae85',function(json){
// console.log(json);
$("#flex3").html(kap_cj(json.data));
})

function kap_cj(data) {
    var txt1 = "";
    for (var i = 0; i < data.length; i++) {
        co_sj()
        var arr = data[i]
        txt1 = txt1 + `<div class="col-md-4">
        <div class="flex s${color}">
            <div class="title">
                <h4>${arr.name}</h4>
                <p class="ri">${arr.time}</p>
                <p class="zz">上传作者：${arr.author}</p>
            </div>
            <div class="down"><a href="${arr.url}" target="_blank" >下载</a></div>
        </div>
        </div>`
    }
    return txt1;
}