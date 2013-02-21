/**********
 * Core Multiplayer Functions
 * Author: Ian Glen <ian@ianglen.me>
 *********/

$(document).ready(function()
{
	window.multiplayerServer = io.connect('http://dominion-server.ianglen.me');
});


/**
* window.connectToServer()
* connects to Node.js server and sends country and color
*/
var connectToServer() = function()
{
	multiplayerServer.on('connect', function()
	{
		multiplayerServer.emit('connect', countries[0].color.formatRGB(), function(data)
		{
			if(data == 'success')
			{
				getElement("lblMultiplayer").visible = true;
			}
		});
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
	multiplayerServer.on('addCountry', function(name, color)
	{
		addCountry(name, new Color().fromRGB(color));
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