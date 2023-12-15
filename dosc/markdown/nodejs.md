## Nodejs 基础
[官网传送门](https://nodejs.org/en/)

### 初识 Nodejs
 > Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine
 > Node.js® 是一个基于 Chrome V8 引擎 的 JavaScript 运行时环境

基于 [Express](http://www.expressjs.com.cn/) 框架，可以快速构建 Web 应用
基于 [Electron](https://electronjs.org/) 框架，可以构建跨平台的桌面应用
基于 [restify](http://restify.com/) 框架，可以快速构建 API 接口项目
读写和操作数据库、创建实用的命令行工具辅助前端开发、etc…

### Buffer 缓冲区
 > [Buffer 缓冲区文档](http://nodejs.cn/api/buffer.html)

- Buffer 的结构与数组类似，操作方法也与数组类似
- 数组不能存储二进制文件，Buffer 是专门存储二进制数据的
- Buffer 存储的是二进制数据，显示时以 16 进制的形式显示
- Buffer 每一个元素范围是 00~ff，即 0~255、00000000~11111111
每一个元素占用一个字节内存
- Buffer 是对底层内存的直接操作，因此大小一旦确定就不能修改

Buffer 常用方法
`Buffer.from(str[, encoding])`：将一个字符串转换为 Buffer
`Buffer.alloc(size)`：创建指定大小的 Buffer
`Buffer.alloUnsafe(size)`：创建指定大小的 Buffer，可能包含敏感数据（分配内存时不会清除内存残留的数据）
`buf.toString()`：将 Buffer 数据转为字符串

```javascript
var str = 'Hello前端'

var buf = Buffer.from(str)

// 占用内存的大小，一个汉字3字节 13
console.log(buf.length)
// 字符串的长度 7
console.log(str.length)
// 8进制输出第一个元素 145
console.log(buf[1].toString(8))

//创建一个10个字节的buffer
var buf2 = Buffer.alloc(10)
//通过索引，来操作buf中的元素
buf2[0] = 88
buf2[1] = 255
buf2[2] = 0xaa
buf2[3] = 255

var buf3 = Buffer.allocUnsafe(10)
console.log(buf3)
```

### fs 文件系统模块
- fs 模块中所有的操作都有两种形式可供选择:同步和异步
- 同步文件系统会阻塞程序的执行，也就是除非操作完毕，否则不会向下执行代码
- 异步文件系统不会阻塞程序的执行，而是在操作完成时，通过回调函数将结果返回
- 实际开发很少用同步方式，因此只介绍异步方式

打开模式：

|   模式    |   说明    |
| ------  | ------ |
|r	|读取文件，文件不存在抛异常
|r+	|读写文件，文件不存在抛异常
|rs	|同步模式下打开文件用于读取
|rs+	|同步模式下打开文件用于读写
|w	|写文件，不存在则创建，存在则覆盖原有内容
|wx	|写文件，文件存在打开失败
|w+	|读写文件，不存在创建，存在截断
|wx+	|读写，存在打开失败
|a	|追加，不存在创建
|ax	|追加，存在失败
|a+	|追加和读取，不存在创建
|ax+	|追加和读取，存在失败

#### 读取文件
简单文件读取
语法格式：
```javascript
fs.readFile(path[, options], callback)
```

- `path`：文件路径
- `options`：配置选项，若是字符串则指定编码格式
    - `encoding`：编码格式
    - `flag`：打开方式
- `callback`：回调函数
    - `err`：错误信息
    - `data`：读取的数据，如果未指定编码格式则返回一个 Buffer

```javascript
const fs = require('fs')

fs.readFile('./files/1.txt', 'utf-8', function(err, data) => {
  if(err) {
    return console.log('failed!' + err.message)
  }
  console.log('content:' + data)
})


// 复制文件内容
fs.readFile("C:/Users/笔记.mp3", function(err, data) {
	if(!err) {
		console.log(data);
		// 将data写入到文件中
		fs.writeFile("C:/Users/hello.jpg", data, function(err){
			if(!err){
				console.log("文件写入成功");
			}
		} );
	}
});
```
流式文件读取
- 简单文件读取的方式会一次性读取文件内容到内存中，若文件较大，会占用过多内存影响系统性能，且读取速度慢
- 大文件适合用流式文件读取，它会分多次将文件读取到内存中
```javascript
var fs = require('fs')

// 创建一个可读流
var rs = fs.createReadStream('C:/Users/笔记.mp3')
// 创建一个可写流
var ws = fs.createWriteStream('a.mp3')

// 监听流的开启和关闭
// 这几个监听不是必须的
rs.once('open', function () {
  console.log('可读流打开了~~')
})

rs.once('close', function () {
  console.log('可读流关闭了~~')
  //数据读取完毕，关闭可写流
  ws.end()
})

ws.once('open', function () {
  console.log('可写流打开了~~')
})

ws.once('close', function () {
  console.log('可写流关闭了~~')
})

//要读取一个可读流中的数据，要为可读流绑定一个data事件，data事件绑定完毕自动开始读取数据
rs.on('data', function (data) {
  console.log(data)
  //将读取到的数据写入到可写流中
  ws.write(data)
})
```

简便方式：
```javascript
var fs = require('fs')

var rs = fs.createReadStream('C:/Users/lilichao/Desktop/笔记.mp3')
var ws = fs.createWriteStream('b.mp3')

// pipe()可以将可读流中的内容，直接输出到可写流中
rs.pipe(ws)
```

#### 写入文件
简单文件写入
语法格式：
```javascript
fs.writeFile(file, data[, options], callback)
```
- `file`：文件路径
- `data`：写入内容
- `options`：配置选项，包含 `encoding, mode, flag`；若是字符串则指定编码格式
- `callback`：回调函数

```javascript
const fs = require('fs')
fs.writeFile('./files/2.txt', 'Hello Nodejs', function (err) {
  if (err) {
    return console.log('failed!' + err.message)
  }
  console.log('success!')
})

fs.writeFile('C:/Users/hello.txt', '通过 writeFile 写入的内容', { flag: 'w' }, function (err) {
  if (!err) {
    console.log('写入成功！')
  } else {
    console.log(err)
  }
})
```

流式文件写入
```javascript
// 同步、异步、简单文件的写入都不适合大文件的写入，性能较差，容易导致内存溢出
var fs = require('fs')

// 创建一个可写流
var ws = fs.createWriteStream('hello3.txt')

ws.once('open', function () {
  console.log('流打开了~~')
})

ws.once('close', function () {
  console.log('流关闭了~~')
})

// 通过ws向文件中输出内容
ws.write('通过可写流写入文件的内容')
ws.write('1')
ws.write('2')
ws.write('3')
ws.write('4')

// 关闭流
ws.end()
```
#### 路径动态拼接问题 __dirname
- 在使用 fs 模块操作文件时，如果提供的操作路径是以 ./ 或 ../ 开头的相对路径时，容易出现路径动态拼接错误的问题
- 原因：代码在运行的时候，会以执行 node 命令时所处的目录，动态拼接出被操作文件的完整路径
- 解决方案：在使用 fs 模块操作文件时，直接提供完整的路径，从而防止路径动态拼接的问题
- __dirname 获取文件所处的绝对路径
```javascript
fs.readFile(__dirname + '/files/1.txt', 'utf8', function(err, data) {
  ...
})
```

#### 其它操作
验证路径是否存在：
- `fs.exists(path, callback)`
- `fs.existsSync(path)`

获取文件信息：
- f`s.stat(path, callback)`
- `fs.stat(path)`

删除文件：
- `fs.unlink(path, callback)`
- `fs.unlinkSync(path)`

列出文件：
- `fs.readdir(path[,options], callback)`
- `fs.readdirSync(path[, options])`

截断文件：
- `fs.truncate(path, len, callback)`
- `fs.truncateSync(path, len)`

建立目录：
- `fs.mkdir(path[, mode], callback)`
- `fs.mkdirSync(path[, mode])`

删除目录：
- `fs.rmdir(path, callback)`
- `fs.rmdirSync(path)`

重命名文件和目录：
- `fs.rename(oldPath, newPath, callback)`
- `fs.renameSync(oldPath, newPath)`

监视文件更改：
- `fs.watchFile(filename[, options], listener)`

### path 路径模块
path 模块是 Node.js 官方提供的、用来处理路径的模块。它提供了一系列的方法和属性，用来满足用户对路径的处理需求。

#### 路径拼接 `path.join()`
```javascript
const path = require('path')
const fs = require('fs')

// 注意 ../ 会抵消前面的路径
// ./ 会被忽略
const pathStr = path.join('/a', '/b/c', '../../', './d', 'e')
console.log(pathStr) // \a\d\e

fs.readFile(path.join(__dirname, './files/1.txt'), 'utf8', function (err, dataStr) {
  if (err) {
    return console.log(err.message)
  }
  console.log(dataStr)
})
```

#### 获取路径中文件名 `path.basename()`
使用 `path.basename()` 方法，可以获取路径中的最后一部分，常通过该方法获取路径中的文件名
```javascript
path.basename(path[, ext])
```

- path: 文件路径
- ext: 文件扩展名

```javascript
const path = require('path')

// 定义文件的存放路径
const fpath = '/a/b/c/index.html'

const fullName = path.basename(fpath)
console.log(fullName) // index.html

const nameWithoutExt = path.basename(fpath, '.html')
console.log(nameWithoutExt) // index
```

#### 获取路径中文件扩展名 `path.extname()`

```javascript
const path = require('path')

const fpath = '/a/b/c/index.html'

const fext = path.extname(fpath)
console.log(fext) // .html
```

### http 模块
http 模块是 Node.js 官方提供的、用来创建 web 服务器的模块。

#### 创建基本 Web 服务器
```javascript
const http = require('http')

// 创建 web 服务器实例
const server = http.createServer()

// 为服务器实例绑定 request 事件，监听客户端的请求
server.on('request', function (req, res) {
  const url = req.url
  const method = req.method
  const str = `Your request url is ${url}, and request method is ${method}`
  console.log(str)

  // 设置 Content-Type 响应头，解决中文乱码的问题
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  // 向客户端响应内容
  res.end(str)
})

server.listen(8080, function () {
  console.log('server running at http://127.0.0.1:8080')
})
```

#### 实现简陋路由效果
```javascript
const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {
  const url = req.url
  // 设置默认的响应内容为 404 Not found
  let content = '<h1>404 Not found!</h1>'
  // 判断用户请求的是否为 / 或 /index.html 首页
  // 判断用户请求的是否为 /about.html 关于页面
  if (url === '/' || url === '/index.html') {
    content = '<h1>首页</h1>'
  } else if (url === '/about.html') {
    content = '<h1>关于页面</h1>'
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(content)
})

server.listen(80, () => {
  console.log('server running at http://127.0.0.1')
})
```

### 模块化
#### 模块化概念
- 模块化是指解决一个复杂问题时，自顶向下逐层把系统划分为若干模块的过程，模块是可组合、分解和更换的单元。
- 模块化可提高代码的复用性和可维护性，实现按需加载。
- 模块化规范是对代码进行模块化拆分和组合时需要遵守的规则，如使用何种语法格式引用模块和向外暴露成员。

#### Node.js 中模块的分类
- 内置模块
- 自定义模块
- 第三方模块

#### Node.js 中的模块作用域
- 和函数作用域类似，在自定义模块中定义的变量、方法等成员，只能在当前模块内被访问，这种模块级别的访问限制，叫做模块作用域
- 防止全局变量污染

#### 模块作用域的成员
- 自定义模块中都有一个 `module` 对象，存储了和当前模块有关的信息
- 在自定义模块中，可以使用 `module.exports` 对象，将模块内的成员共享出去，供外界使用。导入自定义模块时，得到的就是 `module.exports` 指向的对象。
- 默认情况下，exports 和 `module.exports` 指向同一个对象。最终共享的结果，以` module.exports` 指向的对象为准。

#### CommonJS 模块化规范
- 每个模块内部，`module` 变量代表当前模块
- `module` 变量是一个对象，`module.exports` 是对外的接口
- 加载某个模块即加载该模块的 `module.exports` 属性

#### 模块加载机制
模块第一次加载后会被缓存，即多次调用 require() 不会导致模块的代码被执行多次，提高模块加载效率。

##### 内置模块加载
内置模块加载优先级最高。

##### 自定义模块加载
加载自定义模块时，路径要以 `./` 或 `../` 开头，否则会作为内置模块或第三方模块加载。

导入自定义模块时，若省略文件扩展名，则 `Node.js` 会按顺序尝试加载文件：

- 按确切的文件名加载
- 补全 `.js` 扩展名加载
- 补全 `.json` 扩展名加载
- 补全 `.node` 扩展名加载
- 报错

##### 第三方模块加载
- 若导入第三方模块， Node.js 会从当前模块的父目录开始，尝试从 `/node_modules` 文件夹中加载第三方模块。
- 如果没有找到对应的第三方模块，则移动到再上一层父目录中，进行加载，直到文件系统的根目录。
例如，假设在 `C:\Users\bruce\project\foo.js` 文件里调用了 `require('tools')`，则 `Node.js` 会按以下顺序查找：

- C:\Users\bruce\project\node_modules\tools
- C:\Users\bruce\node_modules\tools
- C:\Users\node_modules\tools
- C:\node_modules\tools

##### 目录作为模块加载
当把目录作为模块标识符进行加载的时候，有三种加载方式：

- 在被加载的目录下查找 package.json 的文件，并寻找 main 属性，作为 require() 加载的入口
- 如果没有 package.json 文件，或者 main 入口不存在或无法解析，则 Node.js 将会试图加载目录下的 index.js 文件。
- 若失败则报错

## Express


[官网传送门](https://www.expressjs.com.cn/)

基于 Node.js 平台，快速、开放、极简的 Web 开发框架

Express 是用于快速创建服务器的第三方模块。

### Express 初体验
#### 基本使用
安装 Express：
```bash
npm install express
```

创建服务器，监听客户端请求，并返回内容：
```javascript
const express = require('express')
// 创建 web 服务器
const app = express()

// 监听客户端的 GET 和 POST 请求，并向客户端响应具体的内容
app.get('/user', (req, res) => {
  res.send({ name: 'zs', age: 20, gender: '男' })
})
app.post('/user', (req, res) => {
  res.send('请求成功')
})

app.get('/', (req, res) => {
  // 通过 req.query 可以获取到客户端发送过来的查询参数
  console.log(req.query)
  res.send(req.query)
})

// 这里的 :id 是一个动态的参数
app.get('/user/:ids/:username', (req, res) => {
  // req.params 是动态匹配到的 URL 参数，默认是一个空对象
  console.log(req.params)
  res.send(req.params)
})

app.listen(80, () => {
  console.log('express server running at http://127.0.0.1')
})
```
#### 托管静态资源
- 通过 `express.static()` 方法可创建静态资源服务器，向外开放访问静态资源。
- Express 在指定的静态目录中查找文件，并对外提供资源的访问路径，存放静态文件的目录名不会出现在 URL 中
- 访问静态资源时，会根据托管顺序查找文件
- 可为静态资源访问路径添加前缀

```javascript
app.use(express.static('public'))
app.use(express.static('files'))
app.use('/bruce', express.static('bruce'))

/*
可直接访问 public, files 目录下的静态资源
http://localhost:3000/images/bg.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/login.js

通过带有 /bruce 前缀的地址访问 bruce 目录下的文件
http://localhost:8080/bruce/images/logo.png
*/
```
### Express 路由
创建路由模块：

```javascript
// router.js

const express = require('express')
// 创建路由对象
const router = express.Router()

// 挂载具体路由
router.get('/user/list', (req, res) => {
  res.send('Get user list.')
})
router.post('/user/add', (req, res) => {
  res.send('Add new user.')
})

// 向外导出路由对象
module.exports = router
```

注册路由模块：
```javascript
const express = require('express')
const router = require('./router')

const app = express()

// 注册路由模块，添加访问前缀
app.use('/api', router)

app.listen(80, () => {
  console.log('http://127.0.0.1')
})
```

### Express 中间件
- 中间件是指流程的中间处理环节
- 服务器收到请求后，可先调用中间件进行预处理
- 中间件是一个函数，包含 `req`, `res`, `next` 三个参数，`next()` 参数把流转关系交给下一个中间件或路由

中间件注意事项；
- 在注册路由之前注册中间件（错误级别中间件除外）
- 中间件可连续调用多个
- 别忘记调用 `next()` 函数
- `next()` 函数后别写代码
- 多个中间件共享 `req`、 `res`对象

#### 全局中间件
通过 `app.use()` 定义的中间件为全局中间件

```javascript
const express = require('express')
const app = express()

// 定义第一个全局中间件
app.use((req, res, next) => {
  console.log('调用了第1个全局中间件')
  next()
})
// 定义第二个全局中间件
app.use((req, res, next) => {
  console.log('调用了第2个全局中间件')
  next()
})

app.get('/user', (req, res) => {
  res.send('User page.')
})

app.listen(80, () => {
  console.log('http://127.0.0.1')
})
```

#### 局部中间件
```javascript
const express = require('express')
const app = express()

// 定义中间件函数
const mw1 = (req, res, next) => {
  console.log('调用了第一个局部生效的中间件')
  next()
}

const mw2 = (req, res, next) => {
  console.log('调用了第二个局部生效的中间件')
  next()
}

// 两种定义局部中间件的方式
app.get('/hello', mw2, mw1, (req, res) => res.send('hello page.'))
app.get('/about', [mw1, mw2], (req, res) => res.send('about page.'))

app.get('/user', (req, res) => res.send('User page.'))

app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1')
})
```
#### 中间件分类
1. 应用级别的中间件
- 通过 `app.use()` 或 `app.get()` 或 `app.post()` ，绑定到 `app` 实例上的中间件
2. 路由级别的中间件
- 绑定到 `express.Router()` 实例上的中间件，叫做路由级别的中间件。用法和应用级别中间件没有区别。应用级别中间件是绑定到 `app` 实例上，路由级别中间件绑定到 `router` 实例上。

```javascript
const app = express()
const router = express.Router()

router.use(function (req, res, next) {
  console.log(1)
  next()
})

app.use('/', router)
```
3. 错误级别的中间件
- 用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题
- 错误级别中间件的处理函数中，必须有 4 个形参，形参顺序从前到后分别是 (err, req, res, next) 。
- 错误级别的中间件必须注册在所有路由之后

```javascript
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  throw new Error('服务器内部发生了错误！')
  res.send('Home page.')
})

// 定义错误级别的中间件，捕获整个项目的异常错误，从而防止程序的崩溃
app.use((err, req, res, next) => {
  console.log('发生了错误！' + err.message)
  res.send('Error：' + err.message)
})

app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1')
})
```

4. Express 内置中间件
自 Express 4.16.0 版本开始，Express 内置了 3 个常用的中间件，极大的提高了 Express 项目的开发效率和体验：

- `express.static` 快速托管静态资源的内置中间件，例如： HTML 文件、图片、CSS 样式等（无兼容性）
- `express.json` 解析 JSON 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）
- `express.urlencoded` 解析 URL-encoded 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）

```javascript
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
```
5. 第三方中间件

### CORS 跨域资源共享
#### cors 中间件解决跨域
- 安装中间件：`npm install cors`
- 导入中间件：`const cors = require('cors')`
- 配置中间件：`app.use(cors())`
#### CORS
- CORS（Cross-Origin Resource Sharing，跨域资源共享）解决跨域，是通过 HTTP 响应头决定浏览器是否阻止前端 JS 代码跨域获取资源
- 浏览器的同源安全策略默认会阻止网页“跨域”获取资源。但如果接口服务器配置了 CORS 相关的 HTTP 响应头，就可解除浏览器端的跨域访问限制
- CORS 主要在服务器端进行配置。客户端浏览器无须做任何额外的配置，即可请求开启了 CORS 的接口。
- CORS 在浏览器中有兼容性。只有支持 XMLHttpRequest Level2 的浏览器，才能正常访问开启了 CORS 的服务端接口（例如：IE10+、Chrome4+、FireFox3.5+）。
#### CORS 常见响应头
- `Access-Control-Allow-Origin`：制定了允许访问资源的外域 URL

```javascript
res.setHeader('Access-Control-Allow-Origin', 'http://bruceblog.io')
res.setHeader('Access-Control-Allow-Origin', '*')
```
- Access-Control-Allow-Headers
- 默认情况下，CORS 仅支持客户端向服务器发送如下的 9 个请求头：`Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、- Content-Type （值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一）`
- 如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，通过 Access-Control-Allow-Headers 对额外的请求头进行声明，否则这次请求会失败！

```javascript
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header')
```
- `Access-Control-Allow-Methods`
- 默认情况下，CORS 仅支持客户端发起 GET、POST、HEAD 请求。如果客户端希望通过 PUT、DELETE 等方式请求服务器的资源，则需要在服务器端，通过 `Access-Control-Alow-Methods` 来指明实际请求所允许使用的 HTTP 方法
```javascript
res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, HEAD')
res.setHEader('Access-Control-Allow-Methods', '*')
```
#### CORS 请求分类
##### 简单请求
- 请求方式：GET、POST、HEAD 三者之一
- HTTP 头部信息不超过以下几种字段：无自定义头部字段、Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type（只有三个值 application/x-www-form urlencoded、multipart/form-data、text/plain）
##### 预检请求
- 请求方式为 GET、POST、HEAD 之外的请求 Method 类型
- 请求头中包含自定义头部字段
- 向服务器发送了 application/json 格式的数据

在浏览器与服务器正式通信之前，浏览器会先发送 OPTION 请求进行预检，以获知服务器是否允许该实际请求，所以这一次的 OPTION 请求称为“预检请求”。服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据


## 数据库和身份认证
### Node 操作 mysql
#### 配置 mysql 模块
1. 安装 mysql 模块
```bash
npm install mysql
```
2. 建立连接
```javascript
const mysql = require('mysql')

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'test',
})
```
3. 测试是否正常工作
```javascript
db.query('select 1', (err, results) => {
  if (err) return console.log(err.message)
  console.log(results)
})
```
#### 操作 mysql 数据库
1. 查询数据
```javascript
db.query('select * from users', (err, results) => {
  ...
})
```
2. 插入数据
```javascript
// ? 表示占位符
const sql = 'insert into users values(?, ?)'
// 使用数组的形式为占位符指定具体的值
db.query(sql, [username, password], (err, results) => {
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) console.log('插入成功')
})
```
向表中新增数据时，如果数据对象的每个属性和数据表的字段一一对应，则可以通过如下方式快速插入数据：
```javascript
const user = {username:'Bruce', password:'55520'}
const sql = 'insert into users set ?'
db.query(sql, user, (err, results) => {
  ...
})
```
3. 更新数据
```javascript
const sql = 'update users set username=?, password=? where id=?'
db.query(sql, [username, password, id], (err, results) => {
  ...
})
```
快捷方式：
```javascript
const user = {id:7,username:'Bruce',password:'55520'}
const sql = 'update users set ? where id=?'
db.query(sql, [user, user.id], (err, results) => {
  ...
})
```
4. 删除数据
```javascript
const sql = 'delete from users where id=?'
db.query(sql, id, (err, results) => {
  ...
})
```
使用 delete 语句会真正删除数据，保险起见，使用标记删除的形式，模拟删除的动作。即在表中设置状态字段，标记当前的数据是否被删除。
```javascript
db.query('update users set status=1 where id=?', 7, (err, results) => {
  ...
})
```
### Web 开发模式
#### 服务端渲染
服务器发送给客户端的 HTML 页面，是在服务器通过字符串的拼接动态生成的。因此客户端不需要使用 Ajax 额外请求页面的数据。
```javascript
app.get('/index.html', (req, res) => {
  const user = { name: 'Bruce', age: 29 }
  const html = `<h1>username:${user.name}, age:${user.age}</h1>`
  res.send(html)
})
```
优点：
- 前端耗时短。浏览器只需直接渲染页面，无需额外请求数据。
- 有利于 SEO。服务器响应的是完整的 HTML 页面内容，有利于爬虫爬取信息。

缺点：
- 占用服务器资源。服务器需要完成页面内容的拼接，若请求比较多，会对服务器造成一定访问压力。
- 不利于前后端分离，开发效率低。

#### 前后端分离
前后端分离的开发模式，依赖于 Ajax 技术的广泛应用。后端只负责提供 API 接口，前端使用 Ajax 调用接口。

优点：
- 开发体验好。前端专业页面开发，后端专注接口开发。
- 用户体验好。页面局部刷新，无需重新请求页面。
- 减轻服务器的渲染压力。页面最终在浏览器里生成。

缺点：
- 不利于 SEO。完整的 HTML 页面在浏览器拼接完成，因此爬虫无法爬取页面的有效信息。Vue、React 等框架的 SSR（server side render）技术能解决 SEO 问题。

#### 如何选择
- 企业级网站，主要功能是展示，没有复杂交互，且需要良好的 SEO，可考虑服务端渲染
- 后台管理项目，交互性强，无需考虑 SEO，可使用前后端分离
- 为同时兼顾首页渲染速度和前后端分离开发效率，可采用首屏服务器端渲染+其他页面前后端分离的开发模式

### 身份认证
#### Session 认证机制
服务端渲染推荐使用 Session 认证机制

##### Session 工作原理
session
[图]

#### Express 中使用 Session 认证
1. 安装 express-session 中间件
```bash
npm install express-session
```
2. 配置中间件
```javascript
const session = require('express-session')
app.use(
  session({
    secret: 'Bruce', // secret 的值为任意字符串
    resave: false,
    saveUninitalized: true,
  })
)
```
3. 向 session 中存数据
中间件配置成功后，可通过 `req.session` 访问 `session` 对象，存储用户信息

```javascript
app.post('/api/login', (req, res) => {
  req.session.user = req.body
  req.session.isLogin = true

  res.send({ status: 0, msg: 'login done' })
})
```
4. 从 session 取数据
```javascript
app.get('/api/username', (req, res) => {
  if (!req.session.isLogin) {
    return res.send({ status: 1, msg: 'fail' })
  }
  res.send({ status: 0, msg: 'success', username: req.session.user.username })
})
```

5. 清空 session
```javascript
app.post('/api/logout', (req, res) => {
  // 清空当前客户端的session信息
  req.session.destroy()
  res.send({ status: 0, msg: 'logout done' })
})
```

#### JWT 认证机制
前后端分离推荐使用 `JWT（JSON Web Token）`认证机制，是目前最流行的跨域认证解决方案

##### JWT 工作原理
Session 认证的局限性：

- `Session` 认证机制需要配合 `Cookie` 才能实现。由于 `Cookie` 默认不支持跨域访问，所以，当涉及到前端跨域请求后端接口的时候，需要做很多额外的配置，才能实现跨域 `Session` 认证。
- 当前端请求后端接口不存在跨域问题的时候，推荐使用 `Session` 身份认证机制。
- 当前端需要跨域请求后端接口的时候，不推荐使用 `Session` 身份认证机制，推荐使用 `JWT` 认证机制

JWT 工作原理图：

用户的信息通过 `Token` 字符串的形式，保存在客户端浏览器中。服务器通过还原 `Token` 字符串的形式来认证用户的身份。

[图]

JWT 组成部分：
- `Header`、`Payload`、`Signature`
- `Payload` 是真正的用户信息，加密后的字符串
- `Header` 和 `Signature` 是安全性相关部分，保证 `Token` 安全性
- 三者使用 . 分隔
```
Header.Payload.Signature

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInVzZXJuYW1lIjoiQnJ1Y2UiLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjoiaGVsbG8iLCJlbWFpbCI6InNjdXRAcXEuY29tIiwidXNlcl9waWMiOiIiLCJpYXQiOjE2NDE4NjU3MzEsImV4cCI6MTY0MTkwMTczMX0.bmqzAkNSZgD8IZxRGGyVlVwGl7EGMtWitvjGD-a5U5c
```

JWT 使用方式：

- 客户端会把 JWT 存储在 `localStorage` 或 `sessionStorage` 中
- 此后客户端与服务端通信需要携带 `JWT` 进行身份认证，将 `JWT` 存在 HT`TP 请求头 `Authorization` 字段中
- 加上 `Bearer` 前缀
```
Authorization: Bearer <token>
```

##### Express 使用 JWT
1. 安装
- jsonwebtoken 用于生成 JWT 字符串
- express-jwt 用于将 JWT 字符串解析还原成 JSON 对象
```bash
npm install jsonwebtoken express-jwt
```

2. 定义 secret 密钥
- 为保证 `JWT` 字符串的安全性，防止其在网络传输过程中被破解，需定义用于加密和解密的 `secret` 密钥
- 生成 `JWT` 字符串时，使用密钥加密信息，得到加密好的 `JWT` 字符串
- 把 `JWT` 字符串解析还原成 JSON 对象时，使用密钥解密
```javascript
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')

// 密钥为任意字符串
const secretKey = 'Bruce'
```

3. 生成 JWT 字符串
```javascript
app.post('/api/login', (req, res) => {
  ...
  res.send({
    status: 200,
    message: '登录成功',
    // jwt.sign() 生成 JWT 字符串
    // 参数：用户信息对象、加密密钥、配置对象-token有效期
    // 尽量不保存敏感信息，因此只有用户名，没有密码
    token: jwt.sign({username: userInfo.username}, secretKey, {expiresIn: '10h'})
  })
})
```

4. JWT 字符串还原为 JSON 对象
- 客户端访问有权限的接口时，需通过请求头的 `Authorization` 字段，将 `Token` 字符串发送到服务器进行身份认证
- 服务器可以通过 `express-jwt` 中间件将客户端发送过来的 `Token` 解析还原成 JSON 对象
```javascript
// unless({ path: [/^\/api\//] }) 指定哪些接口无需访问权限
app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }))
```

5. 获取用户信息
- 当 `express-jwt` 中间件配置成功后，即可在那些有权限的接口中，使用 `req.user` 对象，来访问从 JWT 字符串中解析出来的用户信息

```javascript
app.get('/admin/getinfo', (req, res) => {
  console.log(req.user)
  res.send({
    status: 200,
    message: '获取信息成功',
    data: req.user,
  })
})
```

6. 捕获解析 JWT 失败后产生的错误
- 当使用 `express-jwt` 解析 `Token` 字符串时，如果客户端发送过来的 `Token` 字符串过期或不合法，会产生一个解析失败的错误，影响项目的正常运行
- 通过 Express 的错误中间件，捕获这个错误并进行相关的处理

```javascript
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.send({ status: 401, message: 'Invalid token' })
  }
  res.send({ status: 500, message: 'Unknown error' })
})
```

## 大事件后台 API 项目
[API 接口文档](https://www.showdoc.cc/escook?page_id=3707158761215217)

### 1. 项目初始化
#### 1.1 创建项目
1.新建 `api_server` 文件夹作为项目根目录，并在项目根目录中运行如下的命令，初始化包管理配置文件：
```bash
npm init -y
```
2.运行如下的命令，安装特定版本的 `express`：
```bash
npm i express@4.17.1
```
3.在项目根目录中新建 `app.js`` 作为整个项目的入口文件，并初始化如下的代码：
```javascript
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// write your code here...

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, function () {
  console.log('api server running at http://127.0.0.1:3007')
})
```
#### 1.2 配置 cors 跨域
运行如下的命令，安装 cors 中间件：
```bash
npm i cors@2.8.5
```
在 app.js 中导入并配置 cors 中间件：
```javascript
const cors = require('cors')

app.use(cors())
```
#### 1.3 配置解析表单数据的中间件
通过如下的代码，配置解析 `application/x-www-form-urlencoded` 格式的表单数据的中间件：
```javascript
app.use(express.urlencoded({ extended: false }))
```
#### 1.4 初始化路由相关的文件夹
1.在项目根目录中，新建 router 文件夹，用来存放所有的路由模块
 >路由模块中，只存放客户端的请求与处理函数之间的映射关系

2.在项目根目录中，新建 router_handler 文件夹，用来存放所有的 路由处理函数模块
 >路由处理函数模块中，专门负责存放每个路由对应的处理函数

#### 1.5 初始化用户路由模块
1.在 router 文件夹中，新建 user.js 文件，作为用户的路由模块，并初始化代码：
```javascript
const express = require('express')
// 创建路由对象
const router = express.Router()

// 注册新用户
router.post('/reguser', (req, res) => {
  res.send('reguser OK')
})

// 登录
router.post('/login', (req, res) => {
  res.send('login OK')
})

module.exports = router
```
2.在 app.js 中，导入注册用户路由模块 ：
```javascript
const userRouter = require('./router/user')
app.use('/api', userRouter)
```
#### 1.6 抽离用户路由模块中的处理函数
>目的：为了保证 路由模块 的纯粹性，所有的 路由处理函数，必须抽离到对应的 路由处理函数模块 中

1.在 `/router_handler/user.js` 中，使用 `exports` 对象，分别向外共享如下两个 路由处理函数 ：
```javascript
/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */

// 注册用户的处理函数
exports.regUser = (req, res) => {
  res.send('reguser OK')
}

// 登录的处理函数
exports.login = (req, res) => {
  res.send('login OK')
}
```

2.将 `/router/user.js` 中的代码修改为如下结构：
```javascript
const express = require('express')
const router = express.Router()

// 导入用户路由处理函数模块
const userHandler = require('../router_handler/user')

// 注册新用户
router.post('/reguser', userHandler.regUser)
// 登录
router.post('/login', userHandler.login)

module.exports = router
```
### 2. 登录注册
#### 2.1 新建 ev_users 表
1.在 test 数据库中，新建 ev_users 表如下：

ev_users表结构[tu]

#### 2.2 安装并配置 mysql 模块
>在 API 接口项目中，需要安装并配置 mysql 这个第三方模块，来连接和操作 MySQL 数据库

1.运行如下命令，安装 mysql 模块：
```bash
npm i mysql@2.18.1
```
2.在项目根目录中新建 `/db/index.js`文件，在此自定义模块中创建数据库的连接对象：
```javascript
const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin123',
  database: 'my_db_01',
})

// 向外共享 db 数据库连接对象
module.exports = db
```
#### 2.3 注册
##### 2.3.0 实现步骤
1.检测表单数据是否合法
2.检测用户名是否被占用
3.对密码进行加密处理
4.插入新用户
##### 2.3.1 检测表单数据是否合法
1.判断用户名和密码是否为空
```javascript
// 接收表单数据
const userinfo = req.body
// 判断数据是否合法
if (!userinfo.username || !userinfo.password) {
  return res.send({ status: 1, message: '用户名或密码不能为空！' })
}
```
##### 2.3.2 检测用户名是否被占用
1.导入数据库操作模块：
```javascript
const db = require('../db/index')
定义 SQL 语句：
const sql = `select * from ev_users where username=?`
执行 SQL 语句并根据结果判断用户名是否被占用：
db.query(sql, [userinfo.username], function (err, results) {
  // 执行 SQL 语句失败
  if (err) {
    return res.send({ status: 1, message: err.message })
  }
  // 用户名被占用
  if (results.length > 0) {
    return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
  }
  // TODO: 用户名可用，继续后续流程...
})
```
##### 2.3.3 对密码进行加密处理
>为了保证密码的安全性，不建议在数据库以 `明文` 的形式保存用户密码，推荐对密码进行 `加密存储`

在当前项目中，使用 bcryptjs 对用户密码进行加密，优点：

- 加密之后的密码，无法被逆向破解
- 同一明文密码多次加密，得到的加密结果各不相同，保证了安全性

1.运行如下命令，安装指定版本的 `bcryptjs` ：
```hash
npm i bcryptjs@2.4.3
```
2.在 `/router_handler/user.js` 中，导入 `bcryptjs` ：
```javascript
const bcrypt = require('bcryptjs')
```
3.在注册用户的处理函数中，确认用户名可用之后，调用 `bcrypt.hashSync(明文密码, 随机盐的长度)` 方法，对用户的密码进行加密处理：
```javascript
// 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
userinfo.password = bcrypt.hashSync(userinfo.password, 10)
```
##### 2.3.4 插入新用户
1.定义插入用户的 SQL 语句：
```javascript
const sql = 'insert into ev_users set ?'
```
2.调用 `db.query()` 执行 SQL 语句，插入新用户：
```javascript
db.query(sql, { username: userinfo.username, password: userinfo.password }, function (err, results) {
  // 执行 SQL 语句失败
  if (err) return res.send({ status: 1, message: err.message })
  // SQL 语句执行成功，但影响行数不为 1
  if (results.affectedRows !== 1) {
    return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
  }
  // 注册成功
  res.send({ status: 0, message: '注册成功！' })
})
```
#### 2.4 优化 res.send() 代码
>在处理函数中，需要多次调用 `res.send()` 向客户端响应 处理失败 的结果，为了简化代码，可以手动封装一个 `res.cc()` 函数

1.在 `app.js` 中，所有路由之前，声明一个全局中间件，为 `res` 对象挂载一个 `res.cc()` 函数 ：
```javascript
// 响应数据的中间件
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})
```

#### 2.5 优化表单数据验证
>表单验证的原则：前端验证为辅，后端验证为主，后端永远不要相信前端提交过来的任何内容

在实际开发中，前后端都需要对表单的数据进行合法性的验证，而且，**后端做为数据合法性验证的最后一个关口**，在拦截非法数据方面，起到了至关重要的作用。

单纯的使用 `if...else...` 的形式对数据合法性进行验证，效率低下、出错率高、维护性差。因此，推荐使用第三方数据验证模块，来降低出错率、提高验证的效率与可维护性，**让后端程序员把更多的精力放在核心业务逻辑的处理上。**

1.安装 joi 包，为表单中携带的每个数据项，定义验证规则：
```bash
npm install joi
```
2.安装 @escook/express-joi 中间件，来实现自动对表单数据进行验证的功能：
```bash
npm i @escook/express-joi
```
3.新建 /schema/user.js 用户信息验证规则模块，并初始化代码如下：
```javascript
const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
// 密码的验证规则
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required()

// 注册和登录表单的验证规则对象
exports.reg_login_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username,
    password,
  },
}
```
4.修改 `/router/user.js` 中的代码如下：
```javascript
const express = require('express')
const router = express.Router()

// 导入用户路由处理函数模块
const userHandler = require('../router_handler/user')

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')

// 注册新用户
// 3. 在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证
// 3.1 数据验证通过后，会把这次请求流转给后面的路由处理函数
// 3.2 数据验证失败后，终止后续代码的执行，并抛出一个全局的 Error 错误，进入全局错误级别中间件中进行处理
router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser)
// 登录
router.post('/login', userHandler.login)

module.exports = router
```

5.在 `app.js` 的全局错误级别中间件中，捕获验证失败的错误，并把验证失败的结果响应给客户端：
```javascript
const joi = require('joi')

// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 未知错误
  res.cc(err)
})
```

#### 2.6 登录
##### 2.6.0 实现步骤
1.检测表单数据是否合法
2.根据用户名查询用户的数据
3.判断用户输入的密码是否正确
4.生成 JWT 的 Token 字符串

##### 2.6.1 检测登录表单的数据是否合法
1.将 `/router/user.js` 中 登录 的路由代码修改如下：
```javascript
// 登录的路由
router.post('/login', expressJoi(reg_login_schema), userHandler.login)
```

##### 2.6.2 根据用户名查询用户的数据
1.接收表单数据：
```javascript
const userinfo = req.body
```
2.定义 SQL 语句：
```javascript
const sql = `select * from ev_users where username=?`
```
3.执行 SQL 语句，查询用户的数据：
```javascript
db.query(sql, userinfo.username, function (err, results) {
  // 执行 SQL 语句失败
  if (err) return res.cc(err)
  // 执行 SQL 语句成功，但是查询到数据条数不等于 1
  if (results.length !== 1) return res.cc('登录失败！')
  // TODO：判断用户输入的登录密码是否和数据库中的密码一致
})
```

##### 2.6.3 判断用户输入的密码是否正确
>核心实现思路：调用 bcrypt.compareSync(用户提交的密码, 数据库中的密码) 方法比较密码是否一致

>返回值是布尔值（true 一致、false 不一致）

具体的实现代码如下：

```javascript
// 拿着用户输入的密码,和数据库中存储的密码进行对比
const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)

// 如果对比的结果等于 false, 则证明用户输入的密码错误
if (!compareResult) {
  return res.cc('登录失败！')
}

// TODO：登录成功，生成 Token 字符串
```

##### 2.6.4 生成 JWT 的 Token 字符串
>核心注意点：在生成 Token 字符串的时候，一定要剔除 密码 和 头像 的值

1.通过 `ES6` 的高级语法，快速剔除 `密码` 和 `头像` 的值：
```javascript
// 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
const user = { ...results[0], password: '', user_pic: '' }
```
2.运行如下的命令，安装生成 `Token` 字符串的包：
```bash
npm i jsonwebtoken@8.5.1
```
3.在 `/router_handler/user.js` 模块的头部区域，导入 `jsonwebtoken` 包：
```javascript
// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')
```
4.创建 `config.js` 文件，并向外共享 **加密** 和 **还原** Token 的 `jwtSecretKey` 字符串：
```javascript
module.exports = {
  jwtSecretKey: 'Bruce',
}
将用户信息对象加密成 Token 字符串：
// 导入配置文件
const config = require('../config')

// 生成 Token 字符串
const tokenStr = jwt.sign(user, config.jwtSecretKey, {
  expiresIn: '10h', // token 有效期为 10 个小时
})
将生成的 Token 字符串响应给客户端：
res.send({
  status: 0,
  message: '登录成功！',
  // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
  token: 'Bearer ' + tokenStr,
})
```
#### 2.7 配置解析 Token 的中间件
1.运行如下的命令，安装解析 `Token` 的中间件：
```bash
npm i express-jwt@5.3.3
```
2.在 `app.js` 中注册路由之前，配置解析 `Token` 的中间件：
```javascript
// 导入配置文件
const config = require('./config')

// 解析 token 的中间件
const expressJWT = require('express-jwt')

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
在 app.js 中的 错误级别中间件 里面，捕获并处理 Token 认证失败后的错误：
// 错误中间件
app.use(function (err, req, res, next) {
  // 省略其它代码...

  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')

  // 未知错误...
})
```
### 3. 个人中心
#### 3.1 获取用户的基本信息
##### 3.1.0 实现步骤
1.初始化 路由 模块
2.初始化 路由处理函数 模块
3.获取用户的基本信息

##### 3.1.1 初始化路由模块
1.创建 `/router/userinfo.js` 路由模块，并初始化如下的代码结构：
```javascript
// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 获取用户的基本信息
router.get('/userinfo', (req, res) => {
  res.send('ok')
})

// 向外共享路由对象
module.exports = router
```

2.在` app.js` 中导入并使用个人中心的路由模块：
```javascript
// 导入并使用用户信息路由模块
const userinfoRouter = require('./router/userinfo')
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my', userinfoRouter)
```
##### 3.1.2 初始化路由处理函数模块
1.创建 `/router_handler/userinfo.js` 路由处理函数模块，并初始化如下的代码结构：
```javascript
// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
  res.send('ok')
}
```
2.修改 `/router/userinfo.js` 中的代码如下：
```javascript
const express = require('express')
const router = express.Router()

// 导入用户信息的处理函数模块
const userinfo_handler = require('../router_handler/userinfo')

// 获取用户的基本信息
router.get('/userinfo', userinfo_handler.getUserInfo)

module.exports = router
```

##### 3.1.3 获取用户的基本信息
1.在 `/router_handler/userinfo.js` 头部导入数据库操作模块：
```javascript
// 导入数据库操作模块
const db = require('../db/index')
```
2.定义 SQL 语句：
```javascript
// 根据用户的 id，查询用户的基本信息
// 注意：为了防止用户的密码泄露，需要排除 password 字段
const sql = `select id, username, nickname, email, user_pic from ev_users where id=?`
```

3.调用 `db.query()` 执行 SQL 语句：
```javascript
// 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
db.query(sql, req.user.id, (err, results) => {
  // 1. 执行 SQL 语句失败
  if (err) return res.cc(err)

  // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
  if (results.length !== 1) return res.cc('获取用户信息失败！')

  // 3. 将用户信息响应给客户端
  res.send({
    status: 0,
    message: '获取用户基本信息成功！',
    data: results[0],
  })
})
```
#### 3.2 更新用户的基本信息
##### 3.2.0 实现步骤
1.定义路由和处理函数
2.验证表单数据
3.实现更新用户基本信息的功能

##### 3.2.1 定义路由和处理函数
1.在 `/router/userinfo.js` 模块中，新增 更新用户基本信息 的路由：
```javascript
// 更新用户的基本信息
router.post('/userinfo', userinfo_handler.updateUserInfo)
```
2.在 `/router_handler/userinfo.js` 模块中，定义并向外共享 更新用户基本信息 的路由处理函数：
```javascript
// 更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
  res.send('ok')
}
```
##### 3.2.2 验证表单数据
1.在 `/schema/user.js` 验证规则模块中，定义 **id**，**nickname**，**email** 的验证规则如下：
```javascript
// 定义 id, nickname, emial 的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
```
2.并使用 `exports` 向外共享如下的 验证规则对象：
```javascript
// 验证规则对象 - 更新用户基本信息
exports.update_userinfo_schema = {
  body: {
    id,
    nickname,
    email,
  },
}
```
3.在 `/router/userinfo.js` 模块中，导入验证数据合法性的中间件：
```javascript
// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
```
4.在 `/router/userinfo.js` 模块中，导入需要的验证规则对象：
```javascript
// 导入需要的验证规则对象
const { update_userinfo_schema } = require('../schema/user')
```
5.在 `/router/userinfo.js` 模块中，修改 更新用户的基本信息 的路由如下：
```javascript
// 更新用户的基本信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)
```

##### 3.2.3 实现更新用户基本信息的功能
1.定义待执行的 `SQL` 语句：
```javascript
const sql = `update ev_users set ? where id=?`
```
2.调用 `db.query()` 执行 SQL 语句并传参：
```javascript
db.query(sql, [req.body, req.body.id], (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.cc(err)

  // 执行 SQL 语句成功，但影响行数不为 1
  if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')

  // 修改用户信息成功
  return res.cc('修改用户基本信息成功！', 0)
})
```
#### 3.3 重置密码
##### 3.3.0 实现步骤
1.定义路由和处理函数
2.验证表单数据
3.实现重置密码的功能

##### 3.3.1 定义路由和处理函数
1.在 `/router/userinfo.js` 模块中，新增 重置密码 的路由：
```javascript
// 重置密码的路由
router.post('/updatepwd', userinfo_handler.updatePassword)
```
2.在 `/router_handler/userinfo.js` 模块中，定义并向外共享 重置密码 的路由处理函数：
```javascript
// 重置密码的处理函数
exports.updatePassword = (req, res) => {
  res.send('ok')
}
```
##### 3.3.2 验证表单数据
>核心验证思路：旧密码与新密码，必须符合密码的验证规则，并且新密码不能与旧密码一致！

1.在 `/schema/user.js` 模块中，使用 `exports` 向外共享如下的 验证规则对象：
```javascript
// 验证规则对象 - 重置密码
exports.update_password_schema = {
  body: {
    // 使用 password 这个规则，验证 req.body.oldPwd 的值
    oldPwd: password,
    // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值
    // 解读：
    // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
    // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
    // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
    newPwd: joi.not(joi.ref('oldPwd')).concat(password),
  },
}
```
2.在 `/router/userinfo.js` 模块中，导入需要的验证规则对象：
```javascript
// 导入需要的验证规则对象
const { update_userinfo_schema, update_password_schema } = require('../schema/user')
```
3.并在 重置密码的路由 中，使用 `update_password_schema` 规则验证表单的数据，示例代码如下：
```javascript
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)
```

##### 3.3.3 实现重置密码的功能
1.根据 id 查询用户是否存在：
```javascript
// 定义根据 id 查询用户数据的 SQL 语句
const sql = `select * from ev_users where id=?`

// 执行 SQL 语句查询用户是否存在
db.query(sql, req.user.id, (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.cc(err)

  // 检查指定 id 的用户是否存在
  if (results.length !== 1) return res.cc('用户不存在！')

  // TODO：判断提交的旧密码是否正确
})
```
2.判断提交的 旧密码 是否正确：
```javascript
// 在头部区域导入 bcryptjs 后，
// 即可使用 bcrypt.compareSync(提交的密码，数据库中的密码) 方法验证密码是否正确
// compareSync() 函数的返回值为布尔值，true 表示密码正确，false 表示密码错误
const bcrypt = require('bcryptjs')

// 判断提交的旧密码是否正确
const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
if (!compareResult) return res.cc('原密码错误！')
```
3.对新密码进行 bcrypt 加密之后，更新到数据库中：
```javascript
// 定义更新用户密码的 SQL 语句
const sql = `update ev_users set password=? where id=?`

// 对新密码进行 bcrypt 加密处理
const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

// 执行 SQL 语句，根据 id 更新用户的密码
db.query(sql, [newPwd, req.user.id], (err, results) => {
  // SQL 语句执行失败
  if (err) return res.cc(err)

  // SQL 语句执行成功，但是影响行数不等于 1
  if (results.affectedRows !== 1) return res.cc('更新密码失败！')

  // 更新密码成功
  res.cc('更新密码成功！', 0)
})
```
#### 3.4 更新用户头像
##### 3.4.0 实现步骤
1.定义路由和处理函数
2.验证表单数据
3.实现更新用户头像的功能

##### 3.4.1 定义路由和处理函数
1.在 `/router/userinfo.js` 模块中，新增 更新用户头像 的路由：
```javascript
// 更新用户头像的路由
router.post('/update/avatar', userinfo_handler.updateAvatar)
```
2.在 `/router_handler/userinfo.js` 模块中，定义并向外共享 更新用户头像 的路由处理函数：
```javascript
// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
  res.send('ok')
}
```
##### 3.4.2 验证表单数据
1.在 `/schema/user.js` 验证规则模块中，定义 `avatar` 的验证规则如下：
```javascript
// dataUri() 指的是如下格式的字符串数据：
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().dataUri().required()
```
2.并使用 `exports` 向外共享如下的 验证规则对象：
```javascript
// 验证规则对象 - 更新头像
exports.update_avatar_schema = {
  body: {
    avatar,
  },
}
```
3.在 `/router/userinfo.js` 模块中，导入需要的验证规则对象：
```javascript
const { update_avatar_schema } = require('../schema/user')
```
4.在 `/router/userinfo.js` 模块中，修改 更新用户头像 的路由如下：
```javascript
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)
```
##### 3.4.3 实现更新用户头像的功能
1.定义更新用户头像的 SQL 语句：
```javascript
const sql = 'update ev_users set user_pic=? where id=?'
```
2.调用 `db.query()` 执行 SQL 语句，更新对应用户的头像：
```javascript
db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.cc(err)

  // 执行 SQL 语句成功，但是影响行数不等于 1
  if (results.affectedRows !== 1) return res.cc('更新头像失败！')

  // 更新用户头像成功
  return res.cc('更新头像成功！', 0)
})
```
### 4. 文章分类管理
#### 4.1 新建 ev_article_cate 表

文章分类表结构[tu]

#### 4.2 获取文章分类列表
##### 4.2.0 实现步骤
1.初始化路由模块
2.初始化路由处理函数模块
3.获取文章分类列表数据

##### 4.2.1 初始化路由模块
1.创建 `/router/artcate.js` 路由模块，并初始化如下的代码结构：
```javascript
// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 获取文章分类的列表数据
router.get('/cates', (req, res) => {
  res.send('ok')
})

// 向外共享路由对象
module.exports = router
```
2.在 `app.js` 中导入并使用文章分类的路由模块：
```javascript
// 导入并使用文章分类路由模块
const artCateRouter = require('./router/artcate')
// 为文章分类的路由挂载统一的访问前缀 /my/article
app.use('/my/article', artCateRouter)
```
##### 4.2.2 初始化路由处理函数模块
1.创建` /router_handler/artcate.js` 路由处理函数模块，并初始化如下的代码结构：
```javascript
// 获取文章分类列表数据的处理函数
exports.getArticleCates = (req, res) => {
  res.send('ok')
}
```
2.修改 `/router/artcate.js` 中的代码如下：
```javascript
const express = require('express')
const router = express.Router()

// 导入文章分类的路由处理函数模块
const artcate_handler = require('../router_handler/artcate')

// 获取文章分类的列表数据
router.get('/cates', artcate_handler.getArticleCates)

module.exports = router
```
##### 4.2.3 获取文章分类列表数据
1.在 `/router_handler/artcate.js` 头部导入数据库操作模块：
```javascript
// 导入数据库操作模块
const db = require('../db/index')
```
2.定义 SQL 语句：
```javascript
// 根据分类的状态，获取所有未被删除的分类列表数据
// is_delete 为 0 表示没有被 标记为删除 的数据
const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'
```
3.调用 `db.query()` 执行 SQL 语句：
```javascript
db.query(sql, (err, results) => {
  // 1. 执行 SQL 语句失败
  if (err) return res.cc(err)

  // 2. 执行 SQL 语句成功
  res.send({
    status: 0,
    message: '获取文章分类列表成功！',
    data: results,
  })
})
```
#### 4.3 新增文章分类
##### 4.3.0 实现步骤
1.定义路由和处理函数
2.验证表单数据
3.查询 分类名称 与 分类别名 是否被占用
4.实现新增文章分类的功能

##### 4.3.1 定义路由和处理函数
1.在 `/router/artcate.js` 模块中，添加 新增文章分类 的路由：
```javascript
// 新增文章分类的路由
router.post('/addcates', artcate_handler.addArticleCates)
```
2.在 `/router_handler/artcate.js` 模块中，定义并向外共享 新增文章分类 的路由处理函数：
```javascript
// 新增文章分类的处理函数
exports.addArticleCates = (req, res) => {
  res.send('ok')
}
```
##### 4.3.2 验证表单数据
1.创建 `/schema/artcate.js` 文章分类数据验证模块，并定义如下的验证规则：
```javascript
// 导入定义验证规则的模块
const joi = require('joi')

// 定义 分类名称 和 分类别名 的校验规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()

// 校验规则对象 - 添加分类
exports.add_cate_schema = {
  body: {
    name,
    alias,
  },
}
```
2.在 `/router/artcate.js` 模块中，使用 **add_cate_schema** 对数据进行验证：
```javascript
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入文章分类的验证模块
const { add_cate_schema } = require('../schema/artcate')

// 新增文章分类的路由
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates)
```
##### 4.3.3 查询分类名称与别名是否被占用
1.定义查重的 SQL 语句：
```javascript
// 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
const sql = `select * from ev_article_cate where name=? or alias=?`
```
2.调用 `db.query()` 执行查重的操作：
```javascript
// 执行查重操作
db.query(sql, [req.body.name, req.body.alias], (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.cc(err)

  // 判断 分类名称 和 分类别名 是否被占用
  if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
  // 分别判断 分类名称 和 分类别名 是否被占用
  if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
  if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

  // TODO：新增文章分类
})
```
##### 4.3.4 实现新增文章分类的功能
1.定义新增文章分类的 SQL 语句：
```javascript
const sql = `insert into ev_article_cate set ?`
```
2.调用 `db.query()` 执行新增文章分类的 SQL 语句：
```javascript
db.query(sql, req.body, (err, results) => {
  // SQL 语句执行失败
  if (err) return res.cc(err)

  // SQL 语句执行成功，但是影响行数不等于 1
  if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')

  // 新增文章分类成功
  res.cc('新增文章分类成功！', 0)
})
```
#### 4.4 根据 Id 删除文章分类
##### 4.4.0 实现步骤
1.定义路由和处理函数
2.验证表单数据
3.实现删除文章分类的功能

##### 4.4.1 定义路由和处理函数
1.在 `/router/artcate.js` 模块中，添加 删除文章分类 的路由：
```javascript
// 删除文章分类的路由
router.get('/deletecate/:id', artcate_handler.deleteCateById)
```
2.在 `/router_handler/artcate.js` 模块中，定义并向外共享 删除文章分类 的路由处理函数：
```javascript
// 删除文章分类的处理函数
exports.deleteCateById = (req, res) => {
  res.send('ok')
}
```
##### 4.4.2 验证表单数据
1.在 `/schema/artcate.js` 验证规则模块中，定义 id 的验证规则如下：
```javascript
// 定义 分类Id 的校验规则
const id = joi.number().integer().min(1).required()
```
2.并使用 exports 向外共享如下的 验证规则对象：
```javascript
// 校验规则对象 - 删除分类
exports.delete_cate_schema = {
  params: {
    id,
  },
}
```
3.在 `/router/artcate.js` 模块中，导入需要的验证规则对象，并在路由中使用：
```javascript
// 导入删除分类的验证规则对象
const { delete_cate_schema } = require('../schema/artcate')

// 删除文章分类的路由
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcate_handler.deleteCateById)
```
##### 4.4.3 实现删除文章分类的功能
1.定义删除文章分类的 SQL 语句：
```javascript
const sql = `update ev_article_cate set is_delete=1 where id=?`
```
2调用 `db.query()` 执行删除文章分类的 SQL 语句：
```javascript
db.query(sql, req.params.id, (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.cc(err)

  // SQL 语句执行成功，但是影响行数不等于 1
  if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')

  // 删除文章分类成功
  res.cc('删除文章分类成功！', 0)
})
```
#### 4.5 根据 Id 获取文章分类数据
##### 4.5.0 实现步骤
1.定义路由和处理函数
2.验证表单数据
3.实现获取文章分类的功能

##### 4.5.1 定义路由和处理函数
1.在 `/router/artcate.js` 模块中，添加 根据 Id 获取文章分类 的路由：
```javascript
router.get('/cates/:id', artcate_handler.getArticleById)
```
2在 `/router_handler/artcate.js` 模块中，定义并向外共享 根据 Id 获取文章分类 的路由处理函数：
```javascript
// 根据 Id 获取文章分类的处理函数
exports.getArticleById = (req, res) => {
  res.send('ok')
}
```
##### 4.5.2 验证表单数据
1.在 `/schema/artcate.js` 验证规则模块中，使用 exports 向外共享如下的 验证规则对象：
```javascript
// 校验规则对象 - 根据 Id 获取分类
exports.get_cate_schema = {
  params: {
    id,
  },
}
```
2.在 `/router/artcate.js` 模块中，导入需要的验证规则对象，并在路由中使用：
```javascript
// 导入根据 Id 获取分类的验证规则对象
const { get_cate_schema } = require('../schema/artcate')

// 根据 Id 获取文章分类的路由
router.get('/cates/:id', expressJoi(get_cate_schema), artcate_handler.getArticleById)
```
##### 4.5.3 实现获取文章分类的功能
1.定义根据 Id 获取文章分类的 SQL 语句：
```javascript
const sql = `select * from ev_article_cate where id=?`
```
2.调用 db.query() 执行 SQL 语句：
```javascript
db.query(sql, req.params.id, (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.cc(err)

  // SQL 语句执行成功，但是没有查询到任何数据
  if (results.length !== 1) return res.cc('获取文章分类数据失败！')

  // 把数据响应给客户端
  res.send({
    status: 0,
    message: '获取文章分类数据成功！',
    data: results[0],
  })
})
```
#### 4.6 根据 Id 更新文章分类数据
##### 4.6.0 实现步骤
1.定义路由和处理函数
2.验证表单数据
3.查询 分类名称 与 分类别名 是否被占用
4.实现更新文章分类的功能

##### 4.6.1 定义路由和处理函数
1.在 `/router/artcate.js` 模块中，添加 更新文章分类 的路由：
```javascript
// 更新文章分类的路由
router.post('/updatecate', artcate_handler.updateCateById)
```
2.在 `/router_handler/artcate.js` 模块中，定义并向外共享 更新文章分类 的路由处理函数：
```javascript
// 更新文章分类的处理函数
exports.updateCateById = (req, res) => {
  res.send('ok')
}
```
##### 4.6.2 验证表单数据
1.在 `/schema/artcate.js` 验证规则模块中，使用 exports 向外共享如下的 验证规则对象：
```javascript
// 校验规则对象 - 更新分类
exports.update_cate_schema = {
  body: {
    Id: id,
    name,
    alias,
  },
}
```
2.在 /router/artcate.js 模块中，导入需要的验证规则对象，并在路由中使用：
```javascript
// 导入更新文章分类的验证规则对象
const { update_cate_schema } = require('../schema/artcate')

// 更新文章分类的路由
router.post('/updatecate', expressJoi(update_cate_schema), artcate_handler.updateCateById)
```
##### 4.5.4 查询分类名称与别名是否被占用
1.定义查重的 SQL 语句：
```javascript
// 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
const sql = `select * from ev_article_cate where Id<>? and (name=? or alias=?)`
```
2.调用 `db.query()` 执行查重的操作：
```javascript
// 执行查重操作
db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.cc(err)

  // 判断 分类名称 和 分类别名 是否被占用
  if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
  if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
  if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

  // TODO：更新文章分类
})
```
##### 4.5.5 实现更新文章分类的功能
1.定义更新文章分类的 SQL 语句：
```javascript
const sql = `update ev_article_cate set ? where Id=?`
```
2.调用 `db.query()` 执行 SQL 语句：
```javascript
db.query(sql, [req.body, req.body.Id], (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.cc(err)

  // SQL 语句执行成功，但是影响行数不等于 1
  if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')

  // 更新文章分类成功
  res.cc('更新文章分类成功！', 0)
})
```
### 5. 文章管理
#### 5.1 新建 ev_articles 表

ev_articles表结构[tu]

#### 5.2 发布新文章
##### 5.2.0 实现步骤
1.初始化路由模块
2.初始化路由处理函数模块
3.使用 multer 解析表单数据
4.验证表单数据
5.实现发布文章的功能

##### 5.2.1 初始化路由模块
1.创建 `/router/article.js` 路由模块，并初始化如下的代码结构：
```javascript
// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 发布新文章
router.post('/add', (req, res) => {
  res.send('ok')
})

// 向外共享路由对象
module.exports = router
```
2.在 `app.js` 中导入并使用文章的路由模块：
```javascript
// 导入并使用文章路由模块
const articleRouter = require('./router/article')
// 为文章的路由挂载统一的访问前缀 /my/article
app.use('/my/article', articleRouter)
```
##### 5.2.2 初始化路由处理函数模块
1.创建 `/router_handler/article.js` 路由处理函数模块，并初始化如下的代码结构：
```javascript
// 发布新文章的处理函数
exports.addArticle = (req, res) => {
  res.send('ok')
}
```
2.修改 `/router/article.js` 中的代码如下：
```javascript
const express = require('express')
const router = express.Router()

// 导入文章的路由处理函数模块
const article_handler = require('../router_handler/article')

// 发布新文章
router.post('/add', article_handler.addArticle)

module.exports = router
```
##### 5.2.3 使用 multer 解析表单数据
> 注意：使用 express.urlencoded() 中间件无法解析 multipart/form-data 格式的请求体数据。

> 当前项目，推荐使用 multer 来解析 multipart/form-data 格式的表单数据。https://www.npmjs.com/package/multer

1.运行如下的终端命令，在项目中安装 multer：
```bash
npm i multer@1.4.2
```
2.在 `/router_handler/article.js` 模块中导入并配置 multer：
```javascript
// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })
```
3.修改 发布新文章 的路由如下：
```javascript
// 发布新文章的路由
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
router.post('/add', upload.single('cover_img'), article_handler.addArticle)
```
4.在 `/router_handler/article.js` 模块中的 **addArticle** 处理函数中，将 **multer** 解析出来的数据进行打印：
```javascript
// 发布新文章的处理函数
exports.addArticle = (req, res) => {
  console.log(req.body) // 文本类型的数据
  console.log('--------分割线----------')
  console.log(req.file) // 文件类型的数据

  res.send('ok')
}
```
##### 5.2.4 验证表单数据
> 实现思路：通过 express-joi 自动验证 req.body 中的文本数据；通过 if 判断手动验证 req.file 中的文件数据；

1.创建 `/schema/article.js` 验证规则模块，并初始化如下的代码结构：
```javascript
// 导入定义验证规则的模块
const joi = require('joi')

// 定义 标题、分类Id、内容、发布状态 的验证规则
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿').required()

// 验证规则对象 - 发布文章
exports.add_article_schema = {
  body: {
    title,
    cate_id,
    content,
    state,
  },
}
```
2.在 `/router/article.js` 模块中，导入需要的验证规则对象，并在路由中使用：
```javascript
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入文章的验证模块
const { add_article_schema } = require('../schema/article')

// 发布新文章的路由
// 注意：在当前的路由中，先后使用了两个中间件：
//       先使用 multer 解析表单数据
//       再使用 expressJoi 对解析的表单数据进行验证
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle)
```
3.在 `/router_handler/article.js` 模块中的 **addArticle** 处理函数中，通过 if 判断客户端是否提交了 封面图片：
```javascript
// 发布新文章的处理函数
exports.addArticle = (req, res) => {
    // 手动判断是否上传了文章封面
  if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')

  // TODO：表单数据合法，继续后面的处理流程...
}
```
##### 5.2.5 实现发布文章的功能
1.整理要插入数据库的文章信息对象：
```javascript
// 导入处理路径的 path 核心模块
const path = require('path')

const articleInfo = {
  // 标题、内容、状态、所属的分类Id
  ...req.body,
  // 文章封面在服务器端的存放路径
  cover_img: path.join('/uploads', req.file.filename),
  // 文章发布时间
  pub_date: new Date(),
  // 文章作者的Id
  author_id: req.user.id,
}
```
2.定义发布文章的 SQL 语句：
```javascript
const sql = `insert into ev_articles set ?`
```
3.调用 `db.query()` 执行发布文章的 SQL 语句：
```javascript
// 导入数据库操作模块
const db = require('../db/index')

// 执行 SQL 语句
db.query(sql, articleInfo, (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.cc(err)

  // 执行 SQL 语句成功，但是影响行数不等于 1
  if (results.affectedRows !== 1) return res.cc('发布文章失败！')

  // 发布文章成功
  res.cc('发布文章成功', 0)
})
```
4.在 `app.js` 中，使用 `express.static()` 中间件，将 `uploads` 目录中的图片托管为静态资源：
```javascript
// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))
```