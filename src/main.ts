import Effect from '@/effect'

window.addEventListener('load', function () {
  const canvas = <HTMLCanvasElement>this.document.getElementById('canvas')
  canvas.width = this.innerWidth
  canvas.height = this.innerHeight

  const effect = new Effect(canvas)
  effect.init()

  const animate = () => {
    effect.draw()
    effect.update()
    this.requestAnimationFrame(animate)
  }

  animate()

  const warpButton = <HTMLButtonElement>this.document.getElementById('warp')
  warpButton.addEventListener('click', effect.warp)

  const blocksButton = <HTMLButtonElement>this.document.getElementById('blocks')
  blocksButton.addEventListener('click', effect.blocks)
})
