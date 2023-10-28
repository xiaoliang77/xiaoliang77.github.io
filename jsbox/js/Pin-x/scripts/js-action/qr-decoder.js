function zImage() {
  $photo.fetch({
    count: 1,
    handler: function(image) {
      if (image) {
        decode(image);
      } else {
        $ui.loading(false);
      }
    }
  });
}

function xImage() {
  $photo.pick({
    handler: function(resp) {
      var image = resp.image;
      if (image) {
        decode(image);
      } else {
        $ui.loading(false);
      }
    }
  });
}

function xphotos() {
    $ui.menu({
      items: ["最后一张", "选择图片"],
      handler: function(title, idx) {
        idx == 0 ? zImage() : xImage();
      }
    });
}

function decode(img) {
    var text = $qrcode.decode(img)
    if (text) {
         alert("识别成功\n" + text)
        var dataManager = require("../data-manager");
        dataManager.copied2Clip(text);
        $clipboard.text=text
    } else {
        alert("识别失败")
    }
}

function csh() {
    url = $clipboard.link
    if (url) {
        $http.download({
            url: url,
            handler: function (resp) {
                decode(resp.data.image)
            }
        })
    } else {
        xphotos();
    }
}

module.exports = {
    csh: csh
}
