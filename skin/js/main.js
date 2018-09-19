var isCydia = navigator.userAgent.search(/Cydia/);
var isHistory = window.location.href.search(/nohistory/);
var isAdv = window.location.href.search(/advertisement/);
function loadPackages() {
	var offset = 0;
	offset = document.getElementById("section").children.length;
	$.ajax({
		type: 'GET',
		url: siteurl + 'index.php?pid=' + $('#loadmore').attr("name") + '&method=more' + '&offset=' + offset,
		dataType: 'html',
		cache: true,
		success: function (data) {
			if ($(data).length < 10) {
				$('#loadmore').fadeOut();
			}
			if (data.length != 0) {
				$('#section').append(data);
			}
		}
	});
}
function setCookie(c_name, value, expiredays) {
	var exdate = new Date()
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}
function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) { 
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) {
				c_end = document.cookie.length;
			}
    	return unescape(document.cookie.substring(c_start, c_end));
		} 
	}
	return "";
}
function hide() {
	if ($("#advertisement")[0]) {
		$("#advertisement").fadeOut();
		setCookie("hideadv", "yes", 1);
	}
}
function show() {
	if (getCookie("hideadv") == "yes" && $("#advertisement")[0]) {
		document.getElementById("advertisement").style.display = "none";
	}
}
if (isCydia != -1) {
	document.body.classList.add("cydia");
} else {
	if ($("#cydialink")[0]) {
		document.getElementById("cydialink").style.display = "";
	}
	if ($("#downloadlink")[0]) {
		document.getElementById("downloadlink").style.display = "";
	}
}
if (isHistory != -1 || isCydia == -1) {
	if ($("#header")[0]) {
		document.getElementById("header").style.display = "";
	}
	if ($("#contact")[0]) {
		document.getElementById("contact").style.display = "";
	}
	if ($("#reportlink")[0]) {
		document.getElementById("reportlink").style.display = "none";
	}
	if ($("#advertisement")[0]) {
		document.getElementById("advertisement").style.display = "none";
	}
	if ($("#footer")[0]) {
		document.getElementById("footer").style.display = "";
	}
}
if (isHistory != -1) {
	if ($("#reportlink")[0]) {
		document.getElementById("reportlink").style.display = "none";
	}
	if ($("#historylink")[0]) {
		document.getElementById("historylink").style.display = "none";
	}
}
if (isAdv != -1) {
	if ($("#advertisement")[0]) {
		document.getElementById("advertisement").style.display = "none";
	}
}
if ($("#scroller")[0]) {
	new iScroll(document.getElementById("scroller"));
}
if ($("#loadmore")[0]) {
	loadPackages();
}
show();
//pic
$("div.pic-box").height($("li#fuck5h").height())
        fuck5hous.onload = function() {

        	//$("div.pic-box").height($("li#fuck5h0").height())
            $("div.pic-box").height($("li#fuck5h").height())
        }
		window.onresize =function(){
			$("div.pic-box").height($("li#fuck5h").height())
			
		}
$("div.pic-box > ul > li").eq(0).show().siblings("li").hide();
$("div.triggers > a").mouseover(function(){
            clearInterval(timer);
            var _index = $(this).index();
            $(this).addClass("current").siblings().removeClass("current");
            $("div.pic-box > ul > li").eq(_index).fadeIn(1000).siblings("li").fadeOut(1000);
    });
$("div.triggers > a").mouseout(function(){
	autoplay();
});
var _index = 0;
var timer = null;
function autoplay(){
	timer=setInterval(function(){
		_index++;
		if(_index<5){
			$("div.triggers > a").eq(_index).addClass("current").siblings().removeClass("current");
			$("div.pic-box > ul > li").eq(_index).fadeIn(1000).siblings("li").fadeOut(1000);
		}else{
			_index=0;
			$("div.triggers > a").eq(_index).addClass("current").siblings().removeClass("current");
			$("div.pic-box > ul > li").eq(_index).fadeIn(1000).siblings("li").fadeOut(1000);
		}
	},5000);
};
autoplay();
//sina
var web = 'http://m.weibo.cn/u/3979408554';
var app = 'sinaweibo://userinfo?uid=3979408554';
	function adClick(web,app) {
		window.open(web);
		window.location = app;
};

