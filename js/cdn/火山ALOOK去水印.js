/*火山视频下载*/
function getMusicUrl () {
	var douyinUrl = "http://service.shipin.totootool.com/shipin";
	var url=location.href
	var content=JSON.stringify({"sourceUrl":url,"videoType":3});
    var xhr = new XMLHttpRequest();
	xhr.open("POST",douyinUrl,true);
	xhr.setRequestHeader('Referer','http://huoshan.totootool.com/');
    xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8');
	xhr.setRequestHeader('Origin','http://huoshan.totootool.com');
	xhr.send(content);
	xhr.onreadystatechange = function (e) {
		if (this.status == 200 && this.readyState == 4) {
			var json=JSON.parse(xhr.responseText);
			 location.href=json.data.videoUrls["0"];
		}
	};
};
function createDownKuaishouMusic() {
		var downBtn = document.createElement("div");
		downBtn.id = "downBtn";
		downBtn.onclick = function () {
			getMusicUrl();
		};
		downBtn.innerHTML = "去水印下载";
		downBtn.setAttribute("style","font-size:4vw !important;width:30vw !important;height:10vw !important;line-height:10vw !important;text-align:center !important;background-color:#f40 !important;box-shadow:0px 1px 10px rgba(0,0,0,0.5) !important;color:#fff !important;position:fixed !important;top:15vh !important;right:5vw !important;z-index:999999 !important;border-radius:1vw !important;display:block !important;");
		document.body.appendChild(downBtn);
};
if (location.href.match("enoxacin.net") || location.href.match("huoshan.com")|| location.href.match("enoxacin.com")) {
	createDownKuaishouMusic();
};