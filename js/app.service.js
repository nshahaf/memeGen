'use strict'

//CANVAS HELPERS
function getCanvasCenter() {
    return {
        x: gElCanvas.width / 2,
        y: gElCanvas.height / 2
    }
}

function resizeCanvas() {
    console.log('resizeCanvas()')
    const elContainer = document.querySelector('.canvas-container')
    //* Changing the canvas dimension clears the canvas
    gElCanvas.width = elContainer.clientWidth
    gElCanvas.height = elContainer.clientHeight

    // gElCanvas.width = elContainer.offsetWidth
    // gElCanvas.height = elContainer.offsetHeight
}

function clearCanvas() {
    console.log('clearCanvas()')
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.fillStyle = 'rgb(56, 59, 66)'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    // saveCanvas()
}

//DOWNLOAD CANVAS TO LOCAL FILE
function downloadCanvas(elLink) {
    console.log('downloadCanvas()')
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function drawText(text, x, y) {
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

function getCurrImg(src) {
    console.log('getImg')
    let img = new Image()
    img.src = src
    gCurrImg = img
}

function drawCurrImg(img = gCurrImg) {
    console.log('drawImg()')
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

