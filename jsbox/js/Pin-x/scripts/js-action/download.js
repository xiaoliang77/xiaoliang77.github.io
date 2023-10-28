function run() {
  var key= $clipboard.text
  $ui.menu({
    items: ["指尖浏览器", "Alook浏览器", "迅雷下载"],
    handler: function(title, idx) {
      if (idx == 0) {
$app.openURL("etkwwweb://"+key);
      } else if (idx == 1) {
        $app.openURL("alook://"+key);
      } else if (idx == 2) {
        $app.openURL("thunder://"+key);
      }
    },
    finished: function(cancelled) {
      var module = require("../widget");

      module.init();
    }
  });
}

module.exports = {
  run: run
};
