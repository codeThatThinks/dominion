/**********
 * Core Entity Functions
 * Author: Ian Glen <ian@ianglen.me>
 *********/

/**** TODO: refactor ****/

function Entity(name, image, point, visible)
{
	function draw()					// draw entity if visible = true
	{
		if(this.visible)
		{
			grid.canvas.context.drawImage(this.image, this.point.toOrthographicPoint(grid).x - ((this.image.width * grid.tileSize / 150) / 2), this.point.toOrthographicPoint(grid).y - ((this.image.height * grid.tileSize / 150) - grid.getTileHeight()), (this.image.width * grid.tileSize / 150), (this.image.height * grid.tileSize / 150));
		}
	}

	function getWidth()				// calculate width of entity
	{
		return this.image.width;
		
	}

	function getHeight()			// calculate height of entity
	{
		return this.image.height;
	}

	this.name = name;				// name of element
	this.image = image;				// entity image
	this.point = point;				// location of entity as Point()
	this.visible = visible;			// boolean - is object on screen?

	this.draw = draw;
	this.getWidth = getWidth;
	this.getHeight = getHeight;
}