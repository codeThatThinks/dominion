/**********
 * Country Functions
 * Author: Ian Glen <ian@ianglen.me>
 *********/

/**
 * Country class
 */
function Country(name, color)
{
	this.name = name;
	this.color = color;
}


var countries = new Array();						// countries[0] is always player's country

var addCountry = function(name, color)
{
	if(!getCountry(name))							// prevent duplicate countries
	{
		countries.push(new Country(name, color));
	}
}

var removeCountry = function(name)
{
	// remove territory
	for(var n = territory.length - 1; n >= 0; n--)
	{
		if(territory[n].country == name)
		{
			unclaim(territory[n].point, name);
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