/**********
 * Territory Functions
 * Author: Ian Glen <ian@ianglen.me>
 *********/

var territory = new Array();

/**
 * window.drawTerritory()
 * draws claimed territory in territory array
 */
var drawTerritory = function()
{
	for(var n = 0; n < territory.length; n++)
	{
		if(getCountry(territory[n].country))
		{
			grid.drawRect(territory[n].point, new IsometricPoint(territory[n].point.x + 1, territory[n].point.y + 1), getCountry(territory[n].country).color, true);
		}
	}
}


/**
 * window.claim(Point point)
 * claims territory by adding it to the territory array
 *     point - isometric grid point of territory to be added
 */
var claim = function(point, country)
{
	if(!isClaimed(point))
	{
		territory.push(new territoryUnit(point, country));

		if(country == countries[0].name)
		{
			claimOnServer(point);
		}
	}
	else
	{
		unclaim(point, country);
	}
}


/**
 * window.unclaim(Point point)
 * unclaims territory by removing it from the territory array
 *     point - isometric grid point of territory to be removed
 */
var unclaim = function(point, country)
{
	for(var n = 0; n < territory.length; n++)
	{
		if(territory[n].point.x == point.x && territory[n].point.y == point.y && territory[n].country == country)
		{
			territory.splice(n, 1);

			if(country == countries[0].name)
			{
				unclaimOnServer(point);
			}
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
	for(var n = 0; n < territory.length; n++)
	{
		if(territory[n].point.x == point.x && territory[n].point.y == point.y)
		{
			return true;
		}
	}

	return false;
}


var numTerritory = function(country)
{
	var count = 0;

	for(var n = 0; n < territory.length; n++)
	{
		if(territory[n].country == country)
		{
			count++;
		}
	}

	return count++;
}