/**********
 * Country Functions
 * Author: Ian Glen <ian@ianglen.me>
 *********/

var countries = new Array();						// countries[0] is always player's country

var addCountry = function(name, color)
{
	countries.push(new Country(name, color,0));
}

var removeCountry = function(name)
{
	// remove territory
	for(var n = 0; n < territory.length; n++)
	{
		if(territory[n].country == name)
		{
			unclaim(territory[n].point);
		}
	}

	for(var n = 0; n < countries.length; n++)
	{
		if(countries[n].name == name)
		{
			countries.splice(n, 1);
		}
	}
}

var getCountry = function(name)
{
	for(var n = 0; n < countries.length; n++)
	{
		if(countries[n].name == name)
		{
			return countries[n];
		}
	}

	return false;
}