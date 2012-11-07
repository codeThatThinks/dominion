$(document).ready(function()
{
	/*
		canvas info
		- width: 960px
		- height: 540px
	*/

	/****** functions ******/
	/**** isometric functions ****/
	// get pixel coords from grid coords
	var getIsometricPoint = function(gridX, gridY)
	{
		/*
			gridX - grid x value
			gridY - grid y value

			returns:
			Array[0] = pixel x value
			Array[1] = pixel y value
		*/

		var posX = (gridX - gridY) * (perspectiveWidth / 2);
		var posY = (gridX + gridY) * (perspectiveHeight / 2);

		return [posX, posY];
	}

	// get grid coords from pixel coords
	var getGridPoint = function(posX, posY)
	{
		/*
			x - pixel x value
			x - pixel y value

			returns:
			Array[0] = grid x value
			Array[1] = grid y value
		*/

		posX -= gridOrginX;
		posY -= gridOrginY;

		var gridX = Math.floor((posY / perspectiveHeight) + ((posX / perspectiveWidth)));
		var gridY = Math.floor((posY / perspectiveHeight) - ((posX / perspectiveWidth)));

		return [gridX, gridY];
	}

	// get x value of corresponding y value
	var getIsometricX = function(x)
	{
		/*
			x - length

			returns:
			corresponding value to x
		*/

		isometricValue = x / Math.tan(perspectiveAngle * (Math.PI / 180));
		return isometricValue;
	}

	// get y value of corresponding x value
	var getIsometricY = function(x)
	{
		/*
			x - length

			returns:
			corresponding value to x
		*/

		isometricValue = Math.tan(perspectiveAngle * (Math.PI / 180)) * x;
		return isometricValue;
	}


	/**** drawing functions ****/
	// draws a horizontal line
	var drawLine = function(gridX, gridY, gridX2, gridY2, color, lineWidth)
	{
		/*
			gridX - x value on grid where line starts
			gridY - y value on grid where line starts
			gridX2 - x value on grid where line ends
			griY2 - y value on grid where line ends
			color - [optional] hex color value of line; defaults to #AAAAAA
			lineWidth - [optional] width of line, in pixels; defaults to 3
		*/

		context.beginPath();

		context.moveTo(gridOrginX + getIsometricPoint(gridX, gridY)[0], gridOrginY + getIsometricPoint(gridX, gridY)[1]);
		context.lineTo(gridOrginX + getIsometricPoint(gridX2, gridY2)[0], gridOrginY + getIsometricPoint(gridX2, gridY2)[1]);

		context.closePath();
		color = color || '#AAAAAA';
		context.strokeStyle = color;
		lineWidth = lineWidth || 3;
		context.lineWidth = lineWidth;
		context.stroke();
	}

	var drawWall = function(gridX, gridY, gridX2, gridY2, height, color, lineWidth)
	{
		/*
			gridX - x value on grid where line starts
			gridY - y value on grid where line starts
			gridX2 - x value on grid where line ends
			griY2 - y value on grid where line ends
			color - [optional] hex color value of line; defaults to #AAAAAA
			lineWidth - [optional] width of line, in pixels; defaults to 3
		*/

		context.beginPath();

		context.moveTo(gridOrginX + getIsometricPoint(gridX, gridY)[0], gridOrginY + getIsometricPoint(gridX, gridY)[1]);
		context.lineTo(gridOrginX + getIsometricPoint(gridX2, gridY2)[0], gridOrginY + getIsometricPoint(gridX2, gridY2)[1]);
		context.lineTo(gridOrginX + getIsometricPoint(gridX2, gridY2)[0], gridOrginY + getIsometricPoint(gridX2, gridY2)[1] - gridSpacing);
		context.lineTo(gridOrginX + getIsometricPoint(gridX, gridY)[0], gridOrginY + getIsometricPoint(gridX, gridY)[1] - (height * gridSpacing));
		context.lineTo(gridOrginX + getIsometricPoint(gridX, gridY)[0], gridOrginY + getIsometricPoint(gridX, gridY)[1]);
		
		context.closePath();
		color = color || '#AAAAAA';
		context.strokeStyle = color;
		lineWidth = lineWidth || 3;
		context.lineWidth = lineWidth;
		context.stroke();
	}

	// draws a rectangle
	var drawRect = function(gridX, gridY, gridX2, gridY2, color, lineWidth)
	{
		/*
			gridX - x value on grid where rect starts
			gridY - y value on grid where rect starts
			gridX2 - x value on grid where rect ends
			griY2 - y value on grid where rect ends
			color - [optional] hex color value of rect; defaults to #AAAAAA
			lineWidth - [optional] width of rect, in pixels; defaults to 3
		*/

		context.beginPath();

		context.moveTo(gridOrginX + getIsometricPoint(gridX, gridY)[0], gridOrginY + getIsometricPoint(gridX, gridY)[1]);
		context.lineTo(gridOrginX + getIsometricPoint(gridX, gridY2)[0], gridOrginY + getIsometricPoint(gridX, gridY2)[1]);
		context.lineTo(gridOrginX + getIsometricPoint(gridX2, gridY2)[0], gridOrginY + getIsometricPoint(gridX2, gridY2)[1]);
		context.lineTo(gridOrginX + getIsometricPoint(gridX2, gridY)[0], gridOrginY + getIsometricPoint(gridX2, gridY)[1]);
		context.lineTo(gridOrginX + getIsometricPoint(gridX, gridY)[0], gridOrginY + getIsometricPoint(gridX, gridY)[1]);

		context.closePath();
		color = color || '#AAAAAA';
		context.strokeStyle = color;
		lineWidth = lineWidth || 3;
		context.lineWidth = lineWidth;
		context.stroke();
	}

	// draws a grid
	var drawGrid = function(color, lineWidth)
	{
		/*
			color - [optional] hex color value of grid; defaults to #AAAAAA
			lineWidth - [optional] width of grid, in pixels; defaults to 3
		*/

		context.beginPath();

		// left top-bottom
		for(var n = 0; (gridOrginY + getIsometricY(gridOrginX) + (n * perspectiveHeight)) < 960; n++)
		{
			context.moveTo(gridOrginX, gridOrginY + (n * perspectiveHeight));
			context.lineTo(0, gridOrginY + getIsometricY(gridOrginX) + (n * perspectiveHeight));
		}

		for(var n = 0; (gridOrginY + getIsometricY(gridOrginX) + (n * perspectiveHeight)) > 0; n--)
		{
			context.moveTo(gridOrginX, gridOrginY + (n * perspectiveHeight));
			context.lineTo(0, gridOrginY + getIsometricY(gridOrginX) + (n * perspectiveHeight));
		}

		// left bottom-top
		for(var n = 0; (gridOrginY - getIsometricY(gridOrginX) + (n * perspectiveHeight)) < 960; n++)
		{
			context.moveTo(0, gridOrginY + (n * perspectiveHeight) - getIsometricY(gridOrginX));
			context.lineTo(gridOrginX, gridOrginY + getIsometricY(gridOrginX) + (n * perspectiveHeight) - getIsometricY(gridOrginX));
		}

		for(var n = 0; (gridOrginY + (n * perspectiveHeight)) > 0; n--)
		{
			context.moveTo(0, gridOrginY + (n * perspectiveHeight) - getIsometricY(gridOrginX));
			context.lineTo(gridOrginX, gridOrginY + getIsometricY(gridOrginX) + (n * perspectiveHeight) - getIsometricY(gridOrginX));
		}

		// right top-bottom
		for(var n = 0; (gridOrginY + getIsometricY(gridOrginX) + (n * perspectiveHeight)) < 960; n++)
		{
			context.moveTo(gridOrginX, gridOrginY + (n * perspectiveHeight));
			context.lineTo(canvas.width(), gridOrginY + getIsometricY(canvas.width() - gridOrginX) + (n * perspectiveHeight));
		}

		for(var n = 0; (gridOrginY + getIsometricY(canvas.width() - gridOrginX) + (n * perspectiveHeight)) > 0; n--)
		{
			context.moveTo(gridOrginX, gridOrginY + (n * perspectiveHeight));
			context.lineTo(canvas.width(), gridOrginY + getIsometricY(canvas.width() - gridOrginX) + (n * perspectiveHeight));
		}

		// right bottom-top
		for(var n = 0; (gridOrginY - getIsometricY(canvas.width() - gridOrginX) + (n * perspectiveHeight)) < 960; n++)
		{
			context.moveTo(canvas.width(), gridOrginY + (n * perspectiveHeight) - getIsometricY(canvas.width() - gridOrginX));
			context.lineTo(gridOrginX, gridOrginY + getIsometricY(canvas.width() - gridOrginX) + (n * perspectiveHeight) - getIsometricY(canvas.width() - gridOrginX));
		}

		for(var n = 0; (gridOrginY + (n * perspectiveHeight)) > 0; n--)
		{
			context.moveTo(canvas.width(), gridOrginY + (n * perspectiveHeight) - getIsometricY(canvas.width() - gridOrginX));
			context.lineTo(gridOrginX, gridOrginY + getIsometricY(canvas.width() - gridOrginX) + (n * perspectiveHeight) - getIsometricY(canvas.width() - gridOrginX));
		}

		context.closePath();
		color = color || '#AAAAAA';
		context.strokeStyle = color;
		lineWidth = lineWidth || 3;
		context.lineWidth = lineWidth;
		context.stroke();
	}


	/**** default functions ****/
	// clears canvas
	var clear = function()
	{
		context.clearRect(0, 0, canvas.width(), canvas.height());
	}

	// main rendering loop
	var gameLoop = function()
	{
		clear();
		drawGrid('#383838');

		var gridPoint = getGridPoint(mouseLocX, mouseLocY);
		drawRect(gridPoint[0], gridPoint[1], gridPoint[0] + 1, gridPoint[1] + 1, '#444444');

		drawRect(-10, -10, 10, 10, '#555555');

		drawLine(0, 0, 3, 0, '#0000FF');
		drawLine(0, 0, 0, 3, '#0000FF');

		context.beginPath();
		context.moveTo((50 * 0.707) - (100 * 0.707), (50 * 0.409) + (100 * 0.409) - 0.816);
		context.lineTo((50 * 0.707) - (150 * 0.707), (50 * 0.409) + (150 * 0.409) - 0.816);
		context.closePath();
		context.strokeStyle = '#FFFFFF';
		context.lineWidth = 1;
		context.stroke();

		loop = setTimeout(gameLoop, 20);
	}

	// set up canvas
	var canvas = $('canvas#space'), context = canvas.get(0).getContext("2d");

	// graphics variables
	var perspectiveAngle = 30;
	var gridSpacing = 50;
	var perspectiveHeight = (Math.sin(perspectiveAngle * (Math.PI / 180)) * gridSpacing) * 2;
	var perspectiveWidth = (Math.cos(perspectiveAngle * (Math.PI / 180)) * gridSpacing) * 2;

	var gridOrginX = canvas.width() / 2;	// pixel location of (0, 0)
	var gridOrginY = canvas.height() / 2;

	var orginMovable = false;
	var mouseX, mouseY, mouseLocX, mouseLocY;

	/* game variables and arrays */
	
	/*var ship = function(x, y ,r)
	{
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.speed = speed;
	};*/

	/*// checks mouse click
	$('canvas#space').click(function(e)
	{
	});

	// checks mouse move
	$('canvas#space').mousemove(function(e)
	{
		// move orgin on cmd down
		if(orginMovable)
		{
			gridOrginX = e.offsetX - mouseX;
			gridOrginY = e.offsetY - mouseY;
		}

		mouseLocX = e.offsetX;
		mouseLocY = e.offsetY;
	});*/

	gameLoop();
});