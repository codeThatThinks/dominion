/**********
 * Core Game Functions
 * Author: Ian Glen <codeThatThinks@gmail.com>
 *********/

/**
 * game variables
 */
$(document).ready(function()
{
	window.origin = new Point(canvas.width() / 2, canvas.height() / 2);						// pixel location of isometric point (0,0)
	origin.movable = false;																	// add movable property to origin

	window.originMovable = false;
	window.isPanning = true;
	window.isClaiming = false;
	window.currentMouseLocation = new Point;
	window.mouseLocation = new Point;

	// game variables
	window.playerCountry = new Country("Player's Country", new Color(Math.floor(Math.random() * 206) + 50, Math.floor(Math.random() * 206) + 50, Math.floor(Math.random() * 206) + 50), 10,	new Array(new Point(Math.floor(Math.random() * 19) - 9, Math.floor(Math.random() * 19) - 9)));

	// ui variables
	window.elementsArray = new Array();

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
});

/**
 * window.gameLoop()
 * main game loop
 */
var gameLoop = function()
{
	// clear canvas, draw grid
	clear();

	// recalculate
	perspectiveHeight = (Math.sin(perspectiveAngle * (Math.PI / 180)) * gridSpacing) * 2;
	perspectiveWidth = (Math.cos(perspectiveAngle * (Math.PI / 180)) * gridSpacing) * 2;

	drawGrid(new Color(54,54,54));

	// draw grid cursor
	if(mouseLocation.x && mouseLocation.y && isElement(mouseLocation).type != 'button')
	{
		var gridPoint = getGridPoint(mouseLocation.x, mouseLocation.y);
		drawRect(gridPoint.x, gridPoint.y, gridPoint.x + 1, gridPoint.y + 1, new Color(68,68,68));
	}
	
	// draw objects
	drawRect(-10, -10, 10, 10, new Color(85,85,85));
	drawTerritory();

	// draw UI
	getElement("lblMouse").text = "mouse (" + mouseLocation.x + "," + mouseLocation.y + ")";
	getElement("lblIsometric").text = "isometric (" + getGridPoint(mouseLocation.x, mouseLocation.y).x + "," + getGridPoint(mouseLocation.x, mouseLocation.y).y + ")";
	getElement("lblElement").text = "on element: " + isElement(mouseLocation).name;
	getElement('lblCountry').text = playerCountry.name + " - Power: " + playerCountry.power + " - Territory: " + playerCountry.territory.length;

	drawElements();

	loop = setTimeout(gameLoop, 20);
}

/**
 * load game when page has finished loading
 */
$(document).ready(function()
{
	window.gameLoop();
});