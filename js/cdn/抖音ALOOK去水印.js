/*快手视频下载*/
function getMusicUrl () {
	var douyinUrl = "http://service.shipin.totootool.com/shipin";
	var url=location.href;

	var url=url.replace(/https\:\/\//,"http://");
	console.log(url)
	var content=JSON.stringify({"sourceUrl":url,"videoType":1});
    var xhr = new XMLHttpRequest();
	xhr.open("POST",douyinUrl,true);
    xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8');
	xhr.setRequestHeader('Origin','http://douyin.totootool.com');
	xhr.setRequestHeader('Referer','http://douyin.totootool.com/');
	xhr.send(content);
	xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && 200 == xhr.status){
			var json=JSON.parse(xhr.responseText);
			 //window.open(json.data.videoUrls["0"], '_blank');
			location.href=json.data.sourceUrl;
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
if (location.href.match("iesdouyin.com")) {
	createDownKuaishouMusic();
};

