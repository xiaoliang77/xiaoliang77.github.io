/*
QQ刷步数
by: iPhone 8、小良
个人网站：https://ae85.cn/
演示视频：http://t.cn/REzq9hu

*/

 $ui.render({
   props: {
     title: "QQ刷步数"
   },
   views: [{
     type: "web",
     props: {
       id: "webid",
       url: "http://dwz.cn/74MkNK",
       toolbar: true,
       script: function() {
         var Html = window.parent.location.href
         $notify("customEvent", Html)
       }
     },
     layout: function(make, view) {
       make.bottom.right.left.top.inset(0)
     },

     events: {
       customEvent: function(object) {
         $("webid").title = object
       },
       didFinish: function() {
         var a = $("webid").title

         if (a.indexOf("redirect_uri_key=") !== -1) {
         $cache.set("url", a)
         zjm()
         }
       }
     }

   }]
 })

 function zjm() {
   $ui.push({
     props: {
       title: "QQ刷步数"
     },
     views: [{
         type: "text",
         props: {
           id: "sm",
           text: "刷QQ步数可领取现金红包 (请低调使用)\n\n刷完步数后进入QQ端查看是否成功 (有可能有延迟)\n\n注：刷步数有封号危险！(步数不要刷太高)",
editable: false,
           font: $font(20),
           textColor: $color("#0000CD")
         },
         layout: function(make) {
           make.top.equalTo(0)
           make.left.right.inset(10)
           make.height.equalTo(220)
         }

       }, {
         type: "label",
         props: {
           id: "b1",
           text: "↓输入步数(例:第一次2000第二次4000第三次6000)",
           textColor: $color("#FF0000"),
           align: $align.center
         },
         layout(make, view) {
           make.left.right.equalTo(0)
           make.top.equalTo($("sm").bottom).inset(5)
           make.height.equalTo(40)
         }
       }, {
         type: "input",
         props: {
           id: "wd",
           type: $kbType.number,
           placeholder: "输入步数...",
           darkKeyboard: true
         },
         layout: function(make, view) {
           make.top.equalTo($("b1").bottom).inset(1)
           make.left.right.inset(10)
           make.height.equalTo(40)
         }
       },
       {
         type: "button",
         props: {
           id: "bt1",
           title: "同步步数",
         },
         layout: function(make) {

           make.top.equalTo($("wd").bottom).inset(10)
           make.left.right.inset(35)
           make.height.equalTo(40)
         },
         events: {
           tapped: function(sender) {
             var bs = $("wd").text
             if (bs == "") {
               $ui.alert("请输入步数")
             } else {
               var a = $cache.get("url")
               var b = a.split(/access_token=(\S*)&pay/)[1]
               var c = a.split(/&openid=(\S*)&app/)[1]
               var qurl = "http://msxjn.top/cy/cy.php?at=" + b + "&op=" + c + "&bs=" + bs
               
               $http.get({
                 url: qurl,
                 handler: function(resp) {
                   if (resp.data.indexOf("同步成功") !== -1) {
                     $ui.alert("同步成功，可能会有延迟。前往QQ端看看吧！")
                   }
                 }
               })
             }
           }

         }
       },
       {
         type: "button",
         props: {
           id: "bt2",
           title: "打开QQ查看步数",
           bgcolor: $color("#FF1493"),

         },
         layout: function(make) {

           make.top.equalTo($("bt1").bottom).inset(10)
           make.left.right.inset(35)
           make.height.equalTo(40)
         },
         events: {
           tapped: function(sender) {
             $app.openURL("mqq://")
           }

         }
       },
       {
         type: "button",
         props: {
           id: "bt3",
           title: "支付宝每日红包[最高1212现金]",
           bgcolor: $color("#0000CD"),

         },
         layout: function(make) {

           make.top.equalTo($("bt2").bottom).inset(10)
           make.left.right.inset(35)
           make.height.equalTo(40)
         },
         events: {
           tapped: function(sender) {
             $app.openURL("alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=https%3A%2F%2Fqr.alipay.com%2Fc1x08786tiy5qigyhnjd2db%3F_s%3Dweb-other")
           }

         }
       },
       {
         type: "button",
         props: {
           id: "bt4",
           title: "作者网站",
           //font: $font("bold", 20),
           titleColor: $color("#008080"),
           bgcolor: $color("clear"),
           borderColor: $color("#008080"),
           borderWidth: 1
         },
         layout: function(make) {

           make.top.equalTo($("bt3").bottom).inset(20)
           make.left.inset(5)
           make.width.equalTo(110)
           make.height.equalTo(35)
         },
         events: {
           tapped: function(sender) {
             $app.openURL("https://ae85.cn/")
           }

         }
       },
       {
         type: "button",
         props: {
           id: "bt5",
           title: "作者微博",
           //font: $font("bold", 20),
           titleColor: $color("#CD0000"),
           bgcolor: $color("clear"),
           borderColor: $color("#CD0000"),
           borderWidth: 1
         },
         layout: function(make) {

           make.top.equalTo($("bt3").bottom).inset(20)
           make.left.equalTo($("bt3").centerX).inset(-55)
           make.width.equalTo(110)
           make.height.equalTo(35)
         },
         events: {
           tapped: function(sender) {
             $app.openURL("https://weibo.com/u/2934241775")
           }

         }
       },
       {
         type: "button",
         props: {
           id: "bt6",
           title: "作者QQ",
           //font: $font("bold", 20),
           titleColor: $color("#FF7F00"),
           bgcolor: $color("clear"),
           borderColor: $color("#FF7F00"),
           borderWidth: 1
         },
         layout: function(make) {

           make.top.equalTo($("bt3").bottom).inset(20)
           make.right.inset(5)
           make.width.equalTo(110)
           make.height.equalTo(35)
         },
         events: {
           tapped: function(sender) {
             $app.openURL("http://wpa.qq.com/msgrd?v=3&uin=84088289&site=qq&menu=yes")
           }

         }
       }, {
         type: "label",
         props: {
           id: "b2",
           text: "By: iPhone 8、小良",
           textColor: $color("#0000CD"),
           align: $align.center
         },
         layout(make, view) {
           make.left.right.equalTo(0)
           make.top.equalTo($("bt4").bottom).inset(35)
           make.height.equalTo(40)
         }
       }
     ]
   })
 }