# Vercel Functions - 无服务器函数（部署nodejs）

## 常见命令行

1. 将 Vercel 下载到全局（`npm i vercel -g`），不知道有什么命令就-h
2. `vercel login`：登录 Vercel 账号
3. `vercel dev`：本地开启服务
4. `vercel dev --bug`：本地开启服务并打印日志
5. `vercel`：部署本地资源到 Vercel 上
6. `vercel --prod`：更新本地网页

> vercel 可以用 vc 来代替，vc 是 Vercel 的缩写

## 配置vercel.json

1. 如果使用TypeScript需要先下载 @vercel/node 包
   
   ```bash
   npm i @vercel/node -S
   ```

2. 在vercel.json文件中填写配置：
   
   ```json
   {
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           {
             "key": "Access-Control-Allow-Origin",
             "value": "*"
           },
           {
             "key": "Access-Control-Allow-Headers",
             "value": "content-type"
           },
           {
             "key": "Access-Control-Allow-Methods",
             "value": "DELETE,PUT,POST,GET,OPTIONS"
           }
         ]
       }
     ],
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/api/"
       }
     ]
   }
   ```

## 第一种:express框架项目

```bash
npm init -y  #初始化node package.json配置
npm install express #安装 Express 框架
```

在api目录新建 index.js 文件

```js
const express = require("express");
const app = express();

app.get("/api/:slug", (req, res) => {
	const { slug } = req.params;
	res.end(`Item: ${slug}`);
});

app.get("/", (req, res) => {
	res.end(`暂未开放···开发中`);
});

export default app;
```


## 第二种: fastify 框架项目
```bash
npm init -y  #初始化node package.json配置
npm install fastify #安装 fastify 框架
```
### 在api目录新建 index.js 文件
```js
const Fastify = require('fastify')
const app = Fastify({
  logger: true, //是否开启控制台日志
})

app.get('/', async (req, reply) => {
  return reply.status(200).type('text/html').send(html)
})

// 配置路由
// app.register(require('./routes/user')) //用户路由

app.post('/', async (req, reply) => {
  console.log(req.body)
  return reply.status(200).send(JSON.stringify(req.body))
})

module.exports = async function handler(req, reply) {
  await app.ready()
  app.server.emit('request', req, reply)
}

const html = `<h1>haollo</h1>`
```

###  在 fastify 中使用 jwt 鉴权的例子
在 Fastify 中使用 JSON Web Token (JWT) 进行鉴权的简单例子。这个例子将展示如何设置 Fastify 路由来要求 JWT，并验证令牌的有效性。

首先，确保你已经安装了所需的依赖项：

```bash
npm install fastify fastify-jwt fast-json-parse fastify-reply-from fastify-plugin
```
将fastify-jwt包装成插件, 创建 plugin/authenticate.js 
```js
// 将fastify-jwt包装成插件
const fp = require("fastify-plugin")
// jwt验证所需的数据
module.exports = fp(async function(app, opts) {
  app.register(require("fastify-jwt"), {
    secret: 'iphone8-xiaoliang' //密钥
  })

  app.decorate("authenticate", async function(request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
})
```

然后，你可以创建一个简单的 Fastify 服务器，该服务器将使用 fastify-jwt 插件进行 JWT 鉴权：
```js
const Fastify = require('fastify')
const jwt = require('fastify-jwt');
const authenticate = require('../plugin/authenticate') //导入鉴权插件

const app = Fastify({
  logger: true, //是否开启控制台日志
})

// 定义一个需要鉴权的路由  
app.register(authenticate).then(()=>{
  app.get('/protected', {
    onRequest: [app.authenticate] //是否需要鉴权
  }, async (request, reply) => {
    // 如果 JWT 有效，这个处理程序将被调用  
    const userId = request.user; // 假设 JWT 中包含了 userId  
    // return reply.send(`Hello, user ${userId}!`);  
    return userId
  });
})


app.register(require('./routes/user')) //用户路由

// 定义一个不需要鉴权的路由，用于获取令牌  
app.post('/login', async (request, reply) => {
  // 这里应该是一个验证用户凭证的逻辑  
  // 假设验证成功，生成并返回一个 JWT  
  const userId = 123; // 假设的用户 ID  
  const token = jwt.sign({ userId }, 'iphone8-xiaoliang');
  return reply.header('Authorization', `Bearer ${token}`).send(token);
});



app.get('/', async (req, reply) => {
  return reply.status(200).type('text/html').send(html)
})


app.post('/', async (req, reply) => {
  console.log(req.body)
  return reply.status(200).send(JSON.stringify(req.body))
  // return reply.status(200).send('Hello World!')
})

module.exports = async function handler(req, reply) {
  await app.ready()
  app.server.emit('request', req, reply)
}

const html = `<h1>haollo</h1>`
```
