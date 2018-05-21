let grid = [];
let openSet = [];
let closedSet = [];
let path = [[],[],[]];
let spots = [];
let steps_field;
let time_field;
let start;
let end;
let element = [];
let aint_array = [];
let aint_finished = [];
let aint_resolve = [];
let w, h;
let calculating = false;
let generateNew = false;
let mazeResolved = false;


let result = {
	steps: [],
	time: [],
	path: [],
	aint_num: [],
	steps_average: 0,
	time_average: 0,
	path_average: 0,
	unsolved: 0,
	spot_count: 0,
};

function findNotVisited() {
	notVisited = [];
	for(let i = 0; i < cols; i++) {
		for(let j = 0; j < rows; j++) {
			if (!grid[i][j].wall) {
				notVisited.push(grid[i][j]);
			}
		}
	}

}

function resetSketch() {
	init();
	if (!generateNew && grid.length > 0) {
		resetBuild();
	} else {
		buildGrid();
	}
	findNotVisited();
	generateBoard();
	loop();
	calculating = true;
	mazeResolved = false;
	start.previous = false;
	element = new Array(3).fill(start);
	if (algorithm == 'random' || algorithm == '2particle' || algorithm == '3particle') {
		element[0].visitors.push(0);
		element[1].visitors.push(1);
		element[2].visitors.push(2);
	}
	steps = 0;
	time = 0;
	path = [[start],[start],[start]];
	aint_finished = [];
	aint_resolve = [];
	spots = [];
	pathLength = 0;
	colorPath.push(color(97, 57, 255, 0.7), color(255, 57, 215, 0.7), color(255,225,57, 0.7), );
	createCanv();

	aint_array = [];
	for (let i = 0; i < aint_count; i++) {
		aint_array.push(new Aint(i, start));
		aint_array[i].visited.push(start);
		aint_array[i].path.push(start);
	}
}

function init() {

	do_diagonal = document.getElementById('do_diagonal').checked;
	random_nodes = document.getElementById('random_nodes').checked;
	addSpots = document.getElementById('addSpots').checked;

	generateNew = document.getElementById('generateNew').checked;
	grid_spawn_rate = Number(document.getElementById('grid_spawn_rate').value);
	steps_field = document.getElementById('steps');
	time_field = document.getElementById('time');
	cols = Number(document.getElementById('cols').value);
	rows = Number(document.getElementById('rows').value);
	algorithm = document.getElementById('algorithm').value;
	run_count = Number(document.getElementById('runCount').value);
	aint_count = Number(document.getElementById('aint_count').value);
	document.getElementById("solution").style.display = "block";
	document.getElementById("results").style.display = "none";
	document.getElementById('solution__text').style.display = "none";

	document.getElementById('start').addEventListener('click', function () {
		resetSketch();
		result.steps = [];
		result.path = [];
		result.time = [];
		result.aint_num = [];
		result.run_num = [];
		result.steps_average = 0;
		result.path_average = 0;
		result.time_average = 0;
		result.unsolved = 0;
		result.spot_count = 0;
	});
}


function buildGrid() {
	// 2d array + create spots
	for(let i = 0; i < cols; i++) {
		grid[i] = [];
		for(let j = 0; j < rows; j++) {
			grid[i][j] = new Spot(i, j);
		}
	}
	// set neighbors
	for(let i = 0; i < cols; i++) {
		for(let j = 0; j < rows; j++) {
			grid[i][j].addNeighbors(grid);
		}
	}

	if (random_nodes) {
		start = grid[ Math.round(random(0, (cols - 1))) ][ Math.round(random(0, (rows - 1))) ];
		end = grid[ Math.round(random(0, (cols - 1))) ][ Math.round(random(0, (rows - 1))) ];
	} else {
		start = grid[0][0];
		start.visited = true;
		end = grid[(cols - 1)][(rows - 1)];
	}
	if (grid_spawn_rate) {
		removeLoops();
	}
}

function resetBuild() {

	for(let i = 0; i < cols; i++) {
		for(let j = 0; j < rows; j++) {
				grid[i][j].previous = [];
				grid[i][j].visited = false;
				grid[i][j].visitors = [];
				grid[i][j].pheromon = 0;
		}
	}
	if (random_nodes) {
		start = grid[ Math.round(random(0, (cols - 1))) ][ Math.round(random(0, (rows - 1))) ];
		end = grid[ Math.round(random(0, (cols - 1))) ][ Math.round(random(0, (rows - 1))) ];
	} else {
		start = grid[0][0];
		start.visited = true;
		end = grid[(cols - 1)][(rows - 1)];
	}
}


function removeLoops() {
	for(let i = 0; i < cols; i++) {
		for(let j = 0; j < rows; j++) {
			let wallArray = [];
			for (let k = 0; k < grid[i][j].neighbors.length; k++) {
				if (grid[i][j].neighbors[k].wall) {
					wallArray.push(grid[i][j].neighbors[k]);
				}
			}
			if (wallArray.length) {
				if (wallArray.length > 1) {
					let randNum = Math.round(random(0, (wallArray.length - 1)));
					wallArray[randNum].wall = false;
				}
			}
		}
	}

}


function finishSolving() {
	calculating = false;
	run_count--;
	document.getElementById('runCount').value = run_count;
	noLoop();
	countResult();
	document.getElementById('algorithm_table').innerHTML = algorithm;
	document.getElementById('steps_table').innerHTML = result.steps_average;
	document.getElementById('time_table').innerHTML = result.time_average;
	document.getElementById('path_table').innerHTML = result.path_average
	document.getElementById('unsolved_table').innerHTML = result.unsolved;


	if (run_count > 0) {
		setTimeout(resetSketch, 1250);

	} else if (run_count === 0) {

		noLoop();
		document.getElementById("solution").style.display = "none";
		document.getElementById("results").style.display = "block";
		document.getElementById('runCount').value = 1;
		document.getElementById('spot_count_table').innerHTML = result.spot_count

		document.getElementById('close_table').addEventListener('click', function () {
			document.getElementById('table-popup').style.display = "none";
		});
		document.getElementById('open_table').addEventListener('click', function () {
			document.getElementById('table-popup').style.display = "block";
			resetTable('results_table');
			result.run_num.reverse();
			for (let i = 0; i < result.path.length; i++) {
				addRow('results_table', result.run_num[i], result.aint_num[i], result.steps[i], result.time[i], result.path[i]);
			}
			document.getElementById('unsolved_field').innerHTML = result.unsolved;
			document.getElementById('spot_count_field').innerHTML = result.spot_count;


			document.getElementById('algorithm_field').innerHTML = algorithm;
		});

	}
}

function findSpots() {
	spots = [...path[0]];

	for (let i = 0; i < path[0].length - 2; i++) {
		if (path[0][i].i == path[0][i+1].i && path[0][i].i == path[0][i+2].i) {
			removeFromArray(spots, path[0][i+1]);
		}
		if (path[0][i].j == path[0][i+1].j && path[0][i].j == path[0][i+2].j) {
			removeFromArray(spots, path[0][i+1]);
		}
	}
	result.spot_count = spots.length;
}

function generateBoard() {

	openSet = [];
	closedSet = [];
	path = [];

	start.wall = false;
	let neighborsStart = start.neighbors;
	for (let i = 0; i < neighborsStart.length; i++) {
		neighborsStart[i].wall = false;
	}
	end.wall = false;
	end.pheromon = 100;

	let neighborsEnd = end.neighbors;
	for (let i = 0; i < neighborsEnd.length; i++) {
		neighborsEnd[i].wall = false;
	}
	openSet.push(start);

	loop();
}

function removeFromArray(arr, elt) {
	for(let i = (arr.length - 1); i >= 0; i--) {
		if(arr[ i ] == elt) {
			arr.splice(i, 1);
		}
	}
}

var uniqueElements = (arrArg) => {
  return arrArg.filter((elem, pos, arr) => {
    return arr.indexOf(elem) == pos;
  });
}

function heuristic(a, b) {
	// euclidean distance
	//let d = dist(a.i, a.j, b.i, b.j);

	// manhattan distance
	let d = abs( a.i - b.i ) + abs( a.j - b.j );

	return d;
}

function createCanv() {
	createCanvas(700, 700);

	w = float(700 / cols);
	h = float(700 / rows);
}

function countSteps(step = 1) {
	steps += step;
	steps_field.innerHTML = steps;
}

function countTime() {
	time++;
	time_field.innerHTML = time;
}

function countPathLength(elem, num = 0) {
	let counter = 0;
	let temp = elem;

	while (temp.previous[num]) {
		counter++;
		temp = temp.previous[num];
	}
	return counter;
}

function countResult() {
	if (result.time.length > 0 && result.path.length > 0 && result.steps.length > 0) {
		result.time_average = (result.time.reduce((acc,el) => acc + el, 0) / result.time.length).toFixed(2);
		result.path_average = (result.path.reduce((acc,el) => acc + el, 0) / result.path.length).toFixed(2);
		result.steps_average = (result.steps.reduce((acc,el) => acc + el, 0) / result.steps.length).toFixed(2);
	}
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
		frames += 1;
		setup();
  } else if (keyCode === DOWN_ARROW) {
		frames -= 1;
		setup();
  }
}

function setup() {
	frameRate(frames);
	colorMode(RGB, 255, 255, 255, 1);
	init();
}

function draw() {
	if (calculating) {
		document.getElementById('frameRateInput').value= Math.floor(frameRate());

		if (algorithm == 'aStar') {
			resolveAStar();
		}else if (algorithm == 'random') {
			resolveRandom(1);
		}else if (algorithm == '2particle') {
			resolveRandom(2);
		}else if (algorithm == '3particle') {
			resolveRandom(3);
		}else if (algorithm == 'resolveAint') {
			resolveAint();
		}
	}else {
		noLoop();
	}
}

function resetTable(tableID) {
	let table = document.getElementById(tableID);
	while(table.rows.length > 1) {
	  table.deleteRow(1);
	}
}

function addRow(tableID,number, aint_number, steps, time, path) {
	let table = document.getElementById(tableID);
	let newRow = table.insertRow(-1);
	let cell_num = newRow.insertCell(0);
	let aint_num = newRow.insertCell(1);
	let cell_steps = newRow.insertCell(2);
	let cell_time = newRow.insertCell(3);
	let cell_path = newRow.insertCell(4);
	cell_num.innerHTML = number;
	aint_num.innerHTML = ++aint_number;
	cell_steps.innerHTML = steps;
	cell_time.innerHTML = time;
	cell_path.innerHTML = path;
}
