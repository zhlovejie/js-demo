/**弹出层对象，显示垃圾信息用 */
class Tanchu extends Scene {
	public lblName: eui.Label;
	public lblTypeName: eui.Label;
	public lblDesc: eui.Label;
	public btnClose: eui.Button;

	public constructor() {
		super();
		this.skinName = "resource/game/tanchu.exml";
	}
	protected onComplete() {
		this.btnClose.touchEnabled = true;
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapclose, this);
	}
	private onTapclose() {
		SceneManager.Instance.popScene();
	}
}