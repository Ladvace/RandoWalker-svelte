const generateRandomMaze = (numRows, numCols, start, end) => {
	let chance;
	let gridCopy = [...Array(numRows)].map(() =>
		[...Array(numCols)].map(() => ({
			state: 'empty'
		}))
	);

	for (let r = 0; r < numRows; r++) {
		for (let c = 0; c < numCols; c++) {
			if (!(start[0] == r && start[1] == c) && !(end[0] == r && end[0] == c)) {
				chance = Math.random();
				if (chance < 0.3) {
					gridCopy[r][c].state = 'wall';
				}
			}
		}
	}

	return gridCopy;
};

export { generateRandomMaze };
