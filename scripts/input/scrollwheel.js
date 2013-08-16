/**********
 * Scroll Wheel Input Functions
 * Author: Ian Glen <ian@ianglen.me>
 *********/

/**
* handles mouse scrolling
*/
$(document).ready(function()
{
	canvas.element.bind('mousewheel', function(e)
	{
		if(allowInput)
		{
			if(e.originalEvent.wheelDelta / 120 > 0)																			// if mouse is scrolling up, zoom out
			{
				if((grid.tileSize - 5) >= 20 && (grid.tileSize - 5) <= 150)
				{
					grid.tileSize -= 5;
				}
			}
			else																													// else, zoom in
			{
				if((grid.tileSize + 5) >= 20 && (grid.tileSize + 5) <= 150)
				{
					grid.tileSize += 5;
				}
			}

			return e.preventDefault() && false;																						// prevent entire page from scrolling
		}
	});
	
	/**
	* handles firefox scroll
	*/
	canvas.element.bind('DOMMouseScroll', function(e)
	{
		if(allowInput)
		{
			if(e.originalEvent.detail > 0)																			// if mouse is scrolling up, zoom out
			{
				if((grid.tileSize - 5) >= 20 && (grid.tileSize - 5) <= 150)
				{
					grid.tileSize -= 5;
				}
			}
			else																													// else, zoom in
			{
				if((grid.tileSize + 5) >= 20 && (grid.tileSize + 5) <= 150)
				{
					grid.tileSize += 5;
				}
			}

			return e.preventDefault() && false;																						// prevent entire page from scrolling
		}
	});
	
}); 