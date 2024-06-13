var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')


    


    // resizeCanvas()
    // window.addEventListener('resize', resizeCanvas)
    // addMouseListeners()
    // addTouchListeners()

    // loadFromStorage()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function getEvPos(ev) {

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