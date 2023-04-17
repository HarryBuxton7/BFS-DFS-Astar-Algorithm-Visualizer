
const copyGridBtn = document.getElementById("dd");
copyGridBtn.addEventListener("click", copyGrid);

const a = document.getElementById("run");
a.addEventListener("click", runAlgorithms);

function runAlgorithms(){
    runAstarAlgorithm();
}


function copyGrid() {
    let amountOfCopies = 3;
    try{
        for(let i = 0; i < amountOfCopies; i++){
            document.getElementById("copiedGridContainer").removeChild(document.getElementById("copiedGridContainer").lastChild);
        }
    }
    catch(err){
    }
    for(let i = 0; i < amountOfCopies; i++){{
        const grid1 = document.getElementById("grid");
        const gridCopy = grid1.cloneNode(true);
        gridCopy.className = `${i}`
        gridCopy.style.margin = "20px";
        try{
            findChildByBackgroundColor(gridCopy, "green").id = `start${i}`;
            findChildByBackgroundColor(gridCopy, "red").id = `goal${i}`;
        } catch(err){
        }


        document.getElementById("copiedGridContainer").appendChild(gridCopy);

        function findChildByBackgroundColor(parentElement, backgroundColor) {
            for (const child of parentElement.children) {
                if (child.style.backgroundColor === backgroundColor) {
                    return child;
                }
            }
            return null;
        }

        }
    }
}






function getManhattanDistance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function reconstructPath(cameFrom, current) {
    const path = [current];
    while (cameFrom.has(current)) {
        current = cameFrom.get(current);
        path.unshift(current);
    }
    return path;
}

async function runAstarAlgorithm() {
    
    const startCell = document.getElementById("start0");
    const goalCell = document.getElementById("goal0");
    tempGrid = startCell.parentElement
    console.log(startCell)

    if (!startCell || !goalCell) {
        alert("Start (green) and goal (red) cells must be set before running the A* algorithm.");
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
    const fScore = Array(zSize).fill(null).map(() => Array(xSize).fill(Infinity));

    gScore[start.y][start.x] = 0;
    fScore[start.y][start.x] = getManhattanDistance(start, goal);

    while (openSet.length > 0) {
        openSet.sort((a, b) => fScore[a.y][a.x] - fScore[b.y][b.x]);
        const current = openSet.shift();

        if (current.x === goal.x && current.y === goal.y) {
            const path = reconstructPath(cameFrom, current);
            for (const point of path) {
                const cell = tempGrid.children[point.y * xSize + point.x];
                if (cell.style.backgroundColor !== "green" && cell.style.backgroundColor !== "red") {
                    cell.style.backgroundColor = "blue";
                }
                await new Promise(resolve => setTimeout(resolve,0.2));
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
                fScore[neighbor.y][neighbor.x] = tentativeGScore + getManhattanDistance(neighbor, goal);

                if (!openSet.some(point => point.x === neighbor.x && point.y === neighbor.y)) {
                    openSet.push(neighbor);
                }

                const cell = tempGrid.children[neighbor.y * xSize + neighbor.x];
                if (cell.style.backgroundColor !== "green" && cell.style.backgroundColor !== "red") {
                    cell.style.backgroundColor = "yellow";
                    await new Promise(resolve => setTimeout(resolve, 0.2));
                }
            }
        }
    }
    alert("No path found.");
}

