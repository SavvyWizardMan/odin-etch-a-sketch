
const grid = document.querySelector("#gridBlock");
const color = document.querySelector("#colorSelection")
const gridSize = document.querySelector("#gridSize")
const drawSelection = document.querySelectorAll('#drawingMethod');

// Initilize variables 📃
let draw = "clickDrag"
let isClicked = false;

// Create the grid of squares 🔮
updateGrid(16, color.value, draw);

// select all of the newly created squares 
let squares = document.querySelectorAll('square');

// when the color picked is changed, update the listeners 🔊 for each square with new color 🎨
color.addEventListener("input", () =>{
    squares.forEach(square => {
        updateListener(square, color.value, draw);
    });
})

// when grid size is changed, remove the previous grid and replace with new size
gridSize.addEventListener("change", () =>{
    squares.forEach(square =>{
        grid.removeChild(square);
    });
    console.log("Updated grid size to: "+gridSize.value);
    updateGrid(gridSize.value, color.value);
    squares = document.querySelectorAll('square');
})

drawSelection.forEach(selection => {
    selection.addEventListener("click", () => {
        isClicked = false;
        squares.forEach(square => {
            updateListener(square, color.value, selection.value);
        });
        console.log("Drawing method updated, draw = "+selection.value);
    })
})


// Functions ------------------------------------------------------------------------


// Grid creation and inital square color listeners 🔊
function updateGrid(value, color, draw){
    i = 0;
    // k = (600-((1)*(value-1)))/value;
    k = 600/value;
    
    grid.draggable = false;

    while(i<(value * value)){
        const square = document.createElement("square");
        square.classList.add("square");
        grid.appendChild(square);
        i++;
        square.style.width=k+"px";
        square.style.height=k+"px";
        square.style.backgroundColor = "white"
        square.draggable = false;
        updateListener(square, color, draw);
    }
}

function updateListener(square, color, drawInput){

    draw = drawInput;
    
    square.addEventListener(("mousedown"), () => {
        if(draw == "clickDrag"){
            isClicked = true;
            square.style.backgroundColor = color;
        }
    });

    square.addEventListener(("mouseover"), () => {
        console.log(isClicked)
        if(isClicked == true){
            square.style.backgroundColor = color;
            console.log("hovering while clicked is true");
        }else if(isClicked == false && draw == "hover"){
            square.style.backgroundColor = color;
            console.log("hovering while clicked is false but hover is true");
        }
    });

    square.addEventListener(("mouseup"), () => {
        if(draw == "clickDrag"){
            isClicked = false;
        }
    });

    grid.addEventListener("mouseleave", () => {
        if(draw == "clickDrag"){
            isClicked = false;
        }
    });
}
