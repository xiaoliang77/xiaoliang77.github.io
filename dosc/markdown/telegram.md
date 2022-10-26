# Telegram bot 笔记  [GitHub](https://github.com/liangziai77/liangziai77.github.io/blob/master/dosc/markdown/telegram.md)

官方文档：[https://core.telegram.org/bots/api](https://core.telegram.org/bots/api)

机器人申请：[@BotFather](tg://@BotFather)

连接脚本配置：
`https://api.telegram.org/bot{机器人token}/setWebhook?url={脚本链接}`


发送消息:
`https://api.telegram.org/bot{机器人token}/sendMessage?chat_id={接受者id}&text={消息内容}`


### 脚本代码：
```javascript
function doPost(e){
  var estringa = JSON.parse(e.postData.contents);
  var d = new Date();
  sendtext(estringa);
  var SpreadSheet = SpreadsheetApp.openById("1qXuJ2iM6JhOyW1rTPJWVOIQMQS5KvjOX2t_46RvsfC9");
  var Sheet = SpreadSheet.getSheetByName("接收到的消息");
  var LastRow = Sheet.getLastRow();
  Sheet.getRange(LastRow+1, 1).setValue(d);  
  Sheet.getRange(LastRow+1, 2).setValue(e.postData.contents);
}

//===============================机器配置==================================
var key = "机器人token"

//授权飞机id（）
var AuthorityID = ['123456','111111'];
//=================================================================
function authority(obj) {
    var i = AuthorityID.length;
    while (i--) {
        if (AuthorityID[i] === obj) {
            return true;
        }
    }
    return false;
}

//=================================================================
function sendtext(e){
  //var id = "105589"
  var id = String(e.message.chat.id);
  var m_id = e.message.message_id;
  var username = e.message.from.username;
  var first_name = e.message.from.first_name;
    
  if(authority(id)){
    if (e.message.text){
      var ys_text = e.message.text;
        fasong(id,ys_text,m_id);//回发文本消息
      } 
    }
  }else{
    fasong(id,"您好！您暂无权限使用此机器人！ 请联系 @hhhhhhhhhhhhhh 同学授权");
    //fasong("10558906","有未授权的人正在尝试使用该机器人，id：" + id + " 名称：" + first_name + " @" + username)
  }
}

//===================================以下是標準發送跟記下Log==================================================
function fasong(id,news,m_id){
    var payload = {
    "method": "sendMessage",
    'disable_web_page_preview': true,
    'reply_to_message_id':m_id,
    'chat_id': id,
    'text': news
    }
    start(payload);
}

function start(payload) {
    var data = {
        "method": "post",
        "payload": payload
    }
    var d = new Date();
    var SpreadSheet = SpreadsheetApp.openById("1qXuJ2iM6JhOyW1rTPJWVOIQMQS5KvjOX2t_46RvsfC9");
    var Sheet = SpreadSheet.getSheetByName("已经发送的信息");
    var LastRow = Sheet.getLastRow();
    Sheet.getRange(LastRow + 1, 1).setValue(d);
    Sheet.getRange(LastRow + 1, 3).setValue(data);
    var returned = UrlFetchApp.fetch("https://api.telegram.org/bot" + key + "/", data);
    Sheet.getRange(LastRow + 1, 2).setValue(d);
}

```