/*
淘宝验号查询助手
可以查看 淘气值、给他人评价、信誉评级、等。
可保存二维码给别人使用
手机需要安装淘宝客户端才能使用


by：iPhone 8、小良
https://iphone8.vip/
*/
 
 var data =[{mc:{text:"淘气值"},url:"://market.m.taobao.com/apps/market/m-vip/raise-naughty.html?type=1"},{mc:{text:"给他人的评价"},url:"://rate.taobao.com/user-myrate-UMGNGvCv4MG8T--buyerOrSeller%7C3--receivedOrPosted%7C1.htm#rateList"},{mc:{text:"退款售后"},url:"://refund.m.taobao.com/dispute/wirelessList.htm#/loaded"},{mc:{text:"购买记录"},url:"://h5.m.taobao.com/mlapp/olist.html"},{mc:{text:"账户体检"},url:"://passport.taobao.com/ac/h5/appeal_center.htm?fromSite=0&amp;sourceType=other"},{mc:{text:"浏览足迹"},url:"://market.m.taobao.com/apps/market/footprint/index.html"},{mc:{text:"信誉评级"},url:"://h5.m.taobao.com/alistar/intro.html"},{mc:{text:"收藏记录"},url:"://market.m.taobao.com/apps/market/favorite/index.html"},{mc:{text:"来自卖家评价"},url:"://rate.taobao.com/user-myrate-UMGNGvCv4MG8T--receivedOrPosted%7C0--buyerOrSeller%7C1.htm"},{mc:{text:"性别年龄"},url:"://member1.taobao.com/member/fresh/account_profile.htm"}]


var zurl = data[0].url
var zmc = data[0].mc.text
$ui.render({
    props: {
      title: "淘宝验号查询助手"
    },
    views: [
      {
        type: "matrix",
        props: {
          id: "lb",
          columns: 2,
          itemHeight: 40,
          spacing: 5,
          data:data,
          template: [
            {
              type: "label",
              props: {
                id: "bj",
                text: "",
                bgcolor: $color("#F8F8F8"),
                borderColor: $color("#f0f0f0"),
                borderWidth: 1
              },
              layout(make, view) {
                make.top.left.right.bottom.inset(0);
              }
            },
            {
              type: "label",
              props: {
                id: "mc"
              },
              layout(make, view) {
                make.left.inset(10);
                make.top.right.bottom.inset(0);
              }
            },
          ]
        },
        layout(make, view) {
          make.top.left.right.inset(0);
          make.height.equalTo(230)
          
        },
        events: {
          didSelect: function(sender, indexPath, data) {
            zurl = data.url
            zmc = data.mc.text
            $("bt1").title="查看 - "+zmc+" (跳转淘宝)"
            var image=$qrcode.encode("https"+zurl)
            $("eimg").image=image
          }
        }
      }, {
        type: "image",
        props: {
            id: "eimg",
            image: $qrcode.encode("https"+zurl),
            radius: 5,
            bgcolor: $color("white")
        },
        layout: function (make, view) {
            make.top.equalTo($("lb").bottom).inset(10);
            make.centerX.equalTo(view.center)
            make.size.equalTo(250, 250)
        },
        events: {
            tapped(sender) {
                $ui.alert({
                  title: zmc+" (二维码)",
                  message:"\n二维码可以分享给你的朋友\n\n使用淘宝客户端扫描二维码即可\n",
                  actions:[{
                    title:"保存/分享 (二维码)",
                    handler:function(){$share.universal($("eimg").image)}
                  },{title:"取消"}]
                })
                
            }
        }
    },
      {
        type: "button",
        props: {
          id: "bt1",
          title: "查看 - "+zmc+" (跳转淘宝)"
        },
        layout: function(make) {
          make.top.equalTo($("eimg").bottom).inset(10);
          make.left.right.inset(20);
          make.height.equalTo(40);
        },
        events: {
          tapped: function(sender) {
            $app.openURL("taobao"+zurl)
          }
          
        }
      },
    ]
  });
