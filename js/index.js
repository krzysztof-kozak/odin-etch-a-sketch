document.addEventListener("DOMContentLoaded", () => {
	setDefaultSliderState();
	createGrid(defaultGridSize);
});

const root = document.querySelector(":root");

const sketchPad = document.querySelector(".sketch-container-js");
const resetBtn = document.querySelector(".reset-btn-js");

const input = document.querySelector("input");
const output = document.querySelector("output");

const defaultGridSize = input.value;

input.addEventListener("input", handleInputChange);
resetBtn.addEventListener("click", resetGrid);

function setDefaultSliderState() {
	output.value = input.value;
}

function createGrid(size) {
	const sizeSquared = size * size;

	for (let i = 0; i < sizeSquared; i++) {
		const divElement = document.createElement("div");
		divElement.classList.add("grid-item");
		sketchPad.appendChild(divElement);
	}
}

function deleteGrid() {
	while (sketchPad.hasChildNodes()) {
		sketchPad.firstElementChild.remove();
	}
}

function resetGrid() {
	input.value = defaultGridSize;
	output.value = defaultGridSize;

	deleteGrid();
	createGrid(defaultGridSize);
	adjusGridSize(defaultGridSize);
}

function adjusGridSize(value) {
	root.style.setProperty("--grid-size", value);
}

function handleInputChange({ target: { value } }) {
	output.value = value;

	deleteGrid();
	createGrid(value);
	adjusGridSize(value);
}
