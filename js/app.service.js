'use strict'
//DATABASE
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'man'] },
    { id: 2, url: 'img/2.jpg', keywords: ['cute', 'dog'] },
    { id: 3, url: 'img/3.jpg', keywords: ['cute', 'dog', 'baby'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'baby'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'man'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'baby'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'man'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'baby'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'man'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'man'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'man'] },
    { id: 13, url: 'img/13.jpg', keywords: ['funny', 'man'] },
    { id: 14, url: 'img/14.jpg', keywords: ['funny', 'man'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny', 'man'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'man'] },
    { id: 17, url: 'img/17.jpg', keywords: ['funny', 'man'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny', 'toy'] },
]

var gTexts = []

var gMeme = {
    selectedImgId: 0, selectedLineIdx: 0,
    lines: [{ txt: 'Put your text here', size: 20, color: 'red' }]
}

//DATABASE FUCNTIONS
function getImgs() {//return the gImgs object
    return gImgs
}

function addImg(id,url,keywords) {//add an img to gImgs
    var img = _createImg(id,url,keywords)
    gImgs.push(img)
}

function _createImg(id,url,keywords){//self used factory function
    return {id,url,keywords}
}

function deleteImg(id) {//delete selected img from gImgs
    var index = gImgs.findIndex(img => img.id === id)
    return gImgs.splice(index,1)
}

function updateKeywords(id,keywords) {//update keywords in selected img
    img = gImgs.findIndex(img => img.id === id)
    img.keywords = keywords
}

function gMemeUpdate(id) {
    gMeme.selectedImgId = id
}

function getCurrImg(src) { // get current used img object
    console.log('getImg')
    let img = new Image()
    img.src = src
    gCurrImg = img
}


