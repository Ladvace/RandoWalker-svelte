<script>
	import { onMount } from 'svelte';
	import sound from '../../static/sound.wav';
	let GRID_SIZE = 40;
	let TICKER_TIME = 500;
	let grid = [...Array(GRID_SIZE)].map(() => [...Array(GRID_SIZE)].map(() => 'empty'));
	let walkerPosition = [[GRID_SIZE / 2, GRID_SIZE / 2]];
	let walls = [];
	let isMouseDown = false;
	let interval;
	let paused = false;
	let visitedCellCounter = 0;
	let wallsCounter = 0;
	let musicEnabled = false;

	const playAudio = () => {
		let audio = document.getElementById('audio');

		audio.play();
	};

	$: {
		// console.log('TICKER_TIME', TICKER_TIME);
		if (!paused) {
			for (let i = 0; i < grid.length; i++) {
				for (let k = 0; k < grid.length; k++) {
					if (grid[i][k] === 'visited' || grid[i][k] === 'revisited') {
						grid[i][k] = 'empty';
					}
				}
			}

			walkerPosition.forEach(([x, y]) => {
				if (grid[x][y] === 'wall') return;

				if (grid[x][y] === 'visited' || grid[x][y] === 'revisited') {
					grid[x][y] = 'revisited';
				} else grid[x][y] = 'visited';
			});
		}
	}

	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	function isOutOfBounds(n) {
		return n < 0 || n > GRID_SIZE - 1;
	}

	onMount(() => {
		interval = setInterval(() => {
			if (!paused) {
				const lastVisited = walkerPosition[walkerPosition.length - 1];

				const choice = getRandomInt(4);
				if (musicEnabled) {
					playAudio();
				}
				if (choice == 0) {
					const newX = lastVisited[0] + 1;
					const Y = lastVisited[1];

					if (isOutOfBounds(newX)) return;
					if (grid[newX][Y] === 'wall') return;
					if (grid[newX][Y] === 'visited') {
						grid[newX][Y] = 'revisited';
					}

					if (grid[newX][Y] === 'empty') visitedCellCounter++;
					walkerPosition = [...walkerPosition, [newX, Y]];
				} else if (choice == 1) {
					const newX = lastVisited[0] - 1;
					const Y = lastVisited[1];

					if (isOutOfBounds(newX)) return;
					if (grid[newX][Y] === 'wall') return;
					if (grid[newX][Y] === 'visited') {
						grid[newX][Y] = 'revisited';
					}

					if (grid[newX][Y] === 'empty') visitedCellCounter++;
					walkerPosition = [...walkerPosition, [newX, Y]];
				} else if (choice == 2) {
					const X = lastVisited[0];
					const newY = lastVisited[1] + 1;

					if (isOutOfBounds(newY)) return;
					if (grid[X][newY] === 'wall') return;
					if (grid[X][newY] === 'visited') {
						grid[X][newY] = 'revisited';
					}

					if (grid[X][newY] === 'empty') visitedCellCounter++;
					walkerPosition = [...walkerPosition, [X, newY]];
				} else {
					const X = lastVisited[0];
					const newY = lastVisited[1] - 1;

					if (isOutOfBounds(newY)) return;
					if (grid[X][newY] === 'wall') return;
					if (grid[X][newY] === 'visited') {
						grid[X][newY] = 'revisited';
					}
					if (grid[X][newY] === 'empty') visitedCellCounter++;
					walkerPosition = [...walkerPosition, [X, newY]];
				}
				// } else {
				// finished = true;
				// clearInterval(interval);
				// return;
				// }

				// walkerPosition = walkerPosition.concat([lastVisited[0] + randomX, lastVisited[1] + randomY]);
			}
		}, TICKER_TIME);
	});
</script>

<main>
	<h1>Random Walker</h1>

	<div class="header">
		<button on:click={() => clearInterval(interval)}>Stop</button>
		<button on:click={() => (paused = !paused)}>{!paused ? 'Pause' : 'Resume'}</button>
		<button
			on:click={() => {
				walkerPosition = [[GRID_SIZE / 2, GRID_SIZE / 2]];
				grid = [...Array(GRID_SIZE)].map(() => [...Array(GRID_SIZE)].map(() => 'empty'));
			}}>Clear</button
		>
		<label>
			<input type="checkbox" bind:checked={musicEnabled} />
			Sounds Effects
		</label>
		<!-- <p>Speed:</p>
		<input type="number" bind:value={TICKER_TIME} /> -->
	</div>

	<div class="scoreBoard">
		<div>Walls: {wallsCounter}</div>
		<div>visited Cells: {walkerPosition.length}</div>
		<div>Unique visited Cells: {visitedCellCounter}</div>
	</div>
	<div class="center">
		<div>
			<!-- on:click={() => (grid[i][k] = grid[i][k] === 'wall' ? 'empty' : 'wall')} -->
			<!-- on:mousedown={() => (grid[i][k] = grid[i][k] === 'wall' ? 'empty' : 'wall')} -->
			{#each grid as row, i}
				<div class="row" on:contextmenu={(e) => e.preventDefault()}>
					<audio id="audio" src={sound} />
					{#each row as cell, k}
						<div
							on:click={() => {
								grid[i][k] = grid[i][k] === 'wall' ? 'empty' : 'wall';

								//update wall counter when adding and removing
								if (grid[i][k] === 'wall') {
									walls = [...walls, grid[i][k]];
									wallsCounter++;
								} else wallsCounter--;
							}}
							on:mousedown={(e) => {
								isMouseDown = true;
							}}
							on:mouseup={() => (isMouseDown = false)}
							on:mouseover={() => {
								if (isMouseDown) {
									grid[i][k] = grid[i][k] === 'wall' ? 'empty' : 'wall';

									//update wall counter when adding and removing
									if (grid[i][k] === 'wall') {
										walls = [...walls, grid[i][k]];
										wallsCounter++;
									} else wallsCounter--;
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
		width: 20px;
		height: 20px;
		box-sizing: border-box;
	}

	.empty {
		background-color: white;
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
