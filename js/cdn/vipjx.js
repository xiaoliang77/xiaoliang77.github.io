var youku =
    '<span style="display:block;float:left;width:5vw;height:5vw;font-size:2.5vw;color:#fff;line-height:5vw;text-align:center;border-radius:100%;box-shadow:0px 0px 3px #a9a9a9;background:#0078FF;margin:3.78vw 2.1vw;">优</span>'

var qq =
    '<span style="display:block;float:left;width:5vw;height:5vw;font-size:2.5vw;color:#fff;line-height:5vw;text-align:center;border-radius:100%;box-shadow:0px 0px 3px #a9a9a9;background:#0078FF;margin:3.78vw 2.1vw;">腾</span>'

var nothing =
    '<span style="display:block;float:left;width:5vw;height:5vw;font-size:2.5vw;color:#fff;line-height:5vw;text-align:center;border-radius:100%;box-shadow:0px 0px 3px #a9a9a9;background:transparent;margin:3.78vw 2.1vw;">综</span>'

var apis = [{
        name: nothing + "百域阁",
        url: "http://api.baiyug.cn/vip/index.php?url=",
        title: "转圈圈就换线路"
    }, {
        name: qq + "vParse",
        url: "https://api.vparse.org/?url=",
        title: "支持腾讯"
    }, {
        name: qq + "猫云",
        url: "https://jx.maoyun.tv/index.php?id=",
        title: "支持腾讯"
    }, {
        name: youku + "搜你妹",
        url: "http://www.sonimei.cn/?url=",
        title: "综合接口"
    }, {
        name: nothing + "噗噗电影",
        url: "http://pupudy.com/play?make=url&id=",
        title: "综合接口，破解全网"
    }, {
        name: youku + "抢先影院",
        url: "http://www.qxyingyuan.vip/play?make=url&id=",
        title: "据说优酷比较稳定"
    }, {
        name: nothing + "酷绘",
        url: "http://appapi.svipv.kuuhui.com/svipjx/liulanqichajian/browserplugin/qhjx/qhjx.php?id=",
        title: "综合接口"
    }, {
        name: nothing + "旋风解析",
        url: "http://api.xfsub.com/index.php?url=",
        title: "1905优先使用"
    }, {
        name: nothing + "石头解析",
        url: "https://jiexi.071811.cc/jx.php?url=",
        title: "手动点播放"
    }, {
        name: nothing + "无名小站",
        url: "http://www.sfsft.com/admin.php?url=",
        title: "无名小站同源"
    }, {
        name: nothing + "VIP看看",
        url: "http://q.z.vip.totv.72du.com/?url=",
        title: "更换线路成功率会提高"
    }, {
        name: nothing + "ODFLV",
        url: "http://aikan-tv.com/?url=",
        title: "不稳定，广告过滤软件可能有影响"
    }, {
        name: nothing + "163人",
        url: "http://jx.api.163ren.com/vod.php?url=",
        title: "偶尔支持腾讯"
    }, {
        name: nothing + "CKFLV",
        url: "http://www.0335haibo.com/tong.php?url=",
        title: "CKFLV云,部分站点不支持"
    }, {
        name: nothing + "无名小站2",
        url: "http://www.wmxz.wang/video.php?url=",
        title: "转圈圈就换线路"
    }, {
        name: nothing + "眼睛会下雨",
        url: "http://www.vipjiexi.com/yun.php?url=",
        title: "www.vipjiexi.com"
    }, {
        name: youku + "1008影视",
        url: "http://api.1008net.com/v.php?url=",
        title: "据说可以看布袋游戏视频"
    }, {
        name: nothing + "人人发布",
        url: "http://v.renrenfabu.com/jiexi.php?url=",
        title: "综合，多线路"
    }];


//添加链接

function createSelect(apis) {
    var myul = document.createElement("ul");
    myul.id = "myul";
    myul.setAttribute("style",
        "display:none;background:#fff;box-shadow:0px 1px 10px rgba(0,0,0,0.3);margin:0;padding:0 4.2vw;position:fixed;bottom:17vh;right:6vw;z-index:99999;height:70vh;overflow:scroll;border-radius:1.26vw;");
    for (var i = 0; i < apis.length; i++) {
        var myli = document.createElement("li");
        var that = this;
        myli.setAttribute("style",
            "margin:0;padding:0;display:block;list-style:none;font-size:4.2vw;width:30.6vw;text-align:left;line-height:12.6vw;letter-spacing:0;border-bottom:1px solid #f0f0f0;position:relative;overflow:hidden;text-overflow:hidden;white-space:nowrap;");
        (function (num) {
            myli.onclick = function () {
                window.open(apis[num].url + location.href, '_blank');
            };
            myli.ontouchstart = function () {
                this.style.cssText += "color:yellow;background:#373737;border-radius:1.26vw;";
            }
            myli.ontouchend = function () {
                this.style.cssText += "color:black;background:transparent;border-radius:0;";
            }
        })(i);
        myli.innerHTML = apis[i].name;
        myul.appendChild(myli);
    }
    document.body.appendChild(myul);
}

//唤出菜单

function createMenu() {
    var myBtn = document.createElement("div");
    myBtn.id = "myBtn";
    myBtn.innerHTML = "";
    myBtn.setAttribute("style",
     "width:10vw;height:10vw;position:fixed;bottom:10vh;right:6vw;z-index:100000;border-radius:100%;text-align:center;line-height:10vw;box-shadow:0px 1px 10px rgba(0,0,0,0.3);font-size:6vw;background:#fff;");
    myBtn.onclick = function () {
        var myul = document.getElementById("myul");
        if (myul.style.display == "none") {
            myul.style.display = "block";
            this.style.transform = "rotateZ(45deg)";
        } else {
            myul.style.display = "none";
            this.style.transform = "rotateZ(0deg)";
        }
    }
    document.body.appendChild(myBtn);
}
/*document.addEventListener("DOMContentLoaded",function () {
	createMenu();
	createSelect(apis);
});*/
if (location.href.match(".iqiyi.com") || location.href.match(".youku.com") || location.href.match(".le.com") ||
    location.href.match(".letv.com") || location.href.match("v.qq.com") || location.href.match("film.qq.com") || location.href.match(".tudou.com") ||
    location.href.match(".mgtv.com") || location.href.match("film.sohu.com") || location.href.match("tv.sohu.com") ||
    location.href.match(".acfun.cn") || location.href.match(".bilibili.com") || location.href.match(".pptv.com") ||
    location.href.match("vip.1905.com") || location.href.match(".yinyuetai.com") || location.href.match(".fun.tv") ||
    location.href.match(".56.com") || location.href.match(".wasu.cn")) {
    createMenu();
    createSelect(apis);
}