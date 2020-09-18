class S1 extends Scene {
  /**背景图片对象 */
  public imgBg: eui.Image
  /**LOGO图片对象 */
  public imgLogo: eui.Image
  /**文字对象 */
  public lblWelcome: eui.Label
  /**开始游戏组件对象 */
  public btnStart: eui.Button
  /**声音图片对象 */
  public imgSoundPlay: eui.Image
  public imgSoundStop: eui.Image

  /**声音对象 */
  public soundBG: egret.Sound = new egret.Sound()
  /**声道对象 */
  public soundBGChannel: egret.SoundChannel;
  public constructor() {
    super()
    this.skinName = "resource/game/S1.exml";
  }

  protected onComplete() {

    this.addDropShadowFilter(this.imgLogo)
    this.addDropShadowFilter(this.btnStart)

    this.sortableChildren = true
    this.btnStart.touchEnabled = true
    this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChangeScene, this)
    this.imgSoundPlay.touchEnabled = true
    this.imgSoundPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => this.onChangeSound('play'), this)
    this.imgSoundStop.touchEnabled = true
    this.imgSoundStop.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => this.onChangeSound('stop'), this)
    this.startAnimation()
  }

  private onChangeScene() {
    let s2: S2 = new S2()
    SceneManager.Instance.changeScene(s2)
  }

  private startAnimation() {
    this.lblWelcomeAnimation()
    this.imgLogoAnimation()
    this.btnStartAnimation()
    this.initSound()
  }

  private lblWelcomeAnimation(): void {
    let y = this.lblWelcome.y
    let h = this.lblWelcome.height
    this.lblWelcome.y = -h
    egret.Tween.get(this.lblWelcome).to({ y: y }, 1000, egret.Ease.bounceInOut)
  }

  private imgLogoAnimation(): void {
    let x = this.imgLogo.x
    this.imgLogo.x = this.stage.width * 2.5
    egret.Tween.get(this.imgLogo).to({ x: x }, 1000, egret.Ease.bounceInOut)
  }

  private btnStartAnimation(): void {
    let y = this.btnStart.y
    let h = this.stage.height
    this.btnStart.y = h + this.btnStart.height * 3

    egret.Tween.get(this.btnStart).to({ y: y }, 1000, egret.Ease.bounceInOut)
      .wait(100)
      .call(() => {
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
          this.btnStart.scaleX = scale
          this.btnStart.scaleY = scale

        }, this)
        //egret.Tween.get(this.btnStart,{loop:true}).to({scaleX:1.2,scaleY:1.2},300).to({scaleX:1,scaleY:1},300)
      })


  }

  private initSound(): void {
    //初始化声音图标位置
    this.imgSoundPlay.zIndex = 1001
    this.imgSoundStop.zIndex = -1

    this.imgSoundPlay.anchorOffsetX = this.imgSoundPlay.width / 2
    this.imgSoundPlay.anchorOffsetY = this.imgSoundPlay.height / 2
    this.imgSoundStop.anchorOffsetX = this.imgSoundPlay.width / 2
    this.imgSoundStop.anchorOffsetY = this.imgSoundPlay.height / 2

    //声音图标旋转动画
    this.imgSoundPlayAnimation()

    //加载声音资源
    let soundSourceUrl = 'http://cdn1.zhizhucms.com/materials/344319/audio/b48db315df838c83b306f87484798f48.mp3'
    this.soundBG.addEventListener(egret.Event.COMPLETE, (e: egret.Event) => this.soundBGChannel = this.soundBG.play(), this);
    this.soundBG.addEventListener(egret.IOErrorEvent.IO_ERROR, (e: egret.Event) => { console.log(e) }, this);
    this.soundBG.load(soundSourceUrl)
  }

  private imgSoundPlayAnimation(): void {
    this.addEventListener(egret.Event.ENTER_FRAME, (evt: egret.Event) => {
      this.imgSoundPlay.rotation += 3
      return false
    }, this)
  }

  private onChangeSound(type: string) {
    if (type === 'play') {
      this.imgSoundPlay.zIndex = -1
      this.imgSoundStop.zIndex = 1001
      this.soundBGChannel && this.soundBGChannel.stop()
      this.soundBGChannel = null
    } else if (type === 'stop') {
      this.imgSoundPlay.zIndex = 1001
      this.imgSoundStop.zIndex = -1
      this.soundBGChannel = this.soundBG.play()
    }
  }

  /**
   * 添加阴影
   */
  private addDropShadowFilter(target: any): void {
    let filters = [...(target.filters || [])]
    const dropShadowFilter = new egret.DropShadowFilter(6, 45, 0xcccccc)
    if (!filters.some(item => item instanceof egret.DropShadowFilter)) {
      target.filters = [...filters, dropShadowFilter]
    }
  }

  /**
   * 删除阴影
   */
  private removeDropShadowFilter(target: egret.Bitmap): void {
    let filters = [...(target.filters || [])]
    target.filters = filters.filter(f => !(f instanceof egret.DropShadowFilter))
  }
}