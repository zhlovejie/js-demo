var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var S2 = (function (_super) {
    __extends(S2, _super);
    function S2() {
        var _this = _super.call(this) || this;
        /**垃圾图片集合对象，后续的操作都是基于该对象 */
        _this._arrLaji = [];
        /**游戏倒计时30次[timerDelay]结束 */
        _this.timerNumber = 30;
        /**倒计时时间间隔 1s */
        _this.timerDelay = 1000;
        /**当前触摸状态，按下时，值为true */
        _this._touchStatus = false;
        /**鼠标点击时，鼠标全局坐标与_bird的位置差 */
        _this._distance = new egret.Point();
        _this.skinName = "resource/game/S2.exml";
        return _this;
    }
    /**初始化完成后执行的函数 */
    S2.prototype.onComplete = function () {
        this.sortableChildren = true;
        this.init();
    };
    /**给指定垃圾桶添加模糊滤镜，测试用，后续根据参数来控制，目前只是展示效果2s切换一次 */
    S2.prototype.changeLaJiTongFilter = function (target) {
        var _this = this;
        if (target === void 0) { target = this.btnYouhai; }
        var arr = [this.btnYouhai, this.btnKehuishou, this.btnShilaji, this.btnGanlaji];
        arr.map(function (item) { return _this.addBlurFilter(item); });
        this.removeBlurFilter(target);
        setTimeout(function () {
            var idx = Math.floor(Math.random() * arr.length);
            _this.changeLaJiTongFilter(arr[idx]);
        }, 2000);
    };
    /**初始化指引操作手势动画 */
    S2.prototype.initFingerAnimation = function () {
        var _this = this;
        this.imgFinger.alpha = 1;
        this.imgFinger.zIndex = 1001;
        this.imgFinger.rotation = -90;
        var y = this.imgFinger.y;
        var offset = this.stage.stageHeight / 2;
        egret.Tween.get(this.imgFinger)
            .to({ y: y + offset }, 800)
            .wait(200)
            .to({ y: y }, 0)
            .wait(200)
            .to({ y: y + offset, alpha: .5 }, 800)
            .wait(200)
            .to({ alpha: 0 }, 200)
            .call(function () { return _this.imgFinger.parent.removeChild(_this.imgFinger); });
    };
    /**
     * 入口函数 包括 场景元素的初始化，布局，事件绑定，添加滤镜等操作
     */
    S2.prototype.init = function () {
        var _this = this;
        this.initTimer();
        this.initLaJiTongSource();
        this.initLaJiSource();
        this.changeLaJiTongFilter();
        // 创建容器，在其中进行布局
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        this._grpLayout = new eui.Group();
        this.addChild(this._grpLayout);
        this._grpLayout.width = stageW;
        this._grpLayout.top = 50;
        this._grpLayout.left = 30;
        this._grpLayout.right = 30;
        this._grpLayout.zIndex = 10;
        //获取垃圾图片中的最大宽度和高度，图片统一按照这个尺寸处理
        var _a = this._arrLaji.reduce(function (res, item) {
            if (item.width > res.itemMaxWidth) {
                res.itemMaxWidth = item.width;
            }
            if (item.height > res.itemMaxHeight) {
                res.itemMaxHeight = item.height;
            }
            return res;
        }, { itemMaxWidth: 0, itemMaxHeight: 0 }), itemMaxWidth = _a.itemMaxWidth, itemMaxHeight = _a.itemMaxHeight;
        var last_x = 0;
        var last_y = 0;
        this._arrLaji.map(function (lj, idx, arr) {
            //进行排列布局
            lj.x = last_x;
            lj.y = last_y;
            last_x = last_x + itemMaxWidth + 10;
            if (last_x >= stageW) {
                last_x = 0;
                last_y = last_y + itemMaxHeight + 10;
            }
            //使图片垂直居中
            if (lj.height < itemMaxHeight) {
                lj.y = lj.y + (itemMaxHeight - lj.height) / 2;
            }
            //使图片水平居中
            if (lj.width < itemMaxWidth) {
                lj.x = lj.x + (itemMaxWidth - lj.width) / 2;
            }
            //保存下布局后的位置，，，后边拖拽还原位置会使用到
            lj['__sourceX'] = lj.x;
            lj['__sourceY'] = lj.y;
            //统一加下阴影
            //this.addDropShadowFilter(lj)
            _this._grpLayout.addChild(lj);
            //绑定拖拽事件
            lj.touchEnabled = true;
            lj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (evt) {
                _this._target = lj;
                _this._target.zIndex = 999;
                _this.mouseDown(evt);
            }, _this);
            lj.addEventListener(egret.TouchEvent.TOUCH_END, _this.mouseUp, _this);
        });
        this.initLaJiAnimation();
    };
    /**垃圾图片排列动画 */
    S2.prototype.initLaJiAnimation = function () {
        var _this = this;
        var queue = [];
        this._arrLaji.map(function (lj) {
            lj.x = -lj.x;
            lj.y = -lj.y;
        });
        this._arrLaji.map(function (laji) {
            queue.push(new Promise(function (resolve) {
                egret.Tween.get(laji)
                    .to({
                    x: laji['__sourceX'],
                    y: laji['__sourceY']
                }, Math.random() * 2000)
                    .call(resolve);
            }));
        });
        this.imgFinger.alpha = 0;
        Promise.all(queue).then(function () { return _this.initFingerAnimation(); });
    };
    /**
     * 初始化垃圾桶，添加滤镜，绑定垃圾类型
     */
    S2.prototype.initLaJiTongSource = function () {
        var _this = this;
        var arr = [this.btnYouhai, this.btnKehuishou, this.btnShilaji, this.btnGanlaji];
        arr.map(function (item, idx) {
            item['__type__'] = idx + 1; //垃圾桶接受的垃圾类型
            _this.addDropShadowFilter(item);
        });
    };
    /**
     * 初始化垃圾种类数据
     */
    S2.prototype.initLaJiSource = function () {
        var _this = this;
        var arr = [
            {
                "id": 1,
                "name": "纸杯",
                "typeName": "干垃圾",
                "type": 4,
                "desc": "没想到吧，纸杯暂时不能被回收哦，因为一次性纸杯内测附着了一层很薄的聚乙烯塑料，造纸厂难以用它来造纸。",
                "imgName": "lj-7.png"
            },
            {
                "id": 2,
                "name": "香蕉皮",
                "typeName": "湿垃圾",
                "type": 3,
                "desc": "能降解堆肥的都是湿垃圾哦！",
                "imgName": "lj-4.png"
            },
            {
                "id": 3,
                "name": "牛奶盒",
                "typeName": "可回垃圾",
                "type": 2,
                "desc": "请注意，一定要先将牛奶倒掉，再将盒子压扁投入可回收物桶。",
                "imgName": "lj-1.png"
            }, {
                "id": 4,
                "name": "口香糖",
                "typeName": "干垃圾",
                "type": 4,
                "desc": "尽管口香糖是吃的，但是嚼过的口香糖里面含有橡胶成分，很难再生循环利用。",
                "imgName": "lj-19.png"
            }, {
                "id": 5,
                "name": "狗粮",
                "typeName": "湿垃圾",
                "type": 3,
                "desc": "别看狗粮是干干的，但是它可被降解，所以也是湿垃圾。",
                "imgName": "lj-13.png"
            }, {
                "id": 6,
                "name": "生蚝壳",
                "typeName": "干垃圾",
                "type": 4,
                "desc": "虾壳蟹壳都属于可降解的湿垃圾，但是坚硬的生蚝或者蛏子壳可都是干垃圾哦！",
                "imgName": "lj-15.png"
            }, {
                "id": 7,
                "name": "烟蒂",
                "typeName": "干垃圾",
                "type": 4,
                "desc": "烟头烟灰的分类一定要记好，它们都该被扔到干垃圾里。",
                "imgName": "lj-20.png"
            }, {
                "id": 8,
                "name": "旧衣服",
                "typeName": "可回垃圾",
                "type": 2,
                "desc": "这么简单的问题也能错？旧衣服当然是可回收物啦。但是请注意，内衣裤属于干垃圾，不可回收。",
                "imgName": "lj-10.png"
            }, {
                "id": 9,
                "name": "无汞干电池",
                "typeName": "干垃圾",
                "type": 4,
                "desc": "含汞、镍氢、镍镉的电池仍然要扔到有害垃圾，例如充电电池等。",
                "imgName": "lj-12.png"
            }, {
                "id": 10,
                "name": "绒毛玩具",
                "typeName": "可回垃圾",
                "type": 2,
                "desc": "绒毛玩具里的布料、棉花等均可被回收。",
                "imgName": "lj-17.png"
            }, {
                "id": 11,
                "name": "外卖盒",
                "typeName": "干垃圾",
                "type": 4,
                "desc": "虽然外卖餐盒是塑料制成，但外卖餐盒已经被污染，不算可回收垃圾。但如果是容易清洗的餐盒，洗干净后，可以归为可回收垃圾。",
                "imgName": "lj-3.png"
            }, {
                "id": 12,
                "name": "小龙虾",
                "typeName": "湿垃圾",
                "type": 3,
                "desc": "虾壳蟹壳都属于可降解的湿垃圾，但是坚硬的生蚝或者蛏子壳可都是干垃圾哦！",
                "imgName": "lj-6.png"
            }, {
                "id": 13,
                "name": "定型喷雾",
                "typeName": "有害垃圾",
                "type": 1,
                "desc": "定型喷雾里有有害的化学成分，所以要扔到有害垃圾桶哦！",
                "imgName": "lj-5.png"
            }, {
                "id": 14,
                "name": "空矿泉水瓶",
                "typeName": "可回垃圾",
                "type": 2,
                "desc": "矿泉水瓶应该是最热门的可回收物了吧！",
                "imgName": "lj-16.png"
            }, {
                "id": 15,
                "name": "豆腐猫砂",
                "typeName": "湿垃圾",
                "type": 3,
                "desc": "豆腐猫砂可以扔在湿垃圾里面，但是其他的猫砂就要当做干垃圾处理啦！",
                "imgName": "lj-9.png"
            }, {
                "id": 16,
                "name": "纸尿布",
                "typeName": "干垃圾",
                "type": 4,
                "desc": "纸尿裤的原理和茶包的原理一样，只要能迅速风干，就是干垃圾。",
                "imgName": "lj-18.png"
            }, {
                "id": 17,
                "name": "鱼骨架",
                "typeName": "湿垃圾",
                "type": 3,
                "desc": "鱼骨不属于坚硬难降解的物品，所以是湿垃圾。",
                "imgName": "lj-8.png"
            }, {
                "id": 18,
                "name": "一次性筷子",
                "typeName": "干垃圾",
                "type": 4,
                "desc": "现在一次性筷子还暂时不能被回收，但未来随着技术的发展，一次性筷子很快就可以再利用了！",
                "imgName": "lj-11.png"
            }, {
                "id": 19,
                "name": "报纸",
                "typeName": "可回垃圾",
                "type": 2,
                "desc": "报纸上虽然有油墨，但仍然可以被回收利用。",
                "imgName": "lj-14.png"
            }
        ];
        arr.map(function (item, idx) {
            var lj = _this.createBitmapByName(item.imgName);
            lj['__info__'] = __assign({}, item, { idx: idx, id: idx + 1 });
            _this._arrLaji.push(lj);
        });
    };
    /**手指触摸事件 记录初始位置 */
    S2.prototype.mouseDown = function (evt) {
        this._touchStatus = true;
        this._distance.x = evt.stageX - this._target.x;
        this._distance.y = evt.stageY - this._target.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    };
    /**手指滑动事件 执行碰撞检测以及碰撞后的逻辑操作等 */
    S2.prototype.mouseMove = function (evt) {
        if (this._touchStatus) {
            console.log("moving now ! Mouse: [X:" + evt.stageX + ",Y:" + evt.stageY + "]");
            this._target.x = evt.stageX - this._distance.x;
            this._target.y = evt.stageY - this._distance.y;
            var collisionResult = this.checkCollisionCustom(evt.stageX, evt.stageY);
            this._target['collisionResult'] = collisionResult;
            if (collisionResult.isCollision) {
                this.mouseUp(evt);
                this.validateLaji(collisionResult.target, this._target);
            }
        }
    };
    /**手指离开事件 删除绑定的滑动事件,如果未碰撞垃圾图片回到原位置等操作 */
    S2.prototype.mouseUp = function (evt) {
        this._touchStatus = false;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        var target = this._target;
        var collisionResult = target['collisionResult'];
        if (!collisionResult.isCollision) {
            egret.Tween.get(target).to({
                x: target['__sourceX'],
                y: target['__sourceY']
            }, 300)
                .call(function () { return target.zIndex = 0; });
        }
    };
    /**
     * 垃圾检测逻辑及对应的逻辑和动画
     */
    S2.prototype.validateLaji = function (lajitong, laji) {
        var lajiInfo = laji['__info__'] || {};
        var lajitongType = lajitong['__type__'];
        if (lajiInfo.type === lajitongType) {
            var centerX = lajitong.x + (lajitong.width / 2) - (laji.width / 2);
            var centerY = lajitong.y + (lajitong.height / 2);
            egret.Tween.get(laji).to({
                x: centerX,
                y: centerY,
                scaleX: 0.1,
                scaleY: 0.1
            }, 300).call(function () {
                laji.zIndex = 0;
                laji.parent && laji.parent.removeChild(laji);
            });
        }
        else {
            egret.Tween.get(laji)
                .to({
                x: laji['__sourceX'],
                y: laji['__sourceY']
            }, 300)
                .call(function () {
                laji.zIndex = 0;
            });
            var tc = new Tanchu();
            tc.lblName.text = lajiInfo.name;
            tc.lblTypeName.text = lajiInfo.typeName;
            tc.lblDesc.text = lajiInfo.desc;
            SceneManager.Instance.pushScene(tc);
            var x = lajitong.x;
            egret.Tween.get(lajitong)
                .to({ x: x + 5 }, 25)
                .to({ x: x - 5 }, 50)
                .to({ x: x + 5 }, 50)
                .to({ x: x - 5 }, 50)
                .to({ x: x }, 25);
        }
    };
    /**
     * 根据资源名称加载资源
     */
    S2.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        //这里进行了缩放
        result.width = texture.textureWidth * 0.2;
        result.height = texture.textureHeight * 0.2;
        result.texture = texture;
        return result;
    };
    /**
     * 碰撞检测
     */
    S2.prototype.checkCollision = function (target, stageX, stageY) {
        return target.hitTestPoint(stageX, stageY, false);
    };
    /**检测是否和垃圾桶碰撞，返回[IcollisionResult]接口对象 */
    S2.prototype.checkCollisionCustom = function (stageX, stageY) {
        var arr = [this.btnYouhai, this.btnKehuishou, this.btnShilaji, this.btnGanlaji];
        var res = {
            isCollision: false,
            target: null
        };
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var btn = arr_1[_i];
            if (this.checkCollision(btn, stageX, stageY)) {
                res.isCollision = true;
                res.target = btn;
                return res;
            }
        }
        return res;
    };
    /**
     * 添加阴影
     */
    S2.prototype.addDropShadowFilter = function (target) {
        var filters = (target.filters || []).slice();
        var dropShadowFilter = new egret.DropShadowFilter(6, 45, 0xcccccc);
        if (!filters.some(function (item) { return item instanceof egret.DropShadowFilter; })) {
            target.filters = filters.concat([dropShadowFilter]);
        }
    };
    /**
     * 删除阴影
     */
    S2.prototype.removeDropShadowFilter = function (target) {
        var filters = (target.filters || []).slice();
        target.filters = filters.filter(function (f) { return !(f instanceof egret.DropShadowFilter); });
    };
    /**
     * 添加模糊滤镜
     */
    S2.prototype.addBlurFilter = function (target) {
        var filters = (target.filters || []).slice();
        var blurFliter = new egret.BlurFilter(6, 6);
        if (!filters.some(function (item) { return item instanceof egret.BlurFilter; })) {
            target.filters = filters.concat([blurFliter]);
        }
    };
    /**
     * 删除模糊滤镜
     */
    S2.prototype.removeBlurFilter = function (target) {
        var filters = (target.filters || []).slice();
        target.filters = filters.filter(function (f) { return !(f instanceof egret.BlurFilter); });
    };
    /**
     * 添加黑白滤镜
     */
    S2.prototype.addGrayFilter = function (target) {
        var filters = (target.filters || []).slice();
        //颜色矩阵数组
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        if (!filters.some(function (item) { return item instanceof egret.ColorMatrixFilter; })) {
            target.filters = filters.concat([colorFlilter]);
        }
    };
    /**
     * 删除黑白滤镜
     */
    S2.prototype.removeGrayFilter = function (target) {
        var filters = (target.filters || []).slice();
        target.filters = filters.filter(function (f) { return !(f instanceof egret.ColorMatrixFilter); });
    };
    /**
     * 添加光影
     */
    S2.prototype.addGlowFilter = function (target) {
        var filters = (target.filters || []).slice();
        var color = 0x33CCFF; /// 光晕的颜色，十六进制，不包含透明度
        var alpha = 0.8; /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        var blurX = 35; /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY = 35; /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength = 2; /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality = 3 /* HIGH */; /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner = false; /// 指定发光是否为内侧发光，暂未实现
        var knockout = false; /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        if (!filters.some(function (item) { return item instanceof egret.GlowFilter; })) {
            target.filters = filters.concat([glowFilter]);
        }
    };
    /**
     * 删除光影
     */
    S2.prototype.removeGlowFilter = function (target) {
        var filters = (target.filters || []).slice();
        target.filters = filters.filter(function (f) { return !(f instanceof egret.GlowFilter); });
    };
    /**自定义滤镜暂时未用到 */
    S2.prototype.addCustomFilter = function (target) {
        var filters = (target.filters || []).slice();
        if (!filters.some(function (item) { return item instanceof egret.CustomFilter; })) {
            target.filters = filters.concat([this.customFilter]);
        }
    };
    /**自定义滤镜暂时未用到 */
    S2.prototype.removeCustomFilter = function (target) {
        var filters = (target.filters || []).slice();
        target.filters = filters.filter(function (f) { return !(f instanceof egret.CustomFilter); });
    };
    /**自定义滤镜暂时未用到 */
    S2.prototype.initCustomFilterFrame = function () {
        var _this = this;
        var vertexSrc = "attribute vec2 aVertexPosition;\n" +
            "attribute vec2 aTextureCoord;\n" +
            "attribute vec2 aColor;\n" +
            "uniform vec2 projectionVector;\n" +
            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +
            "const vec2 center = vec2(-1.0, 1.0);\n" +
            "void main(void) {\n" +
            "   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
            "   vTextureCoord = aTextureCoord;\n" +
            "   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
            "}";
        var fragmentSrc3 = [
            "precision lowp float;\n" +
                "varying vec2 vTextureCoord;",
            "varying vec4 vColor;\n",
            "uniform sampler2D uSampler;",
            "uniform vec2 center;",
            "uniform vec3 params;",
            "uniform float time;",
            "void main()",
            "{",
            "vec2 uv = vTextureCoord.xy;",
            "vec2 texCoord = uv;",
            "float dist = distance(uv, center);",
            "if ( (dist <= (time + params.z)) && (dist >= (time - params.z)) )",
            "{",
            "float diff = (dist - time);",
            "float powDiff = 1.0 - pow(abs(diff*params.x), params.y);",
            "float diffTime = diff  * powDiff;",
            "vec2 diffUV = normalize(uv - center);",
            "texCoord = uv + (diffUV * diffTime);",
            "}",
            "gl_FragColor = texture2D(uSampler, texCoord);",
            "}"
        ].join("\n");
        this.customFilter = new egret.CustomFilter(vertexSrc, fragmentSrc3, {
            center: { x: 0.5, y: 0.5 },
            params: { x: 10, y: 0.8, z: 0.1 },
            time: 0
        });
        this.addEventListener(egret.Event.ENTER_FRAME, function () {
            _this.customFilter.uniforms.time += 0.01;
            if (_this.customFilter.uniforms.time > 1) {
                _this.customFilter.uniforms.time = 0.0;
            }
        }, this);
    };
    /**初始化计时器对象，游戏倒计时用，控制游戏结束流程 */
    S2.prototype.initTimer = function () {
        this.addDropShadowFilter(this.rectTimer);
        this.timerNumber = 30;
        this.timerDelay = 1000;
        this.lblTimer.text = String(this.timerNumber);
        //创建一个计时器对象
        var timer = new egret.Timer(this.timerDelay, this.timerNumber);
        //注册事件侦听器
        timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
        //开始计时
        timer.start();
    };
    /**[timerDelay] 执行一次后的回调函数 */
    S2.prototype.timerFunc = function () {
        this.timerNumber = this.timerNumber - 1;
        if (this.timerNumber < 0) {
            this.timerNumber = 0;
        }
        this.lblTimer.text = String(this.timerNumber);
    };
    /**计时结束后执行的回调函数 */
    S2.prototype.timerComFunc = function () {
        var _this = this;
        this.timerFunc();
        setTimeout(function () { return _this.onTapqiehuan(); }, 1000);
    };
    /**切换到下个场景 */
    S2.prototype.onTapqiehuan = function () {
        var s3 = new S3();
        SceneManager.Instance.changeScene(s3);
    };
    return S2;
}(Scene));
__reflect(S2.prototype, "S2");
//# sourceMappingURL=S2.js.map