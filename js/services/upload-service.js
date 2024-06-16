'use strict'

function onImgInput(ev) {
   
    loadImageFromInput(ev, renderImg)
}

// Read the file from the input
// When done send the image to the callback function
function loadImageFromInput(ev, onImageReady) {
   
    const reader = new FileReader()

    reader.onload = function (event) {
        let img = new Image()
        img.src = event.target.result
        img.onload = () => onImageReady(img)
        
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    gCurrImg = img
    drawCurrImg(img)
    gIsSelected = true
    document.querySelector('.editor-container').style.display = 'flex'
    document.querySelector('.gallery-container').style.display = 'none'
   
}