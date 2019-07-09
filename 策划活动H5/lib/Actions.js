(function () {

    window.Actions = window.Actions || {}

    var Ease = PIXI.Ease;
    var Tween = PIXI.Tween

    Actions.Breathing = function (target) {
        return Tween.get(target.scale, { loop: true }).to({ x: 1.2, y: 1.2 }, 1000).to({ x: 1, y: 1 }, 1000);
    }

    Actions.Beat = function (target) {
        return Tween.get(target.scale).to({ x: 0.9, y: 0.9 }, 0).to({ x: 1, y: 1 }, 500, Ease.bounceOut);
    }

    Actions.fadeInUp = function (target,y) {
        return Tween.get(target).to({ y: y, alpha: 1 }, 500, Ease.Linear);
    }

    Actions.fadeInRight = function (target,x) {    	
        return Tween.get(target).to({ x: x, alpha: 1 }, 500, Ease.Linear);
    }

    Actions.Breathing2 = function (target) {
        return Tween.get(target.scale, { loop: true }).to({ x: 0.5, y: 0.5 }, 1000).to({ x: 0.4, y: 0.4 }, 1000);
    }

    Actions.fadeIn = function (target,time) {
        return Tween.get(target).wait(time).to({alpha: 1 }, 500, Ease.Linear);
    }
    Actions.fadeOut = function (target,time) {
        return Tween.get(target).wait(time).to({alpha: 0 }, 500, Ease.Linear);
    }

}())