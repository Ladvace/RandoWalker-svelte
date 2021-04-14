<script>
	import { onMount } from 'svelte';
	import { generateRandomMaze } from '$lib/Algorithms/mazeGeneration';

	// var G : float;	//distance from the starting node to the best node
	// var H : float;	//hurestic distance from the best node to the destination
	// var F : float;	//total cost
	let winWidth;
	let winHeight;
	let gridLoaded = false;

	let GRID_ROW_SIZE;
	let GRID_COLUMN_SIZE;

	// let grid = [...Array(GRID_ROW_SIZE)].map(() =>
	// 	[...Array(GRID_COLUMN_SIZE)].map(() => ({ state: 'empty', f: 0, g: 0, h: 0 }))
	// );
	let grid = [];
	// let walkerPosition = [[GRID_SIZE / 2, GRID_SIZE / 2]];
	let walls = [];
	let isMouseDown = false;
	let interval;
	let paused = false;
	let visitedCellCounter = 0;
	let wallsCounter = 0;

	let dragging = false;

	let openSet = [];
	let closedSet = [];

	let start = [0, 0];
	let end = [];

	// let start = [0, 0];
	// let end = [GRID_ROW_SIZE - 1, GRID_COLUMN_SIZE - 1];

	// each cell should have h g f
	$: {
		// console.log('AA', winWidth, GRID_ROW_SIZE, GRID_COLUMN_SIZE);
		if (!paused && grid.length > 0 && GRID_ROW_SIZE && GRID_COLUMN_SIZE && gridLoaded) {
			console.log('grud');
			for (let i = 0; i < GRID_ROW_SIZE; i++) {
				for (let k = 0; k < GRID_COLUMN_SIZE; k++) {
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
			// openSet.push(start);
			// end = [GRID_ROW_SIZE - 1, GRID_COLUMN_SIZE - 1];
			const endX = end[0];
			const endY = end[1];

			// ---- here

			console.log('GRID', end, endX, endY, grid[26], grid);

			if (grid[endX]) grid[endX][endY].state = 'end';

			// if (openSet.length > 0) {
			// 	// do stuff
			// 	let lowestIndex = 0;
			// 	for (let l = 0; l < openSet.length; l++) {
			// 		if (openSet[l].f < openSet[lowestIndex].f) {
			// 			lowestIndex = l;
			// 		}
			// 	}

			// 	let current = openSet[lowestIndex];

			// 	if (current === end) console.log('finished!');

			// 	removeFromArr(openSet, current);
			// 	closedSet.push(current);
			// } else {
			// 	// no solution
			// }

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

	// function isOutOfBounds(n) {
	// 	return n < 0 || n > GRID_SIZE - 1;
	// }

	onMount(() => {
		if (winWidth && winHeight) {
			console.log('calc', Math.floor(winHeight / 30), Math.floor(winWidth / 30));
			GRID_ROW_SIZE = Math.floor(winHeight / 30);
			GRID_COLUMN_SIZE = Math.floor(winWidth / 30);

			grid = [...Array(GRID_ROW_SIZE)].map(() =>
				[...Array(GRID_COLUMN_SIZE)].map(() => ({ state: 'empty', f: 0, g: 0, h: 0 }))
			);

			grid[0][0].state = 'start';

			grid[GRID_ROW_SIZE - 1][GRID_COLUMN_SIZE - 1].state = 'end';

			end = [GRID_ROW_SIZE - 1, GRID_COLUMN_SIZE - 1];
			gridLoaded = true;
		}
	});
</script>

<svelte:body
	on:mouseleave={() => {
		console.log('out');
		dragging = false;
	}} />

<main>
	<div class="container" style="--header-size: 150px">
		<div class="header">
			<h1>PathFinding Visualizer</h1>
			<button
				on:click={() => (grid = generateRandomMaze(GRID_ROW_SIZE, GRID_COLUMN_SIZE, start, end))}
				>mazeGen</button
			>
			<button on:click={() => clearInterval(interval)}>Stop</button>
			<button on:click={() => (paused = !paused)}>{!paused ? 'Pause' : 'Resume'}</button>
			<button
				on:click={() => {
					// walkerPosition = [[GRID_SIZE / 2, GRID_SIZE / 2]];
					grid = [...Array(GRID_ROW_SIZE)].map(() =>
						[...Array(GRID_COLUMN_SIZE)].map(() => 'empty')
					);
				}}>Clear</button
			>

			<div class="scoreBoard">
				<div>Walls: {wallsCounter}</div>
				<!-- <div>visited Cells: {walkerPosition.length}</div> -->
				<div>Unique visited Cells: {visitedCellCounter}</div>
			</div>
		</div>
		<div class="innerContainer">
			<div class="center" bind:clientWidth={winWidth} bind:clientHeight={winHeight}>
				<div class="grid">
					<!-- <div class="grid" bind:clientWidth={winWidth} bind:clientHeight={winHeight}> -->
					{#if gridLoaded}
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
					{:else}
						Loding
					{/if}
				</div>
			</div>
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

	.container {
		height: 100vh;
		overflow: hidden;
	}

	.innerContainer {
		width: 100%;
		height: calc(100vh - var(--header-size));
	}

	.header {
		height: var(--header-size);
		margin: 0;
		width: 100%;
		background: chocolate;
	}

	.grid {
		width: auto;
		/* height: 80vh; */
		/* height: calc(100vh - 180px); */
		height: auto;
	}

	.center {
		height: calc(100vh - var(--header-size));
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0;
		box-sizing: border-box;
	}

	.row {
		display: flex;
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
		/* border: 2px dashed black; */
		/* border-top: none; */
		/* border-right: none; */
		border-radius: 5px;
		/* background: white; */
		/* position: absolute; */
		top: 0;
		right: 0;
		/* padding: 50px; */
		/* z-index: 200; */
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
		/* background-color: rgb(48, 48, 48); */
		background-color: #34495e;
		animation: slidein 0.2s ease-in forwards;
	}

	h1 {
		/* color: #ff3e00; */
		color: white;
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
