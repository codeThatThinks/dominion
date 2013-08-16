/**********
 * Mouse Input Functions
 * Author: Ian Glen <ian@ianglen.me>
 *********/

/**
 * handles mouse clicks
 */
$(document).ready(function()
{
	canvas.element.click(function(e)
	{
		if(allowInput)
		{
			var newMouseLocation = new OrthographicPoint(e.pageX - canvas.element.offset().left, e.pageY - canvas.element.offset().top);

			if(isElement(newMouseLocation))
			{
				switch(isElement(newMouseLocation).name)
				{
					case 'btnZoomIn':
						if((grid.tileSize + 10) >= 20 && (grid.tileSize + 10) <= 150)
						{
							grid.tileSize += 10;
						}

						break;

					case 'btnZoomOut':
						if((grid.tileSize - 10) >= 20 && (grid.tileSize - 10) <= 150)
						{
							grid.tileSize -= 10;
						}

						break;

					case 'btnPan':
						if(!isPanning)
						{
							isClaiming = false;
							getElement('btnClaim').color = new Color(0,0,0);

							isPanning = true;
							getElement('btnPan').color = new Color(136,136,136);
						}

						break;

					case 'btnClaim':
						if(!isClaiming)
						{
							isPanning = false;
							getElement('btnPan').color = new Color(0,0,0);

							isClaiming = true;
							getElement('btnClaim').color = new Color(136,136,136);
						}

						break;
				}
			}
			else if(isClaiming && isOnline)
			{
				claim(newMouseLocation.toIsometricPointAsInteger(grid), countries[0].name);
			}
		}
	});
});



/**
 * handles mouse down
 */
$(document).ready(function()
{
	canvas.element.mousedown(function(e)
	{
		var newMouseLocation = new OrthographicPoint(e.pageX - canvas.element.offset().left, e.pageY - canvas.element.offset().top);

		if(isPanning && !isElement(newMouseLocation) && e.which == 1 || e.which == 3)
		{
				grid.movable = true;
				currentMouseLocation.x = newMouseLocation.x - grid.origin.x;
				currentMouseLocation.y = newMouseLocation.y - grid.origin.y;
		}
	});
	
	canvas.element.mouseup(function(e)
	{
		var newMouseLocation = new OrthographicPoint(e.pageX - canvas.element.offset().left, e.pageY - canvas.element.offset().top);
			
		if(isPanning || e.which == 3)
		{
			grid.movable = false;
		}
	});
});


/**
 * handles mouse move
 */
$(document).ready(function()
{
	canvas.element.mousemove(function(e)
	{
		if(allowInput)
		{
			var newMouseLocation = new OrthographicPoint(e.pageX - canvas.element.offset().left, e.pageY - canvas.element.offset().top);

			if(grid.movable)
			{
				grid.origin = new OrthographicPoint(newMouseLocation.x - currentMouseLocation.x, newMouseLocation.y - currentMouseLocation.y);
			}

			mouseLocation.x = newMouseLocation.x;
			mouseLocation.y = newMouseLocation.y;
		}
	});
});