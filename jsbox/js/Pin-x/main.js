mode = "clip"//默认本地存储
var dataManager = require("scripts/data-manager");
dataManager.init(mode);
var path
if ($app.env == 32) {
    // 如果是这键盘中启用
    path = "scripts/keyboard"
} else {
    path = $app.env == $env.app ? "scripts/app" : "scripts/widget";
}


var module = require(path);
module.init(mode);
