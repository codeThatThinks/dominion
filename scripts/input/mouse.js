/**********
 * Mouse Input Functions
 * Author: Ian Glen <codeThatThinks@gmail.com>
 *********/

/**
 * handles mouse clicks
 */
$(document).ready(function()
{
	canvas.click(function(e)
	{
		var newMouseLocation = new Point(e.pageX - canvas.offset().left, e.pageY - canvas.offset().top);

		if(isElement(newMouseLocation))
		{
			switch(isElement(newMouseLocation).name)
			{
				case 'btnZoomIn':
					if((gridSpacing + 10) >= 20 && (gridSpacing + 10) <= 150)
					{
						gridSpacing += 10;
					}

					break;

				case 'btnZoomOut':
					if((gridSpacing - 10) >= 20 && (gridSpacing - 10) <= 150)
					{
						gridSpacing -= 10;
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
		else if(isClaiming)
		{
			claim(getGridPoint(newMouseLocation.x, newMouseLocation.y));
		}
	});
});



/**
 * handles mouse down
 */
$(document).ready(function()
{
	canvas.mousedown(function(e)
	{
		var newMouseLocation = new Point(e.pageX - canvas.offset().left, e.pageY - canvas.offset().top);

		if(isPanning && !isElement(newMouseLocation))
		{
			if(originMovable)
			{
				originMovable = false;
			}
			else
			{
				originMovable = true;
				currentMouseLocation.x = newMouseLocation.x - origin.x;
				currentMouseLocation.y = newMouseLocation.y - origin.y;
			}
		}
	});
});


/**
 * handles mouse move
 */
$(document).ready(function()
{
	canvas.mousemove(function(e)
	{
		var newMouseLocation = new Point(e.pageX - canvas.offset().left, e.pageY - canvas.offset().top);

		if(originMovable)
		{
			origin.set(newMouseLocation.x - currentMouseLocation.x, newMouseLocation.y - currentMouseLocation.y);
		}

		mouseLocation.x = newMouseLocation.x;
		mouseLocation.y = newMouseLocation.y;
	});
});