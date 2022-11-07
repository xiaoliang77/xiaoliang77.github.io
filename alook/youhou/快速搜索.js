// ==UserScript==
// @name         快速搜索
// @namespace    https://iphone8.vip/
// @version      0.1
// @description  在系统搜索框输入关键字+需要搜索的内容，即可跳转到对应的网站并搜索内容
// @author       iPhone8、小良
// @match        *://m.baidu.com/*word=*
// @icon         https://iphone8.vip/img/ssgjdq.jpg
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
   
    const info = [{ 'name': '豆瓣搜索', 'Keyword': 'db', 'url': 'https://m.douban.com/search/?query=' }, 
    { 'name': '谷歌搜索', 'Keyword': 'gg', 'url': 'https://www.google.com/search?q=' }, 
    { 'name': '大师兄影视', 'Keyword': 'dsx', 'url': 'https://dsxys.pro/sb/ke7nhZe3c1-.html?wd=' }, 
    { 'name': '555电影', 'Keyword': '555', 'url': 'https://www.555dy.me/vodsearch/-------------.html?wd=' },
    { 'name': '爱奇艺', 'Keyword': 'iqy', 'url': 'https://m.iqiyi.com/search.html?source=input&key=' },
    { 'name': '高德导航', 'Keyword': 'dh', 'url': 'iosamap://poi?sourceApplication=pin&name=' }]
    
    const str = location.search
    for (let i = 0; i < info.length; i++) {
        const element = info[i];
        if (location.search.indexOf(element.Keyword) != -1) {
            var index = str.lastIndexOf(element.Keyword);
            var text = str.substring(index + element.Keyword.length, str.length);
            var key = decodeURI(text).replace('+', '').trim()
            jump(key, element.url)
            break;
        }
    }

    function jump(key, url) {
        location.href = url + key
    }


})();