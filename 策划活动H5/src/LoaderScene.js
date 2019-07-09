
var LoaderScene = function (assets) {
    this.root = new PIXI.Container();; // 场景根节点
    this.loader = PIXI.loader;
    this.curPercent = 0;
    this.percent = 0;
    this.maxLength = 0;
    for (var i = 0; i < assets.length; i++) {
        for (var j in assets[i]) {
            if (assets[i][j].indexOf('.json') > 0) {
                this.maxLength++;
            }
        }

    }
    this.maxLength += assets.length; // 加载文件数量
    this.curNum = 0;
    this.assets = assets;
    this.init(); // 初始化场景内容
}


LoaderScene.prototype.init = function () {
    var root = this.root;
    this.root.on('added', function () {
        console.log('LoaderScene added')
    })

    // var bgSprite = PIXI.Sprite.from('images/loading1.jpg'); // 直接根据路径创建sprite，因为正在loading！
    // // 直接根据路径创建sprite，因为正在loading！
    // root.addChild(bgSprite);
}


LoaderScene.prototype.load = function (cb) {
    this.cb = cb; // 加载完回调
    // 监听过程事件, 每加载完一个文件, 就执行一次
    var loader = this.loader;


    for (var i in this.assets) {
        for (var j in this.assets[i]) {
            loader.add(j, this.assets[i][j]);
        }
    }

    loader.load();

    this.interval = setInterval(function () {
        if (this.percent >= 100) {
            clearInterval(this.interval);
            if (this.cb) {
                Tween.get(this.root).to({
                    alpha: 0
                }, 0, Ease.Linear).call(this.cb);
            }
        }
        if (this.percent < this.curPercent) {
            this.percent += 5;
            $('#loadTxt').html(this.percent + "%")
        }
    }.bind(this), 20);

    loader.onProgress.add(this.onProgress.bind(this));

    // 监听结束事件, 所有资源加载完才执行
    loader.onComplete.add(this.onComplete.bind(this))
}

LoaderScene.prototype.onProgress = function (loader, res) {
    this.curNum++;
    this.curPercent = parseInt(this.curNum / this.maxLength * 100); // 加载百分比
}

LoaderScene.prototype.onComplete = function (loader, res) {
    // if (this.cb) {
    //     this.cb();
    // }
    // 抛弃原来loader里面的onComplete，因为我们做了自己的动画.
}