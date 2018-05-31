function resolveAStar() {

	if (openSet.length == 0) {
		result.unsolved++;
		finishSolving();
	} else {
		let winner = 0;

		for(let i = 0; i < openSet.length; i++) {
			if(openSet[i].f < openSet[winner].f) {
				winner = i;
			}
		}

		element[0] = openSet[winner];

		let tempPath = [];
		let temp = element[0];
		tempPath.push(temp);
		while(temp.previous[0]){
			tempPath.push(temp.previous[0]);
			temp = temp.previous[0];

		}
		path = tempPath;

		drawBackground();
		drawSets();
		drawStartEnd();
		drawCurrentPath();



		if(element[0] === end) {
			pathLength = countPathLength(element[0]);
			result.path.push(pathLength);
			result.steps.push(steps);
			result.time.push(time);
			result.aint_num.push(0);
			result.run_num.push(run_count);
			finishSolving();
		} else {
			countSteps();
			countTime();

			removeFromArray(openSet, element[0]);
			closedSet.push(element[0]);

			let neighbors = element[0].neighbors;

			for(let i = 0; i < neighbors.length; i++) {
				let neighbor = neighbors[i];

				if(!closedSet.includes(neighbor) && !neighbor.wall) {
					let tempG = element[0].g + 1;

					let newPath = false;

					if(openSet.includes(neighbor)) {
						if(tempG < neighbor.g) {
							neighbor.g = tempG;
							newPath = true;
						}
					} else {
						neighbor.g = tempG;
						newPath = true;
						openSet.push(neighbor);
					}

					if(newPath) {
						neighbor.h = heuristic(neighbor, end);
						neighbor.f = (neighbor.g + neighbor.h);
						neighbor.previous[0] = element[0];
					}
				}
			}
		}
	}




}
