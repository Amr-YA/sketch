console.log("Javascript file loaded")

let grid_size = 16

const sketch_container = document.querySelector(".sketch-container")

function changeColor(event) {
    console.log(this)
    this.classList.add("grid-on")
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