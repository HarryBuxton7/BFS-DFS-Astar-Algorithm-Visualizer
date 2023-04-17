

const a1 = document.getElementById("run1");
a1.addEventListener("click", runBFSAlgorithm);

async function runBFSAlgorithm() {
    console.log("hey")
    const startCell = document.getElementById("start1");
    const goalCell = document.getElementById("goal1");
    tempGrid = startCell.parentElement;

    if (!startCell || !goalCell) {
        alert("Start (green) and goal (red) cells must be set before running the BFS algorithm.");
        return;
    }

    const xSize = parseInt(xSizeInput.value);
    const zSize = parseInt(zSizeInput.value);

    const start = {
        x: [...startCell.parentElement.children].indexOf(startCell) % xSize,
        y: Math.floor([...startCell.parentElement.children].indexOf(startCell) / xSize)
    };

    const goal = {
        x: [...goalCell.parentElement.children].indexOf(goalCell) % xSize,
        y: Math.floor([...goalCell.parentElement.children].indexOf(goalCell) / xSize)
    };

    const openSet = [start];
    const cameFrom = new Map();

    const gScore = Array(zSize).fill(null).map(() => Array(xSize).fill(Infinity));
    gScore[start.y][start.x] = 0;

    while (openSet.length > 0) {
        const current = openSet.shift();

        if (current.x === goal.x && current.y === goal.y) {
            const path = reconstructPath(cameFrom, current);
            for (const point of path) {
                const cell = tempGrid.children[point.y * xSize + point.x];
                if (cell.style.backgroundColor !== "green" && cell.style.backgroundColor !== "red") {
                    cell.style.backgroundColor = "blue";
                }
                await new Promise(resolve => setTimeout(resolve, 15));
            }
            return;
        }

        const neighbors = [
            { x: current.x, y: current.y - 1 },
            { x: current.x, y: current.y + 1 },
            { x: current.x - 1, y: current.y },
            { x: current.x + 1, y: current.y }
        ];

        for (const neighbor of neighbors) {
            if (neighbor.x < 0 || neighbor.y < 0 || neighbor.x >= xSize || neighbor.y >= zSize) {
                continue;
            }
            const neighborCell = tempGrid.children[neighbor.y * xSize + neighbor.x];
            if (neighborCell.style.backgroundColor === "grey") {
                continue;
            }

            const tentativeGScore = gScore[current.y][current.x] + 1;
            if (tentativeGScore < gScore[neighbor.y][neighbor.x]) {
                cameFrom.set(neighbor, current);
                gScore[neighbor.y][neighbor.x] = tentativeGScore;

                if (!openSet.some(point => point.x === neighbor.x && point.y === neighbor.y)) {
                    openSet.push(neighbor);
                }

                const cell = tempGrid.children[neighbor.y * xSize + neighbor.x];
                if (cell.style.backgroundColor !== "green" && cell.style.backgroundColor !== "red") {
                    cell.style.backgroundColor = "yellow";
                    await new Promise(resolve => setTimeout(resolve, 2));
                }
            }
        }
    }

    alert("No path found.");
}

