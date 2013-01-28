/**********
 * Game Objects
 * Author: Ian Glen <codeThatThinks@gmail.com>
 *********/

/**
 * new Point(int x, int y)
 * stores x,y coords
 *     this.x - x coord
 *     this.y - y coord
 *     this.set(int x, int y) - set new x,y coords
 */
function Point(x, y)
{
	function set(newX, newY)
	{
		this.x = newX;
		this.y = newY;
	}

	this.x = x;
	this.y = y;
	this.set = set;
}


/**
 * new Color(int r, int g, int b)
 * stores rgb color
 *     this.red - red color value (0-255)
 *     this.blue - blue color value (0-255)
 *     this.green - green color value (0-255)
 *     this.formatRGB() - returns formatted "rgb(r,g,b)" string
 *     this.formatRGBA(int opacity) - returns formatted "rgba(r,g,b,opacity)" string
 */
function Color(red, green, blue)
{
	function formatRGB()
	{
		return "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
	}

	function formatRGBA(opacity)
	{
		return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + opacity + ")";
	}

	this.red = red;
	this.green = green;
	this.blue = blue;

	this.formatRGB = formatRGB;
	this.formatRGBA = formatRGBA;
}


/**** UI objects ****/

/**
 * new Element(str name, str type, str text, Point point, Color color, int opacity, bool visible, int width, int height)
 * creates UI object and adds it to UI array
 *     this.name - name of element
 *     this.type - type of UI element ('button' or 'label')
 *     this.text - button text (if applicable)
 *     this.point - element location
 *     this.color - button color (if applicable)
 *     this.opacity - button opacity (if applicable)
 *     this.visible - is element visible on screen? (true or false)
 *     this.width - button width (if applicable)
 *     this.height - button height (if applicable)
 *     this.textWidth() - returns width of text
 *     this.textHeight() - reutns height of text
 *     this.
 *     this.set(x,y) - set new x,y coords
 */
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
					context.font =  '13pt Cabin';
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
			context.font =  '13pt Cabin';

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
		/*context.font =  '13pt Cabin';

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
		context.font =  '13pt Cabin';

		var textWidth = context.measureText(this.text).width;

		context.font = oldFont;
		return textWidth;
	}

	function textHeight()				// calculate height of text in element
	{
		/*context.font =  '14pt Cabin';

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