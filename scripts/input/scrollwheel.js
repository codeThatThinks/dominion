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
		if(e.originalEvent.wheelDelta / 120 > 0)										// if mouse is scrolling up, zoom in
		{
			if((gridSpacing - 5) >= 20 && (gridSpacing - 5) <= 150)
			{
				gridSpacing -= 5;
			}
		}
		else															// else, zoom out
		{
			if((gridSpacing + 5) >= 20 && (gridSpacing + 5) <= 150)
			{
				gridSpacing += 5;
			}
		}

		e.preventDefault();												// prevent entire page from scrolling
	});
});