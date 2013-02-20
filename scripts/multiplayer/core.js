/**********
 * Core Multiplayer Functions
 * Author: Ian Glen <ian@ianglen.me>
 *********/

/* communication socket */
var multiplayerSocket;

/**
* window.connectToServer()
* connects to Node.js server and sends country and color
*/
var connectToServer = function()
{
	multiplayerSocket = io.connect('http://cloud.ianglen.me');

	multiplayerSocket.on('connect', function()
	{
		multiplayerSocket.emit('set country', playerCountry.name, playerCountry.color.formatRGB(), function(data)
		{
			if(data == 'success')
			{
				getElement("lblMultiplayer").visible = true;
			}
		});
	});
}