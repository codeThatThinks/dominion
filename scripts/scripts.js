$(document).ready(function()
{
	/*
		canvas info
		- width: 960px
		- height: 540px
	*/

	/* functions */
/*
	 drawRect - isometrically draw a rectangle 
	var drawRect = function(x, y, width, height)
	{
		/*
			x - in pixels
			y - in pixels
			width - in grid units
			height - in grid units
		

		width = width * perspectiveWeight;
		height = height * perspectiveHeight;

		context.beginPath();
		context.moveTo(x,y);
		context.lineTo(x - (Math.cos(perspectiveAngle * (Math.PI / 180)) * height), y + (Math.sin(perspectiveAngle * (Math.PI / 180)) * height));
		content.lineTo(x + (Math.cos(perspectiveAngle * (Math.PI / 180)) * height) - (Math.cos(perspectiveAngle * (Math.PI / 180)) * width), );

		n = Math.sin(perspectiveAngle * (Math.PI / 180)) * height;
		n2 = Math.sin(perspectiveAngle * (Math.PI / 180)) * width;
		y3 = y + (Math.sin(perspectiveAngle * (Math.PI / 180)) * height) + (Math.sin(perspectiveAngle * (Math.PI / 180)) * width);

		/* top right coord 
		context.lineTo();

		/* back to upper left coord 
		context.lineTo(x, y);

		cos 30 = n / height
		n = cos 30 * height

		x2 = x - n
	}

	var drawRectOld = function(x, y, width, height)
	{
		perspectiveDistance = Math.round(width * Math.sin(perspectiveAngle * (Math.PI / 180)));

		context.beginPath();
		context.moveTo(x, y);
		context.lineTo(x, y + height);
		context.lineTo(x + width, y + height - perspectiveDistance);
		context.lineTo(x + width, y + height - perspectiveDistance - height);
		context.lineTo(x, y);
		context.closePath();

		context.strokeStyle = "#333333";
		context.lineWidth = 2;
		context.stroke();
	}

*/
/*
	// draws a grid
	var drawGrid = function()
	{
		var startY = gridOrginY - (Math.tan(perspectiveAngle * (Math.PI / 180)) * gridOrginX) - (perspectiveHeight / 2);

		gridSpacingHeight = (perspectiveHeight / 2) * (canvas.width() / (perspectiveWidth / 2));
		gridSpacingWidth = (perspectiveWidth / 2) * (canvas.width() / (perspectiveWidth / 2));

		context.beginPath();

		for(var y = startY - gridSpacingHeight; y <= (canvas.height() + gridSpacingHeight); y += perspectiveHeight)
		{
			context.moveTo(0, y);
			context.lineTo(0 + canvas.width(), y + gridSpacingHeight);
			context.moveTo(canvas.width(), y);
			context.lineTo(canvas.width() - canvas.width(), y + gridSpacingHeight);
		}

		context.closePath();

		context.lineWidth = 2;
		context.strokeStyle = '#444444';
		context.stroke();
	}
*/

	/* isometric functions */
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

		var posX = (gridX - gridY) * perspectiveWidth / 2;
		var posY = (gridX + gridY) * perspectiveHeight / 2;

		return [posX, posY];
	}

	// get grid coords from pixel coords
	var getGridPoint = function(x, y)
	{
		/*
			x - pixel x value
			x - pixel y value

			returns:
			Array[0] = grid x value
			Array[1] = grid y value
		*/
	}

/*
	var getIsometricX = function(x)
	{
		isometricValue = Math.cos(perspectiveAngle * (Math.PI / 180)) * x
		return isometricValue;
	}
*/

	// get y value of corresponding x value
	var getIsometricY = function(x)
	{
		isometricValue = Math.tan(perspectiveAngle * (Math.PI / 180)) * x;
		return isometricValue;
	}

	/* drawing functions */
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

	/* default functions */
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
		drawWall(-2, 1, 3, 1, 1, '#00FF00');
		drawWall(3, 1, 3, -2, 1, '#00FF00');
		drawWall(3, -2, -2, -2, 1, '#00FF00');
		drawWall(-2, -2, -2, 1, 1, '#00FF00');

		drawRect(-3, 3, -2, 2);

		drawWall(4, 3, 4, 5, 1, '#FF0000');

		drawLine(-1, 3, 1, 3, '#0000FF');
		drawLine(0, 2, 0, 4, '#0000FF');

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
	var mouseX, mouseY;

	/* game variables and arrays */
	
	/*var ship = function(x, y ,r)
	{
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.speed = speed;
	};*/

	/*
	// register keydown events
	window.addEventListener('keydown', checkKeyboard, true);
	*/

	// click and drag orgin
	$('canvas#space').click(function(e)
	{
		if(orginMovable)
		{
			orginMovable = false;
		}
		else
		{
			orginMovable = true;
			mouseX = e.offsetX - gridOrginX;
			mouseY = e.offsetY - gridOrginY;
		}
	});

	$('canvas#space').mousemove(function(e)
	{
		if(orginMovable)
		{
			gridOrginX = e.offsetX - mouseX;
			gridOrginY = e.offsetY - mouseY;
		}
	});

	gameLoop();
});