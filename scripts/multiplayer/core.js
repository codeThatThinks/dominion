/**********
 * Core Multiplayer Functions
 * Author: Ian Glen <ian@ianglen.me>
 *********/

var multiplayerServer;


/**
* window.connectToServer()
* connects to Node.js server and sends country and color
*/
var connectToServer = function()
{
	multiplayerServer = io.connect('http://dominion-server.ianglen.me');

	multiplayerServer.on('connect', function()
	{
		multiplayerServer.emit('setup', countries[0].name, JSON.stringify(countries[0].color));
	});

	multiplayerServer.on('sendCountries', function(countriesArray)
	{
		var countriesArrayParsed = JSON.parse(countriesArray);

		for(var n = 0; n < countriesArrayParsed.length; n++)
		{
			addCountry(countriesArrayParsed[n].name, new Color(countriesArrayParsed[n].color.red, countriesArrayParsed[n].color.green, countriesArrayParsed[n].color.blue));
		}

		multiplayerServer.emit('sendCountriesSuccess');
	});

	multiplayerServer.on('sendTerritory', function(territoryArray)
	{
		var territoryArrayParse = JSON.parse(territoryArray);

		for(var n = 0; n < territoryArrayParse.length; n++)
		{
			claim(territoryArrayParse[n].point, territoryArrayParse[n].country);
		}

		getElement("lblMultiplayer").visible = true;
	});
}


/**
* window.claimOnServer()
* updates claimed territory with server
*/
var claimOnServer = function(point)
{
	multiplayerServer.emit('claim', point.x, point.y);
}


/**
* window.unclaimOnServer()
* updates unclaimed territory with server
*/
var unclaimOnServer = function(point)
{
	multiplayerServer.emit('unclaim', point.x, point.y);
}


/** events **/
$(document).ready(function()
{
	// close connection on window close
	$(window).bind('beforeunload', function()
	{
		multiplayerServer.disconnect();
	});

	multiplayerServer.on('addCountry', function(name, color)
	{
		var colorParsed = JSON.parse(color);
		addCountry(name, new Color(colorParsed.red, colorParsed.green, colorParsed.blue));
	});

	multiplayerServer.on('removeCountry', function(country)
	{
		removeCountry(name);
	});

	multiplayerServer.on('claim', function(x, y, country)
	{
		claim(new Point(x,y), country);
	});

	multiplayerServer.on('unclaim', function(x, y, country)
	{
		unclaim(new Point(x,y), country);
	});
});