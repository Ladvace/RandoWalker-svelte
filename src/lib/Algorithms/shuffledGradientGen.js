const increaseBrightness = (color, percent) => {
	var num = parseInt(color, 16),
		amt = Math.round(2.55 * percent),
		R = (num >> 16) + amt,
		B = ((num >> 8) & 0x00ff) + amt,
		G = (num & 0x0000ff) + amt;

	return (
		0x1000000 +
		(R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
		(B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
		(G < 255 ? (G < 1 ? 0 : G) : 255)
	)
		.toString(16)
		.slice(1);
};

function generateScaleFunction(prevMin, prevMax, newMin, newMax) {
	var offset = newMin - prevMin,
		scale = (newMax - newMin) / (prevMax - prevMin);
	return function (x) {
		return offset + scale * x;
	};
}

const shuffledGradientGen = (grid, numRows, numCols) => {
	let copyGrid = grid;
	let counter = numRows * numCols;
	const cellNum = numRows * numCols;
	for (let i = 0; i < numRows; i++) {
		for (let j = 0; j < numCols; j++) {
			// const scaledPercentage = scaleValue(1, [2, cellNum - 1], [0, 100]);
			let scaledPercentage = generateScaleFunction(0, cellNum, 0, 100);

			copyGrid[i][j].color = increaseBrightness('#ffffff', scaledPercentage(counter));
			copyGrid[i][j].value = counter;
			counter--;
		}
	}

	const shuffle = (array, numRows, numCols) => {
		let newArr = array;

		for (let i = numRows - 1; i >= 0; i--) {
			for (let j = numCols - 1; j >= 0; j--) {
				let randomX = Math.floor(Math.random() * (i + 1));
				let randomY = Math.floor(Math.random() * (j + 1));
				let itemAtIndex = array[randomX][randomY];

				newArr[randomX][randomY] = array[i][j];
				newArr[i][j] = itemAtIndex;
			}
		}
		return newArr;
	};

	const shuffledMatrix = shuffle(copyGrid, numRows, numCols);

	return shuffledMatrix;
};

export default shuffledGradientGen;
