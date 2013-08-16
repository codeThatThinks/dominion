/**********
 * Core Game Functions
 * Author: Ian Glen <ian@ianglen.me>
 *********/

/**
 * globals
 */

/**
 * game statuses
 */
var GAMESTATUS_LOADING = 0;
var GAMESTATUS_LOADED = 1;
var GAMESTATUS_AUTHING = 2;
var GAMESTATUS_AUTHED = 3;

var currentGameStatus;


/**
 * game setup
 */
$(document).ready(function()
{
	// load game resources
	currentGameStatus = GAMESTATUS_LOADING;
	loadResources();

	// finished loading, display title dialog
	currentGameStatus = GAMESTATUS_LOADED;

	/* game variables */
	grid = new Grid(canvas, new OrthographicPoint(canvas.element.width() / 2, canvas.element.height() / 2));

	window.isPanning = true;
	window.isClaiming = false;
	window.currentMouseLocation = new OrthographicPoint;
	window.mouseLocation = new OrthographicPoint;
	window.allowInput = true;


	/* initialize game variables */
	// create player country (countries[0])
	addCountry("Country #" + Math.floor(Math.random() * 100), new Color(Math.floor(Math.random() * 206) + 50, Math.floor(Math.random() * 206) + 50, Math.floor(Math.random() * 206) + 50));

	//render trees
	generateTrees(100, 10);
	
	//random generating buildings
	genBuildings(5);

	// entities
	addEntity(new Entity("building", building, new IsometricPoint(2, 1), true));
	addEntity(new Entity("factory", factory, new IsometricPoint(4, 5), true));
	addEntity(new Entity("farmbuilding", farmbuilding, new IsometricPoint(8, 6), true));

	
	/* connect to game server */
	connectToServer();


	/* display login screen */
	displayLogin();


	/* hide UI when login window present */
	displayUI = false;
	allowInput = false;


	/* start game loop */
	gameLoop();
});

/**
 * window.gameLoop()
 * main game loop
 */
var gameLoop = function()
{
	// clear canvas, draw grid
	canvas.clear();

	grid.draw();

	// draw grid cursor
	if(mouseLocation.x && mouseLocation.y && isElement(mouseLocation).type != 'button')
	{
		var cursorPoint = new OrthographicPoint(mouseLocation.x, mouseLocation.y).toIsometricPointAsInteger(grid);
		grid.drawRect(cursorPoint, new IsometricPoint(cursorPoint.x + 1, cursorPoint.y + 1), new Color(68,68,68));
	}


	// draw objects
	grid.drawRect(new IsometricPoint(-10, -10), new IsometricPoint(10, 10), new Color(85,85,85));
	drawTerritory();

	// draw entities
	drawEntities();


	// draw UI
	getElement("lblMouse").text = "mouse (" + mouseLocation.x + "," + mouseLocation.y + ")";
	getElement("lblIsometric").text = "isometric (" + mouseLocation.toIsometricPointAsInteger(grid).x + "," + mouseLocation.toIsometricPointAsInteger(grid).y + ")";
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
