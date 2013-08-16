/**********
 * Tile Drawing Functions
 * Author: Ian Glen <ian@ianglen.me>
 *********/

/**
 * Grid.drawLine() method
 */
Grid.prototype.drawLine = function(startingPoint, endingPoint, color, strokeThickness)
{
	color = color || new Color(170,170,170);
	strokeThickness = strokeThickness || 3;

	this.canvas.context.beginPath();

	this.canvas.context.moveTo(startingPoint.toOrthographicPoint(this).x, startingPoint.toOrthographicPoint(this).y);
	this.canvas.context.lineTo(endingPoint.toOrthographicPoint(this).x, endingPoint.toOrthographicPoint(this).y);

	this.canvas.context.closePath();
	
	this.context.strokeStyle = color.formatRGB();
	this.context.lineWidth = strokeThickness;
	this.context.stroke();
}


/**
 * Grid.drawRect() method
 */
Grid.prototype.drawRect = function(startingPoint, endingPoint, color, fill, strokeThickness)
{
	color = color || new Color(170,170,170);
	strokeThickness = strokeThickness || 3;

	this.canvas.context.beginPath();

	this.canvas.context.moveTo(startingPoint.toOrthographicPoint(this).x, startingPoint.toOrthographicPoint(this).y);
	this.canvas.context.lineTo(new IsometricPoint(startingPoint.x, endingPoint.y).toOrthographicPoint(this).x, new IsometricPoint(startingPoint.x, endingPoint.y).toOrthographicPoint(this).y);
	this.canvas.context.lineTo(endingPoint.toOrthographicPoint(this).x, endingPoint.toOrthographicPoint(this).y);
	this.canvas.context.lineTo(new IsometricPoint(endingPoint.x, startingPoint.y).toOrthographicPoint(this).x, new IsometricPoint(endingPoint.x, startingPoint.y).toOrthographicPoint(this).y);
	this.canvas.context.lineTo(startingPoint.toOrthographicPoint(this).x, startingPoint.toOrthographicPoint(this).y);

	this.canvas.context.closePath();
	
	this.canvas.context.strokeStyle = color.formatRGB();
	this.canvas.context.lineWidth = strokeThickness;

	if(fill)
	{
		this.canvas.context.fillStyle = color.formatRGBA(0.4);
		this.canvas.context.fill();
	}

	this.canvas.context.stroke();
}