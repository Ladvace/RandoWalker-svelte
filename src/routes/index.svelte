<script>
	import { onMount } from 'svelte';

	// var G : float;	//distance from the starting node to the best node
	// var H : float;	//hurestic distance from the best node to the destination
	// var F : float;	//total cost
	let winWidth;
	let winHeight;

	let GRID_SIZE = 40;
	// let GRID_SIZE = 20;
	let TICKER_TIME = 500;
	let grid = [...Array(GRID_SIZE)].map(() =>
		[...Array(GRID_SIZE)].map(() => ({ state: 'empty', f: 0, g: 0, h: 0 }))
	);
	// let walkerPosition = [[GRID_SIZE / 2, GRID_SIZE / 2]];
	let walls = [];
	let isMouseDown = false;
	let interval;
	let paused = false;
	let visitedCellCounter = 0;
	let wallsCounter = 0;
	let musicEnabled = false;

	let dragging = false;

	let openSet = [];
	let closedSet = [];
	// let start;
	// let end;

	let start = [0, 0];
	grid[0][0].state = 'start';

	let end = [GRID_SIZE - 1, GRID_SIZE - 1];
	grid[GRID_SIZE - 1][GRID_SIZE - 1].state = 'end';

	const removeFromArr = (arr, element) => {
		for (let i = arr.length - 1; i >= 0; i--) {
			if ((arr[i] = element)) {
				// arr.slice()
				arr.splice(i, 1);
			}
		}
	};

	// each cell should have h g f
	$: {
		console.log('AA', winWidth, GRID_SIZE);
		if (!paused) {
			for (let i = 0; i < grid.length; i++) {
				for (let k = 0; k < grid.length; k++) {
					if (
						grid[i][k].state === 'visited' ||
						grid[i][k].state === 'revisited' ||
						grid[i][k].state === 'start' ||
						grid[i][k].state === 'end'
					) {
						grid[i][k].state = 'empty';
					}
				}
			}

			const startX = start[0];
			const startY = start[1];

			grid[startX][startY].state = 'start';
			openSet.push(start);

			const endX = end[0];
			const endY = end[1];

			grid[endX][endY].state = 'end';

			if (openSet.length > 0) {
				// do stuff
				let lowestIndex = 0;
				for (let l = 0; l < openSet.length; l++) {
					if (openSet[l].f < openSet[lowestIndex].f) {
						lowestIndex = l;
					}
				}

				let current = openSet[lowestIndex];

				if (current === end) console.log('finished!');

				removeFromArr(openSet, current);
				closedSet.push(current);
			} else {
				// no solution
			}

			// walkerPosition.forEach(([x, y]) => {
			// 	if (grid[x][y].state === 'wall') return;

			// 	if (grid[x][y].state === 'visited' || grid[x][y] === 'revisited') {
			// 		grid[x][y].state = 'revisited';
			// 	} else grid[x][y].state = 'visited';
			// });
		}
	}

	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	function isOutOfBounds(n) {
		return n < 0 || n > GRID_SIZE - 1;
	}

	onMount(() => {
		if (winWidth) {
			console.log('calc', winWidth / 30, Math.floor(winWidth / 30));
			GRID_SIZE = Math.floor(winWidth / 30);
		}
		// const startX = getRandomInt(GRID_SIZE);
		// const startY = getRandomInt(GRID_SIZE);

		// start = [0, 0];
		// grid[0][0] = 'start';

		// end = [GRID_SIZE - 1, GRID_SIZE - 1];
		// grid[GRID_SIZE - 1][GRID_SIZE - 1] = 'end';

		openSet.push(start);

		interval = setInterval(() => {
			// if (!paused) {
			// 	const lastVisited = walkerPosition[walkerPosition.length - 1];
			// 	const choice = getRandomInt(4);
			// 	if (musicEnabled) {
			// 		playAudio();
			// 	}
			// 	if (choice == 0) {
			// 		const newX = lastVisited[0] + 1;
			// 		const Y = lastVisited[1];
			// 		if (isOutOfBounds(newX)) return;
			// 		if (grid[newX][Y] === 'wall') return;
			// 		if (grid[newX][Y] === 'visited') {
			// 			grid[newX][Y] = 'revisited';
			// 		}
			// 		if (grid[newX][Y] === 'empty') visitedCellCounter++;
			// 		walkerPosition = [...walkerPosition, [newX, Y]];
			// 	} else if (choice == 1) {
			// 		const newX = lastVisited[0] - 1;
			// 		const Y = lastVisited[1];
			// 		if (isOutOfBounds(newX)) return;
			// 		if (grid[newX][Y] === 'wall') return;
			// 		if (grid[newX][Y] === 'visited') {
			// 			grid[newX][Y] = 'revisited';
			// 		}
			// 		if (grid[newX][Y] === 'empty') visitedCellCounter++;
			// 		walkerPosition = [...walkerPosition, [newX, Y]];
			// 	} else if (choice == 2) {
			// 		const X = lastVisited[0];
			// 		const newY = lastVisited[1] + 1;
			// 		if (isOutOfBounds(newY)) return;
			// 		if (grid[X][newY] === 'wall') return;
			// 		if (grid[X][newY] === 'visited') {
			// 			grid[X][newY] = 'revisited';
			// 		}
			// 		if (grid[X][newY] === 'empty') visitedCellCounter++;
			// 		walkerPosition = [...walkerPosition, [X, newY]];
			// 	} else {
			// 		const X = lastVisited[0];
			// 		const newY = lastVisited[1] - 1;
			// 		if (isOutOfBounds(newY)) return;
			// 		if (grid[X][newY] === 'wall') return;
			// 		if (grid[X][newY] === 'visited') {
			// 			grid[X][newY] = 'revisited';
			// 		}
			// 		if (grid[X][newY] === 'empty') visitedCellCounter++;
			// 		walkerPosition = [...walkerPosition, [X, newY]];
			// 	}
			// 	// } else {
			// 	// finished = true;
			// 	// clearInterval(interval);
			// 	// return;
			// 	// }
			// 	// walkerPosition = walkerPosition.concat([lastVisited[0] + randomX, lastVisited[1] + randomY]);
			// }
		}, TICKER_TIME);
	});
</script>

<svelte:window bind:innerWidth={winWidth} bind:innerHeight={winHeight} />

<main>
	<h1>PathFinding Visualizer</h1>

	<div class="header">
		<button on:click={() => clearInterval(interval)}>Stop</button>
		<button on:click={() => (paused = !paused)}>{!paused ? 'Pause' : 'Resume'}</button>
		<button
			on:click={() => {
				// walkerPosition = [[GRID_SIZE / 2, GRID_SIZE / 2]];
				grid = [...Array(GRID_SIZE)].map(() => [...Array(GRID_SIZE)].map(() => 'empty'));
			}}>Clear</button
		>

		<!-- <p>Speed:</p>
		<input type="number" bind:value={TICKER_TIME} /> -->
	</div>

	<div class="scoreBoard">
		<div>Walls: {wallsCounter}</div>
		<!-- <div>visited Cells: {walkerPosition.length}</div> -->
		<div>Unique visited Cells: {visitedCellCounter}</div>
	</div>
	<div class="center">
		<div>
			{#each grid as row, i}
				<div class="row" on:contextmenu={(e) => e.preventDefault()}>
					{#each row as cell, k}
						<div
							on:click={() => {
								grid[i][k].state = grid[i][k].state === 'wall' ? 'empty' : 'wall';

								//update wall counter when adding and removing
								if (grid[i][k].state === 'wall') {
									walls = [...walls, grid[i][k]];
									wallsCounter++;
								} else wallsCounter--;
							}}
							on:mousedown={() => {
								isMouseDown = true;

								if (grid[i][k].state === 'start' || grid[i][k].state === 'end')
									dragging = grid[i][k].state;
							}}
							on:mouseup={() => {
								isMouseDown = false;
								dragging = false;
							}}
							on:mouseover={() => {
								if (isMouseDown) {
									console.log('checkDragging', dragging);
									if (dragging) {
										if (grid[i][k].state === 'empty' && dragging) {
											if (dragging === 'start') {
												start = [i, k];
											} else {
												end = [i, k];
											}
										}
										return;
									}

									grid[i][k].state = grid[i][k].state === 'wall' ? 'empty' : 'wall';

									//update wall counter when adding and removing
									if (grid[i][k].state === 'wall') {
										walls = [...walls, grid[i][k]];
										wallsCounter++;
									} else wallsCounter--;
								}
							}}
							class={`square ${cell.state}`}
						/>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</main>

<style lang="scss">
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}

	:global(body) {
		margin: 0;
	}

	main {
		height: auto;
		box-sizing: border-box;
		text-align: center;
		padding: 0;
		/* margin: 0 auto; */
	}

	.header {
		margin: 10px;
	}

	.center {
		height: auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.row {
		display: flex;
		user-drag: none;
		user-select: none;
	}

	.square {
		border: 1px solid rgba(0, 0, 0, 0.2);
		stroke-opacity: 0.2;
		width: 30px;
		height: 30px;
		box-sizing: border-box;
	}

	.empty {
		background-color: white;
	}
	.start {
		background-color: rgb(59, 151, 16);
	}
	.end {
		background-color: rgb(211, 38, 38);
	}

	.visited {
		background-color: rgb(134, 134, 134);
	}

	.revisited {
		background-color: rgb(99, 99, 99);
	}

	.scoreBoard {
		border: 2px dashed black;
		border-top: none;
		border-right: none;
		border-radius: 5px;
		background: white;
		position: absolute;
		top: 0;
		right: 0;
		padding: 50px;
	}

	@keyframes slidein {
		from {
			transform: scale(1.4);
		}
		to {
			transform: scale(1);
		}
	}

	.wall {
		background-color: rgb(48, 48, 48);
		animation: slidein 0.2s ease-in forwards;
	}

	h1 {
		color: #ff3e00;
		font-family: monospace;
		text-transform: uppercase;
		font-size: 4rem;
		font-weight: 100;
		line-height: 1.1;
		margin: 0;
		max-width: 14rem;
	}

	p {
		max-width: 14rem;
		margin: 2rem auto;
		line-height: 1.35;
	}

	@media (min-width: 480px) {
		h1 {
			max-width: none;
		}

		p {
			max-width: none;
		}
	}
</style>
