class Aint {

	constructor(num, cur) {
		this.number = num;
		this.path = [];
		this.current = cur;
		this.visited = [];
		this.finished = false;
		this.grid = [];
		for(let i = 0; i < cols; i++) {
			this.grid[i] = [];
			for(let j = 0; j < rows; j++) {
				this.grid[i][j] = 0;
			}
		}
		this.grid[start.j][start.i] = 5;
		// -1 - closedSet spot, 0 - unvisited, 1 - visited spot, 2 - obstacles, 5 - start, 10 - end
	}

}
