import Particle from '@/particle'

export default class Effect {
  public canvas
  public context
  public width
  public height
  public gap
  private image
  private x
  private y
  private particles: Particle[]

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')!
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.gap = 3
    this.image = <HTMLImageElement>document.getElementById('angler')
    this.x = this.width * 0.5 - this.image.width * 0.5
    this.y = this.height * 0.5 - this.image.height * 0.5
    this.particles = []
  }

  public init() {
    this.context.drawImage(this.image, this.x, this.y)
    const { width, height, gap } = this
    const pixels = this.context.getImageData(0, 0, width, height).data
    for (let y = 0; y < height; y += gap) {
      for (let x = 0; x < width; x += gap) {
        const index = (y * width + x) * 4
        const alpha = pixels[index + 3]
        if (alpha > 0) {
          const { [index]: red, [index + 1]: green, [index + 2]: blue } = pixels
          const color = `rgb(${red}, ${green}, ${blue})`
          this.particles.push(new Particle(this, x, y, color))
        }
      }
    }
  }

  public draw() {
    this.context.clearRect(0, 0, this.width, this.height)
    this.particles.forEach((particle) => particle.draw())
  }

  public update() {
    this.particles.forEach((particle) => particle.update())
  }

  public warp = () => {
    this.particles.forEach((particle) => particle.warp())
  }
}
