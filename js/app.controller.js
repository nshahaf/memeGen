'use strict'

var gElCanvas
var gCtx
var gClickedPos // hold event value on drag
var gCurrImg = null// holds the src, height and width of the currnet img
var gTexts = [{ text: '', x: 250, y: 250, stroke: 'black', fill: 'black', size: 40, font: 'arial', align: 'center' }]
var gTextInput = '' //hold the value from the text input
var gCurrTextId = 0 //hold the current text idx
var gIsSelected = false // img selected to edit
var gIsClicked = false // mouse click
var gIsDrag = false // enable text drag


//Init
function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    gIsSelected - false
    resizeCanvas()
    renderGallery()
    // window.addEventListener('resize', resizeCanvas)
    addMouseListeners()
    addTouchListeners()

    // loadFromStorage()
}


//MOUSE AND TOUCH EVENTS
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

function onDown(ev) {
    gIsClicked = true
    //get the current click event position
    const { offsetX, offsetY } = ev

    //check if a text is pressed and get his index
    const idx = gTexts.findIndex(text => isPressed(text, offsetX, offsetY))
    if (idx !== -1) {
        gCurrTextId = idx
        gIsDrag = true
        gTextInput = gTexts[idx].text
        updateTextControlls()
        renderMeme()
    }

}

function onUp() {
    gIsDrag = false
    gIsClicked = false
    renderMeme()
}

function onMove(ev) {
    if (!gIsClicked) return // return if mouse is up
    if (!gIsDrag) return // return if no text is selected

    onTextDrag(ev)
}


//GALLERY CONTROLLER
function renderGallery() {//render the img gallery from the gImgs array
    var gellary = document.querySelector('.gallery')

    // var imgs = getImgs()
    var imgs = filterByKeyword(gSearchKey)

    //UPLOAD BUTTON HTML STRING
    var uploadHTML = ` 
        <button class="user-img-button" onclick="document.querySelector('.user-img').click()"> <i class="fa-solid fa-upload"></i>Upload file
                <input type="file" name="user-img" class="user-img" hidden oninput="onImgInput(event)">
        </button>`

    //GALERRY IMGS HTML STRING
    var strHTML = imgs.map(img => `
        <img src="./${img.url}" onclick="onImgClick(this,${img.id})">`)
    gellary.innerHTML = uploadHTML + strHTML.join('')

    renderKeywords()
}

function onGalleryClick() {// handle gallery click in nav bar
    document.querySelector('.editor-container').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'block'
    document.querySelector('.saved-container').style.display = 'none'
    document.querySelector(".search input").focus()

}

function onImgClick(el, id) {//handle img click gallery section

    document.querySelector('.editor-container').style.display = 'flex'
    document.querySelector('.gallery-container').style.display = 'none'

    getCurrImg(el.src)
    drawCurrImg()
    gIsSelected = true
}

function onSearchInput({ value }) {
    console.log('value:', value)
    gSearchKey = value
    renderGallery()
}

function onTagClick(tagText) {
    var search = document.querySelector(".search input")
    search.value = tagText
    search.focus()
    search.oninput()
}

function renderKeywords() {
    const keywords = getSortedKeywords()
    const topKeywords = keywords.slice(0, 4)
    const moreKeywords = keywords.slice(4)
    var fontSize = 24

    var elTopTags = document.querySelector(".top-tags")
    var strHTML = topKeywords.map(keyword => `
        <li onclick="onTagClick(this.innerText)" style="font-size:${fontSize -= 2}px;">${keyword[0]}</li>`)
    elTopTags.innerHTML = strHTML.join('')

    var elMoreTags = document.querySelector(".more-tags")
    var strHTML = moreKeywords.map(keyword => `
        <li onclick="onTagClick(this.innerText)" style="font-size:${fontSize--}px;">${keyword[0]}</li>`)
    elMoreTags.innerHTML = strHTML.join('')
}

function onShowMore(elMoreBtn) {
    const elMoreTags = document.querySelector('.tags-more')

    if (elMoreBtn.innerText === 'More') {
        elMoreTags.style.display = 'block'
        elMoreBtn.innerText = 'Hide'
    } else {
        elMoreTags.style.display = 'none'
        elMoreBtn.innerText = 'More'
    }
}


//EDITOR CONTROLLER
function resizeContainer() { //resize the container to the img size

    // console.log('resizeContainer()')
    //resize the container to the img size
    const elContainer = document.querySelector('.canvas-container')
    elContainer.width = gCurrImg.width
    elContainer.height = gCurrImg.height
}

function resizeCanvas() { // resize the canvas to the container size
    // console.log('resizeCanvas()')
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
    return pos
}

function getCanvasCenter() { // return x,y of the canvas center
    return {
        x: gElCanvas.width / 2,
        y: gElCanvas.height / 2
    }
}

function onErase() {//on text Erase button click
    // clearCanvas()
    drawCurrImg()
    clearTexts()
}

function clearCanvas() { // clear the intire canvas
    console.log('clearCanvas()')
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.fillStyle = 'rgb(56, 59, 66)'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    // saveCanvas()
}

function clearTexts() {//delete all text lines and restart gTexts
    if (!gIsSelected) {// if noo img is selected yet - just clear the text area
        document.querySelector('.meme-text').value = ''
        return
    }

    document.querySelector('.meme-text').value = ''
    document.querySelector('.btn-stroke').value = 'black'
    document.querySelector('.btn-fill').value = 'black'

    var { x: xCenter, y: yCenter } = getCanvasCenter()
    gTexts = [{ text: '', x: 250, y: 250, stroke: 'black', fill: 'black', size: 40, font: 'arial', align: 'center' }]
    gCurrTextId = 0
}

function onSizeUp() {
    gTexts[gCurrTextId].size += 5
    const { w, h } = getHeightAndWidth(gTextInput)
    gTexts[gCurrTextId].width = Math.ceil(w)
    gTexts[gCurrTextId].height = h
    renderMeme()
}

function onSizeDown() {
    gTexts[gCurrTextId].size -= 5
    const { w, h } = getHeightAndWidth(gTextInput)
    gTexts[gCurrTextId].width = Math.ceil(w)
    gTexts[gCurrTextId].height = h
    renderMeme()
}

function onAdd() {//on text Add button click
    if (!gIsSelected) return // no action if no img is selected yet

    var text = document.querySelector('.meme-text').value
    var stroke = document.querySelector('.btn-stroke').value
    var fill = document.querySelector('.btn-fill').value
    var font = document.querySelector('.font-selector').value

    var { x, y } = getCanvasCenter()
    gTexts.push({ text, x, y, stroke, fill, size: gTexts[gCurrTextId].size, font, align: 'center' })
    gCurrTextId += 1
    renderMeme()
    document.querySelector('.meme-text').value = ''
}

function onStrokeInput({ value }) {// on stroke color change
    gTexts[gCurrTextId].stroke = value
    renderMeme()
}

function onFillInput({ value }) { // on fill color change
    gTexts[gCurrTextId].fill = value
    renderMeme()
}

function onFontChange({ value }) {// on font change
    gTexts[gCurrTextId].font = value

    renderMeme()
}

function onAlignClick(value) {// on alignment change
    gTexts[gCurrTextId].align = value
    console.log('value:', value)
    renderMeme()
}

function onTextInput({ value }) {//on text input change
    if (!gIsSelected) return // no action if no img is selected yet
    const { w, h } = getHeightAndWidth(value)

    gTextInput = value
    gTexts[gCurrTextId].text = value
    gTexts[gCurrTextId].width = w
    gTexts[gCurrTextId].height = h
    renderMeme()
}

function onSwitchLine() {//toggle between the selected lines
    var maxIdx = gTexts.length - 1

    if (gCurrTextId < maxIdx) gCurrTextId += 1
    else gCurrTextId = 0

    console.log('gCurrTextId:', gCurrTextId)
    updateTextControlls()
    renderMeme()
}

function onDownload(link) {//on file download button click
    downloadCanvas(link)
}


//RENDERING FUNCTIONS
function drawCurrImg(img = gCurrImg) { // draw the current img object to the canvas
    if (img !== null) {
        resizeContainer()
        resizeCanvas()
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        return
    }
}

function drawTexts() {//render all text lines
    console.log('drawTexts()')
    gTexts.forEach(text => drawText(text));
}

function drawText(currText) {//draw text in specified x,y location
    gCtx.lineWidth = 2
    gCtx.strokeStyle = currText.stroke
    gCtx.fillStyle = currText.fill
    gCtx.font = `${currText.size}px ${currText.font}`
    // gCtx.font = '40px Arial'
    gCtx.textAlign = currText.align
    gCtx.textBaseline = 'middle'
    gCtx.fillText(currText.text, currText.x, currText.y)
    gCtx.strokeText(currText.text, currText.x, currText.y)
}

function drawRectOnSelected() {//draw Rect around the selected text box
    var { x, y, width, height, align } = gTexts[gCurrTextId]
    //CALC POS
    if (align === 'left') x = x
    else if (align === 'center') x -= width / 2 // can be deleted but remain for readability
    else if (align === 'right') x -= width
    var th = 5
    var xStart = x - th
    var yStart = y - height / 2 - th

    //DRAW
    gCtx.lineWidth = 0.5
    gCtx.beginPath(); // Start a new path
    gCtx.strokeStyle = 'black'
    gCtx.rect(xStart, yStart, width + th * 2, height + th * 2); // Add a rectangle to the current path
    gCtx.closePath()
    gCtx.stroke()
}

function renderMeme() {//render the selected img and than draw the text lines
    console.log('renderMeme')
    drawCurrImg()
    drawTexts()
    drawRectOnSelected()
}


//TEXT CLICK AND DRAG AND DROP
function onTextDrag(ev) {// change current text position
    gClickedPos = getEvPos(ev)
    var currText = gTexts[gCurrTextId]
    if (currText.align === 'left') currText.x = gClickedPos.x - currText.width / 2
    else if (currText.align === 'center') currText.x = gClickedPos.x
    else if (currText.align === 'right') currText.x = gClickedPos.x + currText.width / 2
    currText.y = gClickedPos.y - currText.height / 2
}

function isPressed(text, offsetX, offsetY) {//return true if a text is pressed
    //added some threshold for click placement, veriables are seperated for more flexability
    var lth = 20
    var cth = 20
    var rth = 20

    if (text.align === 'left') { return offsetX >= text.x + lth && offsetX <= text.x + text.width + lth && offsetY >= text.y && offsetY <= text.y + text.height }
    else if (text.align === 'center') { return offsetX >= text.x - text.width / 2 && offsetX <= text.x + text.width / 2 + cth && offsetY >= text.y && offsetY <= text.y + text.height }
    else if (text.align === 'right') { return offsetX >= text.x - text.width + rth && offsetX <= text.x + rth && offsetY >= text.y && offsetY <= text.y + text.height }
}

function getHeightAndWidth(text) {//return the height and width of a given text
    const metrics = gCtx.measureText(text);
    const h = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    const w = metrics.width
    return { w, h }
}

function updateTextControlls() {//on select, update the controlls to match the current selected text
    var currText = gTexts[gCurrTextId]
    document.querySelector('.meme-text').value = currText.text
    document.querySelector('.font-selector').value = currText.font
    document.querySelector('.btn-stroke').value = currText.stroke
    document.querySelector('.btn-fill').value = currText.fill

}

//RANDOMIZE IMG
function onRandom() {
    //RAND IMG
    const imgs = getImgs()
    const randImg = imgs[getRandomInt(0, imgs.length)]
    gIsSelected = true
    getCurrImg(randImg.url)

    //RAND TEXT
    const elMemeText = document.querySelector('.meme-text')
    gTextInput = randomText(2)
    gTexts[0].text = gTextInput

    //RENDER
    elMemeText.value = gTextInput
    elMemeText.focus()
    renderMeme()
}

function randomText(n) {
    var text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dolorum optio vero natus eligendi corrupti adipisci commodi excepturi, illum animi quis, minus iure. Doloremque, eos rerum laboriosam dignissimos assumenda iste.'
    var words = text.split(' ')
    var text = []

    for (var i = 0; i < n; i++) {
        text.push(words[getRandomInt(0, words.length)])
    }

    return text.join(' ')
}


//SAVE CONTROLLER
function onSaveBtn() {
    if (!gIsSelected) return
    console.log('saving!')
    const img = gElCanvas.toDataURL("image/png")
    saveImg(img, gCurrImg, gTexts)
    console.log(gSavedImgs)
}

function onSavedImg(idx) {
    gCurrImg = gSavedImgs[idx].src
    gTexts = gSavedImgs[idx].text
    gIsSelected = true
    renderMeme()
    document.querySelector('.editor-container').style.display = 'flex'
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector(".saved-container").style.display = 'none'

}
function renderSavedImgs() {
    var savedImgsGallery = document.querySelector(".saved-container .saved-gallery")
    var strHTML = gSavedImgs.map((savedImg, idx) => `
        <img src="${savedImg.img}" onclick="onSavedImg(${idx})"`)
    savedImgsGallery.innerHTML = strHTML.join('')
}

function onSaveTab() {
    renderSavedImgs()
    document.querySelector('.editor-container').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector(".saved-container").style.display = 'block'
}