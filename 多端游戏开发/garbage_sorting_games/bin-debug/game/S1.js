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
var S1 = (function (_super) {
    __extends(S1, _super);
    function S1() {
        var _this = _super.call(this) || this;
        /**声音对象 */
        _this.soundBG = new egret.Sound();
        _this.skinName = "resource/game/S1.exml";
        return _this;
    }
    S1.prototype.onComplete = function () {
        var _this = this;
        this.addDropShadowFilter(this.imgLogo);
        this.addDropShadowFilter(this.btnStart);
        this.sortableChildren = true;
        this.btnStart.touchEnabled = true;
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeScene, this);
        this.imgSoundPlay.touchEnabled = true;
        this.imgSoundPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) { return _this.onChangeSound('play'); }, this);
        this.imgSoundStop.touchEnabled = true;
        this.imgSoundStop.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) { return _this.onChangeSound('stop'); }, this);
        this.startAnimation();
    };
    S1.prototype.onChangeScene = function () {
        var s2 = new S2();
        SceneManager.Instance.changeScene(s2);
    };
    S1.prototype.startAnimation = function () {
        this.lblWelcomeAnimation();
        this.imgLogoAnimation();
        this.btnStartAnimation();
        this.initSound();
    };
    S1.prototype.lblWelcomeAnimation = function () {
        var y = this.lblWelcome.y;
        var h = this.lblWelcome.height;
        this.lblWelcome.y = -h;
        egret.Tween.get(this.lblWelcome).to({ y: y }, 1000, egret.Ease.bounceInOut);
    };
    S1.prototype.imgLogoAnimation = function () {
        var x = this.imgLogo.x;
        this.imgLogo.x = this.stage.width * 2.5;
        egret.Tween.get(this.imgLogo).to({ x: x }, 1000, egret.Ease.bounceInOut);
    };
    S1.prototype.btnStartAnimation = function () {
        var _this = this;
        var y = this.btnStart.y;
        var h = this.stage.height;
        this.btnStart.y = h + this.btnStart.height * 3;
        egret.Tween.get(this.btnStart).to({ y: y }, 1000, egret.Ease.bounceInOut)
            .wait(100)
            .call(function () {
            var scale = 1;
            var __action = 'add';
            _this.addEventListener(egret.Event.ENTER_FRAME, function (evt) {
                if (__action === 'add') {
                    scale = scale + 0.01;
                }
                if (__action === 'mut') {
                    scale = scale - 0.01;
                }
                if (scale > 1.2) {
                    __action = 'mut';
                }
                if (scale <= 1) {
                    __action = 'add';
                }
                _this.btnStart.scaleX = scale;
                _this.btnStart.scaleY = scale;
            }, _this);
            //egret.Tween.get(this.btnStart,{loop:true}).to({scaleX:1.2,scaleY:1.2},300).to({scaleX:1,scaleY:1},300)
        });
    };
    S1.prototype.initSound = function () {
        var _this = this;
        //初始化声音图标位置
        this.imgSoundPlay.zIndex = 1001;
        this.imgSoundStop.zIndex = -1;
        this.imgSoundPlay.anchorOffsetX = this.imgSoundPlay.width / 2;
        this.imgSoundPlay.anchorOffsetY = this.imgSoundPlay.height / 2;
        this.imgSoundStop.anchorOffsetX = this.imgSoundPlay.width / 2;
        this.imgSoundStop.anchorOffsetY = this.imgSoundPlay.height / 2;
        //声音图标旋转动画
        this.imgSoundPlayAnimation();
        //加载声音资源
        var soundSourceUrl = 'http://cdn1.zhizhucms.com/materials/344319/audio/b48db315df838c83b306f87484798f48.mp3';
        this.soundBG.addEventListener(egret.Event.COMPLETE, function (e) { return _this.soundBGChannel = _this.soundBG.play(); }, this);
        this.soundBG.addEventListener(egret.IOErrorEvent.IO_ERROR, function (e) { console.log(e); }, this);
        this.soundBG.load(soundSourceUrl);
    };
    S1.prototype.imgSoundPlayAnimation = function () {
        var _this = this;
        this.addEventListener(egret.Event.ENTER_FRAME, function (evt) {
            _this.imgSoundPlay.rotation += 3;
            return false;
        }, this);
    };
    S1.prototype.onChangeSound = function (type) {
        if (type === 'play') {
            this.imgSoundPlay.zIndex = -1;
            this.imgSoundStop.zIndex = 1001;
            this.soundBGChannel && this.soundBGChannel.stop();
            this.soundBGChannel = null;
        }
        else if (type === 'stop') {
            this.imgSoundPlay.zIndex = 1001;
            this.imgSoundStop.zIndex = -1;
            this.soundBGChannel = this.soundBG.play();
        }
    };
    /**
     * 添加阴影
     */
    S1.prototype.addDropShadowFilter = function (target) {
        var filters = (target.filters || []).slice();
        var dropShadowFilter = new egret.DropShadowFilter(6, 45, 0xcccccc);
        if (!filters.some(function (item) { return item instanceof egret.DropShadowFilter; })) {
            target.filters = filters.concat([dropShadowFilter]);
        }
    };
    /**
     * 删除阴影
     */
    S1.prototype.removeDropShadowFilter = function (target) {
        var filters = (target.filters || []).slice();
        target.filters = filters.filter(function (f) { return !(f instanceof egret.DropShadowFilter); });
    };
    return S1;
}(Scene));
__reflect(S1.prototype, "S1");
//# sourceMappingURL=S1.js.map