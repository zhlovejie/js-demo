class S3 extends Scene {
  /**再来一次 按钮组件对象 */
  public btnReset: eui.Button
  /**游戏结果文本对象 */
  public lblGameOver: eui.Label
  public constructor() {
    super()
    this.skinName = "resource/game/S3.exml";
  }

  protected onComplete() {
    this.lblGameOverAnimation()
    this.btnResetAnimation()
    this.btnReset.touchEnabled = true
    this.btnReset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapqiehuan, this)
  }

  private lblGameOverAnimation() {
    let y = this.lblGameOver.y
    let h = this.lblGameOver.height
    this.lblGameOver.y = -h
    egret.Tween.get(this.lblGameOver).to({ y: y }, 1000, egret.Ease.bounceInOut)
  }

  private btnResetAnimation() {
    let scale = 1
    let __action = 'add'
    this.addEventListener(egret.Event.ENTER_FRAME, (evt: egret.Event) => {
      if (__action === 'add') {
        scale = scale + 0.01
      }
      if (__action === 'mut') {
        scale = scale - 0.01
      }
      if (scale > 1.2) {
        __action = 'mut'
      }
      if (scale <= 1) {
        __action = 'add'
      }
      this.btnReset.scaleX = scale
      this.btnReset.scaleY = scale

    }, this)
  }

  private onTapqiehuan() {
    let s1: S1 = new S1()
    SceneManager.Instance.changeScene(s1)
  }
}