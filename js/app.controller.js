'use strict'
var gElCanvas
var gCtx
var gTextInput
var gCurrImg = null// holds the src, height and width of the currnet img

//MAIN
function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    resizeCanvas()
    // window.addEventListener('resize', resizeCanvas)
    // addMouseListeners()
    // addTouchListeners()

    // loadFromStorage()
}

function addMouseListeners() { // event listeners for touch
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {// event listeners for mouse
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

//GALLERY CONTROLLER
function renderGallery() {//render the img gallery from the gImgs array
    var gellary = documnet.querySelector('gallery')
    var imgs = getImgs()

    var strHTML = imgs.map(img => `<img src="/${img.url}" onclick="onImgClick(this,${img.id})">`)
    gellary.innerHTML = strHTML.join('')

}

function onGalleryClick() {// handle gallery click in nav bar
    document.querySelector('.editor-container').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'block'
}

function onImgClick(el,id) {//handle img click gallery section
    
    document.querySelector('.editor-container').style.display = 'flex'
    document.querySelector('.gallery-container').style.display = 'none'
    
    gMemeUpdate(id)
    getCurrImg(el.src)
    drawCurrImg()
}


//EDITOR CONTROLLER
function resizeContainer() { //resize the container to the img size
    console.log('resizeContainer()')
    //resize the container to the img size
    const elContainer = document.querySelector('.canvas-container')
    elContainer.width = gCurrImg.width
    elContainer.height = gCurrImg.height
}

function resizeCanvas() { // resize the canvas to the container size
    console.log('resizeCanvas()')
    const elContainer = document.querySelector('.canvas-container')
    //Visually fill the positioned parent
    gElCanvas.style.width = '100%'
    gElCanvas.style.height = '100%'
    //set the internal size to match
    gElCanvas.width = elContainer.width
    gElCanvas.height = elContainer.height
}

function getEvPos(ev) {// get the current event position in the canvas

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }

    if (TOUCH_EVS.includes(ev.type)) {
        // Prevent triggering the mouse ev
        // ev.preventDefault()
        // Gets the first touch point
        ev = ev.changedTouches[0]
        // Calc the right pos according to the touch screen
        pos = {
            // x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            // y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
            x: ev.pageX,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function getCanvasCenter() { // return x,y of the canvas center
    return {
        x: gElCanvas.width / 2,
        y: gElCanvas.height / 2
    }
}

function onErase() {//on text Erase button click
    clearCanvas()
    drawCurrImg()
}

function clearCanvas() { // clear the intire canvas
    console.log('clearCanvas()')
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.fillStyle = 'rgb(56, 59, 66)'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    // saveCanvas()
}

function onAdd() {//on text Add button click
    var text = document.querySelector('.meme-text').value
    console.log(text)
    var { x: xCenter, y: yCenter } = getCanvasCenter()
    drawText(text, xCenter, 50)
}

function onTextInput() {//on text input change
    gTextInput = document.querySelector('.meme-text').value
    console.log('text input:', gTextInput)
}

function onDownload(link) {//on file download button click
    downloadCanvas(link)
}

function drawText(text, x, y) {//draw text in specified x,y location
    console.log('drawText()')
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function drawCurrImg(img = gCurrImg) { // draw the current img object to the canvas
    console.log('drawImg()')
    resizeContainer()
    resizeCanvas()
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}
