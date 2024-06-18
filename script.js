console.log("Javascript file loaded")

// TODO change event listeners to event delegation
// BUG sometimes the hover effect lingers after the timeout (check again after delegation)

const sketch_container = document.querySelector(".sketch-container")
const bt_clear = document.querySelector("#clear")
const range_selector = document.querySelector("#myRange")
const current_size = document.querySelector("#current-size")
const radioButtons = document.querySelectorAll('input[name="colorize"]');


// generate random color for randomized option
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// callback for hovering
function activateGridElement(event) {
    this.classList.add("grid-hover")
    switch (currentColorState) {
        case "colorize":
            this.style["background-color"] = getRandomColor();
            this.style["opacity"] = 1;
            break;
        case "darken":
            // reverese effect to work with background color of the container and get the effect of circular dots
            this.style["background-color"] = "white";
            const currentOpacity = Number(this.style["opacity"])
            this.style["opacity"] = currentOpacity <= 0 ? 0 : Number(this.style["opacity"]) - 0.1;
            break;
        case "normal":
            this.style["background-color"] = "white";
            this.style["opacity"] = 0.3;
            break;
    }

}

// callback for transition end
function deactivateGridElement(event) {
    if (event.propertyName == "transform") {
        this.classList.remove("grid-hover");
    }
}

// reset grid, then add new grid rows, then add boxes in each row
function buildGridRows(grid_size) {
    sketch_container.innerHTML = '';
    for (i = 0; i < grid_size; i++) {
        const grid_row = document.createElement("div")
        grid_row.classList.add("grid-row")
        for (j = 0; j < grid_size; j++) {
            grid_row.appendChild(buildSingleBox())
        }
        sketch_container.appendChild(grid_row)
    }
}

// build single box in grid, then add listeners
function buildSingleBox() {
    const grid_element = document.createElement("div")
    grid_element.classList.add("grid-element")
    grid_element.addEventListener('mouseover', activateGridElement)
    grid_element.addEventListener('transitionend', deactivateGridElement)
    grid_element.style["opacity"] = 1;
    return grid_element
}

// get grid size from slider
function getGridSize(event) {
    grid_size = range_selector.value;
    current_size.textContent = `${grid_size} x ${grid_size}`;
    return grid_size
}

// build grid after getting selected grid size
function buildGridReactivaly() {
    grid_size = getGridSize();
    buildGridRows(grid_size)
}

bt_clear.addEventListener('click', buildGridReactivaly);
range_selector.addEventListener('input', buildGridReactivaly);


let currentColorState = 'normal';

for (const radioButton of radioButtons) {
    radioButton.addEventListener('change', (e) => {currentColorState = e.target.value});
    if (radioButton.value == "normal") {
        radioButton.checked = true;
    }
}

buildGridReactivaly()