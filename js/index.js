document.addEventListener("DOMContentLoaded", () => {
	setDefaultSliderState();
	createGrid(defaultGridSize);
});

const root = document.querySelector(":root");
const computerStyles = window.getComputedStyle(root);
const brushColor = computerStyles.getPropertyValue("--brush-color");

const sketchPad = document.querySelector(".sketch-container-js");
const resetBtn = document.querySelector(".reset-btn-js");

const input = document.querySelector("input");
const output = document.querySelector("output");

const defaultGridSize = input.value;

sketchPad.addEventListener("mouseenter", handleMouseEnter, { capture: true });
input.addEventListener("input", handleInputChange);
resetBtn.addEventListener("click", resetGrid);

function setDefaultSliderState() {
	output.value = input.value;
}

function createGrid(size) {
	const squares = document.querySelectorAll(".grid-item");
	squares.forEach((square) => resetBgColor(square));

	const currentSize = sketchPad.childElementCount;
	const updatedSize = size * size;

	const delta = updatedSize - currentSize;

	if (delta > 0) {
		addSquares();
		return;
	}

	if (delta < 0) {
		removeSquares();
		return;
	}

	function addSquares() {
		for (let i = 0; i < delta; i++) {
			const divElement = document.createElement("div");
			divElement.classList.add("grid-item");
			sketchPad.appendChild(divElement);
		}
	}

	function removeSquares() {
		for (let i = 0; i < Math.abs(delta); i++) {
			sketchPad.firstElementChild.remove();
		}
	}

	function resetBgColor(element) {
		if (element.style["background-color"]) {
			element.style["background-color"] = "unset";
		}
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
	createGrid(value);
	adjusGridSize(value);
}

function handleMouseEnter({ target, altKey, ctrlKey }) {
	if (target.classList.contains("sketch-container-js")) {
		return;
	}

	if (!altKey && !ctrlKey) {
		return;
	}

	target.style.backgroundColor = altKey ? brushColor : "unset";
}
