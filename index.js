

const grid = document.getElementById("grid");
const generateGridBtn = document.getElementById("generateGrid");
const xSizeInput = document.getElementById("xSize");
const zSizeInput = document.getElementById("zSize");
const colorButtons = document.querySelectorAll(".colorBtn");

let currentColor = "";
let mouseDown = false;


generateGridBtn.addEventListener("click", generateGrid);

colorButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentColor = button.style.backgroundColor;
    });
});

document.addEventListener("mousedown", () => {
    mouseDown = true;
});

document.addEventListener("mouseup", () => {
    mouseDown = false;
});

function generateGrid() {
    const xSize = parseInt(xSizeInput.value);
    const zSize = parseInt(zSizeInput.value);

    grid.innerHTML = "";
    grid.style.gridTemplateColumns = `repeat(${xSize}, 1fr)`;

    for (let i = 0; i < xSize * zSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.addEventListener("mouseenter", () => {
            if (mouseDown && currentColor === "grey") {
                cell.style.backgroundColor = currentColor;
            }
        });
        cell.addEventListener("click", () => {
            if (currentColor === "red" || currentColor === "green") {
                const sameColorCells = document.querySelectorAll(`.grid-cell[style*="background-color: ${currentColor};"]`);
                sameColorCells.forEach(c => c.style.backgroundColor = "");
                cell.style.backgroundColor = currentColor;
            }
        });
        grid.appendChild(cell);
    }

    const randomRedIndex = Math.floor(Math.random() * (xSize * zSize));
    let randomGreenIndex = Math.floor(Math.random() * (xSize * zSize));

    // Ensure green cell is not in the same position as the red cell
    while (randomGreenIndex === randomRedIndex) {
        randomGreenIndex = Math.floor(Math.random() * (xSize * zSize));
    }

    const allCells = document.getElementsByClassName("grid-cell");
    allCells[randomRedIndex].style.backgroundColor = "red";
    allCells[randomGreenIndex].style.backgroundColor = "green";
}

// Initial grid generation
generateGrid();


