# netlify-serverless
全局安装netlify 并登入
```bash
npm i -g netlify-cli
netlify login
```
创建一个netlify项目 和初始化node项目
```bash
netlify init
npm init -y
```

在项目的根目录下创建一个 netlify.toml 文件，用于配置 Netlify 的部署设置：
 > publish 指定发布目录，functions 指定函数目录
```toml
[build]
  command = "npm install && npm run build"
  publish = "dist"
  functions = "functions"

[functions]
  external_node_modules = ["luxon"]
```

本地调试运行
```bash
netlify dev
```
创建函数
```bash
netlify function:create app
```
浏览器访问
http://localhost:8888/.netlify/functions/app/app.js

可以看到，函数的入口文件是 app.js，函数的入口函数是 exports.handler

简化函数入口文件
在 `dist/` 文件夹下创建 `_redirects` 文件，内容如下：
> /api/app /.netlify/functions/app/app.js$1

浏览器访问
http://localhost:8888/api/app?name=aaa
得到如下结果
```js
{
    "message": "Hello aaa"
}
```

