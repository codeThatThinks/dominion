/**********
 * Territory Drawing Functions
 * Author: Ian Glen <codeThatThinks@gmail.com>
 *********/

/**
 * window.drawLine(int gridX, int gridY, int gridX2, int gridY2, Color color, int lineWeight)
 * draws and isometric line
 *     gridX - grid x coord of starting point of line
 *     gridY - grid y coord of starting point of line
 *     gridX2 - grid x coord of ending point of line
 *     gridY2 - grid y coord of ending point of line
 *     color - (optional) color of line; defaults to rgb(170,170,170)
 *     lineWeight - (optional) weight of line in pixels; defaults to 3
 */
var drawLine = function(gridX, gridY, gridX2, gridY2, color, lineWidth)
{
	context.beginPath();

	context.moveTo(origin.x + getIsometricPoint(gridX, gridY)[0], origin.y + getIsometricPoint(gridX, gridY)[1]);
	context.lineTo(origin.x + getIsometricPoint(gridX2, gridY2)[0], origin.y + getIsometricPoint(gridX2, gridY2)[1]);

	context.closePath();
	color = color || new Color(170,170,170);
	context.strokeStyle = color.formatRGB();
	lineWidth = lineWidth || 3;
	context.lineWidth = lineWidth;
	context.stroke();
}


/**
 * window.drawRect(int gridX, int gridY, int gridX2, int gridY2, Color color, bool fill, int lineWeight)
 * draws and isometric line
 *     gridX - grid x coord of starting point of rect
 *     gridY - grid y coord of starting point of rect
 *     gridX2 - grid x coord of ending point of rect
 *     gridY2 - grid y coord of ending point of rect
 *     color - (optional) color of rect; defaults to rgb(170,170,170)
 *     fill - (optional) fill rect with 40% opacity color
 *     lineWeight - (optional) weight of outline in pixels; defaults to 3
 */
var drawRect = function(gridX, gridY, gridX2, gridY2, color, fill, lineWidth)
{
	context.beginPath();

	context.moveTo(origin.x + getIsometricPoint(gridX, gridY)[0], origin.y + getIsometricPoint(gridX, gridY)[1]);
	context.lineTo(origin.x + getIsometricPoint(gridX, gridY2)[0], origin.y + getIsometricPoint(gridX, gridY2)[1]);
	context.lineTo(origin.x + getIsometricPoint(gridX2, gridY2)[0], origin.y + getIsometricPoint(gridX2, gridY2)[1]);
	context.lineTo(origin.x + getIsometricPoint(gridX2, gridY)[0], origin.y + getIsometricPoint(gridX2, gridY)[1]);
	context.lineTo(origin.x + getIsometricPoint(gridX, gridY)[0], origin.y + getIsometricPoint(gridX, gridY)[1]);

	context.closePath();
	color = color || new Color(170,170,170);
	context.strokeStyle = color.formatRGB();
	lineWidth = lineWidth || 3;
	context.lineWidth = lineWidth;

	if(fill)
	{
		context.fillStyle = color.formatRGBA(0.4);
		context.fill();
	}

	context.stroke();
}


/**
 * window.drawWall(int gridX, int gridY, int gridX2, int gridY2, int height, Color color, bool fill, int lineWeight)
 * draws and isometric wall
 *     gridX - grid x coord of starting point of rect
 *     gridY - grid y coord of starting point of rect
 *     gridX2 - grid x coord of ending point of rect
 *     gridY2 - grid y coord of ending point of rect
 *     height - height in grid units
 *     color - (optional) color of wall; defaults to rgb(170,170,170)
 *     fill - (optional) fill wall with 40% opacity color
 *     lineWeight - (optional) weight of outline in pixels; defaults to 3
 */
var drawWall = function(gridX, gridY, gridX2, gridY2, height, color, fill, lineWidth)
{
	context.beginPath();

	context.moveTo(origin.x + getIsometricPoint(gridX, gridY)[0], origin.y + getIsometricPoint(gridX, gridY)[1]);
	context.lineTo(origin.x + getIsometricPoint(gridX2, gridY2)[0], origin.y + getIsometricPoint(gridX2, gridY2)[1]);
	context.lineTo(origin.x + getIsometricPoint(gridX2, gridY2)[0], origin.y + getIsometricPoint(gridX2, gridY2)[1] - gridSpacing);
	context.lineTo(origin.x + getIsometricPoint(gridX, gridY)[0], origin.y + getIsometricPoint(gridX, gridY)[1] - (height * gridSpacing));
	context.lineTo(origin.x + getIsometricPoint(gridX, gridY)[0], origin.y + getIsometricPoint(gridX, gridY)[1]);
	
	context.closePath();
	color = color || new Color(170,170,170);
	context.strokeStyle = color.formatRGB();
	lineWidth = lineWidth || 3;
	context.lineWidth = lineWidth;
	
	if(fill)
	{
		context.fillStyle = color.formatRGBA(0.4);
		context.fill();
	}

	context.stroke();
}