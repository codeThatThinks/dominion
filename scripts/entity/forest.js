/**********
 * Forest Entity
 * Author: Ian Glen <ian@ianglen.me>
 *********/

/**
 * Forest is subclass of Entity
 */
Forest.prototype = Entity;

/**
 * Forest class
 */
function Forest(name, point, grid, visible)
{
	this.draw = function()
	{
		if(this.visible)
		{
			for(var n = 0; n < this.trees.length; n++)
			{
				this.grid.canvas.context.drawImage(this.image, this.trees[n].toOrthographicPoint(this.grid).x - ((this.image.width * this.grid.tileSize / 150) / 2), this.trees[n].toOrthographicPoint(this.grid).y - ((this.image.height * this.grid.tileSize / 150) - this.grid.getTileHeight()), this.image.width * this.grid.tileSize / 150, this.image.height * this.grid.tileSize / 150);
			}
		}
	}

	this.name = name;
	this.image = entityTreeImage;
	this.point = point;
	this.grid = grid;
	this.topographic = true;
	this.visible = visible;
	this.trees = new Array();

	// fill trees array with trees
	for(var n = 0; n <= Math.floor(Math.random() * 25 + 5); n++)
	{
		this.trees.push(new IsometricPoint(this.point.x + (Math.random() * 3 - 1), this.point.y + (Math.random() * 3 - 1)));
	}

	// add new entity to entities array
	if(!this.entities) this.entities = new Array();
	this.entities.push(this);
}