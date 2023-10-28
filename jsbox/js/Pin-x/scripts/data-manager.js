// CloudDataPath = "drive://Pin-x.json";
// if ($file.read(CloudDataPath)) {
//   LocalData = JSON.parse($file.read(CloudDataPath).string);
//   //LocalList = LocalData.fav.map(i=>i)
// } else {
//   LocalData = { "fav": [] };
//   //LocalList = [];
// }

LocalData = { "fav": [] };
var apiUrl = "http://3v.ae85.cn/jiantieban/"

var helper = require("./helper");

function get_yundata() {
  $ui.toast("获取云端数据中···", 0.3);
  $ui.loading(true);
  $http.get({
    url: apiUrl,
    handler: function (resp) {
      $ui.loading(false);
      var data = resp.data;
      LocalData = { "fav": [] };
      for (i in data.conts) {
        LocalData.fav.push($text.URLDecode($text.base64Decode(data.conts[i])))
      }
      mode = "cloud";
      initData(mode)
      console.log(LocalData);
    }
  });
}



function set_yunduan(nr,cid,idx){
  $http.post({
    url: apiUrl,
    header: {
      "Content-Type":"application/x-www-form-urlencoded"
    },
    body: {
      conts:$text.base64Encode($text.URLEncode(nr)),
      operate:cid,
      idx:idx
    },
    handler: function(resp) {
      var data = resp.data;
      console.log(data);
      
      if (cid == 2) {
        cl_ydData(data)
        console.log(LocalData);
        $ui.toast("删除成功！", 0.3);
        return;
      } else if(cid==1){
        cl_ydData(data)
        $ui.toast("上传成功！", 0.3);
      }



    }
  });

}

function cl_ydData(data){
  LocalData = { "fav": [] };
  for (i in data.conts) {
    LocalData.fav.push($text.URLDecode($text.base64Decode(data.conts[i])))
  }
  $("fav").icon = $icon("091", $color("#ed9e31"), $size(18, 18));
  mode = "cloud";
  initData(mode)
}

function init(mode = "clip") {
  var text = $clipboard.text;
  if (text == undefined || text.length == 0) {
    return;
  }

  var items = getTextItems(mode);
  var index = items.indexOf(text);

  if (index != -1) {
    helper.arrayRemove(items, index);
  }

  items.unshift(text);
  setTextItems(items, mode);
}

function getTextItems(mode = "clip") {
  // console.log($cache.get("clipboard-items"));
  if (mode == "clip") return $cache.get("clipboard-items") || [];
  else return LocalData.fav;
}

function setTextItems(items, mode = "clip") {
  if (mode == "clip") $cache.set("clipboard-items", items);
  else {
    LocalData.fav = items;
    // writeCloud();
  }
}

function clearTextItems(mode = "clip") {
  if (mode == "clip") $cache.remove("clipboard-items");
  else {
    LocalData.fav = [];
    // writeCloud();
  }
}

function defaultActionItems() {
  return JSON.parse($file.read("assets/actions.json").string);
}

function getActionItems() {
  return (
    $cache.get("action-items") || [
      {
        "pattern": "delete:",
        "icon": "icon_027.png",
        "noenc": false,
        "name": "删除最后一张-删除多张"
      },
      {
        "pattern": "pin://gifsender?src=auto",
        "icon": "icon_016.png",
        "noenc": false,
        "name": "pin抓图-下载工具"
      },
      {
        "pattern": "editPhoto:",
        "icon": "icon_025.png",
        "noenc": false,
        "name": "编辑图形-识别二维码"
      },
      {
        "pattern": "searchImage:",
        "icon": "icon_014.png",
        "noenc": false,
        "name": "搜图-图床"
      },
      {
        "pattern": "url_convert",
        "icon": "icon_163.png",
        "noenc": false,
        "name": "链接转换-编码转换"
      },
      {
        "pattern": "pushbullet:",
        "icon": "icon_190.png",
        "noenc": false,
        "name": "快捷支付"
      },
      {
        "pattern": "keyboard:",
        "icon": "icon_010.png",
        "noenc": false,
        "name": "特殊符号-编码工具"
      },
      {
        "name": "大小写金额-汇率查询",
        "pattern": "renmb:",
        "icon": "icon_146.png",
        "noenc": false
      },
      {
        "name": "翻译 - 词典",
        "pattern": "dic:",
        "icon": "icon_024.png"
      }
    ]
  );
}

function setActionItems(items) {
  $cache.set("action-items", items);
}

function getSearchEngine() {
  return $cache.get("search-engine") || "x-web-search://?";
}

function setSearchEngine(engine) {
  $cache.set("search-engine", engine);
}

// function writeCloud() {
//   $file.write({
//     data: $data({ string: JSON.stringify(LocalData) }),
//     path: CloudDataPath
//   });
// }

function initData(mode = "clip") {
  $("clipboard-list").data = [];
  if (mode == "clip") var textItems = getTextItems();
  else {
    var textItems = LocalData.fav.map(i => i);
  }
  textItems.map(function (i) {
    let flag = i.indexOf("\n") >= 0;
    $("clipboard-list").data = $("clipboard-list").data.concat({
      label: {
        text: i,
        textColor: flag ? $color("#325793") : $color("black")
      }
    });
  });
}


function copied2Clip(text) {
  $clipboard.set({ "type": "public.plain-text", "value": text });
  if (($app.env == $env.today)) {
    $("input").text = $clipboard.text;
    var items = getTextItems();
    if (items.indexOf(text) === -1 && text.length > 0) {
      items.unshift(text);
      $("clipboard-list").insert({ "index": 0, "value": text });
      setTextItems(items);
      var builder = require("./builder");
      builder.reloadTextItems();
    } else return;
  } else return;
}



module.exports = {
  init: init,
  getTextItems: getTextItems,
  setTextItems: setTextItems,
  clearTextItems: clearTextItems,
  defaultActionItems: defaultActionItems,
  getActionItems: getActionItems,
  setActionItems: setActionItems,
  getSearchEngine: getSearchEngine,
  setSearchEngine: setSearchEngine,
  initData: initData,
  // writeCloud: writeCloud,
  copied2Clip: copied2Clip,
  get_yundata: get_yundata,
  set_yunduan:set_yunduan
};
