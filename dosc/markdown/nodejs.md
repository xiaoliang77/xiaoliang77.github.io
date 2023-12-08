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