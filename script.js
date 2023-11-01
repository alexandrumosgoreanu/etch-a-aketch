const DEFAULT_COLOR = '#ffffff'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 16

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

function setCurrentColor(newColor) {
  currentColor = newColor
}

function setCurrentMode(newMode) {
  activateButton(newMode)
  currentMode = newMode
}

function setCurrentSize(newSize) {
  currentSize = newSize
}

const colorPicker = document.querySelector('#color-picker');
const colorBtn = document.querySelector('#color-btn');
const rainbowBtn = document.querySelector('#rainbow-btn');
const darkenBtn = document.querySelector('#darken-btn');
const eraserBtn = document.querySelector('#eraser-btn');
const clearBtn = document.querySelector('#clear-btn');
const sizeValue = document.querySelector('#size-value');
const sizeSlider = document.querySelector('#size-slider');
const grid = document.querySelector('#grid');
const toggleGridBtn = document.querySelector('#toggle-grid-btn');
let activeButton = colorBtn;

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
darkenBtn.onclick = () => setCurrentMode('darken');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadGrid();
sizeSlider.onmousemove = (e) => updateGridSize(e.target.value);
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)
toggleGridBtn.onclick = () => toggleGrid();

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


function updateSizeValue(value) {
    sizeValue.textContent = `${value} x ${value}`;
}

function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (currentMode === 'color')
        e.target.style.backgroundColor = currentColor;
    else if (currentMode === 'eraser')
        e.target.style.backgroundColor = '#ffffff';
    else if (currentMode === 'rainbow') {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
    else if (currentMode === 'darken') {
        let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
        if (currentOpacity <= 0.9) {
            this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
            this.classList.add('gray');
        }
    }
}

function toggleGrid() {
    grid.classList.toggle('grid-on');
    gridElems = [...grid.children];
    //gridElems.forEach(item => item.classList.toggle('grid-on'));
    for(item of gridElems) {
        item.classList.toggle('grid-on')
    }
}

function activateButton(newMode) {
    if(currentMode != newMode)
        activeButton.classList.remove('active');
        if(newMode === 'color') {
            colorBtn.classList.add('active');
            activeButton = colorBtn;
        }
        else if(newMode === 'rainbow') {
            rainbowBtn.classList.add('active');
            activeButton = rainbowBtn;
        }
        else if(newMode === 'darken') {
            darkenBtn.classList.add('active');
            activeButton = darkenBtn;
        }
        else {
            eraserBtn.classList.add('active');
            activeButton = eraserBtn;
        }    
}

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for(let i = 0; i < size * size; i++) {
        const gridElem = document.createElement('div');
        gridElem.classList.add('grid-element');
        gridElem.classList.add('grid-on');
        gridElem.addEventListener('mouseover', changeColor)
        gridElem.addEventListener('mousedown', changeColor)
        grid.appendChild(gridElem);
    }
}

function reloadGrid() {
    clearGrid();
    setupGrid(currentSize);
}

function clearGrid() {
    grid.innerHTML = ''
}

window.onload = () => {
    setupGrid(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
}