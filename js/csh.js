(function () {
    var webtype = $("#csh_td").attr("webtype")
    // webtype 【导航高亮】0=首页，1=规则，2=脚本，3=应用，4=其他
    var leix = ["", "", "", "", "",""]
    leix[webtype] = `class="active"`
    var navbar = `<div class="navbar-fixed-top">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="index.html">iPhone 8、小良</a>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li ${leix[0]}><a href="index.html">首页 <span class="sr-only">(current)</span></a></li>
                        <li ${leix[1]}><a href="gz.html">快捷指令-规则</a></li>
                        <li ${leix[2]}><a href="jb.html">Jsbox-Pin-脚本</a></li>
                        <li ${leix[3]}><a href="yy.html">破解APP应用</a></li>
                        <li ${leix[4]}><a href="qt.html">各类实用教程</a></li>
                        <li><a href="youhou.html">油猴脚本</a></li>
                        <li ${leix[5]} class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                                aria-haspopup="true" aria-expanded="false">其他 <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="appleid.html">苹果共享ID - 可下载小火箭</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="vip/zx.html" target="_blank">VIP在线解析 - 网页版</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="vip/jxdm.html" target="_blank">Safari书签 - 解析代码</a></li>
                                <li><a href="vip/s.html" target="_blank">Safari浏览器 - 解析教程</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="javascript:void(0);" class="gzhsb">微信公众号</a>
                            <div class="gzh"><img src="img/gzh.jpg" alt="微信搜索：ae85-cn">
                            </div>
                        </li>
                        <li><a href="https://87xl.cn" target="_blank">博客</a></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                                aria-haspopup="true" aria-expanded="false">关于作者<span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="https://87xl.cn" target="_blank">博客：87xl.cn</a></li>
                                <li><a href="https://weibo.com/u/6216079977" target="_blank">微博：小良_Ge</a></li>
                                <li><a href="#">Q Q：84088289</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="https://twitter.com/yoocl_77" target="_blank">Twitter：@yoocl_77</a></li>
                            </ul>
                        </li>
                    </ul>
                </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->
        </nav>
    </div>`

    var dibu = `    <div class="dibu">
    <p>iPhone、小良 ©2016~2023</p>
    <p>本站所有内容均为小良原创作品，未经允许请勿转载！</p>
</div>`

    $('#navbar').html(navbar)
    $('#dibu').html(dibu)

})();