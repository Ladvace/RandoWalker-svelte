/* eslint-disable no-undef */
const BubbleSort = (array, numRows, numCols) => {
	let newArr = array;
	console.log('sorting!');
	// for (let i = 0; i < numRows - 1; i++) {
	// 	for (let j = 0; j < numCols - 1; j++) {
	// 		if (i + 1 < numRows - 1 && j + 1 < numCols - 1) {
	// 			if (array[i][j].value > array[i + 1][j + 1].value) {
	// 				console.log('sorting');
	// 				const swap = array[i][j];
	// 				newArr[i][i] = array[i][j];
	// 				newArr[i][j] = swap;
	// 			}
	// 		}
	// 	}
	// }

	let temp;
	for (let i = 0; i < numRows; i++) {
		// this will "switch" actual rows
		for (let j = 0; j < numCols; j++) {
			// this will traverse through elements
			for (let m = 0; m < numCols - 1; m++) {
				// this will traverse just like the
				if (newArr[i][j].value < newArr[i][m].value) {
					// previous loop, but one element
					temp = array[i][j]; // ahead, so you can compare them
					newArr[i][j] = newArr[i][m];
					newArr[i][m] = temp; // swapping elements array[row][element]
					// with array[row][one element ahead]
				}
			}
		}
	}
	console.log('newArr!', newArr);
	return newArr;
};

// const convertArrayToMatrix = (arr, elementsPerSubArray) => {
// 	var matrix = [],
// 		i,
// 		k;

// 	for (i = 0, k = -1; i < arr.length; i++) {
// 		if (i % elementsPerSubArray === 0) {
// 			k++;
// 			matrix[k] = [];
// 		}

// 		matrix[k].push(arr[i]);
// 	}

// 	return matrix;
// };

// const convertMatrixToArray = (matrix) => {
// 	let newArr = [];
// 	for (var i = 0; i < matrix.length; i++) {
// 		newArr = newArr.concat(matrix[i]);
// 	}
// 	return newArr;
// };

export default BubbleSort;
