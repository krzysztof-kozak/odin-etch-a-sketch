document.addEventListener("DOMContentLoaded", () => {
	setDefaultSliderState();
	createGrid(defaultGridSize);
});

const root = document.querySelector(":root");
const computerStyles = window.getComputedStyle(root);

let brushColor = computerStyles.getPropertyValue("--brush-color");

const sketchPad = document.querySelector(".sketch-container-js");
const resetBtn = document.querySelector(".reset-btn-js");

const input = document.querySelector("input");
const output = document.querySelector("output");

const defaultGridSize = input.value;

sketchPad.addEventListener("mouseenter", handleMouseEnter, { capture: true });
input.addEventListener("input", handleInputChange);
resetBtn.addEventListener("click", resetGrid);

function handleKeyDown(e) {
	console.log(e);
}

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
			element.style["background-color"] = "";
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

	// make grid darker on subsequent brush stroke
	if (target.style.backgroundColor) {
		if (!target.initialBgColor) {
			target.initialBgColor = target.style.getPropertyValue("background-color");

			[target.r, target.g, target.b, target.a] =
				target.initialBgColor.match(/(\d+(?:\.\d+)?)/g);

			if (!target.a) {
				target.a = 1;
			}

			target.rDelta = Math.ceil(target.r / 10);
			target.bDelta = Math.ceil(target.b / 10);
			target.gDelta = Math.ceil(target.g / 10);
			target.aDelta = (1 - target.a) / 10;
		}

		if (target.r > 0) {
			const darkerR = target.r - Math.ceil(target.rDelta);
			target.r = darkerR > 0 ? darkerR : 0;
		}

		if (target.g > 0) {
			const darkerG = target.g - Math.ceil(target.gDelta);
			target.g = darkerG > 0 ? darkerG : 0;
		}

		if (target.b > 0) {
			const darkerB = target.b - Math.ceil(target.bDelta);
			target.b = darkerB > 0 ? darkerB : 0;
		}

		if (target.a < 1) {
			const higherAlpha = (parseFloat(target.a) + parseFloat(target.aDelta)).toFixed(2);
			target.a = higherAlpha < 1 ? parseFloat(higherAlpha) : 1;
		}

		const newDarkerShade = `rgba(${target.r}, ${target.g}, ${target.b}, ${target.a})`;

		target.style.backgroundColor = ctrlKey ? "" : newDarkerShade;
		return;
	}

	target.style.backgroundColor = altKey ? brushColor : "";
}
