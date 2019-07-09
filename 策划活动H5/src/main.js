(function () {
    PIXI.utils.createSprite = function (id, pos, anchor, parent, alpha) {
        var sprite = new Sprite(TextureCache[id]);
        sprite.anchor.x = anchor.x;
        sprite.anchor.y = anchor.y;
        sprite.x = pos.x;
        sprite.y = pos.y;
        if (parent) {
            parent.addChild(sprite);
        }
        if (alpha) {
            sprite.alpha = alpha;
        }
        if (alpha == 0) {
            sprite.alpha = 0;
        }
        return sprite;
    }

    PIXI.utils.loadjs = function (jsArray, cb) {
        var filesNum = jsArray.length;
        for (var i in jsArray) {
            var jsPath = jsArray[i];
            var s = document.createElement('script');
            s.src = jsPath;
            s.addEventListener('load', function () {
                filesNum--;
                if (cb && filesNum <= 0) { cb(); }
            }, false);
            s.addEventListener('error', function () {
                console.log('load jsfile error!');
            }, false);
            document.body.appendChild(s);
        }
    }

    // 设置别名, 方便编码
    Container = PIXI.Container,
        autoDetectRenderer = PIXI.autoDetectRenderer,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        TextureCache = PIXI.utils.TextureCache,
        Texture = PIXI.Texture,
        Sprite = PIXI.Sprite
    Utils = PIXI.utils;

    // 补间动画
    PIXI.Ticker.timingMode = PIXI.Ticker.RAF; // 设置补间动画更新频率与渲染频率相同
    Tween = PIXI.Tween;
    Ease = PIXI.Ease;

    // 待加载资源
    var assets = [
        { 'house1': 'images/house1.png' },
        { 'house2': 'images/house2.png' },
        { 'house3': 'images/house3.png' },
        { 'house4': 'images/house4.png' },
        { 'say1': 'images/say1.png' },
        { 'say2': 'images/say2.png' },
        { 'say3': 'images/say3.png' },
        { 'say4': 'images/say4.png' },
        { 'say5': 'images/say5.png' },
        { 'btn': 'images/btn.png' },
        { 'car1': 'images/car1.png' },
        { 'car2': 'images/car2.png' },
        { 'car3': 'images/car3.png' },
        { 'car4': 'images/car4.png' },
        { 'car5': 'images/car5.png' },
        { 'car6': 'images/car6.png' },
        { 'qiao': 'images/qiao.png' },
        { 'bd1': 'images/bd1.png' },
        { 'bd2': 'images/bd2.png' },
        { 'gq1': 'images/gq1.png' },
        { 'gq2': 'images/gq2.png' },
        { 'gq3': 'images/gq3.png' },
        { 'gq4': 'images/gq4.png' },
        { 'door': 'images/door.png' },
        { 'lb1': 'images/lb1.png' },
        { 'lb2': 'images/lb2.png' },
        { 'lb3': 'images/lb3.png' },
        { 'lb4': 'images/lb4.png' },
        { 'cj1': 'images/cj1.png' },
        { 'cj2': 'images/cj2.png' },
        { 'cj3': 'images/cj3.png' },
        { 'cj4': 'images/cj4.png' },
        { 'tz': 'images/tz.png' },
        { 'kds1': 'images/kds1.png' },
        { 'kds2': 'images/kds2.png' },
        { 'kds_1': 'images/kds_1.png' },
        { 'kds_2': 'images/kds_2.png' },
        { 'kds_3': 'images/kds_3.png' },
        { 'kds_4': 'images/kds_4.png' },
        { 'pz': 'images/pz.png' },
        { 'pz2': 'images/pz2.png' },
        { 'pz3': 'images/pz3.png' },
        { 'bh1': 'images/bh1.png' },
        { 'bh2': 'images/bh2.png' },
        { 'bh3': 'images/bh3.png' },
        { 'bh4': 'images/bh4.png' },
        { 'pd1': 'images/pd1.png' },
        { 'pd2': 'images/pd2.png' },
        { 'pm1': 'images/pm1.png' },
        { 'pm2': 'images/pm2.png' },
        { 'sl1': 'images/sl1.png' },
        { 'sl2': 'images/sl2.png' },
        { 'sl3': 'images/sl3.png' },
        { 'sjg1': 'images/sjg1.png' },
        { 'sjg2': 'images/sjg2.png' },
        { 'sjg3': 'images/sjg3.png' },
        { 'sjg4': 'images/sjg4.png' },
        { 'ty': 'images/ty.png' },
        { 'run1': 'images/run1.png' },
        { 'run2': 'images/run2.png' },
        { 'run3': 'images/run3.png' },
        { 'run4': 'images/run4.png' },
        { 'qz': 'images/qz.png' },
        { 'qz2': 'images/qz2.png' },
        { 'dh1': 'images/dh1.png' },
        { 'dh2': 'images/dh2.png' },
        { 'ql1': 'images/ql1.png' },
        { 'ql2': 'images/ql2.png' },
        { 'zx1': 'images/zx1.png' },
        { 'zx2': 'images/zx2.png' },
        { 'zx3': 'images/zx3.png' },
        { 'zx4': 'images/zx4.png' },
        { 'wm_1': 'images/wm1.png' },
        { 'wm_2': 'images/wm2.png' },
        { 'elm': 'images/elm.png' },
        { 'floor': 'images/floor.png' },
        { 'mv1': 'images/mv1.png' },
        { 'mv2': 'images/mv2.png' },
        { 'yb': 'images/yb.png' },
        { 'icon': 'images/icon.jpg' },
        { 'box0': 'images/box0.jpg' },
        { 'box1': 'images/box1.jpg' },
        { 'box2': 'images/box2.jpg' },
        { 'box3': 'images/box3.jpg' },
        { 'box4': 'images/box4.jpg' },
    ];

    //背景
    for (var i = 1; i < 7; i++) {
        var bg = new Object();
        bg['bg' + i] = 'images/bg' + i + '.jpg'
        assets.push(bg);
    }

    //对话框
    for (var i = 1; i < 11; i++) {
        var text = new Object();
        text['text' + i] = 'images/text/text' + i + '.png'
        assets.push(text);
    }

    for (var i = 1; i < 6; i++) {
        var rgm = new Object();
        rgm['rgm' + i] = 'images/rgm' + i + '.png'
        assets.push(rgm);
    }

    for (var i = 1; i < 6; i++) {
        var cm = new Object();
        cm['cm' + i] = 'images/cm' + i + '.png'
        assets.push(cm);
    }

    for (var i = 1; i < 10; i++) {
        var ds = new Object();
        ds['ds' + i] = 'images/ds' + i + '.png'
        assets.push(ds);
    }

    for (var i = 1; i < 8; i++) {
        var yf = new Object();
        yf['yf' + i] = 'images/yf' + i + '.png'
        assets.push(yf);
    }

    for (var i = 1; i < 6; i++) {
        var tw = new Object();
        tw['tw' + i] = 'images/tw' + i + '.png'
        assets.push(tw);
    }

    for (var i = 0; i < 6; i++) {
        var fz = new Object();
        fz['fz' + i] = 'images/fz' + i + '.png'
        assets.push(fz);
    }

    for (var i = 1; i < 17; i++) {
        var bike = new Object();
        bike['bike' + i] = 'images/bike/bike' + i + '.png'
        assets.push(bike);
    }

    for (var i = 1; i < 14; i++) {
        var dy = new Object();
        dy['dy' + i] = 'images/dy' + i + '.png'
        assets.push(dy);
    }

    for (var i = 1; i < 6; i++) {
        var qq = new Object();
        qq['qq' + i] = 'images/qq' + i + '.png'
        assets.push(qq);
    }

    for (var i = 1; i < 8; i++) {
        var wm = new Object();
        wm['wm' + i] = 'images/wm ' + '(' + i + ')' + '.png'
        assets.push(wm);
    }

    for (var i = 1; i < 8; i++) {
        var bfx = new Object();
        bfx['bfx' + i] = 'images/bfx ' + '(' + i + ')' + '.png'
        assets.push(bfx);
    }

    for (var i = 1; i < 6; i++) {
        var d = new Object();
        d['d' + i] = 'images/d ' + '(' + i + ')' + '.png'
        assets.push(d);
    }

    for (var i = 1; i < 9; i++) {
        var wmq = new Object();
        wmq['wmq' + i] = 'images/wmq ' + '(' + i + ')' + '.png'
        assets.push(wmq);
    }

    for (var i = 1; i < 7; i++) {
        var gg = new Object();
        gg['gg' + i] = 'images/gg ' + '(' + i + ')' + '.png'
        assets.push(gg);
    }

    for (var i = 1; i < 5; i++) {
        var ggq = new Object();
        ggq['ggq' + i] = 'images/ggq ' + '(' + i + ')' + '.png'
        assets.push(ggq);
    }

    for (var i = 1; i < 10; i++) {
        var ts = new Object();
        ts['ts' + i] = 'images/ts ' + '(' + i + ')' + '.png'
        assets.push(ts);
    }

    for (var i = 1; i < 15; i++) {
        var bk = new Object();
        bk['bk' + i] = 'images/bk/bk ' + '(' + i + ')' + '.png'
        assets.push(bk);
    }
    // 待加载js
    var jsfiles = [
        'src/LoaderScene.js',
        'src/GameScene.js',
    ]

    // 预加载
    function preload() {
        // 先加载js，然后加载图片资源
        Utils.loadjs(jsfiles, function () {
            var loaderScene = new LoaderScene(assets);
            stage.addChild(loaderScene.root);
            loaderScene.load(function () {
                // 资源加载完!
                console.log('complete!');
                setTimeout(function () { $('#loadDiv').fadeOut(); }, 2000)
                setTimeout(function () {
                    $('.index').fadeIn()
                    // 显示主场景
                    var gameScene = new GameScene(assets);
                    gs = gameScene;
                    stage.addChild(gameScene.root);
                }, 2000)
            });
        })
    }

    // 初始化舞台
    function initCanvas() {
        // 创建舞台、渲染器
        stage = new Container();
        renderer = new PIXI.autoDetectRenderer(640, (document.body.clientHeight) * (640 / document.body.clientWidth));
        // 把pixi创建的canvas元素插入到dom文档中
        document.getElementById('index').appendChild(renderer.view);
    }

    // 按照每秒60的速度执行, 用来更新画面
    function animate(time) {
        requestAnimationFrame(animate);
        renderer.render(stage);
    }

    initCanvas();
    preload();
    animate();
}())

