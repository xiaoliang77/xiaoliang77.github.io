/*
狩都高速 1.1
2018.10.30 修复更新
 by：iPhone 8、小良
 https://ae85.cn/
*/
var me = [
  { "name": "最新资源", "id": "/new/1.html?new=1" },
  { "name": "人气热门", "id": "/hot/1.html?hot=1" },
  { "name": "每日红包", "id": "alipays://platformapi/startapp?appId=20000067&__open_alipay__=YES&url=https%3A%2F%2Frender.alipay.com%2Fp%2Ff%2Ffd-j6lzqrgm%2Fguiderofmklvtvw.html%3Fchannel%3DqrCode%26shareId%3D2088202699097532%26sign%3DAFml1OwpzCQC4IVlQHEDQ0LKkXiaDFyESl0GCk43ahU%253D%26scene%3DofflinePaymentNewSns%26campStr%3Dp1j%252BdzkZl018zOczaHT4Z5CLdPVCgrEXq89JsWOx1gdt05SIDMPg3PTxZbdPw9dL%26token%3Dc1x08164vrc0u6jhg7oslac"}
];
$ui.render({
  props: {
    title: "狩都高速 1.1"
  },
  views: [{
    type: "menu",
    props: {
      id: "menu",
      items: me.map(function (item) {
        return item.name;
      })
    },
    layout: function (make) {
      make.left.top.right.equalTo(0);
      make.height.equalTo(50);
    },
    events: {
      changed: function (sender) {
        if (sender.index == "2") {
          $app.openURL(me[sender.index].id)
        } else {
        $cache.set("type", me[sender.index].id);
        $cache.set("page", 1);
        getdata();
      }
     }
    }
  },
  {
    type: "matrix",
    props: {
      id: "Video",
      itemHeight: 280,
      columns: 2,
      spacing: 5,
      template: [{
        type: "image",
        props: {
          id: "img",
          radius: 3
        },
        layout: function (make, view) {
          make.centerX.equalTo(view.super);
          make.top.bottom.right.left.inset(3);
        }
      }]
    },
    layout: function (make) {
      make.top.equalTo($("menu").bottom);
      make.bottom.left.right.inset(0);
    },
    events: {
      didSelect: function (sender, indexPath, data) {
        geturl(data.url);
      },
      didReachBottom: function (sender) {
        sender.endFetchingMore();
        var page = $cache.get("page") + 1;
        $cache.set("page", page);
        // var type = $cache.get("type");
        getdata();

      }
    }
  },
  ]
});

function csh() {
  $ui.loading(true);
  $http.get({
    url: $text.base64Decode(
      "aHR0cHM6Ly9naXRlZS5jb20veWFvMDcvdXBkYXRlX2RldmljZS9yYXcvbWFzdGVyL3NkZ3MuanNvbg=="
    ),
    handler: function (resp) {
      $ui.loading(false);
      if (resp.response.statusCode == "200") {
        var info = resp.data;
        console.log(info.gg)
        $cache.set("info", info);
        if (info.bb != "1.1") {
          $ui.alert({
            title: "温馨提示",
            message: info.gxsm,
            actions: [{
              title: "进入官网",
              handler: function () {
                $app.openURL(info.gw);
              }
            },
            {
              title: "关注公众号",
              handler: function () {
                $ui.alert({
                  title: "温馨提示",
                  message: "跳转微信会自动复制公众号ID\n请跳转到微信-搜索-公用号-粘贴-关注",
                  actions: [{
                    title: "跳转微信",
                    handler: function () {
                      $clipboard.text = "ae85-cn";
                      $app.openURL("weixin://");
                    }
                  },
                  {
                    title: "取消"
                  }
                  ]
                });
              }
            }
            ]
          });
        } else {
          $cache.set("page", 1);
          $cache.set("type", me[0].id);
          turl = $text.base64Decode(info.turl);
          getdata();
        }
      } else {
        $ui.alert("加载失败");
      }
    }
  });
}
var turl;
csh();

function getdata() {
  var page = $cache.get("page");
  var type = $cache.get("type");
  $ui.loading(true);
  $http.get({
    url: turl + "/portal/index/search"+type+"&page="+page,
    handler: function (resp) {
      $ui.loading(false);
      var arr = resp.data;
      var html = arr.replace(/\n|\s|\r/g, "");
      var te = html.match(/<ulid=\"works\"[\s\S]*?<\/ul>/)[0];
      var li = te.match(/<li><ahref=\S*?<\/a>/g);
      if(page==1){
        var data = [];
      }else{
        var data = $("Video").data;
      }
      for (i in li) {
        dli = li[i];
        data.push({
          img: {
            src: dli.match(/<imgsrc=\"(\S*?)\"/)[1]
          },
          url: dli.match(/detail\/id\/(\S*?).htm/)[1]
        });
      }
      $("Video").data = data;
      $("Video").endRefreshing();
    }
  });
}

function geturl(id) {
  $ui.loading(true);
  $http.get({
    url: turl + "/portal/index/ajax_get_js.html?id=" + id,
    handler: function (resp) {
      $ui.loading(false);
      var arr = resp.data;
      var fg1=arr.split("p}('")[1]
      var fg2=fg1.split("}});")[0]+"}});";
      var k = "|"+arr.match(/\,\'\|(\S*?).split/)[1];
      var tk = k.split('|');
      var ac = arr.match(/\}\)\;\'\,(\S*?)\,/)[1];
      urljs(tk,ac,fg2)
    }
  });
}

function urljs(tk,ac,fg2) {
  var aa = function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}(fg2,ac,ac,tk,0,{});
  var url = aa.match(/url:\\\'(\S*?)\\\'/)[1];
  url =url.replace(/\'/g, "");
  play(url)
}

function play(url) {
  $ui.push({
    props: {
      title: "狩都高速 1.1"
    },
    views: [{
      type: "web",
      props: {
        id: "bof",
        url: url
      },
      layout: $layout.fill
    },
    ]
  });
}
