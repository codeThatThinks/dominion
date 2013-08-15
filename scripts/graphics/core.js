/**********
 * Core Graphics Functions
 * Author: Ian Glen <ian@ianglen.me>
 *********/

/**
 * Color class
 */
function Color(red, green, blue)
{
	this.formatRGB = function()
	{
		return "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
	}

	this.formatRGBA = function(opacity)
	{
		return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + opacity + ")";
	}

	this.fromRGB = function(string)
	{
		var regexp = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;

		string = string.replace(/ /g,'');
    	string = string.toLowerCase();

		this.red = string.match(regexp)[1];
		this.green = string.match(regexp)[2];
		this.blue = string.match(regexp)[3];
	}

	this.red = red;
	this.green = green;
	this.blue = blue;
}


/**
 * OrthographicPoint class
 */
function OrthographicPoint(x, y)
{
	this.toIsometricPoint = function(grid)
	{
		var orthographicX = this.x - grid.origin.x;
		var orthographicY = this.y - grid.origin.y;

		var isometricX = (orthographicY / grid.getTileHeight()) + (orthographicX / grid.getTileWidth());
		var isometricY = (orthographicY / grid.getTileHeight()) - (orthographicX / grid.getTileWidth());

		return new IsometricPoint(isometricX, isometricY);
	}

	this.toIsometricPointAsInteger = function(grid)
	{
		var orthographicX = this.x - grid.origin.x;
		var orthographicY = this.y - grid.origin.y;

		var isometricX = Math.floor((orthographicY / grid.getTileHeight()) + (orthographicX / grid.getTileWidth()));
		var isometricY = Math.floor((orthographicY / grid.getTileHeight()) - (orthographicX / grid.getTileWidth()));

		return new IsometricPoint(isometricX, isometricY);
	}

	this.x = x;
	this.y = y;
}


/**
 * IsometricPoint class
 */
function IsometricPoint(x, y)
{
	this.toOrthographicPoint = function(grid)
	{
		var orthographicX = (this.x - this.y) * (grid.getTileWidth() / 2);
		var orthographicY = (this.x + this.y) * (grid.getTileHeight() / 2);

		return new OrthographicPoint(orthographicX + grid.origin.x, orthographicY + grid.origin.y);
	}

	this.x = x;
	this.y = y;
}


/**
 * Canvas class
 */
function Canvas(element, context)
{
	this.clear = function()
	{
		this.context.clearRect(0, 0, this.element.width(), this.element.height());
	}

	this.element = element;
	this.context = context;
}