/* eslint-disable no-undef */

function getRandomItem(set) {
	let items = Array.from(set);
	return items[Math.floor(Math.random() * items.length)];
}

const Sidewinder = (grid, numRows, numCols) => {
	const run = new Set();

	// let grid = [...Array(numRows)].map(() =>
	// 	[...Array(numCols)].map(() => ({
	// 		state: 'wall'
	// 	}))
	// );

	grid[1][1].state = 'start';

	let chance;
	for (let i = 1; i < numRows - 1; i += 2) {
		for (let j = 0; j < numCols - 2; j++) {
			// const current = grid[i][j];
			if (i !== 1) {
				run.add([i, j]);
				chance = Math.random();
				if (chance < 0.7) {
					if (grid[i][j + 1] && j + 1 < numCols - 1) grid[i][j + 1].state = 'empty';
					else {
						const randomCarvedCell = getRandomItem(run);

						if (grid[randomCarvedCell[0] - 1])
							grid[randomCarvedCell[0] - 1][randomCarvedCell[1]].state = 'empty';
					}
				} else {
					const randomCarvedCell = getRandomItem(run);

					if (grid[randomCarvedCell[0] - 1])
						grid[randomCarvedCell[0] - 1][randomCarvedCell[1]].state = 'empty';
					run.clear();
					if (grid[i][j + 2]) run.add([i, j + 2]);
				}
			} else {
				if (grid[i][j + 1] && j + 1 < numCols - 1) grid[i][j + 1].state = 'empty';
			}
		}
	}
	return grid;
};

export default Sidewinder;
