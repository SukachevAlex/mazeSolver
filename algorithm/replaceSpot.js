function replaceSpot(aint, deleted_spot) {

	if (openSetSpot.length == 0) {
		console.log('finished outer');
    findSpotPath = true;
	} else {
		let winner = 0;

		for(let i = 0; i < openSetSpot.length; i++) {
			if(openSetSpot[i].f < openSetSpot[winner].f) {
				winner = i;
			}
		}
		element[0] = openSetSpot[winner];
    //aint.current = element[0];

		let tempPath = [];
		let temp = element[0];
		tempPath.push(temp);
		while(temp.previous[0]){
			tempPath.push(temp.previous[0]);
			temp = temp.previous[0];

		}
		spotPath = tempPath;

		drawAll();



		if(element[0] === deleted_spot) {
			console.log('finished inner');
      findSpotPath = true;
		} else {
			// countSteps();
			// countTime();

			removeFromArray(openSetSpot, element[0]);
			closedSetSpot.push(element[0]);

			let neighbors = element[0].neighbors;

			for(let i = 0; i < neighbors.length; i++) {
				let neighbor = neighbors[i];

				if(!closedSetSpot.includes(neighbor) && !neighbor.wall) {
					let tempG = element[0].g + 1;

					let newPath = false;

					if(openSetSpot.includes(neighbor)) {
						if(tempG < neighbor.g) {
							neighbor.g = tempG;
							newPath = true;
						}
					} else {
						neighbor.g = tempG;
						newPath = true;
						openSetSpot.push(neighbor);
					}

					if(newPath) {
						neighbor.h = heuristic(neighbor, delete_spot);
						neighbor.f = (neighbor.g + neighbor.h);
						neighbor.previous[0] = element[0];
					}
				}
			}
		}
	}
}
