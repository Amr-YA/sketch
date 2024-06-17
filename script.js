console.log("Javascript file loaded")

// TODO change event listeners to event delegation
// TODO add a temp scaling up effect after hover 

const sketch_container = document.querySelector(".sketch-container")
const bt_clear = document.querySelector("#clear")
const bt_invert = document.querySelector("#invert")
const range_selector = document.querySelector("#myRange")
const current_size = document.querySelector("#current-size")

function changeColor(event) {
    this.classList.add("grid-on")
}

function clearGrid(event) {
    const rows = sketch_container.childNodes

    rows.forEach((row) => {
        row.childNodes.forEach((element) => {
            element.classList.remove("grid-on")
        })
    })
}

function invertGrid(event) {
    const rows = sketch_container.childNodes

    rows.forEach((row) => {
        row.childNodes.forEach((element) => {
            element.classList.toggle("grid-on")
        })
    })
}

function buildGridElements(grid_size) {
    sketch_container.innerHTML = '';
    for (i = 0; i < grid_size; i++) {
        const grid_row = document.createElement("div")
        grid_row.classList.add("grid-row")
        for (j = 0; j < grid_size; j++) {
            const grid_element = document.createElement("div")
            grid_element.classList.add("grid-element")
            grid_element.addEventListener('mouseover', changeColor)
            grid_row.appendChild(grid_element)
        }
        sketch_container.appendChild(grid_row)
    }
}

function getGridSize(event) {
    grid_size = range_selector.value;
    console.log(grid_size)
    current_size.textContent = `${grid_size} x ${grid_size}`;
    return grid_size
}

function buildGridReactivaly() {
    grid_size = getGridSize();
    buildGridElements(grid_size)
}

bt_clear.addEventListener('click', clearGrid);
bt_invert.addEventListener('click', invertGrid);
range_selector.addEventListener('input', buildGridReactivaly);

buildGridReactivaly()