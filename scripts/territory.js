/**********
 * Territory Functions
 * Author: Ian Glen <codeThatThinks@gmail.com>
 *********/

/**
 * window.drawTerritory()
 * draws claimed territory in territory array
 */
var drawTerritory = function()
{
	for(var n = 0; n < playerCountry.territory.length; n++)
	{
		drawRect(playerCountry.territory[n].x, playerCountry.territory[n].y, playerCountry.territory[n].x + 1, playerCountry.territory[n].y + 1, playerCountry.color, true);
	}
}


/**
 * window.claim(Point point)
 * claims territory by adding it to the territory array
 *     point - isometric grid point of territory to be added
 */
var claim = function(point)
{
	if(!isClaimed(point))
	{
		if(playerCountry.power - 2 >= 0)
		{
			playerCountry.territory.push(point);
			playerCountry.power -= 2;
		}
	}
	else
	{
		unclaim(point);
	}
}


/**
 * window.unclaim(Point point)
 * unclaims territory by removing it from the territory array
 *     point - isometric grid point of territory to be removed
 */
var unclaim = function(point)
{
	for(var n = 0; n < playerCountry.territory.length; n++)
	{
		if(playerCountry.territory[n].x == point.x && playerCountry.territory[n].y == point.y)
		{
			playerCountry.territory.splice(n, 1);
			playerCountry.power += 1;
		}
	}
}


/**
 * window.isClaimed(Point point)
 * checks if given territory exists in territory array
 *     point - isometric grid point of territory to be checked
 */
var isClaimed = function(point)
{
	for(var n = 0; n < playerCountry.territory.length; n++)
	{
		if(playerCountry.territory[n].x == point.x && playerCountry.territory[n].y == point.y)
		{
			return true;
		}
	}

	return false;
}