/*kuaishou无水印音视频下载*/

function getMusicUrl () {
	var douyinUrl = "http://service.shipin.totootool.com/shipin";
	var url=location.href
	//var url="http://www.gifshow.com/s/bpY339Sa"
	var content=JSON.stringify({"sourceUrl":url,"videoType":2});
    var xhr = new XMLHttpRequest();
	xhr.open("POST",douyinUrl,true);
	xhr.setRequestHeader('Referer','http://kuaishou.totootool.com/');
    xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8');
	xhr.setRequestHeader('Origin','http://kuaishou.totootool.com');
	xhr.send(content);
	xhr.onreadystatechange = function (e) {
		if (this.status == 200 && this.readyState == 4) {
			var json=JSON.parse(xhr.responseText)
			console.log(json.data.videoUrls["0"]);
		}
	};
};
getMusicUrl ()

getMusicUrl(location.href);
