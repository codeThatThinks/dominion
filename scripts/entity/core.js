/**********
 * Core Entity Functions
 * Author: Ian Glen <ian@ianglen.me>
 *********/

/**
 * Entity class
 */
function Entity(name, image, point, grid, topographic, visible)
{
	this.constructor.drawEntities = function()
	{
		for(var n = 0; n < this.entities.length; n++)
		{
			this.entities[n].draw();
		}
	}

	this.constructor.removeEntity = function(name)
	{
		for(var n = 0; n < this.constructor.entities.length; n++)
		{
			if(this.constructor.entities[n].name = name)
			{
				entityArray.splice(n, 1);
				break;
			}
		}
	}

	this.constructor.getEntity = function(name)
	{
		for(var n = 0; n < this.constructor.entities.length; n++)
		{
			if(this.constructor.entities[n].name == name)
			{
				return this.constructor.entities[n];
			}
		}

		return false;
	}

	this.constructor.getEntityAtPoint = function(point)
	{
		for(var n = 0; n < this.constructor.entities.length; n++)
		{
			if(Math.floor(this.constructor.entities[n].point.x) == point.x && Math.floor(this.constructor.entities[n].point.y) == point.y && this.constructor.entities[n].topographic == false)
			{
				return this.constructor.entities[n];
			}
		}

		return false;
	}


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
	this.topographic = topographic;
	this.visible = visible;

	// add new entity to entities array
	if(!this.constructor.entities) this.constructor.entities = new Array();
	this.constructor.entities.push(this);
}