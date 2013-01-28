/**********
 * Isometric Functions
 * Author: Ian Glen <codeThatThinks@gmail.com>
 *********/

/**
 * window.getIsometricPoint(int x, int y)
 * converts grid coords to real-world screen coords
 *     x - isometric grid x
 *     y - isometric grid y
 */
var getIsometricPoint = function(gridX, gridY)
{
	var posX = (gridX - gridY) * (perspectiveWidth / 2);
	var posY = (gridX + gridY) * (perspectiveHeight / 2);

	return [posX, posY];
}


/**
 * window.getGridPoint(int x, int y)
 * converts screen coords to isometric grid coords
 *     x - real-world screen x
 *     y - real-world screen y
 */
var getGridPoint = function(posX, posY)
{
	posX -= origin.x;
	posY -= origin.y;

	var gridX = Math.floor((posY / perspectiveHeight) + ((posX / perspectiveWidth)));
	var gridY = Math.floor((posY / perspectiveHeight) - ((posX / perspectiveWidth)));

	return new Point(gridX, gridY);
}


/**
 * window.getIsometricX(int x)
 * returns corresponding vertical length on triangle using perspective angle
 *     x - horizontal length
 */
var getIsometricX = function(x)
{
	isometricValue = x / Math.tan(perspectiveAngle * (Math.PI / 180));
	return isometricValue;
}


/**
 * window.getIsometricY(int y)
 * returns corresponding horizontal length on triangle using perspective angle
 *     x - vertical length
 */
var getIsometricY = function(x)
{
	isometricValue = Math.tan(perspectiveAngle * (Math.PI / 180)) * x;
	return isometricValue;
}