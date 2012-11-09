$(document).ready(function()
{
	/*
		canvas info
		- width: 960px
		- height: 540px
	*/

	$.extend($.fn.disableTextSelect = function()
	{
        return this.each(function()
        {
            if($.browser.mozilla)
            {
            	//Firefox
                $(this).css('MozUserSelect','none');
            }
            else if($.browser.msie)
            {
            	//IE
                $(this).bind('selectstart',function(){return false;});
            }
            else
            {
            	//Opera, etc.
                $(this).mousedown(function(){return false;});
            }
        });
    });

	/****** objects ******/
	function Point(x, y)
	{
		function set(newX, newY)		// change both x and y value
		{
			this.x = newX;
			this.y = newY;
		}

		this.x = x;						// x value of point
		this.y = y;						// y value of point

		this.set = set;
	}

	function Color(red, green, blue)
	{
		function formatRGB()			// return formatted rgb(r, g, b) string
		{
			return "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
		}

		function formatRGBA(opacity)	// return formatted rgba(r, g, b, o) string
		{
			return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + opacity + ")";
		}

		this.red = red;					// green value of color
		this.green = green;				// red value of color
		this.blue = blue;				// blue value of color

		this.formatRGB = formatRGB;
		this.formatRGBA = formatRGBA;
	}

	function Element(name, type, text, point, color, opacity, visible, width, height)
	{
		function draw()					// draw element if visible = true
		{
			if(this.visible)
			{
				switch(this.type)
				{
					case 'label':
						context.fillStyle = this.color.formatRGB();
						context.fillText(this.text, this.point.x, this.point.y);

						break;

					case 'button':
						// draw button
						context.beginPath();
						context.rect(this.point.x, this.point.y, this.getWidth(), this.getHeight());
						context.closePath();
						context.fillStyle = this.color.formatRGBA(this.opacity);
						context.fill();

						// draw text
						context.font =  '12pt Helvetica Neue';
						context.fillStyle = new Color(170,170,170).formatRGB();
						context.fillText(this.text, this.point.x + (this.getWidth() / 2) - (this.textWidth() / 2), this.point.y + (this.getHeight() / 2) - (this.textHeight() / 2));

						break;
				}
			}
		}

		function getWidth()				// calculate width of element
		{
			if(!this.width)
			{
				var oldFont = context.font;
				context.font =  '12pt Helvetica Neue';

				var textWidth = context.measureText(this.text).width;
				var buttonWidth = textWidth + (20);

				context.font = oldFont;
				return buttonWidth;
			}
			else
			{
				return this.width;
			}
			
		}

		function getHeight()				// calculate height of element
		{
			/*context.font =  '12pt Helvetica Neue';

			var textHeight = context.measureText(this.text).height;
			var buttonHeight = textHeight + (15);
*/
			if(!this.height)
			{
				return this.textHeight() + 15;
			}
			else
			{
				return this.height;
			}
		}

		function textWidth()				// calculate width of text in element
		{
			var oldFont = context.font;
			context.font =  '12pt Helvetica Neue';

			var textWidth = context.measureText(this.text).width;

			context.font = oldFont;
			return textWidth;
		}

		function textHeight()				// calculate height of text in element
		{
			/*context.font =  '14pt Helvetica Neue';

			var textHeight = context.measureText(this.text).height;
*/
			return 20;
		}

		this.name = name;				// name of element
		this.type = type;				// type of element; label or button
		this.text = text;				// text on element
		this.point = point;				// location on element as Point()
		this.color = color;				// background color as Color()
		this.opacity = opacity;			// background opacity as decimal
		this.visible = visible;			// boolean - is object on screen?

		this.draw = draw;
		this.width = width;
		this.height = height;
		this.getWidth = getWidth;
		this.getHeight = getHeight;
		this.textWidth = textWidth;
		this.textHeight = textHeight;
	}

	function Country(name, color, power, territory)
	{
		this.name = name;
		this.color = color;
		this.power = power;
		this.territory = territory;
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

		posX -= origin.x;
		posY -= origin.y;

		var gridX = Math.floor((posY / perspectiveHeight) + ((posX / perspectiveWidth)));
		var gridY = Math.floor((posY / perspectiveHeight) - ((posX / perspectiveWidth)));

		return new Point(gridX, gridY);
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

		context.moveTo(origin.x + getIsometricPoint(gridX, gridY)[0], origin.y + getIsometricPoint(gridX, gridY)[1]);
		context.lineTo(origin.x + getIsometricPoint(gridX2, gridY2)[0], origin.y + getIsometricPoint(gridX2, gridY2)[1]);

		context.closePath();
		color = color || new Color(170,170,170);
		context.strokeStyle = color.formatRGB();
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

	// draws a grid
	var drawGrid = function(color, lineWidth)
	{
		/*
			color - [optional] rgb color value of line; defaults to rgb(170, 170, 170)
			lineWidth - [optional] width of grid, in pixels; defaults to 3
		*/

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


	/**** ui functions ****/
	// draw all elements in the ui array
	var drawElements = function()
	{
		for(var n = 0; n < elementsArray.length; n++)
		{
			elementsArray[n].draw();
		}
	}

	// add an element to the ui array
	var addElement = function(element)
	{
		elementsArray.push(element);
	}

	// remove an element from the ui array
	var removeElement = function(name)
	{
		for(var n = 0; n < elementsArray.length; n++)
		{
			if(elementsArray[n].name = name)
			{
				elementsArray.splice(n, 1);
				break;
			}
		}
	}

	// return Element object for a given name
	var getElement = function(name)
	{
		for(var n = 0; n < elementsArray.length; n++)
		{
			if(elementsArray[n].name == name)
			{
				return elementsArray[n];
			}
		}

		return false;
	}

	// check if point on inside an element in the elements array
	var isElement = function(point)
	{
		for(var n = 0; n < elementsArray.length; n++)
		{
			if(point.x >= elementsArray[n].point.x && point.x <= (elementsArray[n].point.x + elementsArray[n].getWidth()))
			{
				if(point.y >= elementsArray[n].point.y && point.y <= (elementsArray[n].point.y + elementsArray[n].getHeight()))
				{
					return elementsArray[n];
				}
			}
		}

		return false;
	}


	/**** game functions ****/
	// claims a square
	var claim = function(point)
	{
		if(!isClaimed(point))
		{
			if(playerCountry.power - 2 >= 0)
			{
				playerCountry.territory.push(point);
				playerCountry.power -= 2;
			}
		}
		else
		{
			unclaim(point);
		}
	}

	// unclaims a square
	var unclaim = function(point)
	{
		for(var n = 0; n < playerCountry.territory.length; n++)
		{
			if(playerCountry.territory[n].x == point.x && playerCountry.territory[n].y == point.y)
			{
				playerCountry.territory.splice(n, 1);
				playerCountry.power += 1;
			}
		}
	}

	// returns true if point is claimed
	var isClaimed = function(point)
	{
		for(var n = 0; n < playerCountry.territory.length; n++)
		{
			if(playerCountry.territory[n].x == point.x && playerCountry.territory[n].y == point.y)
			{
				return true;
			}
		}

		return false;
	}

	var drawTerritory = function()
	{
		for(var n = 0; n < playerCountry.territory.length; n++)
		{
			drawRect(playerCountry.territory[n].x, playerCountry.territory[n].y, playerCountry.territory[n].x + 1, playerCountry.territory[n].y + 1, playerCountry.color, true);
		}
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

		drawGrid(new Color(54,54,54));

		// draw grid cursor
		if(mouseLocX && mouseLocY && isElement(new Point(mouseLocX, mouseLocY)).type != 'button')
		{
			var gridPoint = getGridPoint(mouseLocX, mouseLocY);
			drawRect(gridPoint.x, gridPoint.y, gridPoint.x + 1, gridPoint.y + 1, new Color(68,68,68));
		}
		
		// draw objects
		drawRect(-10, -10, 10, 10, new Color(85,85,85));
		drawTerritory();

		// draw UI
		getElement("lblMouse").text = "mouse (" + mouseLocX + "," + mouseLocY + ")";
		getElement("lblIsometric").text = "isometric (" + getGridPoint(mouseLocX, mouseLocY).x + "," + getGridPoint(mouseLocX, mouseLocY).y + ")";
		getElement("lblElement").text = "on element: " + isElement(new Point(mouseLocX, mouseLocY)).name;
		getElement('lblCountry').text = playerCountry.name + " - Power: " + playerCountry.power + " - Territory: " + playerCountry.territory.length;

		drawElements();

		loop = setTimeout(gameLoop, 20);
	}

	// set up canvas
	var canvas = $('canvas#space'), context = canvas.get(0).getContext("2d");
	$('canvas#space').disableTextSelect();
	context.textBaseline = 'top';

	// graphics variables
	var perspectiveAngle = 30;
	var gridSpacing = 70;
	var perspectiveHeight = (Math.sin(perspectiveAngle * (Math.PI / 180)) * gridSpacing) * 2;
	var perspectiveWidth = (Math.cos(perspectiveAngle * (Math.PI / 180)) * gridSpacing) * 2;
	var origin = new Point(canvas.width() / 2, canvas.height() / 2);

	var originMovable = false, isFullscreen = false, isPanning = true, isClaiming = false;
	var mouseX, mouseY, mouseLocX, mouseLocY;

	// game variables
	var playerCountry = new Country("Player's Country", new Color(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)), 10,	new Array(new Point(Math.floor(Math.random() * 19) - 9, Math.floor(Math.random() * 19) - 9)));

	// ui variables
	var elementsArray = new Array();

	// ui elements
	addElement(new Element("lblMouse", "label", "", new Point(25, 25), new Color(170,170,170), 1, true));
	addElement(new Element("lblIsometric", "label", "", new Point(25, 45), new Color(170,170,170), 1, true));
	addElement(new Element("lblElement", "label", "", new Point(25, 65), new Color(170,170,170), 1, true));
	addElement(new Element("lblCountry", "label", "", new Point(25, canvas.height() - 45), playerCountry.color, 1, true));

	addElement(new Element("btnZoomIn", "button", "+", new Point(canvas.width() - 55, 25), new Color(0,0,0), 0.4, true, 30, 30));
	addElement(new Element("btnZoomOut", "button", "–", new Point(canvas.width() - 55, 65), new Color(0,0,0), 0.4, true, 30, 30));
	addElement(new Element("btnPan", "button", "Pan", new Point(canvas.width() - 146, canvas.height() - 55), new Color(136,136,136), 0.4, true));
	addElement(new Element("btnClaim", "button", "Claim", new Point(canvas.width() - 88, canvas.height() - 55), new Color(0,0,0), 0.4, true));

	// center origin on country's first square
	origin.x -= getIsometricPoint(playerCountry.territory[0].x, playerCountry.territory[0].y)[0];
	origin.y -= getIsometricPoint(playerCountry.territory[0].x, playerCountry.territory[0].y)[1];

	// checks mouse click
	$('canvas#space').click(function(e)
	{
		var clickedPoint = new Point(e.offsetX, e.offsetY);

		if(isElement(clickedPoint))
		{
			switch(isElement(clickedPoint).name)
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

				case 'btnPan':
					if(!isPanning)
					{
						isClaiming = false;
						getElement('btnClaim').color = new Color(0,0,0);

						isPanning = true;
						getElement('btnPan').color = new Color(136,136,136);
					}

					break;

				case 'btnClaim':
					if(!isClaiming)
					{
						isPanning = false;
						getElement('btnPan').color = new Color(0,0,0);

						isClaiming = true;
						getElement('btnClaim').color = new Color(136,136,136);
					}

					break;
			}
		}
		else if(isClaiming)
		{
			claim(new Point(getGridPoint(e.offsetX, e.offsetY).x, getGridPoint(e.offsetX, e.offsetY).y));
		}
	});

	// checks mouse down
	$('canvas#space').mousedown(function(e)
	{
		if(isPanning && !isElement(new Point(e.offsetX, e.offsetY)))
		{
			if(originMovable)
			{
				originMovable = false;
			}
			else
			{
				originMovable = true;
				mouseX = e.offsetX - origin.x;
				mouseY = e.offsetY - origin.y;
			}
		}
	})

	// checks mouse move
	$('canvas#space').mousemove(function(e)
	{
		// move origin on cmd down
		if(originMovable)
		{
			origin.set(e.offsetX - mouseX,e.offsetY - mouseY);
		}

		mouseLocX = e.offsetX;
		mouseLocY = e.offsetY;
	});

	gameLoop();
});