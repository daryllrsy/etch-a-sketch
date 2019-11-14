"use strict";

const sketchWindow = document.querySelector("#sketch-window");
let currentGridTileWidth = undefined;

let randomRGB = () => Math.floor(Math.random() * 256);
let randomRGBtriple = () => `rgb(${randomRGB()},${randomRGB()},${randomRGB()})`;

function drawGrid(gridTileWidth=16) {
    currentGridTileWidth = gridTileWidth;
    const gridPxWidth = 500;
    let tilePxWidth = gridPxWidth / gridTileWidth;

    for (var i=gridTileWidth*gridTileWidth; i > 0; i--) {

        let tile = document.createElement("div");
        tile.setAttribute("class", "tile");
        tile.style.height = tilePxWidth+"px";
        tile.style.width = tilePxWidth+"px";
        tile.style.backgroundColor = "";

        tile.addEventListener("mouseover", (e) => tile.style.backgroundColor = "black");

        sketchWindow.appendChild(tile);
    };
};


let newWidth = () => +(window.prompt("How many tiles per side? (limit: 1-250)"));
function newGrid() {
    let tempWidth = newWidth();

    if (tempWidth >= 1 && tempWidth <= 250) {
        const tiles = document.querySelectorAll(".tile");

        tiles.forEach(function(tile){
            tile.parentNode.removeChild(tile);
        });

        drawGrid(tempWidth);
    }
    else {
        alert("Sorry! We don't believe in the number you entered.");
    }
}

function clearGrid() {
    const tiles = document.querySelectorAll(".tile");
    
    tiles.forEach(function(tile){
        tile.style.backgroundColor = "";
    });    
};

function changePen(tip) {
    const tiles = document.querySelectorAll(".tile");

    tiles.forEach(function(tile){
        tile.addEventListener("mouseover", (e) => tile.style.backgroundColor = tip());
    });

    alert(event());
};

drawGrid();

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", (e) => clearGrid());

const chaosButton = document.querySelector("#chaos");
chaosButton.addEventListener("click", (e) => changePen(randomRGBtriple));

const newButton = document.querySelector("#new");
newButton.addEventListener("click", (e) => newGrid());