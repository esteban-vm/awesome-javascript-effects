import type Effect from '@/effect'

export default class Particle {
  private effect
  private context
  private active
  private originX
  private originY
  private color
  private x
  private y
  private vx
  private vy
  private dx
  private dy
  private distance
  private force
  private angle
  private size
  private ease
  private friction
  private timeout?: number

  constructor(effect: Effect, x: number, y: number, color: string) {
    this.effect = effect
    this.context = this.effect.context
    this.active = true
    this.originX = Math.floor(x)
    this.originY = Math.floor(y)
    this.color = color
    this.x = Math.random() * this.effect.width
    this.y = 0
    this.vx = 0
    this.vy = 0
    this.dx = 0
    this.dy = 0
    this.distance = 0
    this.force = 0
    this.angle = 0
    this.size = this.effect.gap
    this.ease = 0.2
    this.friction = 0.8
  }

  public draw() {
    this.context.fillStyle = this.color
    this.context.fillRect(this.x, this.y, this.size, this.size)
  }

  public update() {
    if (!this.active) return
    this.dx = this.effect.pointer.x - this.x
    this.dy = this.effect.pointer.y - this.y
    this.distance = this.dx ** 2 + this.dy ** 2
    this.force = -this.effect.pointer.radius / this.distance
    if (this.distance < this.effect.pointer.radius) {
      this.angle = Math.atan2(this.dy, this.dx)
      this.vx += this.force * Math.cos(this.angle)
      this.vy += this.force * Math.sin(this.angle)
    }
    this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease
    this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease
  }

  public warp = () => {
    this.x = Math.random() * this.effect.width
    this.y = Math.random() * this.effect.height
    this.ease = 0.2
  }

  public blocks = () => {
    this.x = Math.random() * this.effect.width
    this.y = Math.random() > 0.5 ? 0 : this.effect.height
    this.ease = 0.04
  }

  public assemble = () => {
    clearTimeout(this.timeout)
    this.active = false
    this.x = Math.random() * this.effect.width
    this.y = Math.random() * this.effect.height
    this.ease = 0.2
    this.effect.counter++
    this.timeout = setTimeout(() => {
      this.active = true
    }, this.effect.counter * 0.5)
  }

  public print = () => {
    clearTimeout(this.timeout)
    this.active = false
    this.x = this.effect.width * 0.5
    this.y = this.effect.height * 0.5
    this.ease = 0.2
    this.effect.counter++
    this.timeout = setTimeout(() => {
      this.active = true
    }, this.effect.counter * 0.05)
  }
}
