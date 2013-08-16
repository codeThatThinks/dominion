/**********
 * UI Objects
 * Author: Ian Glen <ian@ianglen.me>
 *********/

/**
 * new Element(str name, str type, str text, Point point, Color color, int opacity, bool visible, int width, int height, function drawSetup)
 * creates UI object and adds it to UI array
 *     this.name - name of element
 *     this.type - type of UI element ('button' or 'label')
 *     this.text - button text (if applicable)
 *     this.point - element location
 *     this.color - button color (if applicable)
 *     this.opacity - button opacity (if applicable)
 *     this.visible - is element visible on screen? (true or false)
 *     this.width - width
 *     this.height - height
 *     this.drawSetup - function to call before drawing object (optional)
 *
 *     this.textWidth() - returns width of text
 *     this.textHeight() - reutns height of text
 *     this.
 *     this.set(x,y) - set new x,y coords
 */
function Element(name, type, text, point, color, opacity, visible, drawSetup, width, height)
{
	function draw()					// draw element if visible = true
	{
		if(this.visible)
		{
			switch(this.type)
			{
				case 'label':
					canvas.context.fillStyle = this.color.formatRGBA(this.opacity);
					canvas.context.fillText(this.text, this.point.x, this.point.y);

					break;

				case 'button':
					// draw button
					canvas.context.beginPath();
					canvas.context.rect(this.point.x, this.point.y, this.getWidth(), this.getHeight());
					canvas.context.closePath();
					canvas.context.fillStyle = this.color.formatRGBA(this.opacity);
					canvas.context.fill();

					// draw text
					canvas.context.font =  '13pt Cabin';
					canvas.context.fillStyle = new Color(170,170,170).formatRGB();
					canvas.context.fillText(this.text, this.point.x + (this.getWidth() / 2) - (this.textWidth() / 2), this.point.y + (this.getHeight() / 2) - (this.textHeight() / 2));

					break;
			}
		}
	}

	function getWidth()				// calculate width of element
	{
		if(!this.width)
		{
			switch(this.type)
			{
				case 'label':
					var oldFont = canvas.context.font;
					canvas.context.font =  '13pt Cabin';

					var textWidth = canvas.context.measureText(this.text).width;

					canvas.context.font = oldFont;
					return textWidth;

					break;

				case 'button':
					var oldFont = canvas.context.font;
					canvas.context.font =  '13pt Cabin';

					var textWidth = canvas.context.measureText(this.text).width;
					var buttonWidth = textWidth + (20);

					canvas.context.font = oldFont;
					return buttonWidth;

					break;
			}
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
		var oldFont = canvas.context.font;
		canvas.context.font =  '13pt Cabin';

		var textWidth = canvas.context.measureText(this.text).width;

		canvas.context.font = oldFont;
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
	this.drawSetup = drawSetup || function(){};

	this.draw = draw;
	this.width = width;
	this.height = height;
	this.getWidth = getWidth;
	this.getHeight = getHeight;
	this.textWidth = textWidth;
	this.textHeight = textHeight;
}