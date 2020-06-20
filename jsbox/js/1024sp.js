/*
2020年6月7日 更新
脚本仅供代码学习，请勿分享。非法传播照成法律问题与作者无关。

by：iPhone 8、小良
https://ae85.cn/
*/

$cache.set("id", "29");
$cache.set("pg", 1);
var urlt = "https://k5.7086xz.xyz/";
var data = [
  { name: "中文字幕", id: "29" },
  { name: "日韩无码", id: "27" },
  { name: "日韩有码", id: "28" },
  { name: "国产原创", id: "49" },
  { name: "国产自拍", id: "25" },
  { name: "欧美极品", id: "26" },
  { name: "强奸乱伦", id: "34" },
  { name: "高潮喷次", id: "38" },
  { name: "巨乳大奶", id: "19" }
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
        items: data.map(function(item) {
          return item.name;
        })
      },
      layout: function(make) {
        make.left.top.right.equalTo(0);
        make.height.equalTo(50);
      },
      events: {
        changed: function(sender) {
          $cache.set("id", data[sender.index].id);
          $cache.set("pg", 1);
          getdata();
        }
      }
    },
    {
      type: "list",
      layout: function(make) {
        make.right.left.bottom.inset(0);
        make.top.equalTo($("meun").bottom);
      },
      events: {
        didSelect: function(sender, indexPath, data) {
          var id = data.split("\n");
          geting(id[1], id[0]);
        },
        didReachBottom: function(sender) {
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
  $http.post({
    url: $text.base64Decode("aHR0cDovL20uc2UwNC54eXovaW5kZXgvR2V0L2ZpbG1DYXRlVmlkZW8="),
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: {
      id: id,
      page: pg,
      token: "cL313FN891L8Sfh851"
    },
    handler: resp => {
      $ui.loading(false);
      var json = resp.data.data.vdieos;
      if (pg == 1) {
        var data = [];
      } else {
        var data = $("list").data;
      }
      for (i in json) {
        var li = json[i];
        data.push(li.title + "\n" + li.link);
      }
      $("list").data = data;
      $("list").endFetchingMore();
    }
  });
}

getdata();

function geting(id, mc) {
  $ui.push({
    props: {
      title: mc
    },
    views: [
      {
        type: "web",
        props: {
          url: id
        },
        layout: $layout.fill
      }
    ]
  });
}