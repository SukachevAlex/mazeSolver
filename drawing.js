function drawBackground() {
	background(0);
	for(let i = 0; i < cols; i++) {
		for(let j = 0; j < rows; j++) {
			grid[i][j].show(color(150,150,150,1));
		}
	}
}

function drawSets() {

	for(let i = 0; i < openSet.length; i++) {
		let intensity = openSet[i].pheromon / (aint_count * 0.1);
		openSet[i].show(color(0, 255, 0, intensity));
	}

	for(let i = 0; i < closedSet.length; i++) {
		closedSet[i].show(color(255, 0, 0, 0.25));
	}
}

function drawSpots() {
	noStroke();
	fill(color(0,0,128, 1));
	for (let i = 0; i < spots.length; i++) {
			rect(spots[i].i * w + (w/2.5 - 1)  , spots[i].j * h + (h/2.5 - 1), w/5 - 1, h/5 - 1);
	}
}

function drawCurrentPath() {

	path = uniqueElements(path);
	for (let i = 0; i < path.length; i++) {
		stroke(colorPath[i]);
		strokeWeight(w/6);
		beginShape();
		noFill();
		for(let j = 0; j < path[i].length; j++) {
			vertex(path[i][j].i * w + w/1.5 -  i * 100 / cols, path[i][j].j * h + h/1.5 - i * 100 / rows);
		}
		endShape();
	}
}

function drawStartEnd() {
	start.show(color(133, 255, 199, 1));
	end.show(color(255, 140, 143, 1));
}

function drawAints() {
	for (let i = 0; i < aint_array.length; i++) {
		noStroke();
		fill(color(0,0,0, 1));
		if (i < 5) {
			rect(aint_array[i].current.i * w + (w/6 - 1)*i + i , aint_array[i].current.j * h + (h/6 - 1)*0, w/6 - 1, h/6 - 1);
		} else if (i < 10) {
			rect(aint_array[i].current.i * w + (w/6 - 1)*(i-5) + (i-5), aint_array[i].current.j * h + (h/6 - 1)*1, (w/6 - 1), h/6 - 1);
		} else if (i < 15) {
			rect(aint_array[i].current.i * w + (w/6 - 1)*(i-10) + (i-10), aint_array[i].current.j * h + (h/6 - 1)*2, (w/6 - 1), h/6 - 1);
		} else if (i < 20) {
			rect(aint_array[i].current.i * w + (w/6 - 1)*(i-15) + (i-15), aint_array[i].current.j * h + (h/6 - 1)*3, (w/6 - 1), h/6 - 1);
		} else if (i < 25) {
			rect(aint_array[i].current.i * w + (w/6 - 1)*(i-20) + (i-20), aint_array[i].current.j * h + (h/6 - 1)*4, (w/6 - 1), h/6 - 1);
		} else if (i < 30) {
			rect(aint_array[i].current.i * w + (w/6 - 1)*(i-25) + (i-25), aint_array[i].current.j * h + (h/6 - 1)*5, (w/6 - 1), h/6 - 1);
		}
	}
}

function drawResolvedPath(elem) {
	noStroke();
	fill(color(255,0,0, 0.85));
	rect(elem.i * w + (w/6 - 1), elem.j * h + (h/6 - 1), w/6 - 1, h/6 - 1);

}
