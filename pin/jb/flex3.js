/*
Flex 3补丁管理
可合成flex多个patches.plist文件
内置云端补丁，可以从云端添加。

by：iPhone 8、小良
https://ae85.cn/
*/

$app.autoKeyboardEnabled = true
var arr = [], yunarr = []
function xrwj() {
	dd = daoc()
	var success = $file.write({
		data: $data(dd),
		path: "patches.plist"
	})
	if (success) {
		$ui.toast("已保存到本地");
	}
}
const conView = {
	type: "view",
	props: {
		id: "conView",
	},
	views: [{
		type: "label",
		props: {
			text: "Flex 3 补丁管理",
			textColor: $color("tint"),
			font: $font("bold", 25)
		},
		layout: (make, view) => {
			make.height.equalTo(45)
			make.centerY.equalTo(view.center)
			make.left.equalTo(15)
		}
	}, {
		type: "image",
		props: {
			icon: $icon("165", $color("tint"), $size(30, 30)),
			bgcolor: $color("clear")
		},
		layout: (make, view) => {
			make.right.equalTo(view.super).offset(-15)
			make.height.width.equalTo(30)
			make.centerY.equalTo(view.center)
		},
		events: {
			tapped: sender => {

				if ($file.exists("yunbd.plist")) {
					var xml = $file.read("yunbd.plist").string;
					var qtou = xml.replace(/<\?xml[^\♀]+\s+<key>patches<\/key>\n\s+<array>\n\s+<dict>/, "")
					var qwei = qtou.replace(/\s+<\/dict>\n\s+<\/array>\n<\/dict>\n<\/plist>/, "")
					var yunarr = qwei.split(`</dict>\n\t\t<dict>`);
					data = []
					for (i in yunarr) {
						var a = yunarr[i]
						var t = a.match(/<key>name<\/key>\n\s+.*?<\/string>/)[0]
						var mc = t.match(/<string>(.*?)<\/string>/)[1]
						data.push(mc)
					}

					$("zhuView").add({
						type: "view",
						props: {
							id: "archivesView",
							alpha: 1
						},
						layout: (make, view) => {
							make.height.width.equalTo(view.super)
							make.center.equalTo(view.super)
						},
						views: [{
							type: "blur",
							props: {
								style: 2,
								alpha: 1,
							},
							layout: $layout.fill,
							events: {
								tapped: sender => {
									$ui.animate({
										duration: 0.2,
										animation: () => {
											$("archivesView").alpha = 0
										},
										completion: () => {
											sender.super.remove()
										}
									})
								}
							}
						}, {
							type: "view",
							props: {
								id: "yunView",
								radius: 10,
								bgcolor: $color("#FFF")
							},
							layout: (make, view) => {
								make.height.equalTo(view.super).dividedBy(12 / 9)
								make.width.equalTo(view.super).dividedBy(12 / 11)
								make.center.equalTo(view.super)
							},
							views: [{
								type: "label",
								props: {
									text: "云端补丁",
									id: "yunbq",
									font: $font("bold", 20),
									align: $align.center
								},
								layout: (make, view) => {
									make.left.right.inset(10);
									make.top.inset(10);
								}
							}, {
								type: "list",
								props: {
									id: "yunlist",
									reorder: true,
									data: data
								},
								layout: (make) => {
									make.right.left.bottom.inset(2)
									make.top.equalTo($("yunbq").bottom).offset(10)
								},
								events: {
									didSelect: (sender, indexPath, data) => {
										var feng = yunarr[indexPath.item]
										arr = arr.concat(feng)
										listsa(arr)
										$ui.toast("已添加", 0.6);
									},

								}

							}]
						},]
					})
				}else{
					alert("云端数据处理中请稍候···")
				}
			}
		}
	}, {
		type: "image",
		props: {
			icon: $icon("074", $color("tint"), $size(25, 25)),
			bgcolor: $color("clear")
		},
		layout: (make, view) => {
			make.right.equalTo(view.prev.left).offset(-15)
			make.height.width.equalTo(25)
			make.centerY.equalTo(view.center)
		},
		events: {
			tapped: sender => {
				var info = $cache.get("info")
				$ui.alert({
					title: '感谢支持',
					message: '作者投入大量时间和精力对脚本进行开发和完善，你愿意给他赏杯咖啡支持一下吗？',
					actions: [{
						title: "微信",
						handler: () => {
							$ui.alert({
								title: "是否愿意赞赏？",
								message: "\n确定后会自动保存赞赏码到相册！\n并自动打开微信扫一扫！",
								actions: [
									{
										title: "确定",
										handler: () => {
											$http.download({
												url: info.wxzs,
												handler: (resp) => {
													$photo.save({
														data: resp.data,
														handler: (success) => {
															$app.openURL("weixin://scanqrcode");
														}
													})
												}
											})
										}
									},
									{
										title: "取消",
									}
								]
							});
						}
					}, {
						title: "支付宝",
						handler: () => {
							$app.openURL(info.zfbzs)
						}
					}, {
						title: "返回"
					}]
				})
			}
		}
	},
	],
	layout: (make, view) => {
		make.top.inset(35)
		make.right.left.inset(0)
		make.height.equalTo(50)
	}
}

$ui.render({
	props: {
		navBarHidden: 1,
		statusBarStyle: 0,
		id: "zhuView"
	},
	views: [conView, {
		type: "view",
		props: {
			id: "zhoView",
			bgcolor: $color("#dddddd")
		},
		layout: (make, view) => {
			make.top.equalTo($("conView").bottom).offset(10)
			make.right.left.inset(10)
			make.bottom.inset(100)

		},
		views: [{
			type: "matrix",
			props: {
				id: "matrix-cai",
				columns: 3,
				scrollEnabled: false,
				itemHeight: 40,
				bgcolor: $color("#f0f5f5"),
				data: [{ title: { text: "添加补丁" } }, { title: { text: "清空补丁" } }, { title: { text: "保存补丁" } }],
				template: [{
					type: "label",
					props: {
						id: "title",
						align: $align.center,
						font: $font("bold", 16),
						textColor: $color("tint"),
						autoFontSize: true
					},
					layout: $layout.fill
				}],
				info: {}
			},
			layout: (make, view) => {
				make.height.equalTo(40)
				make.top.left.right.inset(2)
			},
			events: {
				didSelect: (sender, indexPath, data) => {
					var btn = data.title.text
					if (btn === '保存补丁') {
						xrwj()
					} else if (btn === '添加补丁') {
						tianj()
					} else if (btn === '清空补丁') {
						$ui.alert({
							title: "是否清空所有补丁？",
							actions: [
								{
									title: "确定",
									handler: function () {
										arr = []
										$("list").data = []
									}
								},
								{
									title: "取消",
								}
							]
						});
					}
				}
			}
		}, {
			type: "list",
			props: {
				id: "list",
				reorder: true,
				actions: [
					{
						title: "delete",
						handler: (sender, indexPath) => {
							arr.splice(indexPath.item, 1);
							listsa(arr)
						}
					}
				]
			},
			layout: (make) => {
				make.right.left.bottom.inset(2)
				make.top.equalTo($("matrix-cai").bottom).offset(1)
			},
			events: {
				didSelect: (sender, indexPath, data) => {
					// 点击

				},

			}

		}]
	}, {
			type: "button",
			props: {
				id: "daocBtn",
				title: "导出补丁",
			},
			layout: (make, view) => {
				make.top.equalTo($("zhoView").bottom).inset(10)
				make.width.equalTo(100)
				make.height.equalTo(40)
				make.right.inset(10)
			},
			events: {
				tapped: sender => {
					var dd = daoc()
					$share.sheet([$("fixe-wjm").text, dd])
				}
			}
		}, {
			type: "input",
			props: {
				id: "fixe-wjm",
				placeholder: 'patches.plist',
				text: 'patches.plist',
				font: $font(18),
				type: $kbType.default
			},
			layout: (make, view) => {
				make.top.equalTo($("zhoView").bottom).inset(10)
				make.right.equalTo($("daocBtn").left).inset(10)
				make.height.equalTo(40)
				make.left.inset(10)
			},
			events: {
				returned: sender => {
					sender.blur()
				}
			}
		}, {
			type: "label",
			props: {
				align: 1,
				font: $font(14),
				text: "iPhone 8、小良 (https://ae85.cn)",
				textColor: $color("#ddd")
			},
			layout: (make, view) => {
				make.bottom.inset(2)
				make.left.right.inset(0)
				make.height.equalTo(30)
			}
		}
	]

})

function cltouq(xml) {
	var qtou = xml.replace(/<\?xml[^\♀]+\s+<key>patches<\/key>\n\s+<array>\n\s+<dict>/, "")
	var qwei = qtou.replace(/\s+<\/dict>\n\s+<\/array>\n<\/dict>\n<\/plist>/, "")
	var feng = qwei.split(`</dict>\n\t\t<dict>`);
	arr = arr.concat(feng)
	listsa(arr)
}

function listsa(arr) {
	data = []
	for (i in arr) {
		var a = arr[i]
		var t = a.match(/<key>name<\/key>\n\s+.*?<\/string>/)[0]
		var mc = t.match(/<string>(.*?)<\/string>/)[1]
		data.push(mc)
	}
	$("list").data = data
}

function daoc() {
	var data
	if (arr.length) {
		for (i in arr) {
			var tou = `<dict>${arr[i]}`, wei = `</dict>\n\t\t`
			if (i == 0) {
				data = tou + wei
			} else if (i == arr.length - 1) {
				data = data + tou
			} else {
				data = data + tou + wei
			}

		}
		var plist = `<?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
  <dict>
	  <key>patches</key>
	  <array>
		  ${data}
		  </dict>
	  </array>
  </dict>
  </plist>`
		var dd = $data({
			string: plist
		})
		return dd;
	}
}

function tianj() {
	$ui.menu({
		items: ["剪贴板", "iCloud 云盘",],
		handler: (title, idx) => {
			switch (idx) {
				case 0:
					var text = $clipboard.text
					if (text.indexOf("<?xml") == -1) {
						$ui.alert("未能识别剪贴板中的补丁");
					} else {
						cltouq(text)
					}
					break
				case 1:
					$drive.open({
						handler: (data) => {
							var data = data.string
							cltouq(data)
						}
					})
					break
			}
		}
	});
}

if ($file.exists("patches.plist")) {
	var file = $file.read("patches.plist").string;
	cltouq(file)
}

$http.get({
	url: $text.base64Decode("aHR0cHM6Ly9naXRlZS5jb20veWFvMDcvdXBkYXRlX2RldmljZS9yYXcvbWFzdGVyLw==") + "flex3.json",
	handler: (resp) => {
		if (resp.data.bb != "1.0") {
			$ui.alert({
				title: "温馨提示：",
				message: resp.data.gxsm,
				actions: [
					{
						title: "访问官网",
						handler: () => {
							$app.openURL(resp.data.gw);
						}
					},
					{
						title: "关注公众号",
						handler: () => {
							$ui.alert({
								title: "温馨提示",
								message: "跳转微信会自动复制公众号ID\n请跳转到微信-搜索-公用号-粘贴-关注",
								actions: [{
									title: "跳转微信",
									handler: () => {
										$clipboard.text = "ae85-cn"
										$app.openURL("weixin://")
									}
								}, {
									title: "取消"
								}]
							})
						}
					}
				]
			});
		} else {
			$cache.set("info", resp.data);
			pdybb(resp.data.yunbb);
		}
	}
})

function pdybb(bb) {
	if ($file.exists("ybb.txt")) {
		var file = $file.read("ybb.txt").string;
		if (file != bb) {
			await:downloadbd(bb);
		}
	} else {
		await:downloadbd(bb);
	}
}

function downloadbd(bb) {
	$http.download({
		url: $cache.get("info").yunurl,
		handler: (resp) => {
			if (resp.response.statusCode == "200") {
				$file.write({
					data: $data(resp.data),
					path: "yunbd.plist"
				});
				pdxia(bb)
			}
		}
	});
}

function pdxia(nr) {
	$file.write({
		data: $data({ string: nr }),
		path: "ybb.txt"
	});
}