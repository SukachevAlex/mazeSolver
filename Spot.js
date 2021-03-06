function Spot(i, j) {
	this.i = i;
	this.j = j;
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.neighbors = [];
	this.previous = [];
	this.wall = false;
	this.visited = false;
	this.visitors = [];
	this.pheromon = 0;

	if(random(1) < grid_spawn_rate) {
		this.wall = true;
	}

	this.show = function(color) {
		noStroke();

		fill(color);

		if(this.wall) {
			fill(20, 20, 20);
		}

		rect((this.i * w), (this.j * h), (w - 1), (h - 1));
	};

	this.addNeighbors = function(grid) {
		let i = this.i;
		let j = this.j;

		// right
		if(i < (cols - 1)) {
			this.neighbors.push(grid[i + 1][j]);
		}

		// left
		if(i > 0) {
			this.neighbors.push(grid[i - 1 ][j]);
		}

		// below
		if(j < (rows - 1)) {
			this.neighbors.push(grid[i][j + 1 ]);
		}

		// above
		if(j > 0) {
			this.neighbors.push(grid[i][j - 1]);
		}

		if(do_diagonal) {
			// diag top left
			if((i > 0) && (j > 0)) {
				this.neighbors.push(grid[i - 1][j - 1]);
			}

			// diag top right
			if((i < (cols - 1)) && (j > 0)) {
				this.neighbors.push(grid[i + 1][j - 1]);
			}

			// diag bottom left
			if((i > 0) && (j < (rows - 1))) {
				this.neighbors.push(grid[i - 1][j + 1]);
			}

			// diag bottom right
			if((i < (cols - 1)) && (j < (cols - 1))) {
				this.neighbors.push(grid[i + 1][j + 1]);
			}
		}
	};
}
