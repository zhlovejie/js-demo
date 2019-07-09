
//分享的成功后调用的方法
wx_share.success(function () {
    // alert('分享成功！');
});
//分享的失败后调用的方法
wx_share.cancel(function () {
    // alert('分享取消！');
});
// alert('测试阶段，请勿转发！！！');
//分享配置方法
wx_share.config({
    state: 'gh_e89dba73fb6f'            //分享的公众号id
    , debug: false                         //测试弹窗信息，默认true
    //, config_debug: false               //微软官方的js-sdk配置是否开启，分享失败的时候可以尝试开启调试
    //, domain: 'weixin.juzhen.com'      //分享程序所在的域名，默认不修改
    , img: 'http://dongyuan.juzhen02.com/2019/dy0426/images/share.jpg'
    , url: 'http://dongyuan.juzhen02.com/2019/dy0426/index.html'
    , title: "那些年，我们的生活新势"
    , desc: "嘿，一同翻开这部40年的生活新势演变史。"
}); 