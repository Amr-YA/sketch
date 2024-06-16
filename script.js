console.log("Javascript file loaded")

// TODO change event listeners to event delegation
// TODO add a temp scaling up effect after hover 

let grid_size = 16

const sketch_container = document.querySelector(".sketch-container")
const bt_clear = document.querySelector("#clear")
const bt_invert = document.querySelector("#invert")

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

for (i = 0; i < grid_size; i++) {
    console.log(i)
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

bt_clear.addEventListener('click', clearGrid)
bt_invert.addEventListener('click', invertGrid)