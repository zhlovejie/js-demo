/*--------------------------------------------------|
| Matrix Weixin Share 2.00 | www.juzhen.com/        |
|---------------------------------------------------|
| Copyright (c) 2003-2016 juzhen                    |
|                                                   |
| Updated: 2016.02.18                               |
|--------------------------------------------------*/
/* 注意：页面必须引用jquery 和 <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script> */
/*
opt.state           公众号
opt.debug           是否debug模式
opt.config_debug    wx.config是否开启debug
opt.domain          ajax程序所在域名，默认不需要更改
opt.img             分享图片
opt.url             分享地址
opt.title           分享标题
opt.desc            分享描述
*/
var wx_share = (function () {
    //微信分享通用配置
    var default_opt = { state: 'gh_db98c1853c28', debug: true, config_debug: false, domain: 'weixin.juzhen.com', img: '', url: '', title: '', desc: '' };
    var opt = {};
    var data = { _status: 0, _completes: [], _success: [], _cancel: [], _appid: '', _timestamp: 0, _nonceStr: '', _signature: '' };
    var configUrl = GetWxConfigURL();

    function GetWxConfigURL() {
        var localURL = window.location.href;
        //请求地址（当前页面地址，可以保留?符号，去掉#号后面的）
        var url = "";
        if (localURL.indexOf('#') > 0) {
            url = localURL.substring(0, localURL.indexOf('#'));
        } else {
            url = localURL;
        }
        return url;
    }
    function Init() {
        /*新版分享*/
        wx.ready(function () {
            /*获取“分享到朋友圈”按钮点击状态及自定义分享内容接口*/
            wx.onMenuShareTimeline({
                title: opt.title, link: opt.url, imgUrl: opt.img,
                success: function () { on_success(); },
                cancel: function () { on_cancel(); }
            });
            /*获取“分享给朋友”按钮点击状态及自定义分享内容接口*/
            wx.onMenuShareAppMessage({
                title: opt.title, desc: opt.desc, link: opt.url, imgUrl: opt.img,
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () { on_success(); },
                cancel: function () { on_cancel(); }
            });
            /*获取“分享到QQ”按钮点击状态及自定义分享内容接口*/
            wx.onMenuShareQQ({
                title: opt.title, desc: opt.desc, link: opt.url, imgUrl: opt.img,
                success: function () { on_success(); },
                cancel: function () { on_cancel(); }
            });
            /*获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口*/
            wx.onMenuShareWeibo({
                title: opt.title, desc: opt.desc, link: opt.url, imgUrl: opt.img,
                success: function () { on_success(); },
                cancel: function () { on_cancel(); }
            });

            //成功以后执行
            for (var i = 0; data._completes.length > i; ++i) {
                data._completes[i]();
            }
        });
    }
    function on_success() {
        for (var i = 0; data._success.length > i; ++i) {
           
            data._success[i]();
        }
    }
    function on_cancel() {
        for (var i = 0; data._cancel.length > i; ++i) {

            data._cancel[i]();
        }
    }

    return {
        config: function (options) {
            opt.state        = (typeof (options.state) == "undefined") ? default_opt.state : options.state;
            opt.debug        = (typeof (options.debug) == "undefined") ? default_opt.debug : options.debug;
            opt.config_debug = (typeof (options.config_debug) == "undefined") ? default_opt.config_debug : options.config_debug;
            opt.domain       = (typeof (options.domain) == "undefined") ? default_opt.domain : options.domain;
            opt.img          = (typeof (options.img) == "undefined") ? default_opt.img : options.img;
            opt.url          = (typeof (options.url) == "undefined") ? default_opt.url : options.url;
            opt.title        = (typeof (options.title) == "undefined") ? default_opt.title : options.title;
            opt.desc         = (typeof (options.desc) == "undefined") ? default_opt.desc : options.desc;
            
            if (opt.debug) {
                console.log(JSON.stringify(opt));
            }

            $.ajax({
                url: 'http://' + opt.domain + '/webServices/WeChatApi.aspx?callback=?',
                type: 'post', dataType: 'jsonp', jsonp: 'callback', cache: false,
                data: { 'v': 'getjsconfig', 'state': opt.state, 'config_url': configUrl, 'r': Math.random() * 100000 },
                error: function (XMLHttpRequest, textStatus, errorThrown) { /*alert('获取微信分享数据失败！');*/ },
                success: function (d) {
                    if (opt.debug) {
                        alert(JSON.stringify(d));
                    }
                    if (d.ErrorCode == 0) {
                        data._appid = d.AppId;
                        data._timestamp = d.Timestamp;
                        data._nonceStr = d.NonceStr;
                        data._signature = d.Signature;
                        /*微信分享配置文件*/
                        wx.config({
                            debug: opt.config_debug,
                            appId: data._appid,
                            timestamp: data._timestamp,
                            nonceStr: data._nonceStr,
                            signature: data._signature,
                            jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard']
                        });
                        //设置分享
                        Init();
                    } else {
                        if (opt.debug) {
                            alert(d.ErrorMsg);
                        }
                    }
                }
            });
        },
        onMenuShareTimeline : function(options) {
            /*获取“分享到朋友圈”按钮点击状态及自定义分享内容接口*/
            console.log(JSON.stringify(options));
            wx.onMenuShareTimeline({
                title: options.title, link: options.url, imgUrl: options.img,
                success: function () { on_success(); },
                cancel: function () { on_cancel(); }
            });
        },
        onMenuShareAppMessage: function (options) {
            console.log(JSON.stringify(options));
            wx.onMenuShareAppMessage({
                title: options.title, desc: options.desc, link: options.url, imgUrl: options.img,
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () { on_success(); },
                cancel: function () { on_cancel(); }
            });
        },
        modify: function (options) {
            if (typeof (options.img) != "undefined") { opt.img = options.img; }
            if (typeof (options.url) != "undefined") { opt.url = options.url; }
            if (typeof (options.title) != "undefined") { opt.title = options.title; }
            if (typeof (options.desc) != "undefined") { opt.desc = options.desc; }
        },
        success: function (a) {
            
            0 != data._status ? a() : data._success.push(a);
        },
        cancel: function (a) {
      
            0 != data._status ? a() : data._cancel.push(a);
        },
        ready: function (a) {
          
            0 != data._status ? a() : data._completes.push(a);
        }
    };
}());