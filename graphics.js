const graphics = {}

graphics.drawPoint = (ctx, loc, size=8, color="black")=> {
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(...loc, size/2, 0, Math.PI *2)
    ctx.fill()
}

graphics.drawText = (ctx, {
    text, loc, align="center", vAlign="middle", size=10, color="black"
}) => {
    ctx.textAlign = align
    ctx.textBaseline = vAlign
    ctx.font = `bold ${size} px Courier`
    ctx.fillStyle = color
    ctx.fillText (text, ...loc)
}

graphics.generateImage = (styles, size = 50)=> {
    for (let label in styles) {
        const style = styles[label]
        
        const canvas = document.createElement("canvas")
        canvas.width = size+20     
        canvas.height = size

        const ctx = canvas.getContext("2d")
        ctx.beginPath()
        ctx.textAlign = "right"
        ctx.textBaseline = "bottom"
        ctx.font = `bold ${size}px Courier`
        ctx.fillText(
            style.text, 
            canvas.width,
            canvas.height
        )
        style["image"] = new Image()
        style["image"].src = canvas.toDataURL()
    }
}

graphics.drawImage = (ctx, image, loc)=> {
    ctx.beginPath()
    ctx.drawImage(image,
        loc[0] - image.width/2,
        loc[1] - image.height/2,
        image.width,
        image.height    
    )     
    ctx.fill()
}