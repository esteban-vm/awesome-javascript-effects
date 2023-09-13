import type Effect from '@/effect'

export default class Particle {
  private effect
  private context
  private originX
  private originY
  private color
  private x
  private y
  // private vx
  // private vy
  private size
  private ease

  constructor(effect: Effect, x: number, y: number, color: string) {
    this.effect = effect
    this.context = this.effect.context
    this.originX = Math.floor(x)
    this.originY = Math.floor(y)
    this.color = color
    this.x = Math.random() * this.effect.width
    this.y = 0
    // this.vx = 0
    // this.vy = 0
    this.size = this.effect.gap
    this.ease = 0.01
  }

  public draw() {
    this.context.fillStyle = this.color
    this.context.fillRect(this.x, this.y, this.size, this.size)
  }

  public update() {
    this.x += (this.originX - this.x) * this.ease
    this.y += (this.originY - this.y) * this.ease
  }

  public warp = () => {
    this.x = Math.random() * this.effect.width
    this.y = Math.random() * this.effect.height
    this.ease = 0.05
  }
}
