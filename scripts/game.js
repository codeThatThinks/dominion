/**********
 * Core Game Functions
 * Author: Ian Glen <ian@ianglen.me>
 *********/

/**
 * entity resources
 */
var building = new Image();
building.src = "./assets/entities/building.png";

var factory = new Image();
factory.src = "./assets/entities/factory.png";

var farmbuilding = new Image();
farmbuilding.src = "./assets/entities/farmbuilding.png";
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

	// create player country (countries[0])
	addCountry("Country #" + Math.floor(Math.random() * 100), new Color(Math.floor(Math.random() * 206) + 50, Math.floor(Math.random() * 206) + 50, Math.floor(Math.random() * 206) + 50));

	// ui variables
	window.elementsArray = new Array();

	// ui elements
	addElement(new Element("lblMouse", "label", "", new Point(25, 25), new Color(170,170,170), 1, true));
	addElement(new Element("lblIsometric", "label", "", new Point(25, 45), new Color(170,170,170), 1, true));
	addElement(new Element("lblElement", "label", "", new Point(25, 65), new Color(170,170,170), 1, true));
	addElement(new Element("lblMultiplayer", "label", "", new Point(25, 85), new Color(170,170,170), 1, false));
	addElement(new Element("lblCountry", "label", "", new Point(25, canvas.height() - 45), countries[0].color, 1, true));

	addElement(new Element("btnZoomIn", "button", "+", new Point(canvas.width() - 55, 25), new Color(0,0,0), 0.4, true, 30, 30));
	addElement(new Element("btnZoomOut", "button", "–", new Point(canvas.width() - 55, 65), new Color(0,0,0), 0.4, true, 30, 30));
	addElement(new Element("btnPan", "button", "Pan", new Point(canvas.width() - 146, canvas.height() - 55), new Color(136,136,136), 0.4, true));
	addElement(new Element("btnClaim", "button", "Claim", new Point(canvas.width() - 88, canvas.height() - 55), new Color(0,0,0), 0.4, true));

	// entities
	addEntity(new Entity("building", building, new Point(2, 1), true));
	addEntity(new Entity("factory", factory, new Point(4, 5), true));
	addEntity(new Entity("farmbuilding", farmbuilding, new Point(8, 6), true));

	// ready, connect to server
	connectToServer();
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

	// draw entities
	drawEntities();


	// draw UI
	getElement("lblMouse").text = "mouse (" + mouseLocation.x + "," + mouseLocation.y + ")";
	getElement("lblIsometric").text = "isometric (" + getGridPoint(mouseLocation.x, mouseLocation.y).x + "," + getGridPoint(mouseLocation.x, mouseLocation.y).y + ")";
	getElement("lblElement").text = "on element: " + isElement(mouseLocation).name;
	getElement("lblCountry").text = countries[0].name + " - Territory: " + numTerritory(countries[0].name);

	if(isOnline)
	{
		getElement("lblMultiplayer").text = "Connected to server";
		getElement("lblMultiplayer").visible = true;
	}
	else if(isDown)
	{
		getElement("lblMultiplayer").text = "Server is down";
		getElement("lblMultiplayer").visible = true;
	}
	else
	{
		getElement("lblMultiplayer").text = "Disconnected";
		getElement("lblMultiplayer").visible = true;
	}

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