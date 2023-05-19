class Chart {
    constructor(container, samples, options){
        this.samples = samples

        this.axesLabels = options.axesLabels
        this.styles = options.styles

        this.canvas = document.createElement("canvas")
        this.canvas.width = options.size
        this.canvas.height = options.size
        this.canvas.style = "background-color:white;"
        container.appendChild(this.canvas)

        this.ctx = this.canvas.getContext("2d")

        this.margin = options.size * 0.1
        this.transparency = 0.5

        this.pixelBounds = this.#getPixelBounds()
        this.dataBounds = this.#getDataBounds()

        this.#draw()
    }

    #getPixelBounds() {
        const {canvas, margin} = this

        const bounds = {
            left: margin,
            right: canvas.width - margin,
            top: margin,
            bottom:canvas.height - margin
        }
        return bounds
    }

    #getDataBounds() {
        const {samples} = this
        const x = samples.map(s=>s.point[0])
        const y = samples.map(s=>s.point[1])
        const minX = Math.min(...x)
        const maxX = Math.max(...x)
        const minY = Math.min(...y)
        const maxY = Math.max(...y)

        const bounds = {
            left: minX,
            right: maxX,
            top: maxY,
            bottom: minY
        }
        return bounds
    }

    #draw(){
        const {ctx, canvas} = this
        ctx.clearRect(0,0,canvas.width, canvas.height)

        this.#drawAxesLabels()
        ctx.globalAlpha = this.transparency
        this.#drawSamples()
        ctx.globalAlpha = 1
    }

    #drawAxesLabels () {
        const {axesLabels, ctx, canvas, margin} = this
        const {left, right,top, bottom} = this.pixelBounds

        graphics.drawText(ctx, {
            text: axesLabels[0],
            loc: [canvas.width/2, bottom + margin/2 ],
            size:margin*0.6
        })

        ctx.save()
        ctx.translate(left-margin/2, canvas.height/2)
        ctx.rotate(-Math.PI/2)
        graphics.drawText(ctx, {
            text: axesLabels[1],
            loc: [0,0],
            size:margin*0.6
        })
        ctx.restore()

        ctx.beginPath()
        ctx.moveTo(top, left)
        ctx.lineTo(left, bottom)
        ctx.lineTo(right, bottom)
        ctx.setLineDash([5,4])
        ctx.lineWidth = 2
        ctx.strokeStyle = "lightgray"
        ctx.stroke()
        ctx.setLineDash([])
    }

    #drawSamples () {
        const {samples, dataBounds, pixelBounds, ctx} = this
        for (const sample of samples){
            const {point} = sample
            const pixelLoc = math.remapPoint(dataBounds, pixelBounds, point)
            graphics.drawPoint(ctx, pixelLoc)
        }
    }
}