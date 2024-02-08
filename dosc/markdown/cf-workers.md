#### 谷歌Script脚本反代

```js
const host = "script.google.com";

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    var u = new URL(request.url);
    u.host = host;
    var req = new Request(u, {
        method: request.method,
        headers: request.headers,
        body: request.body
    });
    const result = await fetch(req);    
    return result;
}
```

---

#### 云剪贴板项目

```javascript
/*
利用cf KV存储实现云剪贴板
https://XXXXXXXXX.workers.dev/?ac={0:获取内容、1:添加~、4:删除}&nr={xxxxxx}&id={数组索引}
*/
addEventListener("fetch", (event) => {
  event.respondWith(
      handleRequest(event).catch((err) => {
        return new Response(err.stack, { status: 500 })
      })
    )
})
async function handleRequest(event) {
  const u = event.request.url
  if (u.indexOf("?") == -1) {
    return new Response("云剪贴板项目功能暂未对外开放···");
  }

  const ac = queryString(u,"ac") //读操作类型
  const nr = queryString(u,"nr") //读传入内容
  const id = queryString(u,"id") //读传入的id

  const value = await KV.get("time")

  if(ac == 0){
    // 获取数据
    return new Response(value)
  }
  if (ac == 1) {
    // 添加数据
    const arr = JSON.parse(value)
    console.log(nr);
    arr.data.unshift(nr)
    await KV.put('time', JSON.stringify(arr))
    return new Response(JSON.stringify(arr))
  }
  if (ac == 4) {
    // 删除数据
    const arr = JSON.parse(value)
    arr.data.splice(id,1)
    console.log(arr);
    await KV.put('time', JSON.stringify(arr))
    return new Response(JSON.stringify(arr))
  }

  return new Response("iPhone8、小良")

}

function queryString(urlStr,key){
  const url = new URL(urlStr)
  const paramsStr = url.search.slice(1)
  const params = new URLSearchParams(paramsStr)
  return params.get(key)
}
```

---

#### 短网址项目

```javascript
/*
利用cf D1数据库存储实现短网址api
访问示例：https://xxxx.cn/duanma

api
https://XXXXXXXXX.workers.dev/?ac={1:创建短链接、2:获取所有数据、3:修改长链接和到期时间、4:删除}&vid={xxxx:设置短码}&url={长链接}&id={数据项索引}&time={1700902909:设置到期时间（十位时间戳）}
*/
export default {
  async fetch(request, env, ctx) {
    console.log(request.url);
    var u = request.url
    var ut = new URL(u)
    console.log(ut.pathname);
    var index = u.indexOf(".dev/");
    if (index == -1) {
       index = u.indexOf("l.cn/");
    }

    let srt = u.substr(index + 5, u.length);  
    if(srt.indexOf("favicon.ico") > -1){
      return tiaozhuan("https://87xl.cn/favicon.ico");
    } else if(srt.indexOf("ae85-cn.workers.dev") > -1){
      return; 
    }

    var vid
    if (ut.pathname === "/") {
      if (u.indexOf("?") == -1) {
        return new Response("短网址功能暂未对外开放···");
      }
      var usr = queryString(u)
      var time = Date.now().toString().substring(0, 10)
      var endtime = usr.time ? usr.time : 0
      console.log(usr);
      if (usr.ac == 1 && usr.url) { //创建短链接
        const url = decodeURIComponent(usr.url)
        if (usr.vid) { //是否传入vid
          const res = await cha_sfcz(usr.vid);
          if (res.length > 0) { //vid是否存在数据库
            return end_json(500,"短码已存在",vid)
            return new Response("<h1>短码已存在</h1>");
          } else{
            vid = usr.vid
          }      
        } else{
          vid = get_Number()
          var cz = await cha_sfcz(vid)
          while (cz.length) {
            vid = get_Number()
            cz = await cha_sfcz(vid)
          }
        }
        console.log(vid)

        var sql = "INSERT INTO `dwzdata` (`vid`, `url`, `newTime`, `time`,`clicks`,`delete`) VALUES ('"+vid+"', '"+ url +"', "+endtime+", "+time+", 0 , 0)";
        console.log( sql);
        const resx = await env.DB.prepare(sql).all();
        if (resx.success) {
          return end_json(200,"创建完成",vid,ut.origin + "/" + vid)
        }else{
          return end_json(400,"创建失败",vid)
        }        

        console.log("执行结束");
      } else if(usr.ac == 2){ //获取所以未删除的短链接
        var sql = "SELECT * FROM `dwzdata` WHERE `delete` = 0";
        const res = await env.DB.prepare(sql).all();
        // console.log(res.results.length);
        // console.log(res.results[0].url)
        return end_json(200,"获取完成",res.results)

      } else if(usr.ac == 3 && usr.id){ //修改长链接和到期时间
        if (usr.url) {
          var sql = "UPDATE `dwzdata` SET `url`='"+decodeURIComponent(usr.url)+"', `newTime`="+endtime+" WHERE `id` = " + usr.id; 
        }else{
          var sql = "UPDATE `dwzdata` SET `newTime`="+endtime+" WHERE `id` = " + usr.id;
        }
        console.log(sql);
        const res = await env.DB.prepare(sql).all();
        if (res.results) {
          return end_json(200,"修改成功",res.results)
        }else{
          return end_json(400,"修改失败",res.results)
        }

      } else if(usr.ac == 4 && usr.id){ //删除短链接
        var sql = "UPDATE `dwzdata` SET `delete`= 1 WHERE `id` = " + usr.id; 
        const res = await env.DB.prepare(sql).all();
        console.log(res);
        if (res.results) {
          return end_json(200,"删除完成",res.results)
        }else{
          return end_json(400,"删除失败",res.results)
        }
      } else {
        return end_json(403,"参数错误",usr.vid,usr.url)
      }


    } else {
      // 访问  /vid  如果有则301跳转
        const res = await cha_sfcz(srt);
        var shuj = res[0];
        if (res.length > 0) {
          if (vid_sfdq(shuj.newTime)) {
            return new Response("短链接已失效");
          } else{
            var clicks = shuj.clicks + 1;
            var sql = "UPDATE `dwzdata` SET `clicks`= "+clicks+" WHERE `id` = " + shuj.id; 
            const resc = await env.DB.prepare(sql).all();
            console.log(resc);
            var url = decodeURIComponent(shuj.url)
            console.log(url);
            return tiaozhuan(url)
          }
        }
        return new Response("404~网址不存在啦");
      }


      // 查数据库的vid是否存在，不存在返回空数组
      async function cha_sfcz(vid){
        var sql = "SELECT * FROM `dwzdata` WHERE `vid` = '"+ vid +"' AND `delete` = 0";
        const res = await env.DB.prepare(sql).all();
        return res.results;
      }
  },
};

// 301重定向
function tiaozhuan(url){
  const redirectUrl = url;
  const response = new Response(`Redirecting to ${redirectUrl}`, {
      status: 301,
      headers: {
          'Location': redirectUrl,
      },
  })
  return response;
}

// 解析url链接为obj数据
function queryString(str) {
  let params = str.split('?')[1];
  let param = params.split('&'); 
  let obj = {}; 
  for (let i = 0; i < param.length; i++) {
    let paramsA = param[i].split('=');
    let key = paramsA[0]; 
    let value = paramsA[1]; 
    obj[key] = value;
  }
  return obj;
}

// 生成4位随机数
function get_Number() {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyz';
  let randomNumber = '';

  // 输出一个4位的随机数字符串，包含数字和字母
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomNumber += characters[randomIndex];
  }
  return randomNumber;
}

// 判断vid码是否到期
function vid_sfdq(endtime) {
  let d = Date.now().toString().substring(0, 10)//将现在时间转换为10位时间戳（到秒）
  if (endtime&&endtime < d) {
    return true;
  } else {
    return false
  }
}

// 输出json到前端
function end_json(ztai,message,vid='',url='',endtime='',time=''){
  var payload = {
      code: ztai,
      message: message,
      vid: vid,
      url: url,
      endtime: endtime,
      time: time
    }
  const response = new Response(JSON.stringify(payload))
  return response;
}
```

---

#### r2-api 对象存储

```javascript

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const objectName = url.pathname.slice(1)

  console.log(`${request.method} object ${objectName}: ${request.url}`)

  if (request.method === 'GET' || request.method === 'HEAD') {
      if (objectName === '') {
          if (request.method == 'HEAD') {
              return new Response(undefined, { status: 400 })
          }

          const options = {
              prefix: url.searchParams.get('prefix') ?? undefined,
              delimiter: url.searchParams.get('delimiter') ?? undefined,
              cursor: url.searchParams.get('cursor') ?? undefined,
              include: ['customMetadata', 'httpMetadata'],
          }
          console.log(JSON.stringify(options))

          const listing = await R2.list(options)
          return new Response(JSON.stringify(listing), {
              headers: {
                  'content-type': 'application/json; charset=UTF-8',
              }
          })
      }

      if (request.method === 'GET') {
          const range = parseRange(request.headers.get('range'))
          const object = await R2.get(objectName, {
              range,
              onlyIf: request.headers,
          })

          if (object === null) {
              return objectNotFound(objectName)
          }

          const headers = new Headers()
          //object.writeHttpMetadata(headers)
          headers.set('etag', object.httpEtag)
          const status = object.body ? (range ? 206 : 200) : 304
          return new Response(object.body, {
              headers,
              status
          })
      }

      const object = await R2.head(objectName, {
          onlyIf: request.headers,
      })

      if (object === null) {
          return objectNotFound(objectName)
      }

      const headers = new Headers()
      //object.writeHttpMetadata(headers)
      headers.set('etag', object.httpEtag)
      return new Response(null, {
          headers,
      })
  }
  if (request.method === 'PUT' || request.method == 'POST') {
      const object = await R2.put(objectName, request.body, {
          httpMetadata: request.headers,
      })
      return new Response(JSON.stringify({...object,url:url}), {
          headers: {
              'etag': object.httpEtag,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
              "Access-Control-Max-Age": "86400",
              "Access-Control-Allow-Headers": "authorization,Content-Type"
          }
      })
  }
 // 跨域 预检放行  
  if (request.method === 'OPTIONS') {
    return new Response(null, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
            "Access-Control-Max-Age": "86400",
            "Access-Control-Allow-Headers": "authorization,Content-Type"
        }
    })
  }
  if (request.method === 'DELETE') {
      await R2.delete(url.pathname.slice(1))
      return new Response()
  }

  return new Response(`Unsupported method`, {
      status: 400
  })
}

function parseRange(encoded) {
  if (encoded === null) {
      return
  }

  const parts = encoded.split("bytes=")[1]?.split("-") ?? []
  if (parts.length !== 2) {
      throw new Error('Not supported to skip specifying the beginning/ending byte at this time')
  }

  return {
      offset: Number(parts[0]),
      length: Number(parts[1]) + 1 - Number(parts[0]),
  }
}

function objectNotFound(objectName) {
  return new Response(`<html><body>R2 object "<b>${objectName}</b>" not found</body></html>`, {
      status: 404,
      headers: {
          'content-type': 'text/html; charset=UTF-8'
      }
  })
}

```