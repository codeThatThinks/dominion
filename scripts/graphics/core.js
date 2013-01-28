/**********
 * Core Graphics Functions
 * Author: Ian Glen <codeThatThinks@gmail.com>
 *********/

/**
 * graphics variables
 */
var perspectiveAngle = 30;																	// angle in degrees of isometric grid
var gridSpacing = 70;																		// side length in pixels of isometric grid square
var perspectiveHeight = (Math.sin(perspectiveAngle * (Math.PI / 180)) * gridSpacing) * 2;	// vertical width of isometric square
var perspectiveWidth = (Math.cos(perspectiveAngle * (Math.PI / 180)) * gridSpacing) * 2;	// horizontal width of isometric square


/**
 * window.clear()
 * clears canvas
 */
var clear = function()
{
	context.clearRect(0, 0, canvas.width(), canvas.height());
}


/**
 * window.drawGrid(Color color, int lineWeight)
 * draws isometric grid
 *     color - (optional) color of grid; defaults to rgb(170,170,170)
 *     lineWeight - (optional) weight of grid lines in pixels; defaults to 3
 */
var drawGrid = function(color, lineWidth)
{
	context.beginPath();

	// left top-bottom
	for(var n = 0; (origin.y + getIsometricY(origin.x) + (n * perspectiveHeight)) < 960; n++)
	{
		context.moveTo(origin.x, origin.y + (n * perspectiveHeight));
		context.lineTo(0, origin.y + getIsometricY(origin.x) + (n * perspectiveHeight));
	}

	for(var n = 0; (origin.y + getIsometricY(origin.x) + (n * perspectiveHeight)) > 0; n--)
	{
		context.moveTo(origin.x, origin.y + (n * perspectiveHeight));
		context.lineTo(0, origin.y + getIsometricY(origin.x) + (n * perspectiveHeight));
	}

	// left bottom-top
	for(var n = 0; (origin.y - getIsometricY(origin.x) + (n * perspectiveHeight)) < 960; n++)
	{
		context.moveTo(0, origin.y + (n * perspectiveHeight) - getIsometricY(origin.x));
		context.lineTo(origin.x, origin.y + getIsometricY(origin.x) + (n * perspectiveHeight) - getIsometricY(origin.x));
	}

	for(var n = 0; (origin.y + (n * perspectiveHeight)) > 0; n--)
	{
		context.moveTo(0, origin.y + (n * perspectiveHeight) - getIsometricY(origin.x));
		context.lineTo(origin.x, origin.y + getIsometricY(origin.x) + (n * perspectiveHeight) - getIsometricY(origin.x));
	}

	// right top-bottom
	for(var n = 0; (origin.y + getIsometricY(origin.x) + (n * perspectiveHeight)) < 960; n++)
	{
		context.moveTo(origin.x, origin.y + (n * perspectiveHeight));
		context.lineTo(canvas.width(), origin.y + getIsometricY(canvas.width() - origin.x) + (n * perspectiveHeight));
	}

	for(var n = 0; (origin.y + getIsometricY(canvas.width() - origin.x) + (n * perspectiveHeight)) > 0; n--)
	{
		context.moveTo(origin.x, origin.y + (n * perspectiveHeight));
		context.lineTo(canvas.width(), origin.y + getIsometricY(canvas.width() - origin.x) + (n * perspectiveHeight));
	}

	// right bottom-top
	for(var n = 0; (origin.y - getIsometricY(canvas.width() - origin.x) + (n * perspectiveHeight)) < 960; n++)
	{
		context.moveTo(canvas.width(), origin.y + (n * perspectiveHeight) - getIsometricY(canvas.width() - origin.x));
		context.lineTo(origin.x, origin.y + getIsometricY(canvas.width() - origin.x) + (n * perspectiveHeight) - getIsometricY(canvas.width() - origin.x));
	}

	for(var n = 0; (origin.y + (n * perspectiveHeight)) > 0; n--)
	{
		context.moveTo(canvas.width(), origin.y + (n * perspectiveHeight) - getIsometricY(canvas.width() - origin.x));
		context.lineTo(origin.x, origin.y + getIsometricY(canvas.width() - origin.x) + (n * perspectiveHeight) - getIsometricY(canvas.width() - origin.x));
	}

	context.closePath();
	color = color || new Color(170,170,170);
	context.strokeStyle = color.formatRGB();
	lineWidth = lineWidth || 3;
	context.lineWidth = lineWidth;
	context.stroke();
}