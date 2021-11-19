document.addEventListener("DOMContentLoaded", () => {
	const defaultGridSize = input.value;

	setDefaultSliderState();
	createGrid(defaultGridSize);
});

const root = document.querySelector(":root");
const sketchPad = document.querySelector(".sketch-container-js");

const input = document.querySelector("input");
const output = document.querySelector("output");

input.addEventListener("input", handleInputChange);

function setDefaultSliderState() {
	output.value = input.value;
}

function createGrid(size) {
	const sizeSquared = size * size;

	for (let i = 0; i < sizeSquared; i++) {
		console.log(sketchPad.childElementCount);
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

function adjusGridSize(value) {
	root.style.setProperty("--grid-size", value);
}

function handleInputChange({ target: { value } }) {
	output.value = value;

	deleteGrid();
	createGrid(value);
	adjusGridSize(value);
}
