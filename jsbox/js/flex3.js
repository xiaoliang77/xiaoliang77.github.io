/*
Flex 3补丁管理 1.6.2

2020年6月19日 更新：
新增：内部云端补丁功能。
新增：内部补丁下载量统计。
-------
修复：分享最后一个补丁节点对齐问题。
修复：修复原先补丁分割造成补丁无法显示问题。
新增：文件分享面板添加管理补丁。直接Filza文件内操作，无需借助iCloud云盘。
新增：补丁数量显示。
新增：关闭按钮。
去除：补丁分享名称自动添加"_patches"。

---------
视频教程①：https://u.nu/udio8
视频教程②：http://t.cn/EIcPhm3
---------
可合成flex多个patches.plist文件
内置云端补丁，可以从云端添加。

by：iPhone 8、小良
https://iphone8.vip/
*/

$app.autoKeyboardEnabled = true;
var arr = [],
  qunarr = [],
  yunarr = [];

function xrwj() {
  dd = daoc();
  var success = $file.write({
    data: $data(dd),
    path: "patches.plist"
  });
  if (success) {
    $ui.toast("已保存到本地");
  }
}

var out = {
  type: "image",
  props: {
    id: "out",
    icon: $icon("015", $color("red"))
  },
  layout: (make, view) => {
    make.right.equalTo(view.super).offset(-100);
    make.height.width.equalTo(25);
    make.centerY.equalTo(view.center);
  },
  events: {
    tapped: sender => {
      $app.close();
    }
  }
};

var shu = {
  type: "label",
  props: {
    align: 1,
    id: "shu",
    font: $font(14)
  },
  layout: (make, view) => {
    make.right.equalTo($("out").left).inset(5);
    make.height.equalTo(40);
    make.width.equalTo(50);
    make.centerY.equalTo(view.center);
  }
};

const conView = {
  type: "view",
  props: {
    id: "conView"
  },
  views: [
    out,
    shu,
    {
      type: "label",
      props: {
        text: "Flex 3 补丁管理",
        textColor: $color("tint"),
        font: $font("bold", 25)
      },
      layout: (make, view) => {
        make.height.equalTo(45);
        make.centerY.equalTo(view.center);
        make.left.equalTo(15);
      }
    },
    {
      type: "image",
      props: {
        icon: $icon("165", $color("tint"), $size(30, 30)),
        bgcolor: $color("clear")
      },
      layout: (make, view) => {
        make.right.equalTo(view.super).offset(-15);
        make.height.width.equalTo(30);
        make.centerY.equalTo(view.center);
      },
      events: {
        longPressed: sender => {
          if (qunarr.length) {
            qunView();
          } else {
            $input.text({
              type: $kbType.search,
              placeholder: "输入密码,获取内部补丁",
              handler: text => {
                var key = $cache.get("info").qunkey;
                if ($text.base64Decode(key) == text) {
                  $ui.toast("加载中…");
                  qunbdlist();
                } else alert("密码不正确！请重新输入。");
              }
            });
          }
        },
        tapped: sender => {
          if ($file.exists("yunbd.plist")) {
            $("zhuView").add({
              type: "view",
              props: {
                id: "archivesView",
                alpha: 1
              },
              layout: (make, view) => {
                make.height.width.equalTo(view.super);
                make.center.equalTo(view.super);
              },
              views: [
                {
                  type: "blur",
                  props: {
                    style: 2,
                    alpha: 1
                  },
                  layout: $layout.fill,
                  events: {
                    tapped: sender => {
                      $ui.animate({
                        duration: 0.2,
                        animation: () => {
                          $("archivesView").alpha = 0;
                        },
                        completion: () => {
                          sender.super.remove();
                        }
                      });
                    }
                  }
                },
                {
                  type: "view",
                  props: {
                    id: "yunView",
                    radius: 10,
                    bgcolor: $color("#FFF")
                  },
                  layout: (make, view) => {
                    make.height.equalTo(view.super).dividedBy(12 / 9);
                    make.width.equalTo(view.super).dividedBy(12 / 11);
                    make.center.equalTo(view.super);
                  },
                  views: [
                    {
                      type: "label",
                      props: {
                        text: "云端补丁",
                        id: "yunbq",
                        font: $font("bold", 20),
                        align: $align.center
                      },
                      layout: (make, view) => {
                        make.left.right.inset(10);
                        make.top.inset(10);
                      }
                    },
                    {
                      type: "input",
                      props: {
                        id: "bjk",
                        placeholder: " 输入关键字进行搜索..."
                      },
                      layout: function(make) {
                        make.top.equalTo($("yunbq").bottom).inset(10);
                        make.left.right.inset(10);
                        make.height.equalTo(35);
                      },
                      events: {
                        returned: function(sender) {
                          $("bjk").blur();
                        },
                        changed: function(sender) {
                          sousuo(sender.text);
                        }
                      }
                    },
                    {
                      type: "list",
                      props: {
                        id: "yunlist",
                        reorder: true,
                        actions: [
                          {
                            title: "详情",
                            color: $color("tint"),
                            handler: (sender, indexPath) => {
                              alert(sender.views[0].views[0].views[0].text);
                            }
                          }
                        ]
                      },
                      layout: make => {
                        make.right.left.bottom.inset(2);
                        make.top.equalTo($("bjk").bottom).offset(10);
                      },
                      events: {
                        didSelect: (sender, indexPath, data) => {
                          var feng = yunarr[indexPath.item];
                          arr = arr.concat(feng);
                          $("list").data = listsa(arr);
                          $("shu").text = arr.length;
                          $ui.toast("已添加", 0.6);
                        }
                      }
                    }
                  ]
                }
              ]
            });

            var xml = $file.read("yunbd.plist").string;
            yunarr = cltouq(xml);
            var yundata = listsa(yunarr);
            $("yunlist").data = yundata;
          } else {
            alert("云端数据处理中请稍候···");
          }
        }
      }
    },
    {
      type: "image",
      props: {
        icon: $icon("074", $color("tint"), $size(25, 25)),
        bgcolor: $color("clear")
      },
      layout: (make, view) => {
        make.right.equalTo(view.prev.left).offset(-15);
        make.height.width.equalTo(25);
        make.centerY.equalTo(view.center);
      },
      events: {
        tapped: sender => {
          var info = $cache.get("info");
          $ui.alert({
            title: "感谢支持",
            message:
              "作者投入大量时间和精力对脚本进行开发和完善，你愿意给他赏杯咖啡支持一下吗？",
            actions: [
              {
                title: "微信",
                handler: () => {
                  $ui.alert({
                    title: "是否愿意赞赏？",
                    message:
                      "\n确定后会自动保存赞赏码到相册！\n并自动打开微信扫一扫！",
                    actions: [
                      {
                        title: "确定",
                        handler: () => {
                          $http.download({
                            url: info.wxzs,
                            handler: resp => {
                              $photo.save({
                                data: resp.data,
                                handler: success => {
                                  $app.openURL("weixin://scanqrcode");
                                }
                              });
                            }
                          });
                        }
                      },
                      {
                        title: "取消"
                      }
                    ]
                  });
                }
              },
              {
                title: "支付宝",
                handler: () => {
                  $app.openURL(info.zfbzs);
                }
              },
              {
                title: "返回"
              }
            ]
          });
        }
      }
    }
  ],
  layout: (make, view) => {
    make.top.inset(35);
    make.right.left.inset(0);
    make.height.equalTo(50);
  }
};

$ui.render({
  props: {
    navBarHidden: 1,
    statusBarStyle: 0,
    id: "zhuView"
  },
  views: [
    conView,
    {
      type: "view",
      props: {
        id: "zhoView",
        bgcolor: $color("#dddddd")
      },
      layout: (make, view) => {
        make.top.equalTo($("conView").bottom).offset(10);
        make.right.left.inset(10);
        make.bottom.inset(100);
      },
      views: [
        {
          type: "matrix",
          props: {
            id: "matrix-cai",
            columns: 3,
            scrollEnabled: false,
            itemHeight: 40,
            bgcolor: $color("#f0f5f5"),
            data: [
              { title: { text: "添加补丁" } },
              { title: { text: "清空补丁" } },
              { title: { text: "保存补丁" } }
            ],
            template: [
              {
                type: "label",
                props: {
                  id: "title",
                  align: $align.center,
                  font: $font("bold", 16),
                  textColor: $color("tint"),
                  autoFontSize: true
                },
                layout: $layout.fill
              }
            ],
            info: {}
          },
          layout: (make, view) => {
            make.height.equalTo(40);
            make.top.left.right.inset(2);
          },
          events: {
            didSelect: (sender, indexPath, data) => {
              var btn = data.title.text;
              if (btn === "保存补丁") {
                xrwj();
              } else if (btn === "添加补丁") {
                tianj();
              } else if (btn === "清空补丁") {
                $ui.alert({
                  title: "是否清空所有补丁？",
                  actions: [
                    {
                      title: "确定",
                      handler: function() {
                        arr = [];
                        $("list").data = [];
                        $("shu").text = "";
                        $file.delete("patches.plist");
                      }
                    },
                    {
                      title: "取消"
                    }
                  ]
                });
              }
            }
          }
        },
        {
          type: "list",
          props: {
            id: "list",
            reorder: true,
            actions: [
              {
                title: "delete",
                handler: (sender, indexPath) => {
                  arr.splice(indexPath.item, 1);
                  var data = listsa(arr);
                  $("list").data = data;
                  $("shu").text = arr.length;
                }
              },
              {
                title: "分享",
                color: $color("tint"),
                handler: function(sender, indexPath) {
                  var name = sender.data[indexPath.row];
                  name = name.split("\n")[0];
                  var plist = `<?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
  <dict>
	  <key>patches</key>
	  <array>
		<dict>${arr[indexPath.item]}
		</dict>
	</array>
</dict>
</plist>`;
                  var dd = $data({
                    string: plist
                  });
                  $share.sheet([name + ".plist", dd]);
                }
              }
            ]
          },
          layout: make => {
            make.right.left.bottom.inset(2);
            make.top.equalTo($("matrix-cai").bottom).offset(1);
          },
          events: {
            didSelect: (sender, indexPath, data) => {
              alert(data);
            },
            reorderMoved: function(findex, tindex) {
              var t = tindex.row;
              var f = findex.row;
              arr[f] = [arr[t], (arr[t] = arr[f])][0];
            }
          }
        }
      ]
    },
    {
      type: "button",
      props: {
        id: "daocBtn",
        title: "导出补丁"
      },
      layout: (make, view) => {
        make.top.equalTo($("zhoView").bottom).inset(10);
        make.width.equalTo(100);
        make.height.equalTo(40);
        make.right.inset(10);
      },
      events: {
        tapped: sender => {
          var dd = daoc();
          $share.sheet([$("fixe-wjm").text, dd]);
        }
      }
    },
    {
      type: "input",
      props: {
        id: "fixe-wjm",
        placeholder: "patches.plist",
        text: "patches.plist",
        font: $font(18),
        type: $kbType.default
      },
      layout: (make, view) => {
        make.top.equalTo($("zhoView").bottom).inset(10);
        make.right.equalTo($("daocBtn").left).inset(10);
        make.height.equalTo(40);
        make.left.inset(10);
      },
      events: {
        returned: sender => {
          sender.blur();
        }
      }
    },
    {
      type: "label",
      props: {
        align: 1,
        font: $font(14),
        text: "iPhone 8、小良 (https://ae85.cn)",
        textColor: $color("#ddd")
      },
      layout: (make, view) => {
        make.bottom.inset(2);
        make.left.right.inset(0);
        make.height.equalTo(30);
      }
    }
  ]
});

function cltouq(xml) {
  var qtous = xml.split(`<key>patches</key>\n\t<array>\n\t\t<dict>`);
  var qtou = qtous[1];
  if (!qtou) {
    qtou = xml.replace(
      /<\?xml[^\♀]+\s+<key>patches<\/key>\n\s+<array>\n\s+<dict>/,
      ""
    );
  }
  var qwei = qtou.replace(/\s+<\/dict>\n\s+<\/array>\n<\/dict>\n<\/plist>/, "");
  var qwei = qwei.replace(
    `
		  </dict>
	  </array>
  </dict>
  </plist>`,
    ""
  );
  var feng = qwei.split(`</dict>\n\t\t<dict>`);
  return feng;
}

function listsa(arr) {
  data = [];
  for (i in arr) {
    var a = arr[i];
    var qhh = a.replace(/\n/g, "♀");
    qhh = qhh.replace(/\r|/g, "");
    var t = qhh.match(/<key>name<\/key>.*?<\/string>/)[0];
    var mc = t.match(/<string>(.*?)<\/string>/)[1];
    var smt = qhh.match(/<key>cloudDescription<\/key>([\s\S]*)<\/string>/)[0];
    var sm = smt.match(/<string>(.*?)<\/string>/)[1];
    sm = sm.replace(/♀/g, "\n");
    data.push(mc + "\n\n" + sm);
  }
  return data;
}

function zhulist(xml) {
  var feng = cltouq(xml);
  arr = arr.concat(feng);
  var data = listsa(arr);
  $("list").data = data;
  $("shu").text = arr.length;
}

function daoc() {
  var data;
  if (arr.length) {
    if (arr.length == 1) {
      data = `<dict>${arr[0]}`;
    } else {
      for (i in arr) {
        var tou = `<dict>${arr[i]}`,
          wei = `</dict>\n\t\t`;
        if (i == 0) {
          data = tou + wei;
        } else if (i == arr.length - 1) {
          data = data + tou;
        } else {
          data = data + tou + wei;
        }
      }
    }
    var plist = `<?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
  <dict>
	  <key>patches</key>
	  <array>
		  ${data}
		</dict>
	</array>
</dict>
</plist>`;
    var dd = $data({
      string: plist
    });
    return dd;
  }
}

function tianj() {
  $ui.menu({
    items: ["剪贴板", "iCloud 云盘"],
    handler: (title, idx) => {
      switch (idx) {
        case 0:
          var text = $clipboard.text;
          if (text.indexOf("<?xml") == -1) {
            $ui.alert("未能识别剪贴板中的补丁");
          } else {
            zhulist(text);
          }
          break;
        case 1:
          $drive.open({
            handler: data => {
              var plist = data.string;
              zhulist(plist);
            }
          });
          break;
      }
    }
  });
}

if ($file.exists("patches.plist")) {
  var file = $file.read("patches.plist").string;
  zhulist(file);
}

$http.get({
  url:
    $text.base64Decode("aHR0cHM6Ly9pcGhvbmU4LnZpcC9jb25maWcv") + "flex3.json",
  handler: resp => {
    if (resp.data.bb != "1.6") {
      $ui.alert({
        title: "温馨提示：",
        message: resp.data.gxsm,
        actions: [
          {
            title: "访问官网",
            handler: () => {
              $app.openURL(resp.data.gw);
            }
          },
          {
            title: "关注公众号",
            handler: () => {
              $ui.alert({
                title: "温馨提示",
                message:
                  "跳转微信会自动复制公众号ID\n请跳转到微信-搜索-公用号-粘贴-关注",
                actions: [
                  {
                    title: "跳转微信",
                    handler: () => {
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
      $cache.set("info", resp.data);
      pdybb(resp.data.yunbb);
    }
  }
});

function pdybb(bb) {
  if ($file.exists("yunbd.plist")) {
    if ($file.exists("ybb.txt")) {
      var file = $file.read("ybb.txt").string;
      if (file != bb) {
        await: downloadbd(bb);
      }
    } else {
      await: downloadbd(bb);
    }
  } else {
    await: downloadbd(bb);
  }
}

function downloadbd(bb) {
  $http.download({
    url: $cache.get("info").yunurl,
    showsProgress: true,
    backgroundFetch: true,
    progress: function(bytes, total) {
      var percentage = (bytes * 1.0) / total;
      $ui.progress(percentage);
    },
    handler: resp => {
      if (resp.response.statusCode == "200") {
        $file.write({
          data: $data(resp.data),
          path: "yunbd.plist"
        });
        pdxia(bb);
      }
    }
  });
}

function pdxia(nr) {
  $file.write({
    data: $data({ string: nr }),
    path: "ybb.txt"
  });
}

function sousuo(text) {
  var xml = $file.read("yunbd.plist").string;
  yunarr = cltouq(xml);
  var data = [];
  var listd = listsa(yunarr);
  for (i in listd) {
    var arr = listd[i];
    if (arr.indexOf(text) != -1) {
      data = data.concat(yunarr[i]);
    }
  }
  yunarr = data;
  $("yunlist").data = listsa(yunarr);
}

if ($app.env == 4) {
  var text = $context.data.string;
  if (text.indexOf("<?xml") == -1) {
    $ui.alert("未能识别的文件,检查是否是补丁文件");
  } else {
    zhulist(text);
  }
}

function qunbdlist() {
  var info = $cache.get("info");
  $ui.loading(true);
  $http.get({
    url:
      $text.base64Decode(info.nburl) +
      "?key=" +
      $text.base64Decode(info.captcha),
    handler: resp => {
      $ui.loading(false);
      var data = resp.data.data;
      if (data) {
        qunarr = [];
        for (i in data) {
          var arr = data[i];

          qunarr.push({
            name: { text: arr.name },
            author: { text: arr.author },
            time: { text: arr.time },
            url: arr.url,
            id: arr.id
          });
        }
        qunView();
      } else {
        $ui.toast("获取失败");
      }
    }
  });
}

function qunView() {
  $("zhuView").add({
    type: "view",
    props: {
      id: "archivesView",
      alpha: 1
    },
    layout: (make, view) => {
      make.height.width.equalTo(view.super);
      make.center.equalTo(view.super);
    },
    views: [
      {
        type: "blur",
        props: {
          style: 2,
          alpha: 1
        },
        layout: $layout.fill,
        events: {
          tapped: sender => {
            $ui.animate({
              duration: 0.2,
              animation: () => {
                $("archivesView").alpha = 0;
              },
              completion: () => {
                sender.super.remove();
              }
            });
          }
        }
      },
      {
        type: "view",
        props: {
          id: "yunView",
          radius: 10,
          bgcolor: $color("#FFF")
        },
        layout: (make, view) => {
          make.height.equalTo(view.super).dividedBy(12 / 9);
          make.width.equalTo(view.super).dividedBy(12 / 11);
          make.center.equalTo(view.super);
        },
        views: [
          {
            type: "label",
            props: {
              text: "内部云端补丁",
              id: "yunbq",
              font: $font("bold", 22),
              align: $align.center
            },
            layout: (make, view) => {
              make.left.right.inset(10);
              make.top.inset(10);
            }
          },
          {
            type: "list",
            props: {
              id: "nbylist",
              data: qunarr,
              reorder: true,
              rowHeight: 56,
              template: [
                {
                  type: "label",
                  props: {
                    id: "name",
                    font: $font("bold", 20),
                    textColor: $color("blue"),
                    ines: 0
                  },
                  layout: function(make, view) {
                    make.left.right.inset(10);
                    make.top.inset(5);
                  }
                },
                {
                  type: "label",
                  props: {
                    id: "author",
                    font: $font(13),
                    textColor: $color("secondaryText"),
                    lines: 0
                  },
                  layout: function(make, view) {
                    make.top.equalTo($("name").bottom).offset(5);
                    make.left.equalTo(10);
                    make.width.equalTo(180);
                  }
                },
                {
                  type: "label",
                  props: {
                    id: "time",
                    font: $font(13),
                    textColor: $color("secondaryText")
                  },
                  layout: function(make) {
                    make.width.equalTo(80);
                    make.right.inset(10);
                    make.top.equalTo($("name").bottom).offset(5);
                  }
                }
              ]
            },
            layout: make => {
              make.right.left.bottom.inset(5);
              make.top.equalTo($("yunbq").bottom).offset(10);
            },
            events: {
              didSelect: (sender, indexPath, data) => {
                downqunbd(data.url);
                downs(data.id);
              }
            }
          }
        ]
      }
    ]
  });
}

function downqunbd(url) {
  $ui.toast("补丁下载中…");
  $ui.loading(true);
  $http.download({
    url: url,
    showsProgress: true,
    backgroundFetch: true,
    progress: function(bytes, total) {
      var percentage = (bytes * 1.0) / total;
      $ui.progress(percentage);
    },
    handler: resp => {
      $ui.loading(false);
      if (resp.response.statusCode == "200") {
        zhulist(resp.data.string);
        $ui.toast("添加成功！");
      } else {
        $ui.alert("下载失败");
      }
    }
  });
}

function downs(id) {
  var info = $cache.get("info");
  var url = $text.base64Decode(info.downs) + id;
  $http.get({
    url: url,
    handler: resp => {
      var data = resp.data;
    }
  });
}