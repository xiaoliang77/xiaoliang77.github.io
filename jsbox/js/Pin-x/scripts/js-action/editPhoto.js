function run() {
  $ui.menu({
    items: ["长图拼接", "Annotate+", "Picsew"],
    handler: function(title, idx) {
      if (idx == 0) {
  $app.openURL("LongPicture://");
      } else if (idx == 1) {
        $app.openURL("Annotate://");
      } else if (idx == 2) {
        $app.openURL(
          "picsew://x-callback-url/scroll?in=recent&out=save&clean_status=yes&mockup=white_iphonex&delete_source=yes"
        );
      }
    }
  });
}
module.exports = {
  run: run
};
