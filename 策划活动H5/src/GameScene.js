var GameScene = function (assets) {
    // 根节点
    this.root = this.container = new PIXI.Container();
    // 执行初始化方法
    this.init();
}

//活动增量
var moY = 0;
var yn = 0;
var play = null;
var num = 0;
var isgo = false;


GameScene.prototype.init = function () {
    var root = this.root;

    // 创建容器
    var bgGroup1 = new PIXI.Container();
    this.bgGroup1 = bgGroup1;
    root.addChild(bgGroup1);

    var bgGroup2 = new PIXI.Container();

    //创建timeline
    var timeline = new PIXI.Timeline({ ignoreGlobalPause: true })
    this.timeline = timeline;
    timeline.setPaused(true)

    //绑定滑动事件 
    var _this = this;
    $('canvas').bind("touchstart", function (e) {
        e.preventDefault();
        var _touch = e.originalEvent.targetTouches[0];
        var y_ = _touch.pageY;
        clearInterval(play);
        $(this).bind("touchmove", function (e) {
            var _touch = e.originalEvent.targetTouches[0];
            var y = _touch.pageY;
            yn = y - y_;
            moY += yn * 1;
            _this.panduan();
            y_ = _touch.pageY;
        });
    }).bind("touchend", function () {
        $(this).unbind("touchmove");
        var play = setInterval(function () {
            yn *= 0.96;
            if (Math.abs(yn) < 1) clearInterval(play);
            moY += yn * 0.4;
            _this.panduan();
        }, 10)
    });

    //底图背景
    var bg1 = Utils.createSprite('bg1', { x: 0, y: 0 }, { x: 0, y: 0 }, bgGroup1, 1);
    var bg2 = Utils.createSprite('bg2', { x: 0, y: 3000 }, { x: 0, y: 0 }, bgGroup1, 1);
    var bg3 = Utils.createSprite('bg3', { x: 0, y: 6000 }, { x: 0, y: 0 }, bgGroup1, 1);
    var bg4 = Utils.createSprite('bg4', { x: 0, y: 9000 }, { x: 0, y: 0 }, bgGroup1, 1);
    var bg5 = Utils.createSprite('bg5', { x: 0, y: 12000 }, { x: 0, y: 0 }, bgGroup1, 1);
    var bg6 = Utils.createSprite('bg6', { x: 0, y: 15000 }, { x: 0, y: 0 }, bgGroup1, 1);

    // 挑扁担
    var bd_arry = [];
    for (var i = 1; i < 3; i++) {
        bd_arry.push(PIXI.Texture.fromFrame('bd' + i + ''));
    }
    bd = new PIXI.extras.AnimatedSprite(bd_arry);
    bd.x = 330;
    bd.y = 1005;
    bd.anchor.set(0.5);
    bd.animationSpeed = 0.05;
    bgGroup1.addChild(bd);
    timeline.addTween(Tween.get(bd).wait(0).to({ x: 330, y: 1070 }, 1000))

    // 升国旗
    // var gq_arry = [];
    // for (var i = 1; i < 5; i++) {
    //     gq_arry.push(PIXI.Texture.fromFrame('gq' + i + ''));
    // }
    // var gq = new PIXI.extras.AnimatedSprite(gq_arry);
    // gq.x = 240;
    // gq.y = 1378;
    // gq.anchor.set(0.5);
    // gq.animationSpeed = 0.05;
    // gq.play();
    // bgGroup1.addChild(gq);
    var door = Utils.createSprite('door', { x: 100, y: 1410 }, { x: 0, y: 0 }, bgGroup1, 1);

    //高考
    var lb_arry = [];
    for (var i = 1; i < 5; i++) {
        lb_arry.push(PIXI.Texture.fromFrame('lb' + i + ''));
    }
    var lb = new PIXI.extras.AnimatedSprite(lb_arry);
    lb.x = 460;
    lb.y = 1530;
    lb.anchor.set(0, 0);
    lb.animationSpeed = 0.05;
    lb.play();
    bgGroup1.addChild(lb);

    var cj_arry = [];
    for (var i = 1; i < 5; i++) {
        cj_arry.push(PIXI.Texture.fromFrame('cj' + i + ''));
    }
    var cj = new PIXI.extras.AnimatedSprite(cj_arry);
    cj.x = 520;
    cj.y = 1530;
    cj.anchor.set(0, 0);
    cj.animationSpeed = 0.05;
    cj.play();
    bgGroup1.addChild(cj);

    //热干面
    var rgm_arry = [];
    for (var i = 1; i < 5; i++) {
        rgm_arry.push(PIXI.Texture.fromFrame('rgm' + i + ''));
    }
    var rgm = new PIXI.extras.AnimatedSprite(rgm_arry);
    rgm.x = 437;
    rgm.y = 2242;
    rgm.anchor.set(0, 0);
    rgm.animationSpeed = 0.05;
    rgm.play();
    bgGroup1.addChild(rgm);
    var tz = Utils.createSprite('tz', { x: 640, y: 2248 }, { x: 1, y: 0 }, bgGroup1, 1);

    //吃面
    var cm_arry = [];
    for (var i = 1; i < 5; i++) {
        cm_arry.push(PIXI.Texture.fromFrame('cm' + i + ''));
    }
    var cm = new PIXI.extras.AnimatedSprite(cm_arry);
    cm.x = 640;
    cm.y = 2548;
    cm.anchor.set(1, 0);
    cm.animationSpeed = 0.04;
    cm.play();
    bgGroup1.addChild(cm);

    //电视机
    var ds_arry = [];
    for (var i = 1; i < 10; i++) {
        ds_arry.push(PIXI.Texture.fromFrame('ds' + i + ''));
    }
    var ds = new PIXI.extras.AnimatedSprite(ds_arry);
    ds.x = 320;
    ds.y = 2835;
    ds.anchor.set(0.5);
    ds.animationSpeed = 0.03;
    ds.play();
    bgGroup1.addChild(ds);
    var pz2 = Utils.createSprite('pz2', { x: 165, y: 2970 }, { x: 0.5, y: 0.5 }, bgGroup1, 1);

    var kds_arry = [];
    for (var i = 1; i < 3; i++) {
        kds_arry.push(PIXI.Texture.fromFrame('kds' + i + ''));
    }
    var kds = new PIXI.extras.AnimatedSprite(kds_arry);
    kds.x = 178.5;
    kds.y = 2900.5;
    kds.anchor.set(0.5);
    kds.animationSpeed = 0.05;
    kds.play();
    bgGroup1.addChild(kds);
    var pz = Utils.createSprite('pz', { x: 0, y: 2640 }, { x: 0, y: 0 }, bgGroup1, 1);

    var kdss_arry = [];
    for (var i = 1; i < 5; i++) {
        kdss_arry.push(PIXI.Texture.fromFrame('kds_' + i + ''));
    }
    var kdss = new PIXI.extras.AnimatedSprite(kdss_arry);
    kdss.x = 340;
    kdss.y = 3006;
    kdss.anchor.set(0.5);
    kdss.animationSpeed = 0.05;
    kdss.play();
    bgGroup1.addChild(kdss);
    var pz3 = Utils.createSprite('pz3', { x: 0, y: 2945 }, { x: 0, y: 0 }, bgGroup1, 1);

    //音符
    var yf_arry = [];
    for (var i = 1; i < 8; i++) {
        yf_arry.push(PIXI.Texture.fromFrame('yf' + i + ''));
    }
    var yf = new PIXI.extras.AnimatedSprite(yf_arry);
    yf.x = 550;
    yf.y = 2775;
    yf.anchor.set(1, 1);
    yf.animationSpeed = 0.03;
    yf.play();
    bgGroup1.addChild(yf);

    //跳舞
    var tw_arry = [];
    for (var i = 1; i < 6; i++) {
        tw_arry.push(PIXI.Texture.fromFrame('tw' + i + ''));
    }
    var tw = new PIXI.extras.AnimatedSprite(tw_arry);
    tw.x = 530;
    tw.y = 2905;
    tw.anchor.set(0.5);
    tw.animationSpeed = 0.03;
    tw.play();
    bgGroup1.addChild(tw);

    //购物
    var bh_arry = [];
    for (var i = 1; i < 5; i++) {
        bh_arry.push(PIXI.Texture.fromFrame('bh' + i + ''));
    }
    var bh = new PIXI.extras.AnimatedSprite(bh_arry);
    bh.x = 121.5;
    bh.y = 3465.5;
    bh.anchor.set(0.5);
    bh.animationSpeed = 0.04;
    bh.play();
    bgGroup1.addChild(bh);

    //排队
    var pd_arry = [];
    for (var i = 1; i < 3; i++) {
        pd_arry.push(PIXI.Texture.fromFrame('pd' + i + ''));
    }
    pd = new PIXI.extras.AnimatedSprite(pd_arry);
    pd.x = 110;
    pd.y = 4360.5;
    pd.anchor.set(0.5);
    pd.animationSpeed = 0.02;
    bgGroup1.addChild(pd);
    timeline.addTween(Tween.get(pd).wait(3100).to({ x: 190, y: 4360.5 }, 1000))

    //风筝
    var fz_arry = [];
    for (var i = 1; i < 6; i++) {
        fz_arry.push(PIXI.Texture.fromFrame('fz' + i + ''));
    }
    var fz = new PIXI.extras.AnimatedSprite(fz_arry);
    fz.x = 248.5;
    fz.y = 5467.5;
    fz.anchor.set(0.5);
    fz.animationSpeed = 0.03;
    fz.play();
    bgGroup1.addChild(fz);
    var fz0 = Utils.createSprite('fz0', { x: 70, y: 5600 }, { x: 0, y: 0 }, bgGroup1, 1);

    //游戏机
    var pm_arry = [];
    for (var i = 1; i < 3; i++) {
        pm_arry.push(PIXI.Texture.fromFrame('pm' + i + ''));
    }
    var pm = new PIXI.extras.AnimatedSprite(pm_arry);
    pm.x = 474.5;
    pm.y = 6127;
    pm.anchor.set(0.5);
    pm.animationSpeed = 0.02;
    pm.play();
    bgGroup1.addChild(pm);

    //电话
    var dh_arry = [];
    for (var i = 1; i < 3; i++) {
        dh_arry.push(PIXI.Texture.fromFrame('dh' + i + ''));
    }
    var dh = new PIXI.extras.AnimatedSprite(dh_arry);
    dh.x = 195;
    dh.y = 7950;
    dh.anchor.set(0.5);
    dh.animationSpeed = 0.03;
    dh.play();
    bgGroup1.addChild(dh);


    //三轮
    var sl_arry = [];
    for (var i = 1; i < 3; i++) {
        sl_arry.push(PIXI.Texture.fromFrame('sl' + i + ''));
    }
    sl = new PIXI.extras.AnimatedSprite(sl_arry);
    sl.x = 530;
    sl.y = 6345;
    sl.anchor.set(0.5);
    sl.animationSpeed = 0.02;
    sl.play();
    bgGroup1.addChild(sl);
    timeline.addTween(Tween.get(sl).wait(5400).to({ x: 440, y: 6415 }, 1000))
    var sl3 = Utils.createSprite('sl3', { x: 560, y: 6490 }, { x: 0.5, y: 0.5 }, bgGroup1, 1);

    //双节棍
    var sjg_arry = [];
    for (var i = 1; i < 5; i++) {
        sjg_arry.push(PIXI.Texture.fromFrame('sjg' + i + ''));
    }
    sjg = new PIXI.extras.AnimatedSprite(sjg_arry);
    sjg.x = 193;
    sjg.y = 8077;
    sjg.scale.x = 0.5
    sjg.scale.y = 0.5
    sjg.anchor.set(0.5);
    sjg.animationSpeed = 0.04;
    sjg.play();
    bgGroup1.addChild(sjg);

    //电影
    var dy_arry = [];
    for (var i = 1; i < 6; i++) {
        dy_arry.push(PIXI.Texture.fromFrame('dy' + i + ''));
    }
    dy = new PIXI.extras.AnimatedSprite(dy_arry);
    dy.x = 562;
    dy.y = 7341.5;
    dy.anchor.set(0.5);
    dy.animationSpeed = 0.02;
    dy.play();
    bgGroup1.addChild(dy);
    var ty = Utils.createSprite('ty', { x: 290, y: 7708 }, { x: 0.5, y: 0.5 }, bgGroup1, 1);

    var dys_arry = [];
    for (var i = 6; i < 14; i++) {
        dys_arry.push(PIXI.Texture.fromFrame('dy' + i + ''));
    }
    dys = new PIXI.extras.AnimatedSprite(dys_arry);
    dys.x = 405;
    dys.y = 7630;
    dys.anchor.set(0.5);
    dys.animationSpeed = 0.02;
    dys.play();
    bgGroup1.addChild(dys);

    //情侣
    var ql_arry = [];
    for (var i = 1; i < 3; i++) {
        ql_arry.push(PIXI.Texture.fromFrame('ql' + i + ''));
    }
    ql = new PIXI.extras.AnimatedSprite(ql_arry);
    ql.x = 512;
    ql.y = 12613;
    ql.anchor.set(0.5);
    ql.animationSpeed = 0.03;
    ql.play();
    bgGroup1.addChild(ql);

    //汉马
    var hm_arry = [];
    for (var i = 1; i < 5; i++) {
        hm_arry.push(PIXI.Texture.fromFrame('run' + i + ''));
    }
    hm = new PIXI.extras.AnimatedSprite(hm_arry);
    hm.x = 367;
    hm.y = 13440;
    hm.anchor.set(0.5);
    hm.animationSpeed = 0.02;
    bgGroup1.addChild(hm);
    timeline.addTween(Tween.get(hm).wait(12500).to({ x: 150, y: 13560 }, 2000))
    var qz = Utils.createSprite('qz', { x: 89, y: 13367 }, { x: 0, y: 0 }, bgGroup1, 1);

    //自行车
    var bike_arry = [];
    for (var i = 1; i < 17; i++) {
        bike_arry.push(PIXI.Texture.fromFrame('bike' + i + ''));
    }
    bike = new PIXI.extras.AnimatedSprite(bike_arry);
    bike.scale.x = 0.6
    bike.scale.y = 0.6
    bike.x = 0;
    bike.y = 15060 + 100;
    bike.anchor.set(1, 0);
    bike.animationSpeed = 0.02;
    bgGroup1.addChild(bike);
    timeline.addTween(Tween.get(bike).wait(14000).to({ x: 640 + 280, y: 14890 + 100 }, 2000))

    //气球
    var qq_arry = [];
    for (var i = 1; i < 6; i++) {
        qq_arry.push(PIXI.Texture.fromFrame('qq' + i + ''));
    }
    qq = new PIXI.extras.AnimatedSprite(qq_arry);
    qq.x = 470;
    qq.y = 9927;
    qq.anchor.set(0.5);
    qq.animationSpeed = 0.04;
    qq.play();
    bgGroup1.addChild(qq);
    var qz2 = Utils.createSprite('qz2', { x: 273, y: 9895 }, { x: 0, y: 0 }, bgGroup1, 1);

    //女生
    var wm_arry = [];
    for (var i = 1; i < 6; i++) {
        wm_arry.push(PIXI.Texture.fromFrame('wm' + i + ''));
    }
    wm = new PIXI.extras.AnimatedSprite(wm_arry);
    wm.x = 310;
    wm.y = 10500;
    wm.anchor.set(0.5);
    wm.animationSpeed = 0.04;
    bgGroup1.addChild(wm);
    timeline.addTween(Tween.get(wm).wait(9700).to({ x: 175, y: 10500 }, 1000))

    //汽车
    var car1 = Utils.createSprite('car1', { x: 450, y: 3360 }, { x: 0, y: 0 }, bgGroup1, 1);
    timeline.addTween(Tween.get(car1).wait(2700).to({ x: 230, y: 3450 }, 1000))

    var car2 = Utils.createSprite('car2', { x: -325, y: 4800 }, { x: 0, y: 0 }, bgGroup1, 1);
    timeline.addTween(Tween.get(car2).wait(3900).to({ x: 640, y: 5250 }, 2000))

    var car3 = Utils.createSprite('car3', { x: 640, y: 8380 }, { x: 0, y: 0 }, bgGroup1, 1);
    Tween.get(car3, { loop: true }).to({ x: -260 - 260, y: 9000 }, 3000)

    var car4 = Utils.createSprite('car4', { x: 640 + 360, y: 8100 }, { x: 0, y: 0 }, bgGroup1, 1);
    Tween.get(car4, { loop: true }).to({ x: -260, y: 8900 }, 3000)

    var car5 = Utils.createSprite('car5', { x: 220, y: 10440 }, { x: 1, y: 0 }, bgGroup1, 1);
    timeline.addTween(Tween.get(car5).wait(9800).to({ x: 625, y: 10580 }, 1500))

    //建筑物
    var qiao = Utils.createSprite('qiao', { x: 0, y: 4340 }, { x: 0, y: 0 }, bgGroup1, 1);
    var house1 = Utils.createSprite('house1', { x: 0, y: 10585 }, { x: 0, y: 0 }, bgGroup1, 1);
    var house2 = Utils.createSprite('house2', { x: 0, y: 11322 }, { x: 0, y: 0 }, bgGroup1, 1);

    //照相
    var zx_arry = [];
    for (var i = 1; i < 5; i++) {
        zx_arry.push(PIXI.Texture.fromFrame('zx' + i + ''));
    }
    zx = new PIXI.extras.AnimatedSprite(zx_arry);
    zx.x = 431.5;
    zx.y = 11498;
    zx.anchor.set(0.5);
    zx.animationSpeed = 0.03;
    zx.play();
    bgGroup1.addChild(zx);

    var car6 = Utils.createSprite('car6', { x: 355, y: 11410 }, { x: 0, y: 0 }, bgGroup1, 1);
    timeline.addTween(Tween.get(car6).wait(10750).to({ x: 80, y: 11510 }, 1500))

    var house3 = Utils.createSprite('house3', { x: 640, y: 11713 }, { x: 1, y: 0 }, bgGroup1, 1);
    var house4 = Utils.createSprite('house4', { x: 0, y: 12130 }, { x: 0, y: 0 }, bgGroup1, 1);
    var yb = Utils.createSprite('yb', { x: 490, y: 11150 }, { x: 0.5, y: 0.5 }, bgGroup1, 1);

    //蝙蝠侠
    var bfx_arry = [];
    for (var i = 1; i < 8; i++) {
        bfx_arry.push(PIXI.Texture.fromFrame('bfx' + i + ''));
    }
    bfx = new PIXI.extras.AnimatedSprite(bfx_arry);
    bfx.x = 690;
    bfx.y = 11620;
    bfx.anchor.set(0.5);
    bfx.animationSpeed = 0.04;
    bgGroup1.addChild(bfx);

    //掉东西
    var d_arry = [];
    for (var i = 1; i < 6; i++) {
        d_arry.push(PIXI.Texture.fromFrame('d' + i + ''));
    }
    d = new PIXI.extras.AnimatedSprite(d_arry);
    d.x = 160;
    d.y = 12783;
    d.anchor.set(0.5);
    d.animationSpeed = 0.03;
    bgGroup1.addChild(d);

    //外卖
    var wm1 = Utils.createSprite('wm_1', { x: 490, y: 12860 }, { x: 0.5, y: 0.5 }, bgGroup1, 1);
    timeline.addTween(Tween.get(wm1).wait(11850).to({ x: -90, y: 13070 }, 2000))
    var wm2 = Utils.createSprite('wm_2', { x: 290, y: 13000 }, { x: 0.5, y: 0.5 }, bgGroup2, 1);
    //
    var wmq_arry = [];
    for (var i = 1; i < 9; i++) {
        wmq_arry.push(PIXI.Texture.fromFrame('wmq' + i + ''));
    }
    wmq = new PIXI.extras.AnimatedSprite(wmq_arry);
    wmq.x = 390;
    wmq.y = 12950;
    wmq.anchor.set(0.5);
    wmq.animationSpeed = 0.03;
    bgGroup2.addChild(wmq);
    var elm = Utils.createSprite('elm', { x: 385, y: 12925 }, { x: 0.5, y: 0.5 }, bgGroup2, 1);
    bgGroup1.addChild(bgGroup2);
    timeline.addTween(Tween.get(bgGroup2).wait(12000).to({ x: -400, y: 250 }, 1500))

    //跳水
    var ts_arry = [];
    for (var i = 1; i < 10; i++) {
        ts_arry.push(PIXI.Texture.fromFrame('ts' + i + ''));
    }
    ts = new PIXI.extras.AnimatedSprite(ts_arry);
    ts.x = 320;
    ts.y = 14600;
    ts.anchor.set(0.5);
    ts.animationSpeed = 0.03;
    bgGroup1.addChild(ts);

    var bk_arry = [];
    for (var i = 1; i < 15; i++) {
        bk_arry.push(PIXI.Texture.fromFrame('bk' + i + ''));
    }
    bk = new PIXI.extras.AnimatedSprite(bk_arry);
    bk.x = 320;
    bk.y = 14600;
    bk.anchor.set(0.5);
    bk.animationSpeed = 0.03;
    bgGroup1.addChild(bk);

    //广告牌
    var gg_arry = [];
    for (var i = 1; i < 7; i++) {
        gg_arry.push(PIXI.Texture.fromFrame('gg' + i + ''));
    }
    gg = new PIXI.extras.AnimatedSprite(gg_arry);
    gg.x = 0;
    gg.y = 15340;
    gg.anchor.set(0, 0);
    gg.animationSpeed = 0.03;
    gg.play();
    bgGroup1.addChild(gg);

    //
    var mv_arry = [];
    for (var i = 1; i < 3; i++) {
        mv_arry.push(PIXI.Texture.fromFrame('mv' + i + ''));
    }
    mv = new PIXI.extras.AnimatedSprite(mv_arry);
    mv.x = 190;
    mv.y = 7085;
    mv.anchor.set(0.5);
    mv.animationSpeed = 0.03;
    mv.play();
    bgGroup1.addChild(mv);

    var floor = Utils.createSprite('floor', { x: 640, y: 16125 }, { x: 1, y: 0 }, bgGroup1, 1);

    var ggq_arry = [];
    for (var i = 1; i < 5; i++) {
        ggq_arry.push(PIXI.Texture.fromFrame('ggq' + i + ''));
    }
    ggq = new PIXI.extras.AnimatedSprite(ggq_arry);
    ggq.x = 640;
    ggq.y = 15670;
    ggq.anchor.set(1, 0);
    ggq.animationSpeed = 0.03;
    ggq.play();
    bgGroup1.addChild(ggq);

    var icon = Utils.createSprite('icon', { x: 0, y: 7640 }, { x: 0, y: 0 }, bgGroup1, 1);
    var box0 = Utils.createSprite('box0', { x: 0, y: 750 }, { x: 0, y: 0 }, bgGroup1, 1);
    var box1 = Utils.createSprite('box1', { x: 0, y: 810 }, { x: 0, y: 0 }, bgGroup1, 1);
    var box2 = Utils.createSprite('box2', { x: 360, y: 510 }, { x: 0, y: 0 }, bgGroup1, 1);
    // var box3 = Utils.createSprite('box3', { x: 0, y: 7260 }, { x: 0, y: 0 }, bgGroup1, 1);
    // var box4 = Utils.createSprite('box4', { x: 640, y: 8230 }, { x: 1, y: 0 }, bgGroup1, 1);

    //对话文字
    var text1 = Utils.createSprite('text1', { x: 350, y: 992 }, { x: 0, y: 1 }, bgGroup1, 1);
    text1.scale.x = 0;
    text1.scale.y = 0;
    timeline.addTween(Tween.get(text1.scale).wait(20).to({ x: 1, y: 1 }, 500))
    var text2 = Utils.createSprite('text4', { x: 493, y: 1530 }, { x: 1, y: 1 }, bgGroup1, 1);
    text2.scale.x = 0;
    text2.scale.y = 0;
    timeline.addTween(Tween.get(text2.scale).wait(430).to({ x: 1, y: 1 }, 500))
    var text3 = Utils.createSprite('text2', { x: 296, y: 6385 }, { x: 1, y: 1 }, bgGroup1, 1);
    text3.scale.x = 0;
    text3.scale.y = 0;
    timeline.addTween(Tween.get(text3.scale).wait(5285).to({ x: 1, y: 1 }, 500))
    var text4 = Utils.createSprite('text9', { x: 175, y: 8050 }, { x: 1, y: 1 }, bgGroup1, 1);
    text4.scale.x = 0;
    text4.scale.y = 0;
    timeline.addTween(Tween.get(text4.scale).wait(7000).to({ x: 1, y: 1 }, 500))
    var text5 = Utils.createSprite('text6', { x: 185, y: 8455 }, { x: 0, y: 1 }, bgGroup1, 1);
    text5.scale.x = 0;
    text5.scale.y = 0;
    timeline.addTween(Tween.get(text5.scale).wait(7450).to({ x: 1, y: 1 }, 500))
    var text6 = Utils.createSprite('text7', { x: 130, y: 10390 }, { x: 0, y: 1 }, bgGroup1, 1);
    text6.scale.x = 0;
    text6.scale.y = 0;
    timeline.addTween(Tween.get(text6.scale).wait(9300).to({ x: 1, y: 1 }, 500))
    var text7 = Utils.createSprite('text8', { x: 485, y: 11075 }, { x: 1, y: 1 }, bgGroup1, 1);
    text7.scale.x = 0;
    text7.scale.y = 0;
    timeline.addTween(Tween.get(text7.scale).wait(10100).to({ x: 1, y: 1 }, 500))
    var text8 = Utils.createSprite('text3', { x: 285, y: 12585 }, { x: 0, y: 1 }, bgGroup1, 1);
    text8.scale.x = 0;
    text8.scale.y = 0;
    timeline.addTween(Tween.get(text8.scale).wait(11500).to({ x: 1, y: 1 }, 500))
    var text9 = Utils.createSprite('text5', { x: 285, y: 13360 }, { x: 1, y: 1 }, bgGroup1, 1);
    text9.scale.x = 0;
    text9.scale.y = 0;
    timeline.addTween(Tween.get(text9.scale).wait(12300).to({ x: 1, y: 1 }, 500))
    var text10 = Utils.createSprite('text10', { x: 530, y: 14430 }, { x: 1, y: 1 }, bgGroup1, 1);
    text10.scale.x = 0;
    text10.scale.y = 0;
    timeline.addTween(Tween.get(text10.scale).wait(13300).to({ x: 1, y: 1 }, 500))

    //点击按钮
    var btn1 = Utils.createSprite('btn', { x: 600, y: 2800 }, { x: 0.5, y: 0.5 }, bgGroup1, 1);
    var btn2 = Utils.createSprite('btn', { x: 475, y: 2938 }, { x: 0.5, y: 0.5 }, bgGroup1, 1);
    var btn3 = Utils.createSprite('btn', { x: 576, y: 3091 }, { x: 0.5, y: 0.5 }, bgGroup1, 1);
    var btn4 = Utils.createSprite('btn', { x: 157, y: 3437 }, { x: 0.5, y: 0.5 }, bgGroup1, 1);
    var btn5 = Utils.createSprite('btn', { x: 475, y: 6160 }, { x: 0.5, y: 0.5 }, bgGroup1, 1);
    var btn6 = Utils.createSprite('btn', { x: 452, y: 6461 }, { x: 0.5, y: 0.5 }, bgGroup1, 1);
    var btn7 = Utils.createSprite('btn', { x: 295, y: 7057 }, { x: 0.5, y: 0.5 }, bgGroup1, 1);
    var btn8 = Utils.createSprite('btn', { x: 92, y: 7846 }, { x: 0.5, y: 0.5 }, bgGroup1, 1);
    var btn9 = Utils.createSprite('btn', { x: 375, y: 8188 }, { x: 0.5, y: 0.5 }, bgGroup1, 1);
    var btn10 = Utils.createSprite('btn', { x: 60, y: 12655 }, { x: 0.5, y: 0.5 }, bgGroup1, 1);
    Actions.Breathing(btn1)
    Actions.Breathing(btn2)
    Actions.Breathing(btn3)
    Actions.Breathing(btn4)
    Actions.Breathing(btn5)
    Actions.Breathing(btn6)
    Actions.Breathing(btn7)
    Actions.Breathing(btn8)
    Actions.Breathing(btn9)
    Actions.Breathing(btn10)
    btn1.interactive = true;
    btn2.interactive = true;
    btn3.interactive = true;
    btn4.interactive = true;
    btn5.interactive = true;
    btn6.interactive = true;
    btn7.interactive = true;
    btn8.interactive = true;
    btn9.interactive = true;
    btn10.interactive = true;
    btn1.on('tap', function () {
        $(".hb_1").fadeIn();
    })
    btn2.on('tap', function () {
        $(".hb_2").fadeIn();
    })
    btn3.on('tap', function () {
        $(".hb_3").fadeIn();
    })
    btn4.on('tap', function () {
        $(".hb_4").fadeIn();
    })
    btn5.on('tap', function () {
        $(".hb_5").fadeIn();
    })
    btn6.on('tap', function () {
        $(".hb_6").fadeIn();
    })
    btn7.on('tap', function () {
        $(".hb_7").fadeIn();
    })
    btn8.on('tap', function () {
        $(".hb_8").fadeIn();
    })
    btn9.on('tap', function () {
        $(".hb_9").fadeIn();
    })
    btn10.on('tap', function () {
        $(".hb_10").fadeIn();
    })

    //底部文字
    say1 = Utils.createSprite('say1', { x: 320, y: 16320 }, { x: 0.5, y: 0.5 }, bgGroup1, 0);
    say2 = Utils.createSprite('say2', { x: 320, y: 16360 }, { x: 0.5, y: 0.5 }, bgGroup1, 0);
    say3 = Utils.createSprite('say3', { x: 320, y: 16400 }, { x: 0.5, y: 0.5 }, bgGroup1, 0);
    say4 = Utils.createSprite('say4', { x: 320, y: 16440 }, { x: 0.5, y: 0.5 }, bgGroup1, 0);
    say5 = Utils.createSprite('say5', { x: 320, y: 16600 }, { x: 0.5, y: 0.5 }, bgGroup1, 0);
}

var isplay1 = true;
GameScene.prototype.panduan = function () {
    this.timeline.setPosition(-1 * moY)
    var a = moY;
    var b = -moY;
    console.log(moY);
    if (moY < 0) {
        this.bgGroup1.y = a;
    }
    else {
        moY = 0;
    }
    if (moY < 0 && moY >= -1000) {
        var a = Math.floor((b - 1200) / 100);
        bd.gotoAndStop(a)
    }
    if (moY < -3100 && moY >= -4200) {
        var a = Math.floor((b - 3100) / 100);
        pd.gotoAndStop(a)
    }
    if (moY < -5400 && moY >= -6400) {
        var a = Math.floor((b - 5400) / 50);
        sl.gotoAndStop(a)
    }
    if (moY < -9700 && moY >= -10600) {
        var a = Math.floor((b - 9700) / 50);
        wm.gotoAndStop(a)
    }
    if (moY < -10900 && moY >= -11300) {
        var a = Math.floor((b - 10900) / 58);
        bfx.gotoAndStop(a)
    }
    if (moY < -11800 && moY >= -12100) {
        var a = Math.floor((b - 11800) / 60);
        d.gotoAndStop(a)
    }
    if (moY < -12000 && moY >= -13000) {
        var a = Math.floor((b - 12000) / 50);
        wmq.gotoAndStop(a)
    }
    if (moY < -12500 && moY >= -13500) {
        var a = Math.floor((b - 12500) / 50);
        hm.gotoAndStop(a)
    }
    if (moY < -13700 && moY >= -14200) {
        var a = Math.floor((b - 13700) / 56);
        var c = Math.floor((b - 13700) / 36);
        ts.gotoAndStop(a)
        bk.gotoAndStop(c)
    }
    if (moY < -14000 && moY >= -15100) {
        var a = Math.floor((b - 14000) / 50);
        bike.gotoAndStop(a)
    }
    if (moY < -15300 && moY >= -15500 && isplay1) {
        isplay1 = false;
        Tween.get(say1).wait(500).to({ alpha: 1 }, 500)
        Tween.get(say2).wait(500).to({ alpha: 1 }, 500)
        Tween.get(say3).wait(500).to({ alpha: 1 }, 500)
        Tween.get(say4).wait(500).to({ alpha: 1 }, 500)
        Tween.get(say5).wait(1000).to({ alpha: 1 }, 500)
    }

    //音频
    if (moY <= 0 && moY >= -500) {
        stopmusic('audio10')
        playmusic('audio0')
    }
    //武大
    else if (moY < -500 && moY >= -1200) {
        stopmusic('audio0')
        stopmusic('audio18')
        playmusic('audio10')
    }
    //叫卖
    else if (moY < -1300 && moY >= -1800) {
        stopmusic('audio10')
        stopmusic('audio1')
        playmusic('audio18')
    }
    //音响
    else if (moY < -1900 && moY >= -2400) {
        stopmusic('audio18')
        stopmusic('audio13')
        playmusic('audio1')
    }
    //公交
    else if (moY < -2600 && moY >= -3200) {
        stopmusic('audio1')
        stopmusic('audio11')
        playmusic('audio13')
    }
    //汉口站
    else if (moY < -3400 && moY >= -3900) {
        stopmusic('audio13')
        stopmusic('audio12')
        playmusic('audio11')
    }
    // 二桥
    else if (moY < -4000 && moY >= -5000) {
        stopmusic('audio11')
        stopmusic('audio19')
        playmusic('audio12')
    }
    //游戏厅
    else if (moY < -5100 && moY >= -5500) {
        stopmusic('audio12')
        stopmusic('audio2')
        playmusic('audio19')
    }
    //手机
    else if (moY < -5600 && moY >= -6100) {
        stopmusic('audio19')
        stopmusic('audio3')
        playmusic('audio2')
    }
    //电影
    else if (moY < -6400 && moY >= -7000) {
        stopmusic('audio2')
        stopmusic('audio4')
        playmusic('audio3')
    }
    //双节棍
    else if (moY < -7100 && moY >= -7500) {
        stopmusic('audio3')
        stopmusic('audio15')
        playmusic('audio4')
    }
    //大桥
    else if (moY < -7600 && moY >= -8200) {
        stopmusic('audio4')
        stopmusic('audio17')
        playmusic('audio15')
    }
    //船
    else if (moY < -8200 && moY >= -9000) {
        stopmusic('audio15')
        stopmusic('audio5')
        playmusic('audio17')
    }
    //超级女神
    else if (moY < -9500 && moY >= -10300) {
        stopmusic('audio17')
        stopmusic('audio6')
        playmusic('audio5')
    }
    //动车
    else if (moY < -10700 && moY >= -11500) {
        stopmusic('audio5')
        stopmusic('audio7')
        playmusic('audio6')
    }
    //支付宝
    else if (moY < -11700 && moY >= -12300) {
        stopmusic('audio6')
        stopmusic('audio8')
        playmusic('audio7')
    }
    //汉马
    else if (moY < -12400 && moY >= -13000) {
        stopmusic('audio7')
        stopmusic('audio20')
        playmusic('audio8')
    }
    //车
    else if (moY < -13000 && moY >= -13600) {
        stopmusic('audio8')
        stopmusic('audio9')
        playmusic('audio20')
    }
    //跳水
    else if (moY < -13900 && moY >= -14200) {
        stopmusic('audio20')
        stopmusic('audio14')
        playmusic('audio9')
    }
    //自行车
    else if (moY < -14200 && moY >= -15000) {
        stopmusic('audio9')
        stopmusic('audio16')
        playmusic('audio14')
    }
    //球
    else if (moY < -15000) {
        stopmusic('audio14')
        playmusic('audio16')
    }
    if (this.bgGroup1.y <= -16916 + renderer.view.height) {
        stopmusic('audio16')
        this.bgGroup1.y = -16916 + renderer.view.height
        moY = -16916 + renderer.view.height;
        $('.btn1,.btn2').removeClass('fadeOutDown').addClass('fadeInUp');
        $('.btn1,.btn2').fadeIn();
    }
    else {
        $('.btn1,.btn2').removeClass('fadeInUp').addClass('fadeOutDown');
    }
}

GameScene.prototype.top = function () {
    this.bgGroup1.y = 0;
    moY = 0;
    $('.btn1,.btn2').removeClass('fadeInUp').addClass('fadeOutDown');
}






