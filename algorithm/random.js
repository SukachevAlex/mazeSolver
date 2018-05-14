function resolveRandom(particleCount = 1) {

	if(element.includes(end)) {

    pathLength = countPathLength(element[element.indexOf(end)], element.indexOf(end));
		if (pathLength) {
			result.path.push(pathLength);
			result.steps.push(steps);
			result.time.push(time);
			result.aint_num.push(0);
			result.run_num.push(run_count);
		}
		finishSolving();
		noLoop();
	} else {
		countSteps(particleCount);
		countTime();

    for(let i = 0; i < particleCount; i++) {
			if (element[i]) {

				let neighbors = element[i].neighbors;
				let neighborList = [];
				let neighborSubList = [];
				for (let j = 0; j < neighbors.length; j++) {

					if (!neighbors[j].wall && !closedSet.includes(neighbors[j]) && !neighbors[j].visited && neighbors[j] !== start) {
						neighborList.push(neighbors[j]);
					}else if (!neighbors[j].wall && !closedSet.includes(neighbors[j]) && neighbors[j].visitors.length < element[i].visitors.length){
						neighborSubList.push(neighbors[j]);
					} else {
					}
				}
				if (neighborList.length > 0) {
					let next = neighborList[floor(random(0, neighborList.length))];
					if (next) {
						next.previous[i] = element[i];
						element[i] = next;
						element[i].visited = true;
						element[i].visitors.push(i);
						path[i].push(next);
					}
				} else if (element[i].previous[i] && element[i].visitors.length < 2) {

					removeFromArray(element[i].visitors, i);
					removeFromArray(path[i], element[i]);
					if (element[i] !== start && element[i].visitors.length < 1) {
						closedSet.push(element[i]);
					}
					element[i] = element[i].previous[i];
				} else if (neighborSubList.length > 0) {
					neighborList = neighborSubList;
					let next = neighborList[floor(random(0, neighborList.length))];
					if (next) {
						next.previous[i] = element[i];
						element[i] = next;
						element[i].visited = true;
						element[i].visitors.push(i);
						path[i].push(next);
					}
				} else {

					removeFromArray(element[i].visitors, i);
					removeFromArray(path[i], element[i]);
					if (element[i] !== start && element[i].visitors.length < 1) {
						closedSet.push(element[i]);
					}
					element[i] = element[i].previous[i];
				}
				if (element[i]) {
					element[i].visitors = uniqueElements(element[i].visitors);
					closedSet = uniqueElements(closedSet);
				}
			}
    }
	}

	if (element.every(el => el === start)) {
		result.unsolved++;
		finishSolving();
	}
	drawBackground();
	drawSets();
	drawStartEnd();
	drawCurrentPath();
}
