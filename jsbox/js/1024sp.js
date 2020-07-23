/*
2020年7月24日 更新
脚本仅供代码学习，请勿分享。非法传播照成法律问题与作者无关。

by：iPhone 8、小良
https://ae85.cn/
*/

$cache.set("id", "18");
$cache.set("pg", 1);
var urlt = $text.base64Decode("aHR0cHM6Ly82N3Rhbmcuc2l0ZS8=");

var data = [
  { name: "国产自拍", id: "18" },
  { name: "亚洲无码", id: "19" },
  { name: "亚洲有码", id: "20" },
  { name: "中文字幕", id: "21" },
  { name: "欧美专区", id: "22" },
  { name: "卡通动漫", id: "23" },
  { name: "福利写真", id: "24" },
  { name: "三级经典", id: "25" },
];

$ui.render({
  props: {
    title: "1024视频"
  },
  views: [
    {
      type: "menu",
      props: {
        id: "meun",
        items: data.map(function (item) {
          return item.name;
        })
      },
      layout: function (make) {
        make.left.top.right.equalTo(0);
        make.height.equalTo(50);
      },
      events: {
        changed: function (sender) {
          $cache.set("id", data[sender.index].id);
          $cache.set("pg", 1);
          getdata();
        }
      }
    },
    {
      type: "list",
      layout: function (make) {
        make.right.left.bottom.inset(0);
        make.top.equalTo($("meun").bottom);
      },
      events: {
        didSelect: function (sender, indexPath, data) {
          var id = data.split("\n");
          geting(id[1], id[0]);
        },
        didReachBottom: function (sender) {
          sender.endFetchingMore();
          var page = $cache.get("pg") + 1;
          $cache.set("pg", page);
          getdata();
        }
      }
    }
  ]
});

function getdata() {
  var id = $cache.get("id");
  var pg = $cache.get("pg");
  $ui.loading(true);
  $http.get({
    url: urlt + "forum-" + id + "-" + pg + ".html",
    handler: function (resp) {
      $ui.loading(false)
      var text = resp.data.replace(/\n|\s|\r/g, "")
      var shu = text.match(/class=\"ccl\">(\S*?)<\/div>/g)
      if (pg == 1) {
        var data = []
      } else {
        var data = $("list").data
      }
      for (i in shu) {
        var a = shu[i]
        var mc = a.match(/title=\"(\S*?)\"/)[1]
        var id = a.match(/href=\"(\S*?)\"/)[1]
        data.push(mc + "\n" + id)
      }
      $("list").data = data
      $("list").endFetchingMore()
    }
  });
}

getdata();

function geting(id, mc) {
  $ui.loading(true)
  $http.get({
      url: urlt + id,
      handler: function (resp) {
          $ui.loading(false)        
          var text = resp.data.replace(/\n|\s|\r/g, "")
          var url = text.match(/video:\{url:\'(\S*?)\'/)[1]
          $ui.push({
              props: {
                  title: mc
              },
              views: [{
                  type: "web",
                  props: {
                      url: url,
                  },
                  layout: $layout.fill
              }]
          })
      }
  })
}
