/**********
 * Game Objects
 * Author: Ian Glen <ian@ianglen.me>
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

	function fromRGB(string)
	{
		var regexp = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;

		string = string.replace(/ /g,'');
    	string = string.toLowerCase();

		this.red = string.match(regexp)[1];
		this.green = string.match(regexp)[2];
		this.blue = string.match(regexp)[3];
	}

	this.red = red;
	this.green = green;
	this.blue = blue;

	this.formatRGB = formatRGB;
	this.formatRGBA = formatRGBA;
	this.fromRGB = fromRGB;
}


/**** Game objects ****/

/**
 * new Entity(str name, Point point, bool visible)
 * creates entity and adds it to entity array
 *     this.name - name of element
 *     this.image - entity image
 *     this.point - entity location
 *     this.visible - is entity visible on screen? (true or false)
 */
function Entity(name, image, point, visible)
{
	function draw()					// draw entity if visible = true
	{
		if(this.visible)
		{
			context.drawImage(this.image, origin.x + getIsometricPoint(this.point.x, this.point.y)[0] - ((this.image.width * gridSpacing / 150) / 2), origin.y + getIsometricPoint(this.point.x, this.point.y)[1] - ((this.image.height * gridSpacing / 150) - perspectiveHeight), (this.image.width * gridSpacing / 150), (this.image.height * gridSpacing / 150));
		}
	}

	function getWidth()				// calculate width of entity
	{
		return this.image.width;
		
	}

	function getHeight()			// calculate height of entity
	{
		return this.image.height;
	}

	this.name = name;				// name of element
	this.image = image;				// entity image
	this.point = point;				// location of entity as Point()
	this.visible = visible;			// boolean - is object on screen?

	this.draw = draw;
	this.getWidth = getWidth;
	this.getHeight = getHeight;
}

function Country(name, color)
{
	this.name = name;
	this.color = color;
}

function territoryUnit(point, country)
{
	this.point = point;
	this.country = country;
}