/**********
 * Core Graphics Functions
 * Author: Ian Glen <ian@ianglen.me>
 *********/

/**
 * OrthographicPoint class
 */
function OrthographicPoint(x, y)
{
	this.toIsometricPoint = function(grid)
	{
		orthographicX -= grid.origin.x;
		orthographicY -= grid.origin.y;

		var isometricX = (orthographicY / grid.getTileHeight()) + (orthographicX / grid.getTileWidth());
		var isometricY = (orthographicY / grid.getTileHeight()) - (orthographicX / grid.getTileWidth());

		return new IsometricPoint(isometricX, isometricY);
	}

	this.toIsometricPointAsInteger = function(grid)
	{
		orthographicX -= grid.origin.x;
		orthographicY -= grid.origin.y;

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

		return new OrthographicPoint(orthographicX, orthographicY);
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


/**
 * Grid class
 */
function Grid(canvas, origin, tileSize, color, strokeThickness)
{
	this.center = function()
	{
		this.origin.x = this.canvas.element.width() / 2;
		this.origin.y = this.canvas.element.height() / 2;
	}

	this.centerOnPoint = function(point)
	{
		this.origin.x += (this.canvas.element.width() / 2) - (point.toOrthographicPoint(this).x + this.origin.x);
		this.origin.y += (this.canvas.element.height() / 2) - (point.toOrthographicPoint(this) + this.origin.y);
	}

	this.draw = function(topPoint, bottomPoint)
	{
		var drawWidth = bottomPoint.x - topPoint.x;
		var drawHeight = bottomPoint.y - topPoint.y;
		var x;

		this.canvas.context.beginPath();

		for(x = topPoint.toIsometricPointAsInteger().toOrthographicPoint().x; x - (drawHeight / Math.tan(Math.PI / 6)) < bottomPoint.x; x + this.getTileWidth())
		{
			this.canvas.context.moveTo(x, bottomPoint.y);
			this.canvas.context.lineTo(x - (drawHeight / Math.tan(Math.PI / 6)), topPoint.y);
		}

		for(x = bottomPoint.toIsometricPointAsInteger().toOrthographicPoint().x; x + (drawHeight / Math.tan(Math.PI / 6)) < topPoint.x; x + this.getTileWidth())
		{
			this.canvas.context.moveTo(x, topPoint.y);
			this.canvas.context.lineTo(x + (drawHeight / Math.tan(Math.PI / 6)), bottomPoint.y);
		}

		this.canvas.context.closePath();
		this.canvas.context.strokeStyle = this.color.formatRGB();
		this.canvas.context.lineWidth = this.strokeThickness;
		this.canvas.context.stroke();
	}

	this.getTileWidth = function()
	{
		return Math.cos(Math.PI / 6) * this.tileSize * 2;
	}

	this.getTileHeight = function()
	{
		return Math.sin(Math.PI / 6) * this.tileSize * 2;
	}

	this.canvas = canvas;
	this.origin = origin;
	this.tileSize = tileSize || 70;
	this.color = color || new Color(170, 170, 170);
	this.strokeThickness = strokeThickness || 3;
}