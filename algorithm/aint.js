function resolveAint() {

	countSteps(aint_array.length - aint_finished.length);
	countTime();

	//finish if all spot are visited and find path
	if (mazeResolved && notVisited.length == 0) {
		finishSolving();
	} else {

			for(let i = 0; i < aint_array.length; i++) {

				if (!aint_resolve.includes(aint_array[i])) {
					let aint = aint_array[i];
					let first_turn = [];
					let second_turn = [];
					let third_turn = [];
					let neighbors = aint.current.neighbors;

					aint.current.pheromon += 0.1;
					aint.current.visited = true;
					removeFromArray(notVisited, aint.current);
					aint.grid[aint.current.j][aint.current.i] = 1;


					if (aint.current == end) {
						aint.grid[aint.current.j][aint.current.i] = 10;

						result.path.push(aint_array[i].path.length - 1);
						result.steps.push(steps-1);
						result.time.push(time-1);
						result.aint_num.push(aint_array[i].number);
						result.run_num.push(run_count);
						mazeResolved = true;
						if (path[0].length == 1) {
							path[0] = [...aint_array[i].path];
							aint_resolve.push(aint_array[i]);
							continue;

						}


					}
						for (let j = 0; j < neighbors.length; j++) {

							if (neighbors[j] == end && !aint_array[i].visited.includes(end)) {
								first_turn.push(neighbors[j]);
								break;
							} else if (!neighbors[j].wall  && neighbors[j] !== start && !closedSet.includes(neighbors[j])) {
									if (neighbors[j].pheromon == 0) {
										first_turn.push(neighbors[j]);
									} else if (!aint.visited.includes(neighbors[j])) {
										second_turn.push(neighbors[j]);
									}
								} else {
									 if (neighbors[j].wall) {
										 aint.grid[neighbors[j].j][neighbors[j].i] = 2;
									 } else if (closedSet.includes(neighbors[j])) {
										 aint.grid[neighbors[j].j][neighbors[j].i] = -1;
									 }
								}
						}
						if (first_turn.length > 0) {
							let next;
							if (first_turn.includes(end)) {
								next = end;
							} else {
								next = first_turn[floor(random(0, first_turn.length))];
							}
							if (next) {
								aint.path.push(next);
								openSet.push(aint_array[i].current);
								aint_array[i].visited.push(next);
								aint_array[i].current = next;
								aint_array[i].current.visitors.push(i);
							}
						} else if (second_turn.length > 0) {


							let max = second_turn[0];
							for (let i = 1; i < second_turn.length; i++) {
								if (second_turn[i].pheromon > max.pheromon) {
									max = second_turn[i];
								}
							}
							let next = max;

							if (next) {
								aint.path.push(next);
								openSet.push(aint_array[i].current);
								aint_array[i].visited.push(next);
								aint_array[i].current = next;
								aint_array[i].current.visitors.push(i);
							}
						} else if (aint_array[i].path.length > 0){
							if (aint_array[i].current == start) {
								aint_array[i].current = start;
								aint_finished.push(i);
							} else {
								removeFromArray(aint_array[i].current.visitors, i);
								aint_array[i].current.pheromon -= 0.1;
								if (aint_array[i].current !== start && aint_array[i].current.visitors < 1 && aint_array[i].current !== end) {
									removeFromArray(openSet, aint_array[i].current);
									closedSet.push(aint_array[i].current);
									aint_array[i].current.pheromon = -1;
								}


								aint.path.pop();
								aint_array[i].current = aint.path[aint.path.length - 1];
							}

						}
						closedSet = uniqueElements(closedSet);
						openSet = uniqueElements(openSet);
						aint_finished = uniqueElements(aint_finished);
				}
			}

	}



	for (let i = 0; i < aint_resolve.length; i++) {
		if (aint_resolve[i].path.length > 1) {
			let temp = aint_resolve[i].path.pop();
			temp.pheromon += 0.5;
			//drawResolvedPath(temp);
			aint_resolve[i].current = temp;
			removeFromArray(aint_resolve[i].visited, temp);
		} else {
			removeFromArray(aint_resolve, aint_resolve[i]);
		}
	}

	drawBackground();
	drawSets();
	drawCurrentPath();
	drawAints();
	drawStartEnd();
	if (addSpots) {
		findSpots();
		drawSpots();
	}
}
