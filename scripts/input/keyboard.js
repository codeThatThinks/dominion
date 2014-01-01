/**********
 * Keyboard Input Functions
 * Author: Peter Lunt
 *********/

$(document).ready(function()
{
	$(document).keyup(function(e)
	{
		var canvasWidth = document.getElementById("game").width;
		var canvasHeight = document.getElementById("game").height;
		if(allowInput)
		{
			if(e.keyCode == 88 && !isPanning)								// When X key is pressed enable panning mode.
			{
				isClaiming = false;
				getElement('btnClaim').color = new Color(0,0,0);

				isPanning = true;
				getElement('btnPan').color = new Color(136,136,136);
			}

			if(e.keyCode == 67 && !isClaiming)								// When C key is pressed enable claiming mode.
			{
				isPanning = false;
				getElement('btnPan').color = new Color(0,0,0);

				isClaiming = true;
				getElement('btnClaim').color = new Color(136,136,136);
			}

			if(e.keyCode == 49 || e.keyCode == 173)							// When 1 or - is pressed zoom out.
			{
				if((grid.tileSize - 10) >= 20 && (grid.tileSize - 10) <= 150)
				{
					grid.tileSize -= 10;
				}
			}

			if(e.keyCode == 50 || e.keyCode == 61)							// When 2 or = is pressed zoom in.
			{
				if((grid.tileSize + 10) >= 20 && (grid.tileSize + 10) <= 150)
				{
					grid.tileSize += 10;
				}
			}
			
			if(e.keyCode == 82)												//R Key centres the map			
			{
				//origin.set(0 + (canvas.width() / 2), 0 + (canvas.height() / 2));
				grid.origin.x = canvasWidth / 2;
				grid.origin.y = canvasHeight / 2;
			}
		}
	});

	$(document).keydown(function(e)
	{
		if(allowInput)
		{

			/**
			 * Handles camera movement
			 */

			if(e.keyCode == 65 || e.keyCode == 37)							//Camera Left W					
			{
				grid.origin.x += 55;
				//origin.set(origin.x + 55, origin.y);
			}
			
			if(e.keyCode == 68 || e.keyCode == 39)							//Camera Right D						
			{
				grid.origin.x -= 55;
				//origin.set(origin.x - 55, origin.y);
			}
			
			if(e.keyCode == 83 || e.keyCode == 40)							//Camera Down W					
			{
				grid.origin.y -= 55;
				//origin.set(origin.x, origin.y - 55);
			}
			
			if(e.keyCode == 87 || e.keyCode == 38)							//Camera Up D				
			{
				grid.origin.y += 55;
				//origin.set(origin.x, origin.y + 55);
			}

		}


	});
});
