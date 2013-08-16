/**********
 * Core Entity Functions
 * Author: Ian Glen <ian@ianglen.me>
 *********/

/**** TODO: refactor ****/

/**
 * Entity class
 */
function Entity(name, image, point, grid, visible)
{
	this.draw = function()
	{
		if(this.visible)
		{
			this.grid.canvas.context.drawImage(this.image, this.point.toOrthographicPoint(this.grid).x - ((this.image.width * this.grid.tileSize / 150) / 2), this.point.toOrthographicPoint(grid).y - ((this.image.height * this.grid.tileSize / 150) - this.grid.getTileHeight()), (this.image.width * this.grid.tileSize / 150), (this.image.height * this.grid.tileSize / 150));
		}
	}

	this.getWidth = function()
	{
		return this.image.width;
		
	}

	this.getHeight = function()
	{
		return this.image.height;
	}

	this.name = name;
	this.image = image;
	this.point = point;
	this.grid = grid;
	this.visible = visible;

	this.entities.push(this); // add new entity to entities array
}

/**
 * Entities array
 */
Entity.prototype.entities = new Array();