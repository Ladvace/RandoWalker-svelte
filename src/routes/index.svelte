<script>
	import { onMount } from 'svelte';
	let GRID_SIZE = 30;
	let TICKER_TIME = 200;
	let grid = [...Array(GRID_SIZE)].map(() => [...Array(GRID_SIZE)].map(() => 'empty'));
	let finished = false;
	let walkerPosition = [[GRID_SIZE / 2, GRID_SIZE / 2]];
	let isMouseDown = false;

	// function randomFood() {
	// 	grid[getRandomInt(GRID_SIZE)][getRandomInt(GRID_SIZE)] = 'visited';
	// 	grid[getRandomInt(GRID_SIZE)][getRandomInt(GRID_SIZE)] = 'visited';
	// }

	$: {
		// console.log('refresh', walkerPosition);

		for (let i = 0; i < grid.length; i++) {
			for (let k = 0; k < grid.length; k++) {
				if (grid[i][k] === 'visited') {
					grid[i][k] = 'empty';
				}
			}
		}

		walkerPosition.forEach(([x, y]) => {
			// console.log('ref', x, y);
			if (grid[x][y] === 'wall') return;

			if (grid[x][y] === 'visited' || grid[x][y] === 'revisited') {
				grid[x][y] = 'revisited';
			} else grid[x][y] = 'visited';
		});
	}

	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	// class walker {
	// 	constructor() {
	// 		this.x = GRID_SIZE / 2;
	// 		this.y = GRID_SIZE / 2;
	// 		this.color = '#fff';
	// 	}
	// 	display() {
	// 		this.color = '#0000';
	// 	}

	// 	step() {
	// 		const randomX = getRandomInt(4);
	// 		const randomY = getRandomInt(4);

	// 		const lastVisited = walkerPosition[walkerPosition.length - 1];

	// 		if (choice == 0) {
	// 			// this.x++;
	// 			walkerPosition = walkerPosition.concat(lastVisited[0] + 1, lastVisited[1]);
	// 		} else if (choice == 1) {
	// 			// this.x--;
	// 			walkerPosition = walkerPosition.concat(lastVisited[0] - 1, lastVisited[1]);
	// 		} else if (choice == 2) {
	// 			// this.y++;
	// 			walkerPosition = walkerPosition.concat(lastVisited[0], lastVisited[1] + 1);
	// 		} else {
	// 			// this.y--;
	// 			walkerPosition = walkerPosition.concat(lastVisited[0], lastVisited[1] - 1);
	// 		}
	// 	}
	// }

	const step = (time) => {
		setTimeout(() => {
			const randomX = getRandomInt(4) - 1;
			const randomY = getRandomInt(4) - 1;

			const lastVisited = walkerPosition[walkerPosition.length - 1];

			walkerPosition = walkerPosition.concat([lastVisited[0] + randomX, lastVisited[1] + randomY]);

			console.log(
				't',
				randomX,
				randomY,
				lastVisited,
				lastVisited[0] + randomX,
				lastVisited[1] + randomY,
				walkerPosition
			);
			// if (choice == 0) {
			// 	// this.x++;
			// 	walkerPosition = walkerPosition.concat(lastVisited[0] + 1, lastVisited[1]);
			// } else if (choice == 1) {
			// 	// this.x--;
			// 	walkerPosition = walkerPosition.concat(lastVisited[0] - 1, lastVisited[1]);
			// } else if (choice == 2) {
			// 	// this.y++;
			// 	walkerPosition = walkerPosition.concat(lastVisited[0], lastVisited[1] + 1);
			// } else {
			// 	// this.y--;
			// 	walkerPosition = walkerPosition.concat(lastVisited[0], lastVisited[1] - 1);
			// }
			step(TICKER_TIME - Math.min(walkerPosition.length, 15) * 10);
		}, time);
	};

	function isOutOfBounds(n) {
		return n < 0 || n > GRID_SIZE - 1;
	}

	onMount(() => {
		// step(TICKER_TIME);
		let interval;
		interval = setInterval(() => {
			// randomFood();
			// walkerPosition[0][1] -= 1;

			// const randomX = getRandomInt(4) - 1;
			// const randomY = getRandomInt(4) - 1;

			const lastVisited = walkerPosition[walkerPosition.length - 1];

			// const newPosY = lastVisited[1] + randomY;
			// const newPosX = lastVisited[0] + randomX;

			// console.log('finished', newPosX, newPosY, isOutOfBounds(newPosY), isOutOfBounds(newPosX));
			const choice = getRandomInt(4);
			// if (!isOutOfBounds(newPosY) || !isOutOfBounds(newPosX)) {
			// console.log('rend', newPosX, newPosY, walkerPosition);
			// walkerPosition = [...walkerPosition, [newPosX, newPosY]];

			if (choice == 0) {
				const newX = lastVisited[0] + 1;
				const Y = lastVisited[1];

				if (isOutOfBounds(newX)) return;
				if (grid[newX][Y] === 'wall') return;
				if (grid[newX][Y] === 'visited') {
					console.log('revisited1', newX, Y);
					grid[newX][Y] = 'revisited';
				}

				walkerPosition = [...walkerPosition, [newX, Y]];
			} else if (choice == 1) {
				const newX = lastVisited[0] - 1;
				const Y = lastVisited[1];

				if (isOutOfBounds(newX)) return;
				if (grid[newX][Y] === 'wall') return;
				if (grid[newX][Y] === 'visited') {
					console.log('revisited2', newX, Y);
					grid[newX][Y] = 'revisited';
				}

				walkerPosition = [...walkerPosition, [newX, Y]];
			} else if (choice == 2) {
				const X = lastVisited[0];
				const newY = lastVisited[1] + 1;

				if (isOutOfBounds(newY)) return;
				if (grid[X][newY] === 'wall') return;
				if (grid[X][newY] === 'visited') {
					console.log('revisited4', X, newY);
					grid[X][newY] = 'revisited';
				}

				walkerPosition = [...walkerPosition, [X, newY]];
			} else {
				const X = lastVisited[0];
				const newY = lastVisited[1] - 1;

				if (isOutOfBounds(newY)) return;
				if (grid[X][newY] === 'wall') return;
				if (grid[X][newY] === 'visited') {
					console.log('revisited5', X, newY);
					grid[X][newY] = 'revisited';
				}

				walkerPosition = [...walkerPosition, [X, newY]];
			}
			// } else {
			// finished = true;
			// clearInterval(interval);
			// return;
			// }

			// walkerPosition = walkerPosition.concat([lastVisited[0] + randomX, lastVisited[1] + randomY]);
		}, 1000);
	});
</script>

<main>
	{#if finished}
		<h1>LOST</h1>
	{/if}
	<div class="center">
		<div>
			<!-- on:click={() => (grid[i][k] = grid[i][k] === 'wall' ? 'empty' : 'wall')} -->
			<!-- on:mousedown={() => (grid[i][k] = grid[i][k] === 'wall' ? 'empty' : 'wall')} -->
			{#each grid as row, i}
				<div class="row" on:contextmenu={(e) => e.preventDefault()}>
					{#each row as cell, k}
						<div
							on:click={() => (grid[i][k] = grid[i][k] === 'wall' ? 'empty' : 'wall')}
							on:mousedown={(e) => {
								console.log(e);
								isMouseDown = true;
							}}
							on:mouseup={() => (isMouseDown = false)}
							on:mouseover={() => {
								if (isMouseDown) {
									grid[i][k] = grid[i][k] === 'wall' ? 'empty' : 'wall';
								}
							}}
							class={`square ${cell}`}
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
		height: 100vh;
		box-sizing: border-box;
		text-align: center;
		padding: 0;
		/* margin: 0 auto; */
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
		border: 1px solid rgba(201, 201, 201, 0.836);
		width: 30px;
		height: 30px;
		box-sizing: border-box;
	}

	.empty {
		background-color: white;
	}

	.visited {
		background-color: rgb(134, 134, 134);
	}

	.revisited {
		background-color: orange;
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
		background-color: black;
		animation: slidein 0.2s ease-in forwards;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4rem;
		font-weight: 100;
		line-height: 1.1;
		margin: 4rem auto;
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
