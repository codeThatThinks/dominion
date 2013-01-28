/**********
 * Mouse-related UI Functions
 * Author: Ian Glen <codeThatThinks@gmail.com>
 *********/

/**
 * window.isElement(Point point)
 * returns true/false if point is inside element on screen
 *     point - real-world screen point to check
 */
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