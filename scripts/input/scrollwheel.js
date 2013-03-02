/**********
 * Scroll Wheel Input Functions
 * Author: Ian Glen <ian@ianglen.me>
 *********/

/**
* handles mouse scrolling
*/
$(document).ready(function()
{
	canvas.bind('mousewheel', function(e)
	{
		if(allowInput)
		{
			if(e.originalEvent.wheelDelta / 120 > 0)																				// if mouse is scrolling up, zoom out
			{
				if((gridSpacing - 5) >= 20 && (gridSpacing - 5) <= 150)
				{
					gridSpacing -= 5;
				}
			}
			else																													// else, zoom in
			{
				if((gridSpacing + 5) >= 20 && (gridSpacing + 5) <= 150)
				{
					gridSpacing += 5;
				}
			}

			return e.preventDefault() && false;																						// prevent entire page from scrolling
		}
	});
});