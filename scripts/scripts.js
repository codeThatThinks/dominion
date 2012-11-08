/*function Point()
{
	this.x = x;
	this.y = y;

	function set(newX, newY)
	{
		x = newX;
		y = newY;
	}
}*/

$(document).ready(function()
{
	/*
		canvas info
		- width: 960px
		- height: 540px
	*/

	/****** objects ******/
	function Element(name, x, y, width, height)
	{
		this.name = name;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}


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

		posX -= gridOriginX;
		posY -= gridOriginY;

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
			color - [optional] rgb color value of line; defaults to rgb(170, 170, 170)
			lineWidth - [optional] width of line, in pixels; defaults to 3
		*/

		context.beginPath();

		context.moveTo(gridOriginX + getIsometricPoint(gridX, gridY)[0], gridOriginY + getIsometricPoint(gridX, gridY)[1]);
		context.lineTo(gridOriginX + getIsometricPoint(gridX2, gridY2)[0], gridOriginY + getIsometricPoint(gridX2, gridY2)[1]);

		context.closePath();
		color = color || '170,170,170';
		context.strokeStyle = 'rgb(' + color + ')';
		lineWidth = lineWidth || 3;
		context.lineWidth = lineWidth;
		context.stroke();
	}

	var drawWall = function(gridX, gridY, gridX2, gridY2, height, color, fill, lineWidth)
	{
		/*
			gridX - x value on grid where line starts
			gridY - y value on grid where line starts
			gridX2 - x value on grid where line ends
			griY2 - y value on grid where line ends
			color - [optional] rgb color value of line; defaults to rgb(170, 170, 170)
			fill - [optional] boolean; fill shape with 40% opacity color
			lineWidth - [optional] width of line, in pixels; defaults to 3
		*/

		context.beginPath();

		context.moveTo(gridOriginX + getIsometricPoint(gridX, gridY)[0], gridOriginY + getIsometricPoint(gridX, gridY)[1]);
		context.lineTo(gridOriginX + getIsometricPoint(gridX2, gridY2)[0], gridOriginY + getIsometricPoint(gridX2, gridY2)[1]);
		context.lineTo(gridOriginX + getIsometricPoint(gridX2, gridY2)[0], gridOriginY + getIsometricPoint(gridX2, gridY2)[1] - gridSpacing);
		context.lineTo(gridOriginX + getIsometricPoint(gridX, gridY)[0], gridOriginY + getIsometricPoint(gridX, gridY)[1] - (height * gridSpacing));
		context.lineTo(gridOriginX + getIsometricPoint(gridX, gridY)[0], gridOriginY + getIsometricPoint(gridX, gridY)[1]);
		
		context.closePath();
		color = color || '170,170,170';
		context.strokeStyle = 'rgb(' + color + ')';
		lineWidth = lineWidth || 3;
		context.lineWidth = lineWidth;
		
		if(fill)
		{
			context.fillStyle = 'rgba(' + color + ', 0.4)';
			context.fill();
		}

		context.stroke();
	}

	// draws a rectangle
	var drawRect = function(gridX, gridY, gridX2, gridY2, color, fill, lineWidth)
	{
		/*
			gridX - x value on grid where rect starts
			gridY - y value on grid where rect starts
			gridX2 - x value on grid where rect ends
			griY2 - y value on grid where rect ends
			color - [optional] rgb color value of line; defaults to rgb(170, 170, 170)
			fill - [optional] boolean; fill shape with 40% opacity color
			lineWidth - [optional] width of rect, in pixels; defaults to 3
		*/

		context.beginPath();

		context.moveTo(gridOriginX + getIsometricPoint(gridX, gridY)[0], gridOriginY + getIsometricPoint(gridX, gridY)[1]);
		context.lineTo(gridOriginX + getIsometricPoint(gridX, gridY2)[0], gridOriginY + getIsometricPoint(gridX, gridY2)[1]);
		context.lineTo(gridOriginX + getIsometricPoint(gridX2, gridY2)[0], gridOriginY + getIsometricPoint(gridX2, gridY2)[1]);
		context.lineTo(gridOriginX + getIsometricPoint(gridX2, gridY)[0], gridOriginY + getIsometricPoint(gridX2, gridY)[1]);
		context.lineTo(gridOriginX + getIsometricPoint(gridX, gridY)[0], gridOriginY + getIsometricPoint(gridX, gridY)[1]);

		context.closePath();
		color = color || '170,170,170';
		context.strokeStyle = 'rgb(' + color + ')';
		lineWidth = lineWidth || 3;
		context.lineWidth = lineWidth;

		if(fill)
		{
			context.fillStyle = 'rgba(' + color + ', 0.4)';
			context.fill();
		}

		context.stroke();
	}

	// draws a grid
	var drawGrid = function(color, lineWidth)
	{
		/*
			color - [optional] rgb color value of line; defaults to rgb(170, 170, 170)
			lineWidth - [optional] width of grid, in pixels; defaults to 3
		*/

		context.beginPath();

		// left top-bottom
		for(var n = 0; (gridOriginY + getIsometricY(gridOriginX) + (n * perspectiveHeight)) < 960; n++)
		{
			context.moveTo(gridOriginX, gridOriginY + (n * perspectiveHeight));
			context.lineTo(0, gridOriginY + getIsometricY(gridOriginX) + (n * perspectiveHeight));
		}

		for(var n = 0; (gridOriginY + getIsometricY(gridOriginX) + (n * perspectiveHeight)) > 0; n--)
		{
			context.moveTo(gridOriginX, gridOriginY + (n * perspectiveHeight));
			context.lineTo(0, gridOriginY + getIsometricY(gridOriginX) + (n * perspectiveHeight));
		}

		// left bottom-top
		for(var n = 0; (gridOriginY - getIsometricY(gridOriginX) + (n * perspectiveHeight)) < 960; n++)
		{
			context.moveTo(0, gridOriginY + (n * perspectiveHeight) - getIsometricY(gridOriginX));
			context.lineTo(gridOriginX, gridOriginY + getIsometricY(gridOriginX) + (n * perspectiveHeight) - getIsometricY(gridOriginX));
		}

		for(var n = 0; (gridOriginY + (n * perspectiveHeight)) > 0; n--)
		{
			context.moveTo(0, gridOriginY + (n * perspectiveHeight) - getIsometricY(gridOriginX));
			context.lineTo(gridOriginX, gridOriginY + getIsometricY(gridOriginX) + (n * perspectiveHeight) - getIsometricY(gridOriginX));
		}

		// right top-bottom
		for(var n = 0; (gridOriginY + getIsometricY(gridOriginX) + (n * perspectiveHeight)) < 960; n++)
		{
			context.moveTo(gridOriginX, gridOriginY + (n * perspectiveHeight));
			context.lineTo(canvas.width(), gridOriginY + getIsometricY(canvas.width() - gridOriginX) + (n * perspectiveHeight));
		}

		for(var n = 0; (gridOriginY + getIsometricY(canvas.width() - gridOriginX) + (n * perspectiveHeight)) > 0; n--)
		{
			context.moveTo(gridOriginX, gridOriginY + (n * perspectiveHeight));
			context.lineTo(canvas.width(), gridOriginY + getIsometricY(canvas.width() - gridOriginX) + (n * perspectiveHeight));
		}

		// right bottom-top
		for(var n = 0; (gridOriginY - getIsometricY(canvas.width() - gridOriginX) + (n * perspectiveHeight)) < 960; n++)
		{
			context.moveTo(canvas.width(), gridOriginY + (n * perspectiveHeight) - getIsometricY(canvas.width() - gridOriginX));
			context.lineTo(gridOriginX, gridOriginY + getIsometricY(canvas.width() - gridOriginX) + (n * perspectiveHeight) - getIsometricY(canvas.width() - gridOriginX));
		}

		for(var n = 0; (gridOriginY + (n * perspectiveHeight)) > 0; n--)
		{
			context.moveTo(canvas.width(), gridOriginY + (n * perspectiveHeight) - getIsometricY(canvas.width() - gridOriginX));
			context.lineTo(gridOriginX, gridOriginY + getIsometricY(canvas.width() - gridOriginX) + (n * perspectiveHeight) - getIsometricY(canvas.width() - gridOriginX));
		}

		context.closePath();
		color = color || '170,170,170';
		context.strokeStyle = 'rgb(' + color + ')';
		lineWidth = lineWidth || 3;
		context.lineWidth = lineWidth;
		context.stroke();
	}


	/**** ui functions ****/
	// draw a button
	var drawButton = function(x, y, width, height, color, opacity)
	{
		/*
			x - x location where button will be drawn
			y - y location where button will be drawn
			width - width of button
			height - height of button
			color - rgb color value of button background
			opacity - opacity of button background
		*/

		context.beginPath();

		context.rect(x, y, width, height);

		context.closePath();
		context.fillStyle = 'rgba(' + color + ', ' + opacity + ')';
		context.fill();
	}

	// add an element to the ui array
	var addElement = function(name, x, y, width, height)
	{
		/*
			name - name of element to be added
			x - x location of element to be added
			y - y location of element to be added
			width - width of element to be added
			height - height of element to be added
		*/

		elementsArray.push(new Element(name, x, y, width, height));
	}

	// remove an element from the ui array
	var removeElement = function(name)
	{
		/*
			name - name of element to be removed
		*/

		for(var n = 0; n < elementsArray.length; n++)
		{
			if(elementsArray[n].name = name)
			{
				elementsArray.splice(n, 1);
				break;
			}
		}
	}

	// check if point on inside an element in the elements array
	var isElement = function(x, y)
	{
		/*
			x - x value of coordinate to check
			y -y value of coordinate to check
		*/

		for(var n = 0; n < elementsArray.length; n++)
		{
			if(x >= elementsArray[n].x && x <= (elementsArray[n].x + elementsArray[n].width))
			{
				if(y >= elementsArray[n].y && y <= (elementsArray[n].y + elementsArray[n].height))
				{
					return elementsArray[n].name;
				}
			}
		}

		return false;
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
		// clear canvas, draw grid
		clear();

		// recalculate
		perspectiveHeight = (Math.sin(perspectiveAngle * (Math.PI / 180)) * gridSpacing) * 2;
		perspectiveWidth = (Math.cos(perspectiveAngle * (Math.PI / 180)) * gridSpacing) * 2;

		drawGrid('54,54,54');

		// draw grid cursor
		if(mouseLocX && mouseLocY && !isElement(mouseLocX, mouseLocY))
		{
			var gridPoint = getGridPoint(mouseLocX, mouseLocY);
			drawRect(gridPoint[0], gridPoint[1], gridPoint[0] + 1, gridPoint[1] + 1, '68,68,68');
		}
		
		// draw objects
		drawRect(-10, -10, 10, 10, '85,85,85');
		drawRect(playerCountry.territory[0][0], playerCountry.territory[0][1], playerCountry.territory[0][0] + 1, playerCountry.territory[0][1] + 1, playerCountry.color, true);

		// draw UI
		context.fillStyle = "rgb(" + playerCountry.color + ")";
		context.font = '12pt Helvetica Neue';
		context.textBaseline = 'bottom';
		context.fillText("Country #" + playerCountry.id + " - Power: " + playerCountry.power + " - Territory: " + playerCountry.territory.length, 25, canvas.height() - 25);

		context.fillStyle = "rgb(170,170,170)";
		context.fillText("mouse (" + mouseLocX + "," + mouseLocY + ")", 25, 40);
		context.fillText("isometric (" + getGridPoint(mouseLocX, mouseLocY)[0] + "," + getGridPoint(mouseLocX, mouseLocY)[1] + ")", 25, 60);
		context.fillText("on element: " + isElement(mouseLocX, mouseLocY), 25, 80);

		// zoom constraints: max - 150, min - 20, default - 70, multiples of 10
		// zoom in button
		drawButton(canvas.width() - 55, 25, 30, 30, "0,0,0", 0.4);
		context.fillStyle = "rgb(170,170,170)";
		context.font = '14pt Helvetica Neue';
		context.textBaseline = 'top';
		context.fillText("+", canvas.width() - 46, 27);
		addElement('btnZoomIn', canvas.width() - 55, 25, 30, 30);

		// zoom out button
		drawButton(canvas.width() - 55, 65, 30, 30, "0,0,0", 0.4);
		context.fillStyle = "rgb(170,170,170)";
		context.font = '14pt Helvetica Neue';
		context.textBaseline = 'top';
		context.fillText("–", canvas.width() - 45, 68);
		addElement('btnZoomOut', canvas.width() - 55, 65, 30, 30);

		loop = setTimeout(gameLoop, 20);
	}

	// set up canvas
	var canvas = $('canvas#space'), context = canvas.get(0).getContext("2d");

	// graphics variables
	var perspectiveAngle = 30;
	var gridSpacing = 70;
	var perspectiveHeight = (Math.sin(perspectiveAngle * (Math.PI / 180)) * gridSpacing) * 2;
	var perspectiveWidth = (Math.cos(perspectiveAngle * (Math.PI / 180)) * gridSpacing) * 2;

	var gridOriginX = canvas.width() / 2;	// pixel location of (0, 0)
	var gridOriginY = canvas.height() / 2;

	var originMovable = false;
	var mouseX, mouseY, mouseLocX, mouseLocY;

	// ui variables
	var elementsArray = new Array();

	// game variables
	var playerCountry = function(id, power, territory)
	{
		this.id = id;
		this.color = color;
		this.power = power;
		this.territory = territory;
	}

	// initalize country
	playerCountry.id = Math.floor(Math.random() * 101);
	playerCountry.color = Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ','  + Math.floor(Math.random() * 256)
	playerCountry.power = 10;
	playerCountry.territory = new Array(new Array(Math.floor(Math.random() * 19) - 9, Math.floor(Math.random() * 19) - 9));

	// center origin on country's first square
	gridOriginX -= getIsometricPoint(playerCountry.territory[0][0], playerCountry.territory[0][1])[0];
	gridOriginY -= getIsometricPoint(playerCountry.territory[0][0], playerCountry.territory[0][1])[1];

	// checks mouse click
	$('canvas#space').click(function(e)
	{
		if(isElement(e.offsetX, e.offsetY))
		{
			switch(isElement(e.offsetX, e.offsetY))
			{
				case 'btnZoomIn':
					if((gridSpacing + 10) >= 20 && (gridSpacing + 10) <= 150)
					{
						gridSpacing += 10;
					}

					break;

				case 'btnZoomOut':
					if((gridSpacing - 10) >= 20 && (gridSpacing - 10) <= 150)
					{
						gridSpacing -= 10;
					}

					break;
			}
		}
		else if(originMovable)
		{
			originMovable = false;
		}
		else
		{
			originMovable = true;
			mouseX = e.offsetX - gridOriginX;
			mouseY = e.offsetY - gridOriginY;
		}

		return false;
	});

	// checks mouse move
	$('canvas#space').mousemove(function(e)
	{
		// move origin on cmd down
		if(originMovable)
		{
			gridOriginX = e.offsetX - mouseX;
			gridOriginY = e.offsetY - mouseY;
		}

		mouseLocX = e.offsetX;
		mouseLocY = e.offsetY;
	});

	gameLoop();
});