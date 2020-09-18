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
var S3 = (function (_super) {
    __extends(S3, _super);
    function S3() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/game/S3.exml";
        return _this;
    }
    S3.prototype.onComplete = function () {
        this.lblGameOverAnimation();
        this.btnResetAnimation();
        this.btnReset.touchEnabled = true;
        this.btnReset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapqiehuan, this);
    };
    S3.prototype.lblGameOverAnimation = function () {
        var y = this.lblGameOver.y;
        var h = this.lblGameOver.height;
        this.lblGameOver.y = -h;
        egret.Tween.get(this.lblGameOver).to({ y: y }, 1000, egret.Ease.bounceInOut);
    };
    S3.prototype.btnResetAnimation = function () {
        var _this = this;
        var scale = 1;
        var __action = 'add';
        this.addEventListener(egret.Event.ENTER_FRAME, function (evt) {
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
            _this.btnReset.scaleX = scale;
            _this.btnReset.scaleY = scale;
        }, this);
    };
    S3.prototype.onTapqiehuan = function () {
        var s1 = new S1();
        SceneManager.Instance.changeScene(s1);
    };
    return S3;
}(Scene));
__reflect(S3.prototype, "S3");
//# sourceMappingURL=S3.js.map