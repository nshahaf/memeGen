'use strict'

var gSavedImgs = []

//LOCAL STORAGE SERVICES
function saveToStorage(key, value) {
    const valueStr = JSON.stringify(value)
    localStorage.setItem(key, valueStr)
}

function loadFromStorage(key) {
    const valueStr = localStorage.getItem(key)
    return JSON.parse(valueStr)
}

//FILES
function downloadCanvas(elLink) { //download the canvas to local file
    console.log('downloadCanvas()')
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function saveImg(img,src,text) {
    gSavedImgs.push({img,src,text})
}