const sketchPad = document.querySelector(".sketch-container-js");
const root = document.querySelector(":root");

function createInitialGrid(size) {
	const sizeSquared = size * size;

	for (let i = 0; i < sizeSquared; i++) {
		const divElement = document.createElement("div");
		divElement.classList.add("grid-item");
		sketchPad.appendChild(divElement);
	}
}
createInitialGrid(16);
