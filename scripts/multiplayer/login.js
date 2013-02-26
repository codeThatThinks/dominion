/**********
 * Territory Functions
 * Author: Peter Lunt
 *********/

//This stuff needs to be run constantly, a kind of loop I guess...

$(document).ready(function()
{	
	if(loggedIn == true) {
		$("#login").hide();
	}
	else {
		$("#login").show();
	}	
});