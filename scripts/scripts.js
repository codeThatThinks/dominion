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

		context.moveTo(gridOriginX + getIsometricPoint(gridX, gridY)[0], gridOriginY + getIsometricPoint(gridX, gridY)[1]);
		context.lineTo(gridOriginX + getIsometricPoint(gridX2, gridY2)[0], gridOriginY + getIsometricPoint(gridX2, gridY2)[1]);
		context.lineTo(gridOriginX + getIsometricPoint(gridX2, gridY2)[0], gridOriginY + getIsometricPoint(gridX2, gridY2)[1] - gridSpacing);
		context.lineTo(gridOriginX + getIsometricPoint(gridX, gridY)[0], gridOriginY + getIsometricPoint(gridX, gridY)[1] - (height * gridSpacing));
		context.lineTo(gridOriginX + getIsometricPoint(gridX, gridY)[0], gridOriginY + getIsometricPoint(gridX, gridY)[1]);
		
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

		context.moveTo(gridOriginX + getIsometricPoint(gridX, gridY)[0], gridOriginY + getIsometricPoint(gridX, gridY)[1]);
		context.lineTo(gridOriginX + getIsometricPoint(gridX, gridY2)[0], gridOriginY + getIsometricPoint(gridX, gridY2)[1]);
		context.lineTo(gridOriginX + getIsometricPoint(gridX2, gridY2)[0], gridOriginY + getIsometricPoint(gridX2, gridY2)[1]);
		context.lineTo(gridOriginX + getIsometricPoint(gridX2, gridY)[0], gridOriginY + getIsometricPoint(gridX2, gridY)[1]);
		context.lineTo(gridOriginX + getIsometricPoint(gridX, gridY)[0], gridOriginY + getIsometricPoint(gridX, gridY)[1]);

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
			drawRect(gridPoint[0], gridPoint[1], gridPoint[0] + 1, gridPoint[1] + 1, new Color(68,68,68));
		}
		
		// draw objects
		drawRect(-10, -10, 10, 10, new Color(85,85,85));
		drawRect(playerCountry.territory[0][0], playerCountry.territory[0][1], playerCountry.territory[0][0] + 1, playerCountry.territory[0][1] + 1, playerCountry.color, true);

		// draw UI
		getElement("lblMouse").text = "mouse (" + mouseLocX + "," + mouseLocY + ")";
		getElement("lblIsometric").text = "isometric (" + getGridPoint(mouseLocX, mouseLocY)[0] + "," + getGridPoint(mouseLocX, mouseLocY)[1] + ")";
		getElement("lblElement").text = "on element: " + isElement(new Point(mouseLocX, mouseLocY)).name;

		getElement('lblCountry').text = "Country #" + playerCountry.id + " - Power: " + playerCountry.power + " - Territory: " + playerCountry.territory.length;

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

	var gridOriginX = canvas.width() / 2;	// pixel location of (0, 0)
	var gridOriginY = canvas.height() / 2;

	var originMovable = false, isFullscreen = false, isPanning = false;
	var mouseX, mouseY, mouseLocX, mouseLocY;

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
	playerCountry.color = new Color(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256));
	playerCountry.power = 10;
	playerCountry.territory = new Array(new Array(Math.floor(Math.random() * 19) - 9, Math.floor(Math.random() * 19) - 9));

	// ui variables
	var elementsArray = new Array();

	// ui elements
	addElement(new Element("lblMouse", "label", "", new Point(25, 25), new Color(170,170,170), 1, true));
	addElement(new Element("lblIsometric", "label", "", new Point(25, 45), new Color(170,170,170), 1, true));
	addElement(new Element("lblElement", "label", "", new Point(25, 65), new Color(170,170,170), 1, true));
	addElement(new Element("lblCountry", "label", "", new Point(25, canvas.height() - 45), playerCountry.color, 1, true));

	addElement(new Element("btnZoomIn", "button", "+", new Point(canvas.width() - 55, 25), new Color(0,0,0), 0.4, true, 30, 30));
	addElement(new Element("btnZoomOut", "button", "–", new Point(canvas.width() - 55, 65), new Color(0,0,0), 0.4, true, 30, 30));
	addElement(new Element("btnPan", "button", "Pan", new Point(canvas.width() - 73, 105), new Color(0,0,0), 0.4, true));

	// center origin on country's first square
	gridOriginX -= getIsometricPoint(playerCountry.territory[0][0], playerCountry.territory[0][1])[0];
	gridOriginY -= getIsometricPoint(playerCountry.territory[0][0], playerCountry.territory[0][1])[1];

	// checks mouse click
	$('canvas#space').click(function(e)
	{
		if(isElement(new Point(e.offsetX, e.offsetY)))
		{
			switch(isElement(new Point(e.offsetX, e.offsetY)).name)
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
					if(isPanning)
					{
						isPanning = false;
						getElement('btnPan').color = new Color(0,0,0);
					}
					else
					{
						isPanning = true;
						getElement('btnPan').color = new Color(136,136,136);
					}

					break;
			}
		}
		else if(isPanning && originMovable)
		{
			originMovable = false;
		}
		else if(isPanning)
		{
			originMovable = true;
			mouseX = e.offsetX - gridOriginX;
			mouseY = e.offsetY - gridOriginY;
		}
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