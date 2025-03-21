const gameCanvas = document.querySelector("#gameCanvas");
const slider = document.querySelector("#sizeSlider");
const sliderValueText = document.querySelector("#sliderValue");
const gridCanvas = document.querySelector("#gridCanvas");
const colorPicker = document.querySelector("#colorPicker");
const randomColor = document.querySelector("#randomColorButton");

let selectedColor = colorPicker.value;
let useRandomColors = false;
let canvasSize = 16 || parseInt(sliderValue);
let isMouseDown = false;
let isErasing = false;

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgba(${r}, ${g}, ${b})`;
}
function createGrids() {
  gridCanvas.innerHTML = "";
  sliderValue.textContent = canvasSize + " x " + canvasSize;
  let totalGrids = canvasSize * canvasSize;
  let gridSize = 650 / canvasSize;
  for (let i = totalGrids; i > 0; i--) {
    let grids = document.createElement("div");
    grids.setAttribute("class", "grids");
    grids.style.width = `${gridSize}px`;
    grids.style.height = `${gridSize}px`;

    grids.addEventListener("mousedown", (e) => {
      //Drawin end erasing if mouse1/2 pressed
      if (e.button === 0) {
        isMouseDown = true;
        e.target.style.backgroundColor = useRandomColors
          ? getRandomColor()
          : selectedColor;
      } else if (e.button === 2) {
        isErasing = true;
        e.target.style.backgroundColor = "";
      }
      e.preventDefault();
    });
    grids.addEventListener("mouseover", (e) => {
      // keep Drawin end erasing if mouse1/2 pressed and hold
      if (isMouseDown) {
        e.target.style.backgroundColor = useRandomColors
          ? getRandomColor()
          : selectedColor;
      } else if (isErasing) {
        e.target.style.backgroundColor = "";
      }
    });
    gridCanvas.appendChild(grids);
  }
}

document.addEventListener("mouseup", () => {
  // stop draving if mouse is outside of the Canvas
  isMouseDown = false;
  isErasing = false;
});

gameCanvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

function changeValue() {
  canvasSize = parseInt(slider.value);
  sliderValue.textContent = canvasSize + " x " + canvasSize;
  createGrids();
}

function clearGrid() {
  document.querySelectorAll(".grids").forEach((grid) => {
    grid.style.backgroundColor = "";
  });
}

colorPicker.addEventListener("input", (e) => {
  selectedColor = e.target.value;
});

randomColor.addEventListener("click", () => {
  useRandomColors = !useRandomColors; // Toggle mode
  if (useRandomColors) {
    randomColor.style.background = `linear-gradient(24deg, rgba(255,0,0,1) 0%, rgba(254,255,0,1) 25%, rgba(1,255,0,1) 50%, rgba(3,21,215,1) 75%, rgba(255,0,245,1) 100%)`;
    randomColor.style.outline = "1px solid rgba(255, 102, 0, 1)";
  } else {
    randomColor.style.background = "black";
  }

  randomColor.textContent = useRandomColors
    ? "Random Colors: ON"
    : "Random Colors: OFF";
});
createGrids();
